import { configureStore } from '@reduxjs/toolkit';
import allUsersReducer from './reducers/allUsersReducer';
import certificatesReducer from './reducers/certificatesReducer';
import courseEnrollementReducer from './reducers/courseEnrollementReducer';
import coursesReducers from './reducers/coursesReducers';
import loginReducer from './reducers/loginReducer';
import reviewsReducer from './reducers/reviewsReducer';
import schoolsReducer from './reducers/schoolsReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
    courses: coursesReducers,
    login: loginReducer,
    courseEnrollments: courseEnrollementReducer,
    reviews: reviewsReducer,
    schools: schoolsReducer,
    certificates: certificatesReducer,
  },
});

export default store;
