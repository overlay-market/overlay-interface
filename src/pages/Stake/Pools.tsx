import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {Trans} from '@lingui/macro'
import {FlexRow} from '../../components/Container/Container'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import Loader from '../../components/Loaders/Loaders'
import {TEXT} from '../../theme/theme'
import PoolsRow from './PoolsRow'
import {PoolsData} from './StakePage'

const Pools = ({
  filteredPoolsData,
  addToTotalStaked,
}: {
  filteredPoolsData: PoolsData[]
  addToTotalStaked: (amount: number, index: number) => void
}) => {
  return (
    <>
      <TableContainer component={Paper} style={{marginTop: '88px'}}>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              {/* Index */}
              <StyledHeaderCell width={1}>
                <TEXT.Supplemental>
                  <Trans>#</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* Pools */}
              <StyledHeaderCell width={25}>
                <TEXT.Supplemental>
                  <Trans>Pools</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* TVL */}
              <StyledHeaderCell align="right">
                <TEXT.Supplemental>
                  <Trans>TVL</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* Rewards */}
              <StyledHeaderCell align="right">
                <TEXT.Supplemental>
                  <Trans>Rewards</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* My Balance */}
              <StyledHeaderCell align="right">
                <TEXT.Supplemental>
                  <Trans>My Balance</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* Rewards */}
              <StyledHeaderCell align="right">
                <TEXT.Supplemental>
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
