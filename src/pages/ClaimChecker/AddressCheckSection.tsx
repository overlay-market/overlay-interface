import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

function AddressCheckSection() {
  return (
    <>
      <TitleContainer>
        <TEXT.BoldStandardBody color={colors(false).dark.white}>Enter addresses</TEXT.BoldStandardBody>
        <TEXT.SmallBody color={colors(true).dark.blue1}>Enter addresses to check eligibility. One address per line.</TEXT.SmallBody>
      </TitleContainer>
    </>
  )
}

export default AddressCheckSection
