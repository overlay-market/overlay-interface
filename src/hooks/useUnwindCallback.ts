import {useMemo} from 'react'
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
import {useMarketContract, useMultipleMarketsContract} from './useContract'
interface UnwindCall {
  address: string
  calldata: string
  value: string
}

interface UnwindCallEstimate {
  call: UnwindCall
}

interface SuccessfulCall extends UnwindCallEstimate {
  call: UnwindCall
  gasEstimate: BigNumber
}

interface FailedCall extends UnwindCallEstimate {
  call: UnwindCall
  error: Error
}

enum UnwindCallbackState {
  INVALID,
  LOADING,
  VALID,
}

type unwindDataType = {
  [id: string]: {
    unwindData: any
    marketAddress: string | undefined
    unwindValue: string
    positionCurrentValue: BigNumber | undefined
    positionId: string | null
    isLong: boolean | undefined
    prices: any | undefined
  }
}

function useUnwindCallArguments(
  unwindData: any | undefined,
  marketAddress: string | undefined,
  unwindValue: string,
  positionCurrentValue: BigNumber | undefined,
  positionId: string | null,
  isLong: boolean | undefined,
  prices: any | undefined,
) {
  let calldata: any

  const {account, chainId} = useActiveWeb3React()
  const marketContract = useMarketContract(marketAddress)
  console.log(marketContract, ' - - --marketContract')
  if (
    !unwindData ||
    !marketContract ||
    unwindValue === '' ||
    unwindValue === '.' ||
    positionCurrentValue === undefined ||
    positionId === null ||
    !account ||
    isLong === undefined ||
    prices._bid === undefined ||
    prices._ask === undefined
  )
    calldata = undefined
  else {
    let increasePercentage = Number(unwindData.setSlippageValue) + 100
    let decreasePercentage = 100 - Number(unwindData.setSlippageValue)
    let increaseNumerator = BigNumber.from(increasePercentage).toHexString()
    let decreaseNumerator = BigNumber.from(decreasePercentage).toHexString()
    let base = BigNumber.from(100).toHexString()

    let fraction = Number(unwindValue) / 100

    calldata = marketContract.interface.encodeFunctionData('unwind', [
      BigNumber.from(positionId),
      utils.parseUnits(fraction.toFixed(18), 18),
      isLong ? prices._bid.mul(decreaseNumerator).div(base) : prices._ask.mul(increaseNumerator).div(base),
    ])
  }
  console.log(calldata, '- - -calldata - - -')
  return useMemo(() => {
    if (!marketAddress || unwindValue === '' || !positionCurrentValue || !positionId || !account || !chainId) return []

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
  }, [calldata, chainId, account, marketAddress, positionCurrentValue, positionId, unwindValue])
}

export function useUnwindCallback(
  unwindData: any,
  marketAddress: string | undefined,
  unwindValue: string,
  positionCurrentValue: BigNumber | undefined,
  positionId: string | null,
  isLong: boolean | undefined,
  prices: any | undefined,
): {
  state: UnwindCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const {account, chainId, library} = useActiveWeb3React()
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()
  const addTransaction = useTransactionAdder()
  const unwindCalls = useUnwindCallArguments(unwindData, marketAddress, unwindValue, positionCurrentValue, positionId, isLong, prices)
  console.log(unwindCalls, ' - -- unwindCalls - - --')
  console.log(unwindCalls.length)
  console.log(currentTimeForId, 'currentTimeForId')
  return useMemo(() => {
    if (!unwindData || !unwindValue || unwindValue === '.' || positionId === null || !library || !account || !chainId) {
      return {
        state: UnwindCallbackState.INVALID,
        callback: null,
        error: 'Missing Dependencies',
      }
    }

    return {
      state: UnwindCallbackState.VALID,
      callback: async function onBuild(): Promise<string> {
        const estimatedCalls: UnwindCallEstimate[] = await Promise.all(
          unwindCalls.map(call => {
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
        console.log(estimatedCalls, '- -  - -estimatedCalls - - -')
        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let bestCallOption: SuccessfulCall | UnwindCallEstimate | undefined = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        )
        console.log(bestCallOption, 'bestCallOption')
        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
          const firstNoErrorCall = estimatedCalls.find<UnwindCallEstimate>((call): call is UnwindCallEstimate => !('error' in call))
          if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for unwinding position.')
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
              type: TransactionType.UNWIND_OVL_POSITION,
              positionId: positionId.toString(),
              shares: unwindValue,
            })

            return response.hash
          })
          .catch(error => {
            // if the user rejected the tx, pass this along
            console.log('error from useUnwindCallback: ', error)
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
              console.error(`Unwind failed`, error, address, calldata, value)
              throw new Error(`Unwind failed: ${error}`)
            }
          })
      },
      error: null,
    }
  }, [unwindData, unwindValue, positionId, library, account, chainId, unwindCalls, addTransaction, addPopup, currentTimeForId])
}

function useMultipleUnwindsCallArguments(unwindDataList: unwindDataType) {
  const {account, chainId} = useActiveWeb3React()

  const marketAddressList: (string | undefined)[] = useMemo(() => {
    let tempSet = new Set<string | undefined>()
    Object.keys(unwindDataList).forEach(id => {
      tempSet.add(unwindDataList[id]['marketAddress'])
    })
    return Array.from(tempSet)
  }, [unwindDataList])

  const multipleMarketsContract = useMultipleMarketsContract(marketAddressList)

  return useMemo(() => {
    let fullCalldata: any[] = []

    Object.keys(unwindDataList).forEach(id => {
      let calldata: any

      if (
        !unwindDataList[id]['unwindData'] ||
        !multipleMarketsContract.find(contract => contract?.address === unwindDataList[id]['marketAddress']) ||
        unwindDataList[id]['positionCurrentValue'] === undefined ||
        unwindDataList[id]['positionId'] === null ||
        !account ||
        unwindDataList[id]['isLong'] === undefined ||
        unwindDataList[id]['prices']['_bid'] === undefined ||
        unwindDataList[id]['prices']['_ask'] === undefined
      ) {
        calldata = undefined
      } else {
        let increasePercentage = Number(unwindDataList[id]['unwindData'].setSlippageValue) + 100
        let decreasePercentage = 100 - Number(unwindDataList[id]['unwindData'].setSlippageValue)
        let increaseNumerator = BigNumber.from(increasePercentage).toHexString()
        let decreaseNumerator = BigNumber.from(decreasePercentage).toHexString()
        let base = BigNumber.from(100).toHexString()

        let fraction = Number(unwindDataList[id]['unwindValue']) / 100
        let marketContract = multipleMarketsContract.find(contract => contract?.address === unwindDataList[id]['marketAddress'])!

        calldata = marketContract.interface.encodeFunctionData('unwind', [
          BigNumber.from(unwindDataList[id]['positionId']),
          utils.parseUnits(fraction.toFixed(18), 18),
          unwindDataList[id]['isLong']
            ? unwindDataList[id]['prices']._bid.mul(decreaseNumerator).div(base)
            : unwindDataList[id]['prices']._ask.mul(increaseNumerator).div(base),
        ])
      }

      if (
        !unwindDataList[id]['marketAddress'] ||
        unwindDataList[id]['unwindValue'] === '' ||
        !unwindDataList[id]['positionCurrentValue'] ||
        !unwindDataList[id]['positionId'] ||
        !account ||
        !chainId
      )
        return

      const txn: {address: string; calldata: string; value: string} = {
        address: unwindDataList[id]['marketAddress']!,
        calldata: calldata,
        value: utils.parseEther('0').toHexString(),
      }
      fullCalldata.push({
        address: txn.address,
        calldata: calldata,
        value: txn.value,
      })
    })

    return fullCalldata
  }, [unwindDataList, chainId, account])
}

export function useMultipleUnwindsCallback(unwindDataList: unwindDataType): {
  // state: UnwindCallbackState
  // callback: null | (() => Promise<string>)
  // error: string | null
  d: null
} {
  const {account, chainId, library} = useActiveWeb3React()
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()
  const addTransaction = useTransactionAdder()
  // const unwindCalls = useUnwindCallArguments(unwindData, marketAddress, unwindValue, positionCurrentValue, positionId, isLong, prices)
  const unwindCalls = useMultipleUnwindsCallArguments(unwindDataList)
  console.log(unwindCalls, ' +  ++  +unwindCalls')
  return {d: null}
  // return useMemo(() => {
  //   if (!unwindData || !unwindValue || unwindValue === '.' || positionId === null || !library || !account || !chainId) {
  //     return {
  //       state: UnwindCallbackState.INVALID,
  //       callback: null,
  //       error: 'Missing Dependencies',
  //     }
  //   }

  //   return {
  //     state: UnwindCallbackState.VALID,
  //     callback: async function onBuild(): Promise<string> {
  //       const estimatedCalls: UnwindCallEstimate[] = await Promise.all(
  //         unwindCalls.map(call => {
  //           const {address, calldata, value} = call

  //           const tx = {
  //             from: account,
  //             to: address,
  //             data: calldata,
  //             value: value,
  //           }

  //           return library
  //             .estimateGas(tx)
  //             .then(gasEstimate => {
  //               return {
  //                 call,
  //                 gasEstimate,
  //               }
  //             })
  //             .catch(gasError => {
  //               console.debug('Gas estimate failed, trying eth_call to extract error', call)

  //               return library
  //                 .call(tx)
  //                 .then(result => {
  //                   console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
  //                   return {
  //                     call,
  //                     error: new Error('Unexpected issue with estimating the gas. Please try again.'),
  //                   }
  //                 })
  //                 .catch(callError => {
  //                   addPopup(
  //                     {
  //                       txn: {
  //                         hash: currentTimeForId,
  //                         success: false,
  //                         info: callError.error ?? callError.data,
  //                       },
  //                     },
  //                     currentTimeForId,
  //                   )
  //                   console.debug('Call threw error', call, callError)
  //                   return {call, error: new Error(callError)}
  //                 })
  //             })
  //         }),
  //       )

  //       // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
  //       let bestCallOption: SuccessfulCall | UnwindCallEstimate | undefined = estimatedCalls.find(
  //         (el, ix, list): el is SuccessfulCall => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
  //       )

  //       // check if any calls errored with a recognizable error
  //       if (!bestCallOption) {
  //         const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
  //         if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
  //         const firstNoErrorCall = estimatedCalls.find<UnwindCallEstimate>((call): call is UnwindCallEstimate => !('error' in call))
  //         if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for unwinding position.')
  //         bestCallOption = firstNoErrorCall
  //       }

  //       const {
  //         call: {address, calldata, value},
  //       } = bestCallOption

  //       return library
  //         .getSigner()
  //         .sendTransaction({
  //           from: account,
  //           to: address,
  //           data: calldata,
  //           // let the wallet try if we can't estimate the gas
  //           ...('gasEstimate' in bestCallOption ? {gasLimit: calculateGasMargin(bestCallOption.gasEstimate)} : {}),
  //           ...(value && !isZero(value) ? {value} : {}),
  //         })
  //         .then((response: TransactionResponse) => {
  //           addTransaction(response, {
  //             type: TransactionType.UNWIND_OVL_POSITION,
  //             positionId: positionId.toString(),
  //             shares: unwindValue,
  //           })

  //           return response.hash
  //         })
  //         .catch(error => {
  //           // if the user rejected the tx, pass this along
  //           console.log('error from useUnwindCallback: ', error)
  //           if (error?.code === 4001) {
  //             addPopup(
  //               {
  //                 txn: {
  //                   hash: currentTimeForId,
  //                   success: false,
  //                   info: error,
  //                 },
  //               },
  //               currentTimeForId,
  //             )
  //             throw new Error('Transaction rejected.')
  //           } else {
  //             // otherwise, the error was unexpected and we need to convey that
  //             console.error(`Unwind failed`, error, address, calldata, value)
  //             throw new Error(`Unwind failed: ${error}`)
  //           }
  //         })
  //     },
  //     error: null,
  //   }
  // }, [unwindData, unwindValue, positionId, library, account, chainId, unwindCalls, addTransaction, addPopup, currentTimeForId])
}
