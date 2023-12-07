import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useWalletModalToggle} from '../../state/application/hooks'
import {useActiveWeb3React} from '../../hooks/web3'

const OverviewContainer = styled.div`
  display: flex;
  padding: 24px 0 34px;
  flex-direction: column;
  gap: 16px;

  ${({theme}) => theme.mediaWidth.minMedium`
    background: red;
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

const SeasonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const LeaderboardOverview = ({userPoints}: {userPoints?: number}) => {
  const {account} = useActiveWeb3React()
  const yourPoints: string = `${userPoints ?? '0'} points`
  const toggleWalletModal = useWalletModalToggle()

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
                You have {yourPoints}
              </TEXT.BoldHeader1>
            </ResponsiveFlexRow>
          ) : (
            <FlexRowTextContainer>
              <ConnectWalletLink onClick={toggleWalletModal} fontSize={24} color={colors(false).dark.blue2}>
                Connect Wallet
              </ConnectWalletLink>
              <TEXT.BoldHeader1 fontSize={24} color={colors(false).dark.blue1}>
                to see points
              </TEXT.BoldHeader1>
            </FlexRowTextContainer>
          )}

          <ResponsiveFlexRow>
            <TEXT.Supplemental color={colors(false).dark.grey2}>Points are calculated on Thursdays.</TEXT.Supplemental>
            <LearnMoreLink target="_blank" href="https://docs.google.com/document/d/1IAtRTuijLdG8ytlXElVLjYbIPI0BqnN5BK__RY2aZ9A/edit?usp=sharing">
              Learn more ➞
            </LearnMoreLink>
          </ResponsiveFlexRow>
        </OverviewLeftContainer>
      </OverviewContainer>
    </>
  )
}

export default LeaderboardOverview
