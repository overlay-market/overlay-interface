import {useMemo} from 'react'
import {useActiveWeb3React} from './web3'
import {useTransactionAdder} from '../state/transactions/hooks'
import {useAddPopup} from '../state/application/hooks'
import {currentTimeParsed} from '../utils/currentTime'
import {REFERRAL_API} from '../constants/applications'
import {shortenAddress} from '../utils/web3'

enum ReferralSignatureState {
  INVALID,
  LOADING,
  VALID,
}

const errorTransformationMap: { [key: string]: string } = {
  "You've already chosen your referral": 'Wallet already signed up'
};

// Helper function to extract error message
function getErrorMessage(error: unknown, toaster: boolean = false): string {
  let errorMessage = error instanceof Error ? error.message : String(error);
  
  return toaster ? errorTransformationMap[errorMessage] || errorMessage : errorMessage;
}

export function useReferralSignature(affiliateAddress: string): {
  state: ReferralSignatureState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const {account, chainId, library} = useActiveWeb3React()
  console.log({affiliateAddress})
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()

  return useMemo(() => {
    if (!affiliateAddress || !library || !account || !chainId) {
      console.log('çinvalid1')
      return {
        state: ReferralSignatureState.INVALID,
        callback: null,
        error: 'Missing Dependencies',
      }
    }

    return {
      state: ReferralSignatureState.VALID,
      callback: async function onReferralSignature(): Promise<string> {
        try {
          let validationResponse = await fetch(`${REFERRAL_API}/affiliates/${affiliateAddress}`)
          if (!validationResponse.ok) {
            throw new Error('Failed to validate affiliate address')
          }

          let validationData = await validationResponse.json()
          if (!validationData.isValid) {
            throw new Error('Invalid affiliate address')
          }

          validationResponse = await fetch(`${REFERRAL_API}/signatures/check/${account}`)
          if (!validationResponse.ok) {
            throw new Error("Failed to validate trader's signature")
          }

          validationData = await validationResponse.json()
          if (validationData.exists) {
            throw new Error("You've already chosen your referral")
          }

          const domain = {
            name: 'Overlay Referrals',
            version: '1.0',
          }

          const types = {
            AffiliateTo: [{name: 'affiliate', type: 'address'}],
          }

          // const primaryType = 'AffiliateTo'

          const message = {
            affiliate: affiliateAddress,
          }

          const signer = library.getSigner()
          const signature = await signer._signTypedData(domain, types, message)
          console.log({signature})

          try {
            const response = await fetch(`${REFERRAL_API}/signatures`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                trader: account,
                affiliate: affiliateAddress,
                signature: signature,
              }),
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.message || 'Failed to store signature')
            }
          } catch (apiError) {
            console.error('API error:', apiError)
            const errorMessage = getErrorMessage(apiError)
            throw new Error(`Failed to store referral signature: ${errorMessage}`)
          }

          addPopup(
            {
              info: {
                success: true,
                summary: `Successfully signed referral for ${shortenAddress(affiliateAddress)}`,
              },
            },
            currentTimeForId,
          )

          return signature
        } catch (error: unknown) {
          console.error(`Referral signature failed`, error)

          const errorMessage = getErrorMessage(error)

          if (typeof error === 'object' && error !== null && 'code' in error) {
            const errorWithCode = error as {code: unknown}
            if (errorWithCode.code === 4001 || errorWithCode.code === 'ACTION_REJECTED') {
              addPopup(
                {
                  info: {
                    success: false,
                    summary: 'User rejected the signature request',
                  },
                },
                currentTimeForId,
              )
              throw new Error('Signature rejected.')
            }
          }

          addPopup(
            {
              info: {
                success: false,
                summary: `${getErrorMessage(error, true)}`,
              },
            },
            currentTimeForId,
          )
          throw new Error(errorMessage)
        }
      },
      error: null,
    }
  }, [affiliateAddress, library, account, chainId, addPopup, currentTimeForId])
}
