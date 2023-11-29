import styled from 'styled-components/macro'
import {TEXT} from '../../theme/theme'
import {REFERRAL_TYPES} from './Referrals'

const ReferralTypeSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px 0;
  background: #474747;
  border-radius: 24px;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    margin: 16px;
  `}
`
interface ReferralTypeProps {
  active?: boolean
}

const ReferralType = styled.div<ReferralTypeProps>`
  display: flex;
  justify-content: center;
  flex: 1;
  border-radius: 24px;
  padding: 14px 0;
  cursor: pointer;
  background: ${props => (props.active ? props.theme.dark.blue2 : '')};

  div {
    color: ${props => (props.active ? props.theme.dark.background : '')};
  }
`

interface ReferralTypeSelectProps {
  value: string
  onSelect: (input: string) => void
}

export const ReferralTypeSelect = ({value, onSelect}: ReferralTypeSelectProps) => {
  return (
    <ReferralTypeSelectContainer>
      <ReferralType active={value === REFERRAL_TYPES.DASHBOARD} onClick={() => onSelect(REFERRAL_TYPES.DASHBOARD)}>
        <TEXT.BoldSmallBody>Dashboard</TEXT.BoldSmallBody>
      </ReferralType>
      <ReferralType active={value === REFERRAL_TYPES.AFFILIATES} onClick={() => onSelect(REFERRAL_TYPES.AFFILIATES)}>
        <TEXT.BoldSmallBody>Affiliates</TEXT.BoldSmallBody>
      </ReferralType>
    </ReferralTypeSelectContainer>
  )
}
