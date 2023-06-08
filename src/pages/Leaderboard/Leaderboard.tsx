import {TableBody, TableHead} from '@material-ui/core'
import {PageContainer} from '../../components/Container/Container'
import {StyledHeaderCell, StyledTable, StyledTableCell, StyledTableHeaderRow, StyledTableRow} from '../../components/Table/Table'
import LeaderboardOverview from './LeaderboardOverview'
import {TEXT, colors} from '../../theme/theme'
import styled from 'styled-components'
import mockData from './mock-data'
import {useActiveWeb3React} from '../../hooks/web3'
import {shortenAddress} from '../../utils/web3'

const HeaderCell = styled(StyledHeaderCell)<{noBorder?: boolean}>`
  border-bottom: 1px solid ${({theme}) => theme.dark.grey4} !important;
  border-bottom: ${({noBorder}) => (noBorder ? '0px !important' : '')};
`

const TableDataCell = styled(StyledTableCell)<{noBorder?: boolean}>`
  border-bottom: 1px solid ${({theme}) => theme.dark.grey4} !important;
  border-bottom: ${({noBorder}) => (noBorder ? '0px !important' : '')};
`

const UserRankingRow = styled(StyledTableRow)`
  td {
    background: ${({theme}) => theme.dark.grey4};
  }

  td:first-child {
    border-radius: 70px 0 0 70px;
  }

  td:last-child {
    border-radius: 0 70px 70px 0;
  }
`

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const UsernameIcon = styled.div`
  background: grey;
  min-height: 48px;
  min-width: 48px;
  border-radius: 50%;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`

const Leaderboard = () => {
  const {account} = useActiveWeb3React()
  return (
    <PageContainer>
      <LeaderboardOverview />
      <StyledTable>
        <TableHead>
          <StyledTableHeaderRow>
            <HeaderCell width={25} noBorder />
            <HeaderCell width={20} noBorder>
              <TEXT.Supplemental>Rank</TEXT.Supplemental>
            </HeaderCell>
            <HeaderCell width={10} noBorder>
              <TEXT.Supplemental>Total Volume</TEXT.Supplemental>
            </HeaderCell>
            <HeaderCell width={10} noBorder>
              <TEXT.Supplemental>Est. OVL Earned</TEXT.Supplemental>
            </HeaderCell>
            <HeaderCell width={5} noBorder align="center">
              <TEXT.Supplemental>PnL</TEXT.Supplemental>
            </HeaderCell>
          </StyledTableHeaderRow>
        </TableHead>

        {account && (
          <UserRankingRow notClickable>
            <TableDataCell noBorder>
              <UsernameContainer>
                <TEXT.BoldSmallBody>Your current rank</TEXT.BoldSmallBody>
                <TEXT.Supplemental color={colors(false).dark.grey1}>{shortenAddress(account)}</TEXT.Supplemental>
              </UsernameContainer>
            </TableDataCell>
            <TableDataCell noBorder>
              <TEXT.SmallBody>50</TEXT.SmallBody>
            </TableDataCell>
            <TableDataCell noBorder>
              <TEXT.Number>{`${1.12} OVL`}</TEXT.Number>
            </TableDataCell>
            <TableDataCell noBorder>
              <TEXT.Number>{10.2}</TEXT.Number>
            </TableDataCell>
            <TableDataCell noBorder align="center">
              <TEXT.SmallBody color={40 > 0 ? colors(false).dark.green : ''}>{`${40}%`}</TEXT.SmallBody>
            </TableDataCell>
          </UserRankingRow>
        )}

        <StyledTableHeaderRow>
          <HeaderCell width={25}>
            <TEXT.SmallBody fontWeight={600}>Leaderboard Rankings</TEXT.SmallBody>
          </HeaderCell>
          <HeaderCell width={20} />
          <HeaderCell />
          <HeaderCell />
          <HeaderCell />
        </StyledTableHeaderRow>

        <TableBody>
          {mockData.map(data => (
            <StyledTableRow notClickable>
              <TableDataCell>
                <UsernameContainer>
                  <UsernameIcon />
                  <TEXT.BoldSmallBody>{data?.username}</TEXT.BoldSmallBody>
                </UsernameContainer>
              </TableDataCell>
              <TableDataCell>
                <TEXT.SmallBody>{data?.rank}</TEXT.SmallBody>
              </TableDataCell>
              <TableDataCell>
                <TEXT.Number>{`${data?.totalVolume} OVL`}</TEXT.Number>
              </TableDataCell>
              <TableDataCell>
                <TEXT.Number>{data?.earnings}</TEXT.Number>
              </TableDataCell>

              <TableDataCell align="center">
                <TEXT.SmallBody color={data?.pnl > 0 ? colors(false).dark.green : ''}>{`${data?.pnl}%`}</TEXT.SmallBody>
              </TableDataCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </PageContainer>
  )
}

export default Leaderboard
