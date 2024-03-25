import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {ethers, BigNumber} from 'ethers'
import {useOpenPositionsFromSubgraph} from '../state/build/hooks'
import {useSingleContractMultipleData} from '../state/multicall/hooks'

export function useTotalFees(account: string | null | undefined): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const {data} = useOpenPositionsFromSubgraph(account, 1000, 0)
  const [callInputs, setCallInputs] = useState<string[][]>([])

  useEffect(() => {
    let positions = data?.account?.positions
    if (!peripheryContract || !positions || !account) return
    ;(async () => {
      try {
        let _callInputs: string[][] = []
        for (let position of positions) {
          if (!position.market.id) continue
          _callInputs.push([position.market.id, account, position.positionId])
        }
        setCallInputs(_callInputs)
      } catch (error) {
        console.error('market inside useTotalValueLocked: ', positions)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peripheryContract, JSON.stringify(data), account])

  const valueResults = useSingleContractMultipleData(peripheryContract, 'tradingFee', callInputs)

  return useMemo(() => {
    let _totalValue = ethers.constants.Zero
    valueResults.map(position => {
      const _value = position?.result && position.result[0]
      if (!_value) return
      _totalValue = _totalValue.add(_value)
    })
    return _totalValue
  }, [valueResults])
}
