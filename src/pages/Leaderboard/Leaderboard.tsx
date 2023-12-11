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
import {LEADERBOARD_POINTS_API} from '../../constants/applications'
import {useEffect, useMemo, useState} from 'react'
import Loader from '../../components/Loaders/Loaders'

const LeaderboardsTable = styled(StyledTable)`
  .points-prev-week,
  .username {
    display: none;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
  .points-prev-week,
  .username,
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

const UserRankingRow = styled(StyledTableRow)`
  td {
    background: ${({theme}) => theme.dark.grey4};
  }

  td:first-child {
    border-radius: 45px 0 0 45px;
  }

  td:last-child {
    border-radius: 0 45px 45px 0;
  }
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

export interface IPrevWeekDetails {
  sessionId: string
  sessionStart: string
  sessionEnd: string
}
export interface ILeaderboardRank {
  _id: string
  totalPoints: number
  previousWeekPoints: number
  rank?: number
}
export interface ILeaderboardUserRank extends ILeaderboardRank {
  username?: string
  avatar?: string
}

export interface ILeaderboardPointsData {
  previousWeekDetails: IPrevWeekDetails
  leaderboardTable: [ILeaderboardRank]
  user?: ILeaderboardRank
}

const Leaderboard = () => {
  const {account} = useActiveWeb3React()
  const [ranks, setRanks] = useState<[ILeaderboardUserRank]>()
  const [userData, setUserData] = useState<ILeaderboardUserRank>()
  const numberOfRows = 10

  const [{data: pointsData, loading: dataLoading}] = useAxios({
    baseURL: LEADERBOARD_POINTS_API,
    url: `${numberOfRows}${account ? `/${account}` : ''}`,
    method: 'GET',
  })

  const prevWeekDetails = useMemo<IPrevWeekDetails>(() => {
    if (pointsData) {
      return pointsData.previousWeekDetails
    }
  }, [pointsData])

  const leaderboardPointsData = useMemo<ILeaderboardRank[]>(() => {
    if (pointsData) {
      return pointsData.leaderboardTable
    }
  }, [pointsData])

  useEffect(() => {
    const processedRanks =
      leaderboardPointsData &&
      leaderboardPointsData.map(data => {
        return {
          ...data,
          username: undefined,
          avatar: undefined,
        }
      })

    setRanks(processedRanks as unknown as [ILeaderboardUserRank])
  }, [leaderboardPointsData])

  const curUserData = useMemo<ILeaderboardRank>(() => {
    if (pointsData) {
      return pointsData?.user
    }
  }, [pointsData])

  const [{data: userPointsData, loading: userDataLoading}, getUserPointsData] = useAxios(
    {
      baseURL: LEADERBOARD_POINTS_API,
      method: 'GET',
    },
    {manual: true},
  )

  useEffect(() => {
    if (account && pointsData && curUserData === undefined) {
      getUserPointsData({
        url: `0/${account}`,
      })
    }
  }, [account, pointsData, curUserData, getUserPointsData])

  useEffect(() => {
    const userRankData = {
      ...(curUserData ?? userPointsData),
      username: undefined,
    }

    setUserData(userRankData as unknown as ILeaderboardUserRank)
  }, [curUserData, userPointsData])

  useEffect(() => {
    const providerEth = new ethers.providers.InfuraProvider('mainnet', process.env.REACT_APP_INFURA_KEY)

    const getUserData = async () => {
      const username = account && (await providerEth.lookupAddress(account))
      const userRankData = {
        ...userData,
        username,
      }

      setUserData(userRankData as unknown as ILeaderboardUserRank)
    }

    if (account && userData?._id && !userData.username) {
      getUserData()
    }
  }, [account, curUserData, userPointsData, userData, setUserData])

  useEffect(() => {
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
    }

    if (leaderboardPointsData?.length > 0) {
      getRanks()
    }
  }, [leaderboardPointsData])

  return (
    <PageContainer>
      <LeaderboardOverview
        userPoints={userData?.totalPoints}
        pointsUpdatedAt={prevWeekDetails?.sessionEnd}
        isLoading={dataLoading || userDataLoading}
      />

      <LeaderboardsTable smWidth="100%">
        <TableHead>
          <StyledTableHeaderRow>
            <HeaderCell widthCell={'40px'} smWidth={20} className="rank" textalign="center" noborder={`${account && 'true'}`}>
              <TEXT.SmallBody color={colors(true).dark.white}>Rank</TEXT.SmallBody>
            </HeaderCell>
            <HeaderCell smWidth={80} textalign="start" noborder={`${account && 'true'}`}>
              <TEXT.SmallBody fontWeight={600} color={colors(true).dark.white}>
                Leaderboard Rankings
              </TEXT.SmallBody>
            </HeaderCell>
            <HeaderCell className="points-prev-week" widthCell={'240px'} noborder={`${account && 'true'}`}>
              <TEXT.SmallBody color={colors(true).dark.white}>Points-Previous Week</TEXT.SmallBody>
            </HeaderCell>
            <HeaderCell className="total-point" widthCell={'140px'} noborder={`${account && 'true'}`}>
              <TEXT.SmallBody color={colors(true).dark.white}>Total Points</TEXT.SmallBody>
            </HeaderCell>
          </StyledTableHeaderRow>
        </TableHead>

        {account && (
          <TableBody>
            <UserRankingRow notclickable="true">
              <TableDataCell className="rank" noborder="true" textalign="center">
                <TEXT.SmallBody color={colors(true).dark.white}>
                  {dataLoading || userDataLoading ? <Loader size="16px" /> : userData?.rank ?? 'N/A'}
                </TEXT.SmallBody>
              </TableDataCell>
              <TableDataCell noborder="true">
                <UsernameContainer>
                  <TEXT.BoldSmallBody fontWeight={600} color={colors(true).dark.white}>
                    Your current rank
                  </TEXT.BoldSmallBody>
                  <TEXT.Supplemental color={colors(false).dark.grey1} className="username">
                    {userData?.username ?? shortenAddress(account)}
                  </TEXT.Supplemental>
                </UsernameContainer>
              </TableDataCell>

              <TableDataCell className="points-prev-week" noborder="true">
                <TEXT.SmallBody color={colors(true).dark.white}>
                  {dataLoading || userDataLoading ? <Loader size="16px" /> : userData?.previousWeekPoints ?? '0'}
                </TEXT.SmallBody>
              </TableDataCell>
              <TableDataCell className="total-point" noborder="true">
                <TEXT.SmallBody color={colors(true).dark.white}>
                  {dataLoading || userDataLoading ? <Loader size="16px" /> : userData?.totalPoints ?? '0'}
                </TEXT.SmallBody>
              </TableDataCell>
            </UserRankingRow>
          </TableBody>
        )}

        <TableBody>
          {ranks?.map((data: ILeaderboardUserRank, index) => (
            <StyledTableRow notclickable="true" key={data._id}>
              <TableDataCell className="rank" textalign="center">
                <TEXT.SmallBody color={colors(true).dark.white}>{index + 1}</TEXT.SmallBody>
              </TableDataCell>
              <TableDataCell>
                <UsernameContainer>
                  <UsernameIcon
                    src={data.avatar ?? `https://source.boringavatars.com/bauhaus?colors=F0F0F0,E5F6FF,F5EEFE,FFDBB0,FFA1B9&wallet=${data._id}`}
                    alt={'Overlay user avatar'}
                    height={'32px'}
                    width={'32px'}
                  />
                  <TEXT.BoldSmallBody>{data.username ?? shortenAddress(data._id)}</TEXT.BoldSmallBody>
                </UsernameContainer>
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
    </PageContainer>
  )
}

export default Leaderboard
