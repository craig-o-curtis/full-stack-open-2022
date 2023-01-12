import deepFreeze from 'deep-freeze';

import { RatingState, ratingSlice } from '../store/ratingSlice';

describe('ratingReducer', () => {
  it('should handle initial state', () => {
    const fakeAction = { type: 'unknown' };
    expect(ratingSlice.reducer(undefined, fakeAction)).toEqual({
      value: undefined,
    });
  });

  it('should handle rate', () => {
    const previousState: RatingState = { value: undefined };
    deepFreeze(previousState);
    const action = { type: 'rating/rate', payload: 'good' };
    const expectedState = { value: 'good' };
    expect(ratingSlice.reducer(previousState, action)).toEqual(expectedState);
  });

  it('should handle reset', () => {
    const previousState: RatingState = { value: 'good' };
    deepFreeze(previousState);
    const action = { type: 'rating/reset' };
    const expectedState = { value: undefined };
    expect(ratingSlice.reducer(previousState, action)).toEqual(expectedState);
  });
});
