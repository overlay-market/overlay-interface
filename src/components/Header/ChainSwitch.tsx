import {useState, useRef, useEffect} from 'react'
import styled from 'styled-components/macro'
import {FlexRow} from '../Container/Container'
import {TEXT, colors} from '../../theme/theme'
import ArbitrumLogo from '../../assets/images/arbitrum-logo.png'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import ArbitrumTestnetLogo from '../../assets/images/arbitrum-testnet-logo.png'
import {useActiveWeb3React} from '../../hooks/web3'
import {SupportedChainId, DEFAULT_CHAINID} from '../../constants/chains'

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
}

export default function ChainSwitch() {
  const {account, chainId} = useActiveWeb3React()
  const supportedChainId: boolean = Boolean(chainId && SupportedChainId[chainId])

  return (
    <>
      <ChainSwitchButton
        id="showButton"
        onClick={event => {
          event.stopPropagation()
        }}
      >
        {account && chainId && supportedChainId ? (
          <ChainLogo src={NETWORK_ICONS[chainId]} />
        ) : (
          supportedChainId && <ChainLogo src={NETWORK_ICONS[DEFAULT_CHAINID]} />
        )}
      </ChainSwitchButton>
    </>
  )
}
