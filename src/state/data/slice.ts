import {BaseQueryApi, BaseQueryFn} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {createApi} from '@reduxjs/toolkit/query/react'
import {ClientError, gql, GraphQLClient} from 'graphql-request'
import {AppState} from '../state'
import {DocumentNode} from 'graphql'
import {SupportedChainId, DEFAULT_CHAINID} from '../../constants/chains'
import {useActiveWeb3React} from '../../hooks/web3'

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  // [SupportedChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph',
  [SupportedChainId.MAINNET]: 'https://api.studio.thegraph.com/query/46086/overlay-subgraph-eth/v2.0.2',
  [SupportedChainId.ARBITRUM_SEPOLIA]:
    'https://gateway-arbitrum.network.thegraph.com/api/84ab887f7372fde61d4f1e228fa25964/subgraphs/id/59rgxaXFUQv5K6UXb1JJhS44uyPYn2EJFEZrZJLG5a4Y',

  // 'https://gateway-arbitrum.network.thegraph.com/api/9d0198304529988979fdf429caba9ed3/subgraphs/id/6HYgwKVqKS4dYr3DDhZCH6zey7LbTd8DHqWtHZkjXBW5',
  [SupportedChainId.GÖRLI]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-goerli',
  [SupportedChainId.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-rinkeby',
  // [SupportedChainId.ARBITRUM]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-arbitrum',
  // [SupportedChainId.ARBITRUM]: 'https://api.studio.thegraph.com/proxy/46086/overlay-subgraph-arbitrum/v2.0.12',
  [SupportedChainId.ARBITRUM]:
    'https://gateway-arbitrum.network.thegraph.com/api/9d0198304529988979fdf429caba9ed3/subgraphs/id/7RuVCeRzAHL5apu6SWHyUEVt3Ko2pUv2wMTiHQJaiUW9',
  [SupportedChainId.ARBITRUM_GÖRLI]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-arb-goerli',
  [SupportedChainId.IMOLA]: 'https://subgraph.overlay.market/query/subgraphs/name/overlay/v1-subgraph',
}

export const api = createApi({
  reducerPath: 'dataApi',
  baseQuery: graphqlRequestBaseQuery(),
  endpoints: builder => ({
    positionListQuery: builder.query({
      query: ({account, marketPositionIdList}) => ({
        document: gql`
          query queryPosition($account: ID!, $marketPositionId: [ID]) {
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
        `,
        variables: {
          account,
          marketPositionIdList,
        },
      }),
    }),
    marketQuery: builder.query({
      query: ({market}) => ({
        document: gql`
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
        `,
        variables: {
          market,
        },
      }),
    }),
    totalMarketsQuery: builder.query({
      query: () => ({
        document: gql`
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
        `,
      }),
    }),
    activeMarketsQuery: builder.query({
      query: () => ({
        document: gql`
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
        `,
      }),
    }),
    numberOfPositionsQuery: builder.query({
      query: ({account}) => ({
        document: gql`
          query numberOfPositions($account: ID!) {
            account(id: $account) {
              numberOfLiquidatedPositions
              numberOfOpenPositions
              numberOfUnwinds
              realizedPnl
            }
          }
        `,
        variables: {
          account,
        },
      }),
    }),
    openPositionsQuery: builder.query({
      query: ({account, first, skip}) => ({
        document: gql`
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
        `,
        variables: {
          account,
          first,
          skip,
        },
      }),
    }),
    marketOpenPositionsQuery: builder.query({
      query: ({account, first, skip, marketId}) => ({
        document: gql`
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
        `,
        variables: {
          account,
          first,
          skip,
          marketId,
        },
      }),
    }),
    unwindsQuery: builder.query({
      query: ({account, first, skip}) => ({
        document: gql`
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
        `,
        variables: {
          account,
          first,
          skip,
        },
      }),
    }),
    liquidatedPositionsQuery: builder.query({
      query: ({account, first, skip}) => ({
        document: gql`
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
        `,
        variables: {
          account,
          first,
          skip,
        },
      }),
    }),
  }),
})

// Graphql query client wrapper that builds a dynamic url based on chain id
function graphqlRequestBaseQuery(): BaseQueryFn<
  {document: string | DocumentNode; variables?: any},
  unknown,
  Pick<ClientError, 'name' | 'message' | 'stack'>,
  Partial<Pick<ClientError, 'request' | 'response'>>
> {
  return async ({document, variables}, {getState}: BaseQueryApi) => {
    try {
      const chainId = (getState() as AppState).application.chainId
      const chainIdLocal = (getState() as AppState).application.chainIdLocal
      // const {account} = useActiveWeb3React()

      // if chainId in state is null, set default query to Arbitrum One

      // const subgraphUrl = chainId
      //   ? CHAIN_SUBGRAPH_URL[chainId]
      //   : chainIdLocal
      //   ? CHAIN_SUBGRAPH_URL[chainIdLocal]
      //   : CHAIN_SUBGRAPH_URL[DEFAULT_CHAINID]

      const subgraphUrl = chainId
        ? CHAIN_SUBGRAPH_URL[chainId]
        : chainIdLocal
        ? CHAIN_SUBGRAPH_URL[chainIdLocal]
        : CHAIN_SUBGRAPH_URL[DEFAULT_CHAINID]

      // const subgraphUrl = chainIdLocal ? CHAIN_SUBGRAPH_URL[chainIdLocal] : CHAIN_SUBGRAPH_URL[DEFAULT_CHAINID]
      console.log({subgraphUrl}, {chainIdLocal}, {chainId})

      if (!subgraphUrl) {
        return {
          error: {
            name: 'UnsupportedChainId',
            message: `Subgraph queries against ChainId ${chainId} are not supported.`,
            stack: '',
          },
        }
      }

      return {
        data: await new GraphQLClient(subgraphUrl).request(document, variables),
        meta: {},
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const {name, message, stack, request, response} = error
        return {error: {name, message, stack}, meta: {request, response}}
      }
      throw error
    }
  }
}
