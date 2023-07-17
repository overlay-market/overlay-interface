import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import {Box, Button, ButtonGroup} from '@material-ui/core'
import {useMemo, useState} from 'react'
import {usePositionsTableData} from '../../state/build/hooks'
import {useActiveWeb3React} from '../../hooks/web3'
import {PositionStatus} from '../../pages/Positions/PositionsPage'
import moment from 'moment'
import {checkIsNegative} from '../../utils/checkIsNegative'

const Container = styled.div`
  display: flex;
  min-height: 275px;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  background: #171926;
  border-radius: 8px;
  padding: 24px 16px;
`

const StyledButtonGroup = styled(ButtonGroup)`
  width: 100%;
  justify-content: space-between !important;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    justify-content: initial !important;
  `}
`

const LargeLegendBox = styled(Box)`
  display: none !important;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    display: flex !important;
  `}
`

const SmallLegendBox = styled(Box)`
  margin-top: 16px;

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    display: none !important;
  `}
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

const CustomTooltip = styled.div`
  border-radius: 8px;
  background: rgba(32, 36, 49, 0.8);
  padding: 8px;
`

interface TickProps {
  x: number
  y: number
  payload: {
    value: string
  }
}

type IntervalType = '1D' | '1W' | '1M' | '6M' | '1Y'

const intervals: IntervalType[] = ['1D', '1W', '1M', '6M', '1Y']

const OverviewChart = () => {
  const [selectedInterval, setSelectedInterval] = useState<IntervalType>('1M')
  const {account} = useActiveWeb3React()

  // TODO: separate hook
  const {positionsTableData: unwinds} = usePositionsTableData(account, Infinity, 0, PositionStatus.Closed)
  const {positionsTableData: liquidates} = usePositionsTableData(account, Infinity, 0, PositionStatus.Liquidated)

  const chartData = useMemo(() => {
    const unwindRows = unwinds?.account?.unwinds ?? []
    const liquidateRows = liquidates?.account?.liquidates ?? []

    const dataByPeriod: {[key: string]: {realizedPnl: number; date: Date}} = {}

    unwindRows.forEach((unwind: {timestamp: string; pnl: string}) => {
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

    liquidateRows.forEach((liquidate: {timestamp: string; size: string}) => {
      const date = moment.unix(parseInt(liquidate.timestamp))
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

      dataByPeriod[periodKey].realizedPnl -= parseInt(liquidate.size) / 10 ** 18
    })

    const data = Object.values(dataByPeriod).sort((a, b) => a.date.getTime() - b.date.getTime())

    return data
  }, [unwinds, liquidates, selectedInterval])

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
    let label
    switch (selectedInterval) {
      case '1D':
        label = moment(payload.value).format('D MMM YY')
        break
      case '1W':
        label = moment(payload.value).format('D MMM YY')
        break
      case '1M':
        label = moment(payload.value).format('MMM YY')
        break
      case '6M':
        label = moment(payload.value).month() < 6 ? `Jan ${moment(payload.value).format('YY')}` : `Jul ${moment(payload.value).format('YY')}`
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

  const customTooltip = ({active, payload, label}: any) => {
    if (active && payload && payload.length) {
      let rangeLabel
      const date = moment(label)

      switch (selectedInterval) {
        case '1M':
          rangeLabel = date.format('MMM YY')
          break
        case '6M':
          if (date.month() < 6) {
            rangeLabel = `Jan - Jun ${date.format('YY')}`
          } else {
            rangeLabel = `Jul - Dec ${date.format('YY')}`
          }
          break
        case '1Y':
          rangeLabel = date.format('YYYY')
          break
        default:
          rangeLabel = label
      }

      return (
        <CustomTooltip>
          <TEXT.BoldSupplemental color={colors(false).dark.white}>{rangeLabel}</TEXT.BoldSupplemental>
          <Box display="flex" alignItems="center">
            <TEXT.BoldSupplemental color={colors(false).dark.white}>Realized PnL: </TEXT.BoldSupplemental>
            <TEXT.BoldSupplemental color={checkIsNegative(Number.parseFloat(payload[0].value)) ? '#FF648A' : '#5FD0AB'} ml={1}>
              {+payload[0].value < 1 ? +payload[0].value.toFixed(6) : +payload[0].value.toFixed(2)}
            </TEXT.BoldSupplemental>
          </Box>
        </CustomTooltip>
      )
    }

    return null
  }

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb="16px">
        <StyledButtonGroup variant="text">
          {intervals.map((interval, id) => (
            <StyledButton key={id} selected={selectedInterval === interval} onClick={() => handleSelectInterval(interval)}>
              {interval}
            </StyledButton>
          ))}
        </StyledButtonGroup>
        <LargeLegendBox display="flex" alignItems="center">
          <LegendLine />
          <TEXT.Supplemental color="#c4c4c4" style={{whiteSpace: 'nowrap'}}>
            Realized PnL
          </TEXT.Supplemental>
        </LargeLegendBox>
      </Box>
      <ResponsiveContainer width="100%" height="100%">
        {chartDataFormatted.length === 0 ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <TEXT.SmallBody color="#c4c4c4">No data to display</TEXT.SmallBody>
          </Box>
        ) : (
          <LineChart
            data={chartDataFormatted}
            margin={{
              bottom: 5,
            }}
          >
            <XAxis dy={4} dataKey="date" axisLine={false} tickLine={false} tick={customizedXAxisTick} />
            <YAxis axisLine={false} tickLine={false} tick={customizedYAxisTick} />
            <Tooltip content={customTooltip} />
            <Line type="linear" dataKey="realizedPnl" stroke="#71ceff" dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
      <SmallLegendBox display="flex" alignItems="center">
        <LegendLine />
        <TEXT.Supplemental color="#c4c4c4" style={{whiteSpace: 'nowrap'}}>
          Realized PnL
        </TEXT.Supplemental>
      </SmallLegendBox>
    </Container>
  )
}

export default OverviewChart
