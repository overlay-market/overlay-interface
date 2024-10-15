import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {BigNumberish} from 'ethers'

type MarketListPrices = {
  [marketAddress: string]: {
    bid?: string | number | any
    ask?: string | number | any
    mid?: string | number | any
    _bid?: BigNumberish
    _ask?: BigNumberish
    _mid?: BigNumberish
  }
}

export function useMarketPrice(marketAddress?: string): any | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [prices, setPrices] = useState()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return
    ;(async () => {
      try {
        setPrices(await peripheryContract.prices(marketAddress))
      } catch (error) {
        console.error('market inside useMarketPrice: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, blockNumber, account])

  return useMemo(() => {
    return prices
  }, [prices])
}

/**
 *
 * @param marketAddresses array of market addresses to query market mid prices for
 * @returns market mid prices associated with input market addresses
 */
export function useMarketMidPrices(marketAddresses?: string[][], blockNumber?: number | undefined) {
  const peripheryContract = useV1PeripheryContract()
  const [midPrices] = useState([])

  useEffect(() => {
    if (!peripheryContract || !marketAddresses || !blockNumber) return

    const getPrices = async (marketAddress: string) => {
      return await peripheryContract.mid(marketAddress, {blockTag: blockNumber})
    }

    const requestPromises = marketAddresses.map(marketAddress => {
      const request = getPrices(marketAddress[0]).then(result => {
        return result
      })
      return request
    })

    Promise.all(requestPromises).then(results => {
      console.log('Promise returned from useMarketMidPrice', results)
    })
  }, [peripheryContract, marketAddresses, blockNumber])

  return useMemo(() => {
    return midPrices
  }, [midPrices])
}

export function useMarketListPrices(marketList: string[]): MarketListPrices {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [prices, setPrices] = useState<(string | number | any)[]>([])
  let marketsPrices: MarketListPrices = {}

  useEffect(() => {
    if (prices.length > 0) return
    if (!peripheryContract || !marketList || !blockNumber) return

    const getPrices = async (marketAddress: string) => {
      return await peripheryContract.prices(marketAddress)
    }

    const requestPromises = marketList.map(marketAddress => {
      const request = getPrices(marketAddress).then(result => {
        return result
      })
      return request
    })

    Promise.all(requestPromises).then(results => {
      console.log('Promise returned from useMarketListPrice', results)
      setPrices(results)
    })
  }, [peripheryContract, marketList, blockNumber, account, prices])

  return useMemo(() => {
    prices.length > 0 &&
      marketList.forEach((id, index) => {
        marketsPrices[id] = {
          bid: prices[index][0],
          ask: prices[index][1],
          mid: prices[index][2],
          _bid: prices[index]['bid_'],
          _ask: prices[index]['ask_'],
          _mid: prices[index]['mid_'],
        }
      })

    return marketsPrices
  }, [marketsPrices, prices])
}
