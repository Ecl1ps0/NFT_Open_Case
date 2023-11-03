import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	credential: null,
};

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setCredential: (state, action) => {
			state.credential = action.payload;
		},
		logout: (state) => {
			state.credential = null;
		},
	},
});

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;
