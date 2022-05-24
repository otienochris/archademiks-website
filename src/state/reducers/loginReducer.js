import { createSlice } from '@reduxjs/toolkit';

export const login = createSlice({
  name: 'login',
  initialState: { value: { isLoggedIn: false, token: '' } },
  reducers: {
    loginAction: (state, action) => {
      state.value.isLoggedIn = action.payload.isLoggedIn;
      state.value.token = action.payload.token;
    },
  },
});

export const { loginAction } = login.actions;

export default login.reducer;
