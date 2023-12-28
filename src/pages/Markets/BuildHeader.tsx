import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {AlertCircle} from 'react-feather'
import {Back} from '../../components/Back/Back'
import {TEXT, colors} from '../../theme/theme'
import {Icon} from '../../components/Icon/Icon'
import {useMarketData, useActiveMarketsData} from '../../state/markets/hooks'
import {useEffect, useMemo} from 'react'
import {useMarketName} from '../../hooks/useMarketName'
import {getCharactersBeforeSlash} from '../../utils/getCharactersBeforeSlash'
import {MarketDetails} from '../../constants/markets'
import {AdditionalMarketData, useMarketDetails} from '../../hooks/useMarketDetails'
import Dropdown from '../../components/Dropdown/Dropdown'
import {useHistory} from 'react-router-dom'
import Loader from '../../components/Loaders/Loaders'
import {useActiveWeb3React} from '../../hooks/web3'

const Container = styled(FlexColumn)`
  padding: 12px;
  @media (max-width: 768px) {
    padding: 12px 0px;
  }
`

const MarketNameContainer = styled(FlexRow)`
  gap: 6px;
  @media (max-width: 768px) {
    margin-top: 28px;
  }
`

const DropdownContainer = styled.div`
  z-index: 50;
`

const BuildHeader = ({marketId}: {marketId: string}) => {
  const {market, isLoading, refetch} = useMarketData(marketId)
  const marketName = MarketDetails[marketId]?.marketName
  const baseToken = useMemo(() => getCharactersBeforeSlash(marketName || ''), [marketName])
  // const marketLogo = useMemo(() => MARKET_LOGO_FROM_BASE[baseToken], [baseToken])
  const marketLogo = MarketDetails[marketId]?.logo
  const {chainId} = useActiveWeb3React()

  const {markets, isUninitialized, refetch: refetchActiveMarkets} = useActiveMarketsData()
  const marketDetail: AdditionalMarketData[] = useMarketDetails(markets)
  const history = useHistory()

  useEffect(() => {
    markets && !isUninitialized && refetchActiveMarkets()
  }, [chainId, markets, isUninitialized, refetchActiveMarkets])

  const marketOptions = marketDetail
    .filter(market => market?.id !== marketId)
    .map(market => ({
      value: market?.id,
      label: getCharactersBeforeSlash(market?.description || ''),
      onClick: () => {
        refetch()
        history.push(`/markets/${market?.id}`)
      },
    }))

  return (
    <Container align="flex-start">
      <Back arrowSize={16} fontSize={14} fontColor={colors(false).dark.blue2} toUrl={'/markets'} />
      <MarketNameContainer>
        <Icon size={20}>{marketLogo ? <img src={marketLogo} alt="Market Feed Logo" /> : <AlertCircle size={20} />}</Icon>
        <TEXT.BoldSmallBody>{marketName}</TEXT.BoldSmallBody>
        {isLoading || !marketDetail.length || !baseToken || !marketName ? (
          <Loader size="12px" />
        ) : (
          <DropdownContainer>
            {/* <Dropdown
              value={{
                value: market?.id,
                label: baseToken,
              }}
              isLoading={isLoading || !marketDetail.length || !baseToken || !marketName}
              options={marketOptions}
            /> */}
          </DropdownContainer>
        )}
      </MarketNameContainer>
    </Container>
  )
}

export default BuildHeader
