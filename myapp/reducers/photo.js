import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: '',
};

export const photoSlice = createSlice({
    name: 'photo',
    initialState,

    reducers: {
        addPhoto: (state, action) => {
            state.value = action.payload;
        },
        removePhoto: (state, action) => {
            state.value = '';
        },

    },
});

export const { addPhoto, removePhoto } = photoSlice.actions;

export default photoSlice.reducer;
