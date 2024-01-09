import {TEXT, colors} from '../../theme/theme'
import styled from 'styled-components'
import {TableBody, TableContainer, Table, TableHead, makeStyles, TableRow, TableCell} from '@material-ui/core'
import {AirdropMap} from '../../constants/claims'
import AirdropIdWithTooltip from './AirdropIdWithTooltip'

const useStyles = makeStyles(() => ({
  table: {
    width: '100%',
  },
}))

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 32px;
`

const StyledTableRow = styled(TableRow)`
  height: 55px;
`

const StyledTableCell = styled(TableCell)`
  font-size: 12px !important;
  border-bottom: 1px solid #2e3343 !important;
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
    background: rgba(46, 51, 67, 0.2);
    border: 1px solid ${colors(true).dark.grey5};
    border-radius: 20px;
    &:hover {
      background: ${colors(true).dark.grey5};
    }
  }
`

interface Props {
  airdrops: AirdropMap
}

function EligibilitySection({airdrops}: Props) {
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
                  <TEXT.Supplemental>Address</TEXT.Supplemental>
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
            <TableBody></TableBody>
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
