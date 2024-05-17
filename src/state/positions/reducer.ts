import {createReducer} from '@reduxjs/toolkit'
import {buildPosition, unwindPosition, closePositions, resetPositionsState} from './actions'

export interface PositionsState {
  readonly isBuiltPosition: boolean
  readonly isUnwoundPosition: boolean
  readonly areClosedPositions: boolean
}

export const initialState: PositionsState = {
  isBuiltPosition: false,
  isUnwoundPosition: false,
  areClosedPositions: false,
}

export default createReducer<PositionsState>(initialState, builder =>
  builder
    .addCase(buildPosition, (state, {payload: {isBuiltPosition}}) => {
      state.isBuiltPosition = isBuiltPosition
    })
    .addCase(unwindPosition, (state, {payload: {isUnwoundPosition}}) => {
      state.isUnwoundPosition = isUnwoundPosition
    })
    .addCase(closePositions, (state, {payload: {areClosedPositions}}) => {
      state.areClosedPositions = areClosedPositions
    })
    .addCase(resetPositionsState, state => {
      state.isBuiltPosition = false
      state.isUnwoundPosition = false
      state.areClosedPositions = false
    }),
)
