import {useEffect, useMemo, useState} from 'react'
import {useV1PeripheryContract} from './useContract'
import {BigNumber} from 'ethers'
import {useActiveWeb3React} from './web3'
import {CallState, useSingleContractMultipleData} from '../state/multicall/hooks'
import {InfoProps} from './usePositionInfo'

export interface useMultiplePositionsMulticallProps {
  value?: BigNumber
  cost?: BigNumber
  info?: InfoProps
  oiCurrent?: BigNumber
  tradingFee?: BigNumber
  liquidationPrice?: BigNumber
}

type selPositionsIds = {
  [id: string]: {
    marketPositionId: string
    positionId: string
  }
}

type callMethodsResults = {
  [key: string]: CallState[]
}

type MulticallResults = {
  [id: string]: {
    [method: string]: BigNumber | undefined
  }
}

export function useMultiplePositionsMulticall(selPositionsIds: selPositionsIds, callMethods: string[]): MulticallResults {
  const peripheryContract = useV1PeripheryContract()
  const {account} = useActiveWeb3React()

  const [callInputs, setCallInputs] = useState<string[][]>([])

  useEffect(() => {
    if (callInputs.length > 0) return
    if (!peripheryContract || !selPositionsIds || !account) return
    ;(async () => {
      try {
        let _callInputs: string[][] = []
        Object.keys(selPositionsIds).forEach(id => {
          if (!selPositionsIds[id].marketPositionId) return
          _callInputs.push([selPositionsIds[id].marketPositionId, account, selPositionsIds[id].positionId])
        })
        callInputs.length === 0 && setCallInputs(_callInputs)
      } catch (error) {
        console.error('market inside useTotalValueLocked: ', selPositionsIds, error)
      }
    })()
  }, [selPositionsIds, account, setCallInputs, callInputs, peripheryContract])

  const valueResults = useSingleContractMultipleData(peripheryContract, 'value', callInputs)
  const costResults = useSingleContractMultipleData(peripheryContract, 'cost', callInputs)
  const positionResults = useSingleContractMultipleData(peripheryContract, 'position', callInputs)
  const oiResults = useSingleContractMultipleData(peripheryContract, 'oi', callInputs)
  const tradingFeeResults = useSingleContractMultipleData(peripheryContract, 'tradingFee', callInputs)
  const liqPriceResults = useSingleContractMultipleData(peripheryContract, 'liquidationPrice', callInputs)

  const passedMethodsResults: callMethodsResults = {
    ...(callMethods.includes('value') && {value: valueResults}),
    ...(callMethods.includes('cost') && {cost: costResults}),
    ...(callMethods.includes('position') && {position: positionResults}),
    ...(callMethods.includes('oi') && {oi: oiResults}),
    ...(callMethods.includes('tradingFee') && {tradingFee: tradingFeeResults}),
    ...(callMethods.includes('liquidationPrice') && {liquidationPrice: liqPriceResults}),
  }

  return useMemo(() => {
    let positionsIds: string[] = []
    Object.keys(selPositionsIds).forEach(id => {
      positionsIds.push(id)
    })

    let positionsResults: MulticallResults = {}

    positionsIds &&
      positionsIds.forEach(id => {
        positionsResults[id] = {
          ...(callMethods.includes('value') && {value: undefined}),
          ...(callMethods.includes('cost') && {cost: undefined}),
          ...(callMethods.includes('position') && {position: undefined}),
          ...(callMethods.includes('oi') && {oi: undefined}),
          ...(callMethods.includes('tradingFee') && {tradingFee: undefined}),
          ...(callMethods.includes('liquidationPrice') && {liquidationPrice: undefined}),
        }
      })

    callMethods.forEach(method => {
      let tempRes: any[] = []
      passedMethodsResults[method as keyof callMethodsResults].map(callState => {
        const _result = callState?.result && callState.result[0]
        if (!_result) return
        tempRes.push(_result)
      })

      positionsIds &&
        positionsIds.forEach((id, index) => {
          positionsResults[id][method as keyof MulticallResults] = tempRes[index]
        })
    })

    return positionsResults
  }, [passedMethodsResults])
}
