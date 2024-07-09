import {Box, Card, Grid} from '@material-ui/core'
import styled from 'styled-components'
import {colors} from '../../theme/theme'
import {NFTsDataType, useNFTsData} from '../../hooks/useNFTsData'

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

const BurntCards = () => {
  const burntCardsIdsList: number[] = [1, 3]

  const NFTdata = useNFTsData(burntCardsIdsList)
  const burntCardsData: NFTsDataType = JSON.parse(NFTdata)
  const burntCardsAmount = burntCardsData && Object.keys(burntCardsData).length

  return (
    <>
      {(!burntCardsIdsList.length || !burntCardsAmount) && (
        <>
          <NoCardsContainer>
            <Box>No burnt cards to display.</Box>
          </NoCardsContainer>
        </>
      )}
      {burntCardsAmount > 0 && (
        <StyledGrid container spacing={2}>
          {burntCardsData &&
            Object.keys(burntCardsData).map((key: string) => (
              <Grid item xs={12} sm={12} md={4} key={key}>
                <ImageContainer imgUrl={burntCardsData[key].img} />
              </Grid>
            ))}
        </StyledGrid>
      )}
    </>
  )
}

export default BurntCards
