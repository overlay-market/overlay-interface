import {useEffect} from 'react'
import usePrevious from './usePrevious'
import {useMultichainContext} from '../state/multichain/useMultichainContext'
import {SupportedChainId} from '../constants/chains'
import {useActiveWeb3React} from './web3'
import {switchNetworkToArbitrum, switchNetworkToImola} from '../utils/switchNetworkToArbitrum'

export default function useSyncChainQuery(chainIdRef: React.MutableRefObject<number | undefined>) {
  const {account, chainId} = useActiveWeb3React()
  const {chainId: contextChainId} = useMultichainContext()
  const prevAccount = usePrevious(account)
  const storageChainId = Number(localStorage.getItem('chainId'))

  useEffect(() => {
    if (account && !prevAccount && storageChainId > 0 && contextChainId !== storageChainId) {
      chainIdRef.current = storageChainId as number

      Number(storageChainId) === Number(SupportedChainId.ARBITRUM_SEPOLIA)
        ? switchNetworkToArbitrum()
        : Number(storageChainId) === Number(SupportedChainId.IMOLA)
        ? switchNetworkToImola()
        : console.log('error')
    }
  }, [storageChainId, prevAccount, account, chainIdRef, contextChainId])

  useEffect(() => {
    if (chainIdRef.current || chainIdRef.current === chainId) {
      chainIdRef.current = undefined
      return
    }
  }, [chainId, chainIdRef])
}
