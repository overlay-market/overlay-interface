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

interface ReferralClaimCall {
  address: string
  calldata: string
  value: string
}

interface ReferralClaimCallEstimate {
  call: ReferralClaimCall
}

interface SuccessfulCall extends ReferralClaimCallEstimate {
  call: ReferralClaimCall
  gasEstimate: BigNumber
}

interface FailedCall extends ReferralClaimCallEstimate {
  call: ReferralClaimCall
  error: Error
}

enum ReferralClaimCallbackState {
  INVALID,
  LOADING,
  VALID,
}

function useReferralClaimCallArguments(amount: string, proof: string[]) {
  let calldata: any

  const {account, chainId} = useActiveWeb3React()

  const referralListAddress = useMemo(() => {
    return chainId ? REFERRAL_LIST_ADDRESS[chainId] : ''
  }, [chainId])
  const referralListContract = useReferralListContract(referralListAddress)

  if (!amount || !proof || !account || !referralListContract || referralListAddress === '') calldata = undefined
  else {
    try {
      calldata = referralListContract.interface.encodeFunctionData('claimRewards', [account, amount, proof])
    } catch (e) {
      console.log({errorOnArgs: e})
      calldata = undefined
    }
  }

  return useMemo(() => {
    if (!amount || !proof || !referralListContract || referralListAddress === '' || !chainId || !account || !referralListContract || !calldata)
      return []

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
  }, [calldata, referralListAddress, chainId, account, amount, proof, referralListContract])
}

export function useReferralClaimCallback(
  amount: string,
  proof: string[],
): {
  state: ReferralClaimCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const {account, chainId, library} = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()
  const referralClaimCalls = useReferralClaimCallArguments(amount, proof)

  return useMemo(() => {
    if (!amount || !proof || !library || !account || !chainId || referralClaimCalls.length === 0) {
      return {
        state: ReferralClaimCallbackState.INVALID,
        callback: null,
        error: 'Missing Dependencies',
      }
    }

    return {
      state: ReferralClaimCallbackState.VALID,
      callback: async function onReferralClaim(): Promise<string> {
        const estimatedCalls: ReferralClaimCallEstimate[] = await Promise.all(
          referralClaimCalls.map(call => {
            const {address, calldata, value} = call

            const tx = {
              from: account,
              to: address,
              data: calldata,
              value: value,
            }

            console.log('tx: ', tx)
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
        let bestCallOption: SuccessfulCall | ReferralClaimCallEstimate | undefined = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        )

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)

          if (errorCalls.length > 0) throw new Error('ERROR ' + errorCalls[errorCalls.length - 1].error)
          const firstNoErrorCall = estimatedCalls.find<ReferralClaimCallEstimate>((call): call is ReferralClaimCallEstimate => !('error' in call))
          if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for the referralclaim.')
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
              type: TransactionType.REFERRAL_CLAIM,
              amount,
              account,
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
              console.error(`ReferralClaim failed`, error, address, calldata, value)

              throw new Error(`ReferralClaim failed: ${error}`)
            }
          })
      },
      error: null,
    }
  }, [amount, proof, library, account, chainId, referralClaimCalls, addTransaction, addPopup, currentTimeForId])
}
