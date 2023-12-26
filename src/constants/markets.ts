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
import csgoLogo from '../assets/images/tokens/csgo-logo.svg'
import BtcdLogo from '../assets/images/tokens/bitcoin-dominance-logo.png'
import OVSupplyLogo from '../assets/images/tokens/ov-supply-logo.png'
import BtcdFull from '../assets/images/market-details/btc-dom-full.jpg'

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
  disabled?: boolean
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
  '0xb31d222c23104cbc2c04df77941f1f2c478133dd': {
    marketName: 'BAYC / WETH',
    logo: BitcoinLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['WETH'],
    disabled: true,
  },
  '0x35e1d28ad9d8a80cff5bbf163a735c54eb6c1342': {
    marketName: 'AZUKI / WETH',
    logo: AzukiLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['WETH'],
    disabled: true,
  },
  '0x8c82c349e349ffd9403c3984cb1ad1b0f76f7d2e': {
    marketName: 'PUNKS / WETH',
    logo: PunkLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['WETH'],
    disabled: true,
  },
  '0xce45c64911bd0a088daabd73ee1bc09ae98cd84b': {
    marketName: 'PUNKS / WETH',
    logo: MaycLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['WETH'],
    disabled: true,
  },
  '0xccd645835ca0033f0c1106e7b24f288e59e867e8': {
    marketName: 'MILADY / WETH',
    logo: MiladyLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['WETH'],
    disabled: true,
  },
  '0x8c7dc90243fc7984583339da8df0a5d57ec491db': {
    marketName: 'PUDGIES / WETH',
    logo: PudgyLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['WETH'],
    disabled: true,
  },
  '0x02e5938904014901c96f534b063ec732ea3b48d5': {
    marketName: 'LINK / USD',
    logo: LinkLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: true,
  },
  '0x1067b7df86552a53d816ce3fed50d6d01310b48f': {
    marketName: 'SOL / USD',
    logo: SolanaLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: true,
  },
  '0x33659282d39e62b62060c3f9fb2230e97db15f1e': {
    marketName: 'APE / USD',
    logo: ApeLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: true,
  },
  '0x5114215415ee91ab5d973ba62fa9153ece1f6c5a': {
    marketName: 'NFT Blue Chip Index / USD',
    logo: BlueChipLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: true,
  },
  '0x833ba1a942dc6d33bc3e6959637ae00e0cdcb20b': {
    marketName: 'AVAX / USD',
    logo: AvaxLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: true,
  },
  '0xa811698d855153cc7472d1fb356149a94bd618e7': {
    marketName: 'MATIC / USD',
    logo: MaticLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: true,
  },
  '0xc28350047d006ed387b0f210d4ea3218137a8a38': {
    marketName: 'WBTC / USD',
    logo: BitcoinLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: true,
  },
}

type ComingSoonMarketsData = MarketDetailsData & {
  isComingSoon?: boolean
}

export const ComingSoonMarkets: {[address: string]: ComingSoonMarketsData} = {
  '111': {
    marketName: 'Counter-Strike 2',
    logo: csgoLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: false,
    isComingSoon: true,
  },
  '222': {
    marketName: 'BTC Dominance',
    logo: BtcdLogo,
    currency: '', // currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    disabled: false,
    isComingSoon: true,
  },
  '333': {
    marketName: 'OV Supply',
    logo: OVSupplyLogo,
    currency: '', // currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    disabled: false,
    isComingSoon: true,
  },
}

export type MarketDescriptionData = {
  IndexesConstruction: Array<string>
  FullLogo: string
  ProposedBy: string
  Approved: string
  Contract: string
  Sources: Array<string>
  AdditionalInfo: string
}

export const MarketDescription: {[address: string]: MarketDescriptionData} = {
  '111': {
    IndexesConstruction: ['Nike Blahs', 'AirJordan 6', 'ASICS Retro', 'Puma Attack', 'Hoka Speedgoat'],
    FullLogo: BtcdFull,
    ProposedBy: '@unthoughtfulwizard',
    Approved: '11.5.24 - OGP 28',
    Contract: '0xbb12...12J9',
    Sources: [
      'University of Washington Earth Sciences Labratory',
      'KEXP Radio Tower Su22',
      'Seattle Municipal Station # 12',
      'Seattle Municipal Station # 6',
    ],
    AdditionalInfo: 'doc.overlay.market',
  },
}
