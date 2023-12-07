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
import MemecoinLogo from '../assets/images/tokens/memecoin-logo.png'
import Mcap1000Logo from '../assets/images/tokens/mcap1000-logo.png'
import csgoLogo from '../assets/images/tokens/csgo-logo.png'

export type DescriptionNameMap = {[description: string]: string}
export const MARKET_NAME_FROM_DESCRIPTION: DescriptionNameMap = {
  'Azuki Floor Price': 'Azuki/ WETH',
  'BAYC Floor Price': 'BAYC / WETH',
  'LINK / USD': 'LINK / USD',
  'WBTC / USD': 'WBTC / USD',
  'APE / USD': 'APE / USD',
  'SOL / USD': 'SOL / USD',
  'AVAX / USD': 'AVAX / USD',
  'MATIC / USD': 'MATIC / USD',
  'MCap1000 Feed': 'Memecoins Index',
  'CV Index': 'Crypto Volatility Index',
  'NFT Blue Chip Total Market Cap-USD': 'NFT Blue Chip Index / USD',
  'Total Marketcap USD': 'Total Crypto Market Cap / USD',
  price: 'BAYC / WETH',
}

export const availableMarkets = [
  '0x02e5938904014901c96f534b063ec732ea3b48d5',
  '0x1067b7df86552a53d816ce3fed50d6d01310b48f',
  '0x33659282d39e62b62060c3f9fb2230e97db15f1e',
  // '0x35e1d28ad9d8a80cff5bbf163a735c54eb6c1342', // 'AZUKI / WETH'
  '0x5114215415ee91ab5d973ba62fa9153ece1f6c5a',
  '0x7c65c99ba1edfc94c535b7aa2d72b0f7357a676b',
  '0x833ba1a942dc6d33bc3e6959637ae00e0cdcb20b',
  // '0x8c7dc90243fc7984583339da8df0a5d57ec491db', // 'PUDGIES / WETH'
  // '0x8c82c349e349ffd9403c3984cb1ad1b0f76f7d2e', // 'PUNKS / WETH'
  '0xa811698d855153cc7472d1fb356149a94bd618e7',
  // '0xb31d222c23104cbc2c04df77941f1f2c478133dd', // 'BAYC / WETH'
  '0xc28350047d006ed387b0f210d4ea3218137a8a38',
  // '0xccd645835ca0033f0c1106e7b24f288e59e867e8', // 'MILADY / WETH'
  // '0xce45c64911bd0a088daabd73ee1bc09ae98cd84b', // 'MAYC / WETH'
  // '0xF30C5cB6205f115799b275430Ea0874359476304'.toLowerCase(), // Total Crypto Market Cap
  // '0x8440E56C2675d9b8E04183dA3a3a744a4a16ED33'.toLowerCase(), // memecoins
  '0x6aa41b8f2f858723aafcf388a90d34d1cb1162d9',
]

export const marketNameFromDescription = (description: string | undefined, address: string = '') => {
  if (!description) {
    description = address
  }
  if (address === '0xb31d222c23104cbc2c04df77941f1f2c478133dd') {
    return 'BAYC / WETH'
  } else if (address === '0x35e1d28ad9d8a80cff5bbf163a735c54eb6c1342') {
    return 'AZUKI / WETH'
  } else if (address === '0x8c82c349e349ffd9403c3984cb1ad1b0f76f7d2e') {
    return 'PUNKS / WETH'
  } else if (address === '0xce45c64911bd0a088daabd73ee1bc09ae98cd84b') {
    return 'MAYC / WETH'
  } else if (address === '0xccd645835ca0033f0c1106e7b24f288e59e867e8') {
    return 'MILADY / WETH'
  } else if (address === '0x8c7dc90243fc7984583339da8df0a5d57ec491db') {
    return 'PUDGIES / WETH'
  } else if (address === '0x6aa41b8f2f858723aafcf388a90d34d1cb1162d9') {
    return 'CSGO Sepolia / USD'
  } else {
    return MARKET_NAME_FROM_DESCRIPTION[description]
  }
}

export type MarketLogoMap = {[marketBaseToken: string]: string}
export const MARKET_LOGO_FROM_BASE: MarketLogoMap = {
  WBTC: BitcoinLogo,
  BTC: BitcoinLogo,
  WETH: EthereumLogo,
  ETH: EthereumLogo,
  LINK: LinkLogo,
  AVAX: AvaxLogo,
  SOL: SolanaLogo,
  APE: ApeLogo,
  BAYC: BaycLogo,
  MATIC: MaticLogo,
  AZUKI: AzukiLogo,
  PUDGIES: PudgyLogo,
  PUNKS: PunkLogo,
  MILADY: MiladyLogo,
  MAYC: MaycLogo,
  NFT: BlueChipLogo,
  Crypto: CVIXLogo,
  CV: CVIXLogo,
  Memecoins: MemecoinLogo,
  Total: Mcap1000Logo,
  CSGO: csgoLogo,
}

export type CurrencyMap = {[marketQuoteToken: string]: string}
export const PRICE_CURRENCY_FROM_QUOTE: CurrencyMap = {
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
