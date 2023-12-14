import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const barSlice = createSlice({
    name: 'bars',
    initialState,

    reducers: {
        addData: (state, action) => {
            state.value = action.payload; // Update to replace the array with the new data
        },
        removeData: (state, action) => {
            state.value = [];
        },
    },
});

export const { addData, removeData } = barSlice.actions;

export default barSlice.reducer;
