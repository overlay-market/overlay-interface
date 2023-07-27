import React, {useMemo} from 'react'
import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {formatBigNumberUsingDecimalsToString} from '../../utils/formatWei'
import Loader from '../../components/Loaders/Loaders'
import {BigNumber} from 'ethers'
import {TEXT, colors} from '../../theme/theme'
import SetSlippageModal from '../../components/SetSlippageModal.tsx/SetSlippageModal'
import {useSetSlippageModalToggle} from '../../state/application/hooks'
import {useBuildState} from '../../state/build/hooks'

const ContentContainer = styled(FlexColumn)`
  gap: 16px;
`

const AdditionalDetailRow = styled(FlexRow)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const SlippageValueContainer = styled.div`
  display: flex;
  gap: 8px;
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
  priceCurrency,
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
  priceCurrency?: string
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

  const toggleSetSlippageModal = useSetSlippageModalToggle()
  const {setSlippageValue} = useBuildState()

  return (
    <ContentContainer>
      <AdditionalDetailRow>
        <TEXT.SmallBody color={colors(false).dark.grey2}>Est. Price</TEXT.SmallBody>
        <DetailValue color={colors(false).dark.blue1}>
          {estimatedReceivedPrice && minPrice ? `${priceCurrency}${estimatedReceivedPrice}` : '-'}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <SlippageValueContainer style={{gap: '8px'}}>
          <TEXT.SmallBody color={colors(false).dark.grey2}>Worst Price</TEXT.SmallBody>
          <TEXT.Supplemental
            onClick={toggleSetSlippageModal}
            color={colors(false).dark.blue2}
            style={{textDecoration: 'underline', cursor: 'pointer'}}
          >
            {`${setSlippageValue}% slippage`}
          </TEXT.Supplemental>
        </SlippageValueContainer>
        <DetailValue color={colors(false).dark.blue1}>
          {minPrice ? `${priceCurrency}${formatBigNumberUsingDecimalsToString(minPrice, 18, 4)}` : '-'}
        </DetailValue>
      </AdditionalDetailRow>

      <SetSlippageModal />

      <AdditionalDetailRow>
        <TEXT.SmallBody color={colors(false).dark.grey2}>Price Impact</TEXT.SmallBody>
        <DetailValue color={colors(false).dark.blue1}>{priceImpact ? `${priceImpact}%` : `-`}</DetailValue>
      </AdditionalDetailRow>
    </ContentContainer>
  )
}
