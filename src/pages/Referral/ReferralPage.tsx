import Box from '@material-ui/core/Box'
import {TEXT, colors} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import OverviewCard from '../../components/Card/OverviewCard'
import {PageContainer} from '../../components/Container/Container'
import ReferralModal from './ReferralModal'
import {RebatesTable} from './RebatesTable'
import {useHistory} from 'react-router-dom'
import {useReferralAccountData, useTokenTransfersReferralData} from '../../state/referral/hooks'
import {useEffect, useMemo, useState} from 'react'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {useReferralClaimCallback} from '../../hooks/useReferralClaim'
import ConfirmAffiliateModal from './CreateAffiliateCode'

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
  // const account = '0x85f66DBe1ed470A091d338CFC7429AA871720283'
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

  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, isLoading, refetch, account, isUninitialized])

  useEffect(() => {
    setAffiliateLink(window.location.origin + '/#/trader/' + account)
  }, [account])

  const {
    callback: referralClaimCallback,
    error,
    state,
  } = useReferralClaimCallback('9803090034464338', [
    '0xb3cd99d9bc50c7e40111de12a17b6127eec314b90b6904c3f395d5da85e3e4c4',
    '0x51b58c56e74e1de37212c6f1120a9e528a53a3ceeaebdf8f9e9912763b0d83db',
  ])
  // agreagarle el toat para que muestre el error

  console.log({referralClaimCallback, error, state})

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
        valueType: 'OVL',
        buttonText: 'Claim ->',
        button: referralClaimCallback,
      },
      {
        title: 'Total Rewards earned',
        value: referralPositionsChecker ? formatBigNumber(referralAccountData?.account?.referralPositions[0]?.totalAirdroppedAmount) ?? '0' : '0',
        valueType: 'OVL',
      },
      {
        title: 'Total Referrals',
        value: referralPositionsChecker && (referralAccountData?.account?.referralPositions[0]?.accountsReferred.toString() ?? '0'),
        valueType: 'Users',
      },
    ],
    [createCodeValue, referralPositionsChecker, referralAccountData, referralClaimCallback],
  )

  console.log(
    {cardsData},
    (referralPositionsChecker && formatBigNumber(referralAccountData?.account?.referralPositions[0]?.totalRewardsPending)) ?? '0',
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
          <ReferralModal />
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
                    />
                  </StyledGrid>
                )
              })}
            </Grid>
          ) : (
            <TEXT.SupplementalHeader fontSize={14}>
              Nothing here yet. Open a position on the{' '}
              <a href="/" style={{color: colors(false).dark.blue2}}>
                Markets
              </a>{' '}
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
