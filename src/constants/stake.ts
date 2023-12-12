import {SupportedChainId} from './chains'

export interface PoolsData {
  poolName: string
  poolAddress: string
  poolType: string
  chainId: number
  isStake: boolean
  disabled?: boolean
}

export const allPoolsData: PoolsData[] = [
  {
    poolName: 'Stake OVL for NIP',
    poolAddress: '0x1921054a4f8817F9783628F0694744F91Dd9d34e',
    poolType: 'thirdwebStaking',
    chainId: SupportedChainId.ARBITRUM,
    isStake: true,
    disabled: true,
  },
  {
    poolName: 'Stake OVL for NIP',
    poolAddress: '0xf7c484e9dE1D7c8AAb098375AbCC52BA6d340A03',
    poolType: 'thirdwebStaking',
    chainId: SupportedChainId.ARBITRUM_GÖRLI,
    isStake: true,
  },
  {
    poolName: 'Stake OVL for NIP v2',
    poolAddress: '0x942DAB217E7e81299ec20655fCE3aBE762A18027',
    poolType: 'thirdwebStaking',
    chainId: SupportedChainId.ARBITRUM_GÖRLI,
    isStake: true,
  },
  {
    poolName: 'OVL + USDC LP',
    poolAddress: '0xb31d222c23104cbc2c04df77941f1f2c478133dd',
    poolType: 'thirdwebStaking',
    chainId: SupportedChainId.ARBITRUM_GÖRLI,
    isStake: false,
  },
]
