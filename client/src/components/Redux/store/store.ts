import { configureStore } from '@reduxjs/toolkit';
// reducers
import counterReducer from './counterSlice';
import ratingReducer from './ratingSlice';

export const configuredStore = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    counter: counterReducer,
    rating: ratingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof configuredStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof configuredStore.dispatch;
