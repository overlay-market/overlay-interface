import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {BigNumber} from 'ethers'

export interface InfoProps {
  debtInitial: BigNumber
  entryTick: number
  midTick: number
  fractionRemaining: number
  isLong: boolean
  liquidated: boolean
  notionalInitial: BigNumber
  oiShares: BigNumber
}

export function usePositionInfo(marketAddress: string | undefined, positionId: string | number | undefined): InfoProps | null {
  const contract = useV1PeripheryContract()
  const currentBlock = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [value, setValue] = useState<InfoProps | null>(null)

  useEffect(() => {
    if (!marketAddress || !positionId || !contract || !currentBlock || !account) return
    ;(async () => {
      setValue(await contract.position(marketAddress, account, positionId))
    })()
  }, [positionId, currentBlock, account, contract, marketAddress])
  return useMemo(() => {
    return value
  }, [value])
}
