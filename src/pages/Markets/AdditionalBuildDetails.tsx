import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import Loader from '../../components/Loaders/Loaders'
import {TEXT, colors} from '../../theme/theme'
import {toScientificNumber, toPercentUnit} from '../../utils/toScientificNumber'
import {BigNumber} from 'ethers'

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
  font-weight: 700;
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

export const AdditionalDetails = ({
  fee,
  slippageTolerance,
  expectedOi,
  estLiquidationPrice,
  feedAddress,
  priceCurrency,
}: {
  bidPrice?: string | number | any
  askPrice?: string | number | any
  fee?: string | number
  oiCap?: number | null
  oiLong?: number
  oiShort?: number
  priceImpact?: string
  slippageTolerance?: string | number
  expectedOi?: BigNumber | string | number | null
  fundingRate?: string | number
  estLiquidationPrice?: string | number
  feedAddress?: string
  priceCurrency?: string
}) => {
  return (
    <ContentContainer>
      <AdditionalDetailRow>
        <TEXT.SmallBody color={colors(false).dark.grey2}>Trading Fee</TEXT.SmallBody>
        <DetailValue color={colors(false).dark.blue1}>{fee === 'loading' ? <Loader stroke="white" size="12px" /> : `${fee}%`}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <TEXT.SmallBody color={colors(false).dark.grey2}>Slippage</TEXT.SmallBody>
        <DetailValue color={colors(false).dark.blue1}>{slippageTolerance}%</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <TEXT.SmallBody color={colors(false).dark.grey2}>Est. Liquidation Price</TEXT.SmallBody>
        <DetailValue color={colors(false).dark.blue1}>{`${priceCurrency}${
          priceCurrency === '%' ? toPercentUnit(estLiquidationPrice) : toScientificNumber(estLiquidationPrice)
        }`}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <TEXT.SmallBody color={colors(false).dark.grey2}>Expected OI</TEXT.SmallBody>
        <DetailValue color={colors(false).dark.blue1}>{expectedOi ? toScientificNumber(expectedOi) : '-'}</DetailValue>
      </AdditionalDetailRow>
    </ContentContainer>
  )
}
