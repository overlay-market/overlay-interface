import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useActiveWeb3React} from '../../hooks/web3'
import {MEDIA_WIDTHS, TEXT} from '../../theme/theme'
import {ReferralTypeSelect} from './ReferralTypeSelect'
import {useHistory, useLocation} from 'react-router-dom'
import Dashboard from './Dashboard'
import Affiliates from './Affiliates'

export const REFERRAL_TYPES = {
  DASHBOARD: 'dashboard',
  AFFILIATES: 'affiliates',
}

const ReferralsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: ${MEDIA_WIDTHS.minMedium}px;
  margin-top: 64px;
  color: white;
  padding: 0 16px 48px 16px;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    padding: 0;
  `}
`

const FixedWidthContainer = styled.div`
  width: 100%;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    width: 400px;
  `}
`

const Referrals = () => {
  const location = useLocation()
  const history = useHistory()
  const [type, setType] = useState<string>(REFERRAL_TYPES.DASHBOARD)
  const {account} = useActiveWeb3React()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const tab = queryParams.get('tab')
    if (tab === REFERRAL_TYPES.AFFILIATES || tab === REFERRAL_TYPES.DASHBOARD) {
      setType(tab)
    }
  }, [location, account])

  return (
    <ReferralsContainer>
      <TEXT.BoldHeader1>Referrals</TEXT.BoldHeader1>
      <FixedWidthContainer>
        <ReferralTypeSelect
          value={type}
          onSelect={(value: string) => {
            setType(value)
            history.replace({
              search: `?tab=${value}`,
            })
          }}
        />
      </FixedWidthContainer>
      {type === REFERRAL_TYPES.DASHBOARD && <Dashboard />}
      {type === REFERRAL_TYPES.AFFILIATES && <Affiliates />}
    </ReferralsContainer>
  )
}

export default Referrals
