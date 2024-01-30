import {useEffect, useState} from 'react'
import Modal from '../../components/Modal/Modal'
import Box from '@material-ui/core/Box'
import {TEXT, colors} from '../../theme/theme'
import styled from 'styled-components'

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

function ReferralModal() {
  const [modalOpen, setModalOpen] = useState(false)

  const handleCloseModal = () => {
    setModalOpen(false)
    // Additional logic to handle closing the modal
    // For example: dispatch an action or update state
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <>
      <Box display={'flex'} flexDirection={'row'}>
        <TEXT.BoldHeader1 mb="16px">Referral</TEXT.BoldHeader1>
        <TEXT.SmallBody width={'auto'} ml={'auto'} mt={'5px'}>
          <a onClick={handleOpenModal} style={{color: colors(false).dark.blue2, cursor: 'pointer'}}>
            Enter a referral code &rarr;
          </a>
        </TEXT.SmallBody>
      </Box>

      {modalOpen && (
        <Modal isOpen={modalOpen} onDismiss={handleCloseModal} width={'30vw'}>
          <ModalContent>
            <TEXT.BoldHeader1 color={'#FFF'} alignSelf={'stretch'} mb={'8px'}>
              How Referral Rewards Work
            </TEXT.BoldHeader1>
            <p style={{color: 'white'}}>
              Referrers earn 10% of referred users’ fees, and referred users receive a 4% fee discount. Referral earnings will have a cap per referred
              user.
            </p>
            <p style={{color: 'white'}}>
              If you have referred $10M in 30d volume or have 5,000+ social media followers, you can apply for the Ambassador program.
            </p>
            <TEXT.SmallBody width={'auto'} mt={'5px'}>
              <a style={{color: colors(false).dark.blue2}}>Apply for the Ambassador program.</a>
            </TEXT.SmallBody>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default ReferralModal
