import Box from '@material-ui/core/Box'
import {TEXT, colors} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import MainOverviewCard from '../../components/Card/MainOverviewCard'
import OverviewCard from '../../components/Card/OverviewCard'
import {PageContainer} from '../../components/Container/Container'

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

export const ReferralPage = () => {
  const {account} = useActiveWeb3React()

  const cardsData = [
    {
      title: 'Create a referral code',
      value: '500,000 $OV volume left',
      valueType: 'Create codem ->',
      percentageChange: null,
      period: 'Claim ->',
    },
    {
      title: 'Locked Sum',
      value: '10',
      valueType: 'OVL',
      percentageChange: null,
      period: '24h',
    },
    {
      title: 'Unrealized',
      value: '10',
      valueType: 'OVL',
      percentageChange: null,
      period: '24h',
    },
    {
      title: 'Open Positions',
      value: '10',
      valueType: null,
      period: '24h',
    },
  ]

  return (
    <PageContainer>
      <Container mt={'50px'}>
        <TEXT.BoldHeader1 mb="16px">Referral</TEXT.BoldHeader1>
        <TEXT.SmallBody mb="32px">
          Refer users to earn rewards. Ambassadors earn greater rewards.{' '}
          <a href="/" style={{color: colors(false).dark.blue2}}>
            How does it work
          </a>
        </TEXT.SmallBody>
        <Box>
          {account ? (
            <Grid container spacing={3}>
              {/* Chart */}
              {/* <StyledGrid order={-1} item key={'chart'} xs={12} lg={8}>
              <OverviewChart />
            </StyledGrid> */}

              {cardsData.map(card => {
                return (
                  <StyledGrid item key={card.title} xs={12} sm={6} md={4} lg={3}>
                    <OverviewCard
                      title={card.title}
                      value={card.value}
                      valueType={card.valueType}
                      percentageChange={card.percentageChange}
                      period={card.period}
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
    </PageContainer>
  )
}
