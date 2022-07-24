import { createSlice } from '@reduxjs/toolkit';

const initialCertificates = [
  {
    id: 1,
    studentFullName: 'Christopher Ochieng',
    courseTitle: 'Some Random Title of a very useless Course',
    type: 'CERTIFICATE_OF_COMPLETION',
    dateCreated: '2022-02-01',
    dateModified: '2022-04-02',
  },
];

const certificateSlice = createSlice({
  name: 'certificates',
  initialState: { value: initialCertificates },
  reducers: {},
});

export default certificateSlice.reducer;
