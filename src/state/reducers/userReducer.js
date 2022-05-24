import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: { name: 'chris', email: '' } },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
    },
    resetLoggedInUser: (state) => {
      state.value.name = '';
      state.value.email = '';
    },
  },
});

export const { setLoggedInUser, resetLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
