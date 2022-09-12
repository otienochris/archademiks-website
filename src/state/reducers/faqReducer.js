import { createSlice } from '@reduxjs/toolkit';
const faq = [
  {
    id: 0,
    question: 'Question 1',
    answer: 'Answer 1',
    creationDate: '2022-01-01',
    modificationDate: '2022-02-01',
    type: 'ACCOUNT',
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
    question: 'Question 3',
    answer: 'Answer 3',
    creationDate: '2022-01-01',
    modificationDate: '2022-02-01',
    type: 'COURSE',
  },
  {
    id: 3,
    question: 'Question 4',
    answer: 'Answer 4',
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
