import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {TriggerActionButton} from '../../components/Button/Button'
import {Image} from 'rebass'
import BlueYellowHearts from '../../assets/images/blue_yellow_hearts.png'
import {switchNetworkToArbitrum} from '../../utils/switchNetworkToArbitrum'

const BgWrapper = styled.div`
  height: 100vh;
  width: 100wh;
  background: #161a27;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px 24px;
  width: 428px;
  box-sizing: border-box;
  background: #1b2131;
  border: 1px solid rgba(113, 206, 255, 0.5);
  box-shadow: 0 0 12px 6px rgba(91, 96, 164, 0.25);
  border-radius: 8px;
`

const SepoliaChecker = () => {
  return (
    <BgWrapper>
      <Container>
        <ModalContainer>
          <Image src={BlueYellowHearts} alt={'Overlay Logo'} height={'73px'} width={'auto'} />
          <TEXT.StandardHeader1 color={colors(true).dark.white}>OVL Testnet Trading Competition is on</TEXT.StandardHeader1>
          <TEXT.BoldHeader1 fontSize="26px" fontStyle={'italic'} color={colors(true).dark.white}>
            Bartio
          </TEXT.BoldHeader1>
          <TEXT.BoldStandardBody textAlign={'center'}>
            Please make sure you are on Bartio network to join the Testnet Trading Competition
          </TEXT.BoldStandardBody>
          <TriggerActionButton onClick={() => switchNetworkToArbitrum()} active={true}>
            Change
          </TriggerActionButton>
        </ModalContainer>
      </Container>
    </BgWrapper>
  )
}

export default SepoliaChecker
