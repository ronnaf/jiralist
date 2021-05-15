import { Action, combineReducers, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

// slices
import { projectSlice } from './projectSlice';
import { userSlice } from './userSlice';

/**
 * Setting up redux-persist with redux-toolkit
 * https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
 * and for reference:
 * https://github.com/ronnaf/checkbee-admin/blob/master/src/store.ts
 */

export type RootState = ReturnType<typeof reducers>;
export type JThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const LOGOUT_ACTION = 'auth/logout';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

/** your app's top-level reducers */
const reducers = combineReducers({
  user: userSlice.reducer,
  project: projectSlice.reducer,
});

const rootReducer = (
  state: RootState | undefined,
  action: {
    type: string;
  }
) => {
  if (action.type === LOGOUT_ACTION) {
    // reset state when LOGOUT_ACTIOn is fired
    storage.removeItem('persist:root');
    state = undefined;
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, LOGOUT_ACTION],
    },
  }),
});

export const persistor = persistStore(store);
