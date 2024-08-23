import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useEffect, useMemo, useState} from 'react'
import useAxios from 'axios-hooks'
import {SEPOLIA_FAUCET_API} from '../../constants/claims'
import {SelectActionButton} from '../../components/Button/Button'
import Loader from '../../components/Loaders/Loaders'
import {useActiveWeb3React} from '../../hooks/web3'
import {useWalletModalToggle} from '../../state/application/hooks'
import ReCAPTCHA from 'react-google-recaptcha'
import {Link} from '@material-ui/core'
import {LINKS} from '../../constants/links'

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
  ${({theme}) => theme.mediaWidth.minMedium`
    gap: 16px;  
  `}
`

const BoldHeader1 = styled(TEXT.BoldHeader1)`
  color: ${colors(true).dark.white} !important;

  ${({theme}) => theme.mediaWidth.minMedium`
    font-size: 24px !important;
    color: ${colors(false).dark.white} !important;    
  `}
`

const ButtonsContainer = styled.div`
  display: flex;
  padding: 32px 0;

  ${({theme}) => theme.mediaWidth.minLarge`
    padding: 20px 0;
  `}
`

const CheckAddressesButton = styled(SelectActionButton)`
  color: ${colors(true).dark.white};
  background: #53b1f9;
  padding: 16px 36px;
  min-width: calc(100vw - (100vw - 100%));
  width: 100%;
  height: 54px;
  :hover {
    opacity: ${({isDisabled}) => (isDisabled ? '1 !important' : '0.9')};
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    min-width: 208px;
    width: 208px;
  `}
`

const CheckingButton = styled(CheckAddressesButton)`
  background: transparent;
  border: 1px solid #fff;

  ${({theme}) => theme.mediaWidth.minSmall`
    min-width: 263px;
    width: 263px;
  `}
`

const CheckingButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const Faucet = () => {
  const {account} = useActiveWeb3React()

  const [isDisabledClaimBtn, setIsDisabledClaimBtn] = useState(true)
  const [responseMessage, setResponseMessage] = useState('')
  const [selectedChain, setSelectedChain] = useState('arb-sepolia')

  const [{data: responseData, loading, error}, getResponseData] = useAxios(
    {
      url: SEPOLIA_FAUCET_API,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    {manual: true},
  )

  const claimHandle = async () => {
    if (account) {
      setResponseMessage('')
      try {
        await getResponseData({
          data: JSON.stringify({
            tokens: ['eth', 'ovl'],
            chains: [selectedChain],
            recipient: account,
          }),
        })
      } catch (error: unknown) {
        console.log(error)
      }
    }
  }

  const responseSuccess = useMemo<any>(() => {
    if (responseData) {
      return responseData
    }
  }, [responseData])

  const responseError = useMemo<any>(() => {
    if (error) {
      return error.response?.data
    }
  }, [error])

  useEffect(() => {
    if (responseSuccess) {
      if (responseSuccess.hasOwnProperty('eth') && responseSuccess.hasOwnProperty('ovl')) {
        if (responseSuccess.eth.status === 'success' && responseSuccess.ovl.status === 'success') {
          setResponseMessage(
            `Congrats on getting your 50 OVL and ${selectedChain === 'imola' ? 'MOVE' : 'ETH'}! Start trading & earn your points now!`,
          )
        }
        if (responseSuccess.eth.status === 'success' && responseSuccess.ovl.status === 'error') {
          setResponseMessage(`Congrats on getting your ${selectedChain === 'imola' ? 'MOVE' : 'ETH'}! Start trading & earn your points now!`)
        }
        if (responseSuccess.eth.status === 'error' && responseSuccess.ovl.status === 'success') {
          setResponseMessage('Congrats on getting your 50 OVL! Start trading & earn your points now!')
        }
        if (responseSuccess.eth.status === 'error' && responseSuccess.ovl.status === 'error') {
          setResponseMessage('An error occurred; please refresh and try again.')
        }
      }
    }

    if (responseError) {
      if (responseError.hasOwnProperty('message')) {
        if (typeof responseError.message === 'string') {
          if (responseError?.message.startsWith('recipient has already claimed token')) {
            setResponseMessage('Sorry, each wallet address may only claim free tokens once.')
          } else if (responseError?.message === 'recipient must have a non-zero arbitrum mainnet balance to claim tokens') {
            setResponseMessage('Sorry - the wallet must hold some ETH on Arbitrum Mainnet.')
          } else if (responseError?.message.startsWith('recipient must have a non-zero balance')) {
            setResponseMessage('Sorry - the wallet must hold some ETH on Arbitrum Mainnet or Ethereum Mainnet.')
          } else {
            setResponseMessage('An error occurred; please refresh and try again.')
          }
        } else {
          setResponseMessage('An error occurred; please refresh and try again.')
        }
      }
    }
  }, [responseSuccess, responseError])

  const toggleWalletModal = useWalletModalToggle()

  const onChangeCaptcha = () => {
    setIsDisabledClaimBtn(false)
  }

  const onExpiredCaptcha = () => {
    setIsDisabledClaimBtn(true)
  }

  return (
    <PageWrapper>
      <TitleSection>
        <BoldHeader1>Claiming Faucet </BoldHeader1>
      </TitleSection>

      <select
        value={selectedChain}
        onChange={e => setSelectedChain(e.target.value)}
        style={{
          marginBottom: '16px',
          padding: '8px',
          fontSize: '16px',
          borderRadius: '4px',
        }}
      >
        <option value="arb-sepolia">Arbitrum Sepolia</option>
        <option value="bartio">Berachain Testnet</option>
        <option value="imola">Movement Devnet</option>
      </select>

      <ReCAPTCHA sitekey={`${process.env.REACT_APP_RECAPTCHA_CLIENT_SITE_KEY}`} onChange={onChangeCaptcha} onExpired={onExpiredCaptcha} />
      <ButtonsContainer>
        {loading ? (
          <CheckingButton>
            <CheckingButtonContent>
              <span>Claiming</span>
              <Loader />
            </CheckingButtonContent>
          </CheckingButton>
        ) : (
          <CheckAddressesButton
            isDisabled={isDisabledClaimBtn}
            disabled={isDisabledClaimBtn}
            onClick={() => {
              account ? claimHandle() : toggleWalletModal()
            }}
          >
            Claim
          </CheckAddressesButton>
        )}
      </ButtonsContainer>

      <TEXT.StandardBody color={colors(true).dark.blue1} style={{marginBottom: '16px'}}>
        {responseMessage}
      </TEXT.StandardBody>
      {responseMessage && (
        <TEXT.BoldSmallBody color={colors(true).dark.blue1}>
          You can get extra 100 OVL and 0.0069 {selectedChain === 'imola' ? 'MOVE' : 'ETH'} on{' '}
          <Link key={'Discord'} target="_blank" href={LINKS.DISCORD} underline="none" style={{color: `${colors(true).dark.blue2}`}}>
            discord
          </Link>
          .
        </TEXT.BoldSmallBody>
      )}
    </PageWrapper>
  )
}

export default Faucet
