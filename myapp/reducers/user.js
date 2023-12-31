import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    mail: null,
    username: null,
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.mail = action.payload.mail;
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.mail = null;
    },

  },
});

export const { login, logout, } = userSlice.actions;

export default userSlice.reducer;
