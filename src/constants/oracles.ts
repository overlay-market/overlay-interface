import ChainlinkOracleLogo from '../assets/images/oracle-type-chainlink.png'
import UniswapOracleLogo from '../assets/images/oracle-type-uniswap.png'
import NFTPerpOracleLogo from '../assets/images/oracle-type-nftperp.png'
import OverlayOracleLogo from '../assets/images/oracle-type-overlay.png'
import TruflationOracleLogo from '../assets/images/oracle-type-truflation.png'
import PythOracleLogo from '../assets/images/oracle-type-pyth.png'

export type OracleMap = {[feedType: string]: string}

export enum FeedType {
  CHAINLINK = 'Chainlink',
  UNISWAP = 'Uniswap',
  NFTPERP = 'NFTPerp',
  OVERLAY = 'Overlay',
  TRUFLATION = 'Truflation',
  PYTH = 'Pyth Network',
}

export const ORACLE_LOGO: OracleMap = {
  [FeedType.CHAINLINK]: ChainlinkOracleLogo,
  [FeedType.UNISWAP]: UniswapOracleLogo,
  [FeedType.NFTPERP]: NFTPerpOracleLogo,
  [FeedType.OVERLAY]: OverlayOracleLogo,
  [FeedType.TRUFLATION]: TruflationOracleLogo,
  [FeedType.PYTH]: PythOracleLogo,
}
