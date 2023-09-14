import styled from 'styled-components/macro'
import {Label, Slider} from '@rebass/forms'

const SliderContainer = styled.div<{margin?: string}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: ${({margin}) => (margin ? margin : '0')};
`

const Header = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.dark.white};
`

const Value = styled.div`
  font-size: 16px;
  margin-left: auto;
  color: ${({theme}) => theme.dark.white};
`

const StyledLabel = styled(Label)`
  align-items: baseline;
  margin-bottom: 8px !important;
`

const StyledSlider = styled(Slider)`
  background-image: linear-gradient(to right, #ffffff, #ff648a);
`

type LeverageSliderProps = {
  value: number
  liquidationPrice?: any
  onChange: React.ChangeEventHandler<HTMLInputElement>
  name: string
  min: number
  max: number
  step: number
  margin?: string
}

export const LeverageSlider = ({value, liquidationPrice, onChange, name, min, max, step, margin}: LeverageSliderProps) => {
  const SLIDER_CONSTANTS = {
    backgroundColor: '#F2F2F2',
    sliderColor: '#FF648A',
  }
  return (
    <SliderContainer margin={margin}>
      <StyledLabel htmlFor={name}>
        <Header>Leverage</Header>
        <Value>{value}x</Value>
      </StyledLabel>
      <StyledSlider
        value={value}
        name={name}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        backgroundColor={'linear-gradient(to right, #FFFFFF, #FF648A)'}
        color={SLIDER_CONSTANTS.sliderColor}
      />
    </SliderContainer>
  )
}
