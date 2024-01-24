import styled from 'styled-components'
import {TEXT, colors, MEDIA_WIDTHS} from '../../theme/theme'
import {SelectActionButton} from '../../components/Button/Button'
import Loader from '../../components/Loaders/Loaders'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const InputAddressesBox = styled.textarea`
  min-width: calc(100vw - (100vw - 100%));
  width: 100%;
  box-sizing: border-box;
  height: 300px;
  resize: none;
  border: none;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  color: ${colors(true).dark.white};
  background-color: ${colors(true).dark.grey4};
  font-size: 14px;
  line-height: 20px;
  font-family: Inter;
  ::placeholder {
    font-size: 14px;
    color: #c4c4c4;
    line-height: 20px;
    font-family: Inter;
  }
  :focus-visible {
    outline: none;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    height: 280px;
    width: 700px !important;
    min-width: ${MEDIA_WIDTHS.minSmall}px !important;
    @media (max-width: 814px) {
      min-width: calc(100vw - (100vw - 100%)) !important;
      width: 100%;
    }
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    height: 160px;
    max-width: 814px !important;
    min-width: 814px !important;
  `}

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`

const AddWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 4px;

  ${({theme}) => theme.mediaWidth.minSmall`
    padding-bottom: 0px;
    margin-left: 0 !important;
    width: 700px !important;
    min-width: ${MEDIA_WIDTHS.minSmall}px !important;
    @media (max-width: 814px) {
      min-width: calc(100vw - (100vw - 100%)) !important;
      width: 100%;
    }
  `}
  ${({theme}) => theme.mediaWidth.minMedium`
    width: 814px !important;
    margin-left: 0;
  `}
`

const ClearAllButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  height: 33px;
  box-sizing: border-box;
  padding: 12px 0 4px 0;
  width: fit-content;
  margin-left: auto;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }

  ${({theme}) => theme.mediaWidth.minMedium`
    position: relative;
    bottom: 50px;
    right: 16px;
    margin-bottom: -33px;
    margin-left: auto;
  `}
`

const CloseIcon = styled.span`
  position: relative;
  bottom: 2px;
  font-size: 32px;
  font-weight: 100;
  color: ${colors(true).dark.blue2};
`

const ButtonsContainer = styled.div`
  display: flex;
  padding: 16px 0 80px;

  ${({theme}) => theme.mediaWidth.minLarge`
    padding: 20px 0 80px;
  `}
`

const CheckAddressesButton = styled(SelectActionButton)`
  color: ${colors(true).dark.white};
  background: #53b1f9;
  padding: 16px 36px;
  min-width: calc(100vw - (100vw - 100%));
  width: 100%;
  height: 54px;
  :hover {
    opacity: 0.9;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    min-width: 208px;
    width: 208px;
  `}
`

const CheckingButton = styled(CheckAddressesButton)`
  background: transparent;
  border: 1px solid #fff;

  ${({theme}) => theme.mediaWidth.minSmall`
    min-width: 263px;
    width: 263px;
  `}
`

const CheckingButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

interface Props {
  addresses: string
  setAddresses: Function
  checkAddressesHandle: Function
  detectedInvalidAddresses: boolean
  setDetectedInvalidAddresses: Function
  loading: boolean
}

function AddressCheckSection({addresses, setAddresses, checkAddressesHandle, detectedInvalidAddresses, setDetectedInvalidAddresses, loading}: Props) {
  return (
    <>
      <TitleContainer>
        <TEXT.BoldStandardBody color={colors(false).dark.white}>Enter addresses</TEXT.BoldStandardBody>
        <TEXT.SmallBody color={colors(true).dark.blue1}>Enter addresses to check eligibility. One address per line.</TEXT.SmallBody>
      </TitleContainer>

      <InputAddressesBox
        placeholder="Paste addresses here (ENS addresses are supported)"
        value={addresses}
        onChange={e => setAddresses(e.target.value)}
      />

      <AddWrapper>
        {detectedInvalidAddresses && <TEXT.Supplemental color={colors(false).dark.red}>One or more invalid addresses detected</TEXT.Supplemental>}

        {addresses.length > 0 && (
          <ClearAllButton
            onClick={() => {
              setAddresses('')
              setDetectedInvalidAddresses(false)
            }}
          >
            <CloseIcon>×</CloseIcon>
            <TEXT.SmallBody color={colors(true).dark.blue2}>Clear all</TEXT.SmallBody>
          </ClearAllButton>
        )}
      </AddWrapper>

      <ButtonsContainer>
        {loading ? (
          <CheckingButton>
            <CheckingButtonContent>
              <span>Checking addresses</span>
              <Loader />
            </CheckingButtonContent>
          </CheckingButton>
        ) : (
          <CheckAddressesButton
            onClick={() => {
              addresses && checkAddressesHandle()
            }}
          >
            Check addresses
          </CheckAddressesButton>
        )}
      </ButtonsContainer>
    </>
  )
}

export default AddressCheckSection
