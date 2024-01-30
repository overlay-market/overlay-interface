import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {Box} from '@material-ui/core'
import React from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const BoldHeader1 = styled(TEXT.BoldHeader1)`
  font-size: 16px !important;

  ${({theme}) => theme.mediaWidth.minMedium`
    font-size: 20px !important;
  `}
`

interface DataProps {
  title: string
  value: string | number | null
  valueType: string | null
  percentageChange?: number | null
  period?: string
  isOver1000OpenPositions?: boolean
  valueTypeLink?: string | null
}

const OverviewCard = (props: DataProps) => {
  const {title, value, valueType, percentageChange, period, isOver1000OpenPositions, valueTypeLink} = props

  return (
    <Container>
      <TEXT.SmallBody fontSize={14} color="#c4c4c4">
        {title}
      </TEXT.SmallBody>
      {isOver1000OpenPositions && (
        <Box mt="4px">
          <TEXT.Supplemental style={{whiteSpace: 'nowrap'}} fontSize={10} color={colors(true).dark.red}>
            Open Positions {'>'} 1000
          </TEXT.Supplemental>
          <TEXT.Supplemental style={{whiteSpace: 'nowrap'}} fontSize={10} color={colors(true).dark.red}>
            May output wrong value
          </TEXT.Supplemental>
        </Box>
      )}
      {!value ? (
        <TEXT.SmallBody color="#c4c4c4" style={{whiteSpace: 'nowrap'}} mb={12}>
          No data
        </TEXT.SmallBody>
      ) : (
        <BoldHeader1 style={{whiteSpace: 'nowrap', marginTop: '15px'}} mb={12}>
          {value}
        </BoldHeader1>
      )}
      <Box display="flex" alignItems="center">
        {!valueType ? (
          <Box mt={'18px'}></Box>
        ) : (
          <TEXT.SmallBody fontSize={14} color="#c4c4c4">
            <a href={valueTypeLink ?? undefined} style={valueTypeLink ? {color: colors(false).dark.blue2} : {}}>
              {valueType}
            </a>
          </TEXT.SmallBody>
        )}
        <Box display="flex" alignItems="center" marginLeft="auto">
          {value && !!percentageChange && (
            <PercentageChangeBox positive={percentageChange > 0}>
              <TEXT.Number color={percentageChange > 0 ? '#5FD0AB' : '#FF648A'}>
                {percentageChange > 0 && '+'}
                {percentageChange}%
              </TEXT.Number>
            </PercentageChangeBox>
          )}
          {value && !!percentageChange && (
            <TEXT.Supplemental color="#c4c4c4" ml={1}>
              {period}
            </TEXT.Supplemental>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default OverviewCard
