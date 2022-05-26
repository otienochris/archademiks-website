import { createSlice } from '@reduxjs/toolkit';

const courseEnrollmentDetails = [
  {
    id: 1,
    studentId: 1,
    courseId: 1,
    status: 'pending',
    amount: 220,
    completionDate: null,
    creationDate: '2022-02-02',
    modificationDate: '2022-03-02',
  },
  {
    id: 2,
    studentId: 2,
    courseId: 1,
    status: 'completed',
    amount: 1220,
    completionDate: '2022-08-02',
    creationDate: '2022-02-02',
    modificationDate: '2022-03-02',
  },
  {
    id: 2,
    studentId: 3,
    courseId: 1,
    status: 'cancelled',
    amount: 999,
    completionDate: '2022-08-02',
    creationDate: '2022-02-02',
    modificationDate: '2022-03-02',
  },
  {
    id: 3,
    studentId: 1,
    courseId: 3,
    status: 'completed',
    amount: 220,
    completionDate: '2022-08-02',
    creationDate: '2022-02-02',
    modificationDate: '2022-03-02',
  },
];

const courseEnrollmentSlice = createSlice({
  name: 'courseEnrollments',
  initialState: { value: courseEnrollmentDetails },
  reducers: {},
});

export default courseEnrollmentSlice.reducer;
