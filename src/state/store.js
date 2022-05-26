import { configureStore } from '@reduxjs/toolkit';
import allUsersReducer from './reducers/allUsersReducer';
import courseEnrollementReducer from './reducers/courseEnrollementReducer';
import coursesReducers from './reducers/coursesReducers';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
    courses: coursesReducers,
    login: loginReducer,
    courseEnrollments: courseEnrollementReducer,
  },
});

export default store;
