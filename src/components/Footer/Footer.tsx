import styled from 'styled-components/macro'
import {Button, IconButton, Link, capitalize} from '@material-ui/core'
import {Image} from 'rebass'
import OverlayLogoDark from '../../assets/images/overlay-logo-dark.png'
import {LINKS} from '../../constants/links'
import {TEXT, colors} from '../../theme/theme'
import {useWithdrawCallback} from '../../hooks/useWithdrawCallback'
import {BigNumber} from 'ethers'
import {useSingleCallResult} from '../../state/multicall/hooks'
import {useThirdWebStakingContract} from '../../hooks/useContract'
import {useActiveWeb3React} from '../../hooks/web3'
import {formatBigNumber} from '../../utils/formatBigNumber'

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 244px;
  border-top: 1px solid ${({theme}) => theme.dark.grey3};
`

const FooterContainer = styled.div`
  margin: auto;
  box-sizing: border-box;
  max-width: 1200px;
  padding: 40px 16px;
  display: flex;
  flex-direction: column;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    flex-direction: row;
    justify-content: space-between;
    padding: 40px 24px;
  `}

  ${({theme}) => theme.mediaWidth.minLarge`
    padding: 40px 0px;
  `}
`

const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const LogoContainer = styled.div`
  margin-bottom: 32px;

  ${({theme}) => theme.mediaWidth.minSmall`
    margin-bottom: 0px;
  `}
`

const CopyrightText = styled(TEXT.SmallBody)`
  margin-bottom: 32px !important;
  color: ${colors(false).dark.grey1} !important;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    margin-bottom: 0px !important;
    color: ${colors(true).dark.white} !important;
  `}
`

const StyledIconButton = styled(IconButton)<IconButtonProps>(props => ({
  marginRight: props.marginRight ? `${props.marginRight}px !important` : 0,
  padding: '0px !important',
}))

const LinksContainer = styled.div`
  display: flex;
`

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLink = styled(Link)`
  margin-bottom: 4px !important;
`

const AboutContainer = styled.div`
  flex: 1;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    margin-right: 64px;
    width: 100%;
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    margin-right: 100px;
  `}
`

const SocialsContainer = styled.div`
  flex: 1;
`

interface IconButtonProps {
  href: string
  target: string
  marginRight?: number
}

interface LinkAsset {
  label: string
  href: string
}

const ABOUT_LINKS: Array<LinkAsset> = [
  {
    label: 'About Overlay',
    href: LINKS.LANDING,
  },
  {
    label: 'Documentation',
    href: LINKS.DOCUMENTATION,
  },
  {
    label: 'Arbiscan',
    href: LINKS.ARBISCAN,
  },
]

const SOCIAL_LINKS: Array<LinkAsset> = [
  {
    label: 'Discord',
    href: LINKS.DISCORD,
  },
  {
    label: 'Telegram',
    href: LINKS.TELEGRAM,
  },
  {
    label: 'Twitter',
    href: LINKS.TWITTER,
  },
  {
    label: 'Mirror',
    href: LINKS.MIRROR,
  },
  {
    label: 'Commonwealth',
    href: LINKS.GOVERNANCE,
  },
]

const LinkSection = ({title, links}: {title: string; links: Array<LinkAsset>}) => {
  return (
    <LinkColumn>
      <TEXT.BoldSmallBody color={colors(true).dark.white} lineHeight={'160%'} mb={16}>
        {title}
      </TEXT.BoldSmallBody>
      {links.map(link => (
        <StyledLink key={link.label} target="_blank" href={link.href} underline="none">
          <TEXT.SmallBody lineHeight={'160%'}>{link.label}</TEXT.SmallBody>
        </StyledLink>
      ))}
    </LinkColumn>
  )
}

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const {account} = useActiveWeb3React()
  const poolAddress = '0x1921054a4f8817F9783628F0694744F91Dd9d34e'
  const stakingContract = useThirdWebStakingContract(poolAddress)
  const stakeInfo = useSingleCallResult(stakingContract, 'getStakeInfo', [account || '0x0000000000000000000000000000000000000000'])
  const stakedAmount: BigNumber = stakeInfo?.result?.[0] ?? (BigNumber.from(0) as BigNumber)

  const {callback: withdrawCallback} = useWithdrawCallback(formatBigNumber(stakedAmount, 18, 6)?.toString() ?? '0', poolAddress)

  const handleStakeWithdraw = () => {
    if (!withdrawCallback) return

    withdrawCallback()
  }

  return (
    <StyledFooter>
      <FooterContainer>
        <BrandContainer>
          {/* Overlay */}
          <LogoContainer>
            <StyledIconButton href={LINKS.LANDING} target="_blank">
              <Image src={OverlayLogoDark} alt="Overlay Logo" height={'auto'} width={138} />
            </StyledIconButton>
          </LogoContainer>

          {/* Copyright text */}
          <CopyrightText lineHeight={'160%'}>Copyright {currentYear} © Overlay Foundation, All Rights Reserved</CopyrightText>
        </BrandContainer>

        <LinksContainer>
          {/* About */}
          <AboutContainer>
            <LinkSection title="About" links={ABOUT_LINKS} />
            <Button
              onClick={handleStakeWithdraw}
              style={{
                color: '#71CEFF',
                textDecoration: 'underline',
                fontSize: '14px',
                padding: '0px 0px',
                textTransform: 'capitalize',
                justifyContent: 'start',
              }}
            >
              Unstake
            </Button>
          </AboutContainer>

          {/* Socials */}
          <SocialsContainer>
            <LinkSection title="Socials" links={SOCIAL_LINKS} />
          </SocialsContainer>
        </LinksContainer>
      </FooterContainer>
    </StyledFooter>
  )
}

export default Footer
