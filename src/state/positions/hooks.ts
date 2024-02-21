import {useCallback} from 'react'
import {AppState} from '../state'
import {useAppSelector, useAppDispatch} from '../hooks'
import {buildPosition, resetPositionsState} from './actions'

export function usePositionsState(): AppState['positions'] {
  return useAppSelector(state => state.positions)
}

export function usePositionsActionHandlers(): {
  onBuildPosition: (isBuiltPosition: boolean) => void
  onResetPositionsState: () => void
} {
  const dispatch = useAppDispatch()

  const onBuildPosition = useCallback(
    (isBuiltPosition: boolean) => {
      dispatch(buildPosition({isBuiltPosition}))
    },
    [dispatch],
  )

  const onResetPositionsState = useCallback(() => {
    dispatch(resetPositionsState())
  }, [dispatch])

  return {
    onBuildPosition,
    onResetPositionsState,
  }
}
