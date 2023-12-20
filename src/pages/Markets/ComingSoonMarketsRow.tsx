import styled from 'styled-components'
import {StyledTableCellThin, StyledTableRow} from '../../components/Table/Table'
import {FlexRow} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {Icon} from '../../components/Icon/Icon'
import {AlertCircle} from 'react-feather'

export const MarketsStyledTableRow = styled(StyledTableRow)`
  height: unset;
  cursor: auto;
  #marketFundingRate,
  #marketOi,
  #marketFeedLogo,
  #market7dChart {
    display: none;
  }

  th,
  td {
    padding: 24px 8px;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    height: 69px;
    
    #marketFundingRate,
    #market7dChart {
      display: table-cell;
    }
    #visibleText {
      display: none;
    }
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    #marketOi,
    #marketFeedLogo {
      display: table-cell;
    }
  `}
`

type MarketsRowProps = {
  index: number
  marketId: string
  marketName: string | undefined
  marketLogo: string | undefined
}

const ComingSoonMarketsRow = ({index, marketId, marketName, marketLogo}: MarketsRowProps) => {
  return (
    <MarketsStyledTableRow hover={false}>
      <StyledTableCellThin component="th" scope="row" id="marketIndex">
        {index}
      </StyledTableCellThin>

      <StyledTableCellThin component="th" scope="row" id="marketName">
        <FlexRow>
          <Icon size={20}>{marketLogo ? <img src={marketLogo} alt="Market Feed Logo" /> : <AlertCircle size={20} />}</Icon>
          <TEXT.BoldSmallBody ml="8px">{marketName}</TEXT.BoldSmallBody>
        </FlexRow>
      </StyledTableCellThin>

      <StyledTableCellThin id="marketPrice">
        <TEXT.StandardBody ml="-24px" id="visibleText">
          Coming Soon
        </TEXT.StandardBody>
      </StyledTableCellThin>
      <StyledTableCellThin id="marketFundingRate">
        <TEXT.StandardBody ml="-24px">Coming Soon</TEXT.StandardBody>
      </StyledTableCellThin>
      <StyledTableCellThin id="marketOi"></StyledTableCellThin>
      <StyledTableCellThin id="marketFeedLogo"></StyledTableCellThin>
    </MarketsStyledTableRow>
  )
}

export default ComingSoonMarketsRow
