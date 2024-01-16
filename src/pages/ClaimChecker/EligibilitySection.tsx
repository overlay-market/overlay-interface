import {TEXT, colors} from '../../theme/theme'
import styled from 'styled-components'
import {TableBody, TableContainer, Table, TableHead, makeStyles, TableRow, TableCell} from '@material-ui/core'
import {AirdropMap} from '../../constants/claims'
import AirdropIdWithTooltip from './AirdropIdWithTooltip'

const useStyles = makeStyles(() => ({
  table: {
    width: 'auto',
  },
}))

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 32px;
`

const StyledTableRow = styled(TableRow)`
  height: 55px !important;
`

const StyledTableCell = styled(TableCell)`
  font-size: 12px !important;
  border-bottom: 1px solid #2e3343 !important;
  text-align: right !important;
  min-width: 180px !important;
  padding: 0 !important;

  ${({theme}) => theme.mediaWidth.minSmall`
    min-width: 212px !important;
  `}

  &:first-child {
    text-align: left !important;
    min-width: 140px !important;
    padding-left: 16px !important;
  }
  &:last-child {
    padding-right: 16px !important;
  }
`

const ScrollBox = styled.div`
  flex: 1;
  overflow-x: auto;
  cursor: pointer;
  background-color: transparent;
  padding-bottom: 16px;

  &::-webkit-scrollbar {
    height: 12px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(46, 51, 67, 0.6);
    border-radius: 20px;
    &:hover {
      background: rgba(46, 51, 67, 0.8);
    }
  }
`

interface Props {
  airdrops: AirdropMap
  totalAmountValues: string[]
}

function EligibilitySection({airdrops, totalAmountValues}: Props) {
  const classes = useStyles()

  return (
    <>
      <TitleContainer>
        <TEXT.BoldStandardBody color={colors(false).dark.white}>Eligibility</TEXT.BoldStandardBody>
        <TEXT.SmallBody color={colors(true).dark.blue1}>View eligibility for each address here</TEXT.SmallBody>
      </TitleContainer>

      <TableContainer>
        <ScrollBox>
          <Table className={classes.table}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell id="address">
                  <TEXT.Supplemental color={colors(true).dark.grey2}>Address</TEXT.Supplemental>
                </StyledTableCell>
                {airdrops &&
                  Object.keys(airdrops).map((airdropId: string) => {
                    return (
                      <StyledTableCell key={airdropId}>
                        <AirdropIdWithTooltip airdrop={airdrops[airdropId]} />
                      </StyledTableCell>
                    )
                  })}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {totalAmountValues && (
                <StyledTableRow>
                  <StyledTableCell id="totalamount">
                    <TEXT.Supplemental color={colors(true).dark.grey2}>{totalAmountValues[0]}</TEXT.Supplemental>
                  </StyledTableCell>
                  {totalAmountValues.slice(1).map((value: string | number, ind) => {
                    return (
                      <StyledTableCell key={ind}>
                        <TEXT.Supplemental color={colors(false).dark.white}>{value}</TEXT.Supplemental>
                      </StyledTableCell>
                    )
                  })}
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </ScrollBox>
      </TableContainer>

      <TEXT.SmallBody color={colors(false).dark.blue1} sx={{padding: '16px'}}>
        No addresses yet
      </TEXT.SmallBody>
    </>
  )
}

export default EligibilitySection
