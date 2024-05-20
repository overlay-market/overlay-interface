import {createReducer} from '@reduxjs/toolkit'
import {buildPosition, unwindPosition, closePositions, setNumberOfClosePositions, resetPositionsState} from './actions'

export interface PositionsState {
  readonly isBuiltPosition: boolean
  readonly isUnwoundPosition: boolean
  readonly areClosedPositions: boolean
  readonly numberOfClosedPositions: number
}

export const initialState: PositionsState = {
  isBuiltPosition: false,
  isUnwoundPosition: false,
  areClosedPositions: false,
  numberOfClosedPositions: 0,
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
    .addCase(setNumberOfClosePositions, (state, {payload: {numberOfClosedPositions}}) => {
      state.numberOfClosedPositions = numberOfClosedPositions
    })
    .addCase(resetPositionsState, state => {
      state.isBuiltPosition = false
      state.isUnwoundPosition = false
      state.areClosedPositions = false
      state.numberOfClosedPositions = 0
    }),
)
