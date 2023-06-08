import {useMemo} from 'react'
import {BigNumber} from '@ethersproject/bignumber'
import {useActiveWeb3React} from './web3'
import {TransactionType} from './../state/transactions/actions'
import {TransactionResponse} from '@ethersproject/providers'
import {useTransactionAdder} from '../state/transactions/hooks'
import {calculateGasMargin} from '../utils/calculateGasMargin'
import {useAddPopup} from '../state/application/hooks'
import {currentTimeParsed} from '../utils/currentTime'
import isZero from '../utils/isZero'
import {useThirdWebStakingContract} from './useContract'

interface ClaimRewardsCall {
  address: string
  calldata: string
  value: string
}

interface ClaimRewardsCallEstimate {
  call: ClaimRewardsCall
}

interface SuccessfulCall extends ClaimRewardsCallEstimate {
  call: ClaimRewardsCall
  gasEstimate: BigNumber
}

interface FailedCall extends ClaimRewardsCallEstimate {
  call: ClaimRewardsCall
  error: Error
}

enum ClaimRewardsCallbackState {
  INVALID,
  LOADING,
  VALID,
}

function useClaimRewardsCallArguments(poolAddress: string) {
  let calldata: any

  const {account, chainId} = useActiveWeb3React()
  const stakingContract = useThirdWebStakingContract(poolAddress)

  if (!stakingContract) calldata = undefined
  else {
    calldata = stakingContract.interface.encodeFunctionData('claimRewards')
  }

  return useMemo(() => {
    if (!poolAddress || !chainId || !account || !stakingContract || !calldata) return []

    const txn: {address: string; calldata: string; value: string} = {
      address: poolAddress,
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
  }, [calldata, poolAddress, chainId, account, stakingContract])
}

export function useClaimRewardsCallback(poolAddress: string): {
  state: ClaimRewardsCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const {account, chainId, library} = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()
  const claimRewardsCalls = useClaimRewardsCallArguments(poolAddress)

  return useMemo(() => {
    if (!library || !account || !chainId || !poolAddress) {
      return {
        state: ClaimRewardsCallbackState.INVALID,
        callback: null,
        error: 'Missing Dependencies',
      }
    }

    return {
      state: ClaimRewardsCallbackState.VALID,
      callback: async function onBuild(): Promise<string> {
        const estimatedCalls: ClaimRewardsCallEstimate[] = await Promise.all(
          claimRewardsCalls.map((call: ClaimRewardsCall) => {
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
        let bestCallOption: SuccessfulCall | ClaimRewardsCallEstimate | undefined = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        )

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)

          if (errorCalls.length > 0) throw 'ERROR ' + errorCalls[errorCalls.length - 1].error
          const firstNoErrorCall = estimatedCalls.find<ClaimRewardsCallEstimate>((call): call is ClaimRewardsCallEstimate => !('error' in call))
          if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for the build.')
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
            console.log('response: ', response)
            addTransaction(response, {
              type: TransactionType.CLAIM_REWARDS,
              poolAddress,
            })

            return response.hash
          })
          .catch(error => {
            // if the user rejected the tx, pass this along
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
              console.error(`Build failed`, error, address, calldata, value)

              throw new Error(`Build failed: ${error}`)
            }
          })
      },
      error: null,
    }
  }, [poolAddress, library, account, chainId, claimRewardsCalls, addTransaction, addPopup, currentTimeForId])
}
