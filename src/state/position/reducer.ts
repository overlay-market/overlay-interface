
import { createReducer } from '@reduxjs/toolkit';
import { PositionSide, amountInput, leverageInput, positionSideInput } from './actions';

export interface PositionState {
  readonly inputValue: string
  readonly leverageValue: number
  readonly positionSide: PositionSide | undefined
};

const initialState: PositionState = {
  inputValue: '',
  leverageValue: 1,
  positionSide: undefined
};

export default createReducer<PositionState>(initialState, (builder) =>
  builder
    .addCase(
      amountInput,
      (state, { payload: { inputValue } }) => {
        state.inputValue = inputValue;
      }
    )
    .addCase(
      leverageInput,
      (state, { payload: {leverageValue} }) => {
        state.leverageValue = leverageValue;
      }
    )
    .addCase(
      positionSideInput,
      (state, { payload: {positionSide}}) => {
        state.positionSide = positionSide;
      }
    )
)