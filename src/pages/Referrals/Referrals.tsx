import {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useActiveWeb3React} from '../../hooks/web3'
import {TEXT} from '../../theme/theme'
import {Trans} from '@lingui/macro'
import {FlexRow} from '../../components/Container/Container'
import {ReferralTypeSelect} from './ReferralTypeSelect'
import {Input} from '../../components/Input/Input'
import {TriggerActionButton} from '../../components/Button/Button'
import {useWalletModalToggle} from '../../state/application/hooks'
import {Copy, Twitter} from 'react-feather'
import {Icon} from '../../components/Icon/Icon'
import useAxios from 'axios-hooks'

const REFERRAL_TYPES = {
  TRADERS: 'traders',
  AFFILIATES: 'affiliates',
}

const ReferralsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  margin-top: 64px;
  color: white;
`

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  color: #f0f0f0;
`

const InterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #71ceff;
  border-radius: 8px;
  box-shadow: 0 0 12px #5b60a4;
  padding: 16px 16px 24px;
  margin: 16px 0 24px;
  background: #1b2131;
`

interface InputContainerProps {
  noBackground?: boolean
}
const InputContainer = styled(FlexRow)<InputContainerProps>`
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0px;
  font-size: 16px;
  color: #f2f2f2;
  padding: 15px 4px;
  background: ${({noBackground}) => (noBackground ? '' : '#2e3343')};
`

const TriggerConnectWalletButton = styled(TriggerActionButton)`
  border: 1px solid #f2f2f2;
  background: #71ceff;
  color: #000000;
`

interface SubmitReferralCodeButtonProps {
  disabled?: boolean
}

const SubmitReferralCodeButton = styled(TriggerActionButton)<SubmitReferralCodeButtonProps>`
  border: 1px solid #f2f2f2;
  background: ${({disabled}) => (disabled ? '#D0D0D2' : '#71ceff')};
  color: ${({disabled}) => (disabled ? '#63656D' : '#000000')};
`
const Link = styled(TEXT.SmallBody)`
  cursor: pointer;

  &:hover {
    text-shadow: 0.5px 0.5px 1px rgba(159, 159, 159, 1);
  }
`
const ErrorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  div {
    color: red;
  }
`
interface ReferralInfoRowProps {
  justify?: string
  align?: string
  margin?: number
  marginTop?: number
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}
const ReferralInfoRow = styled.div<ReferralInfoRowProps>`
  margin: ${({margin}) => (margin ? `${margin}px 0` : '0')};
  margin-top: ${({marginTop}) => (marginTop ? `${marginTop}px` : '0')};
  justify-content: ${({justify}) => (justify ? justify : 'center')};
  align-items: ${({align}) => (align ? align : 'center')};
  align-items: ${({align}) => (align ? align : 'center')};
  flex-direction: ${({flexDirection}) => (flexDirection ? flexDirection : 'row')};
  display: flex;
  gap: 4px;
`

const referralCodeRegex = RegExp(`^[a-zA-Z0-9_]+$`)

const Referrals = () => {
  const [type, setType] = useState<string>(REFERRAL_TYPES.TRADERS)
  const [referralCode, setReferralCode] = useState<string>('')
  const [myReferralCode, setMyReferralCode] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)

  const {account} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  // TODO: Move all API calls to one hook called useReferralHook
  const [{loading: createReferralCodeLoading}, executeCreateReferralCode] = useAxios(
    {
      url: 'http://localhost:8080/referral/createReferralCode',
      method: 'POST',
      data: {
        sender: account,
        username: referralCode,
      },
    },
    {manual: true},
  )

  const [{data: userInfo}, getUserReferralLinks] = useAxios(
    {
      url: 'http://localhost:8080/referral/userInfo/' + account,
      method: 'GET',
    },
    {manual: true},
  )

  const submitReferralCode = () => {
    executeCreateReferralCode()
    setReferralCode('')
    setType(REFERRAL_TYPES.AFFILIATES)
  }

  const myAffiliateLink: string = useMemo<string>(
    () => (myReferralCode ? `${window.location.origin}/#/markets?ref=${myReferralCode}` : ''),
    [myReferralCode],
  )

  const handleContentCopy = () => {
    navigator.clipboard.writeText(myAffiliateLink)
  }

  const handleTwitter = () => {
    const message =
      encodeURIComponent(`Try out @OverlayProtocol, allows users to long/short ANY illiquid data stream with leverage by settling PnL in $OVL 🫡.

Use with fee discounts: ${myAffiliateLink}`)
    window.open(`https://twitter.com/intent/tweet?text=${message}`, '_blank')
  }

  // Where does Overlay Referral Program ➞ link go
  // Where does Tell us about it ➞ link go
  // Should Enter referral code be disabled when referral code is empty
  // Do we validate on input or on click of submit
  // Where does the twitter icon go
  // Are states correct

  useEffect(() => {
    if (referralCode !== '' && !referralCodeRegex.test(referralCode)) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }, [referralCode])

  useEffect(() => {
    if (type === REFERRAL_TYPES.AFFILIATES) {
      getUserReferralLinks()
      const lastCreatedLink = Object.keys(userInfo?.referralLinks || {}).slice(-1)[0]
      setMyReferralCode(lastCreatedLink ?? '')
    }
  }, [type, userInfo])

  return (
    <ReferralsContainer>
      <Title>
        <Trans>Referrals</Trans>
      </Title>

      <ReferralTypeSelect value={type} onSelect={setType} />
      {type === REFERRAL_TYPES.TRADERS ? (
        <InterfaceContainer>
          <ReferralInfoRow margin={8}>
            <TEXT.BoldSmallBody>Rebates. Fee Discounts.</TEXT.BoldSmallBody>
          </ReferralInfoRow>
          <ReferralInfoRow margin={8}>
            <TEXT.SmallBody>Need more info?</TEXT.SmallBody>
            <Link onClick={() => console.log('go to http://')} color={'#71CEFF'}>
              Overlay Referral Program ➞
            </Link>
          </ReferralInfoRow>
          <ReferralInfoRow marginTop={32} flexDirection="column">
            <InputContainer>
              <Input value={referralCode} onUserInput={setReferralCode} placeholder="Enter referral code" />
            </InputContainer>
            {showError && (
              <ErrorContainer>
                <TEXT.Supplemental>Only letters, numbers and underscores are allowed</TEXT.Supplemental>
              </ErrorContainer>
            )}
          </ReferralInfoRow>
        </InterfaceContainer>
      ) : (
        <InterfaceContainer>
          <ReferralInfoRow margin={8}>
            <TEXT.BoldSmallBody>Referral Codes</TEXT.BoldSmallBody>
          </ReferralInfoRow>
          <ReferralInfoRow marginTop={32}>
            <InputContainer noBackground>
              <Input readOnly value={myAffiliateLink} onUserInput={e => e} />
            </InputContainer>
            <Icon clickable onClick={handleContentCopy}>
              <Copy />
            </Icon>
            <Icon clickable margin="4px" onClick={handleTwitter}>
              <Twitter fill="#00acee" stroke="none" size={20} />
            </Icon>
          </ReferralInfoRow>
        </InterfaceContainer>
      )}

      {/* States
        Connect Wallet
        ### Traders
        Enter Referral Code
        Checking Code...
        Submit Code

        // Since we store them in DB we don't have a transaction that will be done,
        // hence we can delete this states below
        Sign Wallet to Confirm
        Transaction Processing...
        ### Affiliates
        Code Already Exists 
        Submit Code
        Sign Wallet to Confirm
        Transaction Processing...
      */}

      {type === REFERRAL_TYPES.TRADERS ? (
        <>
          {account ? (
            <SubmitReferralCodeButton onClick={submitReferralCode} disabled={!referralCode || createReferralCodeLoading}>
              {createReferralCodeLoading ? 'Processing...' : 'Enter Referral Code'}
            </SubmitReferralCodeButton>
          ) : (
            <TriggerConnectWalletButton onClick={toggleWalletModal}>Connect Wallet</TriggerConnectWalletButton>
          )}
        </>
      ) : (
        <>
          <ReferralInfoRow justify="start" margin={0}>
            <TEXT.SmallBody>More features coming soon to this referral page.</TEXT.SmallBody>
          </ReferralInfoRow>
          <ReferralInfoRow justify="start" margin={0}>
            <TEXT.SmallBody>Feature request?</TEXT.SmallBody>
            <Link onClick={() => window.open('https://discord.com/channels/798007956239024148/999068130989064234', '_blank')} color={'#71CEFF'}>
              Tell us about it ➞
            </Link>
          </ReferralInfoRow>
        </>
      )}
    </ReferralsContainer>
  )
}

export default Referrals
