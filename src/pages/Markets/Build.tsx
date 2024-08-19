import {useState, useCallback, useMemo, useEffect} from 'react'
import styled from 'styled-components'
import {utils, BigNumberish, ethers, BigNumber} from 'ethers'
import {Label} from '@rebass/forms'
import {MarketCard} from '../../components/Card/MarketCard'
import {SelectActionButton, TriggerActionButton, ApproveTransactionButton} from '../../components/Button/Button'
import {TEXT, colors} from '../../theme/theme'
import {ONE_BN, OVL} from '../../constants/tokens'
import {useActiveWeb3React} from '../../hooks/web3'
import {useBuildState} from '../../state/build/hooks'
import {useDerivedBuildInfo} from '../../state/build/hooks'
import {useBuildActionHandlers} from '../../state/build/hooks'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {
  formatWeiToParsedNumber,
  formatFundingRateToDaily,
  formatBigNumberUsingDecimalsToString,
  formatBigNumberUsingDecimalsToNumber,
} from '../../utils/formatWei'
import {ApprovalState, useApproveCallback} from '../../hooks/useApproveCallback'
import {LeverageSlider} from '../../components/LeverageSlider/LeverageSlider'
import {formatDecimalToPercentage} from '../../utils/formatDecimal'
import {useEstimatedBuild} from '../../hooks/useEstimatedBuild'
import {useBuildCallback} from '../../hooks/useBuildCallback'
import {AdditionalDetails} from './AdditionalBuildDetails'
import ConfirmTxnModal from '../../components/ConfirmTxnModal/ConfirmTxnModal'
import {useMarketData} from '../../state/markets/hooks'
import {useSingleCallResult} from '../../state/multicall/hooks'
import {useToken} from '../../hooks/useToken'
import {useV1PeripheryContract} from '../../hooks/useContract'
import {useOvlBalance} from '../../state/wallet/hooks'
import {useMarketOi} from '../../hooks/useMarketOis'
import {useMarketCapOi} from '../../hooks/useMarketCapOi'
import {useEstimatedBuildOi} from '../../hooks/useEstimatedBuildOi'
import {useEstimatedBuildLiquidationPrice} from '../../hooks/useEstimatedBuildLiquidationPrice'
import {useMarketName} from '../../hooks/useMarketName'
import {useFractionOfCapOi} from '../../hooks/useFractionOfCapOi'
import {useBid} from '../../hooks/useBid'
import {useAsk} from '../../hooks/useAsk'
import {MarketDetails, ComingSoonMarkets} from '../../constants/markets'
import Loader from '../../components/Loaders/Loaders'
import {MainDetails} from './MainBuildDetails'
import {BuildChart} from './Chart/BuildChart'
import {toScientificNumber, toPercentUnit} from '../../utils/toScientificNumber'
import {BuildChartColumn} from './BuildChartColumn'
import BuildHeader from './BuildHeader'
import {PositionStatus, PositionsTableForBuildPage} from '../Positions/PositionsPage'
import {AdditionalMarketData, useMarketDetails} from '../../hooks/useMarketDetails'
import {MarketStateResults, useCurrentMarketState} from '../../hooks/useCurrentMarketState'
import {Icon} from '../../components/Icon/Icon'
import {AlertCircle} from 'react-feather'
import {useWalletModalToggle} from '../../state/application/hooks'
import {usePositionsActionHandlers} from '../../state/positions/hooks'
import {limitDigitsInDecimals} from '../../utils/limitDigitsInDecimals'

const SelectPositionSideButton = styled(SelectActionButton)`
  border-radius: 8px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.dark.grey4};
`
const SelectLongPositionButton = styled(SelectPositionSideButton)`
  color: ${({theme}) => theme.dark.green};
  border: ${({active, theme}) => active && `1px solid ${theme.dark.green}`};

  :hover {
    box-shadow: 0px 0px 10px 0px ${({theme}) => theme.dark.green};
  }
`

const SelectShortPositionButton = styled(SelectPositionSideButton)`
  color: ${({theme}) => theme.dark.red};
  border: ${({active, theme}) => active && `1px solid ${theme.dark.red}`};

  :hover {
    box-shadow: 0px 0px 10px 0px ${({theme}) => theme.dark.red};
  }
`

const TriggerBuildButton = styled(TriggerActionButton)`
  border: 1px solid #f2f2f2;
`

const ConnectWalletButton = styled(TriggerActionButton)`
  color: ${colors(false).dark.white};
  background: #53b1f9;
`

const ControlInterfaceContainer = styled(FlexColumn)`
  border-radius: 8px;
  box-shadow: 0px 0px 12px 6px rgba(91, 96, 164, 0.25);
  border: 0.5px solid rgba(113, 206, 255, 0.5);
  padding: 24px;
  gap: 24px;
`

const ControlInterfaceHeadContainer = styled(FlexColumn)`
  text-align: center;
  gap: 8px;
`

const BuildContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({theme}) => theme.dark.grey2};
  padding-top: 8px;
  margin-bottom: -120px;
  ${({theme}) => theme.mediaWidth.minSmall`
    border-top: 1px solid ${({theme}) => theme.dark.grey2};
    margin: 0 8px -32px;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    width: auto;
    padding-left: 8px;
    gap: 8px;
    justify-content: space-between;
  `}
  ${({theme}) => theme.mediaWidth.minMedium`
    border-top: none;
    gap: 16px;
    width: 96vw;
    max-width: 1232px;
  `}
  ${({theme}) => theme.mediaWidth.minLarge`
    border-top: none;
    margin: 0 0 -32px;
    padding: 0;
    gap: 40px;
    width: 1232px;
  `}
`

const PositionsButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`

const InputContainer = styled.div`
  background: #10131d;
  border-radius: 8px;
  padding: 8px 10px;
  width: 100%;
`

const ButtonContainer = styled.div`
  margin: 32px 0;
`

export const NumericalInputContainer = styled(FlexRow)`
  border: 1px solid ${({theme}) => theme.dark.white};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0px;
`

export const NumericalInputDescriptor = styled.div`
  background: transparent;
  font-size: 16px;
  color: #f2f2f2;
  padding: 8px;
`

export const NumericalInputLabel = styled(Label)`
  margin-top: 24px !important;
`

export const NumericalInputTitle = styled(TEXT.StandardBody)`
  margin-bottom: 4px !important;
`

export const NumericalInputBottomText = styled(TEXT.Supplemental)`
  margin: 4px 0 24px auto !important;
`

const PositionsTableContainer = styled.div`
  width: 359px;
  display: flex;

  ${({theme}) => theme.mediaWidth.minSmall`
    display: none;
  `}
  ${({theme}) => theme.mediaWidth.minMedium`
    display: flex;
    width: 100%;
  `}
`

const PositionsTableContainerSmallSize = styled.div`
  display: none;
  ${({theme}) => theme.mediaWidth.minSmall`
    width: 100%;
    position: relative;
    top: 77px;
    display: flex;
  `}
  ${({theme}) => theme.mediaWidth.minMedium`
    display: none;
  `}
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  ${({theme}) => theme.mediaWidth.minSmall`
    width: auto;
    flex: 1;
  `}
  ${({theme}) => theme.mediaWidth.minMedium`
    width: auto;
    flex: 1;
    margin-bottom: 16px;
  `}
`

const RightColumn = styled.div`
  padding-left: 0;
  top: 0;
  order: -1;
  ${({theme}) => theme.mediaWidth.minSmall`
    padding-left: 8px;
    position: relative;
    top: 77px;
    width: auto;
  `}
  ${({theme}) => theme.mediaWidth.minMedium`
    top: 0;
    width: auto;
    padding-left: 0;
    margin-bottom: 16px;
  `}
  ${({theme}) => theme.mediaWidth.minLarge`
    padding-left: 0;
    top: 0;
    width: auto;
    order: -1;
  `}
`

const AboutMarketTitle = styled.h2`
  padding-top: 32px;
  @media (max-width: 1400px) {
    margin: 0px 24px;
    padding-bottom: 24px;
  }
  @media (max-width: 1025px) {
    padding-top: 150px;
  }
  @media (max-width: 760px) {
    margin: 0px;
  }
`

const AboutMarketSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 38px;
  max-width: 1230px;
  margin-bottom: 20px;
  @media (max-width: 1400px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 0px 24px;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    margin: 0px;
  }
`
const AboutMarketText = styled.div`
  width: 100%;
  margin-bottom: 10px;
  @media (max-width: 1400px) {
    grid-column: span 2;
    max-width: 60%;
  }
  @media (max-width: 760px) {
    grid-column: 1;
    max-width: 100%;
  }
`

const AboutMarket = styled.div`
  width: 100%;
  margin-bottom: 10px;
`

const ImageContainer = styled.div`
  width: 100%;
  grid-column: span 2;

  @media (max-width: 1400px) {
    max-width: 100%;
    grid-column: span 1;
  }
`

const ImageComponent = styled.img`
  width: 100%;
  height: auto;
`

const FirstColumn = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
`

const SecondColumn = styled.div`
  display: flex;
  justify-content: space-between;
  margintop: 15px;
  padding-bottom: 21px;
`

const LeftDetailColumn = styled.div`
  color: var(--v-2-dark-grey-2, #a8a6a6);
`

const RightDetailColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-content: flex-start;
  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

const TextBesideLogo = styled.div`
  display: flex;
  align-items: center;
`

const TextAboveLogo = styled.p`
  padding-left: 22px;
  font-weight: bold;
  color: var(--v-2-dark-grey-2, #a8a6a6);
`

const TextBelowLogo = styled.p`
  margin-top: 5px;
  font-style: italic;
  white-space: pre-line;
`

const LiList = styled.li`
  list-style: none;
  margin: 0px;
  display: flex;
  justify-items: end;
  justify-content: flex-end;
  text-align: end;
`

const UlList = styled.ul`
  margin: 0px;
  display: grid;
`

const SeeMoreButton = styled.button`
  display: flex;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
  color: white;
  justify-items: end;
  justify-content: end;
`

export const MINIMUM_SLIPPAGE_VALUE = 0.05

// @TO-DO: Break down BuildInterface into sub-components
// separate out data fetching logic from view components

// BuildInterface component to handle user input
// & callbacks for approve/build, data from periphery contract
// to be moved to respective sub-components to keep clean
export const BuildInterface = ({marketId}: {marketId: string}) => {
  const [showBalanceNotEnoughWarning, setShowBalanceNotEnoughWarning] = useState<boolean>(false)
  const [isMaxSelected, setIsMaxSelected] = useState<boolean>(false)
  const [{showConfirm, attemptingTransaction, transactionErrorMessage, transactionHash}, setBuildState] = useState<{
    showConfirm: boolean
    attemptingTransaction: boolean
    transactionErrorMessage: string | undefined
    transactionHash: string | undefined
  }>({
    showConfirm: false,
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  })

  const {account, chainId} = useActiveWeb3React()
  const {market, isLoading, isUninitialized, refetch} = useMarketData(marketId)

  const marketDetails: AdditionalMarketData[] = useMarketDetails(market && [market])
  const {markets: marketsData}: MarketStateResults = useCurrentMarketState(marketDetails)
  const {onBuildPosition} = usePositionsActionHandlers()
  const circuitBreakerLevel = marketsData.length > 0 && marketsData[0].circuitBreakerLevel

  // force refetch when refreshing page
  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, marketId, isLoading, isUninitialized, refetch])

  useEffect(() => {
    !market && refetch()
  }, [market, refetch])

  // const market = marketData?.market
  const ovlBalance = useOvlBalance()
  const parsedOvlBalance = ovlBalance && ovlBalance.toFixed(8)
  const ovl = chainId ? OVL[chainId] : undefined

  // @TO-DO: pull market name from feed
  const {decimals, baseTokenAddress, quoteTokenAddress} = useMarketName(market?.feedAddress)

  const {
    marketName,
    logo: marketLogo,
    currency: priceCurrency,
    indexesConstruction: marketIndex,
    fullLogo: fullMarketLogo,
    proposedBy,
    approved,
    contract,
    sources: sources,
    additionalInfo,
    descriptionText,
  } = MarketDetails[marketId]

  const toggleWalletModal = useWalletModalToggle()

  const baseTokenInfo = useToken(baseTokenAddress)
  const quoteTokenInfo = useToken(quoteTokenAddress)

  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const visibleIndexes = showAll ? marketIndex : marketIndex?.slice(0, 4)

  const baseTokenDecimals = useMemo(() => {
    if (!baseTokenInfo) return undefined
    return baseTokenInfo.decimals
  }, [baseTokenInfo])

  const quoteTokenDecimals = useMemo(() => {
    if (quoteTokenInfo === undefined || !quoteTokenInfo) return undefined
    return quoteTokenInfo.decimals
  }, [quoteTokenInfo])

  const marketTokensDecimalsDifference = useMemo(() => {
    if (!baseTokenDecimals && typeof baseTokenDecimals !== 'number') return undefined
    if (!quoteTokenDecimals && typeof quoteTokenDecimals !== 'number') return undefined
    const difference = baseTokenDecimals - quoteTokenDecimals
    return difference
  }, [baseTokenDecimals, quoteTokenDecimals])

  const sigFigConstant = 8

  // @TO-DO: pull market attributes
  const capLeverage = market ? formatWeiToParsedNumber(market.capLeverage, 18, 2) : undefined
  const minCollateral = market ? formatWeiToParsedNumber(market.minCollateral, 18, 10) : undefined

  const ois = useMarketOi(marketId, baseTokenDecimals, quoteTokenDecimals)
  const rawOiLong = ois && ois[0] ? ois[0] : undefined
  const rawOiShort = ois && ois[1] ? ois[1] : undefined

  const formattedOiLong = useMemo(() => {
    if (!rawOiLong) return undefined
    if (!baseTokenDecimals && !decimals) return undefined
    if (!marketTokensDecimalsDifference && typeof marketTokensDecimalsDifference !== 'number' && !decimals) return undefined
    if (decimals) {
      return formatBigNumberUsingDecimalsToNumber(rawOiLong, decimals, decimals)
    }
    if (marketTokensDecimalsDifference === 0) {
      return formatBigNumberUsingDecimalsToNumber(rawOiLong, baseTokenDecimals, baseTokenDecimals)
    } else {
      // divide by ONE or 1e18 based on fixed point calc for OI in solidity
      const divBy1e18 = rawOiLong.div(ethers.constants.WeiPerEther)
      return formatBigNumberUsingDecimalsToNumber(divBy1e18, marketTokensDecimalsDifference, marketTokensDecimalsDifference)
    }
  }, [rawOiLong, baseTokenDecimals, decimals, marketTokensDecimalsDifference])

  const formattedOiShort = useMemo(() => {
    if (!rawOiShort) return undefined
    if (!baseTokenDecimals && !decimals) return undefined
    if (!marketTokensDecimalsDifference && typeof marketTokensDecimalsDifference !== 'number' && !decimals) return undefined
    if (decimals) {
      return formatBigNumberUsingDecimalsToNumber(rawOiShort, decimals, decimals)
    }
    if (marketTokensDecimalsDifference === 0) {
      return formatBigNumberUsingDecimalsToNumber(rawOiShort, baseTokenDecimals, baseTokenDecimals)
    } else {
      // divide by ONE or 1e18 based on fixed point calc for OI in solidity
      const divBy1e18 = rawOiShort.div(ethers.constants.WeiPerEther)
      return formatBigNumberUsingDecimalsToNumber(divBy1e18, marketTokensDecimalsDifference, marketTokensDecimalsDifference)
    }
  }, [rawOiShort, baseTokenDecimals, decimals, marketTokensDecimalsDifference])

  const capOiResult = useMarketCapOi(marketId)
  const rawCapOi = capOiResult ? capOiResult : undefined
  const formattedCapOi = useMemo(() => {
    if (!rawCapOi) return undefined
    if (!baseTokenDecimals && !decimals) return undefined
    if (!marketTokensDecimalsDifference && typeof marketTokensDecimalsDifference !== 'number' && !decimals) return undefined
    if (decimals) {
      return formatBigNumberUsingDecimalsToNumber(rawCapOi, decimals, decimals)
    }
    if (marketTokensDecimalsDifference === 0) {
      return formatBigNumberUsingDecimalsToNumber(rawCapOi, baseTokenDecimals, baseTokenDecimals)
    } else {
      // divide by ONE or 1e18 based on fixed point calc for OI in solidity
      const divBy1e18 = rawCapOi.div(ethers.constants.WeiPerEther)
      return formatBigNumberUsingDecimalsToNumber(divBy1e18, marketTokensDecimalsDifference, marketTokensDecimalsDifference)
    }
  }, [rawCapOi, decimals, baseTokenDecimals, marketTokensDecimalsDifference])

  const peripheryContract = useV1PeripheryContract()

  const buildFee = market?.tradingFeeRate
  const fetchPrices = useSingleCallResult(peripheryContract, 'prices', [marketId])
  const fetchFundingRate = useSingleCallResult(peripheryContract, 'fundingRate', [marketId])

  const prices: {
    bid?: string | number | any
    ask?: string | number | any
    mid?: string | number | any
    _bid?: BigNumberish
    _ask?: BigNumberish
    _mid?: BigNumberish
  } = useMemo(() => {
    if (fetchPrices.loading === true || !fetchPrices.result) {
      return {bid: 'loading', ask: 'loading', mid: 'loading'}
    }

    // when using chainlink feed, but not uniswap v3
    // @dev TO-DO: update variable names to differentiate between chainlink and uni v3 feeds
    if (decimals && quoteTokenDecimals === undefined) {
      return {
        bid: formatBigNumberUsingDecimalsToString(fetchPrices.result?.bid_, decimals, sigFigConstant),
        ask: formatBigNumberUsingDecimalsToString(fetchPrices.result?.ask_, decimals, sigFigConstant),
        mid: formatBigNumberUsingDecimalsToString(fetchPrices.result?.mid_, decimals, sigFigConstant),
        _bid: fetchPrices.result?.bid_,
        _ask: fetchPrices.result?.ask_,
        _mid: fetchPrices.result?.mid_,
      }
    }

    return {
      bid: formatBigNumberUsingDecimalsToString(fetchPrices.result?.bid_, quoteTokenDecimals, sigFigConstant),
      ask: formatBigNumberUsingDecimalsToString(fetchPrices.result?.ask_, quoteTokenDecimals, sigFigConstant),
      mid: formatBigNumberUsingDecimalsToString(fetchPrices.result?.mid_, quoteTokenDecimals, sigFigConstant),
      _bid: fetchPrices.result?.bid_,
      _ask: fetchPrices.result?.ask_,
      _mid: fetchPrices.result?.mid_,
    }
  }, [fetchPrices, decimals, quoteTokenDecimals])

  const fundingRate = useMemo(() => {
    if (fetchFundingRate.loading === true || !fetchFundingRate.result) return 'loading'
    return formatFundingRateToDaily(fetchFundingRate.result?.[0], 18, 2)?.toString() + '%'
  }, [fetchFundingRate])

  const {selectedLeverage, isLong, typedValue, setSlippageValue} = useBuildState()
  const {onAmountInput, onSelectLeverage, onSelectPositionSide, onResetBuildState} = useBuildActionHandlers()

  const handleLeverageInput = useCallback(
    (e: any) => {
      onSelectLeverage(e.target.value)
    },
    [onSelectLeverage],
  )

  const handleSelectPositionSide = useCallback(
    (isLong: boolean) => {
      onSelectPositionSide(isLong)
    },
    [onSelectPositionSide],
  )

  const maxInputIncludingFees: string | undefined = useMemo(() => {
    const parsedBuildFee = formatWeiToParsedNumber(buildFee, 18, 6)
    let buildFeeValueFromMaxInput

    if (!ovlBalance || !buildFee) return parsedOvlBalance
    buildFeeValueFromMaxInput = Number(ovlBalance && ovlBalance.toFixed(18)) * Number(parsedBuildFee) * Number(selectedLeverage)
    let returnValue = Number(ovlBalance && ovlBalance.toFixed(18)) - buildFeeValueFromMaxInput
    const decimals = 6
    return (Math.trunc(returnValue * Math.pow(10, decimals)) / Math.pow(10, decimals)).toString()
  }, [buildFee, ovlBalance, parsedOvlBalance, selectedLeverage])

  const handleUserInput = useCallback(
    (input: string) => {
      if (input !== maxInputIncludingFees) {
        setIsMaxSelected(false)
      }
      onAmountInput(input)
    },
    [onAmountInput, setIsMaxSelected, maxInputIncludingFees],
  )

  // Update amount input when max selected and leverage is changed (thus maxInputIncludingFees changes)
  useEffect(() => {
    if (isMaxSelected && maxInputIncludingFees) {
      handleUserInput(maxInputIncludingFees)
    }
  }, [isMaxSelected, maxInputIncludingFees, handleUserInput])

  // Show warning with wallet balance is below minimum
  useEffect(() => {
    if (maxInputIncludingFees && minCollateral && +maxInputIncludingFees < minCollateral) {
      setShowBalanceNotEnoughWarning(true)
    } else {
      setShowBalanceNotEnoughWarning(false)
    }
  }, [maxInputIncludingFees, minCollateral])

  const handleDismiss = useCallback(() => {
    setBuildState({
      showConfirm: false,
      attemptingTransaction,
      transactionErrorMessage,
      transactionHash,
    })
  }, [attemptingTransaction, transactionErrorMessage, transactionHash])

  const [approval, approveCallback] = useApproveCallback(
    typedValue !== '.' ? utils.parseUnits(typedValue ? typedValue : '0') : undefined,
    market?.id,
    ovl,
  )

  const showApprovalFlow = useMemo(() => {
    return approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  }, [approval])

  const handleApprove = useCallback(async () => {
    if (!typedValue) {
      // throw new Error("missing position input size");
      return
    }
    setBuildState({
      showConfirm: false,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    })
    approveCallback()
      .then(hash => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: undefined,
        })
      })
      .catch(error => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        })
      })
  }, [approveCallback, typedValue])

  const estimatedOiResult = useEstimatedBuildOi(market?.id, typedValue, selectedLeverage, isLong, decimals, baseTokenDecimals, quoteTokenDecimals)

  const rawExpectedOi = estimatedOiResult.rawOi ? estimatedOiResult.rawOi : null
  const expectedOi = formatBigNumberUsingDecimalsToNumber(rawExpectedOi?.toString(), 18, 18)
  const estimatedFractionOfCapOi = useFractionOfCapOi(market?.id, estimatedOiResult?.rawOi)
  const estimatedBid: BigNumber | undefined = useBid(market?.id, estimatedFractionOfCapOi)
  const estimatedAsk: BigNumber | undefined = useAsk(market?.id, estimatedFractionOfCapOi)
  const estimatedLiquidationPriceResult = useEstimatedBuildLiquidationPrice(market?.id, typedValue, selectedLeverage, isLong)

  const estimatedLiquidationPrice = estimatedLiquidationPriceResult
    ? formatBigNumberUsingDecimalsToNumber(estimatedLiquidationPriceResult, decimals ?? quoteTokenDecimals, sigFigConstant)
    : null

  const estimatedReceivedPrice: any = useMemo(() => {
    if (isLong === undefined || estimatedBid === undefined || estimatedAsk === undefined) {
      return null
    }
    if (decimals) {
      return isLong
        ? formatBigNumberUsingDecimalsToString(estimatedAsk, decimals, sigFigConstant)
        : formatBigNumberUsingDecimalsToString(estimatedBid, decimals, sigFigConstant)
    }
    // if (estimatedBid === undefined || estimatedAsk === undefined) return prices.mid;
    return isLong
      ? formatBigNumberUsingDecimalsToString(estimatedAsk, quoteTokenDecimals, sigFigConstant)
      : formatBigNumberUsingDecimalsToString(estimatedBid, quoteTokenDecimals, sigFigConstant)
  }, [isLong, estimatedBid, estimatedAsk, quoteTokenDecimals, decimals])

  const headerPrice: string = useMemo(() => {
    const price = estimatedReceivedPrice ?? prices.mid
    const formattedPrice = price < 100000 ? price : Math.floor(price)
    return limitDigitsInDecimals(formattedPrice)
  }, [estimatedReceivedPrice, prices])

  const longPrice: string = useMemo(() => {
    const price = prices.ask

    const formattedPrice = price < 100000 ? price : Math.floor(price)
    return limitDigitsInDecimals(formattedPrice)
  }, [prices])

  const shortPrice: string = useMemo(() => {
    const price = prices.bid
    const formattedPrice = price < 100000 ? price : Math.floor(price)
    return limitDigitsInDecimals(formattedPrice)
  }, [prices])

  const priceImpact = useMemo(() => {
    if (!estimatedReceivedPrice) return null
    if (!typedValue || isLong === undefined || prices.bid === undefined || prices.ask === undefined) return null
    if (prices.bid === 'loading' || prices.ask === 'loading') return <Loader stroke="white" size="12px" />

    const priceImpactValue = isLong ? estimatedReceivedPrice - prices.ask : prices.bid - estimatedReceivedPrice
    const priceImpactPercentage = isLong ? (priceImpactValue / prices.ask) * 100 : (priceImpactValue / prices.bid) * 100

    return priceImpactPercentage.toFixed(2)
  }, [estimatedReceivedPrice, typedValue, isLong, prices.bid, prices.ask])

  const isPriceImpactHigh: boolean | null = useMemo(() => {
    if (!estimatedReceivedPrice || !priceImpact) return null
    if (!setSlippageValue) return null
    return Number(priceImpact) - Number(setSlippageValue) > 0 ? true : false
  }, [estimatedReceivedPrice, priceImpact, setSlippageValue])

  const showUnderwaterFlow = useMemo(() => {
    if (prices.mid === undefined || prices.mid === 'loading' || !estimatedLiquidationPrice) return false
    return isLong ? estimatedLiquidationPrice > parseFloat(prices.mid) : estimatedLiquidationPrice < parseFloat(prices.mid)
  }, [prices, isLong, estimatedLiquidationPrice])

  const exceedOiCap = useMemo(() => {
    if (!rawOiLong || !rawOiShort || !rawCapOi || !rawExpectedOi || isLong === undefined) return false
    return isLong ? rawExpectedOi.add(rawOiLong).gt(rawCapOi) : rawExpectedOi.add(rawOiShort).gt(rawCapOi)
  }, [isLong, rawOiLong, rawOiShort, rawCapOi, rawExpectedOi])

  const exceedOiCapCircuitBreaker = useMemo(() => {
    if (!rawOiLong || !rawOiShort || !rawCapOi || !rawExpectedOi || isLong === undefined || !circuitBreakerLevel || exceedOiCap) return false
    return isLong
      ? rawExpectedOi.add(rawOiLong).gt(rawCapOi.mul(circuitBreakerLevel).div(ONE_BN))
      : rawExpectedOi.add(rawOiShort).gt(rawCapOi.mul(circuitBreakerLevel).div(ONE_BN))
  }, [isLong, rawOiLong, rawOiShort, rawCapOi, rawExpectedOi])

  const {adjustedCollateral} = useEstimatedBuild(
    selectedLeverage,
    Number(typedValue),
    buildFee ? formatWeiToParsedNumber(buildFee, 18, 10) : undefined,
  )

  const {buildData, inputError} = useDerivedBuildInfo()
  const estPrice = isLong ? estimatedAsk : estimatedBid
  const {callback: buildCallback, minPrice} = useBuildCallback(buildData, market?.id, estPrice, minCollateral, inputError)
  const disableBuildButton: boolean = useMemo(() => {
    if (!typedValue || !maxInputIncludingFees || !minCollateral || isLong === undefined || !estPrice) {
      return true
    }
    if (Number(typedValue) > Number(maxInputIncludingFees)) {
      return true
    }
    if (minCollateral > Number(typedValue)) {
      return true
    }
    return false
  }, [typedValue, isLong, minCollateral, maxInputIncludingFees, estPrice])

  const handleMaxInput = (totalSupply: string | null) => {
    setIsMaxSelected(true)
    return handleUserInput(Number(maxInputIncludingFees).toFixed(6))
  }

  const handleBuild = useCallback(() => {
    if (!typedValue) throw new Error('missing position input size')
    if (isLong === undefined) throw new Error('please choose a long/short position')
    if (!buildCallback) return
    setBuildState({
      showConfirm: true,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    })
    buildCallback()
      .then(hash => {
        setBuildState({
          showConfirm: true,
          attemptingTransaction: true,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        })
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        })
        onResetBuildState()
        onBuildPosition(true)
      })
      .catch(error => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        })
      })
  }, [buildCallback, onResetBuildState, isLong, typedValue])

  return (
    <div>
      <BuildHeader marketId={marketId} />
      <BuildContainer>
        <LeftColumn>
          <BuildChartColumn marketData={{headerPrice, priceCurrency, isLoading, marketId: market?.id}}>
            <BuildChart
              feedAddress={market?.feedAddress}
              marketId={market?.id}
              longPrice={longPrice.replaceAll(',', '')}
              shortPrice={shortPrice.replaceAll(',', '')}
            />
          </BuildChartColumn>
          <PositionsTableContainer>
            <PositionsTableForBuildPage
              title="Positions"
              marginTop="40px"
              positionStatus={PositionStatus.Build}
              rowsCount={0}
              marketsData={marketsData}
            />
          </PositionsTableContainer>
        </LeftColumn>
        <RightColumn>
          <MarketCard align={'left'} padding={'0px'}>
            <ControlInterfaceContainer onSubmit={(e: any) => e.preventDefault()} as={'form'}>
              <ControlInterfaceHeadContainer>
                <TEXT.BoldHeader1>{marketName}</TEXT.BoldHeader1>
                <TEXT.Number color={colors(false).dark.blue1}>
                  {isLong
                    ? `Long Price: ${priceCurrency}${priceCurrency === '%' ? toPercentUnit(longPrice) : toScientificNumber(longPrice)}`
                    : `Short Price: ${priceCurrency}${priceCurrency === '%' ? toPercentUnit(shortPrice) : toScientificNumber(shortPrice)}`}
                </TEXT.Number>
              </ControlInterfaceHeadContainer>
              <PositionsButtonContainer>
                <SelectLongPositionButton onClick={() => handleSelectPositionSide(true)} active={isLong}>
                  <div>Long</div>
                </SelectLongPositionButton>
                <SelectShortPositionButton onClick={() => handleSelectPositionSide(false)} active={!isLong && isLong !== undefined}>
                  <div>Short</div>
                </SelectShortPositionButton>
              </PositionsButtonContainer>
              <LeverageSlider
                name={'Build Position Leverage'}
                min={1}
                max={capLeverage ?? 1}
                step={0.1}
                value={Number(selectedLeverage)}
                onChange={handleLeverageInput}
              />

              <InputContainer>
                <FlexRow justify="space-between" mb="25px">
                  <TEXT.Supplemental color={colors(true).dark.grey2}>Amount</TEXT.Supplemental>
                  <TEXT.Supplemental
                    onClick={() => handleMaxInput(maxInputIncludingFees ?? null)}
                    color={isMaxSelected ? 'white' : colors(true).dark.grey2}
                    style={{textDecoration: 'underline', cursor: 'pointer'}}
                  >
                    Max: {maxInputIncludingFees} OVL
                  </TEXT.Supplemental>
                </FlexRow>
                <FlexRow justify="space-between">
                  <NumericalInput
                    color={colors(true).dark.blue1}
                    align="left"
                    padding="0px"
                    fontWeight="700"
                    value={typedValue?.toString()}
                    onUserInput={handleUserInput}
                  />
                  <TEXT.BoldStandardBody color={colors(true).dark.blue1}>OVL</TEXT.BoldStandardBody>
                </FlexRow>
              </InputContainer>

              <MainDetails
                priceCurrency={priceCurrency}
                quoteTokenDecimals={quoteTokenDecimals}
                decimals={decimals}
                typedValue={typedValue}
                isLong={isLong}
                estimatedBid={estimatedBid}
                estimatedAsk={estimatedAsk}
                bidPrice={prices.bid}
                askPrice={prices.ask}
                minPrice={minPrice.length === 1 ? minPrice[0] : undefined}
              />
            </ControlInterfaceContainer>

            {!account && (
              <ButtonContainer>
                <ConnectWalletButton onClick={toggleWalletModal}>Connect wallet</ConnectWalletButton>
              </ButtonContainer>
            )}
            {account && (
              <ButtonContainer>
                {showUnderwaterFlow ? (
                  <TriggerBuildButton onClick={() => null} isDisabled={true} disabled={true}>
                    Position Underwater
                  </TriggerBuildButton>
                ) : exceedOiCap ? (
                  <TriggerBuildButton onClick={() => null} isDisabled={true} disabled={true}>
                    Exceeds OI Cap
                  </TriggerBuildButton>
                ) : exceedOiCapCircuitBreaker ? (
                  <TriggerBuildButton onClick={() => null} isDisabled={true} disabled={true}>
                    Exceeds Circuit Breaker OI Cap
                  </TriggerBuildButton>
                ) : showBalanceNotEnoughWarning ? (
                  <TriggerBuildButton onClick={() => null} isDisabled={true} disabled={true}>
                    OVL Balance Below Minimum
                  </TriggerBuildButton>
                ) : showApprovalFlow ? (
                  <ApproveTransactionButton attemptingTransaction={attemptingTransaction} onClick={handleApprove} />
                ) : (
                  <TriggerBuildButton
                    onClick={() => {
                      setBuildState({
                        showConfirm: true,
                        attemptingTransaction: false,
                        transactionErrorMessage: undefined,
                        transactionHash: undefined,
                      })
                    }}
                    isDisabled={disableBuildButton}
                    disabled={disableBuildButton}
                  >
                    Build {isPriceImpactHigh && '- High Price Impact'}
                  </TriggerBuildButton>
                )}
              </ButtonContainer>
            )}

            <AdditionalDetails
              priceCurrency={priceCurrency}
              bidPrice={prices.bid}
              askPrice={prices.ask}
              fee={buildFee ? formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5)) : 'loading'}
              oiCap={formattedCapOi}
              oiLong={formattedOiLong}
              oiShort={formattedOiShort}
              slippageTolerance={setSlippageValue}
              fundingRate={fundingRate}
              expectedOi={expectedOi && typedValue !== '' ? expectedOi : null}
              estLiquidationPrice={estimatedLiquidationPrice && typedValue !== '' ? estimatedLiquidationPrice : '-'}
              feedAddress={market?.feedAddress}
            />
          </MarketCard>
        </RightColumn>
        <PositionsTableContainerSmallSize>
          <PositionsTableForBuildPage
            title="Positions"
            marginTop="40px"
            positionStatus={PositionStatus.Build}
            rowsCount={0}
            marketsData={marketsData}
          />
        </PositionsTableContainerSmallSize>
        <ConfirmTxnModal
          marketName={marketName}
          isOpen={showConfirm}
          attemptingTransaction={attemptingTransaction}
          isLong={isLong}
          buildFee={buildFee && formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5))}
          onConfirm={() => handleBuild()}
          onDismiss={handleDismiss}
          marketPrice={!isLong ? prices.bid : prices.ask}
          setSlippageValue={setSlippageValue}
          selectedLeverage={selectedLeverage}
          adjustedCollateral={adjustedCollateral}
          expectedOi={expectedOi && typedValue !== '' ? expectedOi : null}
          estimatedLiquidationPrice={estimatedLiquidationPrice && typedValue !== '' ? estimatedLiquidationPrice : '-'}
          transactionHash={transactionHash}
          transactionErrorMessage={transactionErrorMessage}
          minPrice={minPrice.length === 1 ? minPrice[0] : undefined}
          isDominanceMarket={priceCurrency === '%'}
        />
      </BuildContainer>
      {descriptionText && (
        <>
          <AboutMarketTitle>About Market</AboutMarketTitle>
          <AboutMarketSection>
            <AboutMarketText>
              <FirstColumn>
                <TextBesideLogo>
                  <Icon size={40}>{marketLogo ? <img src={marketLogo} alt="Market Feed Logo" /> : <AlertCircle size={20} />}</Icon>
                  <TextAboveLogo>{marketName}</TextAboveLogo>
                </TextBesideLogo>
                <TextBelowLogo>{descriptionText}</TextBelowLogo>
              </FirstColumn>
            </AboutMarketText>
            <AboutMarket>
              {marketIndex && marketIndex.length > 0 && (
                <SecondColumn>
                  <LeftDetailColumn>Indexes Construction</LeftDetailColumn>
                  <RightDetailColumn style={{height: 'auto'}}>
                    <UlList>
                      {visibleIndexes?.map((element, index) => (
                        <>
                          <LiList key={index}>{element}</LiList>
                          <br />
                        </>
                      ))}
                    </UlList>
                    {marketIndex && marketIndex.length > 4 && (
                      <SeeMoreButton onClick={toggleShowAll}>{showAll ? 'Show less' : 'See more'}</SeeMoreButton>
                    )}
                  </RightDetailColumn>
                </SecondColumn>
              )}
              {proposedBy && (
                <SecondColumn>
                  <LeftDetailColumn>Proposed by</LeftDetailColumn>
                  <RightDetailColumn>
                    <a href={proposedBy.url} target="_blank" style={proposedBy.url ? {color: colors(false).dark.blue2} : {}}>
                      {proposedBy.name}
                    </a>
                  </RightDetailColumn>
                </SecondColumn>
              )}
              {approved && (
                <SecondColumn>
                  <LeftDetailColumn>approved</LeftDetailColumn>
                  <RightDetailColumn>
                    <a href={approved.url} target="_blank" style={approved.url ? {color: colors(false).dark.blue2} : {}}>
                      {approved.name}
                    </a>
                  </RightDetailColumn>
                </SecondColumn>
              )}
              {contract && (
                <SecondColumn>
                  <LeftDetailColumn>contract</LeftDetailColumn>
                  <a href={contract.url} target="_blank" style={contract.url ? {color: colors(false).dark.blue2} : {}}>
                    {contract.name}
                  </a>
                </SecondColumn>
              )}
            </AboutMarket>
            <AboutMarket>
              {sources && sources.length > 0 && (
                <SecondColumn>
                  <LeftDetailColumn>Sources</LeftDetailColumn>
                  <RightDetailColumn>
                    <UlList style={{gap: '16px'}}>
                      {sources.map((element, index) => (
                        <LiList key={index}>
                          <a href={element.url} target="_blank" style={element.url ? {color: colors(false).dark.blue2} : {}}>
                            {element.name}
                          </a>
                        </LiList>
                      ))}
                    </UlList>
                  </RightDetailColumn>
                </SecondColumn>
              )}
              {additionalInfo && (
                <SecondColumn>
                  <LeftDetailColumn>Additional Information</LeftDetailColumn>
                  <RightDetailColumn>
                    <a href={additionalInfo.url} target="_blank" style={additionalInfo.url ? {color: colors(false).dark.blue2} : {}}>
                      {additionalInfo.name}
                    </a>
                  </RightDetailColumn>
                </SecondColumn>
              )}
            </AboutMarket>
            {fullMarketLogo && (
              <ImageContainer>
                <ImageComponent src={fullMarketLogo} alt="Image description" />
              </ImageContainer>
            )}
          </AboutMarketSection>
        </>
      )}
    </div>
  )
}
