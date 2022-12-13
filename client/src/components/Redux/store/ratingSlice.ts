import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type Rating = 'good' | 'bad' | 'ok' | undefined;

export interface RatingState {
  value: Rating;
}

const initialState: RatingState = {
  value: undefined,
};

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    rate: (state, action: PayloadAction<Rating>) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = undefined;
    },
  },
});

export const { rate, reset } = ratingSlice.actions;

// from docs, but not used
export const selectCount = (state: RootState) => state.rating.value;

export default ratingSlice.reducer;
