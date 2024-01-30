import {useState} from 'react'
import {Collapse, Container, TableBody, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow, StyledTableCell} from '../../components/Table/Table'
import {TEXT} from '../../theme/theme'
import {RotatingTriangle, TriangleButton} from '../Positions/PositionsPage'
import styled from 'styled-components'

const RebatesStyledTable = styled(StyledTable)`
  width: 100% !important;
`

const referralPositionsColumns = ['Date', 'Amount', 'Arbiscan']

export const RebatesTable = () => {
  const [open, setOpen] = useState<boolean>(true)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <Container style={{maxWidth: 'none', padding: '0'}}>
      <TEXT.BoldStandardBody mt={50} mb="16px">
        {`Rebate Distribution`}
        <TriangleButton onClick={handleToggle}>
          <RotatingTriangle color={'white'} fill={'white'} height={10} width={10} open={true} />
        </TriangleButton>
      </TEXT.BoldStandardBody>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer style={{overflow: 'hidden'}}>
          <RebatesStyledTable style={{}}>
            <TableHead>
              <StyledTableHeaderRow>
                {referralPositionsColumns.map((column: string) => {
                  return (
                    <StyledHeaderCell key={column} width={10}>
                      <TEXT.SupplementalHeader>{column}</TEXT.SupplementalHeader>
                    </StyledHeaderCell>
                  )
                })}
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TEXT.StandardBody mt={'16px'} color="#858585">
                  No rebate distribution yet.
                </TEXT.StandardBody>
              </TableRow>
            </TableBody>
          </RebatesStyledTable>
        </TableContainer>
      </Collapse>
    </Container>
  )
}
