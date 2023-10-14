import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';

const reducer = combineReducers({
	auth: authSlice,
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
