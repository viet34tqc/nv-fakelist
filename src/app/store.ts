import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
