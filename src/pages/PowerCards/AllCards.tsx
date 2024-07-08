import {Card, Grid} from '@material-ui/core'
import styled from 'styled-components'
import {colors} from '../../theme/theme'
import {useHistory} from 'react-router-dom'
import {NFTsDataType, useAllNFTsData} from '../../hooks/useNFTsData'

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

const AllCards = () => {
  let history = useHistory()

  const handleNavigate = (key: string) => {
    history.push(`/power-cards/all-cards/${key}`)
  }

  const allNFTdata = useAllNFTsData()
  const allCardsData: NFTsDataType = JSON.parse(allNFTdata)

  return (
    <StyledGrid container spacing={2}>
      {allCardsData &&
        Object.keys(allCardsData).map((key: string) => (
          <Grid item xs={12} sm={12} md={4} key={key}>
            <ImageContainer key={allCardsData[key].img} imgUrl={allCardsData[key].img} onClick={() => handleNavigate(key)} />
          </Grid>
        ))}
    </StyledGrid>
  )
}

export default AllCards
