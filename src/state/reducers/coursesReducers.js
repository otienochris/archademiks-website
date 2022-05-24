import { createSlice } from '@reduxjs/toolkit';

const subTopicObject = {
  id: 1,
  title: '',
  description: '',
  link: '',
  content: '',
};

const topicObject = {
  id: 0,
  title: '',
  description: '',
  content: '',
  link: '',
  subTopics: [subTopicObject],
};

const courseObject = {
  id: 0,
  title: '',
  thumbnail: '',
  description: '',
  rating: 0,
  price: 0,
  category: [],
  creationDate: '',
  modificationDate: '',
  link: '',
  instructors: [],
  topics: [topicObject],
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState: { value: [courseObject] },
  reducers: (state, action) => {},
});

export default coursesSlice.reducer;
