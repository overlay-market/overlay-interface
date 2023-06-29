import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useWalletModalToggle} from '../../state/application/hooks'
import {Clock} from 'react-feather'
import {Image} from 'rebass'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'
import {useActiveWeb3React} from '../../hooks/web3'
import {ILeaderboardsData, IUserRank} from './Leaderboard'

const OverviewContainer = styled.div`
  display: flex;
  padding: 24px 0;

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
  gap: 4px;
`

const OverviewRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`

const OverviewCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #1b2131;
  border: 0.5px solid rgba(113, 206, 255, 0.5);
  border-radius: 8px;
  padding: 24px;
  max-width: 260px;
  ${({theme}) => theme.mediaWidth.minMedium`
    max-width: unset;
  `}
`

const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  background: #474747;
  border-radius: 50%;
  display: flex;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 36px 8px 16px;
  justify-content: space-between;
`

function calculateCountdown(endDate: string) {
  const futureDate = new Date(endDate).getTime()
  const now = new Date().getTime()
  const timeDiff = futureDate - now

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

  if (days || hours || minutes) {
    const countdown = `${days}d ${hours}h ${minutes}m`

    return countdown
  }

  return '-'
}

const LeaderboardOverview = ({seasonData, userData}: {seasonData: ILeaderboardsData; userData: IUserRank}) => {
  const {account} = useActiveWeb3React()

  const yourRewards: string = `${userData?.earnings ? `~${userData?.earnings}` : '0'} OVL`
  const seasonNumber: string = seasonData?.sessionNumber?.toString() || ''
  const upForGrabs: string = `${seasonData?.totalRewards ? `${seasonData?.totalRewards} OVL` : '-'}`
  const seasonEndCountdown: string = calculateCountdown(seasonData?.sessionEnd)
  const toggleWalletModal = useWalletModalToggle()

  return (
    <>
      <TEXT.BoldStandardBody color={colors(false).dark.grey2}>Trading Competition: Season {seasonNumber}</TEXT.BoldStandardBody>
      <OverviewContainer>
        <OverviewLeftContainer>
          {account ? (
            <FlexRowTextContainer>
              <TEXT.BoldHeader1 fontSize={24} color={colors(false).dark.blue1}>
                You are eligible for
              </TEXT.BoldHeader1>
              <TEXT.BoldHeader1 fontSize={24} color={colors(false).dark.tan1}>
                {yourRewards}
              </TEXT.BoldHeader1>
            </FlexRowTextContainer>
          ) : (
            <FlexRowTextContainer>
              <ConnectWalletLink onClick={toggleWalletModal} fontSize={24} color={colors(false).dark.blue2}>
                Connect Wallet
              </ConnectWalletLink>
              <TEXT.BoldHeader1 fontSize={24} color={colors(false).dark.blue1}>
                to see eligibility
              </TEXT.BoldHeader1>
            </FlexRowTextContainer>
          )}

          <TEXT.SmallBody color={colors(false).dark.grey2}>Rewards calculated by User Volume / Total Volume x Monthly Reward Pool</TEXT.SmallBody>

          <FlexRowTextContainer>
            <TEXT.SmallBody color={colors(false).dark.grey2}>Rewards airdropped first week of every month.</TEXT.SmallBody>
            <TEXT.SmallBody onClick={() => console.log('go to link')} color={colors(false).dark.blue2}>
              Learn more ➞
            </TEXT.SmallBody>
          </FlexRowTextContainer>
        </OverviewLeftContainer>
        <OverviewRightContainer>
          <OverviewCardContainer>
            <CardIcon>
              <Image src={OverlayLogoOnlyDark} alt={'Overlay Logo Light'} height={'32px'} width={'32px'} />
            </CardIcon>
            <CardContent>
              <TEXT.SmallBody color="#C4C4C4">Up for Grabs</TEXT.SmallBody>
              <TEXT.BoldStandardBody fontSize={18}>{upForGrabs}</TEXT.BoldStandardBody>
            </CardContent>
          </OverviewCardContainer>
          <OverviewCardContainer>
            <CardIcon>
              <Clock color={colors(false).dark.tan2} />
            </CardIcon>
            <CardContent>
              <TEXT.SmallBody color="#C4C4C4">Season Ends</TEXT.SmallBody>
              <TEXT.BoldStandardBody fontSize={18}>{seasonEndCountdown}</TEXT.BoldStandardBody>
            </CardContent>
          </OverviewCardContainer>
        </OverviewRightContainer>
      </OverviewContainer>
    </>
  )
}

export default LeaderboardOverview
