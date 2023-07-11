import styled from 'styled-components'
import {TEXT} from '../../theme/theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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
`

const PercentageChangeBox = styled.div<{positive: boolean}>`
  padding: 4px;
  border-radius: 5px;
  background: ${({positive}) => (positive ? 'rgba(95, 208, 171, 0.20)' : 'rgba(255, 100, 138, 0.20)')};
`

interface DataProps {
  title: string
  value: string | null
  percentageChange?: number
}

const MainOverviewCard = (props: DataProps) => {
  const {title, value, percentageChange} = props

  return (
    <Container>
      <TEXT.BoldHeader1 fontSize={40} style={{whiteSpace: 'nowrap'}} mb={12}>
        {value}
      </TEXT.BoldHeader1>
      {!!percentageChange && (
        <PercentageChangeBox positive={percentageChange > 0}>
          <TEXT.Number color={percentageChange > 0 ? '#5FD0AB' : '#FF648A'}>
            {percentageChange > 0 && '+'}
            {percentageChange}%
          </TEXT.Number>
        </PercentageChangeBox>
      )}
      <TEXT.SmallBody color="#c4c4c4" mt={12}>
        {title}
      </TEXT.SmallBody>
    </Container>
  )
}

export default MainOverviewCard
