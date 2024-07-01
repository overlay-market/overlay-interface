import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {colors} from '../../theme/theme'

const LinksContainer = styled.div`
  display: flex;
`
const activeClassName = 'ACTIVE'

export const StyledLink = styled(NavLink).attrs({
  activeClassName,
})`
  width: 120px;
  display: flex;
  justify-content: center;
  padding: 12px;
  box-sizing: border-box;
  color: ${() => colors(false).dark.white};
  font-size: 16px;
  font-weight: 700;
  font-family: Inter;
  text-decoration: none;

  &.${activeClassName} {
    color: ${({theme}) => theme.dark.blue2};
    border-width: 0px 0px 1px 0px;
    border-color: ${({theme}) => theme.dark.blue2};
    border-style: solid;
  }
`

const CardTabs = () => {
  return (
    <LinksContainer>
      <StyledLink to={'/power-cards/all-cards'}>All Cards</StyledLink>
      <StyledLink to={'/power-cards/my-cards'}>My Cards</StyledLink>
      <StyledLink to={'/power-cards/burnt-cards'}>Burnt Cards</StyledLink>
    </LinksContainer>
  )
}

export default CardTabs
