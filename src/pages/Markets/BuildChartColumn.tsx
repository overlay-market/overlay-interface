import * as React from 'react'
import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {TEXT, colors} from '../../theme/theme'
import {ProgressBar} from '../../components/ProgressBar/ProgressBar'

const Container = styled.div`
  width: 1000px;
  padding-right: 16px;
  max-height: 420px;
`

const MarketDetailsContainer = styled.div`
  border-top: 1px solid ${({theme}) => theme.dark.grey2};
  padding: 16px 16px;
  display: flex;
  justify-content: space-between;
`

type BuildChartProps = {
  children?: React.ReactNode
}

export const BuildChartColumn = ({children}: BuildChartProps) => {
  return (
    <Container>
      <MarketDetailsContainer>
        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
          <TEXT.BoldNumber>Ξ62.8403</TEXT.BoldNumber>
          <TEXT.SmallBody color={colors(false).dark.green}>+0.29%</TEXT.SmallBody>
          <TEXT.SmallBody>24h</TEXT.SmallBody>
        </div>

        <div style={{display: 'flex', gap: '28px'}}>
          <FlexRow style={{gap: '16px', justifyContent: 'flex-end'}}>
            <TEXT.SmallBody>Funding</TEXT.SmallBody>
            <TEXT.BoldNumber color={colors(false).dark.red}>-0.07%</TEXT.BoldNumber>
          </FlexRow>

          <div style={{display: 'flex', gap: '16px', justifyContent: 'flex-end'}}>
            <TEXT.SmallBody style={{whiteSpace: 'nowrap'}}>OI Balance</TEXT.SmallBody>
            <FlexColumn style={{maxWidth: 120}}>
              <FlexRow>
                <TEXT.BoldNumber mr="auto" color="#FF648A">
                  59%
                </TEXT.BoldNumber>
                <TEXT.BoldNumber color="#5FD0AB">41%</TEXT.BoldNumber>
              </FlexRow>
              <ProgressBar reverse={false} split={false} max={100} value={41} width={'100%'} margin={'0'} color={'#FF648A'} />
            </FlexColumn>
          </div>
        </div>
      </MarketDetailsContainer>
      {children}
    </Container>
  )
}
