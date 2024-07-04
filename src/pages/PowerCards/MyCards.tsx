import {Box, Card, Grid, Link} from '@material-ui/core'
import styled from 'styled-components'
import {colors} from '../../theme/theme'
import {ExternalLink as ExternalLinkIcon} from 'react-feather'

const StyledGrid = styled(Grid)`
  & .MuiGrid-root {
    @media (max-width: 767px) {
      margin: 0 auto;
      max-width: 360px;
      display: flex;
      justify-content: center;
      background: ${() => colors(false).dark.grey4};

      &:first-child {
        margin-top: 8px;
        padding-top: 12px !important;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      &:last-child {
        padding-bottom: 12px !important;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
  & .MuiGrid-item {
    padding: 6px !important;
  }
  ${({theme}) => theme.mediaWidth.minSmall`
  & .MuiGrid-item {
    padding: 10px !important;
  }
  `};
  ${({theme}) => theme.mediaWidth.minMedium`
  & .MuiGrid-item {
    padding: 6px !important;
  }
  `};
`
const ImageContainer = styled(Card)<{imgUrl: string}>`
  border-radius: 4px;
  cursor: pointer;
  aspect-ratio: 333/455;
  background: ${({imgUrl}) => `url(${imgUrl})`};
  background-size: cover;
  width: 333px;
  ${({theme}) => theme.mediaWidth.minSmall`
    width: auto;
  `};
`

const NoCardsContainer = styled(Box)`
  position: relative;
  right: 44px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  font-family: Inter;
  color: ${colors(true).dark.white};
  ${({theme}) => theme.mediaWidth.minSmall`
  right: 0;
  font-size: 16px;
  `};
`

const EmptyBgColorContainer = styled(Box)`
  ${({theme}) => theme.mediaWidth.minMedium`
    background: #161a27;
    position: absolute;
    left: 0;
    width: 100vw;
    height: calc(100vh - 250px);
  `};
`

const LinkContent = styled(Box)`
  display: flex;
  gap: 6px;
  font-weight: 700;
  color: ${colors(false).dark.blue2};
`

const MyCards = () => {
  // const myCardsData: Array<any> = []
  const handleSelectCard = (card: any) => {
    console.log('select a card!')
  }

  return (
    <>
      {!myCardsData.length && (
        <>
          <NoCardsContainer>
            <Box>No cards to display.</Box>
            <LinkContent>
              <Box>See the full collection on</Box>
              <Link
                href="#"
                target="_blank"
                rel="noopener"
                underline="always"
                style={{color: colors(false).dark.blue2, fontWeight: 700, fontFamily: 'Inter', textUnderlineOffset: '4px'}}
              >
                OpenSea
              </Link>
              <Link href="#" target="_blank" rel="noopener" style={{color: colors(false).dark.blue2}}>
                <ExternalLinkIcon width={15} height={15} />
              </Link>
            </LinkContent>
          </NoCardsContainer>
          <EmptyBgColorContainer />
        </>
      )}
      {myCardsData.length > 0 && (
        <StyledGrid container spacing={2}>
          {myCardsData.map(card => (
            <Grid item xs={12} sm={12} md={4} key={card.img}>
              <ImageContainer key={card.img} imgUrl={card.img} onClick={() => handleSelectCard(card)} />
            </Grid>
          ))}
        </StyledGrid>
      )}
    </>
  )
}

export default MyCards

const myCardsData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
]
