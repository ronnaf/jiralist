import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';

/** your app's top-level reducers */
const appReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof appReducer>;
export const store = configureStore({
  reducer: appReducer,
});

export type ArnoThunk = ThunkAction<void, RootState, unknown, Action<string>>;
