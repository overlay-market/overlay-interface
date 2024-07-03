import styled from 'styled-components/macro'
import {Button as RebassButton, ButtonProps as ButtonPropsOriginal} from 'rebass/styled-components'
import {colors} from '../../theme/theme'

type ButtonProps = Omit<ButtonPropsOriginal, 'css'>

const BaseTemplateButton = styled(RebassButton)<
  {
    padding?: string
    width?: string
    borderRadius?: string
    border?: string
    isDisabled?: boolean
    active?: boolean
    color?: any
  } & ButtonProps
>`
  width: ${({width}) => (width ? width : '100%')};
  color: ${({color}) => (color ? color : '#f2f2f2')};
  padding: ${({padding}) => (padding ? padding : '16px')};
  border: ${({border}) => border ?? border};
  outline: none;
  cursor: pointer;
  font-weight: 700;
  text-align: center;
  transition: transform 450ms ease;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`

// border: ${({ active }) => ( active ? 'none !important' : '' )};
export const SelectActionButton = styled(BaseTemplateButton)`
  color: ${({isDisabled}) => (isDisabled ? '#63656D !important' : '')};
  background: ${({isDisabled}) => (isDisabled ? '#D0D0D2 !important' : '')};
  height: auto;
  padding: 16px;
  border-radius: 8px;
`

export const TriggerActionButton = styled(SelectActionButton)`
  color: ${({theme, active}) => (active ? theme.dark.white : '#71d2ff')};
  background: ${({active}) => (active ? '#12B4FF' : 'transparent')};
  border: 1px solid transparent;

  :hover {
    border: 1px solid ${({isDisabled}) => (isDisabled ? '#FF648A' : '#71d2ff')};
    box-shadow: ${({isDisabled}) => (isDisabled ? '0 0px 7px #FF648A' : '0 0px 5px')};
  }
`

export const PendingActionButton = styled(SelectActionButton)`
  color: #0b0f1c;
  border: none;
  background: linear-gradient(91.32deg, #10dcb1 0%, #33e0eb 26.86%, #12b4ff 52.65%, #5295f9 77.89%, #9874ff 102.61%);
`

export const ApproveTransactionButton = ({attemptingTransaction, onClick}: {attemptingTransaction: boolean; onClick: () => void}) => (
  <>
    {attemptingTransaction ? (
      <PendingActionButton>Pending Confirmation...</PendingActionButton>
    ) : (
      <PendingActionButton onClick={onClick}>Approve OV</PendingActionButton>
    )}
  </>
)

export const TransactionSettingsButton = styled(BaseTemplateButton)`
  background: ${({active, isDisabled}) => (active ? '#12B4FF' : isDisabled ? 'gray' : 'transparent')};
  color: ${({isDisabled}) => (isDisabled ? '#0B0F1C' : 'white')};
  cursor: ${({isDisabled}) => (isDisabled ? 'none' : 'cursor')};
  height: 40px;
`

export const TransparentButton = styled(BaseTemplateButton)<{width?: string; underline?: boolean}>`
  width: ${({width}) => (width ? width : 'auto')};
  color: ${({color}) => (color ? color : 'white')};
  padding: 0 8px;
  cursor: pointer;
  font-size: 12px;
  background: transparent;
`

export const TransparentUnderlineButton = styled(TransparentButton)`
  text-decoration: underline;
  border: none;
`

export const MenuButton = styled(BaseTemplateButton)`
  background: transparent;
  display: flex;
  font-size: 12px;
`

// @TO-DO: Refactor Green/Red Buttons from TermsOfServiceModal
export const SolidColorButton = styled(BaseTemplateButton)``

export const LoadMoreButton = styled(RebassButton)<
  {
    isDisabled?: boolean
  } & ButtonProps
>`
  width: 135px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: ${({isDisabled}) => (isDisabled ? `${colors(true).dark.grey3} !important` : `${colors(true).dark.blue2}`)};
  background: ${({isDisabled}) => (isDisabled ? `rgba(46, 51, 67, 0.2) !important` : `${colors(true).dark.grey4}`)};
  padding: 12px 20px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  font-family: Inter;
`

export const ColorButton = styled(BaseTemplateButton)<{width?: string; height?: string; bgColor?: string; color?: string; disabled?: boolean}>`
  width: ${({width}) => (width ? width : 'auto')};
  color: ${({color}) => (color ? color : 'white')};
  background: ${({bgColor}) => (bgColor ? bgColor : '#53b1f9')};
  opacity: ${({disabled}) => (disabled ? '0.5' : '')};
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  height: ${({height}) => (height ? height : '42px')};
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  :hover {
    opacity: ${({disabled}) => (disabled ? '0.5' : '0.9')};
  }
`
