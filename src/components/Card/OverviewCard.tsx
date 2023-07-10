import styled from 'styled-components'
import {TEXT} from '../../theme/theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  background: #171926;
  border-radius: 8px;
  padding: 20px 24px;
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
  isOver1000OpenPositions?: boolean
}

const OverviewCard = (props: DataProps) => {
  const {title, value, percentageChange, isOver1000OpenPositions} = props

  return (
    <Container>
      {!value ? (
        <TEXT.SmallBody color="#c4c4c4" style={{whiteSpace: 'nowrap'}} mb={12}>
          No data
        </TEXT.SmallBody>
      ) : (
        <TEXT.BoldHeader1 style={{whiteSpace: 'nowrap'}} mb={12}>
          {value}
        </TEXT.BoldHeader1>
      )}
      {!!percentageChange && (
        <PercentageChangeBox positive={percentageChange > 0}>
          <TEXT.Number color={percentageChange > 0 ? '#5FD0AB' : '#FF648A'}>
            {percentageChange > 0 && '+'}
            {percentageChange}%
          </TEXT.Number>
        </PercentageChangeBox>
      )}
      {/* {isOver1000OpenPositions && (
        <div style={{position: 'absolute', marginTop: '47px'}}>
          <TEXT.Supplemental style={{whiteSpace: 'nowrap'}} color={colors(true).dark.red}>
            Open Positions {'>'} 1000
          </TEXT.Supplemental>
          <TEXT.Supplemental style={{whiteSpace: 'nowrap'}} color={colors(true).dark.red}>
            May output wrong value
          </TEXT.Supplemental>
        </div> */}
      <TEXT.SmallBody color="#c4c4c4" mt={12}>
        {title}
      </TEXT.SmallBody>
    </Container>
  )
}

export default OverviewCard
