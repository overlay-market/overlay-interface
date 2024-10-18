import {useMemo} from 'react'
import {useActiveWeb3React} from './web3'
import {useTransactionAdder} from '../state/transactions/hooks'
import {useAddPopup} from '../state/application/hooks'
import {currentTimeParsed} from '../utils/currentTime'
import {REFERRAL_LIST_ADDRESS} from '../constants/addresses'

enum ReferralSignatureState {
  INVALID,
  LOADING,
  VALID,
}

// Helper function to extract error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

export function useReferralSignature(affiliateAddress: string): {
  state: ReferralSignatureState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const {account, chainId, library} = useActiveWeb3React()
  console.log({affiliateAddress})
  const addTransaction = useTransactionAdder()
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

          addPopup(
            {
              txn: {
                hash: currentTimeForId,
                success: true,
                summary: `Successfully signed referral for ${affiliateAddress}`,
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
                  txn: {
                    hash: currentTimeForId,
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
              txn: {
                hash: currentTimeForId,
                success: false,
                summary: `Failed to sign referral: ${errorMessage}`,
              },
            },
            currentTimeForId,
          )
          throw new Error(`Referral signature failed: ${errorMessage}`)
        }
      },
      error: null,
    }
  }, [affiliateAddress, library, account, chainId, addPopup, currentTimeForId])
}
