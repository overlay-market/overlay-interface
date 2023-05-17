import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {Trans} from '@lingui/macro'
import {FlexRow} from '../../components/Container/Container'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import Loader from '../../components/Loaders/Loaders'
import {TEXT} from '../../theme/theme'
import PoolsRow from './PoolsRow'

const poolsData: any[] = [
  {
    poolName: 'OVL / UDSC LP',
    tvl: 128480350,
    volume24h: 100000000,
    volume7d: 1280000000,
    balance: 0,
    rewards: 123,
  },
]

const Pools = () => {
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

              {/* 24h Volume */}
              <StyledHeaderCell align="right">
                <TEXT.Supplemental>
                  <Trans>Volume 24h</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              {/* 7D Volume */}
              <StyledHeaderCell align="right">
                <TEXT.Supplemental>
                  <Trans>Volume 7D</Trans>
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
                  <Trans>Rewards</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>
          <TableBody>
            {poolsData.length > 0 &&
              poolsData.map((pool, index) => (
                <PoolsRow
                  key={index}
                  index={index + 1}
                  poolName={pool.poolName}
                  tvl={pool.tvl}
                  volume24h={pool.volume24h}
                  volume7d={pool.volume7d}
                  balance={pool.balance}
                  rewards={pool.rewards}
                />
              ))}
          </TableBody>
        </StyledTable>
      </TableContainer>

      {poolsData.length === 0 && (
        <FlexRow marginTop="32px" justifyContent="center !important" width="100%">
          <Loader stroke="white" size="21px" />
        </FlexRow>
      )}
    </>
  )
}

export default Pools
