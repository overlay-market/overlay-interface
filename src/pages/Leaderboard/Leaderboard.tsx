import {TableBody, TableHead} from '@material-ui/core'
import {ethers} from 'ethers'
import {PageContainer} from '../../components/Container/Container'
import {StyledHeaderCell, StyledTable, StyledTableCell, StyledTableHeaderRow, StyledTableRow} from '../../components/Table/Table'
import LeaderboardOverview from './LeaderboardOverview'
import {TEXT, colors} from '../../theme/theme'
import styled from 'styled-components'
import {useActiveWeb3React} from '../../hooks/web3'
import {shortenAddress} from '../../utils/web3'
import useAxios from 'axios-hooks'
import {LEADERBOARRDS_API} from '../../constants/applications'
import {useEffect, useMemo, useState} from 'react'
import Loader from '../../components/Loaders/Loaders'

const LeaderboardsTable = styled(StyledTable)`
  .total-volume,
  .ovl-earned,
  .pnl {
    display: none;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
  .total-volume,
  .ovl-earned,
  .pnl {
    display: table-cell;
  }
  `}
`

const HeaderCell = styled(StyledHeaderCell)<{noborder?: string; textalign?: string}>`
  text-align: ${({textalign}) => (textalign ? textalign : 'end')} !important;
  border-bottom: 1px solid ${({theme}) => theme.dark.grey4} !important;
  border-bottom: ${({noborder}) => (noborder === 'true' ? '0px !important' : '')};
  padding: 16px !important;
`

const TableDataCell = styled(StyledTableCell)<{noborder?: string; textalign?: string}>`
  text-align: ${({textalign}) => (textalign ? textalign : 'end')} !important;
  border-bottom: 1px solid ${({theme}) => theme.dark.grey4} !important;
  border-bottom: ${({noborder}) => (noborder === 'true' ? '0px !important' : '')};
  padding: 16px !important;
`

const UserRankingRow = styled(StyledTableRow)`
  td {
    background: ${({theme}) => theme.dark.grey4};
  }

  td:first-child {
    border-radius: 8px 0 0 8px;
  }

  td:last-child {
    border-radius: 0 8px 8px 0;
  }

  td.rank {
    border-radius: 0 8px 8px 0;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    td.rank {
      border-radius: 0;
    }
  `}
`

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 50px;
`

const UsernameIcon = styled.div<{display?: string}>`
  background: grey;
  min-height: 48px;
  min-width: 48px;
  border-radius: 50%;
  border: 1px solid white;
  display: ${({display}) => (display ? display : 'flex')};
  align-items: center;
  justify-content: center;
  color: black;
`
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`

interface ITrader {
  walletAddress: string
  volumeTraded: number
  username?: string
  totalVolume?: number
  earnings?: number
  pnl?: number
}
export interface IUserRank extends ITrader {
  rank?: number
}
export interface ILeaderboardsData {
  sessionEnd: string
  sessionStart: string
  totalRewards: number
  totalVolumeTraded: number
  traders: [ITrader]
  userRank: IUserRank
  sessionNumber?: number
}

const Leaderboard = () => {
  const {account} = useActiveWeb3React()
  const [seasonId, setSeasonId] = useState()
  const [traders, setTraders] = useState<[ITrader]>()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<IUserRank>({
    volumeTraded: 0,
    walletAddress: '',
  })

  const [{data: rawData, loading: rawDataLoading}] = useAxios({
    baseURL: LEADERBOARRDS_API,
    url: `sessions/currentSession`,
    method: 'GET',
    params: {
      numberOfTraders: 10,
      userAddress: account,
    },
  })

  const [{data: seasonDataRaw, loading: seasonDataRawLoading}, getSeasonDataRaw] = useAxios(
    {
      baseURL: LEADERBOARRDS_API,
      method: 'GET',
      params: {
        numberOfTraders: 10,
        userAddress: account,
      },
    },
    {manual: true},
  )

  const userRank = useMemo<IUserRank>(() => seasonDataRaw?.userRank ?? rawData?.userRank, [rawData, seasonDataRaw])
  const leaderboardsData = useMemo<ILeaderboardsData>(() => {
    if (seasonDataRaw) {
      return seasonDataRaw?.session
    }
    return rawData?.session
  }, [rawData, seasonDataRaw])
  const seasonNumber = useMemo<number>(() => {
    if (seasonDataRaw) {
      return seasonDataRaw?.sessionNumber
    }
    return rawData?.sessionNumber
  }, [rawData, seasonDataRaw])

  useEffect(() => {
    getSeasonDataRaw({
      url: `sessions/getSessionById/${seasonId}`,
    })
  }, [seasonId, getSeasonDataRaw])

  useEffect(() => {
    setIsLoading(true)
    const getTraders = async () => {
      const processedTraders = await Promise.all(
        leaderboardsData?.traders?.map(async data => {
          const providerEth = new ethers.providers.InfuraProvider('mainnet', process.env.REACT_APP_INFURA_KEY)
          const username = await providerEth.lookupAddress(data.walletAddress)
          const earnings = leaderboardsData.totalRewards * (data?.volumeTraded / leaderboardsData?.totalVolumeTraded)

          return {
            ...data,
            username,
            totalVolume: (data?.volumeTraded / 10 ** 18).toFixed(2) || 0,
            earnings: earnings.toFixed(2) || 0,
            pnl: (data?.volumeTraded / earnings / 10 ** 18).toFixed(2),
          }
        }),
      )

      setTraders(processedTraders as unknown as [ITrader])
      setIsLoading(false)
    }

    if (leaderboardsData?.traders) {
      getTraders()
    }
  }, [leaderboardsData])

  useEffect(() => {
    const getUserData = async () => {
      const providerEth = new ethers.providers.InfuraProvider('mainnet', process.env.REACT_APP_INFURA_KEY)
      const username = await providerEth.lookupAddress(userRank.walletAddress)
      const earnings = leaderboardsData.totalRewards * (userRank?.volumeTraded / leaderboardsData?.totalVolumeTraded)
      const userRankData = {
        ...userRank,
        username,
        totalVolume: (userRank?.volumeTraded / 10 ** 18).toFixed(2),
        earnings: earnings.toFixed(2),
        pnl: (userRank?.volumeTraded / 10 ** 18 / earnings).toFixed(2),
      }

      setUserData(userRankData as unknown as IUserRank)
    }

    if (userRank) {
      getUserData()
    } else {
      setUserData({
        walletAddress: '',
        volumeTraded: 0,
        username: '',
        totalVolume: 0,
        earnings: 0,
        pnl: 0,
      })
    }
  }, [userRank, leaderboardsData])

  return (
    <PageContainer>
      <LeaderboardOverview
        isLoading={rawDataLoading || seasonDataRawLoading || isLoading}
        setSeasonId={setSeasonId}
        userData={userData}
        seasonData={{...leaderboardsData, sessionNumber: seasonNumber}}
      />
      {rawDataLoading || seasonDataRawLoading || isLoading ? (
        <LoadingContainer>
          <Loader size="24px" />
        </LoadingContainer>
      ) : (
        <LeaderboardsTable smWidth="100%">
          <TableHead>
            <StyledTableHeaderRow>
              <HeaderCell smWidth={80} noborder={account ? 'true' : ''} textalign="start">
                <TEXT.SmallBody fontWeight={600}>Leaderboard Rankings</TEXT.SmallBody>
              </HeaderCell>
              <HeaderCell smWidth={20} className="rank" noborder={account ? 'true' : ''}>
                <TEXT.Supplemental>Rank</TEXT.Supplemental>
              </HeaderCell>
              <HeaderCell className="total-volume" noborder={account ? 'true' : ''}>
                <TEXT.Supplemental>Total Volume</TEXT.Supplemental>
              </HeaderCell>
              <HeaderCell className="ovl-earned" noborder={account ? 'true' : ''}>
                <TEXT.Supplemental>Est. OVL Earned</TEXT.Supplemental>
              </HeaderCell>
              <HeaderCell className="pnl" noborder={account ? 'true' : ''}>
                <TEXT.Supplemental>PnL</TEXT.Supplemental>
              </HeaderCell>
            </StyledTableHeaderRow>
          </TableHead>

          {account && (
            <TableBody>
              <UserRankingRow notclickable="true">
                <TableDataCell noborder="true">
                  <UsernameContainer>
                    <TEXT.BoldSmallBody>Your current rank</TEXT.BoldSmallBody>
                    <TEXT.Supplemental color={colors(false).dark.grey1}>
                      {userData?.username ?? shortenAddress(userData.walletAddress || account)}
                    </TEXT.Supplemental>
                    {/* <UsernameIcon display="hidden" /> */}
                  </UsernameContainer>
                </TableDataCell>
                <TableDataCell className="rank" noborder="true">
                  <TEXT.SmallBody>{userData?.rank ?? 'N/A'}</TEXT.SmallBody>
                </TableDataCell>
                <TableDataCell className="total-volume" noborder="true">
                  <TEXT.Number>{userData?.totalVolume ? `${userData?.totalVolume ?? 0} OVL` : 'N/A'}</TEXT.Number>
                </TableDataCell>
                <TableDataCell className="ovl-earned" noborder="true">
                  <TEXT.Number>{userData?.earnings ? `${userData?.earnings ?? 0} OVL` : 'N/A'}</TEXT.Number>
                </TableDataCell>
                <TableDataCell className="pnl" noborder="true" align="center">
                  <TEXT.SmallBody color={userData.pnl && userData?.pnl > 0 ? colors(false).dark.green : ''}>
                    {userData?.pnl ? `${userData?.pnl ?? 0}%` : 'N/A'}
                  </TEXT.SmallBody>
                </TableDataCell>
              </UserRankingRow>
            </TableBody>
          )}

          <TableBody>
            {traders?.map((data: ITrader, index) => (
              <StyledTableRow notclickable="true" key={data?.walletAddress}>
                <TableDataCell>
                  <UsernameContainer>
                    <UsernameIcon />
                    <TEXT.BoldSmallBody>{data?.username ?? shortenAddress(data?.walletAddress)}</TEXT.BoldSmallBody>
                  </UsernameContainer>
                </TableDataCell>
                <TableDataCell className="rank">
                  <TEXT.SmallBody>{index + 1}</TEXT.SmallBody>
                </TableDataCell>
                <TableDataCell className="total-volume">
                  <TEXT.Number>{`${data?.totalVolume} OVL`}</TEXT.Number>
                </TableDataCell>
                <TableDataCell className="ovl-earned">
                  <TEXT.Number>{`${data?.earnings} OVL`}</TEXT.Number>
                </TableDataCell>
                <TableDataCell className="pnl" align="center">
                  <TEXT.SmallBody color={data.pnl && data?.pnl > 0 ? colors(false).dark.green : ''}>{`${data?.pnl}%`}</TEXT.SmallBody>
                </TableDataCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </LeaderboardsTable>
      )}
    </PageContainer>
  )
}

export default Leaderboard
