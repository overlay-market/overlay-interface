import {useEffect, useRef} from 'react'
import {widget, ChartingLibraryWidgetOptions, ResolutionString} from '../../../charting_library'
import * as React from 'react'
import styled from 'styled-components'
import Datafeed from './chartDatafeed'
import {useMarketName} from '../../../hooks/useMarketName'
import {useActiveWeb3React} from '../../../hooks/web3'
import {SupportedChainId} from '../../../constants/chains'
import moment from 'moment'
import {MarketDetails} from '../../../constants/markets'

const TVChartContainer = styled.div`
  height: 592px;
  ${({theme}) => theme.mediaWidth.minMedium`
    height: 450px;
    width: 100%;
    padding-right: 16px;
  `}
`
export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol']
  interval: ChartingLibraryWidgetOptions['interval']
  // BEWARE: no trailing slash is expected in feed URL
  datafeedUrl: string
  libraryPath: ChartingLibraryWidgetOptions['library_path']
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']
  clientId: ChartingLibraryWidgetOptions['client_id']
  userId: ChartingLibraryWidgetOptions['user_id']
  fullscreen: ChartingLibraryWidgetOptions['fullscreen']
  autosize: ChartingLibraryWidgetOptions['autosize']
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides']
  container: ChartingLibraryWidgetOptions['container']
  theme: ChartingLibraryWidgetOptions['theme']
}

type BuildChartProps = {
  feedAddress?: string
  marketId?: string
  longPrice: string | number
  shortPrice: string | number
}

export const BuildChart = ({feedAddress, marketId, longPrice, shortPrice}: BuildChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const {description} = useMarketName(feedAddress)
  const {chainId} = useActiveWeb3React()

  useEffect(() => {
    if (marketId && description && longPrice && shortPrice) {
      const defaultProps: Omit<ChartContainerProps, 'container'> = {
        symbol: JSON.stringify({marketId, description: MarketDetails[marketId].marketName}),
        interval: '60' as ResolutionString,
        userId: 'public_user_id_paul',
        datafeedUrl:
          chainId === Number(SupportedChainId.ARBITRUM_SEPOLIA)
            ? 'https://api.overlay.market/sepolia-charts/v1/charts'
            : 'https://api.overlay.market/charts/v1/charts',
        libraryPath: '/charting_library/',
        chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1',
        clientId: 'tradingview.com',
        fullscreen: false,
        autosize: true,
        studiesOverrides: {},
        theme: 'dark',
      }
      const widgetOptions: ChartingLibraryWidgetOptions = {
        symbol: defaultProps.symbol as string,
        datafeed: Datafeed,
        library_path: defaultProps.libraryPath as string,
        interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
        container: chartContainerRef.current,
        locale: 'en',
        disabled_features: [
          'use_localstorage_for_settings',
          'left_toolbar',
          'control_bar',
          'timeframes_toolbar',
          'header_symbol_search',
          'symbol_search_hot_key',
          'header_compare',
        ],
        charts_storage_url: defaultProps.chartsStorageUrl,
        charts_storage_api_version: defaultProps.chartsStorageApiVersion,
        client_id: defaultProps.clientId,
        user_id: defaultProps.userId,
        fullscreen: defaultProps.fullscreen,
        autosize: defaultProps.autosize,
        studies_overrides: defaultProps.studiesOverrides,
        theme: defaultProps.theme,
        header_widget_buttons_mode: 'fullsize',
        custom_formatters: {
          timeFormatter: {
            format: date => {
              return moment.utc(date).format('HH:mm')
            },
            formatLocal: () => {
              return ''
            },
          },
          dateFormatter: {
            format: date => {
              return moment.utc(date).format('DD MMM `YY')
            },
            formatLocal: () => {
              return ''
            },
          },
          priceFormatterFactory: symbolInfo => {
            if (symbolInfo === null) {
              return null
            }
            if (symbolInfo.format === 'volume') {
              return {
                format: price => {
                  if (price >= 1000000000) {
                    return `${(price / 1000000000).toFixed(3)}B`
                  }

                  if (price >= 1000000) {
                    return `${(price / 1000000).toFixed(3)}M`
                  }

                  if (price >= 1000) {
                    return `${(price / 1000).toFixed(3)}K`
                  }
                  if (price < 1) {
                    if (MarketDetails[marketId].currency === '%') {
                      return (price * 100).toFixed(2)
                    } else {
                      return price.toFixed(4)
                    }
                  }
                  return price.toFixed(2)
                },
              }
            }

            return null // The default formatter will be used.
          },
        },
      }

      const tvWidget = new widget(widgetOptions)

      tvWidget.onChartReady(function () {
        const currentTime = Date.now()

        //add horizontal line with long Price
        tvWidget.activeChart().createMultipointShape([{time: currentTime, price: Number(longPrice)}], {
          shape: 'horizontal_line',
          lock: true,
          disableSelection: true,
          disableSave: true,
          disableUndo: true,
          filled: false,
          zOrder: 'top',
        })

        //add horizontal line with short Price
        tvWidget.activeChart().createMultipointShape([{time: currentTime, price: Number(shortPrice)}], {
          shape: 'horizontal_line',
          lock: true,
          disableSelection: true,
          disableSave: true,
          disableUndo: true,
          filled: false,
          zOrder: 'top',
        })
      })

      return () => {
        tvWidget.remove()
      }
    }
  }, [marketId, description, chainId, longPrice, shortPrice])

  return <TVChartContainer ref={chartContainerRef} />
}
