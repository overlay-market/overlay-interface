import AddressCheckSection from './AddressCheckSection'
import EligibilitySection from './EligibilitySection'
import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useState} from 'react'

const PageWrapper = styled.div`
  max-width: 1232px;
  box-sizing: border-box;
  margin: 0 auto 48px;
  padding: 16px 8px;
  ${({theme}) => theme.mediaWidth.minSmall`
    padding: 16px 24px;
  `};
  ${({theme}) => theme.mediaWidth.minMedium`
    padding: 16px 40px;
  `};
  ${({theme}) => theme.mediaWidth.minLarge`
    padding: 16px 0px;
  `};
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 32px;
  ${({theme}) => theme.mediaWidth.minSmall`
    margin: 0 auto;
    width: fit-content;
    align-items: center;
  `}
  ${({theme}) => theme.mediaWidth.minMedium`
    gap: 16px;  
    margin: 0;
    width: auto;
    align-items: flex-start;
  `}
`

const BoldHeader1 = styled(TEXT.BoldHeader1)`
  color: ${colors(true).dark.white} !important;

  ${({theme}) => theme.mediaWidth.minMedium`
    font-size: 24px !important;
    color: ${colors(false).dark.white} !important;    
  `}
`

const ClaimChecker = () => {
  const [addresses, setAddresses] = useState<string>('')
  console.log(addresses, '------')
  const addressList = addresses && addresses.split('\n')

  console.log(addressList, addressList.length)

  return (
    <PageWrapper>
      <TitleSection>
        <BoldHeader1>Airdrop Checker</BoldHeader1>
        <TEXT.SmallBody color={colors(true).dark.blue1}>Check eligibility for different airdrops</TEXT.SmallBody>
      </TitleSection>

      <AddressCheckSection addresses={addresses} setAddresses={setAddresses} />

      <EligibilitySection />
    </PageWrapper>
  )
}

export default ClaimChecker
