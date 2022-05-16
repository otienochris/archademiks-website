import { Container, Grid } from '@material-ui/core';
import React from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';

const columns = [
  { title: 'National ID', field: 'id' },
  { title: 'First Name', field: 'fName' },
  { title: 'Last Name', field: 'lName' },
  { title: 'Email', field: 'email' },
  { title: 'Role', field: 'role' },
];

const data = [
  {
    id: '35879912',
    fName: 'Christopher',
    lName: 'Otieno',
    email: 'otieno@gmail.com',
    role: 'student',
  },
  {
    id: '35879912',
    fName: 'Jeff',
    lName: 'Bezoz',
    email: 'bezoz@gmail.com',
    role: 'Tutor',
  },
];

export default function index() {
  return (
    <Container>
      <Grid Container>
        <Grid item>
          <CustomMaterialTable
            title={'Users'}
            data={data}
            columns={columns}
            allowAdd={true}
            allowDelete={true}
            allowEdit={true}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
