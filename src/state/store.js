import { configureStore } from '@reduxjs/toolkit';
import allUsersReducer from './reducers/allUsersReducer';
import answersReducer from './reducers/answersReducer';
import certificatesReducer from './reducers/certificatesReducer';
import courseEnrollementReducer from './reducers/courseEnrollementReducer';
import coursesReducers from './reducers/coursesReducers';
import faqReducer from './reducers/faqReducer';
import loginReducer from './reducers/loginReducer';
import questionsReducer from './reducers/questionsReducer';

import reviewsReducer from './reducers/reviewsReducer';
import schoolsReducer from './reducers/schoolsReducer';
import testEnrollmentReducer from './reducers/testEnrollmentReducer';
import testsReducer from './reducers/testsReducer';
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
    faq: faqReducer,
    testEnrollments: testEnrollmentReducer,
    tests: testsReducer,
    questions: questionsReducer,
    answers: answersReducer,
  },
});

export default store;
