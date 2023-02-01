import { Container, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ROLES } from '../../commons/roles';
import { LMS_COURSES, LMS_INSTRUCTORS, LMS_STUDENTS } from '../../commons/urls';
import { list } from '../../data/courses';
import { setCourses } from '../../state/reducers/coursesReducers';
import AdminDashboard from './AdminDashboard';
import CoursesTable from './CoursesTable';
import UsersTable from './UsersTable';
import UsersView from './UsersView';

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
  const [users, setUsers] = useState([]);
  const [courses, setAllCourses] = useState(state.courses.value.map((item) => ({ ...item })));
  const dispacth = useDispatch();
  const [courseEnrollmentDetails] = useState(
    state.courseEnrollments.value.map((item) => ({ ...item }))
  );

  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: "Bearer " + token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const fetchCourses = async () => {
    await fetch(LMS_COURSES, options)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
        } else {
        }
        return response.json();
      })
      .then((data) => {
        dispacth(setCourses(data._embedded.courseDtoList));
        setAllCourses(data._embedded.courseDtoList.map(item => ({ ...item })));
      })
      .catch((error) => console.log(error));
  }

  const fetchStudents = async () => {
    await fetch(LMS_STUDENTS, options)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Students retrieved successfully");
        } else {
          console.log("There was an error retrieving students");
        }
        return response.json()
      })
      .then(data => {

        var studentList = [];
        data._embedded.studentDtoList.map(student => studentList.push({
          id: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          role: ROLES.STUDENT,
          dateJoined: student.creationDate,
          dataModified: student.modificationDate,
          country: student.countryCode,
          version: student.version,
          isAccountDisabled: student.accountDisabled
        }))

        studentList.map(student => users.push(student));
      })
      .catch(error => console.log(error));
  }

  const fetchInstructors = async () => {
    await fetch(LMS_INSTRUCTORS, options)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Instructors retrieved successfully");
        } else {
          console.log("There was an error retrieving students");
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        var instructorsList = [];
        data._embedded.instructorDtoList.map(instructor => instructorsList.push({
          id: instructor.instructorId,
          firstName: instructor.firstName,
          lastName: instructor.lastName,
          email: instructor.email,
          role: ROLES.INSTRUCTOR,
          dateJoined: instructor.creationDate,
          dataModified: instructor.modificationDate,
          country: instructor.countryCode,
          version: instructor.version,
          isAccountDisabled: instructor.accountDisabled
        }))

        instructorsList.map(instructor => users.push(instructor));
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchInstructors();
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
          // variant='fullWidth'
          >
            <Tab label={'Overview'} />
            <Tab label={'Users'} />
            <Tab label={'Courses'} />
            <Tab label={'Reports'} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {value == '0' ? (
            <AdminDashboard course={list} users={users} />
          ) : value == '1' ? (
            // <UsersTable
            //   courses={courses}
            //   users={users}
            //   courseEnrollmentDetails={courseEnrollmentDetails}
            // />

            <UsersView users={users} />
          ) : value == 2 ? (
            <CoursesTable courses={courses} />
          ) : <Typography>Nothing Here</Typography>}
        </Grid>
      </Grid>
    </Container>
  );
}
