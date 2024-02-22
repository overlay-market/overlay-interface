import {X} from 'react-feather'
import Modal from '../../components/Modal/Modal'
import {TEXT} from '../../theme/theme'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {ModalContent, WalletHeader, CloseIcon} from '../../components/ConnectWalletModal/ConnectWalletModal'
import {Box} from '@material-ui/core'
import {TriggerActionButton} from '../../components/Button/Button'
import {useActiveWeb3React} from '../../hooks/web3'
import {useReferralAccountData} from '../../state/referral/hooks'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {REFERRAL_AFFILIATE_SIGNATURES} from '../../constants/applications'

export default function ConfirmAffiliateModal({isOpen, onConfirm, onDismiss}: {isOpen: boolean; onConfirm?: () => void; onDismiss?: () => void}) {
  const {account} = useActiveWeb3React()
  const {referralAccountData} = useReferralAccountData(account)
  const url = `${REFERRAL_AFFILIATE_SIGNATURES}/${account?.toLowerCase()}`

  const handleCreateAffiliate = () => {
    fetch(url, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log({data})
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <Modal onDismiss={() => null} width={'350px'} maxWidth="90%" isOpen={isOpen}>
      <ModalContent>
        <WalletHeader>
          <TEXT.StandardBody color={'white'} fontWeight={600} m={'auto 0'}>
            Confirm Transaction
          </TEXT.StandardBody>
          <CloseIcon onClick={onDismiss}>
            <X color={'white'} height={24} width={24} />
          </CloseIcon>
        </WalletHeader>
        <>
          <FlexColumn mt={'24px'} mr={'auto'} width={'auto'} align={'start'}>
            <TEXT.StandardBody color={'#B9BABD'} fontWeight={400}>
              Affiliate program
            </TEXT.StandardBody>

            <TEXT.BoldHeader1 color={'white'} mt={'4px'}>
              Confirm Transaction to become an Affilliate
            </TEXT.BoldHeader1>
          </FlexColumn>

          <Box mt={'32px'}>
            <FlexColumn color={'white'}>
              <FlexRow m={'2px 0'}>
                <TEXT.StandardBody mr={'auto'} color={'#B9BABD'}>
                  Rewards
                </TEXT.StandardBody>
                <TEXT.StandardBody>{formatBigNumber(referralAccountData?.account?.referralPositions[0].totalRewardsPending) + '%'}</TEXT.StandardBody>
              </FlexRow>
            </FlexColumn>

            <FlexColumn color={'white'}>
              <FlexRow m={'2px 0'}>
                <TEXT.StandardBody mr={'auto'} color={'#B9BABD'}>
                  Discount on trading fees
                </TEXT.StandardBody>
                <TEXT.StandardBody>{formatBigNumber(referralAccountData?.account?.referralPositions[0].totalTraderDiscount) + '%'}</TEXT.StandardBody>
              </FlexRow>
            </FlexColumn>

            <FlexColumn color={'white'}>
              <FlexRow m={'2px 0'}>
                <TEXT.StandardBody mr={'auto'} color={'#B9BABD'}>
                  Cap per user
                </TEXT.StandardBody>
                <TEXT.StandardBody>OVL</TEXT.StandardBody>
              </FlexRow>
            </FlexColumn>
          </Box>

          <TEXT.StandardBody mt={'32px'} color={'#B9BABD'}>
            You will need to sign transaction to become an affiliate.
          </TEXT.StandardBody>

          <TriggerActionButton mt={'32px'} onClick={handleCreateAffiliate} active={true}>
            Create code
          </TriggerActionButton>
        </>
      </ModalContent>
    </Modal>
  )
}
