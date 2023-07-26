import React, {useMemo} from 'react'
import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {formatBigNumberUsingDecimalsToString} from '../../utils/formatWei'
import Loader from '../../components/Loaders/Loaders'
import {BigNumber} from 'ethers'
import {TEXT, colors} from '../../theme/theme'

const ContentContainer = styled(FlexColumn)`
  gap: 16px;
`

const AdditionalDetailRow = styled(FlexRow)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const PositionDetailType = styled.div`
  color: #b9babd;
  font-size: 14px;
  font-weight: 400;
`

export const PositionDetailTypeDashed = styled.div`
  color: #b9babd;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline dashed;
`

export const DetailValue = styled(TEXT.SmallBody)`
  display: flex;
  margin-left: auto;
  flex-direction: row;
`

export const HoverableDetailValue = styled(DetailValue)`
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`
export const OpenInterestValue = styled.div`
  color: #b9babd;
  font-size: 14px;
  min-width: 130px;
  text-align: right;
  margin-bottom: 3px;
`

export const MainDetails = ({
  isLong,
  quoteTokenDecimals,
  decimals,
  typedValue,
  estimatedBid,
  estimatedAsk,
  bidPrice,
  askPrice,
  minPrice,
}: {
  isLong?: boolean
  quoteTokenDecimals?: number
  decimals?: number
  typedValue?: string
  estimatedBid?: any
  estimatedAsk?: any
  bidPrice?: string | number | any
  askPrice?: string | number | any
  minPrice?: BigNumber
}) => {
  const estimatedReceivedPrice: any = useMemo(() => {
    if (isLong === undefined || estimatedBid === undefined || estimatedAsk === undefined) {
      return null
    }
    // if (estimatedBid === undefined || estimatedAsk === undefined) return prices.mid;
    if (decimals) {
      return isLong
        ? formatBigNumberUsingDecimalsToString(estimatedAsk, decimals, 4)
        : formatBigNumberUsingDecimalsToString(estimatedBid, decimals, 4)
    }
    return isLong
      ? formatBigNumberUsingDecimalsToString(estimatedAsk, quoteTokenDecimals, 4)
      : formatBigNumberUsingDecimalsToString(estimatedBid, quoteTokenDecimals, 4)
  }, [isLong, estimatedBid, estimatedAsk, quoteTokenDecimals, decimals])

  const priceImpact = useMemo(() => {
    if (!estimatedReceivedPrice) return null
    if (!typedValue || isLong === undefined || bidPrice === undefined || askPrice === undefined) return null
    if (!(+typedValue > 0)) return null
    if (bidPrice === 'loading' || askPrice === 'loading') return <Loader stroke="white" size="12px" />

    const priceImpactValue = isLong ? estimatedReceivedPrice - askPrice : bidPrice - estimatedReceivedPrice
    const priceImpactPercentage = isLong ? (priceImpactValue / askPrice) * 100 : (priceImpactValue / bidPrice) * 100

    return priceImpactPercentage.toFixed(2)
  }, [estimatedReceivedPrice, typedValue, isLong, bidPrice, askPrice])
  return (
    <ContentContainer>
      <AdditionalDetailRow>
        <TEXT.SmallBody color={colors(false).dark.grey2}>Est. Price</TEXT.SmallBody>
        <DetailValue color={colors(false).dark.blue1}>{estimatedReceivedPrice && minPrice ? estimatedReceivedPrice : '-'}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <TEXT.SmallBody color={colors(false).dark.grey2}>Worst Price</TEXT.SmallBody>
        <DetailValue color={colors(false).dark.blue1}>{minPrice ? formatBigNumberUsingDecimalsToString(minPrice, 18, 4) : '-'}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <TEXT.SmallBody color={colors(false).dark.grey2}>Price Impact</TEXT.SmallBody>
        <DetailValue color={colors(false).dark.blue1}>{priceImpact ? `${priceImpact}%` : `-`}</DetailValue>
      </AdditionalDetailRow>
    </ContentContainer>
  )
}
