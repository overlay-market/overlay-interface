import Box from '@material-ui/core/Box'
import {TEXT, colors} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import OverviewCard from '../../components/Card/OverviewCard'
import {PageContainer} from '../../components/Container/Container'
import ReferralModal from './ReferralModal'
import {RebatesTable} from './RebatesTable'
import {useHistory} from 'react-router-dom'

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
`

export const ReferralPage = () => {
  const {account} = useActiveWeb3React()
  const history = useHistory()
  const handleTraderLinkClick = () => {
    history.push('/trader')
  }

  const cardsData = [
    {
      title: 'Create a referral code',
      value: '500,000 $OV',
      valueType: 'volume left',
      valueTypeLink: null,
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

  cardsData.forEach(cardsData => {
    if (cardsData.title === 'Create a referral code' && cardsData.value === '0 $OV') {
      cardsData.value = cardsData.value + ' volume left'
      cardsData.valueType = 'Create code ->'
    }
  })

  return (
    <PageContainer>
      <Container mt={'50px'}>
        <Box>
          <Box display={'flex'} flexDirection={'row'}>
            <TEXT.BoldHeader1 mb="16px">Referral</TEXT.BoldHeader1>
            <TEXT.SmallBody width={'auto'} ml={'auto'} mt={'5px'}>
              <a onClick={handleTraderLinkClick} target="blank" style={{color: colors(false).dark.blue2, cursor: 'pointer'}}>
                Enter a referral code &rarr;
              </a>
            </TEXT.SmallBody>
          </Box>
          <ReferralModal />
        </Box>
        <Box>
          {account ? (
            <Grid container spacing={3}>
              {cardsData.map(card => {
                return (
                  <StyledGrid
                    item
                    key={card.title}
                    xs={card.title === 'Create a referral code' || card.title === 'Locked Sum' ? 12 : 6}
                    sm={6}
                    md={6}
                    lg={3}
                  >
                    <OverviewCard
                      title={card.title}
                      value={card.value}
                      valueType={card.valueType}
                      valueTypeLink={card.valueTypeLink}
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
        <Box>
          <RebatesTable />
        </Box>
      </Container>
    </PageContainer>
  )
}
