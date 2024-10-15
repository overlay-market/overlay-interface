import {createContext, Dispatch, SetStateAction} from 'react'
import {DEFAULT_CHAINID} from '../../constants/chains'

type MultichainContextType = {
  setSelectedChainId: Dispatch<SetStateAction<number | undefined | null>>
  chainId?: number
  initialChainId?: number
  isMultichainContext: boolean
}

export const MultichainContext = createContext<MultichainContextType>({
  setSelectedChainId: () => undefined,
  chainId: DEFAULT_CHAINID,
  initialChainId: DEFAULT_CHAINID,
  isMultichainContext: false,
})
