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
}

export const MarketDetails: {[address: string]: MarketDetailsData} = {
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
  },
  '0x6bd76270a8e8e0c3c030f050134389777a3a7d7e': {
    marketName: 'Counter-Strike 2 Skins',
    logo: csgoLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['USD'],
    proposedBy: {},
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
  },
  '0x56ff2e923e5c05479ac4c47a3d5ed9a204cc673b': {
    marketName: 'BTC Dominance',
    logo: BtcdLogo,
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    proposedBy: {},
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
      url: 'https://explorer.testnet.imola.movementlabs.xyz/#/account/0x000000000000000000000000b021eb4489c230234567ca6789e53403310db090',
    },
    sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
    // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
    descriptionText:
      'TL:DR -- The share of BTC out of the entire crypto market. \n\nThe source of data is the API provided by Chainlink, Coinmarketcap, Cryptocompare, and others.\n\nThe market capitalization of Bitcoin is divided by the market capitalization of the entire crypto market. The result is the Bitcoin Dominance value.',
  },
  '0xeab2fbdc9d43e785eb4065c8447d872735729aac': {
    marketName: 'ETH Dominance',
    logo: EthDominanceLogo,
    oracleLogo: ORACLE_LOGO[FeedType.OVERLAY],
    currency: PRICE_CURRENCY_FROM_QUOTE['PERCENTAGE'],
    disabled: false,
    contract: {
      name: shortenAddress('0xeab2fbdc9d43e785eb4065c8447d872735729aac'),
      url: 'https://explorer.testnet.imola.movementlabs.xyz/#/account/0x000000000000000000000000eab2fbdc9d43e785eb4065c8447d872735729aac',
    },
    sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
    // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
    descriptionText:
      'TL:DR -- The share of ETH out of the entire crypto market. \n\nThe source of data is the API provided by Chainlink, Coinmarketcap, Cryptocompare, and others.\n\nThe market capitalization of Ethereum is divided by the market capitalization of the entire crypto market. The result is the Ethereum Dominance value.',
  },
  '0x796cc71ad083e27675530d9acb1ad1632c66ee5a': {
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
      name: shortenAddress('0x796cc71ad083e27675530d9acb1ad1632c66ee5a'),
      url: 'https://bartio.beratrail.io/address/0x796cc71ad083e27675530d9acb1ad1632c66ee5a',
    },
    sources: [{name: 'Chainlink'}, {name: 'Coinmarketcap'}, {name: 'Cryptocompare'}, {name: 'More...'}],
    // additionalInfo: {name: 'docs.overlay.market', url: 'https://docs.overlay.market/'},
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
    disabled: false,
    isComingSoon: true,
  },
  '3332': {
    marketName: 'Milady Floor Price',
    logo: MiladyLogo,
    currency: '', // currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    disabled: false,
    isComingSoon: true,
  },
  '3335': {
    marketName: 'ETH Burn Rate',
    logo: EthBurnLogo,
    currency: '', // currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    disabled: false,
    isComingSoon: true,
  },
  '3338': {
    marketName: 'Eth Volatility Index',
    logo: EthVixLogo,
    currency: '', // currency: PRICE_CURRENCY_FROM_QUOTE['ETH'],
    disabled: false,
    isComingSoon: true,
  },
}
