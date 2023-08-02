import {useEffect, useRef} from 'react'
import {widget, ChartingLibraryWidgetOptions, ResolutionString} from '../../../charting_library'
import * as React from 'react'
import styled from 'styled-components'
import Datafeed from './chartDatafeed'
import {useMarketName} from '../../../hooks/useMarketName'

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

type BuildChartProps = {
  symbol?: string
  feedAddress?: string
  marketId?: string
}

export const BuildChart = ({symbol = 'aa', feedAddress, marketId}: BuildChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const {description} = useMarketName(feedAddress)

  // console.log({marketId})

  useEffect(() => {
    if (marketId && description) {
      console.log({marketId, description})

      const defaultProps: Omit<ChartContainerProps, 'container'> = {
        symbol: JSON.stringify({marketId, description}),
        interval: '60' as ResolutionString,
        userId: 'public_user_id_paul',
        datafeedUrl: 'https://api.overlay.market/charts/v1/charts',
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
        // BEWARE: no trailing slash is expected in feed URL
        // tslint:disable-next-line:no-any
        // datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(defaultProps.datafeedUrl),
        library_path: defaultProps.libraryPath as string,
        interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
        container: chartContainerRef.current,
        locale: 'en',
        // disabled_features: [
        //   'use_localstorage_for_settings',
        //   // 'header_widget',
        //   'left_toolbar',
        //   'control_bar',
        //   'timeframes_toolbar',
        //   'axis_pressed_mouse_move_scale',
        // ],
        // disabled_features: ['use_localstorage_for_settings', 'header_widget', 'left_toolbar', 'control_bar'],
        // disabled_features: [
        //   'use_localstorage_for_settings',
        //   'left_toolbar',
        //   'control_bar',
        //   'timeframes_toolbar',
        //   'header_symbol_search',
        //   // 'header_resolutions',
        // ],
        // enabled_features: ['custom_resolutions', 'header_resolutions'],
        charts_storage_url: defaultProps.chartsStorageUrl,
        charts_storage_api_version: defaultProps.chartsStorageApiVersion,
        client_id: defaultProps.clientId,
        user_id: defaultProps.userId,
        fullscreen: defaultProps.fullscreen,
        // autosize: defaultProps.autosize,
        studies_overrides: defaultProps.studiesOverrides,
        theme: defaultProps.theme,
        datafeed: Datafeed,
        header_widget_buttons_mode: 'fullsize',
        timeframe: '2D',
        // time_frames: [
        //   // {text: '1dasdasd', resolution: '6M' as ResolutionString, description: '50 Years'},
        //   // {text: '3yasdas', resolution: '1W' as ResolutionString, description: '3 Years', title: '3yr'},
        //   // {text: '8mss', resolution: '1D' as ResolutionString, description: '8 Month'},
        // ],
        // saved_data: {
        //   description,
        // },
      }

      const tvWidget = new widget(widgetOptions)

      tvWidget.onChartReady(() => {
        tvWidget.headerReady().then(() => {
          // const button = tvWidget.createButton()
          // button.setAttribute('title', 'Click to show a notification popup')
          // button.classList.add('apply-common-tooltip')
          // button.addEventListener('click', () =>
          //   tvWidget.showNoticeDialog({
          //     title: 'Notification',
          //     body: 'TradingView Charting Library API works correctly',
          //     callback: () => {
          //       console.log('Noticed!')
          //     },
          //   }),
          // )
          // button.innerHTML = 'Check API'
        })
      })

      // tvWidget
      //   .activeChart()
      //   .onIntervalChanged()
      //   .subscribe(null, (interval, timeframeObj) => {
      //     console.log('asdas')
      //     return (timeframeObj.timeframe = {
      //       value: '12M',
      //       // @ts-ignore
      //       type: 'period-back',
      //     })
      //   })

      return () => {
        tvWidget.remove()
      }
    }
  }, [marketId, description])

  return <TVChartContainer ref={chartContainerRef} />
}
