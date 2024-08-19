import {ethers} from 'ethers'
import {SupportedChainId, DEFAULT_CHAINID} from '../constants/chains'

// returns the checksummed address if the address is valid, otherwise returns false
export async function switchNetworkToArbitrum() {
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
      console.error(error)
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html')
  }
}

export async function switchNetworkToImola() {
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
      console.error(error)
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html')
  }
}

export async function switchNetworkToBartio() {
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
      console.error(error)
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html')
  }
}
