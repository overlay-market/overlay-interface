import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components/macro'
import {TEXT} from '../../theme/theme'
import CloseIcon from '@material-ui/icons/Close'

export const BannerContainer = styled.div`
  color: ${({theme}) => theme.dark.white};
  display: flex;
  gap: 20px;
  width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(to right, #ffa5cf, #cd11ff, #7017ff);
  margin: auto auto;
  padding: 8px 32px;
  position: sticky;
  z-index: 500;
  :hover {
    opacity: 0.96;
  }
`
const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const CloseBtnWrapper = styled.div`
  flex: 0 0 20px;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

export default function ClaimBanner() {
  const [linkToClaim, setLinkToClaim] = useState(sessionStorage.getItem('claim'))

  useEffect(() => {
    if (sessionStorage.getItem('claim') === null) {
      sessionStorage.setItem('claim', 'true')
    }
    setLinkToClaim(sessionStorage.getItem('claim'))
  }, [])

  const handleClose = () => {
    sessionStorage.setItem('claim', 'false')
    setLinkToClaim(sessionStorage.getItem('claim'))
  }

  return (
    <>
      {linkToClaim === 'true' ? (
        <BannerContainer>
          <TextWrapper>
            <StyledLink to={'/faucet'}>
              <TEXT.BoldSupplemental onClick={handleClose}>
                You can now claim Arbitrum Sepolia Testnet ETH or Berachain Testnet BERA and test token OVL here. You can test the protocol, collect
                points and share 1.5% of the total supply thanks to TUNA: The Ultimate New Airdrop.
              </TEXT.BoldSupplemental>
            </StyledLink>
          </TextWrapper>

          <CloseBtnWrapper>
            <CloseIcon fontSize="small" onClick={handleClose} />
          </CloseBtnWrapper>
        </BannerContainer>
      ) : (
        <></>
      )}
    </>
  )
}
