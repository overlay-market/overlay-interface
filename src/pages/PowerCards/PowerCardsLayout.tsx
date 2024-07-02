import {ReactNode} from 'react'
import {PageContainer} from '../../components/Container/Container'
import CardTabs from './CardTabs'
import styled from 'styled-components'
import {Container} from '@material-ui/core'

const PageWrapper = styled(Container)`
  @media (max-width: 415px) {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }

  ${({theme}) => theme.mediaWidth.minMedium`
    background: #161a27;
    min-width: 100vw;
    border: 1px solid #161a27;
    box-shadow: 0 94px 0px 0px #161a27;
  `};
`

const StyledPageContainer = styled(PageContainer)`
  padding: 0;

  ${({theme}) => theme.mediaWidth.minMedium`
    > div {
      background: #161a27 !important;
    }
  `};
`

interface PowerCardsLayoutProps {
  children: ReactNode
}

const PowerCardsLayout: React.FC<PowerCardsLayoutProps> = ({children}) => {
  return (
    <PageWrapper>
      <StyledPageContainer maxWidth={'1023px'}>
        <CardTabs />
        {children}
      </StyledPageContainer>
    </PageWrapper>
  )
}

export default PowerCardsLayout
