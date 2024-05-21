import {useCallback} from 'react'
import {AppState} from '../state'
import {useAppSelector, useAppDispatch} from '../hooks'
import {buildPosition, unwindPosition, closePositions, setNumberOfClosedPositions, setNumberOfOpenPositions, resetPositionsState} from './actions'

export function usePositionsState(): AppState['positions'] {
  return useAppSelector(state => state.positions)
}

export function usePositionsActionHandlers(): {
  onBuildPosition: (isBuiltPosition: boolean) => void
  onUnwindPosition: (isUnwoundPosition: boolean) => void
  onClosePositions: (areClosedPositions: boolean) => void
  onSetNumberOfClosedPositions: (numberOfClosedPositions: number) => void
  onSetNumberOfOpenPositions: (numberOfOpenPositions: number) => void
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

  const onSetNumberOfClosedPositions = useCallback(
    (numberOfClosedPositions: number) => {
      dispatch(setNumberOfClosedPositions({numberOfClosedPositions}))
    },
    [dispatch],
  )

  const onSetNumberOfOpenPositions = useCallback(
    (numberOfOpenPositions: number) => {
      dispatch(setNumberOfOpenPositions({numberOfOpenPositions}))
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
    onSetNumberOfClosedPositions,
    onSetNumberOfOpenPositions,
    onResetPositionsState,
  }
}
