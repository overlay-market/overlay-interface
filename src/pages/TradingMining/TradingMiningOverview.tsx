import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useWalletModalToggle} from '../../state/application/hooks'
import {useActiveWeb3React} from '../../hooks/web3'
import {Clock} from 'react-feather'
import Loader from '../../components/Loaders/Loaders'
import moment from 'moment'
import {FC, useEffect, useMemo, useState} from 'react'
import {Menu, MenuItem, Box} from '@material-ui/core'
import {LoadMoreButton} from '../../components/Button/Button'
import {SessionData} from './TradingMiningLeaderboard'

const ChevronDownIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
    />
  </svg>
)
const OverviewContainer = styled.div`
  display: flex;
  padding: 24px 0 8px;
  flex-direction: column-reverse;
  gap: 16px;

  ${({theme}) => theme.mediaWidth.minSmall`
    padding: 24px 0 0;
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    flex-direction: row;
    gap: 0;
  `}

  & > div {
    flex: 1;
  }
`

const FlexRowTextContainer = styled.div`
  display: flex;
  gap: 0.5em;
`

const ConnectWalletLink = styled(TEXT.BoldHeader1)`
  text-decoration: underline;
  cursor: pointer;
`

const OverviewLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const OverviewRightContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: flex-start;

  ${({theme}) => theme.mediaWidth.minMedium`
    justify-content: flex-end;
  `}
`

const ResponsiveFlexRow = styled(FlexRowTextContainer)`
  flex-direction: column;
  ${({theme}) => theme.mediaWidth.minSmall`
    flex-direction: row;
  `}
`

const StyledCard = styled.div`
  width: 260px;
  height: 112px;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;
  border: 0.5px solid rgba(113, 206, 255, 0.5);
  background-color: #1b2131;
  display: flex;
  gap: 8px;
  align-items: center;
`

const CardIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.dark.grey4};
`

const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const SeasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${({theme}) => theme.mediaWidth.minSmall`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `}
`

const DropdownButton = styled(LoadMoreButton)`
  width: 260px;
`

const StyledMenu = styled(Menu)({
  marginTop: '50px',

  '& .MuiPaper-root': {
    backgroundColor: `${colors(true).dark.grey4}`,
    borderTop: '1px solid #333',
    maxWidth: '260px',
    width: '260px',
    color: `${colors(true).dark.blue1}`,
    borderRadius: '8px',
  },
  '& .MuiListItem-root': {
    justifyContent: 'center',
  },
  '& .MuiButtonBase-root': {
    paddingLeft: '20px',
  },
  '& .MuiButtonBase-root:hover': {
    backgroundColor: 'rgb(0,0,0, 0.16)',
  },
})

const MenuItemLabel = styled(Box)({
  position: 'absolute',
  left: '4px',
  fontSize: '10px',
  fontFamily: 'Inter',
  fontWeight: '600',
  background: 'linear-gradient(89.2deg, #d5b4ff -1.18%, #ffa2b9 26.07%, #ff648a 47.56%, #ffcc8f 64.85%, #d5b4ff 99.44%)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
})

interface TradingMiningOverviewProps {
  userPoints?: number
  sessionEnd: string
  sessionLastUpdated: string
  sessionsList: SessionData[]
  setSelectedSessionId: React.Dispatch<React.SetStateAction<string | null>>
  isLoading: boolean
}

const TradingMiningOverview = ({
  userPoints,
  sessionEnd,
  sessionLastUpdated,
  sessionsList,
  setSelectedSessionId,
  isLoading,
}: TradingMiningOverviewProps) => {
  const {account} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const [activeDropdownValue, setActiveDropdownValue] = useState('...')
  const isCurrentSession = Boolean(sessionLastUpdated)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openDropdownMenu = Boolean(anchorEl)

  const currentTime = moment.utc(new Date())
  const sessionEndsTime = moment.utc(sessionEnd)
  const timeDifference = sessionEndsTime.diff(currentTime)
  const timeLeftDuration = moment.duration(timeDifference)

  const seasonEndedTime = moment.utc(sessionEnd).subtract(1, 'hours')

  const sessionLastUpdatedTime = moment.utc(sessionLastUpdated)
  const lastUpdatedTimeDifference = currentTime.diff(sessionLastUpdatedTime)
  const lastUpdatedTimeDuration = moment.duration(lastUpdatedTimeDifference)

  const lastUpdatedTime = useMemo(() => {
    if (!sessionLastUpdated) return `...`
    if (lastUpdatedTimeDuration.minutes() === 0 && lastUpdatedTimeDuration.hours() === 0) return `1 minute`

    if (lastUpdatedTimeDuration.hours() === 0) {
      return `${lastUpdatedTimeDuration.minutes()} minute${lastUpdatedTimeDuration.minutes() === 1 ? '' : 's'}`
    } else {
      return `${lastUpdatedTimeDuration.hours()} hour${
        lastUpdatedTimeDuration.hours() === 1 ? '' : 's'
      } and ${lastUpdatedTimeDuration.minutes()} minute${lastUpdatedTimeDuration.minutes() === 1 ? '' : 's'}`
    }
  }, [lastUpdatedTimeDuration, sessionLastUpdated])

  const sessionsDatesList = useMemo(() => {
    if (sessionsList) {
      const newList: Map<string, string> = new Map()

      sessionsList.forEach(el => {
        const sessionStarts = moment.utc(el.sessionStart)
        const sessionEnds = moment.utc(el.sessionEnd).subtract(1, 'hours')
        newList.set(
          el._id,
          `Session ${sessionStarts.format('MMM')} ${sessionStarts.format('DD')} - ${sessionEnds.format('MMM')} ${sessionEnds.format('DD')}`,
        )
      })
      const resultList = Array.from(newList).map(([id, session]) => ({id, session}))
      return resultList.reverse()
    }
  }, [sessionsList])

  useEffect(() => {
    if (sessionsDatesList) {
      setActiveDropdownValue(sessionsDatesList[0].session)
    }
  }, [sessionsDatesList])

  const clickSelectSeason = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeSelectSeason = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const handleSelectSession = (session: {id: string; session: string}) => {
    sessionsDatesList && setActiveDropdownValue(session.session)
    setSelectedSessionId(session.id)
    setAnchorEl(null)
  }

  return (
    <>
      <SeasonContainer>
        <TEXT.BoldSmallBody fontWeight={600}>Trading Competition</TEXT.BoldSmallBody>

        <DropdownButton
          onClick={clickSelectSeason}
          id="dropdown"
          aria-controls={openDropdownMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openDropdownMenu ? 'true' : undefined}
        >
          {activeDropdownValue}
          {activeDropdownValue !== '...' && <ChevronDownIcon />}
        </DropdownButton>
        <StyledMenu id="basic-menu" anchorEl={anchorEl} open={openDropdownMenu} onClose={closeSelectSeason}>
          {sessionsDatesList &&
            sessionsDatesList.map((session, idx) => {
              return (
                <MenuItem key={session.id} onClick={() => handleSelectSession(session)}>
                  {idx === 0 && <MenuItemLabel>Current</MenuItemLabel>}
                  <Box sx={{color: session.session === activeDropdownValue ? '#71CEFF' : ''}}>{session.session}</Box>
                </MenuItem>
              )
            })}
        </StyledMenu>
      </SeasonContainer>
      <OverviewContainer>
        <OverviewLeftContainer>
          {account ? (
            <ResponsiveFlexRow>
              <TEXT.BoldHeader1 fontSize={24} color={colors(true).dark.white}>
                Your Total Volume is {isLoading ? <Loader size="16px" /> : `${userPoints ?? '0'}`}
              </TEXT.BoldHeader1>
            </ResponsiveFlexRow>
          ) : (
            <ResponsiveFlexRow>
              <ConnectWalletLink onClick={toggleWalletModal} fontSize={24} color={colors(false).dark.blue2}>
                Connect Wallet
              </ConnectWalletLink>
              <TEXT.BoldHeader1 fontSize={24} color={colors(false).dark.blue1}>
                to see Total Volume
              </TEXT.BoldHeader1>
            </ResponsiveFlexRow>
          )}

          <FlexRowTextContainer>
            <TEXT.Supplemental color={colors(false).dark.grey2}>Leaderboard resets every Monday.</TEXT.Supplemental>
          </FlexRowTextContainer>
          {isCurrentSession && (
            <FlexRowTextContainer>
              <TEXT.Supplemental color={colors(false).dark.grey2}>Updated {lastUpdatedTime} ago</TEXT.Supplemental>
            </FlexRowTextContainer>
          )}
        </OverviewLeftContainer>

        <OverviewRightContainer>
          <StyledCard>
            <CardIcon>
              <Clock color={colors(false).dark.tan2} />
            </CardIcon>
            <CardInfoBox>
              {isCurrentSession ? (
                <>
                  <TEXT.SmallBody color={'#C4C4C4'}>Season Ends</TEXT.SmallBody>
                  <TEXT.BoldNumber fontSize={18} color={colors(false).dark.blue1}>
                    {!sessionEnd ? <Loader size="16px" /> : `${timeLeftDuration.days()}d ${timeLeftDuration.hours()}h ${timeLeftDuration.minutes()}m`}
                  </TEXT.BoldNumber>
                </>
              ) : (
                <>
                  <TEXT.SmallBody color={'#C4C4C4'}>Season Ended</TEXT.SmallBody>
                  <TEXT.BoldNumber fontSize={18} color={colors(false).dark.blue1}>
                    {!sessionEnd ? <Loader size="16px" /> : `${seasonEndedTime.format('MMM')} ${seasonEndedTime.format('DD')}`}
                  </TEXT.BoldNumber>
                </>
              )}
            </CardInfoBox>
          </StyledCard>
        </OverviewRightContainer>
      </OverviewContainer>
    </>
  )
}

export default TradingMiningOverview
