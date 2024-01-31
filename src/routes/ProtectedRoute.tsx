import {Redirect, useLocation} from 'react-router-dom'
import {useActiveWeb3React} from '../hooks/web3'
import {SupportedChainId, DEFAULT_NET} from '../constants/chains'

export const ProtectedRoute = ({children}: {children: JSX.Element}) => {
  let location = useLocation()
  const {chainId} = useActiveWeb3React()
  const supportedChainId: boolean = Boolean(chainId && SupportedChainId[chainId] === DEFAULT_NET)

  if (!supportedChainId && location.pathname !== '/claim-checker') return <Redirect to="/network-checker" exact={true} />
  return children
}
