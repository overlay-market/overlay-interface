import {useState, useMemo, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import {FlexRow, FlexColumn} from '../../components/Container/Container'
import {shortenAddress} from '../../utils/web3'
import {ExternalLink} from '../../components/ExternalLink/ExternalLink'
import {TriggerActionButton} from '../../components/Button/Button'
import {useWalletModalToggle} from '../../state/application/hooks'
import {formatWeiToParsedNumber} from '../../utils/formatWei'
import {RouteComponentProps} from 'react-router-dom'
import {SupportedChainId} from '../../constants/chains'
import {useClaimMerkletreeCallBack} from '../../hooks/useClaimMerkleTreeCallback'
import {useClaimMerkleTreeContract} from '../../hooks/useContract'
import {useSingleCallResult} from '../../state/multicall/hooks'
import {useHasClaimedMerkletree} from '../../hooks/useHasClaimedMerkletree'
import axios, {Method} from 'axios'
import {ClaimId, MERKLE_DISTIBUTOR_ADDRESSES} from '../../constants/claims'
// import {fetchDataFromAPI, fetchDataFromMongoDB} from './ClaimData'

const BridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  margin-top: 64px;
  color: white;
`

const ClaimModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #1b2131;
  border: 1px solid #71ceff;
  box-shadow: 0 0 12px #5b60a4;
  border-radius: 8px;
`

const Claim = ({
  match: {
    params: {claimId},
  },
}: RouteComponentProps<{claimId: string}>) => {
  const {account, chainId} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const merkleTreeContractAddress = MERKLE_DISTIBUTOR_ADDRESSES[claimId]
  const userHasClaimed = useHasClaimedMerkletree(merkleTreeContractAddress, account)
  const [userClaimData, setUserClaimData] = useState<any>()
  // const hasClaimed = useSingleCallResult(claimMerkletreeContract, 'hasClaimed', [account])
  // console.log('claimMerkletreeContract', claimMerkletreeContract, account)

  const [isFullyClaimed, setIsFullyClaimed] = useState<boolean>(false)
  const [fetchingData, setFetchingData] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true)
      if (!account) return
      try {
        const response = await fetch(`https://sa-east-1.aws.data.mongodb-api.com/app/data-foyef/endpoint/getUser?wallet=${account}`)

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setUserClaimData(data.result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setFetchingData(false)
    }

    fetchData()
  }, [account])

  const userClaimAmount = userClaimData?.tokenAmount && formatWeiToParsedNumber(userClaimData.tokenAmount, 18, 0)

  // monitor the status of the claim from contracts and txns
  const {
    state: useClaimCallbackState,
    callback: claimCallback,
    error: useClaimCallbackError,
  } = useClaimMerkletreeCallBack(merkleTreeContractAddress, account, userClaimData?.tokenAmount, userClaimData?.proof, undefined)

  // used for UI loading states
  const [, setAttempting] = useState<boolean>(false)

  // wrap in useMemo hook to account for changes in claimId
  const handleClaim = useCallback(() => {
    if (!merkleTreeContractAddress || !claimCallback || useClaimCallbackError || !useClaimCallbackState) return
    setAttempting(true)
    claimCallback()
      // reset modal and log error
      .catch(error => {
        setAttempting(false)
        console.error(error)

        let errorMessage = error.error.message
        if (errorMessage === 'execution reverted: ERC20: transfer amount exceeds balance') {
          setIsFullyClaimed(true)
        }
      })
  }, [claimCallback, merkleTreeContractAddress, useClaimCallbackError, useClaimCallbackState])

  const ClaimButton = useMemo(() => {
    return isFullyClaimed ? (
      <TriggerActionButton isDisabled={true} onClick={() => null}>
        Tokens fully claimed
      </TriggerActionButton>
    ) : (
      <TriggerActionButton active={true} onClick={handleClaim}>
        Claim OVL
      </TriggerActionButton>
    )
  }, [isFullyClaimed, handleClaim])

  const isWrongNetwork = useMemo(() => {
    if (!chainId) return true
    return chainId !== Number(SupportedChainId.ARBITRUM_SEPOLIA)
  }, [chainId])

  return useMemo(() => {
    if (isWrongNetwork) {
      return (
        <BridgeContainer>
          <ClaimModalContainer>
            <FlexColumn padding="16px">
              <FlexRow marginBottom="8px">
                <TEXT.SmallBody marginRight="16px">Claim OVL</TEXT.SmallBody>
                <TEXT.SmallBody>{account ? shortenAddress(account) : 'Not connected'}</TEXT.SmallBody>
              </FlexRow>
            </FlexColumn>
            <FlexColumn padding="16px 16px 32px">
              <TEXT.SmallBody marginRight="auto">Wrong network, switch to Arbitrum-One</TEXT.SmallBody>
            </FlexColumn>
          </ClaimModalContainer>
        </BridgeContainer>
      )
    }
    return (
      !fetchingData && (
        <BridgeContainer>
          <>
            {!account && (
              <ClaimModalContainer>
                <FlexColumn padding="16px">
                  <TEXT.SmallBody marginRight="auto" marginBottom="16px">
                    Claim OVL
                  </TEXT.SmallBody>
                  <TEXT.StandardBody marginBottom="16px">Connect your wallet to see if you have any claimable OVL.</TEXT.StandardBody>
                  <TriggerActionButton onClick={toggleWalletModal} active={true}>
                    Connect Wallet
                  </TriggerActionButton>
                </FlexColumn>
              </ClaimModalContainer>
            )}

            {account && !userClaimData && userHasClaimed === undefined && (
              <ClaimModalContainer>
                <FlexColumn padding="16px">
                  <TEXT.SmallBody marginRight="auto" marginBottom="18px">
                    Claim OVL
                  </TEXT.SmallBody>
                  <TEXT.StandardBody marginRight="auto" marginBottom="16px" color="#FF648A">
                    This wallet does not have any OVL to claim.
                  </TEXT.StandardBody>
                  <TEXT.StandardBody marginBottom="32px" color="#FF648A">
                    Please check another address by connecting another wallet.
                  </TEXT.StandardBody>
                </FlexColumn>
              </ClaimModalContainer>
            )}

            {account && userClaimData && userHasClaimed === true && (
              <ClaimModalContainer>
                <FlexColumn padding="16px">
                  <TEXT.SmallBody marginRight="auto" marginBottom="18px">
                    Claim OVL
                  </TEXT.SmallBody>
                  <TEXT.StandardBody marginRight="auto" marginBottom="16px" color="#FF648A">
                    This wallet does not have any OVL to claim.
                  </TEXT.StandardBody>
                  <TEXT.StandardBody marginBottom="32px" color="#FF648A">
                    You have already claimed
                  </TEXT.StandardBody>
                </FlexColumn>
              </ClaimModalContainer>
            )}

            {account && userClaimAmount && !userHasClaimed && userHasClaimed !== undefined && (
              <ClaimModalContainer>
                <FlexColumn padding="16px" borderBottom="1px solid #71CEFF">
                  <FlexRow marginBottom="8px">
                    <TEXT.SmallBody marginRight="16px">Claim OVL</TEXT.SmallBody>
                    <TEXT.SmallBody>{account ? shortenAddress(account) : 'Not connected'}</TEXT.SmallBody>
                  </FlexRow>
                  <TEXT.AdjustableSize fontSize="34px" marginRight="auto">
                    Already Claimed
                  </TEXT.AdjustableSize>
                </FlexColumn>
                <FlexColumn padding="16px">
                  <TEXT.SmallBody>
                    As a member of the Overlay community, you may claim OVL to be used for voting and governance, and to interact with the Overlay
                    protocol.
                  </TEXT.SmallBody>
                  <ExternalLink
                    href="https://docs.overlay.market/"
                    style={{
                      color: '#71CEFF',
                      textDecoration: 'underline',
                      fontSize: '14px',
                      margin: '16px auto 16px 0',
                    }}
                  >
                    Read more about OVL
                  </ExternalLink>
                  <TriggerActionButton isDisabled={true}>Claim OVL</TriggerActionButton>
                </FlexColumn>
              </ClaimModalContainer>
            )}
          </>
        </BridgeContainer>
      )
    )
  }, [account, isWrongNetwork, userClaimAmount, userClaimData, userHasClaimed, ClaimButton, toggleWalletModal])
}

export default Claim
