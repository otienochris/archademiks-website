import { createSlice } from '@reduxjs/toolkit';

export const users = [
  {
    id: 1,
    firstName: 'Christopher',
    lastName: 'Otieno',
    email: 'otienochris98@gmail.com',
    courses: [],
    type: 'student',
    creationDate: '2022-03-01',
    modificationDate: '2022-05-01',
    password: 'abc@123',
    country: 'Kenya',
  },
  {
    id: 2,
    firstName: 'Chris',
    lastName: 'Ochieng',
    email: 'admin@gmail.com',
    courses: [1, 2],
    type: 'admin',
    creationDate: '2021-06-01',
    modificationDate: '2022-05-01',
    password: 'abc@123',
    country: 'Kenya',
  },
  {
    id: 3,
    firstName: 'Steve',
    lastName: 'Mboya',
    email: 'mboya@gmail.com',
    courses: [1, 2],
    type: 'instructor',
    creationDate: '2021-07-01',
    modificationDate: '2022-05-01',
    password: 'abc@123',
    country: 'Kenya',
  },
  {
    id: 4,
    firstName: 'Stevo',
    lastName: 'Msimple',
    email: 'student@gmail.com',
    courses: [],
    type: 'student',
    creationDate: '2021-07-01',
    modificationDate: '2022-05-01',
    password: 'a',
    country: 'Kenya',
  },
];

export const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: { value: users },
  reducers: {
    deleteUser: (state, action) => {
      state.value = state.value.filter((item) => item.id != action.payload);
    },
    enrollCourse: (state, action) => {
      const enrollingUser = state.value.filter(
        (user) => user.email == action.payload.email
      )[0];
      enrollingUser.courses.push(action.payload.courseId);

      const newArray = state.value.filter(
        (user) => user.email != action.payload.email
      );
      newArray.push(enrollingUser);

      state.value = newArray;
    },
  },
});

export const { deleteUser, enrollCourse } = allUsersSlice.actions;

export default allUsersSlice.reducer;
