import BitcoinLogo from '../assets/images/tokens/bitcoin-logo.png'
import EthereumLogo from '../assets/images/tokens/ethereum-logo.png'
import LinkLogo from '../assets/images/tokens/link-logo.png'
import AvaxLogo from '../assets/images/tokens/avax-logo.png'
import SolanaLogo from '../assets/images/tokens/solana-logo.png'
import ApeLogo from '../assets/images/tokens/ape-logo.png'
import MaticLogo from '../assets/images/tokens/matic-logo.png'
import BaycLogo from '../assets/images/tokens/bayc-logo.png'
import AzukiLogo from '../assets/images/tokens/azuki-logo.png'
import PudgyLogo from '../assets/images/tokens/pudgy-logo.avif'
import PunkLogo from '../assets/images/tokens/punk-logo.png'
import MiladyLogo from '../assets/images/tokens/milady-logo.avif'
import MaycLogo from '../assets/images/tokens/mayc-logo.png'
import BlueChipLogo from '../assets/images/tokens/Blue-Chip-NFT-logo.png'
import CVIXLogo from '../assets/images/tokens/Crypto-VIX-logo.png'
import csgoLogo from '../assets/images/tokens/csgo-logo.png'

type CurrencyMap = {[marketQuoteToken: string]: string}
const PRICE_CURRENCY_FROM_QUOTE: CurrencyMap = {
  USD: '$',
  USDC: '$',
  DAI: '$',
  ETH: 'Ξ',
  WETH: 'Ξ',
  AETH: 'Ξ',
}

export type MarketChartData = {
  contractAddress: string
  isNft: boolean
  schemaName?: string
}
export const MarketChartMap: {[name: string]: MarketChartData} = {
  'WBTC / USD': {
    contractAddress: '0xb20bd22d3d2e5a628523d37b3ded569598eb649b',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'LINK / USD': {
    contractAddress: '0x9b8ddcf800a7bfcdebad6d65514de59160a2c9cc',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'SOL / USD': {
    contractAddress: '0x8c4308f7cbd7fb829645853cd188500d7da8610a',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'APE / USD': {
    contractAddress: '0x076577765a3e66db410ecc1372d0b0db503a42c5',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'AVAX / USD': {
    contractAddress: '0x0fc3657899693648bba4dbd2d8b33b82e875105d',
    isNft: false,
    schemaName: 'ethereum-mainnet', // arbitrum not available
  },
  'MATIC / USD': {
    contractAddress: '0xa4a2b2000d447cc1086d15c077730008b0251ffd',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'Crypto Volatility Index': {
    contractAddress: '0xb58AFa4be9B13D896E81D5355C961D2c33172099'.toLowerCase(),
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'NFT Blue Chip Index / USD': {
    contractAddress: '0x1a8220ac22762f08be1cd17ee3b6ffffe96c921c',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'Total Crypto Market Cap / USD': {
    contractAddress: '0x7B9845A634822c543F5Ce544Dd7D7797B79a06b8'.toLowerCase(),
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'Memecoins Index': {
    contractAddress: '0xbac350Bde7b410866845A4b06EF93aa2312cb97f'.toLowerCase(),
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
}

export type MarketDetailsData = {
  marketName: string
  logo: string
  currency?: string
}

export const MarketDetails: {[address: string]: MarketDetailsData} = {
  '0x6aa41b8f2f858723aafcf388a90d34d1cb1162d9': {
    marketName: 'CSGO Sepolia / USD',
    logo: csgoLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
  },
  '0x7c65c99ba1edfc94c535b7aa2d72b0f7357a676b': {
    marketName: 'Crypto Volatility Index',
    logo: CVIXLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
  },
  '0xf2ddf700fc481be8ce1f228da5c913f1a25a2d2d': {
    marketName: 'ETH Burn Rate',
    logo: BitcoinLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['WETH'],
  },
  '0x553de578e68a4faa55d4522665cb2d2d53390d22': {
    marketName: 'BTC Dominance',
    logo: BitcoinLogo,
  },
}
