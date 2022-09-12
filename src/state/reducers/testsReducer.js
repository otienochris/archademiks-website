import { createSlice } from '@reduxjs/toolkit';

const testsList = [
  {
    id: 0,
    type: 'ASSIGNMENT',
    courseId: 1,
    topicId: 1,
    qeustionsAndAnswers: [
      {
        id: 0,
        question: 'Question 1',
        answers: [
          {
            id: 1,
            value: 'Answer One',
          },
          {
            id: 2,
            value: 'Answer two',
          },
        ],
        correctAnswerCode: 0,
      },
    ],
  },
];

export const testSlice = createSlice({
  name: 'tests',
  initialState: testsList,
  reducers: {
    setTests: (state, action) => {
      state.value = action.payload.tests;
    },
  },
});

export const { setTests } = testSlice.actions;

export default testSlice.reducer;
