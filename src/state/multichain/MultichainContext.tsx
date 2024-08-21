import {PropsWithChildren, useEffect, useMemo, useState} from 'react'
import {MultichainContext} from './types'
import {DEFAULT_CHAINID, SupportedChainId, WORKING_CHAINS} from '../../constants/chains'
import {useActiveWeb3React} from '../../hooks/web3'

export function MultichainContextProvider({
  children,
  initialChainId,
}: PropsWithChildren<{
  initialChainId?: number
}>) {
  const [selectedChainId, setSelectedChainId] = useState<number | undefined | null>(initialChainId)

  const {chainId} = useActiveWeb3React()
  const supportedChainId: boolean = Boolean(chainId && WORKING_CHAINS.includes(SupportedChainId[chainId]))

  useEffect(() => {
    if (initialChainId) {
      setSelectedChainId(initialChainId)
    }
  }, [initialChainId, setSelectedChainId])

  const value = useMemo(() => {
    return {
      setSelectedChainId,
      initialChainId,
      chainId: selectedChainId ?? (supportedChainId ? chainId : DEFAULT_CHAINID),
      isMultichainContext: true,
    }
  }, [initialChainId, chainId, selectedChainId])

  return <MultichainContext.Provider value={value}>{children}</MultichainContext.Provider>
}
