import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useWalletModalToggle} from '../../state/application/hooks'
import {Clock} from 'react-feather'
import {Image} from 'rebass'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'
import {useActiveWeb3React} from '../../hooks/web3'
import {ILeaderboardsData, IUserRank} from './Leaderboard'
import {LEADERBOARRDS_API} from '../../constants/applications'
import useAxios from 'axios-hooks'
import {useEffect, useMemo, useRef, useState} from 'react'
import {RotatingChevron} from '../../components/Header/Header'
import Loader from '../../components/Loaders/Loaders'
import OverviewCard from '../../components/Card/OverviewCard'

const OverviewContainer = styled.div`
  display: flex;
  padding: 24px 0;
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
  gap: 4px;
`

const OverviewRightContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: flex-start;

  ${({theme}) => theme.mediaWidth.minMedium`
    justify-content: flex-end;
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

const LearnMoreLink = styled.a`
  font-size: 14px;
  font-family: Inter;
  font-weight: 400;
  color: ${({theme}) => theme.dark.blue2};
  text-decoration: none;
`

const SeasonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Dropdown = styled.div<{active: boolean}>`
  display: none;
  flex-direction: column;
  position: relative;
  text-decoration: none;
  padding: 8px 0 8px 8px;
  cursor: pointer;

  border-radius: 8px;
  transition: width 0.2 ease-in-out;

  .dropdown-list {
    padding: 0;
    border-radius: 8px;
    width: 59px;
    height: 0px;

    a {
      display: none;
    }
  }

  .chevron {
    transform: rotate(0deg);
  }

  ${({active, theme}) =>
    active
      ? `
        background: ${theme.dark.grey5};
        border-radius: 8px 8px 0 0;
        width: 100px;

        .chevron {
          transform: rotate(180deg);
        }

        .dropdown-list {
          border-radius: 0 0 8px 8px;
          width: 108px;
          height: auto;
          padding-bottom: 8px;

          a {
            display: flex;
          }
        }`
      : ''}

  ${({theme}) => theme.mediaWidth.minSmall`
    display: flex;
  `};
`

const DropdownContent = styled.div`
  display: flex;
  gap: 4px;
`

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.dark.grey5};
  overflow: hidden;
  transition: width 0.2 ease-in-out;
  max-height: 160px;
  overflow-y: scroll;
  padding: 0;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(229, 246, 255, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
`

const DropdownItem = styled.div`
  padding: 8px 16px 8px 8px;
`

function calculateCountdown(endDate: string) {
  const futureDate = new Date(endDate).getTime()
  const now = new Date().getTime()
  const timeDiff = futureDate - now

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

  if (days < 0 || hours < 0 || minutes < 0) {
    return '-'
  }

  if (days || hours || minutes) {
    const countdown = `${days}d ${hours}h ${minutes}m`

    return countdown
  }

  return '-'
}

const LeaderboardOverview = ({
  seasonData,
  userData,
  isLoading,
  setSeasonId,
}: {
  seasonData: ILeaderboardsData
  userData: IUserRank
  isLoading: boolean
  setSeasonId: Function
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [seasonNumber, setSeasonNumber] = useState(seasonData?.sessionNumber)
  const {account} = useActiveWeb3React()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const yourRewards: string = `${userData?.earnings ? `~${userData?.earnings}` : '0'} OVL`
  const upForGrabs: string = `${seasonData?.totalRewards ? `${seasonData?.totalRewards} OVL` : '-'}`
  const seasonEndCountdown: string = calculateCountdown(seasonData?.sessionEnd)
  const toggleWalletModal = useWalletModalToggle()

  const [{data: seasonsRaw}] = useAxios({
    baseURL: LEADERBOARRDS_API,
    url: `sessions/getSessionsForDropdown`,
    method: 'GET',
  })

  const seasons = useMemo(() => {
    const seasonsArray = seasonsRaw?.sessions?.filter((season: any) => {
      return new Date(season?.sessionStart) < new Date()
    })

    return seasonsArray || []
  }, [seasonsRaw])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  useEffect(() => {
    setSeasonNumber(seasonData?.sessionNumber)
  }, [seasonData])

  return (
    <>
      <SeasonContainer>
        <TEXT.BoldStandardBody color={colors(false).dark.grey2} mr="4px">
          Trading Competition:
        </TEXT.BoldStandardBody>

        <Dropdown ref={dropdownRef} onClick={() => setIsDropdownOpen(!isDropdownOpen)} active={isDropdownOpen}>
          <DropdownContent>
            <TEXT.SmallBody color={colors(false).dark.white}>Season {isLoading ? <Loader size="12px" /> : seasonNumber}</TEXT.SmallBody>
            <RotatingChevron color={colors(false).dark.white} className="chevron" height={17} width={17} />
          </DropdownContent>
          <DropdownList className="dropdown-list">
            {seasons.map((season: any) => (
              <DropdownItem
                onClick={() => {
                  setSeasonId(season?._id)
                  setSeasonNumber(season?.sessionNumber)
                }}
              >
                <TEXT.SmallBody>Season {season?.sessionNumber}</TEXT.SmallBody>
              </DropdownItem>
            ))}
          </DropdownList>
        </Dropdown>
      </SeasonContainer>
      <OverviewContainer>
        <OverviewLeftContainer>
          {account ? (
            <FlexRowTextContainer>
              <TEXT.BoldHeader1 fontSize={24} color={colors(false).dark.blue1}>
                You are eligible for
              </TEXT.BoldHeader1>
              <TEXT.BoldHeader1 fontSize={24} color={colors(false).dark.tan1}>
                {isLoading ? <Loader size="16px" /> : yourRewards}
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
            <LearnMoreLink target="_blank" href="https://docs.google.com/document/d/1IAtRTuijLdG8ytlXElVLjYbIPI0BqnN5BK__RY2aZ9A/edit?usp=sharing">
              Learn more ➞
            </LearnMoreLink>
          </FlexRowTextContainer>
        </OverviewLeftContainer>
        <OverviewRightContainer>
          <OverviewCard
            title="Up for Grabs"
            icon={
              <CardIcon>
                <Image src={OverlayLogoOnlyDark} alt={'Overlay Logo Light'} height={'32px'} width={'32px'} />
              </CardIcon>
            }
            value={upForGrabs}
          />
          <OverviewCard
            title={seasonEndCountdown === '-' ? 'Season Ended' : 'Season Ends'}
            icon={
              <CardIcon>
                <Clock color={colors(false).dark.tan2} />
              </CardIcon>
            }
            value={
              isLoading ? (
                <Loader size="16px" />
              ) : seasonEndCountdown === '-' ? (
                new Date(seasonData?.sessionEnd).toLocaleDateString()
              ) : (
                seasonEndCountdown
              )
            }
          />
        </OverviewRightContainer>
      </OverviewContainer>
    </>
  )
}

export default LeaderboardOverview
