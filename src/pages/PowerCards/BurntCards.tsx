import {Box, Card, Grid} from '@material-ui/core'
import styled from 'styled-components'
import {colors} from '../../theme/theme'

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
  right: 84px;
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

const BurntCards = () => {
  // const burntCardsData: Array<any> = []
  const burntCardsData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
  ]
  return (
    <>
      {!burntCardsData.length && (
        <>
          <NoCardsContainer>
            <Box>No burnt cards to display.</Box>
          </NoCardsContainer>
          <EmptyBgColorContainer />
        </>
      )}
      {burntCardsData.length > 0 && (
        <StyledGrid container spacing={2}>
          {burntCardsData.map(card => (
            <Grid item xs={12} sm={12} md={4} key={card.img}>
              <ImageContainer key={card.img} imgUrl={card.img} />
            </Grid>
          ))}
        </StyledGrid>
      )}
    </>
  )
}

export default BurntCards
