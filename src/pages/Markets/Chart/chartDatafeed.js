import {useMarketData} from '../../../state/markets/hooks'
import {LibrarySymbolInfo} from '../../../charting_library/charting_library'

// DatafeedConfiguration implementation
const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: ['15', '60', '1D'],
}

export default {
  onReady: callback => {
    console.log('[onReady]: Method call')
    setTimeout(() => callback(configurationData))
  },

  searchSymbols: async (userInput, exchange, symbolType, onResultReadyCallback) => {
    // Get all symbols
    console.log('[searchSymbols]: Method call')
  },

  resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) => {
    console.log('[resolveSymbol]: Method call', symbolName)
    const {marketId, description} = JSON.parse(symbolName || '{}')

    const symbolInfo: LibrarySymbolInfo = {
      ticker: symbolName,
      name: description,
      description: description,
      type: 'crypto',
      session: '24x7',
      timezone: 'Etc/UTC',
      exchange: 'Overlay',
      minmov: 1,
      pricescale: 100,
      has_intraday: false,
      visible_plots_set: 'ohlc',
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: 'streaming',
      marketAddress: marketId,
      has_intraday: true,
    }

    onSymbolResolvedCallback(symbolInfo)
  },

  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    const {from, to, firstDataRequest} = periodParams
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to)

    const urlParameters = {
      market: symbolInfo?.marketAddress,
      binSize: isNaN(Number(resolution)) ? 1 : Number(resolution),
      binUnit: isNaN(Number(resolution)) ? 'day' : 'minute',
      from: from * 1000,
      to: to * 1000,
      limit: 2000,
    }
    const query = Object.keys(urlParameters)
      .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join('&')

    try {
      let bars = []

      let res = await fetch(`https://api.overlay.market/charts/v1/charts?${query}`)
      res = await res.json()

      if (res.length === 0) {
        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], {noData: true})
        return
      }

      res.forEach(bar => {
        bars = [
          ...bars,
          {
            time: new Date(bar._id.time).getTime(),
            low: bar.low,
            high: bar.high,
            open: bar.open,
            close: bar.close,
          },
        ]
      })

      console.log(`[getBars]: returned ${bars.length} bars`)
      onHistoryCallback(bars, {noData: false})
    } catch (error) {
      console.log('[getBars]: Get error', error)
      onErrorCallback(error)
    }
  },

  subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
    console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID)
  },
  unsubscribeBars: subscriberUID => {
    console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID)
  },
}
