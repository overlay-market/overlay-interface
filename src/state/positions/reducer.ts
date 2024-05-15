import {createReducer} from '@reduxjs/toolkit'
import {buildPosition, unwindPosition, resetPositionsState} from './actions'

export interface PositionsState {
  readonly isBuiltPosition: boolean
  readonly isUnwoundPosition: boolean
}

export const initialState: PositionsState = {
  isBuiltPosition: false,
  isUnwoundPosition: false,
}

export default createReducer<PositionsState>(initialState, builder =>
  builder
    .addCase(buildPosition, (state, {payload: {isBuiltPosition}}) => {
      state.isBuiltPosition = isBuiltPosition
    })
    .addCase(unwindPosition, (state, {payload: {isUnwoundPosition}}) => {
      state.isUnwoundPosition = isUnwoundPosition
    })
    .addCase(resetPositionsState, state => {
      state.isBuiltPosition = false
    }),
)
