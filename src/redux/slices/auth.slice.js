import { createSlice } from '@reduxjs/toolkit';

import jwt_decode from 'jwt-decode';

const initialState = {
	credential: null,
	user: null,
};

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setCredential: (state, action) => {
			state.credential = action.payload;
			state.user = jwt_decode(action.payload);
			localStorage.setItem('credential', action.payload);
		},
		logout: (state) => {
			state.credential = null;
			state.user = null;
			localStorage.removeItem('credential');
		},
	},
});

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;
