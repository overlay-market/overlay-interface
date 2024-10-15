import {useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {BigNumber} from 'ethers'
import {useActiveWeb3React} from './web3'
import {useSingleContractMultipleMethods} from '../state/multicall/hooks'
import {InfoProps} from './usePositionInfo'

export interface usePositionMulticallProps {
  value?: BigNumber
  cost?: BigNumber
  info?: InfoProps
  oiCurrent?: BigNumber
  tradingFee?: BigNumber
  liquidationPrice?: BigNumber
}

export function usePositionMulticall(marketAddress?: string, positionId?: string | number): usePositionMulticallProps {
  const peripheryContract = useV1PeripheryContract()
  const {account} = useActiveWeb3React()

  const callMethods = ['value', 'cost', 'position', 'oi', 'tradingFee', 'liquidationPrice']

  const results = useSingleContractMultipleMethods(peripheryContract, callMethods, [marketAddress, account ?? '', positionId])

  return useMemo(() => {
    let res: usePositionMulticallProps = {}
    results
      ? results.forEach((callState, index) => {
          const _result = callState?.result && callState.result[0]
          if (!_result) return
          if (res == undefined) res = {}
          switch (callMethods[index]) {
            case 'value':
              res.value = _result
              break
            case 'cost':
              res.cost = _result
              break
            case 'position':
              res.info = _result
              break
            case 'oi':
              res.oiCurrent = _result
              break
            case 'tradingFee':
              res.tradingFee = _result
              break
            case 'liquidationPrice':
              res.liquidationPrice = _result
              break
          }
        })
      : (res = {})
    return res
  }, [results])
}
