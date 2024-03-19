import Box from '@material-ui/core/Box'
import {TEXT, colors} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import OverviewCard from '../../components/Card/OverviewCard'
import {PageContainer} from '../../components/Container/Container'
import ReferralModal from './ReferralModal'
import {RebatesTable} from './RebatesTable'
import {Link, useHistory} from 'react-router-dom'
import {useReferralAccountData} from '../../state/referral/hooks'
import {useEffect, useMemo, useState} from 'react'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {useReferralClaimCallback} from '../../hooks/useReferralClaim'
import ConfirmAffiliateModal from './CreateAffiliateCode'
import {REWARDS_API} from '../../constants/applications'

const Container = styled.div<{mt?: string}>`
  display: flex;
  flex-direction: column;
  margin-top: 0;
  position: relative;
  z-index: 1;

  ${({theme, mt}) => theme.mediaWidth.minMedium`
    margin-top: ${mt ? `${mt}` : ''};
  `}
`

const StyledGrid = styled(Grid)<{order?: number}>`
  display: flex;
  padding: 4px !important;
`

export const ReferralPage = () => {
  const {account, chainId} = useActiveWeb3React()
  const history = useHistory()
  const handleTraderLinkClick = () => {
    history.push('/trader')
  }
  const {referralAccountData, isLoading, refetch, isUninitialized} = useReferralAccountData(account)
  const affiliatedTo = referralAccountData?.account?.referralPositions[0]?.affiliatedTo?.id
  const tier = referralAccountData?.account?.referralPositions[0]?.tier
  const [affiliateLink, setAffiliateLink] = useState('')
  const createCodeValue = 500000 - +(formatBigNumber(referralAccountData?.account?.ovlVolumeTraded, 18, 0) ?? 0)
  const referralPositionsChecker =
    referralAccountData?.account?.referralPositions !== undefined && referralAccountData?.account?.referralPositions.length > 0
  const [showModalTrigger, setShowModalTrigger] = useState(false)
  const [reward, setReward] = useState('')
  const [proof, setProof] = useState([''])
  const rewardsUrl = `${REWARDS_API}/rewards/${account?.toLowerCase() + '?campaign=referral'}`

  const {callback: referralClaimCallback, error, state} = useReferralClaimCallback(reward, proof)

  useEffect(() => {
    fetch(rewardsUrl, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setReward((data.reward ?? ['']).toString())
        setProof(data.proof ?? [''])
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [rewardsUrl])

  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, isLoading, refetch, account, isUninitialized])

  useEffect(() => {
    setAffiliateLink(window.location.origin + '/#/trader/' + account)
  }, [account])

  const cardsData = useMemo(
    () => [
      {
        title: 'Create a referral code',
        value: createCodeValue.toLocaleString('en-US') + ' $OV',
        valueType: 'volume left',
        valueTypeLink: false,
      },
      {
        title: 'Rewards pending',
        value: (referralPositionsChecker && formatBigNumber(referralAccountData?.account?.referralPositions[0]?.totalRewardsPending)) ?? '0',
        valueType: 'OV',
        buttonText: 'Claim ->',
        button: referralClaimCallback,
        hasClaimableReward: Number(reward) > 0,
        tooltip: (reward && formatBigNumber(reward)) + ' OV available for claiming.',
      },
      {
        title: 'Total Rewards earned',
        value: referralPositionsChecker ? formatBigNumber(referralAccountData?.account?.referralPositions[0]?.totalAirdroppedAmount) ?? '0' : '0',
        valueType: 'OV',
      },
      {
        title: 'Total Referrals',
        value: referralPositionsChecker && (referralAccountData?.account?.referralPositions[0]?.accountsReferred.toString() ?? '0'),
        valueType: 'Users',
      },
    ],
    [createCodeValue, referralPositionsChecker, referralAccountData, referralClaimCallback],
  )

  cardsData.forEach(card => {
    if (card.title === 'Create a referral code') {
      if (createCodeValue === 0) {
        card.value += ' volume left'
        card.valueType = 'Create code ->'
        card.valueTypeLink = true
      }
      if (tier && tier > 0) {
        card.valueTypeLink = true
        card.value = affiliateLink
        card.valueType = 'Copy link ->'
      }
    }
  })

  return (
    <PageContainer>
      <Container mt={'50px'}>
        <Box>
          <Box display={'flex'} flexDirection={'row'}>
            <TEXT.BoldHeader1 mb="16px">Referral</TEXT.BoldHeader1>
            <TEXT.SmallBody width={'auto'} ml={'auto'} mt={'5px'}>
              {!affiliatedTo && (!tier || tier === 0) && (
                <a onClick={handleTraderLinkClick} target="blank" style={{color: colors(false).dark.blue2, cursor: 'pointer'}}>
                  Enter a referral code &rarr;
                </a>
              )}
            </TEXT.SmallBody>
          </Box>
          <ReferralModal tier="ambassador" />
        </Box>
        <Box>
          {account ? (
            <Grid container spacing={3}>
              {cardsData.map(card => {
                return (
                  <StyledGrid
                    item
                    key={card.title}
                    xs={card.title === 'Create a referral code' || card.title === 'Locked Sum' ? 12 : 6}
                    sm={6}
                    md={6}
                    lg={3}
                  >
                    <OverviewCard
                      title={card.title}
                      value={card.value !== false ? card.value : '0'}
                      valueType={card.valueType}
                      valueTypeLink={card.valueTypeLink}
                      buttonText={card.buttonText ?? undefined}
                      button={card.button ?? undefined}
                      showModal={(showModalTrigger: boolean) => setShowModalTrigger(showModalTrigger)}
                      tooltip={card.tooltip}
                      hasClaimableReward={card.hasClaimableReward}
                    />
                  </StyledGrid>
                )
              })}
            </Grid>
          ) : (
            <TEXT.SupplementalHeader fontSize={14}>
              Nothing here yet. Open a position on the{' '}
              <Link to="/markets" style={{color: colors(false).dark.blue2}}>
                Markets
              </Link>{' '}
              page to begin.
            </TEXT.SupplementalHeader>
          )}
        </Box>
        <Box>
          <RebatesTable />
        </Box>
        <ConfirmAffiliateModal isOpen={showModalTrigger} onDismiss={() => setShowModalTrigger(false)} />
      </Container>
    </PageContainer>
  )
}
