import { createSlice } from '@reduxjs/toolkit';

const courseEnrollmentDetails = [
  {
    id: 1,
    studentId: 4,
    courseId: 1,
    status: 'pending',
    amount: 220,
    completionDate: null,
    creationDate: '2022-02-02',
    modificationDate: '2022-03-02',
    completedTopics: [1, 2],
    certificateId: 1,
    testEnrollmentId: 1,
  },
  {
    id: 2,
    studentId: 2,
    courseId: 1,
    status: 'completed',
    amount: 1220,
    completionDate: '2022-08-02',
    creationDate: '2022-02-02',
    modificationDate: '2022-03-02',
    completedTopics: [1, 2],
    certificateId: 1,
    testEnrollmentId: 1,
  },
  {
    id: 2,
    studentId: 3,
    courseId: 1,
    status: 'cancelled',
    amount: 999,
    completionDate: '2022-08-02',
    creationDate: '2022-02-02',
    modificationDate: '2022-03-02',
    completedTopics: [1, 2],
    certificateId: 1,
    testEnrollmentId: 1,
  },
  {
    id: 3,
    studentId: 1,
    courseId: 3,
    status: 'completed',
    amount: 220,
    completionDate: '2022-08-02',
    creationDate: '2022-02-02',
    modificationDate: '2022-03-02',
    completedTopics: [1, 2],
    certificateId: 1,
    testEnrollmentId: 1,
  },
];

const courseEnrollmentSlice = createSlice({
  name: 'courseEnrollments',
  initialState: { value: courseEnrollmentDetails },
  reducers: {
    addCompletedTopic: (state, action) => {
      var enrollmentToBeUpdated = {};
      var restOfEnrollments = [];
      const topicId = parseInt(action.payload.topicId);

      // filter the state, get the object to be update and the rest of the objects
      state.value.map((enrollment) => {
        if (
          parseInt(enrollment.studentId) ===
            parseInt(action.payload.studentId) &&
          parseInt(enrollment.courseId) === parseInt(action.payload.courseId)
        ) {
          enrollmentToBeUpdated = enrollment;
        } else {
          restOfEnrollments.push(enrollment);
        }
        return undefined;
      });

      // add the topic id only if it doesn't exist
      if (!enrollmentToBeUpdated.completedTopics.includes(topicId)) {
        enrollmentToBeUpdated.completedTopics.push(topicId);
        restOfEnrollments.push(enrollmentToBeUpdated);
      } else {
        restOfEnrollments.push(enrollmentToBeUpdated);
      }

      // update the state
      state.value = restOfEnrollments;
    },
    enrollUserToCourse: (state, action) => {
      state.value.push(action.payload);
    },
    setCourseEnrollments: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addCompletedTopic, enrollUserToCourse, setCourseEnrollments } =
  courseEnrollmentSlice.actions;

export default courseEnrollmentSlice.reducer;
