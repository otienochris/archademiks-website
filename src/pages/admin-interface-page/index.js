import { Container, Grid, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { list } from '../../data/courses';
import { users } from '../../data/users';
import AdminDashboard from './AdminDashboard';
import CoursesTable from './CoursesTable';
import UsersTable from './UsersTable';

export default function Index() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label={'Overview'} />
            <Tab label={'Users'} />
            <Tab label={'Courses'} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {value == '0' ? (
            <AdminDashboard course={list} users={users} />
          ) : value == '1' ? (
            <UsersTable />
          ) : (
            <CoursesTable />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
