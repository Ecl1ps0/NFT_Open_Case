import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null,
};

const caseSlice = createSlice({
	name: 'CASE SLICE',
	initialState,
	reducers: {
		setCaseData(state, action) {
			state.data = action.payload;
			console.log(action.payload);
		},
	},
});

export const { setCaseData } = caseSlice.actions;
export default caseSlice.reducer;
