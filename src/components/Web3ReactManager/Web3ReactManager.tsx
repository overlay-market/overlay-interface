import {useEffect} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useEagerConnect, useInactiveListener} from '../../hooks/web3'
import {NetworkContextName} from '../../constants/misc'
import {network, useNetwork} from '../../connectors/connectors'
import {useMultichainContext} from '../../state/multichain/useMultichainContext'
import {ethers} from 'ethers'

export default function Web3ReactManager({children}: {children: JSX.Element}) {
  const {active} = useWeb3React()
  const {active: networkActive, error: networkError, activate: activateNetwork} = useWeb3React(NetworkContextName)

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  // useEagerConnect();
  const triedEager = useEagerConnect()

  const activeNetwork = useNetwork()
  // const chainIdLocal = useChainIdLocal()
  const {chainId: contextChainId} = useMultichainContext()

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network)
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active, network])

  useEffect(() => {
    if (!networkError && !active) {
      activeNetwork ? activateNetwork(activeNetwork) : activateNetwork(network)
    }
  }, [contextChainId])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  const {library, activate} = useWeb3React()

  useEffect(() => {
    if (library && library.provider && library.provider.on) {
      const handleChainChanged = (chainId: string) => {
        const decimalChainId = ethers.BigNumber.from(chainId).toNumber()
        sessionStorage.setItem('chainId', String(decimalChainId))
      }

      library.provider.on('chainChanged', handleChainChanged)

      return () => {
        if (library && library.provider && library.provider.removeListener) {
          library.provider.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [library, activate])

  return <>{children}</>
}
