import {useCallback} from 'react'
import {AppState} from '../state'
import {useAppSelector, useAppDispatch} from '../hooks'
import {buildPosition, unwindPosition, closePositions, resetPositionsState} from './actions'

export function usePositionsState(): AppState['positions'] {
  return useAppSelector(state => state.positions)
}

export function usePositionsActionHandlers(): {
  onBuildPosition: (isBuiltPosition: boolean) => void
  onUnwindPosition: (isUnwoundPosition: boolean) => void
  onClosePositions: (areClosedPositions: boolean) => void
  onResetPositionsState: () => void
} {
  const dispatch = useAppDispatch()

  const onBuildPosition = useCallback(
    (isBuiltPosition: boolean) => {
      dispatch(buildPosition({isBuiltPosition}))
    },
    [dispatch],
  )

  const onUnwindPosition = useCallback(
    (isUnwoundPosition: boolean) => {
      dispatch(unwindPosition({isUnwoundPosition}))
    },
    [dispatch],
  )

  const onClosePositions = useCallback(
    (areClosedPositions: boolean) => {
      dispatch(closePositions({areClosedPositions}))
    },
    [dispatch],
  )

  const onResetPositionsState = useCallback(() => {
    dispatch(resetPositionsState())
  }, [dispatch])

  return {
    onBuildPosition,
    onUnwindPosition,
    onClosePositions,
    onResetPositionsState,
  }
}
