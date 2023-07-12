import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import {Box, Button, ButtonGroup} from '@material-ui/core'
import {useMemo, useState} from 'react'
import {usePositionsTableData} from '../../state/build/hooks'
import {useActiveWeb3React} from '../../hooks/web3'
import {PositionStatus} from '../../pages/Positions/PositionsPage'
import moment from 'moment'

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

type IntervalType = '1D' | '1W' | '1M' | '6M' | '1Y'

const intervals: IntervalType[] = ['1D', '1W', '1M', '6M', '1Y']

const OverviewChart = (props: OverviewChartProps) => {
  const [selectedInterval, setSelectedInterval] = useState<IntervalType>('1M')
  const {account} = useActiveWeb3React()

  // TODO: separate hook
  const {positionsTableData: realizedPnlData} = usePositionsTableData(account, Infinity, 0, PositionStatus.Closed)

  const chartData = useMemo(() => {
    if (!realizedPnlData) return []

    const rows = realizedPnlData.account?.unwinds ?? []

    const dataByPeriod: {[key: string]: {realizedPnl: number; date: Date}} = {}

    rows.forEach((unwind: {timestamp: string; pnl: string}) => {
      console.log(unwind.timestamp)
      const date = moment.unix(parseInt(unwind.timestamp))
      let periodKey: string

      switch (selectedInterval) {
        case '1D':
          // For daily grouping, the period key is the day, month and year
          periodKey = date.format('YYYY-MM-DD')
          break
        case '1W':
          // For weekly grouping, calculate period key as the year and the week of the year
          periodKey = `${date.year()}-${date.week()}`
          break
        case '6M':
          // For semiannual grouping, calculate period key as "1" or "2" plus the year
          periodKey = `${Math.floor(date.month() / 6) + 1}-${date.year()}`
          break
        case '1Y':
          // For annual grouping, the period key is the year
          periodKey = date.format('YYYY')
          break
        default:
          // For monthly grouping, the period key is the month and year
          periodKey = date.format('YYYY-MM')
          break
      }

      if (!dataByPeriod[periodKey]) {
        dataByPeriod[periodKey] = {
          date: date.toDate(),
          realizedPnl: 0,
        }
      }

      dataByPeriod[periodKey].realizedPnl += parseInt(unwind.pnl) / 10 ** 18
    })

    const data = Object.values(dataByPeriod).sort((a, b) => a.date.getTime() - b.date.getTime())

    return data
  }, [realizedPnlData, selectedInterval])

  const chartDataFormatted = chartData.map((data: any) => {
    return {
      ...data,
      date: new Date(data.date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}),
    }
  })

  const handleSelectInterval = (interval: IntervalType) => {
    setSelectedInterval(interval)
  }

  const customizedXAxisTick = ({x = 0, y = 0, payload = {value: ''}}: TickProps): JSX.Element => {
    console.log(payload.value)
    let label
    switch (selectedInterval) {
      case '1D':
        label = moment(payload.value).format('MMM D, YYYY')
        break
      case '1W':
        label = `Week ${moment(payload.value).week()}, ${moment(payload.value).year()}`
        break
      case '1M':
        label = moment(payload.value).format('MMM YYYY')
        break
      case '6M':
        label = `H${Math.floor(moment(payload.value).month() / 6) + 1} ${moment(payload.value).year()}`
        break
      case '1Y':
        label = moment(payload.value).format('YYYY')
        break
      default:
        label = payload.value
    }
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={25} textAnchor="end" fill="#a8a6a6" fontSize={12} fontFamily="Inter">
          {label}
        </text>
      </g>
    )
  }

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
          data={chartDataFormatted}
          margin={{
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dy={4} dataKey="date" axisLine={false} tickLine={false} tick={customizedXAxisTick} />
          <YAxis axisLine={false} tickLine={false} tick={customizedYAxisTick} />
          <Tooltip />
          <Line type="linear" dataKey="realizedPnl" stroke="#71ceff" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default OverviewChart
