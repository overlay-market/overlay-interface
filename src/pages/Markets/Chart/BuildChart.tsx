import {useEffect, useRef} from 'react'
import {widget, ChartingLibraryWidgetOptions, ResolutionString} from '../../../charting_library'
import * as React from 'react'
import styled from 'styled-components'
import Datafeed from './chartDatafeed'
import {useMarketName} from '../../../hooks/useMarketName'
import {useActiveWeb3React} from '../../../hooks/web3'
import {SupportedChainId} from '../../../constants/chains'

const TVChartContainer = styled.div`
  height: 450px;
  width: 100%;
  padding-right: 16px;
  @media (max-width: 1400px) {
    height: 100%;
  }
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
}

export const BuildChart = ({feedAddress, marketId}: BuildChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const {description} = useMarketName(feedAddress)
  const {chainId} = useActiveWeb3React()

  useEffect(() => {
    if (marketId && description) {
      const defaultProps: Omit<ChartContainerProps, 'container'> = {
        symbol: JSON.stringify({marketId, description}),
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
      }

      const tvWidget = new widget(widgetOptions)

      return () => {
        tvWidget.remove()
      }
    }
  }, [marketId, description, chainId])

  return <TVChartContainer ref={chartContainerRef} />
}
