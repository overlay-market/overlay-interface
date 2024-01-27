import {ethers} from 'ethers'
import {SupportedChainId} from '../constants/chains'

// returns the checksummed address if the address is valid, otherwise returns false
export function switchNetworkToArbitrum() {
  if (window.ethereum && window.ethereum.request) {
    try {
      // check if the chain to connect to is installed
      const hex_chainId = ethers.utils.hexValue(SupportedChainId.DEFAULT)

      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: hex_chainId}], // chainId must be in hexadecimal numbers
      })
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ethers.utils.hexValue(SupportedChainId.DEFAULT),
                rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
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
