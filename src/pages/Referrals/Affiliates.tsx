import {useContext, useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useActiveWeb3React} from '../../hooks/web3'
import {TEXT, colors} from '../../theme/theme'
import {FlexRow} from '../../components/Container/Container'
import {Input} from '../../components/Input/Input'
import {TriggerActionButton} from '../../components/Button/Button'
import {useWalletModalToggle} from '../../state/application/hooks'
import {Copy, Twitter} from 'react-feather'
import {Icon} from '../../components/Icon/Icon'
import useAxios from 'axios-hooks'
import {REFERRALS_API} from '../../constants/referrals'
import useDebounce from '../../hooks/useDebounce'
import {ReferralContext} from '../../state/referrals/referralContext'
import Loader from '../../components/Loaders/Loaders'

export const FixedWidthContainer = styled.div`
  width: 100%;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    width: 400px;
  `}
`

export const InterfaceContainer = styled.div`
  background: #1b2131;
  border: 0.5px solid rgba(113, 206, 255, 0.5);
  box-shadow: 0px 0px 12px 6px rgba(91, 96, 164, 0.25);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 12px #5b60a4;
  padding: 16px 16px 24px;
  margin: 16px 0 24px;
  max-width: 400px;
`

export const OverviewCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #1b2131;
  border: 0.5px solid rgba(113, 206, 255, 0.5);
  box-shadow: 0px 0px 12px 6px rgba(91, 96, 164, 0.25);
  border-radius: 8px;
  padding: 16px 32px 16px 32px;
  margin: 16px 0 24px;
  max-width: 400px;
  flex: 1;
`

export const OverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  margin-bottom: 40px;
`

interface ContentContainerProps {
  margin?: string
}

export const ContentContainer = styled.div<ContentContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
  margin: ${({margin}) => (margin ? margin : '')};
`

interface InputContainerProps {
  noBackground?: boolean
}
export const InputContainer = styled(FlexRow)<InputContainerProps>`
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0px;
  font-size: 16px;
  color: #f2f2f2;
  padding: 15px 4px;
  background: ${({noBackground}) => (noBackground ? '' : '#2e3343')};
`

export const TriggerConnectWalletButton = styled(TriggerActionButton)`
  border: 1px solid #f2f2f2;
  background: ${({theme}) => theme.dark.blue2};
  color: #000000;
`

interface SubmitReferralCodeButtonProps {
  disabled?: boolean
}

export const SubmitReferralCodeButton = styled(TriggerActionButton)<SubmitReferralCodeButtonProps>`
  background: ${({disabled, theme}) => (disabled ? theme.dark.white : theme.dark.blue2)};
  color: ${({disabled, theme}) => (disabled ? theme.dark.grey3 : theme.dark.black)};
`
export const Link = styled(TEXT.SmallBody)`
  cursor: pointer;
  color: ${({theme}) => theme.dark.blue2} !important;

  &:hover {
    text-shadow: 0.5px 0.5px 1px rgba(159, 159, 159, 1);
  }
`
export const ErrorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  div {
    color: red;
  }
`
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

interface ReferralInfoRowProps {
  justify?: string
  align?: string
  margin?: string
  width?: string
  height?: string
  borderTop?: string
  padding?: string
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  mobileFlexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}
export const ReferralInfoRow = styled.div<ReferralInfoRowProps>`
  margin: ${({margin}) => (margin ? `${margin}` : '0')};
  justify-content: ${({justify}) => (justify ? justify : 'center')};
  align-items: ${({align}) => (align ? align : 'center')};
  flex-direction: ${({mobileFlexDirection}) => (mobileFlexDirection ? mobileFlexDirection : 'row')};
  width: ${({width}) => (width ? width : '')};
  height: ${({height}) => (height ? height : '')};
  border-top: ${({borderTop}) => (borderTop ? borderTop : '')};
  padding: ${({padding}) => (padding ? padding : '')};
  display: flex;
  gap: 4px;

  ${({theme, flexDirection}) => theme.mediaWidth.minExtraSmall`
    flex-direction: ${() => (flexDirection ? flexDirection : 'row')};
  `}
`

const referralCodeRegex = RegExp(`^[a-zA-Z0-9_]+$`)

const Affiliates = () => {
  const {userInfo, getUserInfo, userInfoLoading, referralCode, setReferralCode, executeCheckReferralCode, checkReferralCodeLoading} =
    useContext(ReferralContext)

  const [showError, setShowError] = useState<boolean>(false)
  const [isReferralCodeAvailable, setIsReferralCodeAvailable] = useState<boolean>(false)
  const {account, active} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const [{loading: createReferralCodeLoading}, executeCreateReferralCode] = useAxios({baseURL: REFERRALS_API}, {manual: true})

  const debouncedReferralCode = useDebounce(referralCode, 400)

  const myReferralLink: string | undefined = useMemo(() => {
    const links = Object.keys(userInfo?.referralLinks || {})
    return links.length && links[0] !== 'none' ? links[0] : ''
  }, [userInfo])

  const handleInputChange = (value: string) => {
    setReferralCode(value)
  }

  const submitReferralCode = async () => {
    const res = await executeCreateReferralCode({
      url: 'createReferralCode',
      method: 'POST',
      data: {
        sender: account,
        username: referralCode,
      },
    })
    setReferralCode('')
    getUserInfo()
  }

  const myAffiliateLink: string = useMemo<string>(
    () => (myReferralLink ? `${window.location.origin}/#/referrals?ref=${myReferralLink}` : ''),
    [myReferralLink],
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

  // TODO: Where does Overlay Referral Program ➞ link go
  useEffect(() => {
    if (referralCode !== '' && !referralCodeRegex.test(referralCode)) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }, [referralCode])

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (referralCode && !showError) {
        try {
          const {data: isCodeValid} = await executeCheckReferralCode({
            url: `checkUserName/${referralCode}`,
            method: 'GET',
          })

          if (isCodeValid) {
            setIsReferralCodeAvailable(false)
          } else {
            setIsReferralCodeAvailable(true)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }, 400)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [referralCode])

  return userInfoLoading ? (
    <Loader size="32px" />
  ) : (
    <>
      {myReferralLink ? (
        <OverviewContainer>
          <OverviewCard>
            <ReferralInfoRow margin="0 0 8px 0" justify="start">
              <TEXT.BoldSmallBody color={colors(false).dark.grey2}>Referred Users</TEXT.BoldSmallBody>
            </ReferralInfoRow>
            <ReferralInfoRow margin="0 0 8px 0" mobileFlexDirection="column" justify="start">
              <TEXT.StandardHeader1>{userInfo?.referredCount}</TEXT.StandardHeader1>
            </ReferralInfoRow>
          </OverviewCard>
          <OverviewCard>
            <ReferralInfoRow margin="0 0 8px 0" justify="start">
              <TEXT.BoldSmallBody color={colors(false).dark.grey2}>Volume</TEXT.BoldSmallBody>
            </ReferralInfoRow>
            <ReferralInfoRow margin="0 0 8px 0" mobileFlexDirection="column" justify="start">
              <TEXT.StandardHeader1>$0</TEXT.StandardHeader1>
            </ReferralInfoRow>
          </OverviewCard>
          <OverviewCard>
            <ReferralInfoRow margin="0 0 8px 0" justify="start">
              <TEXT.BoldSmallBody color={colors(false).dark.grey2}>Rebates</TEXT.BoldSmallBody>
            </ReferralInfoRow>
            <ReferralInfoRow margin="0 0 8px 0" mobileFlexDirection="column" justify="start">
              <TEXT.StandardHeader1>$0</TEXT.StandardHeader1>
            </ReferralInfoRow>
            <ReferralInfoRow margin="8px 0 0 0" mobileFlexDirection="column" justify="end" height="24px">
              <TEXT.BoldSmallBody color={colors(false).dark.blue2}>Claim</TEXT.BoldSmallBody>
            </ReferralInfoRow>
          </OverviewCard>
        </OverviewContainer>
      ) : (
        <FixedWidthContainer>
          <InterfaceContainer>
            <ReferralInfoRow margin="0 0 8px 0">
              <TEXT.BoldSmallBody>Rebates. Fee Discounts.</TEXT.BoldSmallBody>
            </ReferralInfoRow>
            <ReferralInfoRow margin="0 0 8px 0" mobileFlexDirection="column">
              <TEXT.SmallBody>Need more info?</TEXT.SmallBody>
              <Link onClick={() => console.log('go to http://')}>Overlay Referral Program ➞</Link>
            </ReferralInfoRow>
            <ReferralInfoRow margin="32px 0 0 0" flexDirection="column">
              <InputContainer>
                <Input value={referralCode} onUserInput={handleInputChange} placeholder="Enter referral code" />
              </InputContainer>
              {showError && (
                <ErrorContainer>
                  <TEXT.Supplemental>Only letters, numbers and underscores are allowed</TEXT.Supplemental>
                </ErrorContainer>
              )}
            </ReferralInfoRow>
          </InterfaceContainer>
        </FixedWidthContainer>
      )}

      {myReferralLink ? (
        <>
          <ContentContainer>
            <ReferralInfoRow>
              <TEXT.BoldSmallBody color={colors(false).dark.grey2}>Referral Code</TEXT.BoldSmallBody>
            </ReferralInfoRow>
            <ReferralInfoRow
              borderTop={`1px solid ${colors(false).dark.white}`}
              margin="16px 0 0 0"
              width="100%"
              justify="space-between"
              padding="16px 0 0 0"
            >
              <TEXT.SmallBody color={colors(false).dark.blue1}>{myReferralLink}</TEXT.SmallBody>
              <ButtonsContainer>
                <Icon disabled={userInfoLoading} clickable onClick={handleContentCopy}>
                  <Copy />
                </Icon>
                <Icon disabled={userInfoLoading} clickable margin="4px" onClick={handleTwitter}>
                  <Twitter fill="#00acee" stroke="none" size={20} />
                </Icon>
              </ButtonsContainer>
            </ReferralInfoRow>
          </ContentContainer>
          <ContentContainer margin="64px 0 0 0">
            <ReferralInfoRow>
              <TEXT.BoldSmallBody color={colors(false).dark.grey2}>Rebates</TEXT.BoldSmallBody>
            </ReferralInfoRow>
            <ReferralInfoRow margin="16px 0 0 0">
              <TEXT.SmallBody color={colors(false).dark.grey3}>No rebate distribution yet</TEXT.SmallBody>
            </ReferralInfoRow>
          </ContentContainer>
        </>
      ) : (
        <FixedWidthContainer>
          {account && active ? (
            <SubmitReferralCodeButton
              onClick={submitReferralCode}
              disabled={!referralCode || createReferralCodeLoading || !isReferralCodeAvailable || showError || checkReferralCodeLoading}
            >
              {createReferralCodeLoading
                ? 'Processing...'
                : checkReferralCodeLoading
                ? 'Checking Code...'
                : debouncedReferralCode && !isReferralCodeAvailable
                ? 'Code Already Exists'
                : 'Submit Code'}
            </SubmitReferralCodeButton>
          ) : (
            <TriggerConnectWalletButton onClick={toggleWalletModal}>Connect Wallet</TriggerConnectWalletButton>
          )}
        </FixedWidthContainer>
      )}
    </>
  )
}

export default Affiliates
