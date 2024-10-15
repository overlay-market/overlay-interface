import {useEffect, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {BigNumber} from 'ethers'
import {RouteComponentProps} from 'react-router-dom'
import {TEXT} from '../../theme/theme'
import {InterfaceWrapper} from '../../components/Container/Container'
import {Back} from '../../components/Back/Back'
import {useActiveWeb3React} from '../../hooks/web3'
import {usePositionInfo} from '../../hooks/usePositionInfo'
import {PositionDataV2, Unwind, usePositionList} from '../../state/build/hooks'
import {useUnwindActionHandlers} from '../../state/unwind/hooks'
import {formatBigNumberUsingDecimalsToString} from '../../utils/formatWei'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {useToken} from '../../hooks/useToken'
import {useMarketName} from '../../hooks/useMarketName'
import {MarketDetails} from '../../constants/markets'
import Loader from '../../components/Loaders/Loaders'
import {toPercentUnit, toScientificNumber} from '../../utils/toScientificNumber'
import {limitDigitsInDecimals} from '../../utils/limitDigitsInDecimals'

const ControlInterfaceContainer = styled(FlexColumn)`
  padding: 16px;
`

const ControlInterfaceHeadContainer = styled(FlexColumn)`
  padding: 16px 0 24px;
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

function getMarketPositionId(unwindId: string) {
  return unwindId.split('-').slice(0, 2).join('-')
}

export function ClosedPosition({
  match: {
    params: {unwindId, positionId},
  },
}: RouteComponentProps<{unwindId: string; positionId: string}>) {
  const {account, chainId} = useActiveWeb3React()
  const marketPositionId = getMarketPositionId(unwindId)
  const {positions, isUninitialized, refetch} = usePositionList(account, [marketPositionId])

  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, isUninitialized, refetch])

  const {onSelectPositionId, onResetUnwindState} = useUnwindActionHandlers()

  const position = positions ? positions[0] : null
  let filteredUnwind: Unwind | undefined = undefined

  if (position) {
    let selectedUnwind = position.unwinds.filter(transaction => transaction.id === unwindId)
    if (selectedUnwind.length > 0) {
      filteredUnwind = selectedUnwind[0]
    }
  }

  const {baseToken, quoteToken, quoteTokenAddress, decimals, description} = useMarketName(position?.market.feedAddress)

  const marketName = useMemo(() => {
    if (description) return MarketDetails[unwindId.substring(0, 42)]?.marketName
    if (baseToken === 'loading' && quoteToken === 'loading') return <Loader stroke="white" size="12px" />
    return `${baseToken}/${quoteToken}`
  }, [description, baseToken, quoteToken, unwindId])

  const priceCurrency = useMemo(() => {
    return MarketDetails[unwindId.substring(0, 42)]?.currency
  }, [unwindId])

  const quoteTokenInfo = useToken(quoteTokenAddress)

  const quoteTokenDecimals = useMemo(() => {
    if (!quoteTokenInfo) return undefined
    return quoteTokenInfo.decimals
  }, [quoteTokenInfo])

  const positionIdConverted = BigNumber.from(positionId).toString() + '  -  UNWIND: #' + unwindId.split('-')[2]

  const positionInfo = usePositionInfo(position?.market.id, positionId)
  const isLong = positionInfo ? positionInfo.isLong : undefined

  const parsedPnL = filteredUnwind ? +filteredUnwind.pnl / 10 ** 18 : undefined
  const entryPrice: number | string | null | undefined =
    position && formatBigNumberUsingDecimalsToString(position.entryPrice, decimals ? 18 : quoteTokenDecimals, 8)

  const exitPrice: number | string | null | undefined =
    filteredUnwind && formatBigNumberUsingDecimalsToString(filteredUnwind.price, decimals ? 18 : quoteTokenDecimals, 8)

  useEffect(() => {
    onResetUnwindState()
  }, [positionId, onResetUnwindState])

  const handleSelectPosition = useCallback(
    (positionId: number) => {
      onSelectPositionId(positionId)
    },
    [onSelectPositionId],
  )

  useEffect(() => {
    handleSelectPosition(Number(position?.positionId))
  }, [position, handleSelectPosition])

  return (
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
          </ControlInterfaceHeadContainer>
        </ControlInterfaceContainer>
        <FlexColumn mt="48px">
          <AdditionalDetailRow
            detail={'Profit/Loss'}
            valueColor={parsedPnL !== undefined && parsedPnL !== 0 ? (parsedPnL < 0 ? '#FF648A' : '#10DCB1') : '#F2F2F2'}
            value={
              parsedPnL !== undefined
                ? `${parsedPnL === 0 ? 0 : Math.abs(parsedPnL) < 1 ? parsedPnL.toFixed(6) : parsedPnL.toFixed(2)} OVL`
                : 'loading'
            }
          />
          <AdditionalDetailRow detail={'Side'} valueColor={'#F2F2F2'} value={isLong !== undefined ? (isLong ? 'Long' : 'Short') : 'loading'} />
        </FlexColumn>

        <FlexColumn mt="48px">
          <AdditionalDetailRow
            detail={'Entry Price'}
            value={
              entryPrice ? `${priceCurrency === '%' ? toPercentUnit(entryPrice) : toScientificNumber(limitDigitsInDecimals(entryPrice))}` : 'loading'
            }
          />
          <AdditionalDetailRow
            detail={'Exit Price'}
            value={
              exitPrice ? `${priceCurrency === '%' ? toPercentUnit(exitPrice) : toScientificNumber(limitDigitsInDecimals(exitPrice))}` : 'loading'
            }
          />
        </FlexColumn>
      </>
    </InterfaceWrapper>
  )
}
