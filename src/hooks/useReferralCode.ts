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

interface ReferralCodeCall {
  address: string
  calldata: string
  value: string
}

interface ReferralCodeCallEstimate {
  call: ReferralCodeCall
}

interface SuccessfulCall extends ReferralCodeCallEstimate {
  call: ReferralCodeCall
  gasEstimate: BigNumber
}

interface FailedCall extends ReferralCodeCallEstimate {
  call: ReferralCodeCall
  error: Error
}

enum ReferralCodeCallbackState {
  INVALID,
  LOADING,
  VALID,
}

function useReferralCodeCallArguments(referralCode: string) {
  let calldata: any

  const {account, chainId} = useActiveWeb3React()

  const referralListAddress = useMemo(() => {
    return chainId ? REFERRAL_LIST_ADDRESS[chainId] : ''
  }, [chainId])
  const referralListContract = useReferralListContract(referralListAddress)

  if (!referralCode || !referralListContract || referralListAddress === '') calldata = undefined
  else {
    try {
      calldata = referralListContract.interface.encodeFunctionData('addAffiliateOrKOL', [referralCode])
    } catch (e) {
      calldata = undefined
    }
  }

  return useMemo(() => {
    if (!referralCode || !referralListContract || referralListAddress === '' || !chainId || !account || !referralListContract || !calldata) return []

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
  }, [calldata, referralListAddress, chainId, account, referralCode, referralListContract])
}

export function useReferralCodeCallback(referralCode: string): {
  state: ReferralCodeCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const {account, chainId, library} = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()
  const referralcodeCalls = useReferralCodeCallArguments(referralCode)

  return useMemo(() => {
    if (!referralCode || !library || !account || !chainId || referralcodeCalls.length === 0) {
      return {
        state: ReferralCodeCallbackState.INVALID,
        callback: null,
        error: 'Missing Dependencies',
      }
    }

    return {
      state: ReferralCodeCallbackState.VALID,
      callback: async function onReferralCode(): Promise<string> {
        const estimatedCalls: ReferralCodeCallEstimate[] = await Promise.all(
          referralcodeCalls.map(call => {
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
        let bestCallOption: SuccessfulCall | ReferralCodeCallEstimate | undefined = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        )

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)

          if (errorCalls.length > 0) throw new Error('ERROR ' + errorCalls[errorCalls.length - 1].error)
          const firstNoErrorCall = estimatedCalls.find<ReferralCodeCallEstimate>((call): call is ReferralCodeCallEstimate => !('error' in call))
          if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for the referralcode.')
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
              type: TransactionType.REFERRAL_CODE,
              referralCode: referralCode,
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
              console.error(`ReferralCode failed`, error, address, calldata, value)

              throw new Error(`ReferralCode failed: ${error}`)
            }
          })
      },
      error: null,
    }
  }, [referralCode, library, account, chainId, referralcodeCalls, addTransaction, addPopup, currentTimeForId])
}
