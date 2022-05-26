import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: { name: '', email: '', role: '' } },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
      state.value.role = action.payload.role;
    },
    resetLoggedInUser: (state) => {
      state.value.name = '';
      state.value.email = '';
    },
  },
});

export const { setLoggedInUser, resetLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
