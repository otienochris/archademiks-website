import { createSlice } from '@reduxjs/toolkit';

const user = {
  id: 4,
  firstName: '',
  lastName: '',
  email: '',
  courses: [],
  type: '',
  creationDate: '',
  modificationDate: '',
  password: '',
  country: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: user },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.value = action.payload.user;
    },
    resetLoggedInUser: (state) => {
      state.value = user;
    },
    enrollCourse: (state, action) => {
      state.value.courses.push(parseInt(action.payload.courseId));
    },
  },
});

export const { setLoggedInUser, resetLoggedInUser, enrollCourse } =
  userSlice.actions;

export default userSlice.reducer;
