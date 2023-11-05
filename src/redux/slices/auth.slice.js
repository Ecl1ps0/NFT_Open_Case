import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	credential: localStorage.getItem('credential')
		? JSON.parse(localStorage.getItem('credential'))
		: null,
};

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setCredential: (state, action) => {
			state.credential = action.payload;
			localStorage.setItem('credential', JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.credential = null;
			localStorage.removeItem('credential');
		},
	},
});

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;
