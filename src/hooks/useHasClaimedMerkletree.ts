import {useMemo} from 'react'
import {useClaimMerkleTreeContract} from './useContract'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {useSingleCallResult} from '../state/multicall/hooks'

export function useHasClaimedMerkletree(claimAddress: any, userAddress: any) {
  const claimContract = useClaimMerkleTreeContract(claimAddress)
  const blockNumber = useBlockNumber()
  const {chainId} = useActiveWeb3React()
  const callResult = useSingleCallResult(claimContract, 'hasClaimed', [userAddress])

  return useMemo(() => {
    if (!chainId || !blockNumber || !callResult) return null
    return callResult?.result && callResult.result[0]
  }, [callResult, blockNumber, chainId])
}
