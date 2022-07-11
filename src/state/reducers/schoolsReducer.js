import { createSlice } from '@reduxjs/toolkit';

const listOfSchools = [
  {
    id: 1,
    name: 'Alliance',
    moto: 'Excelence is key',
    description:
      'Apt Learning Institution which values both academic and personal growth',
    level: 'SECONDARY',
    addresses: [
      {
        id: 1,
        country: 'Kenya',
        countryCode: 254,
        postalCode: 536,
        city: 'Nairobi',
        phone: '254742887480',
        type: null,
      },
    ],
  },
];

export const allSchools = createSlice({
  name: 'allSchools',
  initialState: { value: listOfSchools },
  reducers: {
    deleteSchool: (state, action) => {
      // TODO
    },
    saveSchool: (state, action) => {
      // TODO
    },
  },
});

export const { deleteSchool, saveSchool } = allSchools.actions;

export default allSchools.reducer;
