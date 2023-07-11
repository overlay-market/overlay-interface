import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import {Box, Button, ButtonGroup} from '@material-ui/core'
import {useState} from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 275px;
  box-sizing: border-box;
  width: 100%;
  background: #171926;
  border-radius: 8px;
  padding: 24px 16px;
`

const LegendLine = styled.div`
  background: #71ceff;
  width: 15px;
  height: 2px;
  margin-right: 8px;
`

interface StyledButtonProps {
  selected: boolean
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border: none !important;
  min-width: 0 !important;
  font-size: 12px !important;
  font-family: Inter !important;
  padding: 0 10px !important;
  color: ${({selected}) => (selected ? '#71ceff !important' : '#a8a6a6 !important')};
  border-radius: 8px !important;
`

interface OverviewChartProps {}

interface TickProps {
  x: number
  y: number
  payload: {
    value: string
  }
}

const data = [
  {
    time: '2023-07-01T00:00:00Z',
    realizedPnL: 200,
  },
  {
    time: '2023-07-02T00:00:00Z',
    realizedPnL: 250,
  },
  {
    time: '2023-07-03T00:00:00Z',
    realizedPnL: 220,
  },
  {
    time: '2023-07-04T00:00:00Z',
    realizedPnL: 275,
  },
  {
    time: '2023-07-05T00:00:00Z',
    realizedPnL: 300,
  },
  {
    time: '2023-07-06T00:00:00Z',
    realizedPnL: 280,
  },
  {
    time: '2023-07-07T00:00:00Z',
    realizedPnL: 320,
  },
  {
    time: '2023-07-08T00:00:00Z',
    realizedPnL: 330,
  },
  {
    time: '2023-07-09T00:00:00Z',
    realizedPnL: 350,
  },
  {
    time: '2023-07-10T00:00:00Z',
    realizedPnL: 400,
  },
]

const intervals = ['1H', '1D', '1W', '1M', '6M', '1Y']

const OverviewChart = (props: OverviewChartProps) => {
  const {} = props
  const [selectedInterval, setSelectedInterval] = useState<string>('1M')

  const handleSelectInterval = (interval: string) => {
    setSelectedInterval(interval)
  }

  const customizedXAxisTick = ({x = 0, y = 0, payload = {value: ''}}: TickProps): JSX.Element => (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={25} textAnchor="end" fill="#a8a6a6" fontSize={12} fontFamily="Inter">
        {payload.value}
      </text>
    </g>
  )

  const customizedYAxisTick = ({x = 0, y = 0, payload = {value: ''}}: TickProps): JSX.Element => (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={5} textAnchor="end" fill="#a8a6a6" fontSize={12} fontFamily="Inter">
        {payload.value}
      </text>
    </g>
  )

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb="16px">
        <ButtonGroup variant="text">
          {intervals.map((interval, id) => (
            <StyledButton key={id} selected={selectedInterval === interval} onClick={() => handleSelectInterval(interval)}>
              {interval}
            </StyledButton>
          ))}
        </ButtonGroup>
        <Box display="flex" alignItems="center">
          <LegendLine />
          <TEXT.Supplemental color="#c4c4c4">Realized PnL</TEXT.Supplemental>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            left: -20,
            bottom: 5,
          }}
        >
          <XAxis dy={4} dataKey="time" axisLine={false} tickLine={false} tick={customizedXAxisTick} />
          <YAxis axisLine={false} tickLine={false} tick={customizedYAxisTick} />
          <Tooltip />
          <Line type="linear" dataKey="realizedPnL" stroke="#71ceff" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default OverviewChart
