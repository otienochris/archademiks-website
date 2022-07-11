import { createSlice } from '@reduxjs/toolkit';

export const users = [
  {
    id: 1,
    firstName: 'Christopher',
    lastName: 'Otieno',
    email: 'otienochris98@gmail.com',
    courses: [],
    type: 'STUDENT',
    creationDate: '2022-03-01',
    modificationDate: '2022-05-01',
    password: 'pass',
    country: 'KE',
    schools: [],
    isDisabled: false,
    verificationCode: '',
    addresses: [
      {
        id: 1,
        country: 'Kenya',
        countryCode: 254,
        postalCode: 536,
        city: 'Nairobi',
        phone: '254742887480',
        type: 'shipping_address',
      },
    ],
  },
  {
    id: 2,
    firstName: 'Chris',
    lastName: 'Ochieng',
    email: 'admin@gmail.com',
    courses: [1, 2],
    type: 'ADMIN',
    creationDate: '2021-06-01',
    modificationDate: '2022-05-01',
    password: 'pass',
    country: 'KE',
    schools: [],
    isDisabled: false,
    verificationCode: '',
    addresses: [
      {
        id: 1,
        country: 'Kenya',
        countryCode: 254,
        postalCode: 536,
        city: 'Nairobi',
        phone: '254742887480',
        type: 'shipping_address',
      },
    ],
  },
  {
    id: 3,
    firstName: 'Steve',
    lastName: 'Mboya',
    email: 'mboya@gmail.com',
    courses: [1, 2],
    type: 'INSTRUCTOR',
    creationDate: '2021-07-01',
    modificationDate: '2022-05-01',
    password: 'pass',
    country: 'KE',
    schools: [],
    isDisabled: false,
    verificationCode: '',
    addresses: [
      {
        id: 1,
        country: 'Kenya',
        countryCode: 254,
        postalCode: 536,
        city: 'Nairobi',
        phone: '254742887480',
        type: 'shipping_address',
      },
    ],
  },
  {
    id: 4,
    firstName: 'Stevo',
    lastName: 'Msimple',
    email: 'student@gmail.com',
    courses: [1],
    type: 'STUDENT',
    creationDate: '2021-07-01',
    modificationDate: '2022-05-01',
    password: 'pass',
    country: 'KE',
    schools: [],
    isDisabled: false,
    verificationCode: '',
    addresses: [
      {
        id: 1,
        country: 'Kenya',
        countryCode: 254,
        postalCode: 536,
        city: 'Nairobi',
        phone: '254742887480',
        type: 'shipping_address',
      },
    ],
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
    addUser: (state, action) => {
      const newUser = {
        id: state.value.length + 1,
        firstName: action.payload.firstName,
        lastName: action.payload.secondName,
        email: action.payload.email,
        courses: [],
        type: action.payload.userType,
        creationDate: null,
        modificationDate: null,
        password: action.payload.password,
        country: action.payload.country,
        schools: [],
        isDisabled: true,
        verificationCode: action.payload.verificationCode,
        addresses: [],
      };

      state.value.push(newUser);
    },
  },
});

export const { deleteUser, enrollCourse, addUser } = allUsersSlice.actions;

export default allUsersSlice.reducer;
