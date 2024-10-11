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
import EthBurnLogo from '../assets/images/tokens/eth-burn.png'
import EthDominanceLogo from '../assets/images/tokens/eth-dominance.png'
import MiladyNewLogo from '../assets/images/tokens/milady.png'
import BtcFrogsLogo from '../assets/images/tokens/btc-frogs.png'
import NodeMonkesLogo from '../assets/images/tokens/node-monkes.png'
import EthVixLogo from '../assets/images/tokens/eth-vix.png'
import AIIndexLogo from '../assets/images/tokens/AI_Index.png'
import AIIndexFull from '../assets/images/tokens/AI-Index_full_logo.png'
import FlippeningLogo from '../assets/images/tokens/flippening.png'
import EvIndexLogo from '../assets/images/tokens/ev-index.png'
import EvIndexFull from '../assets/images/tokens/ev-index-full-logo.jpeg'
import BtcdFull from '../assets/images/market-details/btc-dom-full.jpg'
import QuantumCatsLogo from '../assets/images/tokens/quantum-cats.png'
import InkLogo from '../assets/images/tokens/ink.png'
import EthSolLogo from '../assets/images/tokens/ethsol.png'
import CsRifleLogo from '../assets/images/tokens/cs2-rifle-logo.png'
import CsRifleFull from '../assets/images/tokens/cs2-rifle-image.png'
import CsKnifeLogo from '../assets/images/tokens/cs2-knife-logo.png'
import CsKnifeFull from '../assets/images/tokens/cs2-knife-image.png'
import CsRifleKnifeLogo from '../assets/images/tokens/cs2-rifle-knife-logo.png'
import CsRifleKnifeFull from '../assets/images/tokens/cs2-rifle-knife-image.jpeg'
import CatsDogsLogo from '../assets/images/tokens/cat-vs-dog-logo.png'
import CatsDogsFull from '../assets/images/tokens/cat-vs-dog-full.png'
import CatsFrogsLogo from '../assets/images/tokens/cat-vs-frog-logo.png'
import CatsFrogsFull from '../assets/images/tokens/cat-vs-frog-full.png'
import DogsFrogsLogo from '../assets/images/tokens/dog-vs-frog-logo.png'
import DogsFrogsFull from '../assets/images/tokens/dog-vs-frog-full.png'
import RealEstateLogo from '../assets/images/tokens/Real Estate Dominance logo.png'
import RealEstateFull from '../assets/images/tokens/Real Estate Dominance.png'
import SuperEthLogo from '../assets/images/tokens/Superfarm-ETH logo.png'
import SuperEthFull from '../assets/images/tokens/Superfarm-Eth.png'
import {shortenAddress} from '../utils/web3'
import {FeedType, ORACLE_LOGO} from '../constants/oracles'

type CurrencyMap = {[marketQuoteToken: string]: string}
const PRICE_CURRENCY_FROM_QUOTE: CurrencyMap = {
  USD: '$',
  USDC: '$',
  DAI: '$',
  ETH: 'Ξ',
  WETH: 'Ξ',
  AETH: 'Ξ',
  BTC: '₿',
  PERCENTAGE: '%',
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

interface CategoryDetails {
  background?: string
  description?: string
  specialFlag?: string
}

export enum CategoryName {
  MemeWar = 'Meme Wars',
  CounterStrikeSkins = 'Counter-Strike',
  OrdinalNft = 'Ordinals',
  Crypto = 'Crypto',
  Other = 'Other',
}

export type MarketCategoryMap = {
  [K in CategoryName]: CategoryDetails
}

export const MARKET_CATEGORIES: MarketCategoryMap = {
  [CategoryName.MemeWar]: {
    background: CatsFrogsFull,
    description: 'Markets related to popular meme competitions',
    specialFlag: '*NEW*',
  },
  [CategoryName.CounterStrikeSkins]: {
    background: CsRifleFull,
    description: 'Markets tracking Counter-Strike game item skins',
  },
  [CategoryName.OrdinalNft]: {
    // background: ,
    description: 'Markets related to Bitcoin Ordinals and NFTs',
  },
  [CategoryName.Crypto]: {
    background: BtcdFull,
    description: 'General cryptocurrency markets',
  },
  [CategoryName.Other]: {
    background: EvIndexFull,
    description: '',
  },
}

export type MarketDetailsData = {
  marketName: string
  logo: string
  currency: string
  disabled?: boolean
  descriptionText?: string
  indexesConstruction?: Array<string>
  fullLogo?: string
  oracleLogo?: string
  proposedBy?: {
    name?: string
    url?: string
  }
  approved?: {
    name?: string
    url?: string
  }
  contract?: {
    name?: string
    url?: string
  }
  sources?: Array<{name?: string; url?: string}>
  additionalInfo?: {
    name?: string
    url?: string
  }
  category?: CategoryName
}

export const MarketDetails: {[address: string]: MarketDetailsData} = {
  '0xfd3362feb6a1fd9c7fdd4e314ecdaac1e54360c6': {
    marketName: 'SUPER / ETH',
    logo: SuperEthLogo,
    fullLogo: SuperEthFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    sources: [
      {name: 'CoinMarketCap'},
      {name: 'CoinGecko'},
      {name: 'CryptoCompare'},
      {name: 'MEXC'},
      {name: 'Dexscreener'},
      {name: 'Kucoin'},
      {name: 'Gate'},
    ],
    descriptionText:
      'TL;DR – This market represents the ratio between SUPER and ETH, tracking the performance of SuperFarm (SuperVerse) against Ethereum (ETH).\n\nThe data sources include CoinMarketCap, CoinGecko, CryptoCompare,Kucoin, Gate, MEXC, and Dexscreener.\n\nSuperFarm (SUPER) is a comprehensive ecosystem that combines two core verticals, (video games and NFT’S marketplace), while Ethereum (ETH) is a decentralized platform that enables smart contracts and decentralized applications.\n\nThe market represents the performance comparison between SUPER and ETH.',
    contract: {
      name: shortenAddress('0xfd3362feb6a1fd9c7fdd4e314ecdaac1e54360c6'),
      url: 'https://sepolia.arbiscan.io/address/0xfd3362feb6a1fd9c7fdd4e314ecdaac1e54360c6',
    },
    category: CategoryName.Crypto,
  },
  '0x7883c07f0b6d8004e2c8348ab5df2113423a5629': {
    marketName: 'SUPER / ETH',
    logo: SuperEthLogo,
    fullLogo: SuperEthFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    sources: [
      {name: 'CoinMarketCap'},
      {name: 'CoinGecko'},
      {name: 'CryptoCompare'},
      {name: 'MEXC'},
      {name: 'Dexscreener'},
      {name: 'Kucoin'},
      {name: 'Gate'},
    ],
    descriptionText:
      'TL;DR – This market represents the ratio between SUPER and ETH, tracking the performance of SuperFarm (SuperVerse) against Ethereum (ETH).\n\nThe data sources include CoinMarketCap, CoinGecko, CryptoCompare,Kucoin, Gate, MEXC, and Dexscreener.\n\nSuperFarm (SUPER) is a comprehensive ecosystem that combines two core verticals, (video games and NFT’S marketplace), while Ethereum (ETH) is a decentralized platform that enables smart contracts and decentralized applications.\n\nThe market represents the performance comparison between SUPER and ETH.',
    contract: {
      name: shortenAddress('0x7883c07f0b6d8004e2c8348ab5df2113423a5629'),
      url: 'https://bartio.beratrail.io/address/0x7883c07f0b6d8004e2c8348ab5df2113423a5629',
    },
    category: CategoryName.Crypto,
  },
  '0x32abe0b73564e1f0b8981474d65dcb72ca1e4865': {
    marketName: 'SUPER / ETH',
    logo: SuperEthLogo,
    fullLogo: SuperEthFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    sources: [
      {name: 'CoinMarketCap'},
      {name: 'CoinGecko'},
      {name: 'CryptoCompare'},
      {name: 'MEXC'},
      {name: 'Dexscreener'},
      {name: 'Kucoin'},
      {name: 'Gate'},
    ],
    descriptionText:
      'TL;DR – This market represents the ratio between SUPER and ETH, tracking the performance of SuperFarm (SuperVerse) against Ethereum (ETH).\n\nThe data sources include CoinMarketCap, CoinGecko, CryptoCompare,Kucoin, Gate, MEXC, and Dexscreener.\n\nSuperFarm (SUPER) is a comprehensive ecosystem that combines two core verticals, (video games and NFT’S marketplace), while Ethereum (ETH) is a decentralized platform that enables smart contracts and decentralized applications.\n\nThe market represents the performance comparison between SUPER and ETH.',
    contract: {
      name: shortenAddress('0x32abe0b73564e1f0b8981474d65dcb72ca1e4865'),
      url: 'https://explorer.devnet.imola.movementlabs.xyz/#/account/0x32abe0b73564e1f0b8981474d65dcb72ca1e4865',
    },
    category: CategoryName.Crypto,
  },
  '0x31d1e411db1a11a5741ff55d5c01c0c4cf4ac891': {
    marketName: 'Real Estate Dominance',
    logo: RealEstateLogo,
    fullLogo: RealEstateFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    sources: [{name: 'CoinMarketCap'}, {name: 'CoinGecko'}, {name: 'CryptoCompare'}, {name: 'MEXC'}, {name: 'Dexscreener'}],
    descriptionText:
      'TL;DR – This market represents the ratio between the Real Estate Index and the RWA (Real-World Assets) Index, both composed of cap-weighted tokens. \n\nThe data sources include CoinMarketCap, CoinGecko, CryptoCompare, MEXC, Dexscreener, supplemented by others. \n\nThe Real Estate Index consists of the following tokens: \nPRO, TOKEN, HIFI, PROPC, PRCL, BST, UBXS, EL, and RIO \n\nThe RWA Index consists of the following tokens: \nLINK, ONDO, MKR, SNX, OM, XDC, POLYX, PENDLE, and CFG. \n\nThe dominance market represents the ratio between the Real Estate Index and the RWA Index.',
    contract: {
      name: shortenAddress('0x31d1e411db1a11a5741ff55d5c01c0c4cf4ac891'),
      url: 'https://sepolia.arbiscan.io/address/0x31d1e411db1a11a5741ff55d5c01c0c4cf4ac891',
    },
    category: CategoryName.Crypto,
  },
  '0xd27803e696f818038c19f10ca8fc509ec07ba04c': {
    marketName: 'Real Estate Dominance',
    logo: RealEstateLogo,
    fullLogo: RealEstateFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    sources: [{name: 'CoinMarketCap'}, {name: 'CoinGecko'}, {name: 'CryptoCompare'}, {name: 'MEXC'}, {name: 'Dexscreener'}],
    descriptionText:
      'TL;DR – This market represents the ratio between the Real Estate Index and the RWA (Real-World Assets) Index, both composed of cap-weighted tokens. \n\nThe data sources include CoinMarketCap, CoinGecko, CryptoCompare, MEXC, Dexscreener, supplemented by others. \n\nThe Real Estate Index consists of the following tokens: \nPRO, TOKEN, HIFI, PROPC, PRCL, BST, UBXS, EL, and RIO \n\nThe RWA Index consists of the following tokens: \nLINK, ONDO, MKR, SNX, OM, XDC, POLYX, PENDLE, and CFG. \n\nThe dominance market represents the ratio between the Real Estate Index and the RWA Index.',
    contract: {
      name: shortenAddress('0xd27803e696f818038c19f10ca8fc509ec07ba04c'),
      url: 'https://bartio.beratrail.io/address/0xd27803e696f818038c19f10ca8fc509ec07ba04c',
    },
    category: CategoryName.Crypto,
  },
  '0x13b35923944df7e27082fcef640442386487bdda': {
    marketName: 'Real Estate Dominance',
    logo: RealEstateLogo,
    fullLogo: RealEstateFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    sources: [{name: 'CoinMarketCap'}, {name: 'CoinGecko'}, {name: 'CryptoCompare'}, {name: 'MEXC'}, {name: 'Dexscreener'}],
    descriptionText:
      'TL;DR – This market represents the ratio between the Real Estate Index and the RWA (Real-World Assets) Index, both composed of cap-weighted tokens. \n\nThe data sources include CoinMarketCap, CoinGecko, CryptoCompare, MEXC, Dexscreener, supplemented by others. \n\nThe Real Estate Index consists of the following tokens: \nPRO, TOKEN, HIFI, PROPC, PRCL, BST, UBXS, EL, and RIO \n\nThe RWA Index consists of the following tokens: \nLINK, ONDO, MKR, SNX, OM, XDC, POLYX, PENDLE, and CFG. \n\nThe dominance market represents the ratio between the Real Estate Index and the RWA Index.',
    contract: {
      name: shortenAddress('0x13b35923944df7e27082fcef640442386487bdda'),
      url: 'https://explorer.devnet.imola.movementlabs.xyz/#/account/0x13b35923944df7e27082fcef640442386487bdda',
    },
    category: CategoryName.Crypto,
  },
  '0x73973d72eef84a8624e4ec381e8e73caff570092': {
    marketName: 'Cats vs Dogs - Meme War',
    logo: CatsDogsLogo,
    fullLogo: CatsDogsFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: '',
    sources: [{name: 'Coinmarketcap'}, {name: 'CoinGecko'}],
    descriptionText:
      'TL;DR –This market represents the ratio between the market cap of the top 10 cat tokens vs the market cap of the top 10 dog tokens in crypto. The source of data is the API provided by Coinmarketcap and Coingecko, supplemented by safety mechanisms.\n\nThe following projects are cap-weighted in the Cats index:\nPOPCAT, MOG, MEW, MICHI, TOSHI, WEN, MANEKI, CWIF, CAT, DUKO\n\nThe following projects are cap-weighted in the Dogs index:\nDOGE, SHIB, WIF, BONK, FLOKI, DOGS, DOG, OSAK, CORGIAI, NEIRO\n\nand the market represents the ratio between Cats Index/Dogs Index.',
    contract: {
      name: shortenAddress('0x73973d72eef84a8624e4ec381e8e73caff570092'),
      url: 'https://sepolia.arbiscan.io/address/0x73973d72eef84a8624e4ec381e8e73caff570092',
    },
    category: CategoryName.MemeWar,
  },
  '0xa85ad94c84f2bdc48127d93d087054a5f7e5726b': {
    marketName: 'Cats vs Dogs - Meme War',
    logo: CatsDogsLogo,
    fullLogo: CatsDogsFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: '',
    sources: [{name: 'Coinmarketcap'}, {name: 'CoinGecko'}],
    descriptionText:
      'TL;DR –This market represents the ratio between the market cap of the top 10 cat tokens vs the market cap of the top 10 dog tokens in crypto. The source of data is the API provided by Coinmarketcap and Coingecko, supplemented by safety mechanisms.\n\nThe following projects are cap-weighted in the Cats index:\nPOPCAT, MOG, MEW, MICHI, TOSHI, WEN, MANEKI, CWIF, CAT, DUKO\n\nThe following projects are cap-weighted in the Dogs index:\nDOGE, SHIB, WIF, BONK, FLOKI, DOGS, DOG, OSAK, CORGIAI, NEIRO\n\nand the market represents the ratio between Cats Index/Dogs Index.',
    contract: {
      name: shortenAddress('0xa85ad94c84f2bdc48127d93d087054a5f7e5726b'),
      url: 'https://bartio.beratrail.io/address/0xa85ad94c84f2bdc48127d93d087054a5f7e5726b',
    },
    category: CategoryName.MemeWar,
  },
  '0x8bfb2494f3a9b1441185cf04bb10e92e6b4fd9b9': {
    marketName: 'Cats vs Frogs - Meme War',
    logo: CatsFrogsLogo,
    fullLogo: CatsFrogsFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: '',
    sources: [{name: 'Coinmarketcap'}, {name: 'CoinGecko'}],
    descriptionText:
      'TL;DR –This market  represents  the ratio between the market cap of the top 10 Cats tokens vs the market cap of the top 10 Frogs tokens on crypto. The source of data is the API provided by Coinmarketcap and Coingeco, supplemented by safety mechanisms.\n\nThe following projects are cap-weighted in the Cats index:\nPOPCAT, MOG, MEW, MICHI, TOSHI, WEN, MANEKI, CWIF, CAT, DUKO\n\nThe following projects are cap-weighted in the Frogs index:\nPEPE, BRETT, TURBO, PEPECOIN, APU, PEIPEI, HOPPY, TALES, SKOP, TOBY\n\nand the market represents the ratio between Cats Index/Frogs Index.',
    contract: {
      name: shortenAddress('0x8bfb2494f3a9b1441185cf04bb10e92e6b4fd9b9'),
      url: 'https://sepolia.arbiscan.io/address/0x8bfb2494f3a9b1441185cf04bb10e92e6b4fd9b9',
    },
    category: CategoryName.MemeWar,
  },
  '0xf0d9f85295d7a41b51aa5bde08c199735fa15909': {
    marketName: 'Cats vs Frogs - Meme War',
    logo: CatsFrogsLogo,
    fullLogo: CatsFrogsFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: '',
    sources: [{name: 'Coinmarketcap'}, {name: 'CoinGecko'}],
    descriptionText:
      'TL;DR –This market  represents  the ratio between the market cap of the top 10 Cats tokens vs the market cap of the top 10 Frogs tokens on crypto. The source of data is the API provided by Coinmarketcap and Coingeco, supplemented by safety mechanisms.\n\nThe following projects are cap-weighted in the Cats index:\nPOPCAT, MOG, MEW, MICHI, TOSHI, WEN, MANEKI, CWIF, CAT, DUKO\n\nThe following projects are cap-weighted in the Frogs index:\nPEPE, BRETT, TURBO, PEPECOIN, APU, PEIPEI, HOPPY, TALES, SKOP, TOBY\n\nand the market represents the ratio between Cats Index/Frogs Index.',
    contract: {
      name: shortenAddress('0xf0d9f85295d7a41b51aa5bde08c199735fa15909'),
      url: 'https://bartio.beratrail.io/address/0xf0d9f85295d7a41b51aa5bde08c199735fa15909',
    },
    category: CategoryName.MemeWar,
  },
  '0xecd76abb33c36dd62a7d033d26f7146801e03d4f': {
    marketName: 'Frogs vs Dogs - Meme War',
    logo: DogsFrogsLogo,
    fullLogo: DogsFrogsFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: '',
    sources: [{name: 'Coinmarketcap'}, {name: 'CoinGecko'}],
    descriptionText:
      'TL;DR –This market  represents  the ratio between the market cap of the top 10 Frogs tokens vs the market cap of the top 10 Dogs tokens on crypto. The source of data is the API provided by Coinmarketcap and Coingeco, supplemented by safety mechanisms.\n\nThe following projects are cap-weighted in the Frogs index:\nPEPE, BRETT, TURBO, PEPECOIN, APU, PEIPEI, HOPPY, TALES, SKOP, TOBY\n\nThe following projects are cap-weighted in the Dogs index:\nDOGE, SHIB, BONK, FLOKI, DOGS, DOG, OSAK, CORGIAI, NEIRO, WIF,\n\nand the market represents the ratio between Frogs Index/Dogs Index.',
    contract: {
      name: shortenAddress('0xecd76abb33c36dd62a7d033d26f7146801e03d4f'),
      url: 'https://sepolia.arbiscan.io/address/0xecd76abb33c36dd62a7d033d26f7146801e03d4f',
    },
    category: CategoryName.MemeWar,
  },
  '0x0befa5099b225ffdaadbba5911d464e12a75a773': {
    marketName: 'Frogs vs Dogs - Meme War',
    logo: DogsFrogsLogo,
    fullLogo: DogsFrogsFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: '',
    sources: [{name: 'Coinmarketcap'}, {name: 'CoinGecko'}],
    descriptionText:
      'TL;DR –This market  represents  the ratio between the market cap of the top 10 Frogs tokens vs the market cap of the top 10 Dogs tokens on crypto. The source of data is the API provided by Coinmarketcap and Coingeco, supplemented by safety mechanisms.\n\nThe following projects are cap-weighted in the Frogs index:\nPEPE, BRETT, TURBO, PEPECOIN, APU, PEIPEI, HOPPY, TALES, SKOP, TOBY\n\nThe following projects are cap-weighted in the Dogs index:\nDOGE, SHIB, BONK, FLOKI, DOGS, DOG, OSAK, CORGIAI, NEIRO, WIF,\n\nand the market represents the ratio between Frogs Index/Dogs Index.',
    contract: {
      name: shortenAddress('0x0befa5099b225ffdaadbba5911d464e12a75a773'),
      url: 'https://bartio.beratrail.io/address/0x0befa5099b225ffdaadbba5911d464e12a75a773',
    },
    category: CategoryName.MemeWar,
  },
  '0x58cac8f5c3b398650e30f724adf57c4d21d1e900': {
    marketName: 'Cats vs Dogs - archive',
    logo: CatsDogsLogo,
    fullLogo: CatsDogsFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: '',
    sources: [{name: 'Coinmarketcap'}, {name: 'CoinGecko'}],
    descriptionText:
      'TL;DR –- This market  represents  the ratio between the market cap of the top 10 Cats tokens vs the market cap of the top 10 Dogs tokens on crypto. The source of data is the API provided by Coinmarketcap and CoinGecko, supplemented by safety mechanisms.\n\nThe following projects are cap-weighted in the Cats index:\n\n \nPOPCAT, MOG, MEW, MICHI, TOSHI, WEN, MANEKI, CWIF, CAT, DUKO\n\nThe following projects are cap-weighted in the Dogs index:\nDOGE, SHIB, WIF, BONK, FLOKI, DOGS, DOG, OSAK, CORGIAI, NEIRO\n\nand the market represents the ratio between Cats Index/ Dogs Index.',
    contract: {
      name: shortenAddress('0x58cac8f5c3b398650e30f724adf57c4d21d1e900'),
      url: 'https://sepolia.arbiscan.io/address/0x58cac8f5c3b398650e30f724adf57c4d21d1e900',
    },
  },
  '0xa7becde03da95d1dd0657710e4725342218b2876': {
    marketName: 'Cats vs Dogs - archive',
    logo: CatsDogsLogo,
    fullLogo: CatsDogsFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: '',
    sources: [{name: 'Coinmarketcap'}, {name: 'CoinGecko'}],
    descriptionText:
      'TL;DR –- This market  represents  the ratio between the market cap of the top 10 Cats tokens vs the market cap of the top 10 Dogs tokens on crypto. The source of data is the API provided by Coinmarketcap and CoinGecko, supplemented by safety mechanisms.\n\nThe following projects are cap-weighted in the Cats index:\n\n \nPOPCAT, MOG, MEW, MICHI, TOSHI, WEN, MANEKI, CWIF, CAT, DUKO\n\nThe following projects are cap-weighted in the Dogs index:\nDOGE, SHIB, WIF, BONK, FLOKI, DOGS, DOG, OSAK, CORGIAI, NEIRO\n\nand the market represents the ratio between Cats Index/ Dogs Index.',
    contract: {
      name: shortenAddress('0xa7becde03da95d1dd0657710e4725342218b2876'),
      url: 'https://bartio.beratrail.io/address/0xa7becde03da95d1dd0657710e4725342218b2876',
    },
  },
  '0x6aa41b8f2f858723aafcf388a90d34d1cb1162d9': {
    marketName: 'Counter-Strike 2 Skins',
    logo: csgoLogo,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    descriptionText:
      "TL;DR -- The market cap of the top 5000 most commonly traded Counter Strike skins.\n\nThe source of data is the API provided by several skin aggregators. \n\nIn order to be robust, yet representative, the methodology relies on a set of criteria to select the items that will be included in the index. The criteria are as follows:\n\nHighly Traded: The index is limited to the top 5000 most traded items. The most traded item is the one that has the most number of unique minimum listing prices in the analysis period.\n\nMinimum Number of Listings: The current version of the index is restricted to items with at least 100 listings on all days of the analysis period. This ensures that the items are not too concentrated in the hands of a few traders. Further, the number of listings per item is set to the minimum number of listings observed for that item in the analysis period.\n\nDetermining the Value of Each Item: The value for each item is derived using two key metrics from the API. Number of Listings, and Minimum Price.\n\nNumber of Listings: This represents the total number listings across all tracked exchanges. It captures the supply of that item in the market.\n\nMinimum Price: Among all the listings for an item, this is the lowest price at which the item is being offered.\n\nThe 'Market Capitalization' for each item is then calculated as: MCap = Number of Listings * Minimum Price. The sum of all these MCaps at a point in time is the index value for that point in time. However, to restrict manipulability and ensure robustness of the index over time, some further safety measures are imposed that may force the index value to diverge from the pure sum of all MCaps.",
    indexesConstruction: ['Most traded Counter Strike 2 skins'],
    contract: {
      name: shortenAddress('0x6aa41b8f2f858723aafcf388a90d34d1cb1162d9'),
      url: 'https://sepolia.arbiscan.io/address/0x6aa41b8f2f858723aafcf388a90d34d1cb1162d9',
    },
    category: CategoryName.CounterStrikeSkins,
  },
  '0x49c4ad8b75e118a9b7bd1b89e7af029f3cb1c237': {
    marketName: 'Counter-Strike 2 Skins',
    logo: csgoLogo,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    descriptionText:
      "TL;DR -- The market cap of the top 5000 most commonly traded Counter Strike skins.\n\nThe source of data is the API provided by several skin aggregators. \n\nIn order to be robust, yet representative, the methodology relies on a set of criteria to select the items that will be included in the index. The criteria are as follows:\n\nHighly Traded: The index is limited to the top 5000 most traded items. The most traded item is the one that has the most number of unique minimum listing prices in the analysis period.\n\nMinimum Number of Listings: The current version of the index is restricted to items with at least 100 listings on all days of the analysis period. This ensures that the items are not too concentrated in the hands of a few traders. Further, the number of listings per item is set to the minimum number of listings observed for that item in the analysis period.\n\nDetermining the Value of Each Item: The value for each item is derived using two key metrics from the API. Number of Listings, and Minimum Price.\n\nNumber of Listings: This represents the total number listings across all tracked exchanges. It captures the supply of that item in the market.\n\nMinimum Price: Among all the listings for an item, this is the lowest price at which the item is being offered.\n\nThe 'Market Capitalization' for each item is then calculated as: MCap = Number of Listings * Minimum Price. The sum of all these MCaps at a point in time is the index value for that point in time. However, to restrict manipulability and ensure robustness of the index over time, some further safety measures are imposed that may force the index value to diverge from the pure sum of all MCaps.",
    indexesConstruction: ['Most traded Counter Strike 2 skins'],
    contract: {
      name: shortenAddress('0x49c4ad8b75e118a9b7bd1b89e7af029f3cb1c237'),
      url: 'https://bartio.beratrail.io/address/0x49c4ad8b75e118a9b7bd1b89e7af029f3cb1c237',
    },
    category: CategoryName.CounterStrikeSkins,
  },
  '0x745d36559834f6b016fc43d2261f0709e62344e1': {
    marketName: 'Rifles - CS2 Skins',
    logo: CsRifleLogo,
    fullLogo: CsRifleFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    descriptionText:
      "TL;DR -- The market cap of the top most commonly traded Counter-Strike rifle skins.\n\nThe source of data is the API provided by several skin aggregators.\n\nTo ensure robustness and representativeness, the methodology relies on a set of criteria to select the items included in the index. The criteria are as follows:\n\nHighly Traded: The index is limited to the top most traded rifle skins. The most traded item is the one with the most unique listing prices during the analysis period.\n\nMinimum Number of Listings: The index includes only rifle skins with minimum threshold listings all days of the analysis period. This ensures that the items are not overly concentrated among a few traders. The number of listings per item is set to the minimum observed during the analysis period.\n\nDetermining the Value of Each Item: The value for each rifle skin is derived using two key metrics from the API: Number of Listings and Minimum Price.\n\nNumber of Listings: Represents the total number of listings across all tracked exchanges, capturing the supply of the item.\n\nMinimum Price: The lowest price among all listings for that item.\n\nThe 'Market Capitalization' for each rifle skin is calculated as: MCap = Number of Listings * Minimum Price. The sum of these MCaps at any point in time forms the index value. To ensure robustness, safety measures may force the index value to diverge from the pure sum of all MCaps.",
    indexesConstruction: ['Most traded Counter Strike 2 Rifles skins'],
    contract: {
      name: shortenAddress('0x745d36559834f6b016fc43d2261f0709e62344e1'),
      url: 'https://bartio.beratrail.io/address/0x745d36559834f6b016fc43d2261f0709e62344e1',
    },
    category: CategoryName.CounterStrikeSkins,
  },
  '0x789d85fb4f104feb1cd85c7475c02f3f8e2dff5b': {
    marketName: 'Knives - CS2 Skins',
    logo: CsKnifeLogo,
    fullLogo: CsKnifeFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    descriptionText:
      "TL;DR -- The market cap of the top most commonly traded Counter-Strike knife skins.\n\nThe source of data is the API provided by several skin aggregators.\n\nThe methodology is designed to be robust and representative, relying on a set of criteria to select the items included in the index. The criteria are as follows:\n\nHighly Traded: The index is limited to the top most traded knife skins. The most traded item is the one with the most unique listing prices during the analysis period.\n\nMinimum Number of Listings: The index includes only knife skins with a minimum threshold of listings on all days of the analysis period. This ensures that the items are widely distributed and not overly concentrated among a few traders. The number of listings per item is set to the minimum observed during the analysis period.\n\nDetermining the Value of Each Item: The value for each knife skin is derived using two key metrics from the API: Number of Listings and Minimum Price.\n\nNumber of Listings: Represents the total number of listings across all tracked exchanges, capturing the supply of the item.ç\n\nMinimum Price: The lowest price among all listings for that item.\n\nThe 'Market Capitalization' for each knife skin is calculated as: MCap = Number of Listings * Minimum Price. The sum of these MCaps at any point in time forms the index value. To ensure robustness, safety measures may force the index value to diverge from the pure sum of all MCaps.",
    indexesConstruction: ['Most traded Counter Strike 2 Knives skins'],
    contract: {
      name: shortenAddress('0x789d85fb4f104feb1cd85c7475c02f3f8e2dff5b'),
      url: 'https://bartio.beratrail.io/address/0x789d85fb4f104feb1cd85c7475c02f3f8e2dff5b',
    },
    category: CategoryName.CounterStrikeSkins,
  },
  '0x9eb938c3739bbf2b54a80add213f66fe4cd694dc': {
    marketName: 'Knives vs Rifles - CS2 Skins',
    logo: CsRifleKnifeLogo,
    fullLogo: CsRifleKnifeFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    descriptionText:
      "TL;DR -- The ratio of the market cap of the top most commonly traded knife skins to the market cap of the top most commonly traded rifle skins.\n\nThe source of data is the API provided by several skin aggregators.\n\nThis index tracks the ratio between the market cap of knife skins and rifle skins, offering insights into their relative value over time. The methodology is robust and representative, relying on a set of criteria to select the items included in the index. The criteria are as follows:\n\nHighly Traded: The index focuses on the top most traded knife and rifle skins separately. The most traded items are identified by the number of unique listing prices during the analysis period.\n\nMinimum Number of Listings: The index includes only skins (both knives and rifles) with a minimum threshold of listings on all days of the analysis period. This ensures widespread distribution and prevents over-concentration among a few traders. The number of listings per item is set to the minimum observed during the analysis period.\n\nDetermining the Value of Each Item: For both knives and rifles, the value of each skin is derived using two key metrics from the API: Number of Listings and Minimum Price.\n\nNumber of Listings: Reflects the total number of listings across all tracked exchanges, capturing the supply of the item.\n\nMinimum Price: The lowest price among all listings for that item.\n\nThe 'Market Capitalization' for each skin type (knives or rifles) is calculated as: MCap = Number of Listings * Minimum Price. The Knives/Rifles ratio is then calculated as the ratio of the sum of MCaps for knife skins to the sum of MCaps for rifle skins. Additional safety measures may be applied to ensure the robustness of the index, preventing manipulation and maintaining long-term accuracy.",
    indexesConstruction: ['Most traded Counter Strike 2 Rifles skins', 'Most traded Counter Strike 2 Knives skins'],
    contract: {
      name: shortenAddress('0x9eb938c3739bbf2b54a80add213f66fe4cd694dc'),
      url: 'https://bartio.beratrail.io/address/0x9eb938c3739bbf2b54a80add213f66fe4cd694dc',
    },
    category: CategoryName.CounterStrikeSkins,
  },
  '0xe35a856f1d98f101c5c60db8d02ba4dff87986b3': {
    marketName: 'Rifles - CS2 Skins',
    logo: CsRifleLogo,
    fullLogo: CsRifleFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    descriptionText:
      "TL;DR -- The market cap of the top most commonly traded Counter-Strike rifle skins.\n\nThe source of data is the API provided by several skin aggregators.\n\nTo ensure robustness and representativeness, the methodology relies on a set of criteria to select the items included in the index. The criteria are as follows:\n\nHighly Traded: The index is limited to the top most traded rifle skins. The most traded item is the one with the most unique listing prices during the analysis period.\n\nMinimum Number of Listings: The index includes only rifle skins with minimum threshold listings all days of the analysis period. This ensures that the items are not overly concentrated among a few traders. The number of listings per item is set to the minimum observed during the analysis period.\n\nDetermining the Value of Each Item: The value for each rifle skin is derived using two key metrics from the API: Number of Listings and Minimum Price.\n\nNumber of Listings: Represents the total number of listings across all tracked exchanges, capturing the supply of the item.\n\nMinimum Price: The lowest price among all listings for that item.\n\nThe 'Market Capitalization' for each rifle skin is calculated as: MCap = Number of Listings * Minimum Price. The sum of these MCaps at any point in time forms the index value. To ensure robustness, safety measures may force the index value to diverge from the pure sum of all MCaps.",
    indexesConstruction: ['Most traded Counter Strike 2 Rifles skins'],
    contract: {
      name: shortenAddress('0xe35a856f1d98f101c5c60db8d02ba4dff87986b3'),
      url: 'https://sepolia.arbiscan.io/address/0xe35a856f1d98f101c5c60db8d02ba4dff87986b3',
    },
    category: CategoryName.CounterStrikeSkins,
  },
  '0x6dfe4094599c74a920285a17608ae023d707eed9': {
    marketName: 'Knives - CS2 Skins',
    logo: CsKnifeLogo,
    fullLogo: CsKnifeFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    descriptionText:
      "TL;DR -- The market cap of the top most commonly traded Counter-Strike knife skins.\n\nThe source of data is the API provided by several skin aggregators.\n\nThe methodology is designed to be robust and representative, relying on a set of criteria to select the items included in the index. The criteria are as follows:\n\nHighly Traded: The index is limited to the top most traded knife skins. The most traded item is the one with the most unique listing prices during the analysis period.\n\nMinimum Number of Listings: The index includes only knife skins with a minimum threshold of listings on all days of the analysis period. This ensures that the items are widely distributed and not overly concentrated among a few traders. The number of listings per item is set to the minimum observed during the analysis period.\n\nDetermining the Value of Each Item: The value for each knife skin is derived using two key metrics from the API: Number of Listings and Minimum Price.\n\nNumber of Listings: Represents the total number of listings across all tracked exchanges, capturing the supply of the item.ç\n\nMinimum Price: The lowest price among all listings for that item.\n\nThe 'Market Capitalization' for each knife skin is calculated as: MCap = Number of Listings * Minimum Price. The sum of these MCaps at any point in time forms the index value. To ensure robustness, safety measures may force the index value to diverge from the pure sum of all MCaps.",
    indexesConstruction: ['Most traded Counter Strike 2 Knives skins'],
    contract: {
      name: shortenAddress('0x6dfe4094599c74a920285a17608ae023d707eed9'),
      url: 'https://sepolia.arbiscan.io/address/0x6dfe4094599c74a920285a17608ae023d707eed9',
    },
    category: CategoryName.CounterStrikeSkins,
  },
  '0x2011d14b00f49cc461958be682bc1443c7fd5d87': {
    marketName: 'Knives vs Rifles - CS2 Skins',
    logo: CsRifleKnifeLogo,
    fullLogo: CsRifleKnifeFull,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    descriptionText:
      "TL;DR -- The ratio of the market cap of the top most commonly traded knife skins to the market cap of the top most commonly traded rifle skins.\n\nThe source of data is the API provided by several skin aggregators.\n\nThis index tracks the ratio between the market cap of knife skins and rifle skins, offering insights into their relative value over time. The methodology is robust and representative, relying on a set of criteria to select the items included in the index. The criteria are as follows:\n\nHighly Traded: The index focuses on the top most traded knife and rifle skins separately. The most traded items are identified by the number of unique listing prices during the analysis period.\n\nMinimum Number of Listings: The index includes only skins (both knives and rifles) with a minimum threshold of listings on all days of the analysis period. This ensures widespread distribution and prevents over-concentration among a few traders. The number of listings per item is set to the minimum observed during the analysis period.\n\nDetermining the Value of Each Item: For both knives and rifles, the value of each skin is derived using two key metrics from the API: Number of Listings and Minimum Price.\n\nNumber of Listings: Reflects the total number of listings across all tracked exchanges, capturing the supply of the item.\n\nMinimum Price: The lowest price among all listings for that item.\n\nThe 'Market Capitalization' for each skin type (knives or rifles) is calculated as: MCap = Number of Listings * Minimum Price. The Knives/Rifles ratio is then calculated as the ratio of the sum of MCaps for knife skins to the sum of MCaps for rifle skins. Additional safety measures may be applied to ensure the robustness of the index, preventing manipulation and maintaining long-term accuracy.",
    indexesConstruction: ['Most traded Counter Strike 2 Rifles skins', 'Most traded Counter Strike 2 Knives skins'],
    contract: {
      name: shortenAddress('0x2011d14b00f49cc461958be682bc1443c7fd5d87'),
      url: 'https://sepolia.arbiscan.io/address/0x2011d14b00f49cc461958be682bc1443c7fd5d87',
    },
    category: CategoryName.CounterStrikeSkins,
  },
  '0x6bd76270a8e8e0c3c030f050134389777a3a7d7e': {
    marketName: 'Counter-Strike 2 Skins',
    logo: csgoLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    proposedBy: {},
    category: CategoryName.CounterStrikeSkins,
  },
  '0x7c65c99ba1edfc94c535b7aa2d72b0f7357a676b': {
    marketName: 'Crypto Volatility Index',
    logo: CVIXLogo,
    disabled: true,
    currency: '',
  },
  '0xf2ddf700fc481be8ce1f228da5c913f1a25a2d2d': {
    marketName: 'ETH Burn Rate',
    logo: BitcoinLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['WETH'],
  },
  '0x553de578e68a4faa55d4522665cb2d2d53390d22': {
    marketName: 'BTC Dominance',
    logo: BtcdLogo,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    // indexesConstruction: ['Chainlink', 'Coinmarketcap', 'Cryptocompare', 'More'],
    // fullLogo: BtcdFull,
    // proposedBy: {name: '@VitalikButermin', url: 'https://twitter.com/VitalikButermin'},
    // approved: {
    //   name: '11.5.24 - OGP 28',
    //   url: 'https://commonwealth.im/overlay/discussion/14675-mint-the-planckcatdao-nft-for-those-who-have-recently-contributed-to-the-overlay-protocol',
    // },
    contract: {
      name: shortenAddress('0x553de578e68a4faa55d4522665cb2d2d53390d22'),
      url: 'https://sepolia.arbiscan.io/address/0x553de578e68a4faa55d4522665cb2d2d53390d22',
    },
    sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
    // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
    descriptionText:
      'TL:DR -- The share of BTC out of the entire crypto market. \n\nThe source of data is the API provided by Chainlink, Coinmarketcap, Cryptocompare, and others.\n\nThe market capitalization of Bitcoin is divided by the market capitalization of the entire crypto market. The result is the Bitcoin Dominance value.',
    category: CategoryName.Crypto,
  },
  '0x56ff2e923e5c05479ac4c47a3d5ed9a204cc673b': {
    marketName: 'BTC Dominance',
    logo: BtcdLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    proposedBy: {},
    category: CategoryName.Crypto,
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
  '0x3a204d03e9b1fee01b8989333665b6c46cc1f79e': {
    marketName: 'ETH Dominance',
    logo: EthDominanceLogo,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    disabled: false,
    contract: {
      name: shortenAddress('0x3a204d03e9b1fee01b8989333665b6c46cc1f79e'),
      url: 'https://sepolia.arbiscan.io/address/0x3a204d03e9b1fee01b8989333665b6c46cc1f79e',
    },
    sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
    // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
    descriptionText:
      'TL:DR -- The share of ETH out of the entire crypto market. \n\nThe source of data is the API provided by Chainlink, Coinmarketcap, Cryptocompare, and others.\n\nThe market capitalization of Ethereum is divided by the market capitalization of the entire crypto market. The result is the Ethereum Dominance value.',
    category: CategoryName.Crypto,
  },
  '0x09e8641df1e963d0bb1267e51579fc2b4e3e60cd': {
    marketName: 'ETH Dominance',
    logo: EthDominanceLogo,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    disabled: false,
    contract: {
      name: shortenAddress('0x09e8641df1e963d0bb1267e51579fc2b4e3e60cd'),
      url: 'https://bartio.beratrail.io/address/0x09e8641df1e963d0bb1267e51579fc2b4e3e60cd',
    },
    sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
    // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
    descriptionText:
      'TL:DR -- The share of ETH out of the entire crypto market. \n\nThe source of data is the API provided by Chainlink, Coinmarketcap, Cryptocompare, and others.\n\nThe market capitalization of Ethereum is divided by the market capitalization of the entire crypto market. The result is the Ethereum Dominance value.',
    category: CategoryName.Crypto,
  },
  '0xc7f3240d983fcab7a571be484d2b4da43b95efee': {
    marketName: 'Bitcoin Frogs',
    logo: BtcFrogsLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['BTC'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'MagicEden'}, {name: 'OKX Marketplace'}, {name: 'More...'}],
    descriptionText: 'The floor (lowest) price of the collection.',
    contract: {
      name: shortenAddress('0xc7f3240d983fcab7a571be484d2b4da43b95efee'),
      url: 'https://sepolia.arbiscan.io/address/0xc7f3240d983fcab7a571be484d2b4da43b95efee',
    },
    category: CategoryName.OrdinalNft,
  },
  '0x3178aa08845c986cc62d8aaaac0ec1fb381d01b3': {
    marketName: 'Bitcoin Frogs',
    logo: BtcFrogsLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['BTC'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'MagicEden'}, {name: 'OKX Marketplace'}, {name: 'More...'}],
    descriptionText: 'The floor (lowest) price of the collection.',
    contract: {
      name: shortenAddress('0x3178aa08845c986cc62d8aaaac0ec1fb381d01b3'),
      url: 'https://bartio.beratrail.io/address/0x3178aa08845c986cc62d8aaaac0ec1fb381d01b3',
    },
    category: CategoryName.OrdinalNft,
  },
  '0xef898dbf4f4d75bdfbdd85f781a6c1bf8edaf0ae': {
    marketName: 'NodeMonkes',
    logo: NodeMonkesLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['BTC'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'MagicEden'}, {name: 'OKX Marketplace'}, {name: 'More...'}],
    descriptionText: 'The floor (lowest) price of the collection.',
    contract: {
      name: shortenAddress('0xef898dbf4f4d75bdfbdd85f781a6c1bf8edaf0ae'),
      url: 'https://sepolia.arbiscan.io/address/0xef898dbf4f4d75bdfbdd85f781a6c1bf8edaf0ae',
    },
    category: CategoryName.OrdinalNft,
  },
  '0xb021eb4489c230234567ca6789e53403310db090': {
    marketName: 'BTC Dominance',
    logo: BtcdLogo,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    // indexesConstruction: ['Chainlink', 'Coinmarketcap', 'Cryptocompare', 'More'],
    // fullLogo: BtcdFull,
    // proposedBy: {name: '@VitalikButermin', url: 'https://twitter.com/VitalikButermin'},
    // approved: {
    //   name: '11.5.24 - OGP 28',
    //   url: 'https://commonwealth.im/overlay/discussion/14675-mint-the-planckcatdao-nft-for-those-who-have-recently-contributed-to-the-overlay-protocol',
    // },
    contract: {
      name: shortenAddress('0xb021eb4489c230234567ca6789e53403310db090'),
      url: 'https://explorer.devnet.imola.movementlabs.xyz/#/account/0x000000000000000000000000b021eb4489c230234567ca6789e53403310db090',
    },
    sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
    // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
    descriptionText:
      'TL:DR -- The share of BTC out of the entire crypto market. \n\nThe source of data is the API provided by Chainlink, Coinmarketcap, Cryptocompare, and others.\n\nThe market capitalization of Bitcoin is divided by the market capitalization of the entire crypto market. The result is the Bitcoin Dominance value.',
    category: CategoryName.Crypto,
  },
  '0xeab2fbdc9d43e785eb4065c8447d872735729aac': {
    marketName: 'ETH Dominance',
    logo: EthDominanceLogo,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    disabled: false,
    contract: {
      name: shortenAddress('0xeab2fbdc9d43e785eb4065c8447d872735729aac'),
      url: 'https://explorer.devnet.imola.movementlabs.xyz/#/account/0x000000000000000000000000eab2fbdc9d43e785eb4065c8447d872735729aac',
    },
    sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
    // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
    category: CategoryName.Crypto,
    descriptionText:
      'TL:DR -- The share of ETH out of the entire crypto market. \n\nThe source of data is the API provided by Chainlink, Coinmarketcap, Cryptocompare, and others.\n\nThe market capitalization of Ethereum is divided by the market capitalization of the entire crypto market. The result is the Ethereum Dominance value.',
  },
  '0x3d47247220d89ad623767de2045dc5e0c5920610': {
    marketName: 'NodeMonkes',
    logo: NodeMonkesLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['BTC'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'MagicEden'}, {name: 'OKX Marketplace'}, {name: 'More...'}],
    descriptionText: 'The floor (lowest) price of the collection.',
    contract: {
      name: shortenAddress('0x3d47247220d89ad623767de2045dc5e0c5920610'),
      url: 'https://bartio.beratrail.io/address/0x3d47247220d89ad623767de2045dc5e0c5920610',
    },
    category: CategoryName.OrdinalNft,
  },
  '0xd9b217fa8a9e8ef1c8558128029564e9a50f284d': {
    marketName: 'BTC Dominance',
    logo: BtcdLogo,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    // indexesConstruction: ['Chainlink', 'Coinmarketcap', 'Cryptocompare', 'More'],
    // fullLogo: BtcdFull,
    // proposedBy: {name: '@VitalikButermin', url: 'https://twitter.com/VitalikButermin'},
    // approved: {
    //   name: '11.5.24 - OGP 28',
    //   url: 'https://commonwealth.im/overlay/discussion/14675-mint-the-planckcatdao-nft-for-those-who-have-recently-contributed-to-the-overlay-protocol',
    // },
    contract: {
      name: shortenAddress('0xd9b217fa8a9e8ef1c8558128029564e9a50f284d'),
      url: 'https://bartio.beratrail.io/address/0xd9b217fa8a9e8ef1c8558128029564e9a50f284d',
    },
    sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
    // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
    category: CategoryName.Crypto,
    descriptionText:
      'TL:DR -- The share of BTC out of the entire crypto market. \n\nThe source of data is the API provided by Chainlink, Coinmarketcap, Cryptocompare, and others.\n\nThe market capitalization of Bitcoin is divided by the market capitalization of the entire crypto market. The result is the Bitcoin Dominance value.',
  },
  '0x4edfb4057f3a448b2704df1a3665db4ae6371b69': {
    marketName: 'Quantum Cats',
    logo: QuantumCatsLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['BTC'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'MagicEden'}, {name: 'OKX Marketplace'}, {name: 'More...'}],
    descriptionText: 'The floor (lowest) price of the collection.',
    contract: {
      name: shortenAddress('0x4edfb4057f3a448b2704df1a3665db4ae6371b69'),
      url: 'https://sepolia.arbiscan.io/address/0x4edfb4057f3a448b2704df1a3665db4ae6371b69',
    },
    category: CategoryName.OrdinalNft,
  },
  '0xb2599445aeb2fa97d5d8d02e70ffb938f3d803ee': {
    marketName: 'Quantum Cats',
    logo: QuantumCatsLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['BTC'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'MagicEden'}, {name: 'OKX Marketplace'}, {name: 'More...'}],
    descriptionText: 'The floor (lowest) price of the collection.',
    contract: {
      name: shortenAddress('0xb2599445aeb2fa97d5d8d02e70ffb938f3d803ee'),
      url: 'https://bartio.beratrail.io/address/0xb2599445aeb2fa97d5d8d02e70ffb938f3d803ee',
    },
    category: CategoryName.OrdinalNft,
  },
  '0xe060ea13b2e710cefc5124bb790db4823b0f602a': {
    marketName: 'Ink',
    logo: InkLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['BTC'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'MagicEden'}, {name: 'OKX Marketplace'}, {name: 'More...'}],
    descriptionText: 'The floor (lowest) price of the collection.',
    contract: {
      name: shortenAddress('0xe060ea13b2e710cefc5124bb790db4823b0f602a'),
      url: 'https://sepolia.arbiscan.io/address/0xe060ea13b2e710cefc5124bb790db4823b0f602a',
    },
    category: CategoryName.OrdinalNft,
  },
  '0x67d54a54d07600ea7ac68a3d5c8b5f5c28510f7d': {
    marketName: 'Ink',
    logo: InkLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['BTC'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'MagicEden'}, {name: 'OKX Marketplace'}, {name: 'More...'}],
    descriptionText: 'The floor (lowest) price of the collection.',
    contract: {
      name: shortenAddress('0x67d54a54d07600ea7ac68a3d5c8b5f5c28510f7d'),
      url: 'https://bartio.beratrail.io/address/0x67d54a54d07600ea7ac68a3d5c8b5f5c28510f7d',
    },
    category: CategoryName.OrdinalNft,
  },
  // '0x8340f2cd37dd22c9c8b2b8e2e77c5e8c27d99fe6': {
  //   marketName: 'Flippening',
  //   logo: FlippeningLogo,
  //   currency: '',
  //   disabled: false,
  //   contract: {
  //     name: shortenAddress('0x8340f2cd37dd22c9c8b2b8e2e77c5e8c27d99fe6'),
  //     url: 'https://sepolia.arbiscan.io/address/0x8340f2cd37dd22c9c8b2b8e2e77c5e8c27d99fe6',
  //   },
  //   sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
  //   // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
  //   descriptionText:
  //     "TL;DR -- The Bitcoin market capitalization divided by the Ethereum market capitalization. \n\nThe Flippening... will it ever happen? Will Ethereum ever take the #1 spot as the biggest blockchain? It's already happened for total transactions and transactions fees. But for the market cap? Obviously that's the only thing that matters. \n\nData is sourced from Chainlink, Coinmarketcap, Cryptocompare, and others.",
  // },
  '0x770e3a8afc5c01855b5bd8eb5b96b23bd7af1e43': {
    marketName: 'Electric Vehicle Commodity Index',
    logo: EvIndexLogo,
    oracleLogo: ORACLE_LOGO[FeedType.TRUFLATION],
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    descriptionText:
      'TL:DR -- Benchmark for tracking the price movements of essential commodities in the production of electric vehicles (EVs).\n\nSummary:\n- Benchmarking key commodities used in EV production\n- Insights into supply chain dynamics and cost trends\n- Reflecting the evolving landscape of the EV market\n\nData Sources & Compliance:\n- Blend of market exchanges, research firms, and direct manufacturer data\n- Ensuring depth and accuracy in market representation\n- In process of becoming compliant with IOSCO standards\n- Oversight committee for continuous review and integrity\n- Regular audits and stakeholder engagement for transparency',
    indexesConstruction: [
      'Step 1: Metal Intensity Adjustment',
      'Step 2: Vehicle Type Weighting',
      'Step 3: Production data adjustment',
      'Step 4: Daily Index Calculation',
    ],
    sources: [{name: 'Truflation', url: 'https://truflation.com/marketplace/ev-index'}],
    contract: {
      name: shortenAddress('0x770e3a8afc5c01855b5bd8eb5b96b23bd7af1e43'),
      url: 'https://sepolia.arbiscan.io/address/0x770e3a8afc5c01855b5bd8eb5b96b23bd7af1e43',
    },
    fullLogo: EvIndexFull,
  },
  '0xad90fff9d159e18cec2048dd6881e29886e4899e': {
    marketName: 'AI Index',
    logo: AIIndexLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'Uniswap'}, {name: 'Kucoin'}, {name: 'Others'}],
    descriptionText:
      'TL;DR -- The market cap of the top AI related protocols on crypto.\n\nThe source of data is the API provided by Coinmarketcap, Cryptocompare, supplemented by Uniswap, Kucoin, and others.\n\nThe following projects are cap-weighted in this index:\n- Render\n- Bittensor\n- Fetch.ai\n- SingularityNET\n- Akash Network\n- AIOZ Network\n- Ocean Protocol\n- Arkham\n- PAAL AI\n- OriginTrail',
    contract: {
      name: shortenAddress('0xad90fff9d159e18cec2048dd6881e29886e4899e'),
      url: 'https://sepolia.arbiscan.io/address/0xad90fff9d159e18cec2048dd6881e29886e4899e',
    },
    fullLogo: AIIndexFull,
    category: CategoryName.Crypto,
  },
  '0x1c66ae94c7dd18935f1e723d6395dac27905ab0c': {
    marketName: 'AI Index',
    logo: AIIndexLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    sources: [{name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'Uniswap'}, {name: 'Kucoin'}, {name: 'Others'}],
    descriptionText:
      'TL;DR -- The market cap of the top AI related protocols on crypto.\n\nThe source of data is the API provided by Coinmarketcap, Cryptocompare, supplemented by Uniswap, Kucoin, and others.\n\nThe following projects are cap-weighted in this index:\n- Render\n- Bittensor\n- Fetch.ai\n- SingularityNET\n- Akash Network\n- AIOZ Network\n- Ocean Protocol\n- Arkham\n- PAAL AI\n- OriginTrail',
    contract: {
      name: shortenAddress('0x1c66ae94c7dd18935f1e723d6395dac27905ab0c'),
      url: 'https://bartio.beratrail.io/address/0x1c66ae94c7dd18935f1e723d6395dac27905ab0c',
    },
    fullLogo: AIIndexFull,
    category: CategoryName.Crypto,
  },
  '0x3966f792517e2df998c48301163c2a95bfd3eff8': {
    marketName: 'ETH / SOL',
    logo: EthSolLogo,
    currency: '',
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.PYTH],
    sources: [{name: 'Pyth Network'}],
    descriptionText: 'TL;DR - ETH price divided by SOL price\n\nThe source of data is the API provided by Pyth Network',
    contract: {
      name: shortenAddress('0x3966f792517e2df998c48301163c2a95bfd3eff8'),
      url: 'https://sepolia.arbiscan.io/address/0x3966f792517e2df998c48301163c2a95bfd3eff8',
    },
    category: CategoryName.Crypto,
  },
  '0x9d32d77c2213a5ff7b6e52669d32752cc092ff40': {
    marketName: 'ETH / SOL',
    logo: EthSolLogo,
    currency: '',
    disabled: false,
    oracleLogo: ORACLE_LOGO[FeedType.PYTH],
    sources: [{name: 'Pyth Network'}],
    descriptionText: 'TL;DR - ETH price divided by SOL price\n\nThe source of data is the API provided by Pyth Network',
    contract: {
      name: shortenAddress('0x9d32d77c2213a5ff7b6e52669d32752cc092ff40'),
      url: 'https://bartio.beratrail.io/address/0x9d32d77c2213a5ff7b6e52669d32752cc092ff40',
    },
    category: CategoryName.Crypto,
  },
}

type ComingSoonMarketsData = MarketDetailsData & {
  isComingSoon?: boolean
}

export const ComingSoonMarkets: {[address: string]: ComingSoonMarketsData} = {
  '3331': {
    marketName: 'OV Supply',
    logo: OVSupplyLogo,
    currency: '', // currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    disabled: true,
    isComingSoon: true,
  },
  '3332': {
    marketName: 'Milady Floor Price',
    logo: MiladyLogo,
    currency: '', // currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    disabled: true,
    isComingSoon: true,
  },
  '3335': {
    marketName: 'ETH Burn Rate',
    logo: EthBurnLogo,
    currency: '', // currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    disabled: true,
    isComingSoon: true,
  },
  '3338': {
    marketName: 'Eth Volatility Index',
    logo: EthVixLogo,
    currency: '', // currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    disabled: true,
    isComingSoon: true,
  },
}
