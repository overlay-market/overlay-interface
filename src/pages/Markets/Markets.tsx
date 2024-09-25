import React, {useState, useEffect, useMemo} from 'react'
import styled from 'styled-components/macro'
import {NavLink} from 'react-router-dom'
import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {useActiveMarketsData} from '../../state/markets/hooks'
import {PageContainer} from '../../components/Container/Container'
import {FlexRow} from '../../components/Container/Container'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import Loader from '../../components/Loaders/Loaders'
import {useMarketDetails, AdditionalMarketData} from '../../hooks/useMarketDetails'
import {useCurrentMarketState, MarketStateResults, ParsedMarketStateDetails} from '../../hooks/useCurrentMarketState'
import {TEXT} from '../../theme/theme'
import MarketsRow from './MarketsRow'
import ReactTooltip from 'react-tooltip'
import {MarketChartMap, MarketDetails, CategoryName, MARKET_CATEGORIES} from '../../constants/markets'
import ChangeNetworkModal from '../../components/ConnectWalletModal/ChangeNetworkModal'
import {SupportedChainId, WORKING_CHAINS} from '../../constants/chains'
import {useMultichainContext} from '../../state/multichain/useMultichainContext'

const activeClassName = 'INACTIVE'

const CategorySelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`

export const StyledNavLink = styled(NavLink).attrs({activeClassName})`
  color: ${({theme}) => theme.dark.white};
  font-weight: 500;
  text-decoration: none;

  :hover {
    font-weight: 700;
  }
  :focus {
    font-weight: 700;
  }
`

export const MarketsStyledTableHeaderRow = styled(StyledTableHeaderRow)`
  #marketFundingRate,
  #marketOi,
  #marketFeedLogo,
  #market7dChart {
    display: none;
  }

  th,
  td {
    padding: 8px;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    #marketFundingRate,
    #market7dChart {
      display: table-cell;
    }
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    #marketOi,
    #marketFeedLogo {
      display: table-cell;
    }
  `}
`

const infoTipDescriptions = {
  openInterest: (
    <React.Fragment>
      <div>Open Interest (OI) refers to </div>
      <div>the total open positions on a given market.</div>
      <div>It is the sum of all OVL divided</div>
      <div>by the price of the market.</div>
      <br />
      <div>The OI Balance shows whether the</div>
      <div>long or the short side has more OI.</div>
    </React.Fragment>
  ),
  fundingRate: (
    <React.Fragment>
      <div>Funding Rate per Market</div>
      <br />
      <div>24 hour funding rate.</div>
      <div>The side with more OI pays the side </div>
      <div>with less.</div>
      <br />
      <div>Positive funding suggests bullish</div>
      <div>sentiment, longs pay shorts.</div>
      <div>Negative funding suggests bearish</div>
      <div>sentiment, shorts pay longs.</div>
    </React.Fragment>
  ),
}

const CategoryButton = styled.button<{active: boolean}>`
  background-color: ${props => (props.active ? 'transparent' : props.theme.dark.grey3)};
  color: ${props => (props.active ? props.theme.dark.blue2 : props.theme.dark.white)};
  border: ${props => (props.active ? '1px solid' : '0px')} ${props => props.theme.dark.blue2};
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.dark.blue2};
    color: ${props => props.theme.dark.black};
  }
`

const Markets = () => {
  const {markets, isUninitialized, refetch} = useActiveMarketsData()
  const marketDetails: AdditionalMarketData[] = useMarketDetails(markets)
  const {markets: marketsData, error: currentMarketsError}: MarketStateResults = useCurrentMarketState(marketDetails)
  const {chainId: contextChainId} = useMultichainContext()
  const [selectedCategory, setSelectedCategory] = useState<'All' | CategoryName>('All')

  // toggle to hide 7d chart if data unavailable
  const hide7dChart = true

  useEffect(() => {
    !isUninitialized && refetch()
  }, [contextChainId, isUninitialized, refetch])

  useEffect(() => {
    currentMarketsError && refetch()
  }, [currentMarketsError, refetch])

  const groupedMarkets = useMemo(() => {
    if (!marketsData) return {}

    return marketsData
      .filter(
        market =>
          Object.keys(MarketDetails).includes(market.marketAddress.toLowerCase()) && !MarketDetails[market.marketAddress.toLowerCase()].disabled,
      )
      .reduce((acc, market) => {
        const category = MarketDetails[market.marketAddress.toLowerCase()].category || CategoryName.Other
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(market)
        return acc
      }, {} as Record<string, ParsedMarketStateDetails[]>)
  }, [marketsData])

  const categories = useMemo(() => ['All', ...Object.keys(MARKET_CATEGORIES)], [])

  const filteredMarkets = useMemo(() => {
    if (selectedCategory === 'All') {
      return Object.values(groupedMarkets).flat()
    }
    return groupedMarkets[selectedCategory] || []
  }, [groupedMarkets, selectedCategory])

  return (
    <PageContainer>
      <CategorySelector>
        {categories.map(category => (
          <CategoryButton key={category} active={selectedCategory === category} onClick={() => setSelectedCategory(category as 'All' | CategoryName)}>
            {category}
          </CategoryButton>
        ))}
      </CategorySelector>
      <TableContainer component={Paper}>
        {contextChainId && WORKING_CHAINS.includes(SupportedChainId[contextChainId]) ? (
          <StyledTable smwidth="100%">
            <TableHead>
              <MarketsStyledTableHeaderRow>
                <StyledHeaderCell width={1} smwidth={6} id="marketIndex">
                  <TEXT.Supplemental>#</TEXT.Supplemental>
                </StyledHeaderCell>
                <StyledHeaderCell width={25} smwidth={60} id="marketName">
                  <TEXT.Supplemental>Market</TEXT.Supplemental>
                </StyledHeaderCell>
                <StyledHeaderCell>
                  <TEXT.Supplemental id="marketPrice">Price</TEXT.Supplemental>
                </StyledHeaderCell>
                <StyledHeaderCell id="marketFundingRate">
                  <TEXT.SupplementalUnderlinedDashes data-for={'funding info'} data-tip={'funding info'}>
                    Funding
                  </TEXT.SupplementalUnderlinedDashes>
                  <ReactTooltip place="bottom" type="info" effect="solid" textColor={'#FFFFFF'} backgroundColor="#000000" id={'funding info'}>
                    {infoTipDescriptions.fundingRate}
                  </ReactTooltip>
                </StyledHeaderCell>
                <StyledHeaderCell id="marketOi">
                  <TEXT.SupplementalUnderlinedDashes data-for={'Balance info'} data-tip={'Balance info'}>
                    OI Balance
                  </TEXT.SupplementalUnderlinedDashes>
                  <ReactTooltip place="bottom" type="info" effect="solid" textColor={'#FFFFFF'} backgroundColor="#000000" id={'Balance info'}>
                    {infoTipDescriptions.openInterest}
                  </ReactTooltip>
                </StyledHeaderCell>
                <StyledHeaderCell align="center" id="marketFeedLogo">
                  <TEXT.Supplemental>Oracle</TEXT.Supplemental>
                </StyledHeaderCell>
                {!hide7dChart && (
                  <StyledHeaderCell align="center" id="market7dChart">
                    <TEXT.Supplemental>7D Chart</TEXT.Supplemental>
                  </StyledHeaderCell>
                )}
              </MarketsStyledTableHeaderRow>
            </TableHead>
            <TableBody>
              {filteredMarkets.map((market: ParsedMarketStateDetails, index: number) => (
                <MarketsRow
                  key={market.marketAddress}
                  index={index + 1}
                  marketId={market.marketAddress}
                  marketName={market.marketName}
                  midPrice={market.parsedMid}
                  oiLong={market.parsedOiLong}
                  oiShort={market.parsedOiShort}
                  capOi={market.parsedCapOi}
                  dailyFundingRate={market.parsedDailyFundingRate}
                  annualFundingRate={market.parsedAnnualFundingRate}
                  oracleLogo={MarketDetails[market.marketAddress.toLowerCase()].oracleLogo ?? market.oracleLogo}
                  marketLogo={market.marketLogo}
                  priceCurrency={market.priceCurrency}
                  marketChartData={MarketChartMap[market.marketName ?? '']}
                  hide7dChart={hide7dChart}
                />
              ))}
            </TableBody>
          </StyledTable>
        ) : (
          <ChangeNetworkModal />
        )}
      </TableContainer>
      {marketsData.length === 0 && contextChainId && WORKING_CHAINS.includes(SupportedChainId[contextChainId]) && (
        <FlexRow marginTop="32px" justifyContent="center !important" width="100%">
          <Loader stroke="white" size="21px" />
        </FlexRow>
      )}
      {!contextChainId && (
        <FlexRow marginTop="32px" justifyContent="center !important" width="100%">
          <Loader stroke="white" size="21px" />
        </FlexRow>
      )}
    </PageContainer>
  )
}

export default Markets
