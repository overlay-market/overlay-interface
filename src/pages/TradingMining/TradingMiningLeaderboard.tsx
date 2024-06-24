import {TableBody, TableHead} from '@material-ui/core'
import {PageContainer} from '../../components/Container/Container'
import {StyledHeaderCell, StyledTable, StyledTableCell, StyledTableHeaderRow, StyledTableRow} from '../../components/Table/Table'
import TradingMiningOverview from './TradingMiningOverview'
import {TEXT, colors} from '../../theme/theme'
import styled from 'styled-components'
import {useActiveWeb3React} from '../../hooks/web3'
import {shortenAddress} from '../../utils/web3'
import useAxios from 'axios-hooks'
import {TRADING_MINING_API} from '../../constants/applications'
import {FC, useEffect, useMemo, useState} from 'react'
import Loader from '../../components/Loaders/Loaders'
import {LoadMoreButton} from '../../components/Button/Button'
import {getWeb3Avatar, getWeb3Username} from '../../utils/web3Name'

const PageContainerStyled = styled(PageContainer)`
  > div {
    background: rgba(32, 36, 49, 0.85) !important;
  }
`

const LeaderboardsTable = styled(StyledTable)`
  .rankings-header,
  .username {
    display: none;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
  .username,
  .rankings-header,
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`

const ChevronDownIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
    />
  </svg>
)

export interface SessionDetails {
  _id: string
  sessionStart: string
  sessionEnd: string
  sessionLastUpdated: string
  totalRewards: string
}
export interface TMLeaderboardRank {
  _id: string
  totalPoints: number
  rank?: number
}
export interface TMLeaderboardUserRank extends TMLeaderboardRank {
  username?: string
  avatar?: string
}

export interface TMLeaderboardPointsData {
  _id: string
  sessionDetails: SessionDetails
  totalUsers: number
  leaderboardTable: [TMLeaderboardRank]
  user?: TMLeaderboardRank
}

export interface SessionData {
  _id: string
  sessionStart: string
  sessionEnd: string
  sessionNumber: number
}

const TradingMiningLeaderboard = () => {
  const {account} = useActiveWeb3React()
  const [ranks, setRanks] = useState<TMLeaderboardUserRank[] | null>(null)
  const [userData, setUserData] = useState<TMLeaderboardUserRank | null>(null)
  const initialNumberOfRows = 10
  const [loadedNumberOfRows, setLoadedNumberOfRows] = useState(initialNumberOfRows)
  const [isDisabledLoadMoreBtn, setIsDisabledLoadMoreBtn] = useState(false)
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false)
  const [usersCounter, setUsersCounter] = useState(0)
  const [profilesCounter, setProfilesCounter] = useState(0)

  const [{data: pointsData, loading: dataLoading}, getPointsData] = useAxios(
    {
      baseURL: TRADING_MINING_API,
      method: 'GET',
    },
    {manual: true},
  )

  const initialDataHandle = async () => {
    try {
      await getPointsData({
        url: `/points/leaderboard/${initialNumberOfRows}${account ? `/${account}` : ''}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initialDataHandle()
  }, [])

  const sessionDetails = useMemo<SessionDetails>(() => {
    if (pointsData) {
      return pointsData.sessionDetails
    }
  }, [pointsData])

  const leaderboardPointsData = useMemo<TMLeaderboardRank[]>(() => {
    if (pointsData) {
      return pointsData.leaderboardTable
    }
  }, [pointsData])

  const totalUsers = useMemo<number>(() => {
    if (pointsData) {
      return pointsData.totalUsers
    }
  }, [pointsData])

  const [{data: pointsMoreData, loading: moreLoading}, getMoreData] = useAxios(
    {
      baseURL: TRADING_MINING_API,
      method: 'GET',
    },
    {manual: true},
  )

  const leaderboardPointsMoreData = useMemo<TMLeaderboardRank[]>(() => {
    if (pointsMoreData) {
      const newRowStarts = loadedNumberOfRows === initialNumberOfRows ? initialNumberOfRows : loadedNumberOfRows
      return pointsMoreData.leaderboardTable.slice(newRowStarts)
    }
  }, [pointsMoreData])

  // get initial ranks without usernames and avatars
  const getProcessedRanks = (passedData: TMLeaderboardRank[]) => {
    return passedData.map(data => {
      return {
        ...data,
        username: undefined,
        avatar: undefined,
      }
    })
  }

  useEffect(() => {
    const processedRanks = leaderboardPointsData && getProcessedRanks(leaderboardPointsData)

    setRanks(processedRanks as unknown as [TMLeaderboardUserRank])
    setUsersCounter(processedRanks?.length)
  }, [leaderboardPointsData])

  useEffect(() => {
    setIsLoadingProfiles(true)
    const processedRanks = leaderboardPointsMoreData && getProcessedRanks(leaderboardPointsMoreData)

    if (ranks && processedRanks) {
      const tempRanks = [...ranks, ...processedRanks]
      setRanks(tempRanks)
      setUsersCounter(tempRanks?.length)
    }
    setIsLoadingProfiles(false)
  }, [leaderboardPointsMoreData])

  const initialUserData = useMemo<TMLeaderboardRank>(() => {
    if (pointsData) {
      return pointsData?.user
    }
  }, [pointsData])

  const [{data: userPointsData, loading: userDataLoading}, getUserPointsData] = useAxios(
    {
      baseURL: TRADING_MINING_API,
      method: 'GET',
    },
    {manual: true},
  )

  const curUserData = useMemo<TMLeaderboardRank>(() => {
    if (userPointsData) {
      return userPointsData?.user
    }
  }, [userPointsData])

  useEffect(() => {
    if (account && pointsData && initialUserData === undefined) {
      getUserPointsData({
        url: `/points/leaderboard/0/${account}`,
      })
    }
  }, [account, pointsData, initialUserData, getUserPointsData])

  useEffect(() => {
    const userRankData = {
      ...(initialUserData ?? curUserData),
      username: undefined,
    }

    setUserData(userRankData as unknown as TMLeaderboardUserRank)
  }, [initialUserData, curUserData])

  useEffect(() => {
    const getUserData = async () => {
      const username = account && (await getWeb3Username(account))

      const userRankData = {
        ...userData,
        username: username ?? undefined,
      }

      setUserData(userRankData as unknown as TMLeaderboardUserRank)
    }

    if (account && userData?._id && !userData.username) {
      getUserData()
    }
  }, [account, initialUserData, curUserData, setUserData])

  // get final ranks with usernames and avatars
  const getProfiles = async (passedData: TMLeaderboardRank[]) => {
    const profilesIds: string[] = []
    const profilesMap = new Map()

    await Promise.all(
      passedData.map(async data => {
        const username = await getWeb3Username(data._id)
        const avatar = username && (await getWeb3Avatar(username))

        if (username) {
          profilesIds.push(data._id)
          profilesMap.set(data._id, {
            username: username,
            avatar: avatar ?? undefined,
          })
        }
      }),
    )
    setIsLoadingProfiles(true)
    if (ranks) {
      ranks.slice(profilesCounter, profilesCounter + 10).forEach(el => {
        if (profilesIds.includes(el._id)) {
          el.username = profilesMap.get(el._id).username
          el.avatar = profilesMap.get(el._id).avatar
        }
      })
    }
    setIsLoadingProfiles(false)
  }

  useEffect(() => {
    if (profilesCounter < usersCounter) {
      if (ranks) {
        getProfiles(ranks.slice(profilesCounter, profilesCounter + 10))
        setProfilesCounter(prev => prev + 10)
      }
    }
  }, [profilesCounter, usersCounter, ranks])

  useEffect(() => {
    setIsDisabledLoadMoreBtn(loadedNumberOfRows >= totalUsers)
  }, [loadedNumberOfRows, totalUsers])

  const loadMoreHandle = async () => {
    try {
      await getMoreData({
        url: `/points/leaderboard/${loadedNumberOfRows + 20}`,
      })
      setLoadedNumberOfRows(loadedNumberOfRows + 20)
    } catch (error) {
      console.log(error)
    }
  }

  // get all sessions till the current

  const [{data: sessionsData, loading: sesionsdataLoading}, getSessionsData] = useAxios(
    {
      baseURL: TRADING_MINING_API,
      method: 'GET',
    },
    {manual: true},
  )

  const sessionsDataHandle = async () => {
    try {
      await getSessionsData({
        url: `/sessions/getSessionsForDropdown`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    sessionsDataHandle()
  }, [])

  const sessionsList = useMemo<SessionData[]>(() => {
    if (sessionsData && sessionDetails) {
      const currentSession: SessionData = sessionsData.sessions.find((el: SessionData) => el._id === sessionDetails._id)
      const newList = sessionsData.sessions.filter((el: SessionData) => el.sessionNumber <= currentSession.sessionNumber)
      return newList
    }
  }, [sessionsData, sessionDetails])

  return (
    <PageContainerStyled>
      <TradingMiningOverview
        userPoints={userData?.totalPoints}
        sessionEnd={sessionDetails?.sessionEnd}
        sessionLastUpdated={sessionDetails?.sessionLastUpdated}
        isLoading={dataLoading || userDataLoading}
      />

      <LeaderboardsTable smwidth="100%">
        <TableHead>
          <StyledTableHeaderRow>
            <HeaderCell widthCell={'40px'} smwidth={20} className="rank" textalign="center" noborder={`${account && 'true'}`}>
              <TEXT.SmallBody color={colors(true).dark.white}>Rank</TEXT.SmallBody>
            </HeaderCell>
            <HeaderCell smwidth={80} textalign="start" noborder={`${account && 'true'}`}>
              <TEXT.SmallBody className="rankings-header" fontWeight={600} color={colors(true).dark.white}>
                Leaderboard Rankings
              </TEXT.SmallBody>
            </HeaderCell>
            <HeaderCell className="total-point" widthCell={'140px'} noborder={`${account && 'true'}`}>
              <TEXT.SmallBody color={colors(true).dark.white}>Total Volume</TEXT.SmallBody>
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
              <TableDataCell className="total-point" noborder="true">
                <TEXT.SmallBody color={colors(true).dark.white}>
                  {dataLoading || userDataLoading ? <Loader size="16px" /> : userData?.totalPoints ?? '0'}
                </TEXT.SmallBody>
              </TableDataCell>
            </UserRankingRow>
          </TableBody>
        )}

        <TableBody>
          {ranks &&
            ranks.map((data: TMLeaderboardUserRank, index) => (
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
                <TableDataCell className="total-point">
                  <TEXT.SmallBody color={colors(true).dark.white}>{data.totalPoints}</TEXT.SmallBody>
                </TableDataCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </LeaderboardsTable>

      {ranks && (
        <ButtonWrapper>
          <LoadMoreButton
            isDisabled={isDisabledLoadMoreBtn}
            onClick={loadMoreHandle}
            disabled={moreLoading || isDisabledLoadMoreBtn || isLoadingProfiles}
          >
            <div>Load more</div>
            {moreLoading || isLoadingProfiles ? <Loader size="16px" stroke={colors(true).dark.blue2} /> : <ChevronDownIcon />}
          </LoadMoreButton>
        </ButtonWrapper>
      )}
    </PageContainerStyled>
  )
}

export default TradingMiningLeaderboard
