import {useMemo} from 'react'
import {BigNumber} from '@ethersproject/bignumber'
import {useActiveWeb3React} from './web3'
import {TransactionType} from './../state/transactions/actions'
import {TransactionResponse} from '@ethersproject/providers'
import {useTransactionAdder} from '../state/transactions/hooks'
import {useReferralListContract} from './useContract'
import {calculateGasMargin} from '../utils/calculateGasMargin'
import {useAddPopup} from '../state/application/hooks'
import {currentTimeParsed} from '../utils/currentTime'
import isZero from '../utils/isZero'
import {REFERRAL_LIST_ADDRESS} from '../constants/addresses'

interface ReferralCreateAffiliateCall {
  address: string
  calldata: string
  value: string
}

interface ReferralCreateAffiliateCallEstimate {
  call: ReferralCreateAffiliateCall
}

interface SuccessfulCall extends ReferralCreateAffiliateCallEstimate {
  call: ReferralCreateAffiliateCall
  gasEstimate: BigNumber
}

interface FailedCall extends ReferralCreateAffiliateCallEstimate {
  call: ReferralCreateAffiliateCall
  error: Error
}

enum ReferralCreateAffiliateCallbackState {
  INVALID,
  LOADING,
  VALID,
}

function useReferralCreateAffiliateCallArguments(signature: string) {
  let calldata: any

  const {account, chainId} = useActiveWeb3React()

  const referralListAddress = useMemo(() => {
    return chainId ? REFERRAL_LIST_ADDRESS[chainId] : ''
  }, [chainId])
  const referralListContract = useReferralListContract(referralListAddress)

  if (!signature || !referralListContract || referralListAddress === '') calldata = undefined
  else {
    try {
      calldata = referralListContract.interface.encodeFunctionData('allowAffiliate', [signature])
    } catch (e) {
      console.log({errorOnArgs: e})
      calldata = undefined
    }
  }

  return useMemo(() => {
    if (!signature || !referralListContract || referralListAddress === '' || !chainId || !account || !referralListContract || !calldata) return []

    const txn: {address: string; calldata: string; value: string} = {
      address: referralListAddress,
      calldata: calldata,
      value: '0x0',
    }

    return [
      {
        address: txn.address,
        calldata: calldata,
        value: txn.value,
      },
    ]
  }, [calldata, referralListAddress, chainId, account, signature, referralListContract])
}

export function useReferralCreateAffiliateCallback(signature: string): {
  state: ReferralCreateAffiliateCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const {account, chainId, library} = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()
  const referralcreateaffiliateCalls = useReferralCreateAffiliateCallArguments(signature)

  return useMemo(() => {
    if (!signature || !library || !account || !chainId || referralcreateaffiliateCalls.length === 0) {
      return {
        state: ReferralCreateAffiliateCallbackState.INVALID,
        callback: null,
        error: 'Missing Dependencies',
      }
    }

    return {
      state: ReferralCreateAffiliateCallbackState.VALID,
      callback: async function onReferralCreateAffiliate(): Promise<string> {
        const estimatedCalls: ReferralCreateAffiliateCallEstimate[] = await Promise.all(
          referralcreateaffiliateCalls.map(call => {
            const {address, calldata, value} = call

            const tx = {
              from: account,
              to: address,
              data: calldata,
              value: value,
            }

            return library
              .estimateGas(tx)
              .then(gasEstimate => {
                return {call, gasEstimate}
              })
              .catch(gasError => {
                console.debug('Gas estimate failed, trying eth_call to extract error', call)

                console.log('gasError: ', gasError)

                return library
                  .call(tx)
                  .then(result => {
                    console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)

                    const error = 'Unexpected issue with estimating the gas. Please try again.'

                    console.log('gasError from call: ', gasError)
                    return {
                      error: new Error(error),
                      call,
                    }
                  })
                  .catch(callError => {
                    console.log('callError: ', callError)

                    const errorDetails = callError.error || callError.data

                    addPopup(
                      {
                        txn: {
                          hash: currentTimeForId,
                          success: false,
                          info: errorDetails,
                        },
                      },
                      currentTimeForId,
                    )

                    console.debug('Call threw error', call, callError)

                    return {call, error: new Error(callError)}
                  })
              })
          }),
        )

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let bestCallOption: SuccessfulCall | ReferralCreateAffiliateCallEstimate | undefined = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        )

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)

          if (errorCalls.length > 0) throw new Error('ERROR ' + errorCalls[errorCalls.length - 1].error)
          const firstNoErrorCall = estimatedCalls.find<ReferralCreateAffiliateCallEstimate>(
            (call): call is ReferralCreateAffiliateCallEstimate => !('error' in call),
          )
          if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for the referralcreateaffiliate.')
          bestCallOption = firstNoErrorCall
        }

        const {
          call: {address, calldata, value},
        } = bestCallOption

        console.log('bestCallOption: ', bestCallOption)

        return library
          .getSigner()
          .sendTransaction({
            from: account,
            to: address,
            data: calldata,
            // let the wallet try if we can't estimate the gas
            ...('gasEstimate' in bestCallOption ? {gasLimit: calculateGasMargin(bestCallOption.gasEstimate)} : {}),
            ...(value && !isZero(value) ? {value} : {}),
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              type: TransactionType.REFERRAL_CREATE_AFFILIATE,
              referralCreateAffiliate: signature,
            })

            return response.hash
          })
          .catch(error => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001 || error?.code === 'ACTION_REJECTED') {
              addPopup(
                {
                  txn: {
                    hash: currentTimeForId,
                    success: false,
                    info: error,
                  },
                },
                currentTimeForId,
              )
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`ReferralCreateAffiliate failed`, error, address, calldata, value)

              throw new Error(`ReferralCreateAffiliate failed: ${error}`)
            }
          })
      },
      error: null,
    }
  }, [signature, library, account, chainId, referralcreateaffiliateCalls, addTransaction, addPopup, currentTimeForId])
}
