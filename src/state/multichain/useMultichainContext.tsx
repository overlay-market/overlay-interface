import {useContext} from 'react'
import {MultichainContext} from './types'
import {useActiveWeb3React} from '../../hooks/web3'

export function useMultichainContext() {
  const {chainId} = useActiveWeb3React()
  const context = useContext(MultichainContext)

  return {
    ...context,
    chainId: context.isMultichainContext ? context.chainId : chainId,
  }
}
