import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useWalletModalToggle} from '../../state/application/hooks'
import {useActiveWeb3React} from '../../hooks/web3'
import {Clock} from 'react-feather'
import Loader from '../../components/Loaders/Loaders'
import moment from 'moment'

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

const TradingMiningOverview = ({userPoints, sessionEnd, isLoading}: {userPoints?: number; sessionEnd: string; isLoading: boolean}) => {
  const {account} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  const currentTime = moment.utc(new Date())
  const sessionEndsTime = moment.utc(sessionEnd)
  const timeDifference = sessionEndsTime.diff(currentTime)
  const timeLeftDuration = moment.duration(timeDifference)

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
            <LearnMoreLink
              target="_blank"
              href="https://mirror.xyz/0x7999C7f0b9f2259434b7aD130bBe36723a49E14e/Q5OmkZ7eXCZ8AgrDy37IaLfTQouVR9R1U3mmiRDDdz8"
            >
              Learn more ➞
            </LearnMoreLink>
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
