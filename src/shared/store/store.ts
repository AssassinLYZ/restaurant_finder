import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import rootSaga from './rootSaga';
import useReducer from './user/userSlice';
import restaurantsReducer from './restaurant/restaurantsSlice';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    user: useReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
