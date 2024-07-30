import {Redirect, useLocation} from 'react-router-dom'
import {useActiveWeb3React} from '../hooks/web3'
import {SupportedChainId, WORKING_CHAINS} from '../constants/chains'

export const ProtectedRoute = ({children}: {children: JSX.Element}) => {
  let location = useLocation()
  const {chainId} = useActiveWeb3React()
  const supportedChainId: boolean = Boolean(chainId && WORKING_CHAINS.includes(SupportedChainId[chainId]))

  if (!supportedChainId && location.pathname !== '/claim-checker' && location.pathname !== '/faucet')
    return <Redirect to="/network-checker" exact={true} />
  return children
}
