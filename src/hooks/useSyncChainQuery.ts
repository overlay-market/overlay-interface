import {useEffect} from 'react'
import usePrevious from './usePrevious'
import {useMultichainContext} from '../state/multichain/useMultichainContext'
import {DEFAULT_CHAINID, SupportedChainId, WORKING_CHAINS} from '../constants/chains'
import {useActiveWeb3React} from './web3'
import {switchNetworkTo, switchNetworkToArbitrum} from '../utils/switchNetworkToArbitrum'

export default function useSyncChainQuery(chainIdRef: React.MutableRefObject<number | undefined>) {
  const {account, chainId} = useActiveWeb3React()
  const {chainId: contextChainId} = useMultichainContext()
  const prevAccount = usePrevious(account)
  const storageChainId = Number(localStorage.getItem('chainId'))

  useEffect(() => {
    if (account && !prevAccount && storageChainId > 0 && contextChainId !== storageChainId) {
      chainIdRef.current = storageChainId as number
      const supportedChainId: boolean = Boolean(storageChainId && WORKING_CHAINS.includes(SupportedChainId[storageChainId]))

      if (supportedChainId) {
        switchNetworkTo(storageChainId, contextChainId)
      } else {
        localStorage.setItem('chainId', String(contextChainId))
        switchNetworkToArbitrum(contextChainId)
      }
    }
  }, [storageChainId, prevAccount, account, chainIdRef, contextChainId])

  useEffect(() => {
    if (storageChainId === 0 || Number.isNaN(storageChainId)) {
      contextChainId ? localStorage.setItem('chainId', String(contextChainId)) : localStorage.setItem('chainId', String(DEFAULT_CHAINID))
    }
  }, [storageChainId, contextChainId, chainIdRef])

  useEffect(() => {
    if (chainIdRef.current || chainIdRef.current === chainId) {
      chainIdRef.current = undefined
      return
    }
  }, [chainId, chainIdRef])
}
