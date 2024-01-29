import {Web3Provider} from '@ethersproject/providers'
import {InjectedConnector} from '@web3-react/injected-connector'
import {SupportedChainId, DEFAULT_CHAINID} from '../constants/chains'
import {NetworkConnector} from './NetworkConnector'
import getLibrary from '../utils/getLibrary'
import {WalletConnectV2Connector} from './walletconnectV2Connector'

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.GÖRLI,
  SupportedChainId.RINKEBY,
  SupportedChainId.ARBITRUM,
  SupportedChainId.ARBITRUM_GÖRLI,
  SupportedChainId.ARBITRUM_SEPOLIA,
]

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

if (typeof ALCHEMY_KEY === 'undefined') {
  throw new Error(`REACT_APP_ALCHEMY_KEY must be a defined environment variable`)
}

export const NETWORK_URLS: {[key in SupportedChainId]: string} = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.GÖRLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.RINKEBY]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  // [SupportedChainId.ARBITRUM]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM]: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  [SupportedChainId.ARBITRUM_GÖRLI]: `https://arbitrum-goerli.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM_SEPOLIA]: `https://arbitrum-sepolia.infura.io/v3/${INFURA_KEY}`,
}

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: DEFAULT_CHAINID,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const walletconnect = new WalletConnectV2Connector({
  projectId: process.env.REACT_APP_WALLET_CONNECT_V2_PROJECT_ID ?? '',
  showQrModal: true,
  chains: [DEFAULT_CHAINID],
  rpcMap: NETWORK_URLS,
})
