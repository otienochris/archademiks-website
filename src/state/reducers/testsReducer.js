import { createSlice } from '@reduxjs/toolkit';

const testsList = [
  {
    testId: 1,
    title: 'Some Useless Title one',
    type: 'ASSIGNMENT',
    courseId: 1,
    topicId: 1,
    isOptional: true,
    isScheduled: false,
    startDateAndTime: '2022-09-01 10:20:22',
    endDateAndTime: '2022-09-01 20:20:22',
    questions: [1, 2],
    creationDate: '2022-09-01',
    modificationDate: '2022-09-20',
  },

  {
    testId: 2,
    title: 'Some Useless Title Two',
    type: 'EXAM',
    courseId: 1,
    topicId: 2,
    isOptional: false,
    isScheduled: false,
    startDateAndTime: '2022-09-01 10:20:22',
    endDateAndTime: '2022-09-01 20:20:22',
    questions: [3],
    creationDate: '2022-09-01',
    modificationDate: '2022-09-20',
  },
];

export const testSlice = createSlice({
  name: 'tests',
  initialState: { value: testsList },
  reducers: {
    setTests: (state, action) => {
      state.value = action.payload.tests;
    },
  },
});

export const { setTests } = testSlice.actions;

export default testSlice.reducer;
