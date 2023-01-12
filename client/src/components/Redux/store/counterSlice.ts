import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
} as CounterState;

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // ** Redux toolkit uses Immer, but this pushes devs to write bad code - mutable code
      //   state.value += 1;
      // ** instead I'll create a new object
      return {
        ...state,
        value: state.value + 1,
      };
    },
    decrement: (state) => {
      //   state.value -= 1;
      return {
        ...state,
        value: state.value - 1,
      };
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //   state.value += action.payload;
      return {
        ...state,
        value: state.value + action.payload,
      };
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// from docs, but not used
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
