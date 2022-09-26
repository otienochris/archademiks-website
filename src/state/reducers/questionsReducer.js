import { createSlice } from '@reduxjs/toolkit';

const initialQuestions = [
  {
    questionId: 1,
    question:
      "ut the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words",
    hint: 'Hint One',
    level: 'Beginner',
    successRate: 30,
    period: 3,
    answerType: 'MULTIPLE',
    answers: [
      { answerId: 1, content: 'Answer one', isCorrect: false },
      { answerId: 2, content: 'Answer two', isCorrect: true },
      { answerId: 4, content: 'Answer Four', isCorrect: false },
      { answerId: 5, content: 'Answer Five', isCorrect: true },
    ],
  },
  {
    questionId: 2,
    question:
      "majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. ",
    hint: 'Hint One',
    level: 'Beginner',
    successRate: 30,
    period: 3,
    answerType: 'SINGLE',
    answers: [
      { answerId: 3, content: 'Answer three', isCorrect: true },
      { answerId: 6, content: 'Answer Six', isCorrect: false },
    ],
  },
  {
    questionId: 3,
    question:
      "majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. ",
    hint: 'Hint One',
    level: 'Beginner',
    successRate: 30,
    period: 3,
    answerType: 'SINGLE',
    answers: [
      { answerId: 3, content: 'Answer three', isCorrect: true },
      { answerId: 6, content: 'Answer Six', isCorrect: false },
    ],
  },
];

export const questionsReducerSlice = createSlice({
  name: 'questions',
  initialState: { value: initialQuestions },
  reducers: {
    addQuestion: (state, action) => {},
  },
});

const { addQuestion } = questionsReducerSlice.actions;

export default questionsReducerSlice.reducer;
