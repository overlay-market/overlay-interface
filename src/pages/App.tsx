import './App.css'
import {Route, Switch, Redirect, useHistory, useLocation} from 'react-router-dom'
import Web3ReactManager from '../components/Web3ReactManager/Web3ReactManager'
import TermsOfServiceManager from '../components/TermsOfServiceModal/TermsOfServiceManager'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CurrentBlock from '../components/CurrentBlock/CurrentBlock'
import Markets from './Markets/Markets'
import {Market} from './Markets/Market'
import {Unwind} from './Positions/Unwind'
import Positions from './Positions/PositionsPage'
import styled from 'styled-components/macro'
import Bridge from './Bridge/Bridge'
import Claim from './Claim/Claim'
import ClaimPage from './Claim/ClaimPage'
import Pools from './Stake/StakePage'
import Pool from './Stake/PoolWrapper'
import SepoliaChecker from './SepoliaChecker/SepoliaChecker'
import Popups from '../components/Popup/Popups'
import ClaimChecker from './ClaimChecker/ClaimChecker'
import Faucet from './Faucet/Faucet'
import {ClosedPosition} from './Positions/ClosedPosition'
import Leaderboard from './Leaderboard/Leaderboard'
import TradingMiningLeaderboard from './TradingMining/TradingMiningLeaderboard'
import {cookie3Analytics} from '@cookie3/analytics'
import {useEffect, useRef, useState} from 'react'
import {NetworkCheckerRoute} from '../routes/NetworkCheckerRoute'
import {ProtectedRoute} from '../routes/ProtectedRoute'
import {useActiveWeb3React} from '../hooks/web3'
import {SupportedChainId, WORKING_CHAINS} from '../constants/chains'
import {useMultichainContext} from '../state/multichain/useMultichainContext'
import {MultichainContextProvider} from '../state/multichain/MultichainContext'
import useSyncChainQuery from '../hooks/useSyncChainQuery'
import ScrollToTop from '../utils/scrollToTop'

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.dark.background};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  max-width: calc(100vw - (100vw - 100%)); //the width of the scrollbar is subtracted
  position: relative;
`

// padding-bottom: footer height + 200px margin
export const ContentWrapper = styled.div`
  padding-bottom: 340px;
`

const App = () => {
  const chainIdRef = useRef<number | undefined>(undefined)
  useSyncChainQuery(chainIdRef)

  let history = useHistory()
  let location = useLocation()
  const {chainId} = useActiveWeb3React()
  const {chainId: contextChainID} = useMultichainContext()
  const supportedChainId: boolean = Boolean(chainId && WORKING_CHAINS.includes(SupportedChainId[chainId]))
  const [showLoader, setShowLoader] = useState(false)
  const [currentPathName, setCurrentPathName] = useState(location.pathname)

  useEffect(() => {
    if (location.pathname !== '/network-checker' && location.pathname !== '/claim-checker' && location.pathname !== '/faucet') {
      setCurrentPathName(location.pathname)
    }
  }, [location])

  useEffect(() => {
    if (!chainId) {
      setShowLoader(true)
    }
    if (chainId) {
      setShowLoader(false)
    }
  }, [chainId, location])

  useEffect(() => {
    if (!supportedChainId && location.pathname !== '/claim-checker' && location.pathname !== '/faucet') {
      history.push('/network-checker')
    }
  }, [chainId, supportedChainId, location])

  useEffect(() => {
    var gaProperty: string = 'G-QJR084KXFT'
    var disableStr: string = 'ga-disable-' + gaProperty

    const analytics = cookie3Analytics({siteId: 260, disabled: document.cookie.indexOf(disableStr + '=true') > -1})

    analytics.trackPageView()
  }, [])

  return (
    <MultichainContextProvider initialChainId={contextChainID}>
      <AppWrapper>
        <ScrollToTop />
        <Popups />
        <TermsOfServiceManager>
          <Header />
          <Web3ReactManager>
            <ContentWrapper>
              <Route
                path="/network-checker"
                children={
                  <NetworkCheckerRoute currentPathName={currentPathName} showLoader={showLoader}>
                    <SepoliaChecker />
                  </NetworkCheckerRoute>
                }
              />

              <Route
                path="/"
                children={
                  <ProtectedRoute>
                    <Switch>
                      <Route exact strict path="/" render={() => <Redirect to="/markets" />} />
                      <Route exact strict path="/markets" component={Markets} />
                      <Route exact strict path="/markets/:marketId" component={Market} />
                      <Route exact strict path="/positions" component={Positions} />
                      <Route exact strict path="/positions/:marketPositionId/:positionId" component={Unwind} />
                      <Route exact strict path="/closed-positions/:unwindId/:positionId" component={ClosedPosition} />
                      <Route exact strict path="/claim/:claimId" component={Claim} />
                      <Route exact strict path="/claimpage" component={ClaimPage} />
                      <Route exact strict path="/stake" component={Pools} />
                      <Route exact strict path="/stake/:poolAddress" component={Pool} />
                      <Route exact strict path="/bridge" component={Bridge} />
                      <Route exact strict path="/claim-checker" component={ClaimChecker} />
                      <Route exact strict path="/faucet" component={Faucet} />
                      <Route exact strict path="/leaderboard" component={Leaderboard} />
                      <Route exact strict path="/trading-mining" component={TradingMiningLeaderboard} />
                    </Switch>
                  </ProtectedRoute>
                }
              />
            </ContentWrapper>
          </Web3ReactManager>
          <Footer />
        </TermsOfServiceManager>
        <CurrentBlock />
      </AppWrapper>
    </MultichainContextProvider>
  )
}
export default App
