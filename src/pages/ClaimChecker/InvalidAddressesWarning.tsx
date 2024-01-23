import styled from 'styled-components'
import {TEXT, colors, MEDIA_WIDTHS} from '../../theme/theme'
import CloseIcon from '@material-ui/icons/Close'

const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 16px 0px;
  padding: 16px;
  background: #1b2131;
  border: 1px solid rgba(255, 100, 138, 0.5);
  box-shadow: 0 0 12px 2px rgba(255, 100, 138, 0.25);
  border-radius: 8px;

  min-width: calc(100vw - (100vw - 100%));
  width: 100%;
  box-sizing: border-box;
  ${({theme}) => theme.mediaWidth.minSmall`
    width: 700px !important;
    min-width: ${MEDIA_WIDTHS.minSmall}px !important;
    @media (max-width: 814px) {
      min-width: calc(100vw - (100vw - 100%)) !important;
      width: 100%;
    }
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    max-width: 814px !important;
    min-width: 814px !important;
  `}
`

const StyledCloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  color: ${colors(false).dark.red};
  cursor: pointer;
`

const InvalidAddressesContainer = styled.div`
  font-size: 12px;
  color: ${colors(false).dark.white};
  line-height: 20px;
  padding-top: 10px;
`

interface Props {
  invalidAddresses: string[]
  setIsOpenedWarning: Function
}

function InvalidAddressesWarning({invalidAddresses, setIsOpenedWarning}: Props) {
  return (
    <>
      <WarningContainer>
        <TEXT.BoldSmallBody color={colors(false).dark.red}>One or more invalid addresses detected</TEXT.BoldSmallBody>

        <StyledCloseButton onClick={() => setIsOpenedWarning(false)}>
          <CloseIcon fontSize="small" />
        </StyledCloseButton>

        <InvalidAddressesContainer>
          {invalidAddresses.map(el => {
            return <div>{el}</div>
          })}
        </InvalidAddressesContainer>
      </WarningContainer>
    </>
  )
}

export default InvalidAddressesWarning
