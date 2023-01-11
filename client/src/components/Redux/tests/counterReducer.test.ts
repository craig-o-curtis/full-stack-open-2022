import { counterSlice, CounterState } from '../store/counterSlice';
import deepFreeze from 'deep-freeze';

describe('counterReducer', () => {
  it('should handle initial state', () => {
    const fakeAction = { type: 'unknown' };
    expect(counterSlice.reducer(undefined, fakeAction)).toEqual({
      value: 0,
    });
  });

  it('should handle increment', () => {
    const previousState: CounterState = { value: 1 };
    deepFreeze(previousState);
    const action = { type: 'counter/increment' };
    const expectedState = { value: 2 };
    expect(counterSlice.reducer(previousState, action)).toEqual(expectedState);
  });

  it('should handle decrement', () => {
    const previousState: CounterState = { value: 1 };
    deepFreeze(previousState);
    const action = { type: 'counter/decrement' };
    const expectedState = { value: 0 };
    expect(counterSlice.reducer(previousState, action)).toEqual(expectedState);
  });

  it('should handle incrementByAmount', () => {
    const previousState: CounterState = { value: 1 };
    deepFreeze(previousState);
    const action = { type: 'counter/incrementByAmount', payload: 2 };
    const expectedState = { value: 3 };
    expect(counterSlice.reducer(previousState, action)).toEqual(expectedState);
  });
});
