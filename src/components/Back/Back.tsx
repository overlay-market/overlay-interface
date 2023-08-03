import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {ArrowLeft} from 'react-feather'
import {TEXT} from '../../theme/theme'
import {Icon} from '../Icon/Icon'

const Container = styled.div<{margin?: string}>`
  display: flex;
  flex-direction: row;
  width: auto;
  cursor: pointer;
  margin-right: auto;
  margin-bottom: 0px;

  ${({theme}) => theme.mediaWidth.minSmall`
    margin-bottom: 24px; 
  `}}
`

type BackProps = {
  arrowSize: number
  fontSize: number
  fontColor?: string
}
export const Back = ({arrowSize, fontSize, fontColor}: BackProps) => {
  let history = useHistory()
  return (
    <>
      <Container onClick={() => history.goBack()}>
        <Icon size={arrowSize} color={fontColor} clickable={true} margin={'auto 3px auto auto'}>
          <ArrowLeft size={arrowSize} />
        </Icon>
        <TEXT.AdjustableSize fontSize={fontSize} color={fontColor}>
          Back
        </TEXT.AdjustableSize>
      </Container>
    </>
  )
}
