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
import {FC, useEffect, useMemo, useState} from 'react'
import Loader from '../../components/Loaders/Loaders'
import {LoadMoreButton} from '../../components/Button/Button'

const LeaderboardsTable = styled(StyledTable)`
  .points-prev-week,
  .rankings-header,
  .username {
    display: none;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
  .points-prev-week,
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
  totalUsers: number
  leaderboardTable: [ILeaderboardRank]
  user?: ILeaderboardRank
}

const Leaderboard = () => {
  const {account} = useActiveWeb3React()
  const providerEth = new ethers.providers.InfuraProvider('mainnet', process.env.REACT_APP_INFURA_KEY)
  const [ranks, setRanks] = useState<ILeaderboardUserRank[] | null>(null)
  const [userData, setUserData] = useState<ILeaderboardUserRank | null>(null)
  const initialNumberOfRows = 10
  const [loadedNumberOfRows, setLoadedNumberOfRows] = useState(initialNumberOfRows)
  const [isDisabledLoadMoreBtn, setIsDisabledLoadMoreBtn] = useState(false)
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false)

  const [{data: pointsData, loading: dataLoading}, getPointsData] = useAxios(
    {
      baseURL: LEADERBOARD_POINTS_API,
      method: 'GET',
    },
    {manual: true},
  )

  const initialDataHandle = async () => {
    try {
      await getPointsData({
        url: `${initialNumberOfRows}${account ? `/${account}` : ''}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initialDataHandle()
  }, [])

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

  const totalUsers = useMemo<number>(() => {
    if (pointsData) {
      return pointsData.totalUsers
    }
  }, [pointsData])

  const [{data: pointsMoreData, loading: moreLoading}, getMoreData] = useAxios(
    {
      baseURL: LEADERBOARD_POINTS_API,
      method: 'GET',
    },
    {manual: true},
  )

  const leaderboardPointsMoreData = useMemo<ILeaderboardRank[]>(() => {
    if (pointsMoreData) {
      const newRowStarts = loadedNumberOfRows === initialNumberOfRows ? initialNumberOfRows : loadedNumberOfRows
      return pointsMoreData.leaderboardTable.slice(newRowStarts)
    }
  }, [pointsMoreData])

  // get initial ranks without usernames and avatars
  const getProcessedRanks = (passedData: ILeaderboardRank[]) => {
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

    setRanks(processedRanks as unknown as [ILeaderboardUserRank])
  }, [leaderboardPointsData])

  useEffect(() => {
    const processedRanks = leaderboardPointsMoreData && getProcessedRanks(leaderboardPointsMoreData)

    if (ranks && processedRanks) {
      const tempRanks = [...ranks, ...processedRanks]
      setRanks(tempRanks)
    }
  }, [leaderboardPointsMoreData])

  const initialUserData = useMemo<ILeaderboardRank>(() => {
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

  const curUserData = useMemo<ILeaderboardRank>(() => {
    if (userPointsData) {
      return userPointsData?.user
    }
  }, [userPointsData])

  useEffect(() => {
    if (account && pointsData && initialUserData === undefined) {
      getUserPointsData({
        url: `0/${account}`,
      })
    }
  }, [account, pointsData, initialUserData, getUserPointsData])

  useEffect(() => {
    const userRankData = {
      ...(initialUserData ?? curUserData),
      username: undefined,
    }

    setUserData(userRankData as unknown as ILeaderboardUserRank)
  }, [initialUserData, curUserData])

  useEffect(() => {
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
  }, [account, initialUserData, curUserData, userData, setUserData])

  // get final ranks with usernames and avatars
  const getFinalRanks = async (passedData: ILeaderboardRank[]) => {
    setIsLoadingProfiles(true)
    const processedRanks = await Promise.all(
      passedData.map(async data => {
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
    if (ranks && processedRanks) {
      const tempRanks = [...ranks, ...(processedRanks as unknown as [ILeaderboardUserRank])]
      setRanks(tempRanks)
      setIsLoadingProfiles(false)
    }
  }

  useEffect(() => {
    if (leaderboardPointsData?.length > 0) {
      getFinalRanks(leaderboardPointsData)
    }
  }, [leaderboardPointsData])

  useEffect(() => {
    if (leaderboardPointsMoreData?.length > 0) {
      getFinalRanks(leaderboardPointsMoreData)
    }
  }, [leaderboardPointsMoreData])

  useEffect(() => {
    setIsDisabledLoadMoreBtn(loadedNumberOfRows >= totalUsers)
  }, [loadedNumberOfRows, totalUsers])

  const loadMoreHandle = async () => {
    try {
      await getMoreData({
        url: `${loadedNumberOfRows + 20}`,
      })
      setLoadedNumberOfRows(loadedNumberOfRows + 20)
    } catch (error) {
      console.log(error)
    }
  }

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
              <TEXT.SmallBody className="rankings-header" fontWeight={600} color={colors(true).dark.white}>
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
          {ranks &&
            ranks.map((data: ILeaderboardUserRank, index) => (
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

      {ranks && (
        <ButtonWrapper>
          <LoadMoreButton
            isDisabled={isDisabledLoadMoreBtn || isLoadingProfiles}
            onClick={loadMoreHandle}
            disabled={isDisabledLoadMoreBtn || isLoadingProfiles}
          >
            <div>Load more</div>
            {moreLoading ? <Loader size="16px" stroke={colors(true).dark.blue2} /> : <ChevronDownIcon />}
          </LoadMoreButton>
        </ButtonWrapper>
      )}
    </PageContainer>
  )
}

export default Leaderboard
