import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import {Box} from '@material-ui/core'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  ${({theme}) => theme.mediaWidth.minMedium`
  background: radial-gradient(
    90% 100% at 100% 100%,
    rgba(113, 206, 255, 0.65),
    rgba(113, 206, 255, 0.15) 60%,
    rgba(113, 206, 255, 0.05) 80%,
    rgba(113, 206, 255, 0) 100%
  ),
  #171926;
  border-radius: 8px;
  padding: 40px;
`};
`

const BoldHeader1 = styled(TEXT.BoldHeader1)`
  white-space: nowrap;
  font-size: 28px !important;
  margin-right: 12px !important;
  margin-bottom: 0;

  ${({theme}) => theme.mediaWidth.minMedium`
    margin-bottom: 12px !important;
  `}

  ${({theme}) => theme.mediaWidth.minLarge`
    font-size: 40px !important;
    margin-right: 0;
  `}
`

const ResponsiveDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  ${({theme}) => theme.mediaWidth.minMedium`
    display: block;
    margin-bottom: 0;
  `}
`

const StyledBox = styled(Box)`
  ${({theme}) => theme.mediaWidth.minMedium`
    margin-bottom: 12px !important;
  `}
`

const PercentageChangeBox = styled.div<{positive: boolean}>`
  padding: 4px;
  border-radius: 5px;
  background: ${({positive}) => (positive ? 'rgba(95, 208, 171, 0.20)' : 'rgba(255, 100, 138, 0.20)')};
`

interface DataProps {
  title: string
  value: string | null
  percentageChange?: number | null
  period?: string
}

const MainOverviewCard = (props: DataProps) => {
  const {title, value, period} = props

  const percentageChange = null

  return (
    <Container>
      <ResponsiveDiv>
        <BoldHeader1>{value}</BoldHeader1>

        {!!percentageChange && (
          <StyledBox display="flex" alignItems="center">
            <PercentageChangeBox positive={percentageChange > 0}>
              <TEXT.Number color={percentageChange > 0 ? '#5FD0AB' : '#FF648A'}>
                {percentageChange > 0 && '+'}
                {percentageChange}%
              </TEXT.Number>
            </PercentageChangeBox>
            <TEXT.Supplemental color="#c4c4c4" ml={12}>
              {period}
            </TEXT.Supplemental>
          </StyledBox>
        )}
      </ResponsiveDiv>
      <TEXT.SmallBody color="#c4c4c4">{title}</TEXT.SmallBody>
    </Container>
  )
}

export default MainOverviewCard
