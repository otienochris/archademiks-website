import { createSlice } from '@reduxjs/toolkit';

const initialAnswers = [
  { answerId: 1, content: 'Answer one', isCorrect: false },
  { answerId: 2, content: 'Answer two', isCorrect: false },
  { answerId: 3, content: 'Answer three', isCorrect: true },
  { answerId: 4, content: 'Answer Four', isCorrect: false },
  { answerId: 5, content: 'Answer Five', isCorrect: false },
  { answerId: 6, content: 'Answer Six', isCorrect: true },
];

export const answersReducerSlice = createSlice({
  name: 'answers',
  initialState: { value: initialAnswers },
  reducers: {
    addAnswer: (state, action) => {},
  },
});
const { addAnswer } = answersReducerSlice.actions;
export default answersReducerSlice.reducer;
