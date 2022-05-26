import { Container, Grid, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { list } from '../../data/courses';
import { users } from '../../data/users';
import { deleteCourse } from '../../state/reducers/coursesReducers';
import AdminDashboard from './AdminDashboard';
import CoursesTable from './CoursesTable';
import UsersTable from './UsersTable';

export default function Index() {
  const [value, setValue] = useState(0);
  const state = useSelector((state) => state);
  const [users] = useState(state.allUsers.value.map((item) => ({ ...item })));
  const [courses] = useState(state.courses.value.map((item) => ({ ...item })));
  const [courseEnrollmentDetails] = useState(
    state.courseEnrollments.value.map((item) => ({ ...item }))
  );

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
            <UsersTable
              courses={courses}
              users={users}
              courseEnrollmentDetails={courseEnrollmentDetails}
            />
          ) : (
            <CoursesTable courses={courses} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
