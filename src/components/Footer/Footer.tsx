import styled from 'styled-components/macro'
import {IconButton, Link} from '@material-ui/core'
import {Image} from 'rebass'
import OverlayLogoDark from '../../assets/images/overlay-logo-dark.png'
import {LINKS} from '../../constants/links'
import {TEXT, colors} from '../../theme/theme'

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

const CHECKCLAIM_LINK = {
  label: 'Check Claim',
  href: './#/claim-checker',
}

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
            <StyledLink key={CHECKCLAIM_LINK.label} href={CHECKCLAIM_LINK.href} underline="none">
              <TEXT.SmallBody lineHeight={'160%'}>{CHECKCLAIM_LINK.label}</TEXT.SmallBody>
            </StyledLink>
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
