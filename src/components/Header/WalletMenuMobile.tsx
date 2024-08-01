import {useState, useEffect} from 'react'
import styled from 'styled-components/macro'
import HeaderHamburger from '../HeaderHamburger/HeaderHamburger'

const RelativeContainer = styled.div`
  position: relative;
  display: block;

  ${({theme}) => theme.mediaWidth.minSmall`
    display: none;
  `};
`

const WalletMenuButton = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  background: ${({theme}) => theme.dark.grey4};
  position: relative;
  outline: none;
  border: 0;
  cursor: pointer;
`

export default function MobileWalletMenu({open, setOpen}: {open: boolean; setOpen: Function}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const showMenu = (val: boolean) => {
    setIsMenuOpen(val)
  }

  useEffect(() => {
    setIsMenuOpen(open)
  }, [open])

  return (
    <>
      <RelativeContainer>
        <div onClick={() => showMenu(true)}>
          <WalletMenuButton
            id="showButton"
            onClick={event => {
              event.stopPropagation()
              setOpen(!open)
            }}
          >
            <HeaderHamburger
              open={isMenuOpen}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
                setOpen(!open)
              }}
            />
          </WalletMenuButton>
        </div>
      </RelativeContainer>
    </>
  )
}
