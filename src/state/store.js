import { configureStore } from '@reduxjs/toolkit';
import coursesReducers from './reducers/coursesReducers';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducers,
    login: loginReducer,
  },
});

export default store;
