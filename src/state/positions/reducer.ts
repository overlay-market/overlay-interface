import {createReducer} from '@reduxjs/toolkit'
import {buildPosition, resetPositionsState} from './actions'

export interface PositionsState {
  readonly isBuiltPosition: boolean
}

export const initialState: PositionsState = {
  isBuiltPosition: false,
}

export default createReducer<PositionsState>(initialState, builder =>
  builder
    .addCase(buildPosition, (state, {payload: {isBuiltPosition}}) => {
      state.isBuiltPosition = isBuiltPosition
    })
    .addCase(resetPositionsState, state => {
      state.isBuiltPosition = false
    }),
)
