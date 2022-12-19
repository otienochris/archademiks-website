import { Container, Grid, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LMS_COURSES } from '../../commons/urls';
import { list } from '../../data/courses';
import { setCourses } from '../../state/reducers/coursesReducers';
import AdminDashboard from './AdminDashboard';
import CoursesTable from './CoursesTable';
import UsersTable from './UsersTable';

const useStyles = makeStyles({
  tabs: {
    margin: '20px auto',
  },
});

export default function Index() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const state = useSelector((state) => state);
  const token = useSelector((state) => state.login.value.token);
  const [users] = useState(state.allUsers.value.map((item) => ({ ...item })));
  const [courses, setAllCourses] = useState(state.courses.value.map((item) => ({ ...item })));
  const dispacth = useDispatch();
  const [courseEnrollmentDetails] = useState(
    state.courseEnrollments.value.map((item) => ({ ...item }))
  );

  const fetchCourses = async () => {
    await fetch(LMS_COURSES, {
      method: 'GET',
      mode: 'cors',
      Authorization: "Bearer " + token
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
        } else {
        }
        return response.json();
      })
      .then((data) => {
        dispacth(setCourses(data._embedded.courseDtoList));
        console.log(data._embedded.courseDtoList);
        setAllCourses(data._embedded.courseDtoList.map(item => ({ ...item })));
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchCourses();
  }, [])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            className={classes.tabs}
            variant='fullWidth'
          >
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
