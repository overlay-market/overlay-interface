import {Redirect} from 'react-router-dom'
import {useActiveWeb3React} from '../hooks/web3'
import {SupportedChainId, WORKING_CHAINS} from '../constants/chains'
import Loader from '../components/Loaders/Loaders'
import styled from 'styled-components'

export const LoaderContainer = styled.div`
  width: 100vw;
  padding-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NetworkCheckerRoute = ({
  currentPathName,
  showLoader,
  children,
}: {
  currentPathName: string
  showLoader: boolean
  children: JSX.Element
}) => {
  const {chainId} = useActiveWeb3React()
  const supportedChainId: boolean = Boolean(chainId && WORKING_CHAINS.includes(SupportedChainId[chainId]))

  if (!showLoader && chainId && supportedChainId) return <Redirect to={currentPathName === '/network-checker' ? '/' : currentPathName} />

  return showLoader ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) : (
    children
  )
}
