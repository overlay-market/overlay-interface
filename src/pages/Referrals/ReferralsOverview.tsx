import styled from 'styled-components/macro'
import {TEXT} from '../../theme/theme'

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
  value?: string
  onSelect?: (input: string) => void
}

export const ReferralsOverview = ({value, onSelect}: ReferralTypeSelectProps) => {
  return (
    <ReferralTypeSelectContainer>
      <ReferralType active={value === 'dashboard'} onClick={() => (onSelect ? onSelect('dashboard') : null)}>
        <TEXT.BoldSmallBody>Dashboard</TEXT.BoldSmallBody>
      </ReferralType>
      <ReferralType active={value === 'affiliates'} onClick={() => (onSelect ? onSelect('affiliates') : null)}>
        <TEXT.BoldSmallBody>Affiliates</TEXT.BoldSmallBody>
      </ReferralType>
    </ReferralTypeSelectContainer>
  )
}
