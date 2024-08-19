import {useState, useEffect} from 'react'
import {Web3Provider} from '@ethersproject/providers'
import {useWeb3React as useWeb3ReactCore} from '@web3-react/core'
import {Web3ReactContextInterface} from '@web3-react/core/dist/types'
import {NetworkContextName} from '../constants/misc'
import {injected, walletconnect} from './../connectors/connectors'
import {isMobile} from 'react-device-detect'
import {ChainId} from '@sushiswap/sdk'
import {DEFAULT_CHAINID} from '../constants/chains'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: ChainId
} {
  const context = useWeb3ReactCore<Web3Provider>()
  const {chainId, ...rest} = useWeb3ReactCore<Web3Provider>()
  const fallbackChainId = Number(sessionStorage.getItem('chainId'))
  const supportedChainId = chainId ? chainId : fallbackChainId > 0 ? fallbackChainId : DEFAULT_CHAINID

  const {chainId: chainIdFallback, ...restFallback} = useWeb3ReactCore<Web3Provider>(NetworkContextName)
  return context.active ? {...rest, chainId: supportedChainId} : {...restFallback, chainId: supportedChainId}
}

export function useEagerConnect() {
  const {activate, active} = useWeb3ReactCore()
  const [tried, setTried] = useState(false)

  const storedDisconnected = localStorage.getItem('disconnected')
  const storedConnection = localStorage.getItem('connectionMeta')

  useEffect(() => {
    if (storedDisconnected === 'true') {
      if (isMobile && window.ethereum) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      }
      setTried(true)
    } else {
      injected.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          if (storedConnection === 'walletconnect') {
            activate(walletconnect, undefined, true).catch(() => {
              setTried(true)
            })
          } else {
            setTried(true)
          }
        }
      })
    }
  }, [activate, storedDisconnected, storedConnection])

  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const {active, error, activate} = useWeb3ReactCore()

  useEffect(() => {
    const {ethereum} = window

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch(error => {
          console.error('Failed to activate after chain changed', error)
        })
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch(error => {
            console.error('Failed to activate after accounts changed', error)
          })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate])
}
