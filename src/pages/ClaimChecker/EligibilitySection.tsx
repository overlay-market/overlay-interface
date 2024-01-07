import {TEXT, colors} from '../../theme/theme'
import styled from 'styled-components'
import {TableBody, TableContainer, Table, TableHead, Tooltip, withStyles, makeStyles, TableRow, TableCell} from '@material-ui/core'
import {FC} from 'react'

const useStyles = makeStyles(() => ({
  customPosition: {
    position: 'relative',
    bottom: '16px',
  },
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

const TableHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: fit-content;
  gap: 4px;
  color: #a8a6a6;
  font-family: Inter;
  :hover {
    color: ${colors(true).dark.blue1};
  }
`
const StyledTableRow = styled(TableRow)`
  height: 55px;
`

const StyledTableCell = styled(TableCell)`
  font-size: 12px !important;
  border-bottom: 1px solid #2e3343 !important;
`

const InfoCircleIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    {' '}
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />{' '}
    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />{' '}
  </svg>
)

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

const StyledTooltip = withStyles({
  tooltip: {
    color: `${colors(false).dark.white}`,
    fontSize: '12px',
    backgroundColor: '#1B2131',
    border: '1px solid rgba(113, 206, 255, 0.5)',
    borderRadius: '8px',
    padding: '12px',
  },
})(Tooltip)

function EligibilitySection() {
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

                <StyledTableCell>
                  <StyledTooltip title="This tooltip" placement="bottom-end" classes={{tooltip: classes.customPosition}}>
                    <TableHeaderContent>
                      Airdrop Id 1
                      <InfoCircleIcon />
                    </TableHeaderContent>
                  </StyledTooltip>
                </StyledTableCell>
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
