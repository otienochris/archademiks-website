import { createSlice } from '@reduxjs/toolkit';

const testsList = [
  {
    testId: 1,
    title: 'Complete Introduction to Object Oriente programming',
    type: 'ASSIGNMENT',
    courseId: 1,
    topicId: 1,
    isOptional: true,
    isScheduled: false,
    startDateAndTime: '2022-09-01 10:20:22',
    endDateAndTime: '2022-09-01 20:20:22',
    questions: [
      {
        questionId: 1,
        question:
          "ut the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words",
        hint: 'Hint One',
        level: 'EASY',
        successRate: 30,
        answerType: 'MULTI_CHOICE',
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
        level: 'MODERATE',
        successRate: 30,
        answerType: 'SINGLE_CHOICE',
        answers: [
          { answerId: 3, content: 'Answer three', isCorrect: true },
          { answerId: 6, content: 'Answer Six', isCorrect: false },
        ],
      },
    ],
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
    questions: [
      {
        questionId: 3,
        question:
          "majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. ",
        hint: 'Hint One',
        level: 'HARD',
        successRate: 30,
        answerType: 'SINGLE_CHOICE',
        answers: [
          { answerId: 3, content: 'Answer three', isCorrect: true },
          { answerId: 6, content: 'Answer Six', isCorrect: false },
        ],
      },
    ],
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
    addAnswerAction: (state, action) => {
      state.value
        .filter((item) => item.testId === parseInt(action.payload.testId))[0]
        .questions.filter(
          (quiz) => quiz.questionId === parseInt(action.payload.questionId)
        )[0]
        .answers.push(action.payload.answer);
    },
  },
});

export const { setTests, addAnswerAction } = testSlice.actions;

export default testSlice.reducer;
