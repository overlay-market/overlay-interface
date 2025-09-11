import {useEffect, useState} from 'react'
import Modal from '../../components/Modal/Modal'
import Box from '@material-ui/core/Box'
import {TEXT, colors} from '../../theme/theme'
import styled from 'styled-components'
import {X} from 'react-feather'
import React from 'react'

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  width: 100%;
  background: #0b0f1c;
  @media (max-width: 768px) {
    padding: 32px 16px;
  }
  position: relative;
`
const CloseIcon = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
interface ReferralModalProps {
  tier: string
}

function ReferralModal({tier}: ReferralModalProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <>
      <Box display={'flex'} flexDirection={'row'}>
        {tier === 'ambassador' && (
          <TEXT.SmallBody mb="32px">
            Refer users to earn rewards. Ambassadors earn greater rewards.{' '}
            <a onClick={handleOpenModal} style={{color: colors(false).dark.blue2, cursor: 'pointer'}}>
              How does it work
            </a>
          </TEXT.SmallBody>
        )}
        {tier === 'affiliate' && (
          <TEXT.StandardBody>
            Need more info?{' '}
            <a onClick={handleOpenModal} style={{color: colors(false).dark.blue2, cursor: 'pointer'}}>
              Overlay Referral Program &rarr;{' '}
            </a>
          </TEXT.StandardBody>
        )}
      </Box>

      {modalOpen && (
        <Modal isOpen={modalOpen} onDismiss={handleCloseModal} width={'30vw'}>
          <ModalContent>
            <CloseIcon onClick={handleCloseModal}>
              <X color={'white'} height={24} width={24} />
            </CloseIcon>
            <TEXT.BoldHeader1>How Referral Rewards Work</TEXT.BoldHeader1>
            <p style={{color: 'white'}}>
              Referrers earn 10% of referred users’ fees, and referred users receive a 4% fee discount. Referral earnings will have a cap per referred
              user.
            </p>
            <p style={{color: 'white'}}>
              If you have over $10M volume on Overlay in 30d or have 5000+ social media followers, you can apply for the Ambassador Program.
            </p>
            <TEXT.SmallBody width={'auto'} mt={'5px'}>
              <a style={{color: colors(false).dark.blue2, cursor: 'pointer'}} target="blank" href="https://forms.gle/tAJQ7XUN43kp6smP7">
                Apply for the Ambassador program. &rarr;
              </a>
            </TEXT.SmallBody>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default ReferralModal
