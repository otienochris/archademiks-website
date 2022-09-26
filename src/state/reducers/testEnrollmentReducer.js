import { createSlice } from '@reduxjs/toolkit';

const initialTestEnrollment = [
  {
    testEnrollmentId: 1,
    status: 'pending',
    completionDate: '2022-09-01',
    creationDate: '2022-05-01',
    modificationDate: '2022-06-01',
    completedQuestions: { 1: [1, 2], 2: [3] },
    score: 30,
    tests: [1, 2],
  },
];

export const testEnrollments = createSlice({
  name: 'testEnrollment',
  initialState: { value: initialTestEnrollment },
  reducers: {
    addTestEnrollmentRecord: (state, action) => {},
    completeAQuestion: (state, action) => {},
    addATest: (state, action) => {},
  },
});

export const { addTestEnrollmentRecord, completeAQuestion, addATest } =
  testEnrollments.actions;
export default testEnrollments.reducer;
