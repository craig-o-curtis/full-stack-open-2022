import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type Rating = 'good' | 'bad' | 'ok';

export interface RatingState {
  value?: Rating;
}

const initialState: RatingState = {
  value: undefined,
};

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    rate: (state, action: PayloadAction<Rating>) => {
      // ** Bad Immer way
      //   state.value = action.payload;
      // ** vanilla immutable way
      return { ...state, value: action.payload };
    },
    reset: (state) => {
      // ** Bad Immer way
      //   state.value = undefined;
      // ** vanilla immutable way
      return { ...state, value: undefined };
    },
  },
});

// ** Actions - defined in reducers above
export const { rate, reset } = ratingSlice.actions;

// from docs, but not used
export const selectRating = (state: RootState) => state.rating.value;

export default ratingSlice.reducer;
