import {RouteComponentProps} from 'react-router-dom'
import styled from 'styled-components'
import {InterfaceWrapper} from '../../components/Container/Container'
import {TraderPage} from './TraderPage'

const CustomInterfaceWrapper = styled(InterfaceWrapper)`
  max-width: unset;
  align-items: center;
`
export function Referral({
  match: {
    params: {urlReferralCode},
  },
}: RouteComponentProps<{urlReferralCode: string}>) {
  return (
    <CustomInterfaceWrapper>
      <TraderPage urlReferralCode={urlReferralCode} />
    </CustomInterfaceWrapper>
  )
}
