// @ts-nocheck
import styled from 'styled-components'
import {createChart, ColorType} from 'lightweight-charts'
import {useEffect, useRef} from 'react'

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 1000px;
  background: red;
`

const BuildChart = (props: any) => {
  const {
    data,
    colors: {
      backgroundColor = 'white',
      lineColor = '#2962FF',
      textColor = 'black',
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = {},
  } = props

  const chartContainerRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({width: chartContainerRef.current.clientWidth})
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {type: ColorType.Solid, color: backgroundColor},
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addAreaSeries({lineColor, topColor: areaTopColor, bottomColor: areaBottomColor})
    newSeries.setData(data)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor])

  return (
    <Container>
      asdas
      <div ref={chartContainerRef} />
    </Container>
  )
}

// export function App(props) {
//   return (
//     <Container>
//       <ChartComponent {...props} data={initialData}></ChartComponent>
//     </Container>
//   )
// }

// const BuildChart = () => {
//   return (
//     <Container>
//       <div id="firstContainer"></div>
//       Chart
//     </Container>
//   )
// }

export default BuildChart
