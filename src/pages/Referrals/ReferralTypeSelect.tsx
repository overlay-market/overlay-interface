import styled from 'styled-components/macro'
import {TEXT} from '../../theme/theme'

const ReferralTypeSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px 0;
  background: #474747;
  border-radius: 8px;

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
  border-radius: 8px;
  padding: 14px 0;
  cursor: pointer;
  background: ${props => (props.active ? '#71CEFF' : '')};

  div {
    color: ${props => (props.active ? '#202431' : '')};
  }
`

interface ReferralTypeSelectProps {
  value: string
  onSelect: (input: string) => void
}

export const ReferralTypeSelect = ({value, onSelect}: ReferralTypeSelectProps) => {
  return (
    <ReferralTypeSelectContainer>
      <ReferralType active={value === 'traders'} onClick={() => onSelect('traders')}>
        <TEXT.BoldSmallBody>Traders</TEXT.BoldSmallBody>
      </ReferralType>
      <ReferralType active={value === 'affiliates'} onClick={() => onSelect('affiliates')}>
        <TEXT.BoldSmallBody>Affiliates</TEXT.BoldSmallBody>
      </ReferralType>
    </ReferralTypeSelectContainer>
  )
}
