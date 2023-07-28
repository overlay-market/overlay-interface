import {useEffect, useRef} from 'react'
import {widget, ChartingLibraryWidgetOptions, ResolutionString} from '../../../charting_library'
import * as React from 'react'
import styled from 'styled-components'
import Datafeed from './chartDatafeed'

const TVChartContainer = styled.div`
  width: 1000px;
  padding-right: 16px;
  max-height: 420px;
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

export const BuildChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    const defaultProps: Omit<ChartContainerProps, 'container'> = {
      symbol: 'Bitfinex:ETH/GBP',
      interval: 'D' as ResolutionString,
      datafeedUrl: 'https://api.overlay.market/charts/v1/charts',
      libraryPath: '/charting_library/',
      chartsStorageUrl: 'https://saveload.tradingview.com',
      chartsStorageApiVersion: '1.1',
      clientId: 'tradingview.com',
      userId: 'public_user_id_paul',
      fullscreen: false,
      autosize: true,
      studiesOverrides: {},
      theme: 'dark',
    }
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: defaultProps.symbol as string,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      // datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(defaultProps.datafeedUrl),
      library_path: defaultProps.libraryPath as string,

      interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
      container: chartContainerRef.current,
      locale: 'en',
      // disabled_features: ['use_localstorage_for_settings', 'header_widget', 'legend_widget', 'left_toolbar', 'control_bar', 'timeframes_toolbar'],
      enabled_features: ['study_templates'],
      charts_storage_url: defaultProps.chartsStorageUrl,
      charts_storage_api_version: defaultProps.chartsStorageApiVersion,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
      theme: defaultProps.theme,
      datafeed: Datafeed,
    }

    const tvWidget = new widget(widgetOptions)

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton()
        button.setAttribute('title', 'Click to show a notification popup')
        button.classList.add('apply-common-tooltip')
        button.addEventListener('click', () =>
          tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              console.log('Noticed!')
            },
          }),
        )
        button.innerHTML = 'Check API'
      })
    })

    return () => {
      tvWidget.remove()
    }
  }, [])

  return <TVChartContainer ref={chartContainerRef} />
}
