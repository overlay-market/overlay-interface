import {ReactNode} from 'react'
import {Link} from 'react-router-dom'

interface PowerCardsLayoutProps {
  children: ReactNode
}

const PowerCardsLayout: React.FC<PowerCardsLayoutProps> = ({children}) => {
  return (
    <div>
      <Link to={'/power-cards/all-cards'}>All cards</Link>
      <Link to={'/power-cards/my-cards'}>My cards</Link>
      <Link to={'/power-cards/burnt-cards'}>Burnt cards</Link>
      {children}
    </div>
  )
}

export default PowerCardsLayout
