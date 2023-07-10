import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import OverviewCard from '../../components/Card/OverviewCard'
import {Grid, Box} from '@material-ui/core'
import {useTotalValueLocked} from '../../hooks/useTotalValueLocked'
import {useTotalCost} from '../../hooks/useTotalCost'
import {useTotalFees} from '../../hooks/useTotalFees'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {useMemo} from 'react'
import {colors} from '../../theme/theme'
import MainOverviewCard from '../../components/Card/MainOverviewCard'

const Container = styled.div<{mt?: string}>`
  display: flex;
  flex-direction: column;
  margin-top: 0;

  ${({theme, mt}) => theme.mediaWidth.minMedium`
    margin-top: ${mt ? `${mt}` : ''};
  `}
`

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: stretch;
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

  const cardsData = [
    {
      title: 'Open Positions',
      value: numberOfOpenPositions.toString(),
      percentageChange: 25,
    },
    {
      title: 'Locked Sum',
      value: `${numberOfOpenPositions > 0 ? (tvl ? tvl + ' OVL' : 'loading') : null}`,
      percentageChange: 23,
      isOver1000OpenPositions: numberOfOpenPositions > 1000,
    },
    {
      title: 'Realized',
      value: `${numberOfUnwinds > 0 ? (realizedPnl ? realizedPnl + ' OVL' : 'loading') : null}`,
      percentageChange: 23,
    },
    {
      title: 'Unrealized',
      value: `${numberOfOpenPositions > 0 ? (upnl ? upnl + ' OVL' : 'loading') : null}`,
      percentageChange: -5.65,
      isOver1000OpenPositions: numberOfOpenPositions > 1000,
    },
    {
      title: 'NFTs worth',
      value: null,
    },
    {
      title: 'NFTs',
      value: null,
    },
  ]

  return (
    <Container mt={marginTop}>
      <TEXT.BoldHeader1 mb="32px">{`${title}`}</TEXT.BoldHeader1>
      <Box>
        {account ? (
          <Grid container spacing={3}>
            {/* TODO: Chart */}
            <StyledGrid item key={'test'} xs={12} md={8} style={{height: '300px'}}>
              <OverviewCard title={'test'} value={'test'} percentageChange={100} />
            </StyledGrid>

            {/* Locked Sum + uPnL */}
            <StyledGrid item key={'test'} xs={12} md={4}>
              <MainOverviewCard title={'Locked Sum + uPnL'} value={'223 OVL'} percentageChange={23} />
            </StyledGrid>
            {cardsData.map(card => {
              return (
                <StyledGrid item key={card.title} xs={6} sm={4} lg={2}>
                  <OverviewCard
                    title={card.title}
                    value={card.value}
                    percentageChange={card.percentageChange}
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
