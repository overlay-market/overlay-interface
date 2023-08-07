import * as React from 'react'
import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {TEXT, colors} from '../../theme/theme'
import {ProgressBar} from '../../components/ProgressBar/ProgressBar'
import {toScientificNumber} from '../../utils/toScientificNumber'
import {useTotalMarketsData} from '../../state/markets/hooks'
import {MarketStateResults, useCurrentMarketState} from '../../hooks/useCurrentMarketState'
import {AdditionalMarketData, useMarketDetails} from '../../hooks/useMarketDetails'
import Loader from '../../components/Loaders/Loaders'

const Container = styled.div`
  width: 1000px;
  padding-right: 16px;
  max-height: 420px;
`

const MarketDetailsContainer = styled.div`
  border-top: 1px solid ${({theme}) => theme.dark.grey2};
  padding: 16px 16px;
  display: flex;
  justify-content: space-between;
`

const MarketPriceContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const MarketOIContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

type BuildChartProps = {
  children?: React.ReactNode
  marketData?: any
  isLoading?: boolean
}

export const BuildChartColumn = ({children, marketData, isLoading}: BuildChartProps) => {
  const [long, setLong] = React.useState<number>(0)
  const [short, setShort] = React.useState<number>(0)
  const [total, setTotal] = React.useState<number>(0)
  const {markets} = useTotalMarketsData()
  const marketDetails: AdditionalMarketData[] = useMarketDetails(markets)
  const {markets: marketsData}: MarketStateResults = useCurrentMarketState(marketDetails)

  const marketDataDetails = React.useMemo(() => marketsData.find(market => market.id === marketData?.marketId), [marketsData, marketData])

  React.useEffect(() => {
    if (marketDataDetails?.parsedOiLong !== undefined) setLong(Number(marketDataDetails?.parsedOiLong))
    if (marketDataDetails?.parsedOiShort !== undefined) setShort(Number(marketDataDetails?.parsedOiShort))
  }, [marketDataDetails])

  React.useEffect(() => setTotal(long + short), [long, short])
  const defaultZero = '00.00'

  const isFundingRatePositive = React.useMemo(() => {
    return Math.sign(Number(marketDataDetails?.parsedDailyFundingRate)) > 0
  }, [marketDataDetails])

  const shortPercentageOfTotalOi = React.useMemo(() => {
    return Number.isFinite(short) && Number.isFinite(total) && total > 0 ? ((short / total) * 100).toFixed(2) : defaultZero
  }, [short, total])

  const longPercentageOfTotalOi = React.useMemo(() => {
    return Number.isFinite(long) && Number.isFinite(total) && total > 0 ? ((long / total) * 100).toFixed(2) : defaultZero
  }, [long, total])

  return (
    <Container>
      <MarketDetailsContainer>
        {!marketDataDetails ? (
          <Loader size="12px" />
        ) : (
          <MarketPriceContainer>
            <TEXT.BoldNumber>{`${marketData?.priceCurrency}${toScientificNumber(marketData?.headerPrice)}`}</TEXT.BoldNumber>
            <TEXT.SmallBody color={colors(false).dark.green}>+0.29%</TEXT.SmallBody>
            <TEXT.SmallBody>24h</TEXT.SmallBody>
          </MarketPriceContainer>
        )}

        {!marketDataDetails ? (
          <Loader size="12px" />
        ) : (
          <FlexRow style={{gap: '28px'}}>
            <FlexRow style={{gap: '16px', justifyContent: 'flex-end', alignItems: 'center'}}>
              <TEXT.SmallBody>Funding</TEXT.SmallBody>
              <TEXT.BoldNumber color={isFundingRatePositive ? colors(false).dark.red : colors(false).dark.green}>
                {`${marketDataDetails?.parsedDailyFundingRate}%`}
              </TEXT.BoldNumber>
            </FlexRow>

            <MarketOIContainer>
              <TEXT.SmallBody style={{whiteSpace: 'nowrap'}}>OI Balance</TEXT.SmallBody>
              <FlexColumn width="150px">
                <FlexRow justify="space-between">
                  <TEXT.BoldNumber color="#FF648A">{`${shortPercentageOfTotalOi}%`}</TEXT.BoldNumber>
                  <TEXT.BoldNumber color="#5FD0AB">{`${longPercentageOfTotalOi}%`}</TEXT.BoldNumber>
                </FlexRow>
                <ProgressBar reverse={false} split={false} max={total} value={short} width={'100%'} margin={'0'} color={'#FF648A'} />
              </FlexColumn>
            </MarketOIContainer>
          </FlexRow>
        )}
      </MarketDetailsContainer>
      {children}
    </Container>
  )
}
