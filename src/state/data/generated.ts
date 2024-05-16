import {api} from './slice'
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: any
  BigInt: any
  Bytes: any
  /**
   * 8 bytes signed integer
   *
   */
  Int8: any
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: any
}

export type Account = {
  __typename?: 'Account'
  id: Scalars['ID']
  realizedPnl: Scalars['BigInt']
  numberOfUnwinds: Scalars['BigInt']
  numberOfLiquidatedPositions: Scalars['BigInt']
  numberOfOpenPositions: Scalars['BigInt']
  planckCatBalance: Scalars['BigInt']
  ovlVolumeTraded: Scalars['BigInt']
  positions: Array<Position>
  builds: Array<Build>
  unwinds: Array<Unwind>
  liquidates: Array<Liquidate>
  stakingPositions: Array<StakingPosition>
  referralPositions: Array<ReferralPosition>
  tradingMiningEpochVolumes: Array<TradingMiningEpochVolume>
  tokens: Array<TokenPosition>
  nfts: Array<Erc721Nft>
}

export type AccountPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Position_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Position_Filter>
}

export type AccountBuildsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Build_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Build_Filter>
}

export type AccountUnwindsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Unwind_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Unwind_Filter>
}

export type AccountLiquidatesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Liquidate_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Liquidate_Filter>
}

export type AccountStakingPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<StakingPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<StakingPosition_Filter>
}

export type AccountReferralPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ReferralPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<ReferralPosition_Filter>
}

export type AccountTradingMiningEpochVolumesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TradingMiningEpochVolume_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TradingMiningEpochVolume_Filter>
}

export type AccountTokensArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokenPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokenPosition_Filter>
}

export type AccountNftsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Erc721Nft_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Erc721Nft_Filter>
}

export type Account_Filter = {
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_lt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  realizedPnl?: Maybe<Scalars['BigInt']>
  realizedPnl_not?: Maybe<Scalars['BigInt']>
  realizedPnl_gt?: Maybe<Scalars['BigInt']>
  realizedPnl_lt?: Maybe<Scalars['BigInt']>
  realizedPnl_gte?: Maybe<Scalars['BigInt']>
  realizedPnl_lte?: Maybe<Scalars['BigInt']>
  realizedPnl_in?: Maybe<Array<Scalars['BigInt']>>
  realizedPnl_not_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfUnwinds?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_not?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_gt?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_lt?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_gte?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_lte?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfUnwinds_not_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfLiquidatedPositions?: Maybe<Scalars['BigInt']>
  numberOfLiquidatedPositions_not?: Maybe<Scalars['BigInt']>
  numberOfLiquidatedPositions_gt?: Maybe<Scalars['BigInt']>
  numberOfLiquidatedPositions_lt?: Maybe<Scalars['BigInt']>
  numberOfLiquidatedPositions_gte?: Maybe<Scalars['BigInt']>
  numberOfLiquidatedPositions_lte?: Maybe<Scalars['BigInt']>
  numberOfLiquidatedPositions_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfLiquidatedPositions_not_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfOpenPositions?: Maybe<Scalars['BigInt']>
  numberOfOpenPositions_not?: Maybe<Scalars['BigInt']>
  numberOfOpenPositions_gt?: Maybe<Scalars['BigInt']>
  numberOfOpenPositions_lt?: Maybe<Scalars['BigInt']>
  numberOfOpenPositions_gte?: Maybe<Scalars['BigInt']>
  numberOfOpenPositions_lte?: Maybe<Scalars['BigInt']>
  numberOfOpenPositions_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfOpenPositions_not_in?: Maybe<Array<Scalars['BigInt']>>
  planckCatBalance?: Maybe<Scalars['BigInt']>
  planckCatBalance_not?: Maybe<Scalars['BigInt']>
  planckCatBalance_gt?: Maybe<Scalars['BigInt']>
  planckCatBalance_lt?: Maybe<Scalars['BigInt']>
  planckCatBalance_gte?: Maybe<Scalars['BigInt']>
  planckCatBalance_lte?: Maybe<Scalars['BigInt']>
  planckCatBalance_in?: Maybe<Array<Scalars['BigInt']>>
  planckCatBalance_not_in?: Maybe<Array<Scalars['BigInt']>>
  ovlVolumeTraded?: Maybe<Scalars['BigInt']>
  ovlVolumeTraded_not?: Maybe<Scalars['BigInt']>
  ovlVolumeTraded_gt?: Maybe<Scalars['BigInt']>
  ovlVolumeTraded_lt?: Maybe<Scalars['BigInt']>
  ovlVolumeTraded_gte?: Maybe<Scalars['BigInt']>
  ovlVolumeTraded_lte?: Maybe<Scalars['BigInt']>
  ovlVolumeTraded_in?: Maybe<Array<Scalars['BigInt']>>
  ovlVolumeTraded_not_in?: Maybe<Array<Scalars['BigInt']>>
  positions_?: Maybe<Position_Filter>
  builds_?: Maybe<Build_Filter>
  unwinds_?: Maybe<Unwind_Filter>
  liquidates_?: Maybe<Liquidate_Filter>
  stakingPositions_?: Maybe<StakingPosition_Filter>
  referralPositions_?: Maybe<ReferralPosition_Filter>
  tradingMiningEpochVolumes_?: Maybe<TradingMiningEpochVolume_Filter>
  tokens_?: Maybe<TokenPosition_Filter>
  nfts_?: Maybe<Erc721Nft_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Account_Filter>>>
  or?: Maybe<Array<Maybe<Account_Filter>>>
}

export enum Account_OrderBy {
  Id = 'id',
  RealizedPnl = 'realizedPnl',
  NumberOfUnwinds = 'numberOfUnwinds',
  NumberOfLiquidatedPositions = 'numberOfLiquidatedPositions',
  NumberOfOpenPositions = 'numberOfOpenPositions',
  PlanckCatBalance = 'planckCatBalance',
  OvlVolumeTraded = 'ovlVolumeTraded',
  Positions = 'positions',
  Builds = 'builds',
  Unwinds = 'unwinds',
  Liquidates = 'liquidates',
  StakingPositions = 'stakingPositions',
  ReferralPositions = 'referralPositions',
  TradingMiningEpochVolumes = 'tradingMiningEpochVolumes',
  Tokens = 'tokens',
  Nfts = 'nfts',
}

export enum Aggregation_Interval {
  Hour = 'hour',
  Day = 'day',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>
  number?: Maybe<Scalars['Int']>
  number_gte?: Maybe<Scalars['Int']>
}

export type Build = {
  __typename?: 'Build'
  id: Scalars['ID']
  owner: Account
  position: Position
  currentOi: Scalars['BigInt']
  currentDebt: Scalars['BigInt']
  isLong: Scalars['Boolean']
  price: Scalars['BigInt']
  feeAmount: Scalars['BigInt']
  collateral: Scalars['BigInt']
  value: Scalars['BigInt']
  timestamp: Scalars['BigInt']
  transaction: Transaction
}

export type Build_Filter = {
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_lt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  owner?: Maybe<Scalars['String']>
  owner_not?: Maybe<Scalars['String']>
  owner_gt?: Maybe<Scalars['String']>
  owner_lt?: Maybe<Scalars['String']>
  owner_gte?: Maybe<Scalars['String']>
  owner_lte?: Maybe<Scalars['String']>
  owner_in?: Maybe<Array<Scalars['String']>>
  owner_not_in?: Maybe<Array<Scalars['String']>>
  owner_contains?: Maybe<Scalars['String']>
  owner_contains_nocase?: Maybe<Scalars['String']>
  owner_not_contains?: Maybe<Scalars['String']>
  owner_not_contains_nocase?: Maybe<Scalars['String']>
  owner_starts_with?: Maybe<Scalars['String']>
  owner_starts_with_nocase?: Maybe<Scalars['String']>
  owner_not_starts_with?: Maybe<Scalars['String']>
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>
  owner_ends_with?: Maybe<Scalars['String']>
  owner_ends_with_nocase?: Maybe<Scalars['String']>
  owner_not_ends_with?: Maybe<Scalars['String']>
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner_?: Maybe<Account_Filter>
  position?: Maybe<Scalars['String']>
  position_not?: Maybe<Scalars['String']>
  position_gt?: Maybe<Scalars['String']>
  position_lt?: Maybe<Scalars['String']>
  position_gte?: Maybe<Scalars['String']>
  position_lte?: Maybe<Scalars['String']>
  position_in?: Maybe<Array<Scalars['String']>>
  position_not_in?: Maybe<Array<Scalars['String']>>
  position_contains?: Maybe<Scalars['String']>
  position_contains_nocase?: Maybe<Scalars['String']>
  position_not_contains?: Maybe<Scalars['String']>
  position_not_contains_nocase?: Maybe<Scalars['String']>
  position_starts_with?: Maybe<Scalars['String']>
  position_starts_with_nocase?: Maybe<Scalars['String']>
  position_not_starts_with?: Maybe<Scalars['String']>
  position_not_starts_with_nocase?: Maybe<Scalars['String']>
  position_ends_with?: Maybe<Scalars['String']>
  position_ends_with_nocase?: Maybe<Scalars['String']>
  position_not_ends_with?: Maybe<Scalars['String']>
  position_not_ends_with_nocase?: Maybe<Scalars['String']>
  position_?: Maybe<Position_Filter>
  currentOi?: Maybe<Scalars['BigInt']>
  currentOi_not?: Maybe<Scalars['BigInt']>
  currentOi_gt?: Maybe<Scalars['BigInt']>
  currentOi_lt?: Maybe<Scalars['BigInt']>
  currentOi_gte?: Maybe<Scalars['BigInt']>
  currentOi_lte?: Maybe<Scalars['BigInt']>
  currentOi_in?: Maybe<Array<Scalars['BigInt']>>
  currentOi_not_in?: Maybe<Array<Scalars['BigInt']>>
  currentDebt?: Maybe<Scalars['BigInt']>
  currentDebt_not?: Maybe<Scalars['BigInt']>
  currentDebt_gt?: Maybe<Scalars['BigInt']>
  currentDebt_lt?: Maybe<Scalars['BigInt']>
  currentDebt_gte?: Maybe<Scalars['BigInt']>
  currentDebt_lte?: Maybe<Scalars['BigInt']>
  currentDebt_in?: Maybe<Array<Scalars['BigInt']>>
  currentDebt_not_in?: Maybe<Array<Scalars['BigInt']>>
  isLong?: Maybe<Scalars['Boolean']>
  isLong_not?: Maybe<Scalars['Boolean']>
  isLong_in?: Maybe<Array<Scalars['Boolean']>>
  isLong_not_in?: Maybe<Array<Scalars['Boolean']>>
  price?: Maybe<Scalars['BigInt']>
  price_not?: Maybe<Scalars['BigInt']>
  price_gt?: Maybe<Scalars['BigInt']>
  price_lt?: Maybe<Scalars['BigInt']>
  price_gte?: Maybe<Scalars['BigInt']>
  price_lte?: Maybe<Scalars['BigInt']>
  price_in?: Maybe<Array<Scalars['BigInt']>>
  price_not_in?: Maybe<Array<Scalars['BigInt']>>
  feeAmount?: Maybe<Scalars['BigInt']>
  feeAmount_not?: Maybe<Scalars['BigInt']>
  feeAmount_gt?: Maybe<Scalars['BigInt']>
  feeAmount_lt?: Maybe<Scalars['BigInt']>
  feeAmount_gte?: Maybe<Scalars['BigInt']>
  feeAmount_lte?: Maybe<Scalars['BigInt']>
  feeAmount_in?: Maybe<Array<Scalars['BigInt']>>
  feeAmount_not_in?: Maybe<Array<Scalars['BigInt']>>
  collateral?: Maybe<Scalars['BigInt']>
  collateral_not?: Maybe<Scalars['BigInt']>
  collateral_gt?: Maybe<Scalars['BigInt']>
  collateral_lt?: Maybe<Scalars['BigInt']>
  collateral_gte?: Maybe<Scalars['BigInt']>
  collateral_lte?: Maybe<Scalars['BigInt']>
  collateral_in?: Maybe<Array<Scalars['BigInt']>>
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>
  value?: Maybe<Scalars['BigInt']>
  value_not?: Maybe<Scalars['BigInt']>
  value_gt?: Maybe<Scalars['BigInt']>
  value_lt?: Maybe<Scalars['BigInt']>
  value_gte?: Maybe<Scalars['BigInt']>
  value_lte?: Maybe<Scalars['BigInt']>
  value_in?: Maybe<Array<Scalars['BigInt']>>
  value_not_in?: Maybe<Array<Scalars['BigInt']>>
  timestamp?: Maybe<Scalars['BigInt']>
  timestamp_not?: Maybe<Scalars['BigInt']>
  timestamp_gt?: Maybe<Scalars['BigInt']>
  timestamp_lt?: Maybe<Scalars['BigInt']>
  timestamp_gte?: Maybe<Scalars['BigInt']>
  timestamp_lte?: Maybe<Scalars['BigInt']>
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  transaction?: Maybe<Scalars['String']>
  transaction_not?: Maybe<Scalars['String']>
  transaction_gt?: Maybe<Scalars['String']>
  transaction_lt?: Maybe<Scalars['String']>
  transaction_gte?: Maybe<Scalars['String']>
  transaction_lte?: Maybe<Scalars['String']>
  transaction_in?: Maybe<Array<Scalars['String']>>
  transaction_not_in?: Maybe<Array<Scalars['String']>>
  transaction_contains?: Maybe<Scalars['String']>
  transaction_contains_nocase?: Maybe<Scalars['String']>
  transaction_not_contains?: Maybe<Scalars['String']>
  transaction_not_contains_nocase?: Maybe<Scalars['String']>
  transaction_starts_with?: Maybe<Scalars['String']>
  transaction_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_not_starts_with?: Maybe<Scalars['String']>
  transaction_not_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_ends_with?: Maybe<Scalars['String']>
  transaction_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_not_ends_with?: Maybe<Scalars['String']>
  transaction_not_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_?: Maybe<Transaction_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Build_Filter>>>
  or?: Maybe<Array<Maybe<Build_Filter>>>
}

export enum Build_OrderBy {
  Id = 'id',
  Owner = 'owner',
  OwnerId = 'owner__id',
  OwnerRealizedPnl = 'owner__realizedPnl',
  OwnerNumberOfUnwinds = 'owner__numberOfUnwinds',
  OwnerNumberOfLiquidatedPositions = 'owner__numberOfLiquidatedPositions',
  OwnerNumberOfOpenPositions = 'owner__numberOfOpenPositions',
  OwnerPlanckCatBalance = 'owner__planckCatBalance',
  OwnerOvlVolumeTraded = 'owner__ovlVolumeTraded',
  Position = 'position',
  PositionId = 'position__id',
  PositionPositionId = 'position__positionId',
  PositionInitialOi = 'position__initialOi',
  PositionInitialDebt = 'position__initialDebt',
  PositionInitialCollateral = 'position__initialCollateral',
  PositionInitialNotional = 'position__initialNotional',
  PositionLeverage = 'position__leverage',
  PositionFractionUnwound = 'position__fractionUnwound',
  PositionIsLong = 'position__isLong',
  PositionEntryPrice = 'position__entryPrice',
  PositionIsLiquidated = 'position__isLiquidated',
  PositionCurrentOi = 'position__currentOi',
  PositionCurrentDebt = 'position__currentDebt',
  PositionMint = 'position__mint',
  PositionCreatedAtTimestamp = 'position__createdAtTimestamp',
  PositionCreatedAtBlockNumber = 'position__createdAtBlockNumber',
  PositionNumberOfUniwnds = 'position__numberOfUniwnds',
  CurrentOi = 'currentOi',
  CurrentDebt = 'currentDebt',
  IsLong = 'isLong',
  Price = 'price',
  FeeAmount = 'feeAmount',
  Collateral = 'collateral',
  Value = 'value',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionId = 'transaction__id',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
}

export type Erc20Token = {
  __typename?: 'ERC20Token'
  id: Scalars['Bytes']
  totalSupply: Scalars['BigInt']
  name: Scalars['String']
  symbol: Scalars['String']
}

export type Erc20Token_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  totalSupply?: Maybe<Scalars['BigInt']>
  totalSupply_not?: Maybe<Scalars['BigInt']>
  totalSupply_gt?: Maybe<Scalars['BigInt']>
  totalSupply_lt?: Maybe<Scalars['BigInt']>
  totalSupply_gte?: Maybe<Scalars['BigInt']>
  totalSupply_lte?: Maybe<Scalars['BigInt']>
  totalSupply_in?: Maybe<Array<Scalars['BigInt']>>
  totalSupply_not_in?: Maybe<Array<Scalars['BigInt']>>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_gt?: Maybe<Scalars['String']>
  name_lt?: Maybe<Scalars['String']>
  name_gte?: Maybe<Scalars['String']>
  name_lte?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_contains?: Maybe<Scalars['String']>
  name_contains_nocase?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_not_contains_nocase?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_starts_with_nocase?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with_nocase?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_ends_with_nocase?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with_nocase?: Maybe<Scalars['String']>
  symbol?: Maybe<Scalars['String']>
  symbol_not?: Maybe<Scalars['String']>
  symbol_gt?: Maybe<Scalars['String']>
  symbol_lt?: Maybe<Scalars['String']>
  symbol_gte?: Maybe<Scalars['String']>
  symbol_lte?: Maybe<Scalars['String']>
  symbol_in?: Maybe<Array<Scalars['String']>>
  symbol_not_in?: Maybe<Array<Scalars['String']>>
  symbol_contains?: Maybe<Scalars['String']>
  symbol_contains_nocase?: Maybe<Scalars['String']>
  symbol_not_contains?: Maybe<Scalars['String']>
  symbol_not_contains_nocase?: Maybe<Scalars['String']>
  symbol_starts_with?: Maybe<Scalars['String']>
  symbol_starts_with_nocase?: Maybe<Scalars['String']>
  symbol_not_starts_with?: Maybe<Scalars['String']>
  symbol_not_starts_with_nocase?: Maybe<Scalars['String']>
  symbol_ends_with?: Maybe<Scalars['String']>
  symbol_ends_with_nocase?: Maybe<Scalars['String']>
  symbol_not_ends_with?: Maybe<Scalars['String']>
  symbol_not_ends_with_nocase?: Maybe<Scalars['String']>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Erc20Token_Filter>>>
  or?: Maybe<Array<Maybe<Erc20Token_Filter>>>
}

export enum Erc20Token_OrderBy {
  Id = 'id',
  TotalSupply = 'totalSupply',
  Name = 'name',
  Symbol = 'symbol',
}

export type Erc721Nft = {
  __typename?: 'ERC721NFT'
  id: Scalars['Bytes']
  contract: Erc721Token
  tokenId: Scalars['BigInt']
  tokenUri: Scalars['String']
  owner: Account
}

export type Erc721Nft_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  contract?: Maybe<Scalars['String']>
  contract_not?: Maybe<Scalars['String']>
  contract_gt?: Maybe<Scalars['String']>
  contract_lt?: Maybe<Scalars['String']>
  contract_gte?: Maybe<Scalars['String']>
  contract_lte?: Maybe<Scalars['String']>
  contract_in?: Maybe<Array<Scalars['String']>>
  contract_not_in?: Maybe<Array<Scalars['String']>>
  contract_contains?: Maybe<Scalars['String']>
  contract_contains_nocase?: Maybe<Scalars['String']>
  contract_not_contains?: Maybe<Scalars['String']>
  contract_not_contains_nocase?: Maybe<Scalars['String']>
  contract_starts_with?: Maybe<Scalars['String']>
  contract_starts_with_nocase?: Maybe<Scalars['String']>
  contract_not_starts_with?: Maybe<Scalars['String']>
  contract_not_starts_with_nocase?: Maybe<Scalars['String']>
  contract_ends_with?: Maybe<Scalars['String']>
  contract_ends_with_nocase?: Maybe<Scalars['String']>
  contract_not_ends_with?: Maybe<Scalars['String']>
  contract_not_ends_with_nocase?: Maybe<Scalars['String']>
  contract_?: Maybe<Erc721Token_Filter>
  tokenId?: Maybe<Scalars['BigInt']>
  tokenId_not?: Maybe<Scalars['BigInt']>
  tokenId_gt?: Maybe<Scalars['BigInt']>
  tokenId_lt?: Maybe<Scalars['BigInt']>
  tokenId_gte?: Maybe<Scalars['BigInt']>
  tokenId_lte?: Maybe<Scalars['BigInt']>
  tokenId_in?: Maybe<Array<Scalars['BigInt']>>
  tokenId_not_in?: Maybe<Array<Scalars['BigInt']>>
  tokenUri?: Maybe<Scalars['String']>
  tokenUri_not?: Maybe<Scalars['String']>
  tokenUri_gt?: Maybe<Scalars['String']>
  tokenUri_lt?: Maybe<Scalars['String']>
  tokenUri_gte?: Maybe<Scalars['String']>
  tokenUri_lte?: Maybe<Scalars['String']>
  tokenUri_in?: Maybe<Array<Scalars['String']>>
  tokenUri_not_in?: Maybe<Array<Scalars['String']>>
  tokenUri_contains?: Maybe<Scalars['String']>
  tokenUri_contains_nocase?: Maybe<Scalars['String']>
  tokenUri_not_contains?: Maybe<Scalars['String']>
  tokenUri_not_contains_nocase?: Maybe<Scalars['String']>
  tokenUri_starts_with?: Maybe<Scalars['String']>
  tokenUri_starts_with_nocase?: Maybe<Scalars['String']>
  tokenUri_not_starts_with?: Maybe<Scalars['String']>
  tokenUri_not_starts_with_nocase?: Maybe<Scalars['String']>
  tokenUri_ends_with?: Maybe<Scalars['String']>
  tokenUri_ends_with_nocase?: Maybe<Scalars['String']>
  tokenUri_not_ends_with?: Maybe<Scalars['String']>
  tokenUri_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner?: Maybe<Scalars['String']>
  owner_not?: Maybe<Scalars['String']>
  owner_gt?: Maybe<Scalars['String']>
  owner_lt?: Maybe<Scalars['String']>
  owner_gte?: Maybe<Scalars['String']>
  owner_lte?: Maybe<Scalars['String']>
  owner_in?: Maybe<Array<Scalars['String']>>
  owner_not_in?: Maybe<Array<Scalars['String']>>
  owner_contains?: Maybe<Scalars['String']>
  owner_contains_nocase?: Maybe<Scalars['String']>
  owner_not_contains?: Maybe<Scalars['String']>
  owner_not_contains_nocase?: Maybe<Scalars['String']>
  owner_starts_with?: Maybe<Scalars['String']>
  owner_starts_with_nocase?: Maybe<Scalars['String']>
  owner_not_starts_with?: Maybe<Scalars['String']>
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>
  owner_ends_with?: Maybe<Scalars['String']>
  owner_ends_with_nocase?: Maybe<Scalars['String']>
  owner_not_ends_with?: Maybe<Scalars['String']>
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner_?: Maybe<Account_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Erc721Nft_Filter>>>
  or?: Maybe<Array<Maybe<Erc721Nft_Filter>>>
}

export enum Erc721Nft_OrderBy {
  Id = 'id',
  Contract = 'contract',
  ContractId = 'contract__id',
  ContractName = 'contract__name',
  ContractSymbol = 'contract__symbol',
  ContractTotalSupply = 'contract__totalSupply',
  TokenId = 'tokenId',
  TokenUri = 'tokenUri',
  Owner = 'owner',
  OwnerId = 'owner__id',
  OwnerRealizedPnl = 'owner__realizedPnl',
  OwnerNumberOfUnwinds = 'owner__numberOfUnwinds',
  OwnerNumberOfLiquidatedPositions = 'owner__numberOfLiquidatedPositions',
  OwnerNumberOfOpenPositions = 'owner__numberOfOpenPositions',
  OwnerPlanckCatBalance = 'owner__planckCatBalance',
  OwnerOvlVolumeTraded = 'owner__ovlVolumeTraded',
}

export type Erc721Token = {
  __typename?: 'ERC721Token'
  id: Scalars['Bytes']
  name: Scalars['String']
  symbol: Scalars['String']
  totalSupply: Scalars['BigInt']
}

export type Erc721Token_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_gt?: Maybe<Scalars['String']>
  name_lt?: Maybe<Scalars['String']>
  name_gte?: Maybe<Scalars['String']>
  name_lte?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_contains?: Maybe<Scalars['String']>
  name_contains_nocase?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_not_contains_nocase?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_starts_with_nocase?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with_nocase?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_ends_with_nocase?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with_nocase?: Maybe<Scalars['String']>
  symbol?: Maybe<Scalars['String']>
  symbol_not?: Maybe<Scalars['String']>
  symbol_gt?: Maybe<Scalars['String']>
  symbol_lt?: Maybe<Scalars['String']>
  symbol_gte?: Maybe<Scalars['String']>
  symbol_lte?: Maybe<Scalars['String']>
  symbol_in?: Maybe<Array<Scalars['String']>>
  symbol_not_in?: Maybe<Array<Scalars['String']>>
  symbol_contains?: Maybe<Scalars['String']>
  symbol_contains_nocase?: Maybe<Scalars['String']>
  symbol_not_contains?: Maybe<Scalars['String']>
  symbol_not_contains_nocase?: Maybe<Scalars['String']>
  symbol_starts_with?: Maybe<Scalars['String']>
  symbol_starts_with_nocase?: Maybe<Scalars['String']>
  symbol_not_starts_with?: Maybe<Scalars['String']>
  symbol_not_starts_with_nocase?: Maybe<Scalars['String']>
  symbol_ends_with?: Maybe<Scalars['String']>
  symbol_ends_with_nocase?: Maybe<Scalars['String']>
  symbol_not_ends_with?: Maybe<Scalars['String']>
  symbol_not_ends_with_nocase?: Maybe<Scalars['String']>
  totalSupply?: Maybe<Scalars['BigInt']>
  totalSupply_not?: Maybe<Scalars['BigInt']>
  totalSupply_gt?: Maybe<Scalars['BigInt']>
  totalSupply_lt?: Maybe<Scalars['BigInt']>
  totalSupply_gte?: Maybe<Scalars['BigInt']>
  totalSupply_lte?: Maybe<Scalars['BigInt']>
  totalSupply_in?: Maybe<Array<Scalars['BigInt']>>
  totalSupply_not_in?: Maybe<Array<Scalars['BigInt']>>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Erc721Token_Filter>>>
  or?: Maybe<Array<Maybe<Erc721Token_Filter>>>
}

export enum Erc721Token_OrderBy {
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply',
}

export type Erc721Transfer = {
  __typename?: 'ERC721Transfer'
  id: Scalars['Bytes']
  nft: Erc721Nft
  from: Account
  to: Account
  transaction: Transaction
}

export type Erc721Transfer_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  nft?: Maybe<Scalars['String']>
  nft_not?: Maybe<Scalars['String']>
  nft_gt?: Maybe<Scalars['String']>
  nft_lt?: Maybe<Scalars['String']>
  nft_gte?: Maybe<Scalars['String']>
  nft_lte?: Maybe<Scalars['String']>
  nft_in?: Maybe<Array<Scalars['String']>>
  nft_not_in?: Maybe<Array<Scalars['String']>>
  nft_contains?: Maybe<Scalars['String']>
  nft_contains_nocase?: Maybe<Scalars['String']>
  nft_not_contains?: Maybe<Scalars['String']>
  nft_not_contains_nocase?: Maybe<Scalars['String']>
  nft_starts_with?: Maybe<Scalars['String']>
  nft_starts_with_nocase?: Maybe<Scalars['String']>
  nft_not_starts_with?: Maybe<Scalars['String']>
  nft_not_starts_with_nocase?: Maybe<Scalars['String']>
  nft_ends_with?: Maybe<Scalars['String']>
  nft_ends_with_nocase?: Maybe<Scalars['String']>
  nft_not_ends_with?: Maybe<Scalars['String']>
  nft_not_ends_with_nocase?: Maybe<Scalars['String']>
  nft_?: Maybe<Erc721Nft_Filter>
  from?: Maybe<Scalars['String']>
  from_not?: Maybe<Scalars['String']>
  from_gt?: Maybe<Scalars['String']>
  from_lt?: Maybe<Scalars['String']>
  from_gte?: Maybe<Scalars['String']>
  from_lte?: Maybe<Scalars['String']>
  from_in?: Maybe<Array<Scalars['String']>>
  from_not_in?: Maybe<Array<Scalars['String']>>
  from_contains?: Maybe<Scalars['String']>
  from_contains_nocase?: Maybe<Scalars['String']>
  from_not_contains?: Maybe<Scalars['String']>
  from_not_contains_nocase?: Maybe<Scalars['String']>
  from_starts_with?: Maybe<Scalars['String']>
  from_starts_with_nocase?: Maybe<Scalars['String']>
  from_not_starts_with?: Maybe<Scalars['String']>
  from_not_starts_with_nocase?: Maybe<Scalars['String']>
  from_ends_with?: Maybe<Scalars['String']>
  from_ends_with_nocase?: Maybe<Scalars['String']>
  from_not_ends_with?: Maybe<Scalars['String']>
  from_not_ends_with_nocase?: Maybe<Scalars['String']>
  from_?: Maybe<Account_Filter>
  to?: Maybe<Scalars['String']>
  to_not?: Maybe<Scalars['String']>
  to_gt?: Maybe<Scalars['String']>
  to_lt?: Maybe<Scalars['String']>
  to_gte?: Maybe<Scalars['String']>
  to_lte?: Maybe<Scalars['String']>
  to_in?: Maybe<Array<Scalars['String']>>
  to_not_in?: Maybe<Array<Scalars['String']>>
  to_contains?: Maybe<Scalars['String']>
  to_contains_nocase?: Maybe<Scalars['String']>
  to_not_contains?: Maybe<Scalars['String']>
  to_not_contains_nocase?: Maybe<Scalars['String']>
  to_starts_with?: Maybe<Scalars['String']>
  to_starts_with_nocase?: Maybe<Scalars['String']>
  to_not_starts_with?: Maybe<Scalars['String']>
  to_not_starts_with_nocase?: Maybe<Scalars['String']>
  to_ends_with?: Maybe<Scalars['String']>
  to_ends_with_nocase?: Maybe<Scalars['String']>
  to_not_ends_with?: Maybe<Scalars['String']>
  to_not_ends_with_nocase?: Maybe<Scalars['String']>
  to_?: Maybe<Account_Filter>
  transaction?: Maybe<Scalars['String']>
  transaction_not?: Maybe<Scalars['String']>
  transaction_gt?: Maybe<Scalars['String']>
  transaction_lt?: Maybe<Scalars['String']>
  transaction_gte?: Maybe<Scalars['String']>
  transaction_lte?: Maybe<Scalars['String']>
  transaction_in?: Maybe<Array<Scalars['String']>>
  transaction_not_in?: Maybe<Array<Scalars['String']>>
  transaction_contains?: Maybe<Scalars['String']>
  transaction_contains_nocase?: Maybe<Scalars['String']>
  transaction_not_contains?: Maybe<Scalars['String']>
  transaction_not_contains_nocase?: Maybe<Scalars['String']>
  transaction_starts_with?: Maybe<Scalars['String']>
  transaction_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_not_starts_with?: Maybe<Scalars['String']>
  transaction_not_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_ends_with?: Maybe<Scalars['String']>
  transaction_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_not_ends_with?: Maybe<Scalars['String']>
  transaction_not_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_?: Maybe<Transaction_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Erc721Transfer_Filter>>>
  or?: Maybe<Array<Maybe<Erc721Transfer_Filter>>>
}

export enum Erc721Transfer_OrderBy {
  Id = 'id',
  Nft = 'nft',
  NftId = 'nft__id',
  NftTokenId = 'nft__tokenId',
  NftTokenUri = 'nft__tokenUri',
  From = 'from',
  FromId = 'from__id',
  FromRealizedPnl = 'from__realizedPnl',
  FromNumberOfUnwinds = 'from__numberOfUnwinds',
  FromNumberOfLiquidatedPositions = 'from__numberOfLiquidatedPositions',
  FromNumberOfOpenPositions = 'from__numberOfOpenPositions',
  FromPlanckCatBalance = 'from__planckCatBalance',
  FromOvlVolumeTraded = 'from__ovlVolumeTraded',
  To = 'to',
  ToId = 'to__id',
  ToRealizedPnl = 'to__realizedPnl',
  ToNumberOfUnwinds = 'to__numberOfUnwinds',
  ToNumberOfLiquidatedPositions = 'to__numberOfLiquidatedPositions',
  ToNumberOfOpenPositions = 'to__numberOfOpenPositions',
  ToPlanckCatBalance = 'to__planckCatBalance',
  ToOvlVolumeTraded = 'to__ovlVolumeTraded',
  Transaction = 'transaction',
  TransactionId = 'transaction__id',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
}

export type Factory = {
  __typename?: 'Factory'
  id: Scalars['ID']
  marketCount: Scalars['BigInt']
  txCount: Scalars['BigInt']
  totalVolumeOVL: Scalars['BigDecimal']
  totalFeesOVL: Scalars['BigDecimal']
  totalValueLockedOVL: Scalars['BigDecimal']
  feeRecipient: Scalars['ID']
  owner: Scalars['ID']
  markets: Array<Market>
}

export type FactoryMarketsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Market_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Market_Filter>
}

export type Factory_Filter = {
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_lt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  marketCount?: Maybe<Scalars['BigInt']>
  marketCount_not?: Maybe<Scalars['BigInt']>
  marketCount_gt?: Maybe<Scalars['BigInt']>
  marketCount_lt?: Maybe<Scalars['BigInt']>
  marketCount_gte?: Maybe<Scalars['BigInt']>
  marketCount_lte?: Maybe<Scalars['BigInt']>
  marketCount_in?: Maybe<Array<Scalars['BigInt']>>
  marketCount_not_in?: Maybe<Array<Scalars['BigInt']>>
  txCount?: Maybe<Scalars['BigInt']>
  txCount_not?: Maybe<Scalars['BigInt']>
  txCount_gt?: Maybe<Scalars['BigInt']>
  txCount_lt?: Maybe<Scalars['BigInt']>
  txCount_gte?: Maybe<Scalars['BigInt']>
  txCount_lte?: Maybe<Scalars['BigInt']>
  txCount_in?: Maybe<Array<Scalars['BigInt']>>
  txCount_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalVolumeOVL?: Maybe<Scalars['BigDecimal']>
  totalVolumeOVL_not?: Maybe<Scalars['BigDecimal']>
  totalVolumeOVL_gt?: Maybe<Scalars['BigDecimal']>
  totalVolumeOVL_lt?: Maybe<Scalars['BigDecimal']>
  totalVolumeOVL_gte?: Maybe<Scalars['BigDecimal']>
  totalVolumeOVL_lte?: Maybe<Scalars['BigDecimal']>
  totalVolumeOVL_in?: Maybe<Array<Scalars['BigDecimal']>>
  totalVolumeOVL_not_in?: Maybe<Array<Scalars['BigDecimal']>>
  totalFeesOVL?: Maybe<Scalars['BigDecimal']>
  totalFeesOVL_not?: Maybe<Scalars['BigDecimal']>
  totalFeesOVL_gt?: Maybe<Scalars['BigDecimal']>
  totalFeesOVL_lt?: Maybe<Scalars['BigDecimal']>
  totalFeesOVL_gte?: Maybe<Scalars['BigDecimal']>
  totalFeesOVL_lte?: Maybe<Scalars['BigDecimal']>
  totalFeesOVL_in?: Maybe<Array<Scalars['BigDecimal']>>
  totalFeesOVL_not_in?: Maybe<Array<Scalars['BigDecimal']>>
  totalValueLockedOVL?: Maybe<Scalars['BigDecimal']>
  totalValueLockedOVL_not?: Maybe<Scalars['BigDecimal']>
  totalValueLockedOVL_gt?: Maybe<Scalars['BigDecimal']>
  totalValueLockedOVL_lt?: Maybe<Scalars['BigDecimal']>
  totalValueLockedOVL_gte?: Maybe<Scalars['BigDecimal']>
  totalValueLockedOVL_lte?: Maybe<Scalars['BigDecimal']>
  totalValueLockedOVL_in?: Maybe<Array<Scalars['BigDecimal']>>
  totalValueLockedOVL_not_in?: Maybe<Array<Scalars['BigDecimal']>>
  feeRecipient?: Maybe<Scalars['ID']>
  feeRecipient_not?: Maybe<Scalars['ID']>
  feeRecipient_gt?: Maybe<Scalars['ID']>
  feeRecipient_lt?: Maybe<Scalars['ID']>
  feeRecipient_gte?: Maybe<Scalars['ID']>
  feeRecipient_lte?: Maybe<Scalars['ID']>
  feeRecipient_in?: Maybe<Array<Scalars['ID']>>
  feeRecipient_not_in?: Maybe<Array<Scalars['ID']>>
  owner?: Maybe<Scalars['ID']>
  owner_not?: Maybe<Scalars['ID']>
  owner_gt?: Maybe<Scalars['ID']>
  owner_lt?: Maybe<Scalars['ID']>
  owner_gte?: Maybe<Scalars['ID']>
  owner_lte?: Maybe<Scalars['ID']>
  owner_in?: Maybe<Array<Scalars['ID']>>
  owner_not_in?: Maybe<Array<Scalars['ID']>>
  markets_?: Maybe<Market_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Factory_Filter>>>
  or?: Maybe<Array<Maybe<Factory_Filter>>>
}

export enum Factory_OrderBy {
  Id = 'id',
  MarketCount = 'marketCount',
  TxCount = 'txCount',
  TotalVolumeOvl = 'totalVolumeOVL',
  TotalFeesOvl = 'totalFeesOVL',
  TotalValueLockedOvl = 'totalValueLockedOVL',
  FeeRecipient = 'feeRecipient',
  Owner = 'owner',
  Markets = 'markets',
}

export type Liquidate = {
  __typename?: 'Liquidate'
  id: Scalars['ID']
  owner: Account
  sender: Account
  position: Position
  fractionOfPosition: Scalars['BigInt']
  size: Scalars['BigInt']
  currentOi: Scalars['BigInt']
  currentDebt: Scalars['BigInt']
  isLong: Scalars['Boolean']
  price: Scalars['BigInt']
  mint: Scalars['BigInt']
  collateral: Scalars['BigInt']
  value: Scalars['BigInt']
  timestamp: Scalars['BigInt']
  transaction: Transaction
}

export type Liquidate_Filter = {
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_lt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  owner?: Maybe<Scalars['String']>
  owner_not?: Maybe<Scalars['String']>
  owner_gt?: Maybe<Scalars['String']>
  owner_lt?: Maybe<Scalars['String']>
  owner_gte?: Maybe<Scalars['String']>
  owner_lte?: Maybe<Scalars['String']>
  owner_in?: Maybe<Array<Scalars['String']>>
  owner_not_in?: Maybe<Array<Scalars['String']>>
  owner_contains?: Maybe<Scalars['String']>
  owner_contains_nocase?: Maybe<Scalars['String']>
  owner_not_contains?: Maybe<Scalars['String']>
  owner_not_contains_nocase?: Maybe<Scalars['String']>
  owner_starts_with?: Maybe<Scalars['String']>
  owner_starts_with_nocase?: Maybe<Scalars['String']>
  owner_not_starts_with?: Maybe<Scalars['String']>
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>
  owner_ends_with?: Maybe<Scalars['String']>
  owner_ends_with_nocase?: Maybe<Scalars['String']>
  owner_not_ends_with?: Maybe<Scalars['String']>
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner_?: Maybe<Account_Filter>
  sender?: Maybe<Scalars['String']>
  sender_not?: Maybe<Scalars['String']>
  sender_gt?: Maybe<Scalars['String']>
  sender_lt?: Maybe<Scalars['String']>
  sender_gte?: Maybe<Scalars['String']>
  sender_lte?: Maybe<Scalars['String']>
  sender_in?: Maybe<Array<Scalars['String']>>
  sender_not_in?: Maybe<Array<Scalars['String']>>
  sender_contains?: Maybe<Scalars['String']>
  sender_contains_nocase?: Maybe<Scalars['String']>
  sender_not_contains?: Maybe<Scalars['String']>
  sender_not_contains_nocase?: Maybe<Scalars['String']>
  sender_starts_with?: Maybe<Scalars['String']>
  sender_starts_with_nocase?: Maybe<Scalars['String']>
  sender_not_starts_with?: Maybe<Scalars['String']>
  sender_not_starts_with_nocase?: Maybe<Scalars['String']>
  sender_ends_with?: Maybe<Scalars['String']>
  sender_ends_with_nocase?: Maybe<Scalars['String']>
  sender_not_ends_with?: Maybe<Scalars['String']>
  sender_not_ends_with_nocase?: Maybe<Scalars['String']>
  sender_?: Maybe<Account_Filter>
  position?: Maybe<Scalars['String']>
  position_not?: Maybe<Scalars['String']>
  position_gt?: Maybe<Scalars['String']>
  position_lt?: Maybe<Scalars['String']>
  position_gte?: Maybe<Scalars['String']>
  position_lte?: Maybe<Scalars['String']>
  position_in?: Maybe<Array<Scalars['String']>>
  position_not_in?: Maybe<Array<Scalars['String']>>
  position_contains?: Maybe<Scalars['String']>
  position_contains_nocase?: Maybe<Scalars['String']>
  position_not_contains?: Maybe<Scalars['String']>
  position_not_contains_nocase?: Maybe<Scalars['String']>
  position_starts_with?: Maybe<Scalars['String']>
  position_starts_with_nocase?: Maybe<Scalars['String']>
  position_not_starts_with?: Maybe<Scalars['String']>
  position_not_starts_with_nocase?: Maybe<Scalars['String']>
  position_ends_with?: Maybe<Scalars['String']>
  position_ends_with_nocase?: Maybe<Scalars['String']>
  position_not_ends_with?: Maybe<Scalars['String']>
  position_not_ends_with_nocase?: Maybe<Scalars['String']>
  position_?: Maybe<Position_Filter>
  fractionOfPosition?: Maybe<Scalars['BigInt']>
  fractionOfPosition_not?: Maybe<Scalars['BigInt']>
  fractionOfPosition_gt?: Maybe<Scalars['BigInt']>
  fractionOfPosition_lt?: Maybe<Scalars['BigInt']>
  fractionOfPosition_gte?: Maybe<Scalars['BigInt']>
  fractionOfPosition_lte?: Maybe<Scalars['BigInt']>
  fractionOfPosition_in?: Maybe<Array<Scalars['BigInt']>>
  fractionOfPosition_not_in?: Maybe<Array<Scalars['BigInt']>>
  size?: Maybe<Scalars['BigInt']>
  size_not?: Maybe<Scalars['BigInt']>
  size_gt?: Maybe<Scalars['BigInt']>
  size_lt?: Maybe<Scalars['BigInt']>
  size_gte?: Maybe<Scalars['BigInt']>
  size_lte?: Maybe<Scalars['BigInt']>
  size_in?: Maybe<Array<Scalars['BigInt']>>
  size_not_in?: Maybe<Array<Scalars['BigInt']>>
  currentOi?: Maybe<Scalars['BigInt']>
  currentOi_not?: Maybe<Scalars['BigInt']>
  currentOi_gt?: Maybe<Scalars['BigInt']>
  currentOi_lt?: Maybe<Scalars['BigInt']>
  currentOi_gte?: Maybe<Scalars['BigInt']>
  currentOi_lte?: Maybe<Scalars['BigInt']>
  currentOi_in?: Maybe<Array<Scalars['BigInt']>>
  currentOi_not_in?: Maybe<Array<Scalars['BigInt']>>
  currentDebt?: Maybe<Scalars['BigInt']>
  currentDebt_not?: Maybe<Scalars['BigInt']>
  currentDebt_gt?: Maybe<Scalars['BigInt']>
  currentDebt_lt?: Maybe<Scalars['BigInt']>
  currentDebt_gte?: Maybe<Scalars['BigInt']>
  currentDebt_lte?: Maybe<Scalars['BigInt']>
  currentDebt_in?: Maybe<Array<Scalars['BigInt']>>
  currentDebt_not_in?: Maybe<Array<Scalars['BigInt']>>
  isLong?: Maybe<Scalars['Boolean']>
  isLong_not?: Maybe<Scalars['Boolean']>
  isLong_in?: Maybe<Array<Scalars['Boolean']>>
  isLong_not_in?: Maybe<Array<Scalars['Boolean']>>
  price?: Maybe<Scalars['BigInt']>
  price_not?: Maybe<Scalars['BigInt']>
  price_gt?: Maybe<Scalars['BigInt']>
  price_lt?: Maybe<Scalars['BigInt']>
  price_gte?: Maybe<Scalars['BigInt']>
  price_lte?: Maybe<Scalars['BigInt']>
  price_in?: Maybe<Array<Scalars['BigInt']>>
  price_not_in?: Maybe<Array<Scalars['BigInt']>>
  mint?: Maybe<Scalars['BigInt']>
  mint_not?: Maybe<Scalars['BigInt']>
  mint_gt?: Maybe<Scalars['BigInt']>
  mint_lt?: Maybe<Scalars['BigInt']>
  mint_gte?: Maybe<Scalars['BigInt']>
  mint_lte?: Maybe<Scalars['BigInt']>
  mint_in?: Maybe<Array<Scalars['BigInt']>>
  mint_not_in?: Maybe<Array<Scalars['BigInt']>>
  collateral?: Maybe<Scalars['BigInt']>
  collateral_not?: Maybe<Scalars['BigInt']>
  collateral_gt?: Maybe<Scalars['BigInt']>
  collateral_lt?: Maybe<Scalars['BigInt']>
  collateral_gte?: Maybe<Scalars['BigInt']>
  collateral_lte?: Maybe<Scalars['BigInt']>
  collateral_in?: Maybe<Array<Scalars['BigInt']>>
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>
  value?: Maybe<Scalars['BigInt']>
  value_not?: Maybe<Scalars['BigInt']>
  value_gt?: Maybe<Scalars['BigInt']>
  value_lt?: Maybe<Scalars['BigInt']>
  value_gte?: Maybe<Scalars['BigInt']>
  value_lte?: Maybe<Scalars['BigInt']>
  value_in?: Maybe<Array<Scalars['BigInt']>>
  value_not_in?: Maybe<Array<Scalars['BigInt']>>
  timestamp?: Maybe<Scalars['BigInt']>
  timestamp_not?: Maybe<Scalars['BigInt']>
  timestamp_gt?: Maybe<Scalars['BigInt']>
  timestamp_lt?: Maybe<Scalars['BigInt']>
  timestamp_gte?: Maybe<Scalars['BigInt']>
  timestamp_lte?: Maybe<Scalars['BigInt']>
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  transaction?: Maybe<Scalars['String']>
  transaction_not?: Maybe<Scalars['String']>
  transaction_gt?: Maybe<Scalars['String']>
  transaction_lt?: Maybe<Scalars['String']>
  transaction_gte?: Maybe<Scalars['String']>
  transaction_lte?: Maybe<Scalars['String']>
  transaction_in?: Maybe<Array<Scalars['String']>>
  transaction_not_in?: Maybe<Array<Scalars['String']>>
  transaction_contains?: Maybe<Scalars['String']>
  transaction_contains_nocase?: Maybe<Scalars['String']>
  transaction_not_contains?: Maybe<Scalars['String']>
  transaction_not_contains_nocase?: Maybe<Scalars['String']>
  transaction_starts_with?: Maybe<Scalars['String']>
  transaction_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_not_starts_with?: Maybe<Scalars['String']>
  transaction_not_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_ends_with?: Maybe<Scalars['String']>
  transaction_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_not_ends_with?: Maybe<Scalars['String']>
  transaction_not_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_?: Maybe<Transaction_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Liquidate_Filter>>>
  or?: Maybe<Array<Maybe<Liquidate_Filter>>>
}

export enum Liquidate_OrderBy {
  Id = 'id',
  Owner = 'owner',
  OwnerId = 'owner__id',
  OwnerRealizedPnl = 'owner__realizedPnl',
  OwnerNumberOfUnwinds = 'owner__numberOfUnwinds',
  OwnerNumberOfLiquidatedPositions = 'owner__numberOfLiquidatedPositions',
  OwnerNumberOfOpenPositions = 'owner__numberOfOpenPositions',
  OwnerPlanckCatBalance = 'owner__planckCatBalance',
  OwnerOvlVolumeTraded = 'owner__ovlVolumeTraded',
  Sender = 'sender',
  SenderId = 'sender__id',
  SenderRealizedPnl = 'sender__realizedPnl',
  SenderNumberOfUnwinds = 'sender__numberOfUnwinds',
  SenderNumberOfLiquidatedPositions = 'sender__numberOfLiquidatedPositions',
  SenderNumberOfOpenPositions = 'sender__numberOfOpenPositions',
  SenderPlanckCatBalance = 'sender__planckCatBalance',
  SenderOvlVolumeTraded = 'sender__ovlVolumeTraded',
  Position = 'position',
  PositionId = 'position__id',
  PositionPositionId = 'position__positionId',
  PositionInitialOi = 'position__initialOi',
  PositionInitialDebt = 'position__initialDebt',
  PositionInitialCollateral = 'position__initialCollateral',
  PositionInitialNotional = 'position__initialNotional',
  PositionLeverage = 'position__leverage',
  PositionFractionUnwound = 'position__fractionUnwound',
  PositionIsLong = 'position__isLong',
  PositionEntryPrice = 'position__entryPrice',
  PositionIsLiquidated = 'position__isLiquidated',
  PositionCurrentOi = 'position__currentOi',
  PositionCurrentDebt = 'position__currentDebt',
  PositionMint = 'position__mint',
  PositionCreatedAtTimestamp = 'position__createdAtTimestamp',
  PositionCreatedAtBlockNumber = 'position__createdAtBlockNumber',
  PositionNumberOfUniwnds = 'position__numberOfUniwnds',
  FractionOfPosition = 'fractionOfPosition',
  Size = 'size',
  CurrentOi = 'currentOi',
  CurrentDebt = 'currentDebt',
  IsLong = 'isLong',
  Price = 'price',
  Mint = 'mint',
  Collateral = 'collateral',
  Value = 'value',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionId = 'transaction__id',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
}

export type Market = {
  __typename?: 'Market'
  id: Scalars['ID']
  feedAddress: Scalars['String']
  factory: Factory
  createdAtTimestamp: Scalars['BigInt']
  createdAtBlockNumber: Scalars['BigInt']
  k: Scalars['BigInt']
  lmbda: Scalars['BigInt']
  delta: Scalars['BigInt']
  capPayoff: Scalars['BigInt']
  capNotional: Scalars['BigInt']
  capLeverage: Scalars['BigInt']
  circuitBreakerWindow: Scalars['BigInt']
  circuitBreakerMintTarget: Scalars['BigInt']
  maintenanceMarginFraction: Scalars['BigInt']
  maintenanceMarginBurnRate: Scalars['BigInt']
  liquidationFeeRate: Scalars['BigInt']
  tradingFeeRate: Scalars['BigInt']
  minCollateral: Scalars['BigInt']
  priceDriftUpperLimit: Scalars['BigInt']
  averageBlockTime: Scalars['BigInt']
  oiLong: Scalars['BigInt']
  oiShort: Scalars['BigInt']
  positions: Array<Position>
  isShutdown: Scalars['Boolean']
  numberOfBuilds: Scalars['BigInt']
  totalBuildFees: Scalars['BigInt']
  numberOfUnwinds: Scalars['BigInt']
  totalUnwindFees: Scalars['BigInt']
  numberOfLiquidates: Scalars['BigInt']
  totalLiquidateFees: Scalars['BigInt']
  totalFees: Scalars['BigInt']
}

export type MarketPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Position_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Position_Filter>
}

export type Market_Filter = {
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_lt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  feedAddress?: Maybe<Scalars['String']>
  feedAddress_not?: Maybe<Scalars['String']>
  feedAddress_gt?: Maybe<Scalars['String']>
  feedAddress_lt?: Maybe<Scalars['String']>
  feedAddress_gte?: Maybe<Scalars['String']>
  feedAddress_lte?: Maybe<Scalars['String']>
  feedAddress_in?: Maybe<Array<Scalars['String']>>
  feedAddress_not_in?: Maybe<Array<Scalars['String']>>
  feedAddress_contains?: Maybe<Scalars['String']>
  feedAddress_contains_nocase?: Maybe<Scalars['String']>
  feedAddress_not_contains?: Maybe<Scalars['String']>
  feedAddress_not_contains_nocase?: Maybe<Scalars['String']>
  feedAddress_starts_with?: Maybe<Scalars['String']>
  feedAddress_starts_with_nocase?: Maybe<Scalars['String']>
  feedAddress_not_starts_with?: Maybe<Scalars['String']>
  feedAddress_not_starts_with_nocase?: Maybe<Scalars['String']>
  feedAddress_ends_with?: Maybe<Scalars['String']>
  feedAddress_ends_with_nocase?: Maybe<Scalars['String']>
  feedAddress_not_ends_with?: Maybe<Scalars['String']>
  feedAddress_not_ends_with_nocase?: Maybe<Scalars['String']>
  factory?: Maybe<Scalars['String']>
  factory_not?: Maybe<Scalars['String']>
  factory_gt?: Maybe<Scalars['String']>
  factory_lt?: Maybe<Scalars['String']>
  factory_gte?: Maybe<Scalars['String']>
  factory_lte?: Maybe<Scalars['String']>
  factory_in?: Maybe<Array<Scalars['String']>>
  factory_not_in?: Maybe<Array<Scalars['String']>>
  factory_contains?: Maybe<Scalars['String']>
  factory_contains_nocase?: Maybe<Scalars['String']>
  factory_not_contains?: Maybe<Scalars['String']>
  factory_not_contains_nocase?: Maybe<Scalars['String']>
  factory_starts_with?: Maybe<Scalars['String']>
  factory_starts_with_nocase?: Maybe<Scalars['String']>
  factory_not_starts_with?: Maybe<Scalars['String']>
  factory_not_starts_with_nocase?: Maybe<Scalars['String']>
  factory_ends_with?: Maybe<Scalars['String']>
  factory_ends_with_nocase?: Maybe<Scalars['String']>
  factory_not_ends_with?: Maybe<Scalars['String']>
  factory_not_ends_with_nocase?: Maybe<Scalars['String']>
  factory_?: Maybe<Factory_Filter>
  createdAtTimestamp?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_not?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_gt?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_lt?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_gte?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_lte?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtBlockNumber?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_not?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_gt?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_lt?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_gte?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_lte?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  k?: Maybe<Scalars['BigInt']>
  k_not?: Maybe<Scalars['BigInt']>
  k_gt?: Maybe<Scalars['BigInt']>
  k_lt?: Maybe<Scalars['BigInt']>
  k_gte?: Maybe<Scalars['BigInt']>
  k_lte?: Maybe<Scalars['BigInt']>
  k_in?: Maybe<Array<Scalars['BigInt']>>
  k_not_in?: Maybe<Array<Scalars['BigInt']>>
  lmbda?: Maybe<Scalars['BigInt']>
  lmbda_not?: Maybe<Scalars['BigInt']>
  lmbda_gt?: Maybe<Scalars['BigInt']>
  lmbda_lt?: Maybe<Scalars['BigInt']>
  lmbda_gte?: Maybe<Scalars['BigInt']>
  lmbda_lte?: Maybe<Scalars['BigInt']>
  lmbda_in?: Maybe<Array<Scalars['BigInt']>>
  lmbda_not_in?: Maybe<Array<Scalars['BigInt']>>
  delta?: Maybe<Scalars['BigInt']>
  delta_not?: Maybe<Scalars['BigInt']>
  delta_gt?: Maybe<Scalars['BigInt']>
  delta_lt?: Maybe<Scalars['BigInt']>
  delta_gte?: Maybe<Scalars['BigInt']>
  delta_lte?: Maybe<Scalars['BigInt']>
  delta_in?: Maybe<Array<Scalars['BigInt']>>
  delta_not_in?: Maybe<Array<Scalars['BigInt']>>
  capPayoff?: Maybe<Scalars['BigInt']>
  capPayoff_not?: Maybe<Scalars['BigInt']>
  capPayoff_gt?: Maybe<Scalars['BigInt']>
  capPayoff_lt?: Maybe<Scalars['BigInt']>
  capPayoff_gte?: Maybe<Scalars['BigInt']>
  capPayoff_lte?: Maybe<Scalars['BigInt']>
  capPayoff_in?: Maybe<Array<Scalars['BigInt']>>
  capPayoff_not_in?: Maybe<Array<Scalars['BigInt']>>
  capNotional?: Maybe<Scalars['BigInt']>
  capNotional_not?: Maybe<Scalars['BigInt']>
  capNotional_gt?: Maybe<Scalars['BigInt']>
  capNotional_lt?: Maybe<Scalars['BigInt']>
  capNotional_gte?: Maybe<Scalars['BigInt']>
  capNotional_lte?: Maybe<Scalars['BigInt']>
  capNotional_in?: Maybe<Array<Scalars['BigInt']>>
  capNotional_not_in?: Maybe<Array<Scalars['BigInt']>>
  capLeverage?: Maybe<Scalars['BigInt']>
  capLeverage_not?: Maybe<Scalars['BigInt']>
  capLeverage_gt?: Maybe<Scalars['BigInt']>
  capLeverage_lt?: Maybe<Scalars['BigInt']>
  capLeverage_gte?: Maybe<Scalars['BigInt']>
  capLeverage_lte?: Maybe<Scalars['BigInt']>
  capLeverage_in?: Maybe<Array<Scalars['BigInt']>>
  capLeverage_not_in?: Maybe<Array<Scalars['BigInt']>>
  circuitBreakerWindow?: Maybe<Scalars['BigInt']>
  circuitBreakerWindow_not?: Maybe<Scalars['BigInt']>
  circuitBreakerWindow_gt?: Maybe<Scalars['BigInt']>
  circuitBreakerWindow_lt?: Maybe<Scalars['BigInt']>
  circuitBreakerWindow_gte?: Maybe<Scalars['BigInt']>
  circuitBreakerWindow_lte?: Maybe<Scalars['BigInt']>
  circuitBreakerWindow_in?: Maybe<Array<Scalars['BigInt']>>
  circuitBreakerWindow_not_in?: Maybe<Array<Scalars['BigInt']>>
  circuitBreakerMintTarget?: Maybe<Scalars['BigInt']>
  circuitBreakerMintTarget_not?: Maybe<Scalars['BigInt']>
  circuitBreakerMintTarget_gt?: Maybe<Scalars['BigInt']>
  circuitBreakerMintTarget_lt?: Maybe<Scalars['BigInt']>
  circuitBreakerMintTarget_gte?: Maybe<Scalars['BigInt']>
  circuitBreakerMintTarget_lte?: Maybe<Scalars['BigInt']>
  circuitBreakerMintTarget_in?: Maybe<Array<Scalars['BigInt']>>
  circuitBreakerMintTarget_not_in?: Maybe<Array<Scalars['BigInt']>>
  maintenanceMarginFraction?: Maybe<Scalars['BigInt']>
  maintenanceMarginFraction_not?: Maybe<Scalars['BigInt']>
  maintenanceMarginFraction_gt?: Maybe<Scalars['BigInt']>
  maintenanceMarginFraction_lt?: Maybe<Scalars['BigInt']>
  maintenanceMarginFraction_gte?: Maybe<Scalars['BigInt']>
  maintenanceMarginFraction_lte?: Maybe<Scalars['BigInt']>
  maintenanceMarginFraction_in?: Maybe<Array<Scalars['BigInt']>>
  maintenanceMarginFraction_not_in?: Maybe<Array<Scalars['BigInt']>>
  maintenanceMarginBurnRate?: Maybe<Scalars['BigInt']>
  maintenanceMarginBurnRate_not?: Maybe<Scalars['BigInt']>
  maintenanceMarginBurnRate_gt?: Maybe<Scalars['BigInt']>
  maintenanceMarginBurnRate_lt?: Maybe<Scalars['BigInt']>
  maintenanceMarginBurnRate_gte?: Maybe<Scalars['BigInt']>
  maintenanceMarginBurnRate_lte?: Maybe<Scalars['BigInt']>
  maintenanceMarginBurnRate_in?: Maybe<Array<Scalars['BigInt']>>
  maintenanceMarginBurnRate_not_in?: Maybe<Array<Scalars['BigInt']>>
  liquidationFeeRate?: Maybe<Scalars['BigInt']>
  liquidationFeeRate_not?: Maybe<Scalars['BigInt']>
  liquidationFeeRate_gt?: Maybe<Scalars['BigInt']>
  liquidationFeeRate_lt?: Maybe<Scalars['BigInt']>
  liquidationFeeRate_gte?: Maybe<Scalars['BigInt']>
  liquidationFeeRate_lte?: Maybe<Scalars['BigInt']>
  liquidationFeeRate_in?: Maybe<Array<Scalars['BigInt']>>
  liquidationFeeRate_not_in?: Maybe<Array<Scalars['BigInt']>>
  tradingFeeRate?: Maybe<Scalars['BigInt']>
  tradingFeeRate_not?: Maybe<Scalars['BigInt']>
  tradingFeeRate_gt?: Maybe<Scalars['BigInt']>
  tradingFeeRate_lt?: Maybe<Scalars['BigInt']>
  tradingFeeRate_gte?: Maybe<Scalars['BigInt']>
  tradingFeeRate_lte?: Maybe<Scalars['BigInt']>
  tradingFeeRate_in?: Maybe<Array<Scalars['BigInt']>>
  tradingFeeRate_not_in?: Maybe<Array<Scalars['BigInt']>>
  minCollateral?: Maybe<Scalars['BigInt']>
  minCollateral_not?: Maybe<Scalars['BigInt']>
  minCollateral_gt?: Maybe<Scalars['BigInt']>
  minCollateral_lt?: Maybe<Scalars['BigInt']>
  minCollateral_gte?: Maybe<Scalars['BigInt']>
  minCollateral_lte?: Maybe<Scalars['BigInt']>
  minCollateral_in?: Maybe<Array<Scalars['BigInt']>>
  minCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>
  priceDriftUpperLimit?: Maybe<Scalars['BigInt']>
  priceDriftUpperLimit_not?: Maybe<Scalars['BigInt']>
  priceDriftUpperLimit_gt?: Maybe<Scalars['BigInt']>
  priceDriftUpperLimit_lt?: Maybe<Scalars['BigInt']>
  priceDriftUpperLimit_gte?: Maybe<Scalars['BigInt']>
  priceDriftUpperLimit_lte?: Maybe<Scalars['BigInt']>
  priceDriftUpperLimit_in?: Maybe<Array<Scalars['BigInt']>>
  priceDriftUpperLimit_not_in?: Maybe<Array<Scalars['BigInt']>>
  averageBlockTime?: Maybe<Scalars['BigInt']>
  averageBlockTime_not?: Maybe<Scalars['BigInt']>
  averageBlockTime_gt?: Maybe<Scalars['BigInt']>
  averageBlockTime_lt?: Maybe<Scalars['BigInt']>
  averageBlockTime_gte?: Maybe<Scalars['BigInt']>
  averageBlockTime_lte?: Maybe<Scalars['BigInt']>
  averageBlockTime_in?: Maybe<Array<Scalars['BigInt']>>
  averageBlockTime_not_in?: Maybe<Array<Scalars['BigInt']>>
  oiLong?: Maybe<Scalars['BigInt']>
  oiLong_not?: Maybe<Scalars['BigInt']>
  oiLong_gt?: Maybe<Scalars['BigInt']>
  oiLong_lt?: Maybe<Scalars['BigInt']>
  oiLong_gte?: Maybe<Scalars['BigInt']>
  oiLong_lte?: Maybe<Scalars['BigInt']>
  oiLong_in?: Maybe<Array<Scalars['BigInt']>>
  oiLong_not_in?: Maybe<Array<Scalars['BigInt']>>
  oiShort?: Maybe<Scalars['BigInt']>
  oiShort_not?: Maybe<Scalars['BigInt']>
  oiShort_gt?: Maybe<Scalars['BigInt']>
  oiShort_lt?: Maybe<Scalars['BigInt']>
  oiShort_gte?: Maybe<Scalars['BigInt']>
  oiShort_lte?: Maybe<Scalars['BigInt']>
  oiShort_in?: Maybe<Array<Scalars['BigInt']>>
  oiShort_not_in?: Maybe<Array<Scalars['BigInt']>>
  positions_?: Maybe<Position_Filter>
  isShutdown?: Maybe<Scalars['Boolean']>
  isShutdown_not?: Maybe<Scalars['Boolean']>
  isShutdown_in?: Maybe<Array<Scalars['Boolean']>>
  isShutdown_not_in?: Maybe<Array<Scalars['Boolean']>>
  numberOfBuilds?: Maybe<Scalars['BigInt']>
  numberOfBuilds_not?: Maybe<Scalars['BigInt']>
  numberOfBuilds_gt?: Maybe<Scalars['BigInt']>
  numberOfBuilds_lt?: Maybe<Scalars['BigInt']>
  numberOfBuilds_gte?: Maybe<Scalars['BigInt']>
  numberOfBuilds_lte?: Maybe<Scalars['BigInt']>
  numberOfBuilds_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfBuilds_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalBuildFees?: Maybe<Scalars['BigInt']>
  totalBuildFees_not?: Maybe<Scalars['BigInt']>
  totalBuildFees_gt?: Maybe<Scalars['BigInt']>
  totalBuildFees_lt?: Maybe<Scalars['BigInt']>
  totalBuildFees_gte?: Maybe<Scalars['BigInt']>
  totalBuildFees_lte?: Maybe<Scalars['BigInt']>
  totalBuildFees_in?: Maybe<Array<Scalars['BigInt']>>
  totalBuildFees_not_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfUnwinds?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_not?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_gt?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_lt?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_gte?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_lte?: Maybe<Scalars['BigInt']>
  numberOfUnwinds_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfUnwinds_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalUnwindFees?: Maybe<Scalars['BigInt']>
  totalUnwindFees_not?: Maybe<Scalars['BigInt']>
  totalUnwindFees_gt?: Maybe<Scalars['BigInt']>
  totalUnwindFees_lt?: Maybe<Scalars['BigInt']>
  totalUnwindFees_gte?: Maybe<Scalars['BigInt']>
  totalUnwindFees_lte?: Maybe<Scalars['BigInt']>
  totalUnwindFees_in?: Maybe<Array<Scalars['BigInt']>>
  totalUnwindFees_not_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfLiquidates?: Maybe<Scalars['BigInt']>
  numberOfLiquidates_not?: Maybe<Scalars['BigInt']>
  numberOfLiquidates_gt?: Maybe<Scalars['BigInt']>
  numberOfLiquidates_lt?: Maybe<Scalars['BigInt']>
  numberOfLiquidates_gte?: Maybe<Scalars['BigInt']>
  numberOfLiquidates_lte?: Maybe<Scalars['BigInt']>
  numberOfLiquidates_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfLiquidates_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalLiquidateFees?: Maybe<Scalars['BigInt']>
  totalLiquidateFees_not?: Maybe<Scalars['BigInt']>
  totalLiquidateFees_gt?: Maybe<Scalars['BigInt']>
  totalLiquidateFees_lt?: Maybe<Scalars['BigInt']>
  totalLiquidateFees_gte?: Maybe<Scalars['BigInt']>
  totalLiquidateFees_lte?: Maybe<Scalars['BigInt']>
  totalLiquidateFees_in?: Maybe<Array<Scalars['BigInt']>>
  totalLiquidateFees_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalFees?: Maybe<Scalars['BigInt']>
  totalFees_not?: Maybe<Scalars['BigInt']>
  totalFees_gt?: Maybe<Scalars['BigInt']>
  totalFees_lt?: Maybe<Scalars['BigInt']>
  totalFees_gte?: Maybe<Scalars['BigInt']>
  totalFees_lte?: Maybe<Scalars['BigInt']>
  totalFees_in?: Maybe<Array<Scalars['BigInt']>>
  totalFees_not_in?: Maybe<Array<Scalars['BigInt']>>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Market_Filter>>>
  or?: Maybe<Array<Maybe<Market_Filter>>>
}

export enum Market_OrderBy {
  Id = 'id',
  FeedAddress = 'feedAddress',
  Factory = 'factory',
  FactoryId = 'factory__id',
  FactoryMarketCount = 'factory__marketCount',
  FactoryTxCount = 'factory__txCount',
  FactoryTotalVolumeOvl = 'factory__totalVolumeOVL',
  FactoryTotalFeesOvl = 'factory__totalFeesOVL',
  FactoryTotalValueLockedOvl = 'factory__totalValueLockedOVL',
  FactoryFeeRecipient = 'factory__feeRecipient',
  FactoryOwner = 'factory__owner',
  CreatedAtTimestamp = 'createdAtTimestamp',
  CreatedAtBlockNumber = 'createdAtBlockNumber',
  K = 'k',
  Lmbda = 'lmbda',
  Delta = 'delta',
  CapPayoff = 'capPayoff',
  CapNotional = 'capNotional',
  CapLeverage = 'capLeverage',
  CircuitBreakerWindow = 'circuitBreakerWindow',
  CircuitBreakerMintTarget = 'circuitBreakerMintTarget',
  MaintenanceMarginFraction = 'maintenanceMarginFraction',
  MaintenanceMarginBurnRate = 'maintenanceMarginBurnRate',
  LiquidationFeeRate = 'liquidationFeeRate',
  TradingFeeRate = 'tradingFeeRate',
  MinCollateral = 'minCollateral',
  PriceDriftUpperLimit = 'priceDriftUpperLimit',
  AverageBlockTime = 'averageBlockTime',
  OiLong = 'oiLong',
  OiShort = 'oiShort',
  Positions = 'positions',
  IsShutdown = 'isShutdown',
  NumberOfBuilds = 'numberOfBuilds',
  TotalBuildFees = 'totalBuildFees',
  NumberOfUnwinds = 'numberOfUnwinds',
  TotalUnwindFees = 'totalUnwindFees',
  NumberOfLiquidates = 'numberOfLiquidates',
  TotalLiquidateFees = 'totalLiquidateFees',
  TotalFees = 'totalFees',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Position = {
  __typename?: 'Position'
  id: Scalars['ID']
  positionId: Scalars['String']
  owner: Account
  market: Market
  initialOi: Scalars['BigInt']
  initialDebt: Scalars['BigInt']
  initialCollateral: Scalars['BigInt']
  initialNotional: Scalars['BigInt']
  leverage: Scalars['BigDecimal']
  fractionUnwound: Scalars['BigInt']
  isLong: Scalars['Boolean']
  entryPrice: Scalars['BigInt']
  isLiquidated: Scalars['Boolean']
  currentOi: Scalars['BigInt']
  currentDebt: Scalars['BigInt']
  mint: Scalars['BigInt']
  createdAtTimestamp: Scalars['BigInt']
  createdAtBlockNumber: Scalars['BigInt']
  numberOfUniwnds: Scalars['BigInt']
  builds: Array<Build>
  liquidates: Array<Liquidate>
  unwinds: Array<Unwind>
}

export type PositionBuildsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Build_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Build_Filter>
}

export type PositionLiquidatesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Liquidate_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Liquidate_Filter>
}

export type PositionUnwindsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Unwind_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Unwind_Filter>
}

export type Position_Filter = {
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_lt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  positionId?: Maybe<Scalars['String']>
  positionId_not?: Maybe<Scalars['String']>
  positionId_gt?: Maybe<Scalars['String']>
  positionId_lt?: Maybe<Scalars['String']>
  positionId_gte?: Maybe<Scalars['String']>
  positionId_lte?: Maybe<Scalars['String']>
  positionId_in?: Maybe<Array<Scalars['String']>>
  positionId_not_in?: Maybe<Array<Scalars['String']>>
  positionId_contains?: Maybe<Scalars['String']>
  positionId_contains_nocase?: Maybe<Scalars['String']>
  positionId_not_contains?: Maybe<Scalars['String']>
  positionId_not_contains_nocase?: Maybe<Scalars['String']>
  positionId_starts_with?: Maybe<Scalars['String']>
  positionId_starts_with_nocase?: Maybe<Scalars['String']>
  positionId_not_starts_with?: Maybe<Scalars['String']>
  positionId_not_starts_with_nocase?: Maybe<Scalars['String']>
  positionId_ends_with?: Maybe<Scalars['String']>
  positionId_ends_with_nocase?: Maybe<Scalars['String']>
  positionId_not_ends_with?: Maybe<Scalars['String']>
  positionId_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner?: Maybe<Scalars['String']>
  owner_not?: Maybe<Scalars['String']>
  owner_gt?: Maybe<Scalars['String']>
  owner_lt?: Maybe<Scalars['String']>
  owner_gte?: Maybe<Scalars['String']>
  owner_lte?: Maybe<Scalars['String']>
  owner_in?: Maybe<Array<Scalars['String']>>
  owner_not_in?: Maybe<Array<Scalars['String']>>
  owner_contains?: Maybe<Scalars['String']>
  owner_contains_nocase?: Maybe<Scalars['String']>
  owner_not_contains?: Maybe<Scalars['String']>
  owner_not_contains_nocase?: Maybe<Scalars['String']>
  owner_starts_with?: Maybe<Scalars['String']>
  owner_starts_with_nocase?: Maybe<Scalars['String']>
  owner_not_starts_with?: Maybe<Scalars['String']>
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>
  owner_ends_with?: Maybe<Scalars['String']>
  owner_ends_with_nocase?: Maybe<Scalars['String']>
  owner_not_ends_with?: Maybe<Scalars['String']>
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner_?: Maybe<Account_Filter>
  market?: Maybe<Scalars['String']>
  market_not?: Maybe<Scalars['String']>
  market_gt?: Maybe<Scalars['String']>
  market_lt?: Maybe<Scalars['String']>
  market_gte?: Maybe<Scalars['String']>
  market_lte?: Maybe<Scalars['String']>
  market_in?: Maybe<Array<Scalars['String']>>
  market_not_in?: Maybe<Array<Scalars['String']>>
  market_contains?: Maybe<Scalars['String']>
  market_contains_nocase?: Maybe<Scalars['String']>
  market_not_contains?: Maybe<Scalars['String']>
  market_not_contains_nocase?: Maybe<Scalars['String']>
  market_starts_with?: Maybe<Scalars['String']>
  market_starts_with_nocase?: Maybe<Scalars['String']>
  market_not_starts_with?: Maybe<Scalars['String']>
  market_not_starts_with_nocase?: Maybe<Scalars['String']>
  market_ends_with?: Maybe<Scalars['String']>
  market_ends_with_nocase?: Maybe<Scalars['String']>
  market_not_ends_with?: Maybe<Scalars['String']>
  market_not_ends_with_nocase?: Maybe<Scalars['String']>
  market_?: Maybe<Market_Filter>
  initialOi?: Maybe<Scalars['BigInt']>
  initialOi_not?: Maybe<Scalars['BigInt']>
  initialOi_gt?: Maybe<Scalars['BigInt']>
  initialOi_lt?: Maybe<Scalars['BigInt']>
  initialOi_gte?: Maybe<Scalars['BigInt']>
  initialOi_lte?: Maybe<Scalars['BigInt']>
  initialOi_in?: Maybe<Array<Scalars['BigInt']>>
  initialOi_not_in?: Maybe<Array<Scalars['BigInt']>>
  initialDebt?: Maybe<Scalars['BigInt']>
  initialDebt_not?: Maybe<Scalars['BigInt']>
  initialDebt_gt?: Maybe<Scalars['BigInt']>
  initialDebt_lt?: Maybe<Scalars['BigInt']>
  initialDebt_gte?: Maybe<Scalars['BigInt']>
  initialDebt_lte?: Maybe<Scalars['BigInt']>
  initialDebt_in?: Maybe<Array<Scalars['BigInt']>>
  initialDebt_not_in?: Maybe<Array<Scalars['BigInt']>>
  initialCollateral?: Maybe<Scalars['BigInt']>
  initialCollateral_not?: Maybe<Scalars['BigInt']>
  initialCollateral_gt?: Maybe<Scalars['BigInt']>
  initialCollateral_lt?: Maybe<Scalars['BigInt']>
  initialCollateral_gte?: Maybe<Scalars['BigInt']>
  initialCollateral_lte?: Maybe<Scalars['BigInt']>
  initialCollateral_in?: Maybe<Array<Scalars['BigInt']>>
  initialCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>
  initialNotional?: Maybe<Scalars['BigInt']>
  initialNotional_not?: Maybe<Scalars['BigInt']>
  initialNotional_gt?: Maybe<Scalars['BigInt']>
  initialNotional_lt?: Maybe<Scalars['BigInt']>
  initialNotional_gte?: Maybe<Scalars['BigInt']>
  initialNotional_lte?: Maybe<Scalars['BigInt']>
  initialNotional_in?: Maybe<Array<Scalars['BigInt']>>
  initialNotional_not_in?: Maybe<Array<Scalars['BigInt']>>
  leverage?: Maybe<Scalars['BigDecimal']>
  leverage_not?: Maybe<Scalars['BigDecimal']>
  leverage_gt?: Maybe<Scalars['BigDecimal']>
  leverage_lt?: Maybe<Scalars['BigDecimal']>
  leverage_gte?: Maybe<Scalars['BigDecimal']>
  leverage_lte?: Maybe<Scalars['BigDecimal']>
  leverage_in?: Maybe<Array<Scalars['BigDecimal']>>
  leverage_not_in?: Maybe<Array<Scalars['BigDecimal']>>
  fractionUnwound?: Maybe<Scalars['BigInt']>
  fractionUnwound_not?: Maybe<Scalars['BigInt']>
  fractionUnwound_gt?: Maybe<Scalars['BigInt']>
  fractionUnwound_lt?: Maybe<Scalars['BigInt']>
  fractionUnwound_gte?: Maybe<Scalars['BigInt']>
  fractionUnwound_lte?: Maybe<Scalars['BigInt']>
  fractionUnwound_in?: Maybe<Array<Scalars['BigInt']>>
  fractionUnwound_not_in?: Maybe<Array<Scalars['BigInt']>>
  isLong?: Maybe<Scalars['Boolean']>
  isLong_not?: Maybe<Scalars['Boolean']>
  isLong_in?: Maybe<Array<Scalars['Boolean']>>
  isLong_not_in?: Maybe<Array<Scalars['Boolean']>>
  entryPrice?: Maybe<Scalars['BigInt']>
  entryPrice_not?: Maybe<Scalars['BigInt']>
  entryPrice_gt?: Maybe<Scalars['BigInt']>
  entryPrice_lt?: Maybe<Scalars['BigInt']>
  entryPrice_gte?: Maybe<Scalars['BigInt']>
  entryPrice_lte?: Maybe<Scalars['BigInt']>
  entryPrice_in?: Maybe<Array<Scalars['BigInt']>>
  entryPrice_not_in?: Maybe<Array<Scalars['BigInt']>>
  isLiquidated?: Maybe<Scalars['Boolean']>
  isLiquidated_not?: Maybe<Scalars['Boolean']>
  isLiquidated_in?: Maybe<Array<Scalars['Boolean']>>
  isLiquidated_not_in?: Maybe<Array<Scalars['Boolean']>>
  currentOi?: Maybe<Scalars['BigInt']>
  currentOi_not?: Maybe<Scalars['BigInt']>
  currentOi_gt?: Maybe<Scalars['BigInt']>
  currentOi_lt?: Maybe<Scalars['BigInt']>
  currentOi_gte?: Maybe<Scalars['BigInt']>
  currentOi_lte?: Maybe<Scalars['BigInt']>
  currentOi_in?: Maybe<Array<Scalars['BigInt']>>
  currentOi_not_in?: Maybe<Array<Scalars['BigInt']>>
  currentDebt?: Maybe<Scalars['BigInt']>
  currentDebt_not?: Maybe<Scalars['BigInt']>
  currentDebt_gt?: Maybe<Scalars['BigInt']>
  currentDebt_lt?: Maybe<Scalars['BigInt']>
  currentDebt_gte?: Maybe<Scalars['BigInt']>
  currentDebt_lte?: Maybe<Scalars['BigInt']>
  currentDebt_in?: Maybe<Array<Scalars['BigInt']>>
  currentDebt_not_in?: Maybe<Array<Scalars['BigInt']>>
  mint?: Maybe<Scalars['BigInt']>
  mint_not?: Maybe<Scalars['BigInt']>
  mint_gt?: Maybe<Scalars['BigInt']>
  mint_lt?: Maybe<Scalars['BigInt']>
  mint_gte?: Maybe<Scalars['BigInt']>
  mint_lte?: Maybe<Scalars['BigInt']>
  mint_in?: Maybe<Array<Scalars['BigInt']>>
  mint_not_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtTimestamp?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_not?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_gt?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_lt?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_gte?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_lte?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtBlockNumber?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_not?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_gt?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_lt?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_gte?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_lte?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfUniwnds?: Maybe<Scalars['BigInt']>
  numberOfUniwnds_not?: Maybe<Scalars['BigInt']>
  numberOfUniwnds_gt?: Maybe<Scalars['BigInt']>
  numberOfUniwnds_lt?: Maybe<Scalars['BigInt']>
  numberOfUniwnds_gte?: Maybe<Scalars['BigInt']>
  numberOfUniwnds_lte?: Maybe<Scalars['BigInt']>
  numberOfUniwnds_in?: Maybe<Array<Scalars['BigInt']>>
  numberOfUniwnds_not_in?: Maybe<Array<Scalars['BigInt']>>
  builds_?: Maybe<Build_Filter>
  liquidates_?: Maybe<Liquidate_Filter>
  unwinds_?: Maybe<Unwind_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Position_Filter>>>
  or?: Maybe<Array<Maybe<Position_Filter>>>
}

export enum Position_OrderBy {
  Id = 'id',
  PositionId = 'positionId',
  Owner = 'owner',
  OwnerId = 'owner__id',
  OwnerRealizedPnl = 'owner__realizedPnl',
  OwnerNumberOfUnwinds = 'owner__numberOfUnwinds',
  OwnerNumberOfLiquidatedPositions = 'owner__numberOfLiquidatedPositions',
  OwnerNumberOfOpenPositions = 'owner__numberOfOpenPositions',
  OwnerPlanckCatBalance = 'owner__planckCatBalance',
  OwnerOvlVolumeTraded = 'owner__ovlVolumeTraded',
  Market = 'market',
  MarketId = 'market__id',
  MarketFeedAddress = 'market__feedAddress',
  MarketCreatedAtTimestamp = 'market__createdAtTimestamp',
  MarketCreatedAtBlockNumber = 'market__createdAtBlockNumber',
  MarketK = 'market__k',
  MarketLmbda = 'market__lmbda',
  MarketDelta = 'market__delta',
  MarketCapPayoff = 'market__capPayoff',
  MarketCapNotional = 'market__capNotional',
  MarketCapLeverage = 'market__capLeverage',
  MarketCircuitBreakerWindow = 'market__circuitBreakerWindow',
  MarketCircuitBreakerMintTarget = 'market__circuitBreakerMintTarget',
  MarketMaintenanceMarginFraction = 'market__maintenanceMarginFraction',
  MarketMaintenanceMarginBurnRate = 'market__maintenanceMarginBurnRate',
  MarketLiquidationFeeRate = 'market__liquidationFeeRate',
  MarketTradingFeeRate = 'market__tradingFeeRate',
  MarketMinCollateral = 'market__minCollateral',
  MarketPriceDriftUpperLimit = 'market__priceDriftUpperLimit',
  MarketAverageBlockTime = 'market__averageBlockTime',
  MarketOiLong = 'market__oiLong',
  MarketOiShort = 'market__oiShort',
  MarketIsShutdown = 'market__isShutdown',
  MarketNumberOfBuilds = 'market__numberOfBuilds',
  MarketTotalBuildFees = 'market__totalBuildFees',
  MarketNumberOfUnwinds = 'market__numberOfUnwinds',
  MarketTotalUnwindFees = 'market__totalUnwindFees',
  MarketNumberOfLiquidates = 'market__numberOfLiquidates',
  MarketTotalLiquidateFees = 'market__totalLiquidateFees',
  MarketTotalFees = 'market__totalFees',
  InitialOi = 'initialOi',
  InitialDebt = 'initialDebt',
  InitialCollateral = 'initialCollateral',
  InitialNotional = 'initialNotional',
  Leverage = 'leverage',
  FractionUnwound = 'fractionUnwound',
  IsLong = 'isLong',
  EntryPrice = 'entryPrice',
  IsLiquidated = 'isLiquidated',
  CurrentOi = 'currentOi',
  CurrentDebt = 'currentDebt',
  Mint = 'mint',
  CreatedAtTimestamp = 'createdAtTimestamp',
  CreatedAtBlockNumber = 'createdAtBlockNumber',
  NumberOfUniwnds = 'numberOfUniwnds',
  Builds = 'builds',
  Liquidates = 'liquidates',
  Unwinds = 'unwinds',
}

export type Query = {
  __typename?: 'Query'
  factory?: Maybe<Factory>
  factories: Array<Factory>
  market?: Maybe<Market>
  markets: Array<Market>
  position?: Maybe<Position>
  positions: Array<Position>
  transaction?: Maybe<Transaction>
  transactions: Array<Transaction>
  build?: Maybe<Build>
  builds: Array<Build>
  unwind?: Maybe<Unwind>
  unwinds: Array<Unwind>
  liquidate?: Maybe<Liquidate>
  liquidates: Array<Liquidate>
  account?: Maybe<Account>
  accounts: Array<Account>
  tokenTransfer?: Maybe<TokenTransfer>
  tokenTransfers: Array<TokenTransfer>
  tokenPosition?: Maybe<TokenPosition>
  tokenPositions: Array<TokenPosition>
  erc20Token?: Maybe<Erc20Token>
  erc20Tokens: Array<Erc20Token>
  rewardsClaimed?: Maybe<RewardsClaimed>
  rewardsClaimeds: Array<RewardsClaimed>
  tokensStaked?: Maybe<TokensStaked>
  tokensStakeds: Array<TokensStaked>
  tokensWithdrawn?: Maybe<TokensWithdrawn>
  tokensWithdrawns: Array<TokensWithdrawn>
  stakingPosition?: Maybe<StakingPosition>
  stakingPositions: Array<StakingPosition>
  staking?: Maybe<Staking>
  stakings: Array<Staking>
  erc721Transfer?: Maybe<Erc721Transfer>
  erc721Transfers: Array<Erc721Transfer>
  erc721Nft?: Maybe<Erc721Nft>
  erc721Nfts: Array<Erc721Nft>
  erc721Token?: Maybe<Erc721Token>
  erc721Tokens: Array<Erc721Token>
  referralProgram?: Maybe<ReferralProgram>
  referralPrograms: Array<ReferralProgram>
  referralPosition?: Maybe<ReferralPosition>
  referralPositions: Array<ReferralPosition>
  tradingMining?: Maybe<TradingMining>
  tradingMinings: Array<TradingMining>
  tradingMiningEpoch?: Maybe<TradingMiningEpoch>
  tradingMiningEpoches: Array<TradingMiningEpoch>
  tradingMiningEpochVolume?: Maybe<TradingMiningEpochVolume>
  tradingMiningEpochVolumes: Array<TradingMiningEpochVolume>
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
}

export type QueryFactoryArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryFactoriesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Factory_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Factory_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryMarketArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryMarketsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Market_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Market_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryPositionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Position_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Position_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTransactionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Transaction_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Transaction_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryBuildArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryBuildsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Build_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Build_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryUnwindArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryUnwindsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Unwind_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Unwind_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryLiquidateArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryLiquidatesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Liquidate_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Liquidate_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryAccountArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryAccountsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Account_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Account_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokenTransferArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokenTransfersArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokenTransfer_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokenTransfer_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokenPositionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokenPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokenPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokenPosition_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryErc20TokenArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryErc20TokensArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Erc20Token_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Erc20Token_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsClaimedArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsClaimedsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<RewardsClaimed_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<RewardsClaimed_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokensStakedArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokensStakedsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokensStaked_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokensStaked_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokensWithdrawnArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokensWithdrawnsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokensWithdrawn_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokensWithdrawn_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryStakingPositionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryStakingPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<StakingPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<StakingPosition_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryStakingArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryStakingsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Staking_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Staking_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryErc721TransferArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryErc721TransfersArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Erc721Transfer_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Erc721Transfer_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryErc721NftArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryErc721NftsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Erc721Nft_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Erc721Nft_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryErc721TokenArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryErc721TokensArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Erc721Token_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Erc721Token_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryReferralProgramArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryReferralProgramsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ReferralProgram_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<ReferralProgram_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryReferralPositionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryReferralPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ReferralPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<ReferralPosition_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTradingMiningArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTradingMiningsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TradingMining_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TradingMining_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTradingMiningEpochArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTradingMiningEpochesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TradingMiningEpoch_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TradingMiningEpoch_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTradingMiningEpochVolumeArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTradingMiningEpochVolumesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TradingMiningEpochVolume_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TradingMiningEpochVolume_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_MetaArgs = {
  block?: Maybe<Block_Height>
}

export type ReferralPosition = {
  __typename?: 'ReferralPosition'
  id: Scalars['Bytes']
  referralProgram: ReferralProgram
  owner: Account
  tier: Scalars['Int']
  affiliatedTo?: Maybe<Account>
  totalAffiliateComission: Scalars['BigInt']
  totalTraderDiscount: Scalars['BigInt']
  totalAirdroppedAmount: Scalars['BigInt']
  totalRewardsPending: Scalars['BigInt']
}

export type ReferralPosition_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  referralProgram?: Maybe<Scalars['String']>
  referralProgram_not?: Maybe<Scalars['String']>
  referralProgram_gt?: Maybe<Scalars['String']>
  referralProgram_lt?: Maybe<Scalars['String']>
  referralProgram_gte?: Maybe<Scalars['String']>
  referralProgram_lte?: Maybe<Scalars['String']>
  referralProgram_in?: Maybe<Array<Scalars['String']>>
  referralProgram_not_in?: Maybe<Array<Scalars['String']>>
  referralProgram_contains?: Maybe<Scalars['String']>
  referralProgram_contains_nocase?: Maybe<Scalars['String']>
  referralProgram_not_contains?: Maybe<Scalars['String']>
  referralProgram_not_contains_nocase?: Maybe<Scalars['String']>
  referralProgram_starts_with?: Maybe<Scalars['String']>
  referralProgram_starts_with_nocase?: Maybe<Scalars['String']>
  referralProgram_not_starts_with?: Maybe<Scalars['String']>
  referralProgram_not_starts_with_nocase?: Maybe<Scalars['String']>
  referralProgram_ends_with?: Maybe<Scalars['String']>
  referralProgram_ends_with_nocase?: Maybe<Scalars['String']>
  referralProgram_not_ends_with?: Maybe<Scalars['String']>
  referralProgram_not_ends_with_nocase?: Maybe<Scalars['String']>
  referralProgram_?: Maybe<ReferralProgram_Filter>
  owner?: Maybe<Scalars['String']>
  owner_not?: Maybe<Scalars['String']>
  owner_gt?: Maybe<Scalars['String']>
  owner_lt?: Maybe<Scalars['String']>
  owner_gte?: Maybe<Scalars['String']>
  owner_lte?: Maybe<Scalars['String']>
  owner_in?: Maybe<Array<Scalars['String']>>
  owner_not_in?: Maybe<Array<Scalars['String']>>
  owner_contains?: Maybe<Scalars['String']>
  owner_contains_nocase?: Maybe<Scalars['String']>
  owner_not_contains?: Maybe<Scalars['String']>
  owner_not_contains_nocase?: Maybe<Scalars['String']>
  owner_starts_with?: Maybe<Scalars['String']>
  owner_starts_with_nocase?: Maybe<Scalars['String']>
  owner_not_starts_with?: Maybe<Scalars['String']>
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>
  owner_ends_with?: Maybe<Scalars['String']>
  owner_ends_with_nocase?: Maybe<Scalars['String']>
  owner_not_ends_with?: Maybe<Scalars['String']>
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner_?: Maybe<Account_Filter>
  tier?: Maybe<Scalars['Int']>
  tier_not?: Maybe<Scalars['Int']>
  tier_gt?: Maybe<Scalars['Int']>
  tier_lt?: Maybe<Scalars['Int']>
  tier_gte?: Maybe<Scalars['Int']>
  tier_lte?: Maybe<Scalars['Int']>
  tier_in?: Maybe<Array<Scalars['Int']>>
  tier_not_in?: Maybe<Array<Scalars['Int']>>
  affiliatedTo?: Maybe<Scalars['String']>
  affiliatedTo_not?: Maybe<Scalars['String']>
  affiliatedTo_gt?: Maybe<Scalars['String']>
  affiliatedTo_lt?: Maybe<Scalars['String']>
  affiliatedTo_gte?: Maybe<Scalars['String']>
  affiliatedTo_lte?: Maybe<Scalars['String']>
  affiliatedTo_in?: Maybe<Array<Scalars['String']>>
  affiliatedTo_not_in?: Maybe<Array<Scalars['String']>>
  affiliatedTo_contains?: Maybe<Scalars['String']>
  affiliatedTo_contains_nocase?: Maybe<Scalars['String']>
  affiliatedTo_not_contains?: Maybe<Scalars['String']>
  affiliatedTo_not_contains_nocase?: Maybe<Scalars['String']>
  affiliatedTo_starts_with?: Maybe<Scalars['String']>
  affiliatedTo_starts_with_nocase?: Maybe<Scalars['String']>
  affiliatedTo_not_starts_with?: Maybe<Scalars['String']>
  affiliatedTo_not_starts_with_nocase?: Maybe<Scalars['String']>
  affiliatedTo_ends_with?: Maybe<Scalars['String']>
  affiliatedTo_ends_with_nocase?: Maybe<Scalars['String']>
  affiliatedTo_not_ends_with?: Maybe<Scalars['String']>
  affiliatedTo_not_ends_with_nocase?: Maybe<Scalars['String']>
  affiliatedTo_?: Maybe<Account_Filter>
  totalAffiliateComission?: Maybe<Scalars['BigInt']>
  totalAffiliateComission_not?: Maybe<Scalars['BigInt']>
  totalAffiliateComission_gt?: Maybe<Scalars['BigInt']>
  totalAffiliateComission_lt?: Maybe<Scalars['BigInt']>
  totalAffiliateComission_gte?: Maybe<Scalars['BigInt']>
  totalAffiliateComission_lte?: Maybe<Scalars['BigInt']>
  totalAffiliateComission_in?: Maybe<Array<Scalars['BigInt']>>
  totalAffiliateComission_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalTraderDiscount?: Maybe<Scalars['BigInt']>
  totalTraderDiscount_not?: Maybe<Scalars['BigInt']>
  totalTraderDiscount_gt?: Maybe<Scalars['BigInt']>
  totalTraderDiscount_lt?: Maybe<Scalars['BigInt']>
  totalTraderDiscount_gte?: Maybe<Scalars['BigInt']>
  totalTraderDiscount_lte?: Maybe<Scalars['BigInt']>
  totalTraderDiscount_in?: Maybe<Array<Scalars['BigInt']>>
  totalTraderDiscount_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalAirdroppedAmount?: Maybe<Scalars['BigInt']>
  totalAirdroppedAmount_not?: Maybe<Scalars['BigInt']>
  totalAirdroppedAmount_gt?: Maybe<Scalars['BigInt']>
  totalAirdroppedAmount_lt?: Maybe<Scalars['BigInt']>
  totalAirdroppedAmount_gte?: Maybe<Scalars['BigInt']>
  totalAirdroppedAmount_lte?: Maybe<Scalars['BigInt']>
  totalAirdroppedAmount_in?: Maybe<Array<Scalars['BigInt']>>
  totalAirdroppedAmount_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewardsPending?: Maybe<Scalars['BigInt']>
  totalRewardsPending_not?: Maybe<Scalars['BigInt']>
  totalRewardsPending_gt?: Maybe<Scalars['BigInt']>
  totalRewardsPending_lt?: Maybe<Scalars['BigInt']>
  totalRewardsPending_gte?: Maybe<Scalars['BigInt']>
  totalRewardsPending_lte?: Maybe<Scalars['BigInt']>
  totalRewardsPending_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewardsPending_not_in?: Maybe<Array<Scalars['BigInt']>>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<ReferralPosition_Filter>>>
  or?: Maybe<Array<Maybe<ReferralPosition_Filter>>>
}

export enum ReferralPosition_OrderBy {
  Id = 'id',
  ReferralProgram = 'referralProgram',
  ReferralProgramId = 'referralProgram__id',
  ReferralProgramRewardToken = 'referralProgram__rewardToken',
  ReferralProgramCreatedAtTimestamp = 'referralProgram__createdAtTimestamp',
  ReferralProgramCreatedAtBlockNumber = 'referralProgram__createdAtBlockNumber',
  ReferralProgramTotalRewards = 'referralProgram__totalRewards',
  ReferralProgramTotalAirdropped = 'referralProgram__totalAirdropped',
  Owner = 'owner',
  OwnerId = 'owner__id',
  OwnerRealizedPnl = 'owner__realizedPnl',
  OwnerNumberOfUnwinds = 'owner__numberOfUnwinds',
  OwnerNumberOfLiquidatedPositions = 'owner__numberOfLiquidatedPositions',
  OwnerNumberOfOpenPositions = 'owner__numberOfOpenPositions',
  OwnerPlanckCatBalance = 'owner__planckCatBalance',
  OwnerOvlVolumeTraded = 'owner__ovlVolumeTraded',
  Tier = 'tier',
  AffiliatedTo = 'affiliatedTo',
  AffiliatedToId = 'affiliatedTo__id',
  AffiliatedToRealizedPnl = 'affiliatedTo__realizedPnl',
  AffiliatedToNumberOfUnwinds = 'affiliatedTo__numberOfUnwinds',
  AffiliatedToNumberOfLiquidatedPositions = 'affiliatedTo__numberOfLiquidatedPositions',
  AffiliatedToNumberOfOpenPositions = 'affiliatedTo__numberOfOpenPositions',
  AffiliatedToPlanckCatBalance = 'affiliatedTo__planckCatBalance',
  AffiliatedToOvlVolumeTraded = 'affiliatedTo__ovlVolumeTraded',
  TotalAffiliateComission = 'totalAffiliateComission',
  TotalTraderDiscount = 'totalTraderDiscount',
  TotalAirdroppedAmount = 'totalAirdroppedAmount',
  TotalRewardsPending = 'totalRewardsPending',
}

export type ReferralProgram = {
  __typename?: 'ReferralProgram'
  id: Scalars['Bytes']
  rewardToken: Scalars['Bytes']
  affiliateComission: Array<Scalars['BigInt']>
  traderDiscount: Array<Scalars['BigInt']>
  createdAtTimestamp: Scalars['BigInt']
  createdAtBlockNumber: Scalars['BigInt']
  latestUpdateTransaction: Transaction
  totalRewards: Scalars['BigInt']
  totalAirdropped: Scalars['BigInt']
  referralPositions: Array<ReferralPosition>
}

export type ReferralProgramReferralPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ReferralPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<ReferralPosition_Filter>
}

export type ReferralProgram_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  rewardToken?: Maybe<Scalars['Bytes']>
  rewardToken_not?: Maybe<Scalars['Bytes']>
  rewardToken_gt?: Maybe<Scalars['Bytes']>
  rewardToken_lt?: Maybe<Scalars['Bytes']>
  rewardToken_gte?: Maybe<Scalars['Bytes']>
  rewardToken_lte?: Maybe<Scalars['Bytes']>
  rewardToken_in?: Maybe<Array<Scalars['Bytes']>>
  rewardToken_not_in?: Maybe<Array<Scalars['Bytes']>>
  rewardToken_contains?: Maybe<Scalars['Bytes']>
  rewardToken_not_contains?: Maybe<Scalars['Bytes']>
  affiliateComission?: Maybe<Array<Scalars['BigInt']>>
  affiliateComission_not?: Maybe<Array<Scalars['BigInt']>>
  affiliateComission_contains?: Maybe<Array<Scalars['BigInt']>>
  affiliateComission_contains_nocase?: Maybe<Array<Scalars['BigInt']>>
  affiliateComission_not_contains?: Maybe<Array<Scalars['BigInt']>>
  affiliateComission_not_contains_nocase?: Maybe<Array<Scalars['BigInt']>>
  traderDiscount?: Maybe<Array<Scalars['BigInt']>>
  traderDiscount_not?: Maybe<Array<Scalars['BigInt']>>
  traderDiscount_contains?: Maybe<Array<Scalars['BigInt']>>
  traderDiscount_contains_nocase?: Maybe<Array<Scalars['BigInt']>>
  traderDiscount_not_contains?: Maybe<Array<Scalars['BigInt']>>
  traderDiscount_not_contains_nocase?: Maybe<Array<Scalars['BigInt']>>
  createdAtTimestamp?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_not?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_gt?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_lt?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_gte?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_lte?: Maybe<Scalars['BigInt']>
  createdAtTimestamp_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtBlockNumber?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_not?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_gt?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_lt?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_gte?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_lte?: Maybe<Scalars['BigInt']>
  createdAtBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>
  createdAtBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  latestUpdateTransaction?: Maybe<Scalars['String']>
  latestUpdateTransaction_not?: Maybe<Scalars['String']>
  latestUpdateTransaction_gt?: Maybe<Scalars['String']>
  latestUpdateTransaction_lt?: Maybe<Scalars['String']>
  latestUpdateTransaction_gte?: Maybe<Scalars['String']>
  latestUpdateTransaction_lte?: Maybe<Scalars['String']>
  latestUpdateTransaction_in?: Maybe<Array<Scalars['String']>>
  latestUpdateTransaction_not_in?: Maybe<Array<Scalars['String']>>
  latestUpdateTransaction_contains?: Maybe<Scalars['String']>
  latestUpdateTransaction_contains_nocase?: Maybe<Scalars['String']>
  latestUpdateTransaction_not_contains?: Maybe<Scalars['String']>
  latestUpdateTransaction_not_contains_nocase?: Maybe<Scalars['String']>
  latestUpdateTransaction_starts_with?: Maybe<Scalars['String']>
  latestUpdateTransaction_starts_with_nocase?: Maybe<Scalars['String']>
  latestUpdateTransaction_not_starts_with?: Maybe<Scalars['String']>
  latestUpdateTransaction_not_starts_with_nocase?: Maybe<Scalars['String']>
  latestUpdateTransaction_ends_with?: Maybe<Scalars['String']>
  latestUpdateTransaction_ends_with_nocase?: Maybe<Scalars['String']>
  latestUpdateTransaction_not_ends_with?: Maybe<Scalars['String']>
  latestUpdateTransaction_not_ends_with_nocase?: Maybe<Scalars['String']>
  latestUpdateTransaction_?: Maybe<Transaction_Filter>
  totalRewards?: Maybe<Scalars['BigInt']>
  totalRewards_not?: Maybe<Scalars['BigInt']>
  totalRewards_gt?: Maybe<Scalars['BigInt']>
  totalRewards_lt?: Maybe<Scalars['BigInt']>
  totalRewards_gte?: Maybe<Scalars['BigInt']>
  totalRewards_lte?: Maybe<Scalars['BigInt']>
  totalRewards_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewards_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalAirdropped?: Maybe<Scalars['BigInt']>
  totalAirdropped_not?: Maybe<Scalars['BigInt']>
  totalAirdropped_gt?: Maybe<Scalars['BigInt']>
  totalAirdropped_lt?: Maybe<Scalars['BigInt']>
  totalAirdropped_gte?: Maybe<Scalars['BigInt']>
  totalAirdropped_lte?: Maybe<Scalars['BigInt']>
  totalAirdropped_in?: Maybe<Array<Scalars['BigInt']>>
  totalAirdropped_not_in?: Maybe<Array<Scalars['BigInt']>>
  referralPositions_?: Maybe<ReferralPosition_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<ReferralProgram_Filter>>>
  or?: Maybe<Array<Maybe<ReferralProgram_Filter>>>
}

export enum ReferralProgram_OrderBy {
  Id = 'id',
  RewardToken = 'rewardToken',
  AffiliateComission = 'affiliateComission',
  TraderDiscount = 'traderDiscount',
  CreatedAtTimestamp = 'createdAtTimestamp',
  CreatedAtBlockNumber = 'createdAtBlockNumber',
  LatestUpdateTransaction = 'latestUpdateTransaction',
  LatestUpdateTransactionId = 'latestUpdateTransaction__id',
  LatestUpdateTransactionBlockNumber = 'latestUpdateTransaction__blockNumber',
  LatestUpdateTransactionTimestamp = 'latestUpdateTransaction__timestamp',
  LatestUpdateTransactionGasLimit = 'latestUpdateTransaction__gasLimit',
  LatestUpdateTransactionGasPrice = 'latestUpdateTransaction__gasPrice',
  TotalRewards = 'totalRewards',
  TotalAirdropped = 'totalAirdropped',
  ReferralPositions = 'referralPositions',
}

export type RewardsClaimed = {
  __typename?: 'RewardsClaimed'
  id: Scalars['Bytes']
  staker: Scalars['Bytes']
  stakingPosition: StakingPosition
  rewardAmount: Scalars['BigInt']
  blockNumber: Scalars['BigInt']
  blockTimestamp: Scalars['BigInt']
  transactionHash: Scalars['Bytes']
}

export type RewardsClaimed_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  staker?: Maybe<Scalars['Bytes']>
  staker_not?: Maybe<Scalars['Bytes']>
  staker_gt?: Maybe<Scalars['Bytes']>
  staker_lt?: Maybe<Scalars['Bytes']>
  staker_gte?: Maybe<Scalars['Bytes']>
  staker_lte?: Maybe<Scalars['Bytes']>
  staker_in?: Maybe<Array<Scalars['Bytes']>>
  staker_not_in?: Maybe<Array<Scalars['Bytes']>>
  staker_contains?: Maybe<Scalars['Bytes']>
  staker_not_contains?: Maybe<Scalars['Bytes']>
  stakingPosition?: Maybe<Scalars['String']>
  stakingPosition_not?: Maybe<Scalars['String']>
  stakingPosition_gt?: Maybe<Scalars['String']>
  stakingPosition_lt?: Maybe<Scalars['String']>
  stakingPosition_gte?: Maybe<Scalars['String']>
  stakingPosition_lte?: Maybe<Scalars['String']>
  stakingPosition_in?: Maybe<Array<Scalars['String']>>
  stakingPosition_not_in?: Maybe<Array<Scalars['String']>>
  stakingPosition_contains?: Maybe<Scalars['String']>
  stakingPosition_contains_nocase?: Maybe<Scalars['String']>
  stakingPosition_not_contains?: Maybe<Scalars['String']>
  stakingPosition_not_contains_nocase?: Maybe<Scalars['String']>
  stakingPosition_starts_with?: Maybe<Scalars['String']>
  stakingPosition_starts_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_not_starts_with?: Maybe<Scalars['String']>
  stakingPosition_not_starts_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_ends_with?: Maybe<Scalars['String']>
  stakingPosition_ends_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_not_ends_with?: Maybe<Scalars['String']>
  stakingPosition_not_ends_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_?: Maybe<StakingPosition_Filter>
  rewardAmount?: Maybe<Scalars['BigInt']>
  rewardAmount_not?: Maybe<Scalars['BigInt']>
  rewardAmount_gt?: Maybe<Scalars['BigInt']>
  rewardAmount_lt?: Maybe<Scalars['BigInt']>
  rewardAmount_gte?: Maybe<Scalars['BigInt']>
  rewardAmount_lte?: Maybe<Scalars['BigInt']>
  rewardAmount_in?: Maybe<Array<Scalars['BigInt']>>
  rewardAmount_not_in?: Maybe<Array<Scalars['BigInt']>>
  blockNumber?: Maybe<Scalars['BigInt']>
  blockNumber_not?: Maybe<Scalars['BigInt']>
  blockNumber_gt?: Maybe<Scalars['BigInt']>
  blockNumber_lt?: Maybe<Scalars['BigInt']>
  blockNumber_gte?: Maybe<Scalars['BigInt']>
  blockNumber_lte?: Maybe<Scalars['BigInt']>
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  blockTimestamp?: Maybe<Scalars['BigInt']>
  blockTimestamp_not?: Maybe<Scalars['BigInt']>
  blockTimestamp_gt?: Maybe<Scalars['BigInt']>
  blockTimestamp_lt?: Maybe<Scalars['BigInt']>
  blockTimestamp_gte?: Maybe<Scalars['BigInt']>
  blockTimestamp_lte?: Maybe<Scalars['BigInt']>
  blockTimestamp_in?: Maybe<Array<Scalars['BigInt']>>
  blockTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  transactionHash?: Maybe<Scalars['Bytes']>
  transactionHash_not?: Maybe<Scalars['Bytes']>
  transactionHash_gt?: Maybe<Scalars['Bytes']>
  transactionHash_lt?: Maybe<Scalars['Bytes']>
  transactionHash_gte?: Maybe<Scalars['Bytes']>
  transactionHash_lte?: Maybe<Scalars['Bytes']>
  transactionHash_in?: Maybe<Array<Scalars['Bytes']>>
  transactionHash_not_in?: Maybe<Array<Scalars['Bytes']>>
  transactionHash_contains?: Maybe<Scalars['Bytes']>
  transactionHash_not_contains?: Maybe<Scalars['Bytes']>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<RewardsClaimed_Filter>>>
  or?: Maybe<Array<Maybe<RewardsClaimed_Filter>>>
}

export enum RewardsClaimed_OrderBy {
  Id = 'id',
  Staker = 'staker',
  StakingPosition = 'stakingPosition',
  StakingPositionId = 'stakingPosition__id',
  StakingPositionStakedBalance = 'stakingPosition__stakedBalance',
  StakingPositionTotalRewardsClaimed = 'stakingPosition__totalRewardsClaimed',
  RewardAmount = 'rewardAmount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  TransactionHash = 'transactionHash',
}

export type Staking = {
  __typename?: 'Staking'
  id: Scalars['Bytes']
  rewardToken: Scalars['Bytes']
  stakingToken: Scalars['Bytes']
  timeUnit: Scalars['BigInt']
  rewardsBalance: Scalars['BigInt']
  stakedBalance: Scalars['BigInt']
  totalRewardsClaimed: Scalars['BigInt']
  totalStaked: Scalars['BigInt']
  rewardRatioNumerator: Scalars['BigInt']
  rewardRatioDenominator: Scalars['BigInt']
  stakingPositions: Array<StakingPosition>
}

export type StakingStakingPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<StakingPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<StakingPosition_Filter>
}

export type StakingPosition = {
  __typename?: 'StakingPosition'
  id: Scalars['Bytes']
  pool: Staking
  owner: Account
  stakedBalance: Scalars['BigInt']
  totalRewardsClaimed: Scalars['BigInt']
  tokensStaked: Array<TokensStaked>
  tokensWithdrawn: Array<TokensWithdrawn>
  rewardsClaimed: Array<RewardsClaimed>
}

export type StakingPositionTokensStakedArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokensStaked_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokensStaked_Filter>
}

export type StakingPositionTokensWithdrawnArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokensWithdrawn_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokensWithdrawn_Filter>
}

export type StakingPositionRewardsClaimedArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<RewardsClaimed_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<RewardsClaimed_Filter>
}

export type StakingPosition_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  pool?: Maybe<Scalars['String']>
  pool_not?: Maybe<Scalars['String']>
  pool_gt?: Maybe<Scalars['String']>
  pool_lt?: Maybe<Scalars['String']>
  pool_gte?: Maybe<Scalars['String']>
  pool_lte?: Maybe<Scalars['String']>
  pool_in?: Maybe<Array<Scalars['String']>>
  pool_not_in?: Maybe<Array<Scalars['String']>>
  pool_contains?: Maybe<Scalars['String']>
  pool_contains_nocase?: Maybe<Scalars['String']>
  pool_not_contains?: Maybe<Scalars['String']>
  pool_not_contains_nocase?: Maybe<Scalars['String']>
  pool_starts_with?: Maybe<Scalars['String']>
  pool_starts_with_nocase?: Maybe<Scalars['String']>
  pool_not_starts_with?: Maybe<Scalars['String']>
  pool_not_starts_with_nocase?: Maybe<Scalars['String']>
  pool_ends_with?: Maybe<Scalars['String']>
  pool_ends_with_nocase?: Maybe<Scalars['String']>
  pool_not_ends_with?: Maybe<Scalars['String']>
  pool_not_ends_with_nocase?: Maybe<Scalars['String']>
  pool_?: Maybe<Staking_Filter>
  owner?: Maybe<Scalars['String']>
  owner_not?: Maybe<Scalars['String']>
  owner_gt?: Maybe<Scalars['String']>
  owner_lt?: Maybe<Scalars['String']>
  owner_gte?: Maybe<Scalars['String']>
  owner_lte?: Maybe<Scalars['String']>
  owner_in?: Maybe<Array<Scalars['String']>>
  owner_not_in?: Maybe<Array<Scalars['String']>>
  owner_contains?: Maybe<Scalars['String']>
  owner_contains_nocase?: Maybe<Scalars['String']>
  owner_not_contains?: Maybe<Scalars['String']>
  owner_not_contains_nocase?: Maybe<Scalars['String']>
  owner_starts_with?: Maybe<Scalars['String']>
  owner_starts_with_nocase?: Maybe<Scalars['String']>
  owner_not_starts_with?: Maybe<Scalars['String']>
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>
  owner_ends_with?: Maybe<Scalars['String']>
  owner_ends_with_nocase?: Maybe<Scalars['String']>
  owner_not_ends_with?: Maybe<Scalars['String']>
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner_?: Maybe<Account_Filter>
  stakedBalance?: Maybe<Scalars['BigInt']>
  stakedBalance_not?: Maybe<Scalars['BigInt']>
  stakedBalance_gt?: Maybe<Scalars['BigInt']>
  stakedBalance_lt?: Maybe<Scalars['BigInt']>
  stakedBalance_gte?: Maybe<Scalars['BigInt']>
  stakedBalance_lte?: Maybe<Scalars['BigInt']>
  stakedBalance_in?: Maybe<Array<Scalars['BigInt']>>
  stakedBalance_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewardsClaimed?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_not?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_gt?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_lt?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_gte?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_lte?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewardsClaimed_not_in?: Maybe<Array<Scalars['BigInt']>>
  tokensStaked_?: Maybe<TokensStaked_Filter>
  tokensWithdrawn_?: Maybe<TokensWithdrawn_Filter>
  rewardsClaimed_?: Maybe<RewardsClaimed_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<StakingPosition_Filter>>>
  or?: Maybe<Array<Maybe<StakingPosition_Filter>>>
}

export enum StakingPosition_OrderBy {
  Id = 'id',
  Pool = 'pool',
  PoolId = 'pool__id',
  PoolRewardToken = 'pool__rewardToken',
  PoolStakingToken = 'pool__stakingToken',
  PoolTimeUnit = 'pool__timeUnit',
  PoolRewardsBalance = 'pool__rewardsBalance',
  PoolStakedBalance = 'pool__stakedBalance',
  PoolTotalRewardsClaimed = 'pool__totalRewardsClaimed',
  PoolTotalStaked = 'pool__totalStaked',
  PoolRewardRatioNumerator = 'pool__rewardRatioNumerator',
  PoolRewardRatioDenominator = 'pool__rewardRatioDenominator',
  Owner = 'owner',
  OwnerId = 'owner__id',
  OwnerRealizedPnl = 'owner__realizedPnl',
  OwnerNumberOfUnwinds = 'owner__numberOfUnwinds',
  OwnerNumberOfLiquidatedPositions = 'owner__numberOfLiquidatedPositions',
  OwnerNumberOfOpenPositions = 'owner__numberOfOpenPositions',
  OwnerPlanckCatBalance = 'owner__planckCatBalance',
  OwnerOvlVolumeTraded = 'owner__ovlVolumeTraded',
  StakedBalance = 'stakedBalance',
  TotalRewardsClaimed = 'totalRewardsClaimed',
  TokensStaked = 'tokensStaked',
  TokensWithdrawn = 'tokensWithdrawn',
  RewardsClaimed = 'rewardsClaimed',
}

export type Staking_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  rewardToken?: Maybe<Scalars['Bytes']>
  rewardToken_not?: Maybe<Scalars['Bytes']>
  rewardToken_gt?: Maybe<Scalars['Bytes']>
  rewardToken_lt?: Maybe<Scalars['Bytes']>
  rewardToken_gte?: Maybe<Scalars['Bytes']>
  rewardToken_lte?: Maybe<Scalars['Bytes']>
  rewardToken_in?: Maybe<Array<Scalars['Bytes']>>
  rewardToken_not_in?: Maybe<Array<Scalars['Bytes']>>
  rewardToken_contains?: Maybe<Scalars['Bytes']>
  rewardToken_not_contains?: Maybe<Scalars['Bytes']>
  stakingToken?: Maybe<Scalars['Bytes']>
  stakingToken_not?: Maybe<Scalars['Bytes']>
  stakingToken_gt?: Maybe<Scalars['Bytes']>
  stakingToken_lt?: Maybe<Scalars['Bytes']>
  stakingToken_gte?: Maybe<Scalars['Bytes']>
  stakingToken_lte?: Maybe<Scalars['Bytes']>
  stakingToken_in?: Maybe<Array<Scalars['Bytes']>>
  stakingToken_not_in?: Maybe<Array<Scalars['Bytes']>>
  stakingToken_contains?: Maybe<Scalars['Bytes']>
  stakingToken_not_contains?: Maybe<Scalars['Bytes']>
  timeUnit?: Maybe<Scalars['BigInt']>
  timeUnit_not?: Maybe<Scalars['BigInt']>
  timeUnit_gt?: Maybe<Scalars['BigInt']>
  timeUnit_lt?: Maybe<Scalars['BigInt']>
  timeUnit_gte?: Maybe<Scalars['BigInt']>
  timeUnit_lte?: Maybe<Scalars['BigInt']>
  timeUnit_in?: Maybe<Array<Scalars['BigInt']>>
  timeUnit_not_in?: Maybe<Array<Scalars['BigInt']>>
  rewardsBalance?: Maybe<Scalars['BigInt']>
  rewardsBalance_not?: Maybe<Scalars['BigInt']>
  rewardsBalance_gt?: Maybe<Scalars['BigInt']>
  rewardsBalance_lt?: Maybe<Scalars['BigInt']>
  rewardsBalance_gte?: Maybe<Scalars['BigInt']>
  rewardsBalance_lte?: Maybe<Scalars['BigInt']>
  rewardsBalance_in?: Maybe<Array<Scalars['BigInt']>>
  rewardsBalance_not_in?: Maybe<Array<Scalars['BigInt']>>
  stakedBalance?: Maybe<Scalars['BigInt']>
  stakedBalance_not?: Maybe<Scalars['BigInt']>
  stakedBalance_gt?: Maybe<Scalars['BigInt']>
  stakedBalance_lt?: Maybe<Scalars['BigInt']>
  stakedBalance_gte?: Maybe<Scalars['BigInt']>
  stakedBalance_lte?: Maybe<Scalars['BigInt']>
  stakedBalance_in?: Maybe<Array<Scalars['BigInt']>>
  stakedBalance_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewardsClaimed?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_not?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_gt?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_lt?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_gte?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_lte?: Maybe<Scalars['BigInt']>
  totalRewardsClaimed_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewardsClaimed_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalStaked?: Maybe<Scalars['BigInt']>
  totalStaked_not?: Maybe<Scalars['BigInt']>
  totalStaked_gt?: Maybe<Scalars['BigInt']>
  totalStaked_lt?: Maybe<Scalars['BigInt']>
  totalStaked_gte?: Maybe<Scalars['BigInt']>
  totalStaked_lte?: Maybe<Scalars['BigInt']>
  totalStaked_in?: Maybe<Array<Scalars['BigInt']>>
  totalStaked_not_in?: Maybe<Array<Scalars['BigInt']>>
  rewardRatioNumerator?: Maybe<Scalars['BigInt']>
  rewardRatioNumerator_not?: Maybe<Scalars['BigInt']>
  rewardRatioNumerator_gt?: Maybe<Scalars['BigInt']>
  rewardRatioNumerator_lt?: Maybe<Scalars['BigInt']>
  rewardRatioNumerator_gte?: Maybe<Scalars['BigInt']>
  rewardRatioNumerator_lte?: Maybe<Scalars['BigInt']>
  rewardRatioNumerator_in?: Maybe<Array<Scalars['BigInt']>>
  rewardRatioNumerator_not_in?: Maybe<Array<Scalars['BigInt']>>
  rewardRatioDenominator?: Maybe<Scalars['BigInt']>
  rewardRatioDenominator_not?: Maybe<Scalars['BigInt']>
  rewardRatioDenominator_gt?: Maybe<Scalars['BigInt']>
  rewardRatioDenominator_lt?: Maybe<Scalars['BigInt']>
  rewardRatioDenominator_gte?: Maybe<Scalars['BigInt']>
  rewardRatioDenominator_lte?: Maybe<Scalars['BigInt']>
  rewardRatioDenominator_in?: Maybe<Array<Scalars['BigInt']>>
  rewardRatioDenominator_not_in?: Maybe<Array<Scalars['BigInt']>>
  stakingPositions_?: Maybe<StakingPosition_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Staking_Filter>>>
  or?: Maybe<Array<Maybe<Staking_Filter>>>
}

export enum Staking_OrderBy {
  Id = 'id',
  RewardToken = 'rewardToken',
  StakingToken = 'stakingToken',
  TimeUnit = 'timeUnit',
  RewardsBalance = 'rewardsBalance',
  StakedBalance = 'stakedBalance',
  TotalRewardsClaimed = 'totalRewardsClaimed',
  TotalStaked = 'totalStaked',
  RewardRatioNumerator = 'rewardRatioNumerator',
  RewardRatioDenominator = 'rewardRatioDenominator',
  StakingPositions = 'stakingPositions',
}

export type Subscription = {
  __typename?: 'Subscription'
  factory?: Maybe<Factory>
  factories: Array<Factory>
  market?: Maybe<Market>
  markets: Array<Market>
  position?: Maybe<Position>
  positions: Array<Position>
  transaction?: Maybe<Transaction>
  transactions: Array<Transaction>
  build?: Maybe<Build>
  builds: Array<Build>
  unwind?: Maybe<Unwind>
  unwinds: Array<Unwind>
  liquidate?: Maybe<Liquidate>
  liquidates: Array<Liquidate>
  account?: Maybe<Account>
  accounts: Array<Account>
  tokenTransfer?: Maybe<TokenTransfer>
  tokenTransfers: Array<TokenTransfer>
  tokenPosition?: Maybe<TokenPosition>
  tokenPositions: Array<TokenPosition>
  erc20Token?: Maybe<Erc20Token>
  erc20Tokens: Array<Erc20Token>
  rewardsClaimed?: Maybe<RewardsClaimed>
  rewardsClaimeds: Array<RewardsClaimed>
  tokensStaked?: Maybe<TokensStaked>
  tokensStakeds: Array<TokensStaked>
  tokensWithdrawn?: Maybe<TokensWithdrawn>
  tokensWithdrawns: Array<TokensWithdrawn>
  stakingPosition?: Maybe<StakingPosition>
  stakingPositions: Array<StakingPosition>
  staking?: Maybe<Staking>
  stakings: Array<Staking>
  erc721Transfer?: Maybe<Erc721Transfer>
  erc721Transfers: Array<Erc721Transfer>
  erc721Nft?: Maybe<Erc721Nft>
  erc721Nfts: Array<Erc721Nft>
  erc721Token?: Maybe<Erc721Token>
  erc721Tokens: Array<Erc721Token>
  referralProgram?: Maybe<ReferralProgram>
  referralPrograms: Array<ReferralProgram>
  referralPosition?: Maybe<ReferralPosition>
  referralPositions: Array<ReferralPosition>
  tradingMining?: Maybe<TradingMining>
  tradingMinings: Array<TradingMining>
  tradingMiningEpoch?: Maybe<TradingMiningEpoch>
  tradingMiningEpoches: Array<TradingMiningEpoch>
  tradingMiningEpochVolume?: Maybe<TradingMiningEpochVolume>
  tradingMiningEpochVolumes: Array<TradingMiningEpochVolume>
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
}

export type SubscriptionFactoryArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionFactoriesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Factory_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Factory_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionMarketArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionMarketsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Market_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Market_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionPositionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Position_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Position_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTransactionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Transaction_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Transaction_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionBuildArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionBuildsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Build_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Build_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionUnwindArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionUnwindsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Unwind_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Unwind_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionLiquidateArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionLiquidatesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Liquidate_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Liquidate_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionAccountArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionAccountsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Account_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Account_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokenTransferArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokenTransfersArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokenTransfer_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokenTransfer_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokenPositionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokenPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokenPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokenPosition_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionErc20TokenArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionErc20TokensArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Erc20Token_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Erc20Token_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsClaimedArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsClaimedsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<RewardsClaimed_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<RewardsClaimed_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokensStakedArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokensStakedsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokensStaked_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokensStaked_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokensWithdrawnArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokensWithdrawnsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokensWithdrawn_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokensWithdrawn_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionStakingPositionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionStakingPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<StakingPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<StakingPosition_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionStakingArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionStakingsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Staking_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Staking_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionErc721TransferArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionErc721TransfersArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Erc721Transfer_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Erc721Transfer_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionErc721NftArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionErc721NftsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Erc721Nft_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Erc721Nft_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionErc721TokenArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionErc721TokensArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Erc721Token_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Erc721Token_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionReferralProgramArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionReferralProgramsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ReferralProgram_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<ReferralProgram_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionReferralPositionArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionReferralPositionsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ReferralPosition_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<ReferralPosition_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTradingMiningArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTradingMiningsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TradingMining_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TradingMining_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTradingMiningEpochArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTradingMiningEpochesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TradingMiningEpoch_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TradingMiningEpoch_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTradingMiningEpochVolumeArgs = {
  id: Scalars['ID']
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTradingMiningEpochVolumesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TradingMiningEpochVolume_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TradingMiningEpochVolume_Filter>
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>
}

export type TokenPosition = {
  __typename?: 'TokenPosition'
  id: Scalars['Bytes']
  token: Erc20Token
  owner: Account
  balance: Scalars['BigInt']
}

export type TokenPosition_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  token?: Maybe<Scalars['String']>
  token_not?: Maybe<Scalars['String']>
  token_gt?: Maybe<Scalars['String']>
  token_lt?: Maybe<Scalars['String']>
  token_gte?: Maybe<Scalars['String']>
  token_lte?: Maybe<Scalars['String']>
  token_in?: Maybe<Array<Scalars['String']>>
  token_not_in?: Maybe<Array<Scalars['String']>>
  token_contains?: Maybe<Scalars['String']>
  token_contains_nocase?: Maybe<Scalars['String']>
  token_not_contains?: Maybe<Scalars['String']>
  token_not_contains_nocase?: Maybe<Scalars['String']>
  token_starts_with?: Maybe<Scalars['String']>
  token_starts_with_nocase?: Maybe<Scalars['String']>
  token_not_starts_with?: Maybe<Scalars['String']>
  token_not_starts_with_nocase?: Maybe<Scalars['String']>
  token_ends_with?: Maybe<Scalars['String']>
  token_ends_with_nocase?: Maybe<Scalars['String']>
  token_not_ends_with?: Maybe<Scalars['String']>
  token_not_ends_with_nocase?: Maybe<Scalars['String']>
  token_?: Maybe<Erc20Token_Filter>
  owner?: Maybe<Scalars['String']>
  owner_not?: Maybe<Scalars['String']>
  owner_gt?: Maybe<Scalars['String']>
  owner_lt?: Maybe<Scalars['String']>
  owner_gte?: Maybe<Scalars['String']>
  owner_lte?: Maybe<Scalars['String']>
  owner_in?: Maybe<Array<Scalars['String']>>
  owner_not_in?: Maybe<Array<Scalars['String']>>
  owner_contains?: Maybe<Scalars['String']>
  owner_contains_nocase?: Maybe<Scalars['String']>
  owner_not_contains?: Maybe<Scalars['String']>
  owner_not_contains_nocase?: Maybe<Scalars['String']>
  owner_starts_with?: Maybe<Scalars['String']>
  owner_starts_with_nocase?: Maybe<Scalars['String']>
  owner_not_starts_with?: Maybe<Scalars['String']>
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>
  owner_ends_with?: Maybe<Scalars['String']>
  owner_ends_with_nocase?: Maybe<Scalars['String']>
  owner_not_ends_with?: Maybe<Scalars['String']>
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner_?: Maybe<Account_Filter>
  balance?: Maybe<Scalars['BigInt']>
  balance_not?: Maybe<Scalars['BigInt']>
  balance_gt?: Maybe<Scalars['BigInt']>
  balance_lt?: Maybe<Scalars['BigInt']>
  balance_gte?: Maybe<Scalars['BigInt']>
  balance_lte?: Maybe<Scalars['BigInt']>
  balance_in?: Maybe<Array<Scalars['BigInt']>>
  balance_not_in?: Maybe<Array<Scalars['BigInt']>>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<TokenPosition_Filter>>>
  or?: Maybe<Array<Maybe<TokenPosition_Filter>>>
}

export enum TokenPosition_OrderBy {
  Id = 'id',
  Token = 'token',
  TokenId = 'token__id',
  TokenTotalSupply = 'token__totalSupply',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  Owner = 'owner',
  OwnerId = 'owner__id',
  OwnerRealizedPnl = 'owner__realizedPnl',
  OwnerNumberOfUnwinds = 'owner__numberOfUnwinds',
  OwnerNumberOfLiquidatedPositions = 'owner__numberOfLiquidatedPositions',
  OwnerNumberOfOpenPositions = 'owner__numberOfOpenPositions',
  OwnerPlanckCatBalance = 'owner__planckCatBalance',
  OwnerOvlVolumeTraded = 'owner__ovlVolumeTraded',
  Balance = 'balance',
}

export type TokenTransfer = {
  __typename?: 'TokenTransfer'
  id: Scalars['Bytes']
  token: Erc20Token
  from: Scalars['Bytes']
  to: Scalars['Bytes']
  amount: Scalars['BigInt']
  transaction: Transaction
}

export type TokenTransfer_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  token?: Maybe<Scalars['String']>
  token_not?: Maybe<Scalars['String']>
  token_gt?: Maybe<Scalars['String']>
  token_lt?: Maybe<Scalars['String']>
  token_gte?: Maybe<Scalars['String']>
  token_lte?: Maybe<Scalars['String']>
  token_in?: Maybe<Array<Scalars['String']>>
  token_not_in?: Maybe<Array<Scalars['String']>>
  token_contains?: Maybe<Scalars['String']>
  token_contains_nocase?: Maybe<Scalars['String']>
  token_not_contains?: Maybe<Scalars['String']>
  token_not_contains_nocase?: Maybe<Scalars['String']>
  token_starts_with?: Maybe<Scalars['String']>
  token_starts_with_nocase?: Maybe<Scalars['String']>
  token_not_starts_with?: Maybe<Scalars['String']>
  token_not_starts_with_nocase?: Maybe<Scalars['String']>
  token_ends_with?: Maybe<Scalars['String']>
  token_ends_with_nocase?: Maybe<Scalars['String']>
  token_not_ends_with?: Maybe<Scalars['String']>
  token_not_ends_with_nocase?: Maybe<Scalars['String']>
  token_?: Maybe<Erc20Token_Filter>
  from?: Maybe<Scalars['Bytes']>
  from_not?: Maybe<Scalars['Bytes']>
  from_gt?: Maybe<Scalars['Bytes']>
  from_lt?: Maybe<Scalars['Bytes']>
  from_gte?: Maybe<Scalars['Bytes']>
  from_lte?: Maybe<Scalars['Bytes']>
  from_in?: Maybe<Array<Scalars['Bytes']>>
  from_not_in?: Maybe<Array<Scalars['Bytes']>>
  from_contains?: Maybe<Scalars['Bytes']>
  from_not_contains?: Maybe<Scalars['Bytes']>
  to?: Maybe<Scalars['Bytes']>
  to_not?: Maybe<Scalars['Bytes']>
  to_gt?: Maybe<Scalars['Bytes']>
  to_lt?: Maybe<Scalars['Bytes']>
  to_gte?: Maybe<Scalars['Bytes']>
  to_lte?: Maybe<Scalars['Bytes']>
  to_in?: Maybe<Array<Scalars['Bytes']>>
  to_not_in?: Maybe<Array<Scalars['Bytes']>>
  to_contains?: Maybe<Scalars['Bytes']>
  to_not_contains?: Maybe<Scalars['Bytes']>
  amount?: Maybe<Scalars['BigInt']>
  amount_not?: Maybe<Scalars['BigInt']>
  amount_gt?: Maybe<Scalars['BigInt']>
  amount_lt?: Maybe<Scalars['BigInt']>
  amount_gte?: Maybe<Scalars['BigInt']>
  amount_lte?: Maybe<Scalars['BigInt']>
  amount_in?: Maybe<Array<Scalars['BigInt']>>
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>
  transaction?: Maybe<Scalars['String']>
  transaction_not?: Maybe<Scalars['String']>
  transaction_gt?: Maybe<Scalars['String']>
  transaction_lt?: Maybe<Scalars['String']>
  transaction_gte?: Maybe<Scalars['String']>
  transaction_lte?: Maybe<Scalars['String']>
  transaction_in?: Maybe<Array<Scalars['String']>>
  transaction_not_in?: Maybe<Array<Scalars['String']>>
  transaction_contains?: Maybe<Scalars['String']>
  transaction_contains_nocase?: Maybe<Scalars['String']>
  transaction_not_contains?: Maybe<Scalars['String']>
  transaction_not_contains_nocase?: Maybe<Scalars['String']>
  transaction_starts_with?: Maybe<Scalars['String']>
  transaction_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_not_starts_with?: Maybe<Scalars['String']>
  transaction_not_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_ends_with?: Maybe<Scalars['String']>
  transaction_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_not_ends_with?: Maybe<Scalars['String']>
  transaction_not_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_?: Maybe<Transaction_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<TokenTransfer_Filter>>>
  or?: Maybe<Array<Maybe<TokenTransfer_Filter>>>
}

export enum TokenTransfer_OrderBy {
  Id = 'id',
  Token = 'token',
  TokenId = 'token__id',
  TokenTotalSupply = 'token__totalSupply',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  From = 'from',
  To = 'to',
  Amount = 'amount',
  Transaction = 'transaction',
  TransactionId = 'transaction__id',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
}

export type TokensStaked = {
  __typename?: 'TokensStaked'
  id: Scalars['Bytes']
  staker: Scalars['Bytes']
  stakingPosition: StakingPosition
  amount: Scalars['BigInt']
  blockNumber: Scalars['BigInt']
  blockTimestamp: Scalars['BigInt']
  transactionHash: Scalars['Bytes']
}

export type TokensStaked_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  staker?: Maybe<Scalars['Bytes']>
  staker_not?: Maybe<Scalars['Bytes']>
  staker_gt?: Maybe<Scalars['Bytes']>
  staker_lt?: Maybe<Scalars['Bytes']>
  staker_gte?: Maybe<Scalars['Bytes']>
  staker_lte?: Maybe<Scalars['Bytes']>
  staker_in?: Maybe<Array<Scalars['Bytes']>>
  staker_not_in?: Maybe<Array<Scalars['Bytes']>>
  staker_contains?: Maybe<Scalars['Bytes']>
  staker_not_contains?: Maybe<Scalars['Bytes']>
  stakingPosition?: Maybe<Scalars['String']>
  stakingPosition_not?: Maybe<Scalars['String']>
  stakingPosition_gt?: Maybe<Scalars['String']>
  stakingPosition_lt?: Maybe<Scalars['String']>
  stakingPosition_gte?: Maybe<Scalars['String']>
  stakingPosition_lte?: Maybe<Scalars['String']>
  stakingPosition_in?: Maybe<Array<Scalars['String']>>
  stakingPosition_not_in?: Maybe<Array<Scalars['String']>>
  stakingPosition_contains?: Maybe<Scalars['String']>
  stakingPosition_contains_nocase?: Maybe<Scalars['String']>
  stakingPosition_not_contains?: Maybe<Scalars['String']>
  stakingPosition_not_contains_nocase?: Maybe<Scalars['String']>
  stakingPosition_starts_with?: Maybe<Scalars['String']>
  stakingPosition_starts_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_not_starts_with?: Maybe<Scalars['String']>
  stakingPosition_not_starts_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_ends_with?: Maybe<Scalars['String']>
  stakingPosition_ends_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_not_ends_with?: Maybe<Scalars['String']>
  stakingPosition_not_ends_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_?: Maybe<StakingPosition_Filter>
  amount?: Maybe<Scalars['BigInt']>
  amount_not?: Maybe<Scalars['BigInt']>
  amount_gt?: Maybe<Scalars['BigInt']>
  amount_lt?: Maybe<Scalars['BigInt']>
  amount_gte?: Maybe<Scalars['BigInt']>
  amount_lte?: Maybe<Scalars['BigInt']>
  amount_in?: Maybe<Array<Scalars['BigInt']>>
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>
  blockNumber?: Maybe<Scalars['BigInt']>
  blockNumber_not?: Maybe<Scalars['BigInt']>
  blockNumber_gt?: Maybe<Scalars['BigInt']>
  blockNumber_lt?: Maybe<Scalars['BigInt']>
  blockNumber_gte?: Maybe<Scalars['BigInt']>
  blockNumber_lte?: Maybe<Scalars['BigInt']>
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  blockTimestamp?: Maybe<Scalars['BigInt']>
  blockTimestamp_not?: Maybe<Scalars['BigInt']>
  blockTimestamp_gt?: Maybe<Scalars['BigInt']>
  blockTimestamp_lt?: Maybe<Scalars['BigInt']>
  blockTimestamp_gte?: Maybe<Scalars['BigInt']>
  blockTimestamp_lte?: Maybe<Scalars['BigInt']>
  blockTimestamp_in?: Maybe<Array<Scalars['BigInt']>>
  blockTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  transactionHash?: Maybe<Scalars['Bytes']>
  transactionHash_not?: Maybe<Scalars['Bytes']>
  transactionHash_gt?: Maybe<Scalars['Bytes']>
  transactionHash_lt?: Maybe<Scalars['Bytes']>
  transactionHash_gte?: Maybe<Scalars['Bytes']>
  transactionHash_lte?: Maybe<Scalars['Bytes']>
  transactionHash_in?: Maybe<Array<Scalars['Bytes']>>
  transactionHash_not_in?: Maybe<Array<Scalars['Bytes']>>
  transactionHash_contains?: Maybe<Scalars['Bytes']>
  transactionHash_not_contains?: Maybe<Scalars['Bytes']>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<TokensStaked_Filter>>>
  or?: Maybe<Array<Maybe<TokensStaked_Filter>>>
}

export enum TokensStaked_OrderBy {
  Id = 'id',
  Staker = 'staker',
  StakingPosition = 'stakingPosition',
  StakingPositionId = 'stakingPosition__id',
  StakingPositionStakedBalance = 'stakingPosition__stakedBalance',
  StakingPositionTotalRewardsClaimed = 'stakingPosition__totalRewardsClaimed',
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  TransactionHash = 'transactionHash',
}

export type TokensWithdrawn = {
  __typename?: 'TokensWithdrawn'
  id: Scalars['Bytes']
  staker: Scalars['Bytes']
  stakingPosition: StakingPosition
  amount: Scalars['BigInt']
  blockNumber: Scalars['BigInt']
  blockTimestamp: Scalars['BigInt']
  transactionHash: Scalars['Bytes']
}

export type TokensWithdrawn_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  staker?: Maybe<Scalars['Bytes']>
  staker_not?: Maybe<Scalars['Bytes']>
  staker_gt?: Maybe<Scalars['Bytes']>
  staker_lt?: Maybe<Scalars['Bytes']>
  staker_gte?: Maybe<Scalars['Bytes']>
  staker_lte?: Maybe<Scalars['Bytes']>
  staker_in?: Maybe<Array<Scalars['Bytes']>>
  staker_not_in?: Maybe<Array<Scalars['Bytes']>>
  staker_contains?: Maybe<Scalars['Bytes']>
  staker_not_contains?: Maybe<Scalars['Bytes']>
  stakingPosition?: Maybe<Scalars['String']>
  stakingPosition_not?: Maybe<Scalars['String']>
  stakingPosition_gt?: Maybe<Scalars['String']>
  stakingPosition_lt?: Maybe<Scalars['String']>
  stakingPosition_gte?: Maybe<Scalars['String']>
  stakingPosition_lte?: Maybe<Scalars['String']>
  stakingPosition_in?: Maybe<Array<Scalars['String']>>
  stakingPosition_not_in?: Maybe<Array<Scalars['String']>>
  stakingPosition_contains?: Maybe<Scalars['String']>
  stakingPosition_contains_nocase?: Maybe<Scalars['String']>
  stakingPosition_not_contains?: Maybe<Scalars['String']>
  stakingPosition_not_contains_nocase?: Maybe<Scalars['String']>
  stakingPosition_starts_with?: Maybe<Scalars['String']>
  stakingPosition_starts_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_not_starts_with?: Maybe<Scalars['String']>
  stakingPosition_not_starts_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_ends_with?: Maybe<Scalars['String']>
  stakingPosition_ends_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_not_ends_with?: Maybe<Scalars['String']>
  stakingPosition_not_ends_with_nocase?: Maybe<Scalars['String']>
  stakingPosition_?: Maybe<StakingPosition_Filter>
  amount?: Maybe<Scalars['BigInt']>
  amount_not?: Maybe<Scalars['BigInt']>
  amount_gt?: Maybe<Scalars['BigInt']>
  amount_lt?: Maybe<Scalars['BigInt']>
  amount_gte?: Maybe<Scalars['BigInt']>
  amount_lte?: Maybe<Scalars['BigInt']>
  amount_in?: Maybe<Array<Scalars['BigInt']>>
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>
  blockNumber?: Maybe<Scalars['BigInt']>
  blockNumber_not?: Maybe<Scalars['BigInt']>
  blockNumber_gt?: Maybe<Scalars['BigInt']>
  blockNumber_lt?: Maybe<Scalars['BigInt']>
  blockNumber_gte?: Maybe<Scalars['BigInt']>
  blockNumber_lte?: Maybe<Scalars['BigInt']>
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  blockTimestamp?: Maybe<Scalars['BigInt']>
  blockTimestamp_not?: Maybe<Scalars['BigInt']>
  blockTimestamp_gt?: Maybe<Scalars['BigInt']>
  blockTimestamp_lt?: Maybe<Scalars['BigInt']>
  blockTimestamp_gte?: Maybe<Scalars['BigInt']>
  blockTimestamp_lte?: Maybe<Scalars['BigInt']>
  blockTimestamp_in?: Maybe<Array<Scalars['BigInt']>>
  blockTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  transactionHash?: Maybe<Scalars['Bytes']>
  transactionHash_not?: Maybe<Scalars['Bytes']>
  transactionHash_gt?: Maybe<Scalars['Bytes']>
  transactionHash_lt?: Maybe<Scalars['Bytes']>
  transactionHash_gte?: Maybe<Scalars['Bytes']>
  transactionHash_lte?: Maybe<Scalars['Bytes']>
  transactionHash_in?: Maybe<Array<Scalars['Bytes']>>
  transactionHash_not_in?: Maybe<Array<Scalars['Bytes']>>
  transactionHash_contains?: Maybe<Scalars['Bytes']>
  transactionHash_not_contains?: Maybe<Scalars['Bytes']>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<TokensWithdrawn_Filter>>>
  or?: Maybe<Array<Maybe<TokensWithdrawn_Filter>>>
}

export enum TokensWithdrawn_OrderBy {
  Id = 'id',
  Staker = 'staker',
  StakingPosition = 'stakingPosition',
  StakingPositionId = 'stakingPosition__id',
  StakingPositionStakedBalance = 'stakingPosition__stakedBalance',
  StakingPositionTotalRewardsClaimed = 'stakingPosition__totalRewardsClaimed',
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  TransactionHash = 'transactionHash',
}

export type TradingMining = {
  __typename?: 'TradingMining'
  id: Scalars['Bytes']
  totalRewards: Scalars['BigInt']
  rewardToken1: Scalars['Bytes']
  rewardToken2: Scalars['Bytes']
  token1Percentage: Scalars['Int']
  startTime: Scalars['BigInt']
  epochDuration: Scalars['BigInt']
  pcdHolderBonusPercentage: Scalars['Int']
  maxRewardPerEpochPerAddress: Scalars['BigInt']
}

export type TradingMiningEpoch = {
  __typename?: 'TradingMiningEpoch'
  id: Scalars['Bytes']
  epoch: Scalars['BigInt']
  totalVolume: Scalars['BigInt']
  totalRewards: Scalars['BigInt']
  token1Percentage: Scalars['Int']
}

export type TradingMiningEpochVolume = {
  __typename?: 'TradingMiningEpochVolume'
  id: Scalars['Bytes']
  epoch: Scalars['BigInt']
  volume: Scalars['BigInt']
  trader: Account
}

export type TradingMiningEpochVolume_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  epoch?: Maybe<Scalars['BigInt']>
  epoch_not?: Maybe<Scalars['BigInt']>
  epoch_gt?: Maybe<Scalars['BigInt']>
  epoch_lt?: Maybe<Scalars['BigInt']>
  epoch_gte?: Maybe<Scalars['BigInt']>
  epoch_lte?: Maybe<Scalars['BigInt']>
  epoch_in?: Maybe<Array<Scalars['BigInt']>>
  epoch_not_in?: Maybe<Array<Scalars['BigInt']>>
  volume?: Maybe<Scalars['BigInt']>
  volume_not?: Maybe<Scalars['BigInt']>
  volume_gt?: Maybe<Scalars['BigInt']>
  volume_lt?: Maybe<Scalars['BigInt']>
  volume_gte?: Maybe<Scalars['BigInt']>
  volume_lte?: Maybe<Scalars['BigInt']>
  volume_in?: Maybe<Array<Scalars['BigInt']>>
  volume_not_in?: Maybe<Array<Scalars['BigInt']>>
  trader?: Maybe<Scalars['String']>
  trader_not?: Maybe<Scalars['String']>
  trader_gt?: Maybe<Scalars['String']>
  trader_lt?: Maybe<Scalars['String']>
  trader_gte?: Maybe<Scalars['String']>
  trader_lte?: Maybe<Scalars['String']>
  trader_in?: Maybe<Array<Scalars['String']>>
  trader_not_in?: Maybe<Array<Scalars['String']>>
  trader_contains?: Maybe<Scalars['String']>
  trader_contains_nocase?: Maybe<Scalars['String']>
  trader_not_contains?: Maybe<Scalars['String']>
  trader_not_contains_nocase?: Maybe<Scalars['String']>
  trader_starts_with?: Maybe<Scalars['String']>
  trader_starts_with_nocase?: Maybe<Scalars['String']>
  trader_not_starts_with?: Maybe<Scalars['String']>
  trader_not_starts_with_nocase?: Maybe<Scalars['String']>
  trader_ends_with?: Maybe<Scalars['String']>
  trader_ends_with_nocase?: Maybe<Scalars['String']>
  trader_not_ends_with?: Maybe<Scalars['String']>
  trader_not_ends_with_nocase?: Maybe<Scalars['String']>
  trader_?: Maybe<Account_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<TradingMiningEpochVolume_Filter>>>
  or?: Maybe<Array<Maybe<TradingMiningEpochVolume_Filter>>>
}

export enum TradingMiningEpochVolume_OrderBy {
  Id = 'id',
  Epoch = 'epoch',
  Volume = 'volume',
  Trader = 'trader',
  TraderId = 'trader__id',
  TraderRealizedPnl = 'trader__realizedPnl',
  TraderNumberOfUnwinds = 'trader__numberOfUnwinds',
  TraderNumberOfLiquidatedPositions = 'trader__numberOfLiquidatedPositions',
  TraderNumberOfOpenPositions = 'trader__numberOfOpenPositions',
  TraderPlanckCatBalance = 'trader__planckCatBalance',
  TraderOvlVolumeTraded = 'trader__ovlVolumeTraded',
}

export type TradingMiningEpoch_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  epoch?: Maybe<Scalars['BigInt']>
  epoch_not?: Maybe<Scalars['BigInt']>
  epoch_gt?: Maybe<Scalars['BigInt']>
  epoch_lt?: Maybe<Scalars['BigInt']>
  epoch_gte?: Maybe<Scalars['BigInt']>
  epoch_lte?: Maybe<Scalars['BigInt']>
  epoch_in?: Maybe<Array<Scalars['BigInt']>>
  epoch_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalVolume?: Maybe<Scalars['BigInt']>
  totalVolume_not?: Maybe<Scalars['BigInt']>
  totalVolume_gt?: Maybe<Scalars['BigInt']>
  totalVolume_lt?: Maybe<Scalars['BigInt']>
  totalVolume_gte?: Maybe<Scalars['BigInt']>
  totalVolume_lte?: Maybe<Scalars['BigInt']>
  totalVolume_in?: Maybe<Array<Scalars['BigInt']>>
  totalVolume_not_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewards?: Maybe<Scalars['BigInt']>
  totalRewards_not?: Maybe<Scalars['BigInt']>
  totalRewards_gt?: Maybe<Scalars['BigInt']>
  totalRewards_lt?: Maybe<Scalars['BigInt']>
  totalRewards_gte?: Maybe<Scalars['BigInt']>
  totalRewards_lte?: Maybe<Scalars['BigInt']>
  totalRewards_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewards_not_in?: Maybe<Array<Scalars['BigInt']>>
  token1Percentage?: Maybe<Scalars['Int']>
  token1Percentage_not?: Maybe<Scalars['Int']>
  token1Percentage_gt?: Maybe<Scalars['Int']>
  token1Percentage_lt?: Maybe<Scalars['Int']>
  token1Percentage_gte?: Maybe<Scalars['Int']>
  token1Percentage_lte?: Maybe<Scalars['Int']>
  token1Percentage_in?: Maybe<Array<Scalars['Int']>>
  token1Percentage_not_in?: Maybe<Array<Scalars['Int']>>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<TradingMiningEpoch_Filter>>>
  or?: Maybe<Array<Maybe<TradingMiningEpoch_Filter>>>
}

export enum TradingMiningEpoch_OrderBy {
  Id = 'id',
  Epoch = 'epoch',
  TotalVolume = 'totalVolume',
  TotalRewards = 'totalRewards',
  Token1Percentage = 'token1Percentage',
}

export type TradingMining_Filter = {
  id?: Maybe<Scalars['Bytes']>
  id_not?: Maybe<Scalars['Bytes']>
  id_gt?: Maybe<Scalars['Bytes']>
  id_lt?: Maybe<Scalars['Bytes']>
  id_gte?: Maybe<Scalars['Bytes']>
  id_lte?: Maybe<Scalars['Bytes']>
  id_in?: Maybe<Array<Scalars['Bytes']>>
  id_not_in?: Maybe<Array<Scalars['Bytes']>>
  id_contains?: Maybe<Scalars['Bytes']>
  id_not_contains?: Maybe<Scalars['Bytes']>
  totalRewards?: Maybe<Scalars['BigInt']>
  totalRewards_not?: Maybe<Scalars['BigInt']>
  totalRewards_gt?: Maybe<Scalars['BigInt']>
  totalRewards_lt?: Maybe<Scalars['BigInt']>
  totalRewards_gte?: Maybe<Scalars['BigInt']>
  totalRewards_lte?: Maybe<Scalars['BigInt']>
  totalRewards_in?: Maybe<Array<Scalars['BigInt']>>
  totalRewards_not_in?: Maybe<Array<Scalars['BigInt']>>
  rewardToken1?: Maybe<Scalars['Bytes']>
  rewardToken1_not?: Maybe<Scalars['Bytes']>
  rewardToken1_gt?: Maybe<Scalars['Bytes']>
  rewardToken1_lt?: Maybe<Scalars['Bytes']>
  rewardToken1_gte?: Maybe<Scalars['Bytes']>
  rewardToken1_lte?: Maybe<Scalars['Bytes']>
  rewardToken1_in?: Maybe<Array<Scalars['Bytes']>>
  rewardToken1_not_in?: Maybe<Array<Scalars['Bytes']>>
  rewardToken1_contains?: Maybe<Scalars['Bytes']>
  rewardToken1_not_contains?: Maybe<Scalars['Bytes']>
  rewardToken2?: Maybe<Scalars['Bytes']>
  rewardToken2_not?: Maybe<Scalars['Bytes']>
  rewardToken2_gt?: Maybe<Scalars['Bytes']>
  rewardToken2_lt?: Maybe<Scalars['Bytes']>
  rewardToken2_gte?: Maybe<Scalars['Bytes']>
  rewardToken2_lte?: Maybe<Scalars['Bytes']>
  rewardToken2_in?: Maybe<Array<Scalars['Bytes']>>
  rewardToken2_not_in?: Maybe<Array<Scalars['Bytes']>>
  rewardToken2_contains?: Maybe<Scalars['Bytes']>
  rewardToken2_not_contains?: Maybe<Scalars['Bytes']>
  token1Percentage?: Maybe<Scalars['Int']>
  token1Percentage_not?: Maybe<Scalars['Int']>
  token1Percentage_gt?: Maybe<Scalars['Int']>
  token1Percentage_lt?: Maybe<Scalars['Int']>
  token1Percentage_gte?: Maybe<Scalars['Int']>
  token1Percentage_lte?: Maybe<Scalars['Int']>
  token1Percentage_in?: Maybe<Array<Scalars['Int']>>
  token1Percentage_not_in?: Maybe<Array<Scalars['Int']>>
  startTime?: Maybe<Scalars['BigInt']>
  startTime_not?: Maybe<Scalars['BigInt']>
  startTime_gt?: Maybe<Scalars['BigInt']>
  startTime_lt?: Maybe<Scalars['BigInt']>
  startTime_gte?: Maybe<Scalars['BigInt']>
  startTime_lte?: Maybe<Scalars['BigInt']>
  startTime_in?: Maybe<Array<Scalars['BigInt']>>
  startTime_not_in?: Maybe<Array<Scalars['BigInt']>>
  epochDuration?: Maybe<Scalars['BigInt']>
  epochDuration_not?: Maybe<Scalars['BigInt']>
  epochDuration_gt?: Maybe<Scalars['BigInt']>
  epochDuration_lt?: Maybe<Scalars['BigInt']>
  epochDuration_gte?: Maybe<Scalars['BigInt']>
  epochDuration_lte?: Maybe<Scalars['BigInt']>
  epochDuration_in?: Maybe<Array<Scalars['BigInt']>>
  epochDuration_not_in?: Maybe<Array<Scalars['BigInt']>>
  pcdHolderBonusPercentage?: Maybe<Scalars['Int']>
  pcdHolderBonusPercentage_not?: Maybe<Scalars['Int']>
  pcdHolderBonusPercentage_gt?: Maybe<Scalars['Int']>
  pcdHolderBonusPercentage_lt?: Maybe<Scalars['Int']>
  pcdHolderBonusPercentage_gte?: Maybe<Scalars['Int']>
  pcdHolderBonusPercentage_lte?: Maybe<Scalars['Int']>
  pcdHolderBonusPercentage_in?: Maybe<Array<Scalars['Int']>>
  pcdHolderBonusPercentage_not_in?: Maybe<Array<Scalars['Int']>>
  maxRewardPerEpochPerAddress?: Maybe<Scalars['BigInt']>
  maxRewardPerEpochPerAddress_not?: Maybe<Scalars['BigInt']>
  maxRewardPerEpochPerAddress_gt?: Maybe<Scalars['BigInt']>
  maxRewardPerEpochPerAddress_lt?: Maybe<Scalars['BigInt']>
  maxRewardPerEpochPerAddress_gte?: Maybe<Scalars['BigInt']>
  maxRewardPerEpochPerAddress_lte?: Maybe<Scalars['BigInt']>
  maxRewardPerEpochPerAddress_in?: Maybe<Array<Scalars['BigInt']>>
  maxRewardPerEpochPerAddress_not_in?: Maybe<Array<Scalars['BigInt']>>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<TradingMining_Filter>>>
  or?: Maybe<Array<Maybe<TradingMining_Filter>>>
}

export enum TradingMining_OrderBy {
  Id = 'id',
  TotalRewards = 'totalRewards',
  RewardToken1 = 'rewardToken1',
  RewardToken2 = 'rewardToken2',
  Token1Percentage = 'token1Percentage',
  StartTime = 'startTime',
  EpochDuration = 'epochDuration',
  PcdHolderBonusPercentage = 'pcdHolderBonusPercentage',
  MaxRewardPerEpochPerAddress = 'maxRewardPerEpochPerAddress',
}

export type Transaction = {
  __typename?: 'Transaction'
  id: Scalars['ID']
  blockNumber: Scalars['BigInt']
  timestamp: Scalars['BigInt']
  gasLimit: Scalars['BigInt']
  gasPrice: Scalars['BigInt']
  builds: Array<Build>
  unwinds: Array<Unwind>
  liquidates: Array<Liquidate>
  tokenTransfers: Array<TokenTransfer>
}

export type TransactionBuildsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Build_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Build_Filter>
}

export type TransactionUnwindsArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Unwind_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Unwind_Filter>
}

export type TransactionLiquidatesArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Liquidate_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<Liquidate_Filter>
}

export type TransactionTokenTransfersArgs = {
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TokenTransfer_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  where?: Maybe<TokenTransfer_Filter>
}

export type Transaction_Filter = {
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_lt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  blockNumber?: Maybe<Scalars['BigInt']>
  blockNumber_not?: Maybe<Scalars['BigInt']>
  blockNumber_gt?: Maybe<Scalars['BigInt']>
  blockNumber_lt?: Maybe<Scalars['BigInt']>
  blockNumber_gte?: Maybe<Scalars['BigInt']>
  blockNumber_lte?: Maybe<Scalars['BigInt']>
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  timestamp?: Maybe<Scalars['BigInt']>
  timestamp_not?: Maybe<Scalars['BigInt']>
  timestamp_gt?: Maybe<Scalars['BigInt']>
  timestamp_lt?: Maybe<Scalars['BigInt']>
  timestamp_gte?: Maybe<Scalars['BigInt']>
  timestamp_lte?: Maybe<Scalars['BigInt']>
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  gasLimit?: Maybe<Scalars['BigInt']>
  gasLimit_not?: Maybe<Scalars['BigInt']>
  gasLimit_gt?: Maybe<Scalars['BigInt']>
  gasLimit_lt?: Maybe<Scalars['BigInt']>
  gasLimit_gte?: Maybe<Scalars['BigInt']>
  gasLimit_lte?: Maybe<Scalars['BigInt']>
  gasLimit_in?: Maybe<Array<Scalars['BigInt']>>
  gasLimit_not_in?: Maybe<Array<Scalars['BigInt']>>
  gasPrice?: Maybe<Scalars['BigInt']>
  gasPrice_not?: Maybe<Scalars['BigInt']>
  gasPrice_gt?: Maybe<Scalars['BigInt']>
  gasPrice_lt?: Maybe<Scalars['BigInt']>
  gasPrice_gte?: Maybe<Scalars['BigInt']>
  gasPrice_lte?: Maybe<Scalars['BigInt']>
  gasPrice_in?: Maybe<Array<Scalars['BigInt']>>
  gasPrice_not_in?: Maybe<Array<Scalars['BigInt']>>
  builds_?: Maybe<Build_Filter>
  unwinds_?: Maybe<Unwind_Filter>
  liquidates_?: Maybe<Liquidate_Filter>
  tokenTransfers_?: Maybe<TokenTransfer_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Transaction_Filter>>>
  or?: Maybe<Array<Maybe<Transaction_Filter>>>
}

export enum Transaction_OrderBy {
  Id = 'id',
  BlockNumber = 'blockNumber',
  Timestamp = 'timestamp',
  GasLimit = 'gasLimit',
  GasPrice = 'gasPrice',
  Builds = 'builds',
  Unwinds = 'unwinds',
  Liquidates = 'liquidates',
  TokenTransfers = 'tokenTransfers',
}

export type Unwind = {
  __typename?: 'Unwind'
  id: Scalars['ID']
  owner: Account
  position: Position
  unwindNumber: Scalars['BigInt']
  currentOi: Scalars['BigInt']
  currentDebt: Scalars['BigInt']
  isLong: Scalars['Boolean']
  price: Scalars['BigInt']
  fraction: Scalars['BigInt']
  fractionOfPosition: Scalars['BigInt']
  transferAmount: Scalars['BigInt']
  pnl: Scalars['BigInt']
  feeAmount: Scalars['BigInt']
  size: Scalars['BigInt']
  volume: Scalars['BigInt']
  mint: Scalars['BigInt']
  collateral: Scalars['BigInt']
  value: Scalars['BigInt']
  timestamp: Scalars['BigInt']
  transaction: Transaction
}

export type Unwind_Filter = {
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_lt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  owner?: Maybe<Scalars['String']>
  owner_not?: Maybe<Scalars['String']>
  owner_gt?: Maybe<Scalars['String']>
  owner_lt?: Maybe<Scalars['String']>
  owner_gte?: Maybe<Scalars['String']>
  owner_lte?: Maybe<Scalars['String']>
  owner_in?: Maybe<Array<Scalars['String']>>
  owner_not_in?: Maybe<Array<Scalars['String']>>
  owner_contains?: Maybe<Scalars['String']>
  owner_contains_nocase?: Maybe<Scalars['String']>
  owner_not_contains?: Maybe<Scalars['String']>
  owner_not_contains_nocase?: Maybe<Scalars['String']>
  owner_starts_with?: Maybe<Scalars['String']>
  owner_starts_with_nocase?: Maybe<Scalars['String']>
  owner_not_starts_with?: Maybe<Scalars['String']>
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>
  owner_ends_with?: Maybe<Scalars['String']>
  owner_ends_with_nocase?: Maybe<Scalars['String']>
  owner_not_ends_with?: Maybe<Scalars['String']>
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner_?: Maybe<Account_Filter>
  position?: Maybe<Scalars['String']>
  position_not?: Maybe<Scalars['String']>
  position_gt?: Maybe<Scalars['String']>
  position_lt?: Maybe<Scalars['String']>
  position_gte?: Maybe<Scalars['String']>
  position_lte?: Maybe<Scalars['String']>
  position_in?: Maybe<Array<Scalars['String']>>
  position_not_in?: Maybe<Array<Scalars['String']>>
  position_contains?: Maybe<Scalars['String']>
  position_contains_nocase?: Maybe<Scalars['String']>
  position_not_contains?: Maybe<Scalars['String']>
  position_not_contains_nocase?: Maybe<Scalars['String']>
  position_starts_with?: Maybe<Scalars['String']>
  position_starts_with_nocase?: Maybe<Scalars['String']>
  position_not_starts_with?: Maybe<Scalars['String']>
  position_not_starts_with_nocase?: Maybe<Scalars['String']>
  position_ends_with?: Maybe<Scalars['String']>
  position_ends_with_nocase?: Maybe<Scalars['String']>
  position_not_ends_with?: Maybe<Scalars['String']>
  position_not_ends_with_nocase?: Maybe<Scalars['String']>
  position_?: Maybe<Position_Filter>
  unwindNumber?: Maybe<Scalars['BigInt']>
  unwindNumber_not?: Maybe<Scalars['BigInt']>
  unwindNumber_gt?: Maybe<Scalars['BigInt']>
  unwindNumber_lt?: Maybe<Scalars['BigInt']>
  unwindNumber_gte?: Maybe<Scalars['BigInt']>
  unwindNumber_lte?: Maybe<Scalars['BigInt']>
  unwindNumber_in?: Maybe<Array<Scalars['BigInt']>>
  unwindNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  currentOi?: Maybe<Scalars['BigInt']>
  currentOi_not?: Maybe<Scalars['BigInt']>
  currentOi_gt?: Maybe<Scalars['BigInt']>
  currentOi_lt?: Maybe<Scalars['BigInt']>
  currentOi_gte?: Maybe<Scalars['BigInt']>
  currentOi_lte?: Maybe<Scalars['BigInt']>
  currentOi_in?: Maybe<Array<Scalars['BigInt']>>
  currentOi_not_in?: Maybe<Array<Scalars['BigInt']>>
  currentDebt?: Maybe<Scalars['BigInt']>
  currentDebt_not?: Maybe<Scalars['BigInt']>
  currentDebt_gt?: Maybe<Scalars['BigInt']>
  currentDebt_lt?: Maybe<Scalars['BigInt']>
  currentDebt_gte?: Maybe<Scalars['BigInt']>
  currentDebt_lte?: Maybe<Scalars['BigInt']>
  currentDebt_in?: Maybe<Array<Scalars['BigInt']>>
  currentDebt_not_in?: Maybe<Array<Scalars['BigInt']>>
  isLong?: Maybe<Scalars['Boolean']>
  isLong_not?: Maybe<Scalars['Boolean']>
  isLong_in?: Maybe<Array<Scalars['Boolean']>>
  isLong_not_in?: Maybe<Array<Scalars['Boolean']>>
  price?: Maybe<Scalars['BigInt']>
  price_not?: Maybe<Scalars['BigInt']>
  price_gt?: Maybe<Scalars['BigInt']>
  price_lt?: Maybe<Scalars['BigInt']>
  price_gte?: Maybe<Scalars['BigInt']>
  price_lte?: Maybe<Scalars['BigInt']>
  price_in?: Maybe<Array<Scalars['BigInt']>>
  price_not_in?: Maybe<Array<Scalars['BigInt']>>
  fraction?: Maybe<Scalars['BigInt']>
  fraction_not?: Maybe<Scalars['BigInt']>
  fraction_gt?: Maybe<Scalars['BigInt']>
  fraction_lt?: Maybe<Scalars['BigInt']>
  fraction_gte?: Maybe<Scalars['BigInt']>
  fraction_lte?: Maybe<Scalars['BigInt']>
  fraction_in?: Maybe<Array<Scalars['BigInt']>>
  fraction_not_in?: Maybe<Array<Scalars['BigInt']>>
  fractionOfPosition?: Maybe<Scalars['BigInt']>
  fractionOfPosition_not?: Maybe<Scalars['BigInt']>
  fractionOfPosition_gt?: Maybe<Scalars['BigInt']>
  fractionOfPosition_lt?: Maybe<Scalars['BigInt']>
  fractionOfPosition_gte?: Maybe<Scalars['BigInt']>
  fractionOfPosition_lte?: Maybe<Scalars['BigInt']>
  fractionOfPosition_in?: Maybe<Array<Scalars['BigInt']>>
  fractionOfPosition_not_in?: Maybe<Array<Scalars['BigInt']>>
  transferAmount?: Maybe<Scalars['BigInt']>
  transferAmount_not?: Maybe<Scalars['BigInt']>
  transferAmount_gt?: Maybe<Scalars['BigInt']>
  transferAmount_lt?: Maybe<Scalars['BigInt']>
  transferAmount_gte?: Maybe<Scalars['BigInt']>
  transferAmount_lte?: Maybe<Scalars['BigInt']>
  transferAmount_in?: Maybe<Array<Scalars['BigInt']>>
  transferAmount_not_in?: Maybe<Array<Scalars['BigInt']>>
  pnl?: Maybe<Scalars['BigInt']>
  pnl_not?: Maybe<Scalars['BigInt']>
  pnl_gt?: Maybe<Scalars['BigInt']>
  pnl_lt?: Maybe<Scalars['BigInt']>
  pnl_gte?: Maybe<Scalars['BigInt']>
  pnl_lte?: Maybe<Scalars['BigInt']>
  pnl_in?: Maybe<Array<Scalars['BigInt']>>
  pnl_not_in?: Maybe<Array<Scalars['BigInt']>>
  feeAmount?: Maybe<Scalars['BigInt']>
  feeAmount_not?: Maybe<Scalars['BigInt']>
  feeAmount_gt?: Maybe<Scalars['BigInt']>
  feeAmount_lt?: Maybe<Scalars['BigInt']>
  feeAmount_gte?: Maybe<Scalars['BigInt']>
  feeAmount_lte?: Maybe<Scalars['BigInt']>
  feeAmount_in?: Maybe<Array<Scalars['BigInt']>>
  feeAmount_not_in?: Maybe<Array<Scalars['BigInt']>>
  size?: Maybe<Scalars['BigInt']>
  size_not?: Maybe<Scalars['BigInt']>
  size_gt?: Maybe<Scalars['BigInt']>
  size_lt?: Maybe<Scalars['BigInt']>
  size_gte?: Maybe<Scalars['BigInt']>
  size_lte?: Maybe<Scalars['BigInt']>
  size_in?: Maybe<Array<Scalars['BigInt']>>
  size_not_in?: Maybe<Array<Scalars['BigInt']>>
  volume?: Maybe<Scalars['BigInt']>
  volume_not?: Maybe<Scalars['BigInt']>
  volume_gt?: Maybe<Scalars['BigInt']>
  volume_lt?: Maybe<Scalars['BigInt']>
  volume_gte?: Maybe<Scalars['BigInt']>
  volume_lte?: Maybe<Scalars['BigInt']>
  volume_in?: Maybe<Array<Scalars['BigInt']>>
  volume_not_in?: Maybe<Array<Scalars['BigInt']>>
  mint?: Maybe<Scalars['BigInt']>
  mint_not?: Maybe<Scalars['BigInt']>
  mint_gt?: Maybe<Scalars['BigInt']>
  mint_lt?: Maybe<Scalars['BigInt']>
  mint_gte?: Maybe<Scalars['BigInt']>
  mint_lte?: Maybe<Scalars['BigInt']>
  mint_in?: Maybe<Array<Scalars['BigInt']>>
  mint_not_in?: Maybe<Array<Scalars['BigInt']>>
  collateral?: Maybe<Scalars['BigInt']>
  collateral_not?: Maybe<Scalars['BigInt']>
  collateral_gt?: Maybe<Scalars['BigInt']>
  collateral_lt?: Maybe<Scalars['BigInt']>
  collateral_gte?: Maybe<Scalars['BigInt']>
  collateral_lte?: Maybe<Scalars['BigInt']>
  collateral_in?: Maybe<Array<Scalars['BigInt']>>
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>
  value?: Maybe<Scalars['BigInt']>
  value_not?: Maybe<Scalars['BigInt']>
  value_gt?: Maybe<Scalars['BigInt']>
  value_lt?: Maybe<Scalars['BigInt']>
  value_gte?: Maybe<Scalars['BigInt']>
  value_lte?: Maybe<Scalars['BigInt']>
  value_in?: Maybe<Array<Scalars['BigInt']>>
  value_not_in?: Maybe<Array<Scalars['BigInt']>>
  timestamp?: Maybe<Scalars['BigInt']>
  timestamp_not?: Maybe<Scalars['BigInt']>
  timestamp_gt?: Maybe<Scalars['BigInt']>
  timestamp_lt?: Maybe<Scalars['BigInt']>
  timestamp_gte?: Maybe<Scalars['BigInt']>
  timestamp_lte?: Maybe<Scalars['BigInt']>
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  transaction?: Maybe<Scalars['String']>
  transaction_not?: Maybe<Scalars['String']>
  transaction_gt?: Maybe<Scalars['String']>
  transaction_lt?: Maybe<Scalars['String']>
  transaction_gte?: Maybe<Scalars['String']>
  transaction_lte?: Maybe<Scalars['String']>
  transaction_in?: Maybe<Array<Scalars['String']>>
  transaction_not_in?: Maybe<Array<Scalars['String']>>
  transaction_contains?: Maybe<Scalars['String']>
  transaction_contains_nocase?: Maybe<Scalars['String']>
  transaction_not_contains?: Maybe<Scalars['String']>
  transaction_not_contains_nocase?: Maybe<Scalars['String']>
  transaction_starts_with?: Maybe<Scalars['String']>
  transaction_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_not_starts_with?: Maybe<Scalars['String']>
  transaction_not_starts_with_nocase?: Maybe<Scalars['String']>
  transaction_ends_with?: Maybe<Scalars['String']>
  transaction_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_not_ends_with?: Maybe<Scalars['String']>
  transaction_not_ends_with_nocase?: Maybe<Scalars['String']>
  transaction_?: Maybe<Transaction_Filter>
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  and?: Maybe<Array<Maybe<Unwind_Filter>>>
  or?: Maybe<Array<Maybe<Unwind_Filter>>>
}

export enum Unwind_OrderBy {
  Id = 'id',
  Owner = 'owner',
  OwnerId = 'owner__id',
  OwnerRealizedPnl = 'owner__realizedPnl',
  OwnerNumberOfUnwinds = 'owner__numberOfUnwinds',
  OwnerNumberOfLiquidatedPositions = 'owner__numberOfLiquidatedPositions',
  OwnerNumberOfOpenPositions = 'owner__numberOfOpenPositions',
  OwnerPlanckCatBalance = 'owner__planckCatBalance',
  OwnerOvlVolumeTraded = 'owner__ovlVolumeTraded',
  Position = 'position',
  PositionId = 'position__id',
  PositionPositionId = 'position__positionId',
  PositionInitialOi = 'position__initialOi',
  PositionInitialDebt = 'position__initialDebt',
  PositionInitialCollateral = 'position__initialCollateral',
  PositionInitialNotional = 'position__initialNotional',
  PositionLeverage = 'position__leverage',
  PositionFractionUnwound = 'position__fractionUnwound',
  PositionIsLong = 'position__isLong',
  PositionEntryPrice = 'position__entryPrice',
  PositionIsLiquidated = 'position__isLiquidated',
  PositionCurrentOi = 'position__currentOi',
  PositionCurrentDebt = 'position__currentDebt',
  PositionMint = 'position__mint',
  PositionCreatedAtTimestamp = 'position__createdAtTimestamp',
  PositionCreatedAtBlockNumber = 'position__createdAtBlockNumber',
  PositionNumberOfUniwnds = 'position__numberOfUniwnds',
  UnwindNumber = 'unwindNumber',
  CurrentOi = 'currentOi',
  CurrentDebt = 'currentDebt',
  IsLong = 'isLong',
  Price = 'price',
  Fraction = 'fraction',
  FractionOfPosition = 'fractionOfPosition',
  TransferAmount = 'transferAmount',
  Pnl = 'pnl',
  FeeAmount = 'feeAmount',
  Size = 'size',
  Volume = 'volume',
  Mint = 'mint',
  Collateral = 'collateral',
  Value = 'value',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionId = 'transaction__id',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type PositionListQueryVariables = Exact<{
  account: Scalars['ID']
  marketPositionIdList: Maybe<Array<Scalars['ID']>>
}>

export type PositionListQuery = {__typename?: 'Query'} & {
  account?: Maybe<
    {__typename?: 'Account'} & {
      positions: Array<
        {__typename?: 'Position'} & Pick<
          Position,
          | 'id'
          | 'positionId'
          | 'initialOi'
          | 'initialDebt'
          | 'initialCollateral'
          | 'initialNotional'
          | 'leverage'
          | 'isLong'
          | 'entryPrice'
          | 'isLiquidated'
          | 'currentOi'
          | 'currentDebt'
          | 'mint'
          | 'createdAtTimestamp'
          | 'createdAtBlockNumber'
          | 'numberOfUniwnds'
          | 'fractionUnwound'
        > & {
            market: {__typename?: 'Market'} & Pick<Market, 'id' | 'feedAddress' | 'isShutdown'>
            builds: Array<{__typename?: 'Build'} & Pick<Build, 'collateral' | 'currentDebt' | 'currentOi' | 'id' | 'price' | 'timestamp' | 'value'>>
            liquidates: Array<
              {__typename?: 'Liquidate'} & Pick<
                Liquidate,
                'collateral' | 'currentDebt' | 'id' | 'currentOi' | 'isLong' | 'mint' | 'price' | 'timestamp' | 'value'
              >
            >
            unwinds: Array<
              {__typename?: 'Unwind'} & Pick<
                Unwind,
                | 'collateral'
                | 'currentDebt'
                | 'currentOi'
                | 'fraction'
                | 'id'
                | 'isLong'
                | 'mint'
                | 'timestamp'
                | 'price'
                | 'unwindNumber'
                | 'value'
                | 'transferAmount'
                | 'pnl'
                | 'size'
              >
            >
          }
      >
    }
  >
}

export type MarketQueryVariables = Exact<{
  market: Scalars['ID']
}>

export type MarketQuery = {__typename?: 'Query'} & {
  market?: Maybe<
    {__typename?: 'Market'} & Pick<
      Market,
      | 'id'
      | 'feedAddress'
      | 'k'
      | 'lmbda'
      | 'delta'
      | 'capPayoff'
      | 'capNotional'
      | 'capLeverage'
      | 'circuitBreakerWindow'
      | 'circuitBreakerMintTarget'
      | 'maintenanceMarginFraction'
      | 'maintenanceMarginBurnRate'
      | 'liquidationFeeRate'
      | 'tradingFeeRate'
      | 'minCollateral'
      | 'priceDriftUpperLimit'
      | 'averageBlockTime'
      | 'isShutdown'
    > & {factory: {__typename?: 'Factory'} & Pick<Factory, 'id'>}
  >
}

export type TotalMarketsQueryVariables = Exact<{[key: string]: never}>

export type TotalMarketsQuery = {__typename?: 'Query'} & {
  markets: Array<
    {__typename?: 'Market'} & Pick<
      Market,
      | 'id'
      | 'feedAddress'
      | 'k'
      | 'lmbda'
      | 'delta'
      | 'capPayoff'
      | 'capNotional'
      | 'capLeverage'
      | 'circuitBreakerWindow'
      | 'circuitBreakerMintTarget'
      | 'maintenanceMarginFraction'
      | 'maintenanceMarginBurnRate'
      | 'liquidationFeeRate'
      | 'tradingFeeRate'
      | 'minCollateral'
      | 'priceDriftUpperLimit'
      | 'averageBlockTime'
      | 'isShutdown'
    > & {factory: {__typename?: 'Factory'} & Pick<Factory, 'id'>}
  >
}

export type ActiveMarketsQueryVariables = Exact<{[key: string]: never}>

export type ActiveMarketsQuery = {__typename?: 'Query'} & {
  markets: Array<
    {__typename?: 'Market'} & Pick<
      Market,
      | 'id'
      | 'feedAddress'
      | 'k'
      | 'lmbda'
      | 'delta'
      | 'capPayoff'
      | 'capNotional'
      | 'capLeverage'
      | 'circuitBreakerWindow'
      | 'circuitBreakerMintTarget'
      | 'maintenanceMarginFraction'
      | 'maintenanceMarginBurnRate'
      | 'liquidationFeeRate'
      | 'tradingFeeRate'
      | 'minCollateral'
      | 'priceDriftUpperLimit'
      | 'averageBlockTime'
      | 'isShutdown'
    > & {factory: {__typename?: 'Factory'} & Pick<Factory, 'id'>}
  >
}

export type NumberOfPositionsQueryVariables = Exact<{
  account: Scalars['ID']
}>

export type NumberOfPositionsQuery = {__typename?: 'Query'} & {
  account?: Maybe<
    {__typename?: 'Account'} & Pick<Account, 'numberOfLiquidatedPositions' | 'numberOfOpenPositions' | 'numberOfUnwinds' | 'realizedPnl'>
  >
}

export type OpenPositionsQueryVariables = Exact<{
  account: Scalars['ID']
  first?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
}>

export type OpenPositionsQuery = {__typename?: 'Query'} & {
  account?: Maybe<
    {__typename?: 'Account'} & {
      positions: Array<
        {__typename?: 'Position'} & Pick<
          Position,
          | 'id'
          | 'createdAtTimestamp'
          | 'currentOi'
          | 'entryPrice'
          | 'initialCollateral'
          | 'isLiquidated'
          | 'isLong'
          | 'leverage'
          | 'numberOfUniwnds'
          | 'positionId'
        > & {market: {__typename?: 'Market'} & Pick<Market, 'feedAddress' | 'id'>}
      >
    }
  >
}

export type MarketOpenPositionsQueryVariables = Exact<{
  account: Scalars['ID']
  first?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
  marketId?: Maybe<Scalars['String']>
}>

export type MarketOpenPositionsQuery = {__typename?: 'Query'} & {
  account?: Maybe<
    {__typename?: 'Account'} & {
      positions: Array<
        {__typename?: 'Position'} & Pick<
          Position,
          | 'id'
          | 'createdAtTimestamp'
          | 'currentOi'
          | 'entryPrice'
          | 'initialCollateral'
          | 'isLiquidated'
          | 'isLong'
          | 'leverage'
          | 'numberOfUniwnds'
          | 'positionId'
        > & {market: {__typename?: 'Market'} & Pick<Market, 'feedAddress' | 'id'>}
      >
    }
  >
}

export type UnwindsQueryVariables = Exact<{
  account: Scalars['ID']
  first?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
}>

export type UnwindsQuery = {__typename?: 'Query'} & {
  account?: Maybe<
    {__typename?: 'Account'} & {
      unwinds: Array<
        {__typename?: 'Unwind'} & Pick<
          Unwind,
          | 'collateral'
          | 'currentDebt'
          | 'currentOi'
          | 'fraction'
          | 'fractionOfPosition'
          | 'id'
          | 'isLong'
          | 'mint'
          | 'pnl'
          | 'price'
          | 'size'
          | 'timestamp'
          | 'transferAmount'
          | 'unwindNumber'
          | 'value'
        > & {
            position: {__typename?: 'Position'} & Pick<
              Position,
              | 'createdAtTimestamp'
              | 'currentOi'
              | 'entryPrice'
              | 'id'
              | 'initialCollateral'
              | 'isLong'
              | 'leverage'
              | 'numberOfUniwnds'
              | 'positionId'
            > & {market: {__typename?: 'Market'} & Pick<Market, 'feedAddress' | 'id'>}
          }
      >
    }
  >
}

export type LiquidatedPositionsQueryVariables = Exact<{
  account: Scalars['ID']
  first?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
}>

export type LiquidatedPositionsQuery = {__typename?: 'Query'} & {
  account?: Maybe<
    {__typename?: 'Account'} & {
      liquidates: Array<
        {__typename?: 'Liquidate'} & Pick<
          Liquidate,
          'collateral' | 'currentDebt' | 'currentOi' | 'id' | 'isLong' | 'mint' | 'price' | 'timestamp' | 'value' | 'size'
        > & {
            position: {__typename?: 'Position'} & Pick<
              Position,
              'createdAtTimestamp' | 'currentOi' | 'entryPrice' | 'fractionUnwound' | 'id' | 'initialCollateral' | 'isLong' | 'leverage'
            > & {market: {__typename?: 'Market'} & Pick<Market, 'feedAddress' | 'id'>}
          }
      >
    }
  >
}

export const PositionListDocument = `
    query accountV2($account: ID!, $marketPositionIdList: [ID]) {
  account(id: $account) {
    positions(first: 1000, orderBy: createdAtTimestamp, orderDirection: desc, where: {id_in: $marketPositionIdList}) {
      id
      positionId
      market {
        id
        feedAddress
        isShutdown
      }
      initialOi
      initialDebt
      initialCollateral
      initialNotional
      leverage
      isLong
      entryPrice
      isLiquidated
      currentOi
      currentDebt
      mint
      createdAtTimestamp
      createdAtBlockNumber
      numberOfUniwnds
      fractionUnwound
      builds {
        collateral
        currentDebt
        currentOi
        id
        price
        timestamp
        value
      }
      liquidates {
        collateral
        currentDebt
        id
        currentOi
        isLong
        mint
        price
        timestamp
        value
      }
      unwinds(orderBy: unwindNumber, orderDirection: asc) {
        collateral
        currentDebt
        currentOi
        fraction
        id
        isLong
        mint
        timestamp
        price
        unwindNumber
        value
        transferAmount
        pnl
        size
      }
    }
  }
}
    `
export const MarketDocument = `
    query market($market: ID!) {
  market(id: $market) {
    id
    feedAddress
    factory {
      id
    }
    k
    lmbda
    delta
    capPayoff
    capNotional
    capLeverage
    circuitBreakerWindow
    circuitBreakerMintTarget
    maintenanceMarginFraction
    maintenanceMarginBurnRate
    liquidationFeeRate
    tradingFeeRate
    minCollateral
    priceDriftUpperLimit
    averageBlockTime
    isShutdown
  }
}
    `
export const TotalMarketsDocument = `
    query totalMarkets {
  markets {
    id
    feedAddress
    factory {
      id
    }
    k
    lmbda
    delta
    capPayoff
    capNotional
    capLeverage
    circuitBreakerWindow
    circuitBreakerMintTarget
    maintenanceMarginFraction
    maintenanceMarginBurnRate
    liquidationFeeRate
    tradingFeeRate
    minCollateral
    priceDriftUpperLimit
    averageBlockTime
    isShutdown
  }
}
    `
export const ActiveMarketsDocument = `
    query activeMarkets {
  markets(where: {isShutdown: false}) {
    id
    feedAddress
    factory {
      id
    }
    k
    lmbda
    delta
    capPayoff
    capNotional
    capLeverage
    circuitBreakerWindow
    circuitBreakerMintTarget
    maintenanceMarginFraction
    maintenanceMarginBurnRate
    liquidationFeeRate
    tradingFeeRate
    minCollateral
    priceDriftUpperLimit
    averageBlockTime
    isShutdown
  }
}
    `
export const NumberOfPositionsDocument = `
    query numberOfPositions($account: ID!) {
  account(id: $account) {
    numberOfLiquidatedPositions
    numberOfOpenPositions
    numberOfUnwinds
    realizedPnl
  }
}
    `
export const OpenPositionsDocument = `
    query openPositions($account: ID!, $first: Int, $skip: Int) {
  account(id: $account) {
    positions(
      where: {isLiquidated: false, currentOi_gt: "0"}
      orderBy: createdAtTimestamp
      orderDirection: desc
      first: $first
      skip: $skip
    ) {
      id
      createdAtTimestamp
      currentOi
      entryPrice
      initialCollateral
      isLiquidated
      isLong
      leverage
      numberOfUniwnds
      positionId
      market {
        feedAddress
        id
      }
    }
  }
}
    `
export const MarketOpenPositionsDocument = `
    query marketOpenPositions($account: ID!, $first: Int, $skip: Int, $marketId: String) {
  account(id: $account) {
    positions(
      where: {isLiquidated: false, currentOi_gt: "0", market: $marketId}
      orderBy: createdAtTimestamp
      orderDirection: desc
      first: $first
      skip: $skip
    ) {
      id
      createdAtTimestamp
      currentOi
      entryPrice
      initialCollateral
      isLiquidated
      isLong
      leverage
      numberOfUniwnds
      positionId
      market {
        feedAddress
        id
      }
    }
  }
}
    `
export const UnwindsDocument = `
    query unwinds($account: ID!, $first: Int, $skip: Int) {
  account(id: $account) {
    unwinds(orderBy: timestamp, orderDirection: desc, first: $first, skip: $skip) {
      collateral
      currentDebt
      currentOi
      fraction
      fractionOfPosition
      id
      isLong
      mint
      pnl
      price
      size
      timestamp
      transferAmount
      unwindNumber
      value
      position {
        createdAtTimestamp
        currentOi
        entryPrice
        id
        initialCollateral
        isLong
        leverage
        numberOfUniwnds
        positionId
        market {
          feedAddress
          id
        }
      }
    }
  }
}
    `
export const LiquidatedPositionsDocument = `
    query liquidatedPositions($account: ID!, $first: Int, $skip: Int) {
  account(id: $account) {
    liquidates(orderBy: timestamp, orderDirection: desc, first: $first, skip: $skip) {
      collateral
      currentDebt
      currentOi
      id
      isLong
      mint
      price
      timestamp
      value
      size
      position {
        createdAtTimestamp
        currentOi
        entryPrice
        fractionUnwound
        id
        initialCollateral
        isLong
        leverage
        market {
          feedAddress
          id
        }
      }
    }
  }
}
    `

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    positionList: build.query<PositionListQuery, PositionListQueryVariables>({
      query: variables => ({document: PositionListDocument, variables}),
    }),
    market: build.query<MarketQuery, MarketQueryVariables>({
      query: variables => ({document: MarketDocument, variables}),
    }),
    totalMarkets: build.query<TotalMarketsQuery, TotalMarketsQueryVariables | void>({
      query: variables => ({document: TotalMarketsDocument, variables}),
    }),
    activeMarkets: build.query<ActiveMarketsQuery, ActiveMarketsQueryVariables | void>({
      query: variables => ({document: ActiveMarketsDocument, variables}),
    }),
    numberOfPositions: build.query<NumberOfPositionsQuery, NumberOfPositionsQueryVariables>({
      query: variables => ({document: NumberOfPositionsDocument, variables}),
    }),
    openPositions: build.query<OpenPositionsQuery, OpenPositionsQueryVariables>({
      query: variables => ({document: OpenPositionsDocument, variables}),
    }),
    marketOpenPositions: build.query<MarketOpenPositionsQuery, MarketOpenPositionsQueryVariables>({
      query: variables => ({document: MarketOpenPositionsDocument, variables}),
    }),
    unwinds: build.query<UnwindsQuery, UnwindsQueryVariables>({
      query: variables => ({document: UnwindsDocument, variables}),
    }),
    liquidatedPositions: build.query<LiquidatedPositionsQuery, LiquidatedPositionsQueryVariables>({
      query: variables => ({document: LiquidatedPositionsDocument, variables}),
    }),
  }),
})

export {injectedRtkApi as api}
export const {
  usePositionListQuery,
  useLazyPositionListQuery,
  useMarketQuery,
  useLazyMarketQuery,
  useTotalMarketsQuery,
  useLazyTotalMarketsQuery,
  useActiveMarketsQuery,
  useLazyActiveMarketsQuery,
  useNumberOfPositionsQuery,
  useLazyNumberOfPositionsQuery,
  useOpenPositionsQuery,
  useLazyOpenPositionsQuery,
  useMarketOpenPositionsQuery,
  useLazyMarketOpenPositionsQuery,
  useUnwindsQuery,
  useLazyUnwindsQuery,
  useLiquidatedPositionsQuery,
  useLazyLiquidatedPositionsQuery,
} = injectedRtkApi
