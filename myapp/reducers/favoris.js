import { createSlice } from '@reduxjs/toolkit';

const favorisSlice = createSlice({
    name: 'favoris',
    initialState: {
        value: [],
    },
    reducers: {
        addFav: (state, action) => {
            const newBar = action.payload;

            // Check if the bar is already in favorites
            const isBarInFavorites = state.value.some((bar) => bar.name === newBar.name);

            if (!isBarInFavorites) {
                // If the bar is not in favorites, add it
                state.value.push(newBar);
            }
        },
        removeFav: (state, action) => {
            const barNameToRemove = action.payload;
            state.value = state.value.filter((bar) => bar.name !== barNameToRemove);
        },
    },
});

export const { addFav, removeFav } = favorisSlice.actions;

export default favorisSlice.reducer;
