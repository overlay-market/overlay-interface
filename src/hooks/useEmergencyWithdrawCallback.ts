import {useMemo} from 'react'
// import { OVLCollateral } from "@overlay-market/overlay-v1-sdk";
import {utils} from 'ethers'
import {BigNumber} from '@ethersproject/bignumber'
import {useActiveWeb3React} from './web3'
import {useTransactionAdder} from '../state/transactions/hooks'
import {calculateGasMargin} from '../utils/calculateGasMargin'
import {TransactionResponse} from '@ethersproject/providers'
import isZero from '../utils/isZero'
import {TransactionType} from './../state/transactions/actions'
import {useAddPopup} from '../state/application/hooks'
import {currentTimeParsed} from '../utils/currentTime'
import {useMarketContract} from './useContract'

interface EmergencyWithdrawCall {
  address: string
  calldata: string
  value: string
}

interface EmergencyWithdrawCallEstimate {
  call: EmergencyWithdrawCall
}

interface SuccessfulCall extends EmergencyWithdrawCallEstimate {
  call: EmergencyWithdrawCall
  gasEstimate: BigNumber
}

interface FailedCall extends EmergencyWithdrawCallEstimate {
  call: EmergencyWithdrawCall
  error: Error
}

enum EmergencyWithdrawCallbackState {
  INVALID,
  LOADING,
  VALID,
}

function useEmergencyWithdrawCallArguments(marketAddress: string | undefined, positionId: string | null) {
  let calldata: any

  const {account, chainId} = useActiveWeb3React()
  const marketContract = useMarketContract(marketAddress)

  if (!marketContract || positionId === null || !account) calldata = undefined
  else {
    calldata = marketContract.interface.encodeFunctionData('emergencyWithdraw', [BigNumber.from(positionId)])
  }

  return useMemo(() => {
    if (!marketAddress || !positionId || !account || !chainId) return []

    const txn: {address: string; calldata: string; value: string} = {
      address: marketAddress,
      calldata: calldata,
      value: utils.parseEther('0').toHexString(),
    }

    return [
      {
        address: txn.address,
        calldata: calldata,
        value: txn.value,
      },
    ]
  }, [calldata, chainId, account, marketAddress, positionId])
}

export function useEmergencyWithdrawCallback(
  marketAddress: string | undefined,
  positionId: string | null,
): {
  state: EmergencyWithdrawCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const {account, chainId, library} = useActiveWeb3React()
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()
  const addTransaction = useTransactionAdder()
  const emergencyWithdrawCalls = useEmergencyWithdrawCallArguments(marketAddress, positionId)

  return useMemo(() => {
    if (positionId === null || !library || !account || !chainId) {
      return {
        state: EmergencyWithdrawCallbackState.INVALID,
        callback: null,
        error: 'Missing Dependencies',
      }
    }

    return {
      state: EmergencyWithdrawCallbackState.VALID,
      callback: async function onBuild(): Promise<string> {
        const estimatedCalls: EmergencyWithdrawCallEstimate[] = await Promise.all(
          emergencyWithdrawCalls.map(call => {
            const {address, calldata, value} = call
            console.log({call})

            const tx = {
              from: account,
              to: address,
              data: calldata,
              value: value,
            }

            return library
              .estimateGas(tx)
              .then(gasEstimate => {
                return {
                  call,
                  gasEstimate,
                }
              })
              .catch(gasError => {
                console.debug('Gas estimate failed, trying eth_call to extract error', call)

                return library
                  .call(tx)
                  .then(result => {
                    console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
                    return {
                      call,
                      error: new Error('Unexpected issue with estimating the gas. Please try again.'),
                    }
                  })
                  .catch(callError => {
                    addPopup(
                      {
                        txn: {
                          hash: currentTimeForId,
                          success: false,
                          info: callError.error ?? callError.data,
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
        let bestCallOption: SuccessfulCall | EmergencyWithdrawCallEstimate | undefined = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        )

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
          const firstNoErrorCall = estimatedCalls.find<EmergencyWithdrawCallEstimate>(
            (call): call is EmergencyWithdrawCallEstimate => !('error' in call),
          )
          if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for emergencyWithdrawing position.')
          bestCallOption = firstNoErrorCall
        }

        const {
          call: {address, calldata, value},
        } = bestCallOption

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
              type: TransactionType.EMERGENCYWITHDRAW_OVL_POSITION,
              positionId: positionId.toString(),
            })

            return response.hash
          })
          .catch(error => {
            // if the user rejected the tx, pass this along
            console.log('error from useEmergencyWithdrawCallback: ', error)
            if (error?.code === 4001) {
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
              console.error(`EmergencyWithdraw failed`, error, address, calldata, value)
              throw new Error(`EmergencyWithdraw failed: ${error}`)
            }
          })
      },
      error: null,
    }
  }, [positionId, library, account, chainId, emergencyWithdrawCalls, addTransaction, addPopup, currentTimeForId])
}
