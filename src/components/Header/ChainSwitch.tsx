import {useState, useEffect} from 'react'
import styled from 'styled-components/macro'
import {FlexContainer, FlexRow} from '../Container/Container'
import {TEXT, colors} from '../../theme/theme'
import ArbitrumLogo from '../../assets/images/arbitrum-logo.png'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import ArbitrumTestnetLogo from '../../assets/images/arbitrum-testnet-logo.png'
import ImolaLogo from '../../assets/images/imola-logo.png'
import {useActiveWeb3React} from '../../hooks/web3'
import {SupportedChainId, DEFAULT_CHAINID, WORKING_CHAINS} from '../../constants/chains'
import {Box, Menu, MenuItem} from '@material-ui/core'
import {switchNetworkToArbitrum, switchNetworkToImola} from '../../utils/switchNetworkToArbitrum'
import {useMultichainContext} from '../../state/multichain/useMultichainContext'

export const ChainLogo = styled.div<{src: string}>`
  background: no-repeat center/contain url(${({src}) => src});
  height: 24px;
  width: 24px;
`

const ChainSwitchButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const StyledMenu = styled(Menu)({
  marginTop: '40px',

  '& .MuiPaper-root': {
    backgroundColor: `${colors(true).dark.grey4}`,
    borderTop: '1px solid #333',
    maxWidth: '232px',
    width: '232px',
    boxSizing: 'border-box',
    color: `${colors(true).dark.blue1}`,
    borderRadius: '8px',
    padding: '10px 0px',
  },
  '& .MuiList-root': {
    padding: '0',
  },
  '& .MuiListItem-root': {
    justifyContent: 'start',
    padding: '0',
  },

  '& .MuiButtonBase-root': {
    padding: '8px 18px',
  },
  '& .MuiButtonBase-root:hover': {
    backgroundColor: `${colors(true).dark.background}`,
    fontWeight: '700',
  },
})

export const PlatformLogo = styled.div<{src: string; open?: boolean}>`
  background: no-repeat center/contain url(${({src}) => src});
  background-size: contain;
  background-repeat: no-repeat;
  height: 17px;
  width: 17px;
  opacity: ${({open}) => (open ? '0' : '1')};
  transition: all 0.2s linear;
`

export const NETWORK_ICONS: {[chainId in SupportedChainId | number]: string} = {
  [SupportedChainId.MAINNET]: EthereumLogo,
  [SupportedChainId.ARBITRUM]: ArbitrumLogo,
  [SupportedChainId.ARBITRUM_SEPOLIA]: ArbitrumTestnetLogo,
  [SupportedChainId.IMOLA]: ImolaLogo,
}

export const NETWORK_LABELS: {[chainId in SupportedChainId | number]: JSX.Element} = {
  [SupportedChainId.MAINNET]: <TEXT.SmallBody>Ethereum Mainnet</TEXT.SmallBody>,
  [SupportedChainId.ARBITRUM]: <TEXT.SmallBody>Arbitrum One</TEXT.SmallBody>,
  [SupportedChainId.ARBITRUM_GÖRLI]: (
    <FlexRow>
      <TEXT.SmallBody>Arbitrum Goerli -</TEXT.SmallBody>
      <TEXT.SmallBody color={colors(false).dark.red}>Testnet</TEXT.SmallBody>
    </FlexRow>
  ),
  [SupportedChainId.ARBITRUM_SEPOLIA]: (
    <FlexRow>
      <TEXT.SmallBody>Arbitrum Sepolia -</TEXT.SmallBody>
      <TEXT.SmallBody color={colors(false).dark.red}>Testnet</TEXT.SmallBody>
    </FlexRow>
  ),
  [SupportedChainId.IMOLA]: (
    <FlexRow>
      <TEXT.SmallBody>Movement -</TEXT.SmallBody>
      <TEXT.SmallBody color={colors(false).dark.red}>Testnet</TEXT.SmallBody>
    </FlexRow>
  ),
}

const CHAIN_LIST: {[chainId in SupportedChainId | number]: string} = {
  [SupportedChainId.ARBITRUM_SEPOLIA]: 'Arbitrum Sepolia',
  [SupportedChainId.IMOLA]: 'Movement',
}

const CHAIN_LIST_ORDER: {[x: number]: number} = {
  [1]: SupportedChainId.ARBITRUM_SEPOLIA,
  [2]: SupportedChainId.IMOLA,
}

export default function ChainSwitch() {
  const {account} = useActiveWeb3React()
  const {chainId: contextChainId, setSelectedChainId} = useMultichainContext()
  const supportedChainId: boolean = Boolean(contextChainId && WORKING_CHAINS.includes(SupportedChainId[contextChainId]))

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [activeChainSrc, setActiveChainSrc] = useState('')

  useEffect(() => {
    setActiveChainSrc(contextChainId && supportedChainId ? NETWORK_ICONS[contextChainId] : NETWORK_ICONS[DEFAULT_CHAINID])
  }, [supportedChainId, contextChainId])

  const openDropdownMenu = Boolean(anchorEl)

  const clickSelectChain = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeSelectChain = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const handleSelectChain = (targetChainId: number) => {
    if (account) {
      Number(targetChainId) === Number(SupportedChainId.ARBITRUM_SEPOLIA)
        ? switchNetworkToArbitrum()
        : Number(targetChainId) === Number(SupportedChainId.IMOLA)
        ? switchNetworkToImola()
        : console.log('error')
    } else {
      sessionStorage.setItem('chainId', String(targetChainId))
      setSelectedChainId(targetChainId)
      setActiveChainSrc(NETWORK_ICONS[targetChainId])
    }

    setAnchorEl(null)
  }

  return (
    <>
      <ChainSwitchButton
        id="dropdown"
        onClick={clickSelectChain}
        aria-controls={openDropdownMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openDropdownMenu ? 'true' : undefined}
      >
        <ChainLogo src={activeChainSrc} />
      </ChainSwitchButton>
      <StyledMenu
        id="basic-menu"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={openDropdownMenu}
        onClose={closeSelectChain}
      >
        {Object.keys(CHAIN_LIST_ORDER).map((idValue: string) => {
          const id = Number(idValue)
          return (
            <MenuItem key={id} onClick={() => handleSelectChain(CHAIN_LIST_ORDER[id])} disableRipple>
              <FlexContainer gap="16px">
                <ChainLogo src={NETWORK_ICONS[CHAIN_LIST_ORDER[id]]} />
                <Box style={{fontFamily: 'Inter', color: '#fff'}}>{CHAIN_LIST[CHAIN_LIST_ORDER[id]]}</Box>
              </FlexContainer>
            </MenuItem>
          )
        })}
      </StyledMenu>
    </>
  )
}
