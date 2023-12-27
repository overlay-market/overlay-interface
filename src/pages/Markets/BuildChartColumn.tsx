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
import {useActiveWeb3React} from '../../hooks/web3'

const Container = styled.div`
  width: 100%;
`

const MarketDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 24px 0px 20px;
  gap: 8px;
  ${({theme}) => theme.mediaWidth.minSmall`
    padding: 4px 0px 20px 16px;
  `}
  ${({theme}) => theme.mediaWidth.minMedium`
    padding: 4px 16px 20px;
    border-top: 1px solid ${({theme}) => theme.dark.grey2};
  `}
  ${({theme}) => theme.mediaWidth.minLarge`
    border-top: 1px solid ${({theme}) => theme.dark.grey2};
    padding: 16px 0px 16px 16px;
    flex-direction: row;
  `}
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 380px;
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

  const {chainId} = useActiveWeb3React()
  const {markets, refetch} = useTotalMarketsData()
  const marketDetails: AdditionalMarketData[] = useMarketDetails(markets)
  const {markets: marketsData}: MarketStateResults = useCurrentMarketState(marketDetails)

  const marketDataDetails = React.useMemo(() => marketsData.find(market => market.id === marketData?.marketId), [marketsData, marketData])

  React.useEffect(() => {
    markets && refetch()
  }, [chainId])

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
          <LoadingContainer>
            <Loader size="24px" />
          </LoadingContainer>
        ) : (
          <>
            <MarketPriceContainer>
              <TEXT.BoldNumber>{`${marketData?.priceCurrency}${toScientificNumber(marketData?.headerPrice)}`}</TEXT.BoldNumber>
              {/* <TEXT.SmallBody color={colors(false).dark.green}>+0.29%</TEXT.SmallBody>
              <TEXT.SmallBody>24h</TEXT.SmallBody> */}
            </MarketPriceContainer>

            <FlexRow style={{gap: '28px', width: 'auto'}}>
              <FlexRow style={{gap: '16px', justifyContent: 'flex-end', alignItems: 'center'}}>
                <TEXT.SmallBody>Funding</TEXT.SmallBody>
                <TEXT.BoldNumber color={isFundingRatePositive ? colors(false).dark.red : colors(false).dark.green}>
                  {`${marketDataDetails?.parsedDailyFundingRate}%`}
                </TEXT.BoldNumber>
              </FlexRow>

              <MarketOIContainer>
                <TEXT.SmallBody style={{whiteSpace: 'nowrap'}}>OI Balance</TEXT.SmallBody>
                <FlexColumn width="135px">
                  <FlexRow justify="space-between">
                    <TEXT.BoldNumber color="#FF648A">{`${shortPercentageOfTotalOi}%`}</TEXT.BoldNumber>
                    <TEXT.BoldNumber color="#5FD0AB">{`${longPercentageOfTotalOi}%`}</TEXT.BoldNumber>
                  </FlexRow>
                  <ProgressBar reverse={false} split={false} max={total} value={short} width={'100%'} margin={'0'} color={'#FF648A'} />
                </FlexColumn>
              </MarketOIContainer>
            </FlexRow>
          </>
        )}
      </MarketDetailsContainer>
      {!marketDataDetails ? null : children}
    </Container>
  )
}
