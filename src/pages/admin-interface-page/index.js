import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
import { users } from '../../data/users';
import { list } from '../../data/courses';
import AdminDashboard from './AdminDashboard';

const usersColumns = [
  { title: 'National ID', field: 'id' },
  { title: 'First Name', field: 'firstName' },
  { title: 'Last Name', field: 'lastName' },
  { title: 'Email', field: 'email' },
  { title: 'Role', field: 'type' },
  { title: 'Date Joined', field: 'creationDate' },
  { title: 'Date Modified', field: 'modificationDate' },
];

const coursesColumns = [
  { title: 'Id', field: 'id' },
  { title: 'Title', field: 'title' },
  { title: 'Category', field: 'category' },
  { title: 'Price', field: 'price' },
  { title: 'Rating', field: 'rating' },
  { title: 'Students', field: 'numberOfEnrolledStudents' },
  { title: 'Creation Date', field: 'creationDate' },
  { title: 'Modification Date', field: 'modificationDate' },
];

export default function index() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label={'Dashboard'} />
            <Tab label={'Users'} />
            <Tab label={'Courses'} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {value == 0 ? (
            <AdminDashboard course={list} users={users} />
          ) : value == 1 ? (
            <CustomMaterialTable
              title={''}
              data={users}
              columns={usersColumns}
              allowAdd={true}
              allowDelete={true}
              allowEdit={true}
            />
          ) : (
            <CustomMaterialTable
              title={''}
              data={list}
              columns={coursesColumns}
              allowAdd={true}
              allowDelete={true}
              allowEdit={true}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
