import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import OverviewCard from '../../components/Card/OverviewCard'
import {Grid, Box} from '@material-ui/core'
import {useTotalValueLocked} from '../../hooks/useTotalValueLocked'
import {useTotalCost} from '../../hooks/useTotalCost'
import {useTotalFees} from '../../hooks/useTotalFees'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {useEffect, useMemo} from 'react'
import {colors} from '../../theme/theme'
import MainOverviewCard from '../../components/Card/MainOverviewCard'
import OverviewChart from '../../components/Chart/OverviewChart'
import {isLiquidatesQuery, isUnwindsQuery, usePositionsTableData} from '../../state/build/hooks'
import {PositionStatus} from './PositionsPage'
import {useActiveWeb3React} from '../../hooks/web3'

const Container = styled.div<{mt?: string}>`
  display: flex;
  flex-direction: column;
  margin-top: 0;
  position: relative;
  z-index: 1;

  ${({theme, mt}) => theme.mediaWidth.minMedium`
    margin-top: ${mt ? `${mt}` : ''};
  `}
`

const StyledGrid = styled(Grid)<{order?: number}>`
  display: flex;
  padding: 4px !important;

  ${({theme, order}) => theme.mediaWidth.minMedium`
  order: ${order ? `${order}` : 0};
  padding: 12px !important;
  `}
`

export interface Props {
  account: string | null | undefined
  marginTop: string
  numberOfOpenPositions: number
  numberOfUnwinds: number
  realizedPnl: string
}

export const Overview = ({account, marginTop, numberOfOpenPositions, numberOfUnwinds, realizedPnl}: Props) => {
  const title = 'Overview'

  const totalValueLocked = useTotalValueLocked(account)
  const totalCost = useTotalCost(account)
  const totalFees = useTotalFees(account)
  const {chainId} = useActiveWeb3React()

  // TODO: separate hooks
  const {
    positionsTableData: unwinds,
    isUninitialized: isUninitializedUnwinds,
    refetch: refetchUnwinds,
  } = usePositionsTableData(account, Infinity, 0, PositionStatus.Closed, undefined)
  const {
    positionsTableData: liquidatedPositions,
    isUninitialized: isUninitializedLiqPos,
    refetch: refetchLiquidatedPositions,
  } = usePositionsTableData(account, Infinity, 0, PositionStatus.Liquidated, undefined)

  useEffect(() => {
    !isUninitializedUnwinds && refetchUnwinds()
  }, [chainId, isUninitializedUnwinds, refetchUnwinds])

  useEffect(() => {
    !isUninitializedLiqPos && refetchLiquidatedPositions()
  }, [chainId, isUninitializedLiqPos, refetchLiquidatedPositions])

  const upnl = useMemo(() => {
    let formatValue = 0
    if (totalValueLocked && totalCost && totalFees) {
      let _formatValue = formatBigNumber(totalValueLocked.sub(totalCost).sub(totalFees), 18, 2)
      if (_formatValue) {
        formatValue = +_formatValue > 1 ? +_formatValue : +(formatBigNumber(totalValueLocked.sub(totalCost).sub(totalFees), 18, 6) ?? 0)
      }
    }
    return formatValue
  }, [totalValueLocked, totalCost, totalFees])

  const tvl = useMemo(() => {
    let formatValue = 0
    if (totalValueLocked) {
      let _formatValue = formatBigNumber(totalValueLocked, 18, 2)
      if (_formatValue) {
        formatValue = +_formatValue > 1 ? +_formatValue : +(formatBigNumber(totalValueLocked, 18, 6) ?? 0)
      }
    }
    return formatValue
  }, [totalValueLocked])

  const realizedPnlPercentageChange = useMemo(() => {
    const unwindRows = isUnwindsQuery(unwinds) ? unwinds.account?.unwinds ?? [] : []
    const liquidatedRows = isLiquidatesQuery(liquidatedPositions) ? liquidatedPositions?.account?.liquidates ?? [] : []

    const now = Math.floor(Date.now() / 1000)
    const oneDayAgo = now - 24 * 60 * 60

    let pnl24HoursChange = unwindRows.reduce((acc: number, curr: any) => {
      if (Number(curr.timestamp) > oneDayAgo) {
        return acc + parseInt(curr.pnl) / 10 ** 18
      } else {
        return acc
      }
    }, 0)

    liquidatedRows.forEach((liquidate: any) => {
      if (Number(liquidate.timestamp) > oneDayAgo) {
        pnl24HoursChange -= parseInt(liquidate.size) / 10 ** 18
      }
    })

    let percentageChangeRealizedPnl = 0
    if (pnl24HoursChange !== 0) {
      percentageChangeRealizedPnl = parseFloat(((pnl24HoursChange / Math.abs(Number(realizedPnl))) * 100).toFixed(2))
    }

    return percentageChangeRealizedPnl
  }, [unwinds, realizedPnl, liquidatedPositions])

  const cardsData = [
    {
      title: 'Open Positions',
      value: numberOfOpenPositions,
      valueType: null,
      percentageChange: null,
      period: '24h',
    },
    {
      title: 'Locked Sum',
      value: numberOfOpenPositions > 0 ? (tvl ? tvl : 'loading') : null,
      valueType: 'OVL',
      percentageChange: null,
      period: '24h',
      isOver1000OpenPositions: numberOfOpenPositions > 1000,
    },
    {
      title: 'Realized',
      value: numberOfUnwinds > 0 ? (realizedPnl ? realizedPnl : 'loading') : null,
      valueType: 'OVL',
      percentageChange: realizedPnlPercentageChange,
      period: '24h',
    },
    {
      title: 'Unrealized',
      value: numberOfOpenPositions > 0 ? (upnl ? upnl : 'loading') : null,
      valueType: 'OVL',
      percentageChange: null,
      period: '24h',
      isOver1000OpenPositions: numberOfOpenPositions > 1000,
    },
    // {
    //   title: 'NFTs worth',
    //   percentageChange: null,
    //   period: '7d',
    //   value: null,
    // },
    // {
    //   title: 'NFTs',
    //   value: null,
    // },
  ]

  const cardsAmount = cardsData.length

  const mainOverviewValue = useMemo(() => {
    const lockedSum = numberOfOpenPositions > 0 ? (tvl ? tvl : 0) : 0
    const unrealized = numberOfOpenPositions > 0 ? (upnl ? upnl : 0) : 0
    const sum = lockedSum + unrealized
    const formattedSum = sum < 1 ? sum.toFixed(6) : sum.toFixed(2)

    return `${formattedSum} OVL`
  }, [numberOfOpenPositions, tvl, upnl])

  return (
    <Container mt={marginTop}>
      <TEXT.BoldHeader1 mb="32px">{`${title}`}</TEXT.BoldHeader1>
      <Box>
        {account ? (
          <Grid container spacing={3}>
            {/* Locked Sum + uPnL */}
            <StyledGrid order={0} item key={'mainOverviewCard'} xs={12} lg={4}>
              <MainOverviewCard title={'Locked Sum + uPnL'} value={mainOverviewValue} percentageChange={null} period={'24h'} valueType={''} />
            </StyledGrid>

            {/* Chart */}
            <StyledGrid order={-1} item key={'chart'} xs={12} lg={8}>
              <OverviewChart />
            </StyledGrid>

            {cardsData.map(card => {
              return (
                <StyledGrid item key={card.title} xs={12} sm={6} md={cardsAmount === 4 ? 3 : 4} lg={cardsAmount === 4 ? 3 : 2}>
                  <OverviewCard
                    title={card.title}
                    value={card.value}
                    valueType={card.valueType}
                    percentageChange={card.percentageChange}
                    period={card.period}
                    isOver1000OpenPositions={card.isOver1000OpenPositions}
                  />
                </StyledGrid>
              )
            })}
          </Grid>
        ) : (
          <TEXT.SupplementalHeader fontSize={14}>
            Nothing here yet. Open a position on the{' '}
            <a href="/" style={{color: colors(false).dark.blue2}}>
              Markets
            </a>{' '}
            page to begin.
          </TEXT.SupplementalHeader>
        )}
      </Box>
    </Container>
  )
}
