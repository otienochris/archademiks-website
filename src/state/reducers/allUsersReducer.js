import { createSlice } from '@reduxjs/toolkit';

export const users = [
  {
    id: 1,
    firstName: 'Christopher',
    lastName: 'Otieno',
    email: 'otienochris98@gmail.com',
    title: '',
    description: '',
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
    title: '',
    description: '',
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
    title: 'Software Engineer',
    description:
      'I have worked in high end companies like Safaricom, and learnt the best practices that I share through my courses',
    courses: [1, 2],
    type: 'INSTRUCTOR',
    creationDate: '2021-07-01',
    modificationDate: '2022-05-01',
    password: 'pass',
    country: 'UG',
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
    title: '',
    description: '',
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
      // TODO persist in backend
    },
    verifyEmail: (state, action) => {
      const currentState = state.value.map((user) => {
        if (
          user.email === action.payload.email &&
          user.verificationCode === action.payload.code
        ) {
          user.isDisabled = false;
        }
        return user;
      });

      state.value = currentState;
    },
  },
});

export const { deleteUser, enrollCourse, addUser, verifyEmail } =
  allUsersSlice.actions;

export default allUsersSlice.reducer;
