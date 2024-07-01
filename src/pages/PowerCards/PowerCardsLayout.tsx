import {ReactNode} from 'react'
import {PageContainer} from '../../components/Container/Container'
import CardTabs from './CardTabs'
import styled from 'styled-components'

const StyledPageContainer = styled(PageContainer)`
  padding: 0;
`

interface PowerCardsLayoutProps {
  children: ReactNode
}

const PowerCardsLayout: React.FC<PowerCardsLayoutProps> = ({children}) => {
  return (
    <StyledPageContainer maxWidth={'1023px'}>
      <CardTabs />
      {children}
    </StyledPageContainer>
  )
}

export default PowerCardsLayout
