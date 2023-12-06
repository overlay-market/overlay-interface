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
import {LEADERBOARRDS_API, LEADERBOARRD_POINTS_API} from '../../constants/applications'
import {useEffect, useMemo, useState} from 'react'
import Loader from '../../components/Loaders/Loaders'
import {floorToTwoDecimals} from '../../utils/floorToTwoDecimals'

const LeaderboardsTable = styled(StyledTable)`
  .points-prev-week,
  .total-point {
    display: none;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
  .points-prev-week,
  .total-point {
    display: table-cell;
  }
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    min-width: 100% !important;
  `}
`

const HeaderCell = styled(StyledHeaderCell)<{noborder?: string; textalign?: string; widthCell?: string}>`
  text-align: ${({textalign}) => (textalign ? textalign : 'end')} !important;
  border-bottom: 1px solid ${({theme}) => theme.dark.grey4} !important;
  border-bottom: ${({noborder}) => (noborder === 'true' ? '0px !important' : '')};
  padding: 16px !important;
  width: ${({widthCell}) => widthCell} !important;
`

const TableDataCell = styled(StyledTableCell)<{noborder?: string; textalign?: string}>`
  text-align: ${({textalign}) => (textalign ? textalign : 'end')} !important;
  border-bottom: 1px solid ${({theme}) => theme.dark.grey4} !important;
  border-bottom: ${({noborder}) => (noborder === 'true' ? '0px !important' : '')};
  padding: 16px !important;
`
const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 32px;
  min-width: 240px;
`

const UsernameIcon = styled.img<{display?: string}>`
  background: ${({theme}) => theme.dark.grey4};
  min-height: 32px;
  min-width: 32px;
  border-radius: 50%;
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

export interface IPrevWeekDetails {
  sessionId: string
  sessionStart: string
  sessionEnd: string
}
export interface ILeaderboardRank {
  _id: string
  totalPoints: number
  previousWeekPoints: number
}
export interface ILeaderboardPointsData {
  previousWeekDetails: IPrevWeekDetails
  leaderBoard: [ILeaderboardRank]
}
export interface ILeaderboardUserRank extends ILeaderboardRank {
  username?: string
  avatar?: string
}

const Leaderboard = () => {
  const {account} = useActiveWeb3React()
  const [seasonId, setSeasonId] = useState()
  const [ranks, setRanks] = useState<[ILeaderboardUserRank]>()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<IUserRank>({
    volumeTraded: 0,
    walletAddress: '',
  })

  const [{data: rawData}] = useAxios({
    baseURL: LEADERBOARRDS_API,
    url: `sessions/currentSession`,
    method: 'GET',
    params: {
      numberOfTraders: 10,
      userAddress: account,
    },
  })

  const [{data: seasonDataRaw}, getSeasonDataRaw] = useAxios(
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

  const [{data: pointsData}] = useAxios({
    baseURL: LEADERBOARRD_POINTS_API,
    method: 'GET',
  })

  const userRank = useMemo<IUserRank>(() => seasonDataRaw?.userRank ?? rawData?.userRank, [rawData, seasonDataRaw])
  const leaderboardsData = useMemo<ILeaderboardsData>(() => {
    if (seasonDataRaw) {
      return seasonDataRaw?.session
    }
    return rawData?.session
  }, [rawData, seasonDataRaw])

  const leaderboardPointsData = useMemo<ILeaderboardRank[]>(() => {
    if (pointsData) {
      return pointsData.leaderBoard
    }
  }, [pointsData])

  useEffect(() => {
    getSeasonDataRaw({
      url: `sessions/getSessionById/${seasonId}`,
    })
  }, [seasonId, getSeasonDataRaw])

  useEffect(() => {
    const providerEth = new ethers.providers.InfuraProvider('mainnet', process.env.REACT_APP_INFURA_KEY)
    const getAccountENS = async () => {
      const username = account ? await providerEth.lookupAddress(account) : undefined
      setUserData({
        walletAddress: account || '',
        volumeTraded: 0,
        username: username ?? undefined,
      })
    }

    const getUserData = async () => {
      const username = await providerEth.lookupAddress(userRank.walletAddress)
      const earnings = leaderboardsData.totalRewards * (userRank?.volumeTraded / leaderboardsData?.totalVolumeTraded)
      const volume = userRank?.volumeTraded / 10 ** 18
      const userRankData = {
        ...userRank,
        username,
        totalVolume: volume.toFixed(2),
        earnings: floorToTwoDecimals(earnings) || 0,
        pnl: ((earnings / volume) * 100).toFixed(2),
      }

      setUserData(userRankData as unknown as IUserRank)
    }

    if (userRank) {
      getUserData()
    } else {
      getAccountENS()
    }
  }, [userRank, leaderboardsData, account])

  useEffect(() => {
    setIsLoading(true)
    const getRanks = async () => {
      const providerEth = new ethers.providers.InfuraProvider('mainnet', process.env.REACT_APP_INFURA_KEY)
      const processedRanks = await Promise.all(
        leaderboardPointsData.map(async data => {
          const username = await providerEth.lookupAddress(data._id)
          const avatar = username && (await providerEth.getAvatar(username))

          return {
            ...data,
            username: username ?? undefined,
            avatar: avatar ?? undefined,
            totalPoints: Number.isInteger(data.totalPoints) ? data.totalPoints : parseInt(data.totalPoints.toString()),
            previousWeekPoints: Number.isInteger(data.previousWeekPoints) ? data.previousWeekPoints : parseInt(data.previousWeekPoints.toString()),
          }
        }),
      )

      setRanks(processedRanks as unknown as [ILeaderboardUserRank])
      setIsLoading(false)
    }

    if (leaderboardPointsData?.length > 0) {
      getRanks()
    }
  }, [leaderboardPointsData])

  return (
    <PageContainer>
      <LeaderboardOverview />
      {isLoading ? (
        <LoadingContainer>
          <Loader size="24px" />
        </LoadingContainer>
      ) : (
        <LeaderboardsTable smWidth="100%">
          <TableHead>
            <StyledTableHeaderRow>
              <HeaderCell smWidth={80} textalign="start">
                <TEXT.SmallBody fontWeight={600} color={colors(true).dark.white}>
                  Leaderboard Rankings
                </TEXT.SmallBody>
              </HeaderCell>
              <HeaderCell smWidth={20} className="rank">
                <TEXT.SmallBody color={colors(true).dark.white}>Rank</TEXT.SmallBody>
              </HeaderCell>
              <HeaderCell className="points-prev-week" widthCell={'240px'}>
                <TEXT.SmallBody color={colors(true).dark.white}>Points-Previous Week</TEXT.SmallBody>
              </HeaderCell>
              <HeaderCell className="total-point" widthCell={'140px'}>
                <TEXT.SmallBody color={colors(true).dark.white}>Total Point</TEXT.SmallBody>
              </HeaderCell>
            </StyledTableHeaderRow>
          </TableHead>

          <TableBody>
            {ranks?.map((data: ILeaderboardUserRank, index) => (
              <StyledTableRow notclickable="true" key={data._id}>
                <TableDataCell>
                  <UsernameContainer>
                    <UsernameIcon
                      src={data.avatar ?? `https://source.boringavatars.com/marble?colors=${({theme}) => theme.dark.grey4}`}
                      alt={'Overlay user avatar'}
                      height={'32px'}
                      width={'32px'}
                    />
                    <TEXT.BoldSmallBody>{data.username ?? shortenAddress(data._id)}</TEXT.BoldSmallBody>
                  </UsernameContainer>
                </TableDataCell>
                <TableDataCell className="rank">
                  <TEXT.SmallBody color={colors(true).dark.white}>{index + 1}</TEXT.SmallBody>
                </TableDataCell>
                <TableDataCell className="points-prev-week">
                  <TEXT.SmallBody color={colors(true).dark.white}>{data.previousWeekPoints}</TEXT.SmallBody>
                </TableDataCell>
                <TableDataCell className="total-point">
                  <TEXT.SmallBody color={colors(true).dark.white}>{data.totalPoints}</TEXT.SmallBody>
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
