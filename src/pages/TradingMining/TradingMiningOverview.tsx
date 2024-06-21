import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useWalletModalToggle} from '../../state/application/hooks'
import {useActiveWeb3React} from '../../hooks/web3'
import {Clock} from 'react-feather'
import Loader from '../../components/Loaders/Loaders'
import moment from 'moment'
import {useMemo} from 'react'

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

const LearnMoreLink = styled.a`
  font-size: 12px;
  font-family: Inter;
  font-weight: 400;
  color: ${({theme}) => theme.dark.blue2};
  text-decoration: none;
`

const ResponsiveFlexRow = styled(FlexRowTextContainer)`
  flex-direction: column;
  ${({theme}) => theme.mediaWidth.minExtraSmall`
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
  flex-direction: row;
  align-items: center;
`

interface TradingMiningOverviewProps {
  userPoints?: number
  sessionEnd: string
  sessionLastUpdated: string
  isLoading: boolean
}

const TradingMiningOverview = ({userPoints, sessionEnd, sessionLastUpdated, isLoading}: TradingMiningOverviewProps) => {
  const {account} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  const currentTime = moment.utc(new Date())
  const sessionEndsTime = moment.utc(sessionEnd)
  const timeDifference = sessionEndsTime.diff(currentTime)
  const timeLeftDuration = moment.duration(timeDifference)

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

  return (
    <>
      <SeasonContainer>
        <TEXT.BoldSmallBody fontWeight={600}>Trading Competition</TEXT.BoldSmallBody>
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
            <FlexRowTextContainer>
              <ConnectWalletLink onClick={toggleWalletModal} fontSize={24} color={colors(false).dark.blue2}>
                Connect Wallet
              </ConnectWalletLink>
              <TEXT.BoldHeader1 fontSize={24} color={colors(false).dark.blue1}>
                to see Total Volume
              </TEXT.BoldHeader1>
            </FlexRowTextContainer>
          )}

          <FlexRowTextContainer>
            <TEXT.Supplemental color={colors(false).dark.grey2}>Leaderboard resets every Monday.</TEXT.Supplemental>
          </FlexRowTextContainer>
          <FlexRowTextContainer>
            <TEXT.Supplemental color={colors(false).dark.grey2}>Updated {lastUpdatedTime} ago</TEXT.Supplemental>
          </FlexRowTextContainer>
        </OverviewLeftContainer>

        <OverviewRightContainer>
          <StyledCard>
            <CardIcon>
              <Clock color={colors(false).dark.tan2} />
            </CardIcon>
            <CardInfoBox>
              <TEXT.SmallBody color={'#C4C4C4'}>Season Ends</TEXT.SmallBody>
              <TEXT.BoldNumber fontSize={18} color={colors(false).dark.blue1}>
                {!sessionEnd ? <Loader size="16px" /> : `${timeLeftDuration.days()}d ${timeLeftDuration.hours()}h ${timeLeftDuration.minutes()}m`}
              </TEXT.BoldNumber>
            </CardInfoBox>
          </StyledCard>
        </OverviewRightContainer>
      </OverviewContainer>
    </>
  )
}

export default TradingMiningOverview
