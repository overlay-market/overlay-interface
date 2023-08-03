import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {AlertCircle} from 'react-feather'
import {Back} from '../../components/Back/Back'
import {TEXT, colors} from '../../theme/theme'
import {Icon} from '../../components/Icon/Icon'
import {useMarketData, useTotalMarketsData} from '../../state/markets/hooks'
import {useMemo} from 'react'
import {useMarketName} from '../../hooks/useMarketName'
import {getCharactersBeforeSlash} from '../../utils/getCharactersBeforeSlash'
import {MARKET_LOGO_FROM_BASE} from '../../constants/markets'
import {AdditionalMarketData, useMarketDetails} from '../../hooks/useMarketDetails'

const Container = styled(FlexColumn)`
  padding: 12px;
`

const MarketNameContainer = styled(FlexRow)`
  gap: 6px;
`

const BuildHeader = ({marketId}: {marketId: string}) => {
  const {market} = useMarketData(marketId)
  const {description: marketName} = useMarketName(market?.feedAddress)
  const baseToken = useMemo(() => getCharactersBeforeSlash(marketName || ''), [marketName])
  const marketLogo = useMemo(() => MARKET_LOGO_FROM_BASE[baseToken], [baseToken])

  const {markets} = useTotalMarketsData()
  const marketDetails: AdditionalMarketData[] = useMarketDetails(markets)

  return (
    <Container align="flex-start">
      <Back arrowSize={16} fontSize={14} fontColor={colors(false).dark.blue2} />
      <MarketNameContainer>
        <Icon size={20}>{marketLogo ? <img src={marketLogo} alt="Market Feed Logo" /> : <AlertCircle size={20} />}</Icon>
        <TEXT.BoldSmallBody>{marketName}</TEXT.BoldSmallBody>
      </MarketNameContainer>
    </Container>
  )
}

export default BuildHeader
