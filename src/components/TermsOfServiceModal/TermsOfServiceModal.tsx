import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useCookies} from 'react-cookie'
import {useModalOpen, useTermsOfServiceModalToggle} from '../../state/application/hooks'
import {ApplicationModal} from '../../state/application/actions'
import {SolidColorButton} from '../Button/Button'
import {TEXT} from '../../theme/theme'
import {FlexRow, FlexColumn} from '../Container/Container'
import {useTermsOfServiceStatusManager} from '../../state/application/hooks'
import {UserTermsOfServiceStatus} from '../../state/application/actions'
import Modal from '../Modal/Modal'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  width: 100%;
  background: #0b0f1c;
  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`

const StyledLink = styled.a`
  text-decoration: underline;
  color: #F0F0F0;
  cursor: pointer;
`;

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  color: 'white',
  margin: '8px',
}));


// @TO-DO: Combine UserAcceptButton and UserDeclineButton
const UserAcceptButton = styled(SolidColorButton)`
  display: flex;
  height: 40px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 8px;
  background: #53B1F9;
  margin-right: 4px;
`

const UserDeclineButton = styled(SolidColorButton)`
  display: flex;
  height: 40px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 8px;
  background: #353B4F;
  margin-left: 4px;
`

const customRadioColor = '#71CEFF !important';
const uncheckedRadioColor = 'white !important';

const CustomRadio = styled(Radio)`
  color: ${uncheckedRadioColor};
  backgroundColor: ${customRadioColor};
  &.Mui-checked {
    color: ${customRadioColor};
  }
  &.hover: {
    &.MuiRadio-colorSecondary: {
      background: 'none';
    },
    color: ${uncheckedRadioColor};
  },
`;

export enum ClientCookies {
  userHasAcceptedServiceAgreement = 'userHasAcceptedServiceAgreement',
  userRiskLevel = 'userRiskLevel',
}

export default function TermsOfServiceModal() {
  const [userAgreementStatus, setUserAgreementStatus] = useTermsOfServiceStatusManager()
  const [value, setValue] = useState('All');
  const termsOfServiceModalOpen = useModalOpen(ApplicationModal.TERMS_OF_SERVICE)
  const [, setCookie] = useCookies([ClientCookies.userHasAcceptedServiceAgreement])

  const toggleTermsOfServiceModal = useTermsOfServiceModalToggle()

  useEffect(() => {
    if (userAgreementStatus === UserTermsOfServiceStatus.ACCEPTED) {
      // maxAge in seconds e.g 1 mo = 2628000 seconds
      setCookie(ClientCookies.userHasAcceptedServiceAgreement, 'true', {path: '/', maxAge: 7884000})
    }
  }, [userAgreementStatus, setCookie])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const openLinkInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  function acceptTermsOfService() {
    setUserAgreementStatus(UserTermsOfServiceStatus.ACCEPTED)
    if (value==='Necessary'){
      // @ts-ignore
      window.amplitude.setOptOut(true)
      gaOptout();
    }
  }

  function declineTermsOfService() {
    setUserAgreementStatus(UserTermsOfServiceStatus.REJECTED)
  }

  return (
    <Modal isOpen={termsOfServiceModalOpen} onDismiss={toggleTermsOfServiceModal} minHeight={false} maxHeight={90} width='520px'>
      <ModalContent>
        <FlexColumn>
          <TEXT.BoldStandardBody color={'#FFF'} alignSelf={'stretch'} mb={'8px'}>TOS</TEXT.BoldStandardBody>
          <TEXT.BoldSmallBody lineHeight={1.5} m={'auto'}>
            Perpetuals are not available to anyone residents of, or are located, incorporated, or having a registered agent in, the United States or a
            restricted territory as defined in Overlay's <StyledLink onClick={() => openLinkInNewTab('https://overlay.market/#/tos')}>Terms of Service</StyledLink> (the "TOS").
            <br />
            <br />
          </TEXT.BoldSmallBody>
          <TEXT.BoldStandardBody color={'#FFF'} alignSelf={'stretch'} mb={'8px'}>Cookies Settings</TEXT.BoldStandardBody>
          <TEXT.BoldSmallBody lineHeight={1.5} m={'auto'}>
          Cookies are used to improve the user experience and to analyze user behavior in order to improve the experience for you. <StyledLink onClick={() => openLinkInNewTab('https://overlay.market/#/tos')}>Privacy Policy</StyledLink>
          </TEXT.BoldSmallBody>
            <br />
            <FormControl>
              <RadioGroup
                row
                value={value}
                onChange={handleChange}
                defaultValue="All"
                id="toggleCookiesButton"
              >
                <StyledFormControlLabel value="All" control={<CustomRadio />} label="Accept all cookies" />
                <StyledFormControlLabel value="Necessary" control={<CustomRadio />} label="Necessary cookies only" />
              </RadioGroup>
            </FormControl>
            <br />
          <TEXT.BoldSmallBody lineHeight={1.5} m={'auto'} mb={'8px'}>
            By accepting, you accept the cookies setting and the TOS.
          </TEXT.BoldSmallBody>
        </FlexColumn>
        <FlexRow m={'16px auto 8px'}>
          <UserAcceptButton onClick={acceptTermsOfService}>Accept</UserAcceptButton>
          <UserDeclineButton onClick={declineTermsOfService}>Decline</UserDeclineButton>
        </FlexRow>
      </ModalContent>
    </Modal>
  )
}
function gaOptout() {
  var gaProperty = 'G-QJR084KXFT';
  var disableStr = 'ga-disable-' + gaProperty;
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  // @ts-ignore
  window[disableStr] = true;
}
