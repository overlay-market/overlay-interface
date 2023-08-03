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

const MarketPriceContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const MarketOIContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

type BuildChartProps = {
  children?: React.ReactNode
}

export const BuildChartColumn = ({children}: BuildChartProps) => {
  return (
    <Container>
      <MarketDetailsContainer>
        <MarketPriceContainer>
          <TEXT.BoldNumber>Ξ62.8403</TEXT.BoldNumber>
          <TEXT.SmallBody color={colors(false).dark.green}>+0.29%</TEXT.SmallBody>
          <TEXT.SmallBody>24h</TEXT.SmallBody>
        </MarketPriceContainer>

        <FlexRow style={{gap: '28px'}}>
          <FlexRow style={{gap: '16px', justifyContent: 'flex-end', alignItems: 'center'}}>
            <TEXT.SmallBody>Funding</TEXT.SmallBody>
            <TEXT.BoldNumber color={colors(false).dark.red}>-0.07%</TEXT.BoldNumber>
          </FlexRow>

          <MarketOIContainer>
            <TEXT.SmallBody style={{whiteSpace: 'nowrap'}}>OI Balance</TEXT.SmallBody>
            <FlexColumn width="100px">
              <FlexRow justify="space-between">
                <TEXT.BoldNumber color="#FF648A">59%</TEXT.BoldNumber>
                <TEXT.BoldNumber color="#5FD0AB">41%</TEXT.BoldNumber>
              </FlexRow>
              <ProgressBar reverse={false} split={false} max={100} value={41} width={'100%'} margin={'0'} color={'#FF648A'} />
            </FlexColumn>
          </MarketOIContainer>
        </FlexRow>
      </MarketDetailsContainer>
      {children}
    </Container>
  )
}
