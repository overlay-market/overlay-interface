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

const getPeriodKey = (date: moment.Moment, selectedInterval: IntervalType): string => {
  switch (selectedInterval) {
    case '1D':
      let hour = Math.floor(date.hour())
      return `${date.format('YYYY-MM-DD')}-${hour}`
    case '1W':
      // day
      return `${date.format('YYYY-MM-DD')}`
    case '6M':
      // week
      return `${date.year()}-${date.week()}`
    case '1Y':
      // month
      return date.format('YYYY-MM')
    default:
      // day
      return date.format('YYYY-MM-DD')
  }
}

const incrementDate = (date: moment.Moment, selectedInterval: IntervalType): void => {
  const intervalToAddMap: Record<IntervalType, moment.unitOfTime.DurationConstructor> = {
    '1D': 'hour',
    '1W': 'day',
    '1M': 'day',
    '6M': 'week',
    '1Y': 'month',
  }

  const intervalToAdd = intervalToAddMap[selectedInterval]
  date.add(1, intervalToAdd)
}

const getFilterStartDate = (selectedInterval: IntervalType) => {
  const now = moment()
  const startDate = now.clone()

  switch (selectedInterval) {
    case '1D':
      startDate.subtract(24, 'hours')
      break
    case '1W':
      startDate.subtract(1, 'week')
      break
    case '6M':
      startDate.subtract(6, 'months')
      break
    case '1Y':
      startDate.subtract(1, 'year')
      break
    default:
      startDate.subtract(1, 'month')
  }

  return startDate
}

const OverviewChart = () => {
  const [selectedInterval, setSelectedInterval] = useState<IntervalType>('1M')
  const {account} = useActiveWeb3React()

  // TODO: separate hook
  const {positionsTableData: unwinds} = usePositionsTableData(account, Infinity, 0, PositionStatus.Closed)
  const {positionsTableData: liquidates} = usePositionsTableData(account, Infinity, 0, PositionStatus.Liquidated)

  const chartData = useMemo(() => {
    const unwindRows = unwinds?.account?.unwinds ?? []
    const liquidateRows = liquidates?.account?.liquidates ?? []

    const formattedUnwindRows = unwindRows.map((row: {timestamp: string; pnl: string}) => ({
      ...row,
      type: 'unwind',
    }))

    const formattedLiquidateRows = liquidateRows.map((row: {timestamp: string; size: string}) => ({
      ...row,
      type: 'liquidate',
    }))

    const mergedRows = [...formattedUnwindRows, ...formattedLiquidateRows].sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))

    const dataByPeriod: {[key: string]: {realizedPnl: number; date: Date}} = {}

    if (mergedRows.length) {
      let cumulativeRealizedPnl = 0
      let currentDate = moment.unix(parseInt(mergedRows[0].timestamp)) // minDate

      mergedRows.forEach((row: {timestamp: string; pnl?: string; size?: string; type: string}) => {
        const date = moment.unix(parseInt(row.timestamp))

        // Add missing dates
        while (currentDate.isBefore(date)) {
          let periodKey: string = getPeriodKey(currentDate, selectedInterval)

          if (!dataByPeriod[periodKey]) {
            dataByPeriod[periodKey] = {
              date: currentDate.toDate(),
              realizedPnl: cumulativeRealizedPnl,
            }
          }

          incrementDate(currentDate, selectedInterval)
        }

        let periodKey: string = getPeriodKey(date, selectedInterval)

        if (!dataByPeriod[periodKey]) {
          dataByPeriod[periodKey] = {
            date: date.toDate(),
            realizedPnl: cumulativeRealizedPnl,
          }
        }

        if (row.type === 'unwind') {
          cumulativeRealizedPnl += parseInt(row?.pnl ?? '0') / 10 ** 18
        } else if (row.type === 'liquidate') {
          cumulativeRealizedPnl -= parseInt(row?.size ?? '0') / 10 ** 18
        }

        dataByPeriod[periodKey].realizedPnl = cumulativeRealizedPnl
      })

      // Fill up to current date
      const now = moment()
      while (currentDate.isBefore(now)) {
        let periodKey: string = getPeriodKey(currentDate, selectedInterval)

        if (!dataByPeriod[periodKey]) {
          dataByPeriod[periodKey] = {
            date: currentDate.toDate(),
            realizedPnl: cumulativeRealizedPnl,
          }
        }

        incrementDate(currentDate, selectedInterval)
      }
    }

    let data = Object.values(dataByPeriod).sort((a, b) => a.date.getTime() - b.date.getTime())

    // Filter data for selected interval
    const startDate = getFilterStartDate(selectedInterval)
    data = data.filter(item => moment(item.date).isSameOrAfter(startDate))

    console.log(data)

    return data
  }, [unwinds, liquidates, selectedInterval])

  const chartDataFormatted = chartData.map((data: any) => {
    return {
      ...data,
      date: moment(data.date).format('DD MMM YYYY HH:mm'),
    }
  })

  const handleSelectInterval = (interval: IntervalType) => {
    setSelectedInterval(interval)
  }

  const customizedXAxisTick = ({x = 0, y = 0, payload = {value: ''}}: TickProps): JSX.Element => {
    let label
    switch (selectedInterval) {
      case '1D':
        // hour
        label = moment(payload.value).format('HH:00')
        break
      case '1W':
        // day
        label = moment(payload.value).format('D MMM YY')
        break
      case '6M':
        // week
        label = moment(payload.value).format('MMM YY')
        break
      case '1Y':
        // month
        label = moment(payload.value).format('MMM YY')
        break
      default:
        // day
        label = moment(payload.value).format('D MMM')
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
        case '1D':
          rangeLabel = date.format('D MMM YY HH:00')
          break
        case '1W':
          rangeLabel = date.format('D MMM YY')
          break
        case '6M':
          rangeLabel = date.format('D MMM YY')
          break
        case '1Y':
          rangeLabel = date.format('MMM YY')
          break
        default:
          rangeLabel = date.format('D MMM YY')
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
