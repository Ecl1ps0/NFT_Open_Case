import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import caseSlice from './slices/case.slice';
const reducer = combineReducers({
	auth: authSlice,
	case: caseSlice,
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
