import { configureStore } from '@reduxjs/toolkit';
// reducers
import counterReducer from './counterSlice';
import ratingReducer from './ratingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    rating: ratingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
