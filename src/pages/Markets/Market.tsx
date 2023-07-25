import {useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import styled from 'styled-components'
import {BuildInterface} from './Build'
import {useBuildActionHandlers} from '../../state/build/hooks'
import {InterfaceWrapper} from '../../components/Container/Container'

const CustomInterfaceWrapper = styled(InterfaceWrapper)`
  max-width: unset;
  align-items: center;
`
export function Market({
  match: {
    params: {marketId},
  },
}: RouteComponentProps<{marketId: string}>) {
  const {onResetBuildState} = useBuildActionHandlers()

  useEffect(() => {
    onResetBuildState()
  }, [marketId, onResetBuildState])

  return (
    <CustomInterfaceWrapper>
      <BuildInterface marketId={marketId} />
    </CustomInterfaceWrapper>
  )
}
