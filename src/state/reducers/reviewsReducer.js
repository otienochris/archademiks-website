import { createSlice } from '@reduxjs/toolkit';

const reviews = [
  {
    id: 1,
    type: 'System',
    typeId: '2',
    userId: 1,
    rating: 4,
    content:
      'Effective and relevant. I loved the way the content was arranged and executed',
    creationDate: '2022-01-21',
    modificationDate: '2022-02-21',
  },
  {
    id: 2,
    type: 'Course',
    typeId: 1,
    userId: 1,
    rating: 5,
    content:
      'The best site to get certified and great relevant skills. Their prices are also cheap',
    creationDate: '2022-01-21',
    modificationDate: '2022-02-21',
  },

  {
    id: 3,
    type: 'Course',
    typeId: 3,
    userId: 1,
    rating: 3,
    content:
      'A step by step explanation. Very suitable for beginners that want to understand in depth what they are doing and why',
    creationDate: '2022-01-21',
    modificationDate: '2022-02-21',
  },
  {
    id: 4,
    type: 'System',
    typeId: 2,
    userId: 1,
    rating: 3,
    content:
      'The best site to get certified and great relevant skills. Their prices are also cheap. The best site to get certified and great relevant skills. Their prices are also cheap.',
    creationDate: '2022-01-21',
    modificationDate: '2022-02-21',
  },
  {
    id: 3,
    type: 'Course',
    typeId: 1,
    userId: 1,
    rating: 3,
    content:
      'The best site to get certified and great relevant skills. Their prices are also cheap',
    creationDate: '2022-01-21',
    modificationDate: '2022-02-21',
  },
  {
    id: 3,
    type: 'Course',
    typeId: 1,
    userId: 1,
    rating: 3,
    content:
      'The best site to get certified and great relevant skills. Their prices are also cheap',
    creationDate: '2022-01-21',
    modificationDate: '2022-02-21',
  },
  {
    id: 3,
    type: 'Course',
    typeId: 2,
    userId: 1,
    rating: 4,
    content: 'Git taught well. Very organized',
    creationDate: '2022-01-21',
    modificationDate: '2022-02-21',
  },
];

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: { value: reviews },
  reducers: {},
});

export default reviewSlice.reducer;
