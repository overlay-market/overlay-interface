import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useCallback, useEffect, useMemo, useState} from 'react'
import useAxios from 'axios-hooks'
import {SEPOLIA_FAUCET_API} from '../../constants/claims'
import {SelectActionButton} from '../../components/Button/Button'
import Loader from '../../components/Loaders/Loaders'
import {useActiveWeb3React} from '../../hooks/web3'
import {useWalletModalToggle} from '../../state/application/hooks'

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

const SepoliaFaucet = () => {
  const {account} = useActiveWeb3React()

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
      try {
        await getResponseData({
          data: JSON.stringify({
            token: 'eth',
            recipient: account,
          }),
        })
      } catch (error: unknown) {
        console.log(error)
      }
    }
    console.log('claim')
  }

  const txHash = useMemo<string>(() => {
    if (responseData) {
      return responseData.txHash
    }
  }, [responseData])

  const toggleWalletModal = useWalletModalToggle()
  console.log(txHash)
  console.log(error)
  return (
    <PageWrapper>
      <TitleSection>
        <BoldHeader1>Sepolia Claiming Faucet </BoldHeader1>
      </TitleSection>

      <TEXT.StandardBody color={colors(true).dark.blue1}>Captcha section</TEXT.StandardBody>

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
            isDisabled={false}
            disabled={false}
            onClick={() => {
              account ? claimHandle() : toggleWalletModal()
            }}
          >
            Claim
          </CheckAddressesButton>
        )}
      </ButtonsContainer>

      <TEXT.StandardBody color={colors(true).dark.blue1}>Message that appears after claiming</TEXT.StandardBody>
    </PageWrapper>
  )
}

export default SepoliaFaucet
