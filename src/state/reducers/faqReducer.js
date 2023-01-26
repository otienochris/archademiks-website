import { createSlice } from '@reduxjs/toolkit';
const faq = [
  {
    id: 0,
    question: 'How do I enroll in a course.',
    answer: 'The first step is to create an account then browse through available course. Once you identify the one you want, you either pay or get it for free by following the prompts.',
    creationDate: '2022-01-01',
    modificationDate: '2022-02-01',
    type: 'COURSE',
  },
  {
    id: 1,
    question: 'Question 2',
    answer: 'Answer 2',
    creationDate: '2022-01-01',
    modificationDate: '2022-02-01',
    type: 'COURSE',
  },
  {
    id: 2,
    question: 'What types of accounts are there?',
    answer: 'There are two main client facing accounts. One is for the instructor and the other for the student',
    creationDate: '2022-01-01',
    modificationDate: '2022-02-01',
    type: 'ACCOUNT',
  },
  {
    id: 3,
    question: 'Must I pay to have an account',
    answer: 'It depends with your need. IF you need a dedicated tutor then yes else no.',
    creationDate: '2022-01-01',
    modificationDate: '2022-02-01',
    type: 'ACCOUNT',
  },
];

export const faqSlice = createSlice({
  name: 'FAQ',
  initialState: { value: faq },
  reducers: {
    setFAQ: (state, action) => {
      state.value = action.payload.faq;
    },
  },
});

export const { setFAQ } = faqSlice.actions;

export default faqSlice.reducer;
