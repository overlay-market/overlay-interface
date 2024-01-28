import {Redirect} from 'react-router-dom'
import {useActiveWeb3React} from '../hooks/web3'
import {SupportedChainId} from '../constants/chains'

export const ProtectedRoute = ({children}: {children: JSX.Element}) => {
  const {chainId} = useActiveWeb3React()
  const supportedChainId: boolean = Boolean(chainId && SupportedChainId[chainId] === 'DEFAULT')

  if (!supportedChainId) return <Redirect to="/network-checker" exact={true} />
  return children
}
