import {SupportedChainId} from './chains'

export interface PoolsData {
  poolName: string
  poolAddress: string
  poolType: string
  chainId: number
}

export const allPoolsData: PoolsData[] = [
  {
    poolName: 'Stake OVL for NIP',
    poolAddress: '0xf7c484e9dE1D7c8AAb098375AbCC52BA6d340A03',
    poolType: 'thirdwebStaking',
    chainId: SupportedChainId.ARBITRUM_GÖRLI,
  },
]
