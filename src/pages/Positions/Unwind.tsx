import {useEffect, useCallback, useMemo, useState} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {BigNumber, BigNumberish} from 'ethers'
import {RouteComponentProps} from 'react-router-dom'
import {TEXT} from '../../theme/theme'
import {InterfaceWrapper} from '../../components/Container/Container'
import {Back} from '../../components/Back/Back'
import {useActiveWeb3React} from '../../hooks/web3'
import {useUnwindCallback} from '../../hooks/useUnwindCallback'
import {useCurrentWalletPositionsV2} from '../../state/build/hooks'
import {NumericalInputBottomText, NumericalInputContainer, NumericalInputDescriptor} from '../Markets/Build'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import {useUnwindState, useUnwindActionHandlers, useDerivedUnwindInfo} from '../../state/unwind/hooks'
import {formatWeiToParsedNumber, formatBigNumberUsingDecimalsToString, formatBigNumberUsingDecimalsToNumber} from '../../utils/formatWei'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {TransparentUnderlineButton, TriggerActionButton} from '../../components/Button/Button'
import {useToken} from '../../hooks/useToken'
import {usePositionDebt} from '../../hooks/usePositionDebt'
import {usePositionNotional} from '../../hooks/usePositionNotional'
import {useMaintenanceMargin} from '../../hooks/useMaintenanceMargin'
import {usePositionCollateral} from '../../hooks/usePositionCollateral'
import {useMarketPrice} from '../../hooks/useMarketPrices'
import {Icon} from '../../components/Icon/Icon'
import {Sliders, X} from 'react-feather'
import {PercentageSlider} from '../../components/PercentageSlider/PercentageSlider'
import {useMarketName} from '../../hooks/useMarketName'
import {MarketDetails} from '../../constants/markets'
import {useFractionOfCapOi} from '../../hooks/useFractionOfCapOi'
import {useBid} from '../../hooks/useBid'
import {useAsk} from '../../hooks/useAsk'
import Loader from '../../components/Loaders/Loaders'
import {formatDecimalToPercentage} from '../../utils/formatDecimal'
import {toPercentUnit, toScientificNumber} from '../../utils/toScientificNumber'
import {useEmergencyWithdrawCallback} from '../../hooks/useEmergencyWithdrawCallback'
import {useSetSlippageModalToggle} from '../../state/application/hooks'
import {usePositionMulticall} from '../../hooks/usePositionMulticall'

const ControlInterfaceContainer = styled(FlexColumn)`
  padding: 16px;
`

const ControlInterfaceHeadContainer = styled(FlexColumn)`
  padding: 16px 0 24px;
`

const UnwindButton = styled(TriggerActionButton)`
  margin: 24px 0;
  border: 1px solid #f2f2f2;
`

export const AdditionalDetailRow = ({
  detail,
  value,
  detailColor,
  valueColor,
}: {
  detail: string
  value?: string | number
  detailColor?: string
  valueColor?: string | number
}) => {
  return (
    <FlexRow m={'2px 0'}>
      <TEXT.StandardBody mr={'auto'} color={detailColor}>
        {detail}
      </TEXT.StandardBody>

      <TEXT.StandardBody fontWeight={700} color={valueColor}>
        {value === 'loading' ? <Loader stroke="white" size="12px" /> : value}
      </TEXT.StandardBody>
    </FlexRow>
  )
}

export function Unwind({
  match: {
    params: {marketPositionId, positionId},
  },
}: RouteComponentProps<{marketPositionId: string; positionId: string}>) {
  const history = useHistory()
  const [isTxnSettingsOpen] = useState<boolean>(false)
  const [customInput, setCustomInput] = useState<string>('')
  const {account, chainId} = useActiveWeb3React()
  const {positions, isUninitialized, refetch} = useCurrentWalletPositionsV2(account)

  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, isUninitialized, refetch])

  const {typedValue} = useUnwindState()
  const {onAmountInput, onSelectPositionId, onResetUnwindState} = useUnwindActionHandlers()

  const filtered = positions?.filter((index, key) => index.id === marketPositionId)

  const position = filtered ? filtered[0] : null
  const isMarketShutDown = position?.market.isShutdown

  const {baseToken, quoteToken, quoteTokenAddress, decimals, description} = useMarketName(position?.market.feedAddress)

  const marketName = useMemo(() => {
    if (description) return MarketDetails[marketPositionId.substring(0, 42)]?.marketName
    if (baseToken === 'loading' && quoteToken === 'loading') return <Loader stroke="white" size="12px" />
    return `${baseToken}/${quoteToken}`
  }, [description, baseToken, marketPositionId, quoteToken])

  const priceCurrency = useMemo(() => {
    return MarketDetails[marketPositionId.substring(0, 42)]?.currency
  }, [marketPositionId])

  const quoteTokenInfo = useToken(quoteTokenAddress)

  const quoteTokenDecimals = useMemo(() => {
    if (!quoteTokenInfo) return undefined
    return quoteTokenInfo.decimals
  }, [quoteTokenInfo])

  const positionIdConverted = BigNumber.from(positionId).toString()

  const multicallRes = usePositionMulticall(position?.market.id, positionId)
  const {value, cost, info: positionInfo, oiCurrent: oi, liquidationPrice: liquidationPriceResult} = multicallRes

  const isLong = positionInfo ? positionInfo.isLong : undefined
  const collateral = usePositionCollateral(position?.market.id, positionId)
  const debt = usePositionDebt(position?.market.id, positionId)
  const notional = usePositionNotional(position?.market.id, positionId)
  const maintenanceMargin = useMaintenanceMargin(position?.market.id, positionId)
  const liquidationPrice =
    liquidationPriceResult &&
    formatBigNumberUsingDecimalsToNumber(liquidationPriceResult, decimals ? 18 : quoteTokenDecimals, priceCurrency === '%' ? 4 : 2)

  const fractionOfCapOi = useFractionOfCapOi(position?.market.id, oi)
  const estimatedBid = useBid(position?.market.id, fractionOfCapOi)
  const estimatedAsk = useAsk(position?.market.id, fractionOfCapOi)

  const currentValue: number = useMemo(() => formatWeiToParsedNumber(value, 18, 4) ?? 0, [value])

  const estimatedReceivedPrice = useMemo(() => {
    if (isLong === undefined) return null
    if (!decimals && !quoteTokenDecimals) return null
    if (estimatedBid === undefined || estimatedAsk === undefined) return null
    return isLong
      ? formatBigNumberUsingDecimalsToNumber(estimatedBid, decimals ? 18 : quoteTokenDecimals, priceCurrency === '%' ? 4 : 2)
      : formatBigNumberUsingDecimalsToNumber(estimatedAsk, decimals ? 18 : quoteTokenDecimals, priceCurrency === '%' ? 4 : 2)
  }, [isLong, estimatedBid, estimatedAsk, quoteTokenDecimals, decimals, priceCurrency])

  const fetchPrices = useMarketPrice(position?.market.id)

  const prices: {
    bid?: string | number | any
    ask?: string | number | any
    mid?: string | number | any
    _bid?: BigNumberish
    _ask?: BigNumberish
    _mid?: BigNumberish
  } = useMemo(() => {
    if (fetchPrices === undefined || !fetchPrices)
      return {
        bid: 'loading',
        ask: 'loading',
        mid: 'loading',
        _bid: undefined,
        _ask: undefined,
        _mid: undefined,
      }

    return {
      bid: formatWeiToParsedNumber(fetchPrices[0], 18, 2)?.toString(),
      ask: formatWeiToParsedNumber(fetchPrices[1], 18, 2)?.toString(),
      mid: formatWeiToParsedNumber(fetchPrices[2], 18, 2)?.toString(),
      _bid: fetchPrices.bid_,
      _ask: fetchPrices.ask_,
      _mid: fetchPrices.mid_,
    }
  }, [fetchPrices])

  const bidPrice = fetchPrices
    ? formatBigNumberUsingDecimalsToNumber(fetchPrices.bid_, decimals ? 18 : quoteTokenDecimals, priceCurrency === '%' ? 4 : 2)
    : null
  const askPrice = fetchPrices
    ? formatBigNumberUsingDecimalsToNumber(fetchPrices.ask_, decimals ? 18 : quoteTokenDecimals, priceCurrency === '%' ? 4 : 2)
    : null

  const priceImpact = useMemo(() => {
    if (!estimatedReceivedPrice) return null
    if (!typedValue || isLong === undefined || !bidPrice || !askPrice) return null

    const priceImpactValue = isLong ? bidPrice - estimatedReceivedPrice : estimatedReceivedPrice - askPrice

    const priceImpactPercentage = isLong ? (priceImpactValue / bidPrice) * 100 : (priceImpactValue / askPrice) * 100

    return priceImpactPercentage.toFixed(6)
  }, [estimatedReceivedPrice, typedValue, isLong, bidPrice, askPrice])

  const PnL = cost && value ? value.sub(cost) : null
  const parsedPnL = PnL ? formatWeiToParsedNumber(PnL, 18, 2) : 0
  const entryPrice: number | string | null | undefined =
    position && formatBigNumberUsingDecimalsToString(position.entryPrice, decimals ? 18 : quoteTokenDecimals, priceCurrency === '%' ? 4 : 2)

  const showUnderwaterFlow =
    liquidationPriceResult && prices._mid ? (isLong ? liquidationPriceResult.gt(prices._mid) : liquidationPriceResult.lt(prices._mid)) : false

  const {unwindData} = useDerivedUnwindInfo()
  const {callback: unwindCallback} = useUnwindCallback(unwindData, position?.market.id, typedValue, value, positionId, isLong, prices)
  const {callback: emergencyWithdrawCallback} = useEmergencyWithdrawCallback(position?.market.id, positionId)
  useEffect(() => {
    onResetUnwindState()
  }, [positionId, onResetUnwindState])

  const handleUserAmount = useCallback(
    (e: any, maxAmount: number) => {
      setCustomInput(((e.target.value / 100) * maxAmount).toString())
      onAmountInput(e.target.value)
    },
    [onAmountInput],
  )

  // Stop keyboard inputs at 18 decimals
  const handleUserInputKeyPress = (event: any) => {
    const regex = /^\d*\.?\d{0,17}$/
    if (!regex.test(event.target.value)) {
      event.preventDefault()
      return
    }
  }

  const handleUserInput = useCallback(
    (input: string, maxAmount: number) => {
      const exactAmount = Number(input)

      if (exactAmount === 0) {
        setCustomInput(input)
        onAmountInput('0')
        return
      }

      if (exactAmount > 0 && exactAmount <= maxAmount) {
        const res = formatDecimalToPercentage(exactAmount / Number(maxAmount))
        setCustomInput(input)
        if (res) onAmountInput(res.toFixed(18))
      } else {
        setCustomInput(input)
        if (!isNaN(Number(input))) onAmountInput('100')
      }
    },

    [setCustomInput, onAmountInput],
  )

  const handleQuickInput = (percentage: number) => {
    if (percentage < 0 || percentage > 100) {
      setCustomInput('0')
      return onAmountInput('0')
    }
    setCustomInput(((percentage / 100) * currentValue).toString())
    return onAmountInput(percentage.toString())
  }

  const handleSelectPosition = useCallback(
    (positionId: number) => {
      onSelectPositionId(positionId)
    },
    [onSelectPositionId],
  )

  useEffect(() => {
    handleSelectPosition(Number(position?.positionId))
  }, [position, handleSelectPosition])

  // const handleClearInput = useCallback(() => {
  //   onAmountInput('')
  // }, [onAmountInput])

  const disableUnwindButton: boolean = useMemo(() => {
    return !unwindCallback || parseFloat(typedValue) === 0 ? true : false
  }, [unwindCallback, typedValue])

  const handleUnwind = useCallback(() => {
    if (!unwindCallback) return
    unwindCallback()
      .then(success => {
        onResetUnwindState()
        history.push(`/positions`)
      })
      .catch(err => console.error('Error from handleUnwind: ', err))
  }, [history, unwindCallback, onResetUnwindState])

  const handleWithdrawFromShutDownMarket = useCallback(() => {
    if (!emergencyWithdrawCallback) return
    emergencyWithdrawCallback()
      .then(success => {
        onResetUnwindState()
        history.push(`/positions`)
      })
      .catch(err => console.error('Error from handleWithdrawFromShutDownMarket: ', JSON.stringify(err)))
  }, [history, emergencyWithdrawCallback, onResetUnwindState])

  const isUnwindAmountTooLow: boolean = useMemo(() => {
    if (Number(typedValue) < 0.01 && customInput) {
      return true
    }
    return false
  }, [typedValue, customInput])

  const isUnwindAmountTooHigh: boolean = useMemo(() => {
    if (currentValue < Number(customInput)) {
      return true
    }
    return false
  }, [customInput, currentValue])

  const toggleSetSlippageModal = useSetSlippageModalToggle()

  return !isMarketShutDown ? (
    <InterfaceWrapper>
      <>
        <Back arrowSize={16} fontSize={16} />
        <ControlInterfaceContainer onSubmit={(e: any) => e.preventDefault()} as={'form'}>
          <ControlInterfaceHeadContainer>
            <TEXT.StandardHeader1 fontWeight={700} m={'0 4px 4px 4px'}>
              ID: {positionIdConverted}
            </TEXT.StandardHeader1>
            <TEXT.StandardHeader1 fontWeight={500} m={'0 4px 4px 4px'}>
              {marketName}
            </TEXT.StandardHeader1>
            <TEXT.StandardHeader1 minHeight={'30px'}>
              {isLong !== undefined ? (
                isLong ? (
                  priceCurrency === '%' ? (
                    toPercentUnit(bidPrice)
                  ) : (
                    toScientificNumber(bidPrice)
                  )
                ) : priceCurrency === '%' ? (
                  toPercentUnit(askPrice)
                ) : (
                  toScientificNumber(askPrice)
                )
              ) : (
                <Loader stroke="white" size="12px" />
              )}{' '}
            </TEXT.StandardHeader1>
            <Icon
              onClick={toggleSetSlippageModal}
              size={24}
              top={'18px'}
              right={'0px'}
              clickable={true}
              position={'absolute'}
              margin={'0 0 auto auto'}
              transform={'rotate(90deg)'}
            >
              {isTxnSettingsOpen ? <X color={'#12B4FF'} /> : <Sliders color={'#B9BABD'} />}
            </Icon>
          </ControlInterfaceHeadContainer>

          <FlexRow mb="4px" width="100%">
            <TEXT.StandardBody margin={'0 auto 4px 0'} color={'white'}>
              Unwind Amount
            </TEXT.StandardBody>
            <TransparentUnderlineButton onClick={() => handleQuickInput(25)} border={'none'}>
              25%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={() => handleQuickInput(50)} border={'none'}>
              50%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={() => handleQuickInput(75)} border={'none'}>
              75%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={() => handleQuickInput(100)} border={'none'}>
              Max
            </TransparentUnderlineButton>
          </FlexRow>

          <NumericalInputContainer>
            <NumericalInputDescriptor> OVL </NumericalInputDescriptor>
            <NumericalInput
              align={'right'}
              onUserInput={input => handleUserInput(input, currentValue)}
              value={customInput}
              onKeyPress={handleUserInputKeyPress}
            />
          </NumericalInputContainer>
          <NumericalInputBottomText>minimum: 0.01%</NumericalInputBottomText>

          <PercentageSlider
            name={'Unwind Position Amount'}
            min={0}
            max={100}
            step={1}
            showTilde={Number(typedValue) <= 0.01 && Boolean(typedValue)}
            value={Number(typedValue) >= 0.01 ? Number(Number(typedValue).toFixed(2)) : 0.0}
            onChange={e => handleUserAmount(e, currentValue)}
            margin={'20px 0 0 0'}
            justifyContent={'flex-end'}
          ></PercentageSlider>
          {showUnderwaterFlow ? (
            <UnwindButton onClick={() => null} isDisabled={true} disabled={true}>
              Position Underwater
            </UnwindButton>
          ) : isUnwindAmountTooLow ? (
            <UnwindButton onClick={() => null} isDisabled={true} disabled={true}>
              Percentage Below Minimum
            </UnwindButton>
          ) : (
            <UnwindButton
              onClick={() => handleUnwind()}
              isDisabled={isUnwindAmountTooHigh || disableUnwindButton}
              disabled={isUnwindAmountTooHigh || disableUnwindButton}
            >
              Unwind
            </UnwindButton>
          )}
        </ControlInterfaceContainer>
        <FlexColumn mt="48px" padding="0 16px">
          <AdditionalDetailRow
            detail={'Profit/Loss'}
            valueColor={parsedPnL !== undefined && parsedPnL !== 0 ? (parsedPnL < 0 ? '#FF648A' : '#10DCB1') : '#F2F2F2'}
            value={PnL ? `${formatWeiToParsedNumber(PnL, 18, 2)} OVL` : 'loading'}
          />
          <AdditionalDetailRow detail={'Side'} valueColor={'#F2F2F2'} value={isLong !== undefined ? (isLong ? 'Long' : 'Short') : 'loading'} />
        </FlexColumn>
        <FlexColumn mt="48px" padding="0 16px">
          <AdditionalDetailRow detail={'Value'} value={value ? `${formatWeiToParsedNumber(value, 18, 4)} OVL` : 'loading'} />
          <AdditionalDetailRow detail={'Open Interest'} value={oi ? `${formatWeiToParsedNumber(oi, 18, 4)}` : 'loading'} />
          <AdditionalDetailRow detail={'Leverage'} value={position?.leverage ? `${Number(position.leverage).toFixed(1)}x` : 'loading'} />
          <AdditionalDetailRow detail={'Debt'} value={debt ? `${formatWeiToParsedNumber(debt, 18, 4)} OVL` : 'loading'} />
          <AdditionalDetailRow detail={'Cost'} value={cost ? `${formatWeiToParsedNumber(cost, 18, 4)} OVL` : 'loading'} />
          <AdditionalDetailRow detail={'Current Collateral'} value={collateral ? `${formatWeiToParsedNumber(collateral, 18, 4)} OVL` : 'loading'} />
          <AdditionalDetailRow detail={'Current Notional'} value={notional ? `${formatWeiToParsedNumber(notional, 18, 4)} OVL` : 'loading'} />
          <AdditionalDetailRow
            detail={'Initial Collateral'}
            value={position?.initialCollateral ? `${formatWeiToParsedNumber(position?.initialCollateral, 18, 4)} OVL` : 'loading'}
          />
          <AdditionalDetailRow
            detail={'Initial Notional'}
            value={position?.initialNotional ? `${formatWeiToParsedNumber(position?.initialNotional, 18, 4)} OVL` : 'loading'}
          />
          <AdditionalDetailRow
            detail={'Maintenance'}
            value={maintenanceMargin ? `${formatWeiToParsedNumber(maintenanceMargin, 18, 4)} OVL` : 'loading'}
          />
        </FlexColumn>

        <FlexColumn mt="48px" padding="0 16px">
          <AdditionalDetailRow
            detail={'Entry Price'}
            value={entryPrice ? `${priceCurrency === '%' ? toPercentUnit(entryPrice) : toScientificNumber(entryPrice)}` : 'loading'}
          />
          <AdditionalDetailRow
            detail={'Current Price'}
            value={
              bidPrice && askPrice
                ? isLong
                  ? priceCurrency === '%'
                    ? toPercentUnit(bidPrice)
                    : toScientificNumber(bidPrice)
                  : priceCurrency === '%'
                  ? toPercentUnit(askPrice)
                  : toScientificNumber(askPrice)
                : 'loading'
            }
          />
          <AdditionalDetailRow
            detail={'Est. Received Price'}
            value={
              estimatedReceivedPrice
                ? priceCurrency === '%'
                  ? toPercentUnit(estimatedReceivedPrice)
                  : toScientificNumber(estimatedReceivedPrice)
                : 'loading'
            }
          />
          <AdditionalDetailRow detail={'Price Impact'} value={priceImpact ? `${priceImpact}%` : '-'} />
          <AdditionalDetailRow
            detail={'Liquidation Price (est)'}
            value={liquidationPrice ? (priceCurrency === '%' ? toPercentUnit(liquidationPrice) : toScientificNumber(liquidationPrice)) : 'loading'}
          />
        </FlexColumn>
      </>
    </InterfaceWrapper>
  ) : (
    <InterfaceWrapper>
      <>
        <Back arrowSize={16} fontSize={16} />
        <ControlInterfaceContainer onSubmit={(e: any) => e.preventDefault()} as={'form'}>
          <ControlInterfaceHeadContainer>
            <TEXT.StandardHeader1 fontWeight={700} m={'0 4px 4px 4px'}>
              ID: {positionIdConverted}
            </TEXT.StandardHeader1>
            <TEXT.StandardHeader1 fontWeight={500} m={'0 4px 4px 4px'}>
              {marketName}
            </TEXT.StandardHeader1>
            <TEXT.StandardHeader1 fontWeight={500} m={'20px 0 0 0'}>
              {`Withdraw: ${formatWeiToParsedNumber(cost, 18, 6)} OVL`}
            </TEXT.StandardHeader1>
          </ControlInterfaceHeadContainer>
          <TEXT.StandardBody textAlign={'center'} m={'20px 0 0 0'}>
            This market has been shut down. You may only withdraw any previously deposited OVL.
          </TEXT.StandardBody>
          <UnwindButton onClick={() => handleWithdrawFromShutDownMarket()}>Withdraw OVL</UnwindButton>
        </ControlInterfaceContainer>
      </>
    </InterfaceWrapper>
  )
}
