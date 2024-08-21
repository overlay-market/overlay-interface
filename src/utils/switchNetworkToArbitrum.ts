import {ethers} from 'ethers'
import {SupportedChainId, DEFAULT_CHAINID} from '../constants/chains'

// returns the checksummed address if the address is valid, otherwise returns false
export async function switchNetworkToArbitrum(prevChainId?: number) {
  if (window.ethereum && window.ethereum.request) {
    try {
      // check if the chain to connect to is installed
      const hex_chainId = ethers.utils.hexValue(DEFAULT_CHAINID)

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: hex_chainId}], // chainId must be in hexadecimal numbers
      })
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ethers.utils.hexValue(DEFAULT_CHAINID),
                chainName: 'Bartio',
                rpcUrls: ['https://bartio.rpc.berachain.com'],
                blockExplorerUrls: ['https://bartio.beratrail.io/'],
                nativeCurrency: {
                  decimals: 18,
                  name: 'BERA',
                  symbol: 'BERA',
                },
              },
            ],
          })
        } catch (addError) {
          console.error(addError)
        }
      }

      // This error code indicates that the user rejected the request
      if (error.code === 4001) {
        localStorage.setItem('chainId', String(prevChainId))
        window.location.reload()
      }

      // This error code indicates that request of type 'wallet_switchEthereumChain' is already pending
      if (error.code === -32002) {
        localStorage.setItem('chainId', String(prevChainId))
        window.location.reload()
      }
      console.error(error)
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html')
  }
}

export async function switchNetworkToImola(prevChainId?: number) {
  if (window.ethereum && window.ethereum.request) {
    try {
      // check if the chain to connect to is installed
      const hex_chainId = ethers.utils.hexValue(SupportedChainId.IMOLA)

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: hex_chainId}], // chainId must be in hexadecimal numbers
      })
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ethers.utils.hexValue(SupportedChainId.IMOLA),
                chainName: 'Move-EVM',
                rpcUrls: ['https://mevm.devnet.imola.movementlabs.xyz'],
                blockExplorerUrls: ['https://explorer.testnet.imola.movementlabs.xyz'],
                nativeCurrency: {
                  decimals: 18,
                  name: 'MOVE',
                  symbol: 'MOVE',
                },
              },
            ],
          })
        } catch (addError) {
          console.error(addError)
        }
      }

      // This error code indicates that the user rejected the request
      if (error.code === 4001) {
        localStorage.setItem('chainId', String(prevChainId))
        window.location.reload()
      }

      // This error code indicates that request of type 'wallet_switchEthereumChain' is already pending
      if (error.code === -32002) {
        localStorage.setItem('chainId', String(prevChainId))
        window.location.reload()
      }
      console.error(error)
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html')
  }
}

export async function switchNetworkToBartio(prevChainId?: number) {
  if (window.ethereum && window.ethereum.request) {
    try {
      // check if the chain to connect to is installed
      const hex_chainId = ethers.utils.hexValue(SupportedChainId.BARTIO)

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: hex_chainId}], // chainId must be in hexadecimal numbers
      })
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ethers.utils.hexValue(SupportedChainId.BARTIO),
                chainName: 'Bartio',
                rpcUrls: ['https://bartio.rpc.berachain.com'],
                blockExplorerUrls: ['https://bartio.beratrail.io/'],
                nativeCurrency: {
                  decimals: 18,
                  name: 'BERA',
                  symbol: 'BERA',
                },
              },
            ],
          })
        } catch (addError) {
          console.error(addError)
        }
      }

      // This error code indicates that the user rejected the request
      if (error.code === 4001) {
        localStorage.setItem('chainId', String(prevChainId))
        window.location.reload()
      }

      // This error code indicates that request of type 'wallet_switchEthereumChain' is already pending
      if (error.code === -32002) {
        localStorage.setItem('chainId', String(prevChainId))
        window.location.reload()
      }
      console.error(error)
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html')
  }
}

export async function switchNetworkTo(chainId: number, prevChainId?: number) {
  Number(chainId) === Number(SupportedChainId.ARBITRUM_SEPOLIA)
    ? switchNetworkToArbitrum(prevChainId)
    : Number(chainId) === Number(SupportedChainId.IMOLA)
    ? switchNetworkToImola(prevChainId)
    : Number(chainId) === Number(SupportedChainId.BARTIO)
    ? switchNetworkToBartio(prevChainId)
    : console.log('error')
}
