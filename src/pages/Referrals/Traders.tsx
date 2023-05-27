import {useContext, useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useActiveWeb3React} from '../../hooks/web3'
import {TEXT, colors} from '../../theme/theme'
import {FlexRow} from '../../components/Container/Container'
import {Input} from '../../components/Input/Input'
import {TriggerActionButton} from '../../components/Button/Button'
import {useWalletModalToggle} from '../../state/application/hooks'
import {Copy} from 'react-feather'
import {Icon} from '../../components/Icon/Icon'
import useAxios from 'axios-hooks'
import {REFERRALS_API} from '../../constants/referrals'
import useDebounce from '../../hooks/useDebounce'
import {ReferralContext} from '../../state/referrals/referralContext'
import Loader from '../../components/Loaders/Loaders'
import {
  ContentContainer,
  ErrorContainer,
  FixedWidthContainer,
  InputContainer,
  InterfaceContainer,
  Link,
  OverviewCard,
  OverviewContainer,
  ReferralInfoRow,
  SubmitReferralCodeButton,
  TriggerConnectWalletButton,
} from './Affiliates'

const referralCodeRegex = RegExp(`^[a-zA-Z0-9_]+$`)

const Traders = () => {
  const {
    referralCode: referrerCode,
    userInfo,
    userInfoLoading,
    getUserInfo,
    referralCode,
    setReferralCode,
    executeCheckReferralCode,
    checkReferralCodeLoading,
    setAccountReferralCodeLoading,
    setAccountReferralCode,
  } = useContext(ReferralContext)

  const [showError, setShowError] = useState<boolean>(false)
  const [isReferralCodeExisting, setIsReferralCodeExisting] = useState<boolean>(false)
  const {account, active} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const debouncedReferralCode = useDebounce(referralCode, 400)

  const [{loading: referrerInfoLoading, data: referrerInfo}, getReferrerInfo] = useAxios(
    {baseURL: REFERRALS_API, url: `userInfo/${userInfo?.referrer}`, method: 'GET'},
    {useCache: true},
  )

  const referrerLink: string | undefined = useMemo(() => {
    const links = Object.keys(referrerInfo?.referralLinks || {})
    return links.length ? links[0] : ''
  }, [referrerInfo, userInfo])

  const handleInputChange = (value: string) => {
    setReferralCode(value)
  }

  console.log({referrerCode})

  const submitReferralCode = async () => {
    const response = await setAccountReferralCode(referralCode)
    if (response) {
      await getUserInfo({
        url: `userInfo/${account}`,
        method: 'GET',
      })
    }
    setReferralCode('')
  }

  const handleContentCopy = (text: string): void => {
    const link = `${window.location.origin}/#/referrals?ref=${text}`
    navigator.clipboard.writeText(link)
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
          const {data: isCodeExisting} = await executeCheckReferralCode({
            url: `checkUserName/${referralCode}`,
            method: 'GET',
          })

          setIsReferralCodeExisting(isCodeExisting)
        } catch (error) {
          console.log(error)
        }
      }
    }, 400)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [referralCode])

  return userInfoLoading || referrerInfoLoading ? (
    <Loader size="32px" />
  ) : (
    <>
      {referrerLink && userInfo && referrerInfo && account ? (
        <OverviewContainer>
          <OverviewCard>
            <ReferralInfoRow margin="0 0 8px 0" justify="start">
              <TEXT.BoldSmallBody color={colors(false).dark.grey2}>Referral Code</TEXT.BoldSmallBody>
            </ReferralInfoRow>
            <ReferralInfoRow margin="0 0 8px 0" mobileFlexDirection="column" justify="start">
              <TEXT.StandardHeader1>{referrerLink}</TEXT.StandardHeader1>
            </ReferralInfoRow>
            <ReferralInfoRow margin="8px 0 0 0" mobileFlexDirection="column" justify="end">
              <TEXT.StandardHeader1>
                <Icon clickable onClick={() => handleContentCopy(referrerLink)}>
                  <Copy />
                </Icon>
              </TEXT.StandardHeader1>
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

      {referrerLink && userInfo && referrerInfo && account ? (
        <ContentContainer>
          <ReferralInfoRow>
            <TEXT.BoldSmallBody color={colors(false).dark.grey2}>Rebates</TEXT.BoldSmallBody>
          </ReferralInfoRow>
          <ReferralInfoRow margin="16px 0 0 0">
            <TEXT.SmallBody color={colors(false).dark.grey3}>No rebate distribution yet</TEXT.SmallBody>
          </ReferralInfoRow>
        </ContentContainer>
      ) : (
        <FixedWidthContainer>
          {account && active ? (
            <SubmitReferralCodeButton
              onClick={submitReferralCode}
              disabled={!referralCode || setAccountReferralCodeLoading || !isReferralCodeExisting || showError || checkReferralCodeLoading}
            >
              {setAccountReferralCodeLoading
                ? 'Processing...'
                : checkReferralCodeLoading
                ? 'Checking Code...'
                : debouncedReferralCode && !isReferralCodeExisting
                ? 'Referral code does not exist.'
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

export default Traders
