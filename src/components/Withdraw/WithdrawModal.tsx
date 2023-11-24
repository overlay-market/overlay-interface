import {useEffect, useState} from 'react'
import Modal from '../Modal/Modal'

function WithdrawModal() {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // Your logic to handle modal display using useEffect
    // For instance, open the modal after a certain delay
    const timeout = setTimeout(() => {
      setModalOpen(true)
    }, 2000) // Opens the modal after 2 seconds

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const handleCloseModal = () => {
    setModalOpen(false)
    // Additional logic to handle closing the modal
    // For example: dispatch an action or update state
  }

  return (
    <>
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onDismiss={function (): void {
            throw new Error('Function not implemented.')
          }}
        >
          <div className="withdraw-modal">
            <div className="withdraw-modal-content">
              <p style={{color: 'white'}}>This is the Withdraw Modal!</p>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </Modal>
      )}
      {/* Rest of your component */}
    </>
  )
}

export default WithdrawModal
