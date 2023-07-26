import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {Trans} from '@lingui/macro'
import {FlexRow} from '../../components/Container/Container'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import Loader from '../../components/Loaders/Loaders'
import {TEXT, colors} from '../../theme/theme'
import PoolsRow from './PoolsRow'
import {PoolsData} from '../../constants/stake'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  headerCell: {
    borderBottom: '1px solid #A8A6A6',
  },
}))

const Pools = ({
  filteredPoolsData,
  addToTotalStaked,
}: {
  filteredPoolsData: PoolsData[]
  addToTotalStaked: (amount: number, index: number) => void
}) => {
  const classes = useStyles()

  return (
    <>
      <TableContainer component={Paper} style={{marginTop: '88px'}}>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              {/* Index */}
              <StyledHeaderCell className={classes.headerCell} width={1}>
                <TEXT.Supplemental color={colors(true).dark.blue1}>
                  <Trans>#</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* Pools */}
              <StyledHeaderCell className={classes.headerCell} width={25}>
                <TEXT.Supplemental color={colors(true).dark.blue1}>
                  <Trans>Pools</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* TVL */}
              <StyledHeaderCell className={classes.headerCell} align="right">
                <TEXT.Supplemental color={colors(true).dark.blue1}>
                  <Trans>TVL</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* Rewards */}
              <StyledHeaderCell className={classes.headerCell} align="right">
                <TEXT.Supplemental color={colors(true).dark.blue1}>
                  <Trans>Rewards</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* My Balance */}
              <StyledHeaderCell className={classes.headerCell} align="right">
                <TEXT.Supplemental color={colors(true).dark.blue1}>
                  <Trans>My Balance</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* Rewards */}
              <StyledHeaderCell className={classes.headerCell} align="right">
                <TEXT.Supplemental color={colors(true).dark.blue1}>
                  <Trans>My Rewards</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>
          <TableBody>
            {filteredPoolsData.length > 0 &&
              filteredPoolsData.map((pool, index) => <PoolsRow key={index} index={index + 1} pool={pool} addToTotalStaked={addToTotalStaked} />)}
          </TableBody>
        </StyledTable>
      </TableContainer>

      {filteredPoolsData.length === 0 && (
        <FlexRow marginTop="32px" justifyContent="center !important" width="100%">
          <Loader stroke="white" size="21px" />
        </FlexRow>
      )}
    </>
  )
}

export default Pools
