import React from 'react'
import styled from 'styled-components/macro'
import {TEXT} from '../../theme/theme'

const StyledInput = styled.input<{
  error?: boolean
  fontSize?: string
  fontWeight?: string
  align?: string
  height?: string
  padding?: string
}>`
  color: ${({error, theme}) => (error ? theme.dark.red : theme.dark.white)};
  width: 100%;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: ${({fontSize}) => fontSize ?? '16px'};
  font-weight: ${({fontWeight}) => fontWeight ?? '400'};
  text-align: ${({align}) => align && align};
  height: ${({height}) => (height ? height : 'auto')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: ${({padding}) => padding ?? '0px 8px'};
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    opacity: 0.8;
  }
`

export const Input = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  prependSymbol,
  height,
  padding,
  ...rest
}: {
  value: string | number | undefined
  onUserInput: (input: string) => void
  error?: boolean
  fontSize?: string
  fontWeight?: string
  align?: 'right' | 'left'
  height?: string
  padding?: string
  prependSymbol?: string | undefined
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const enforcer = (nextUserInput: string) => {
    onUserInput(nextUserInput)
  }

  return (
    <StyledInput
      {...rest}
      value={value}
      onChange={event => {
        enforcer(event.target.value)
      }}
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      // text-specific options
      type="text"
      placeholder={placeholder || ''}
      height={height}
      padding={padding}
    />
  )
})
