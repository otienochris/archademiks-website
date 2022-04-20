import {
  Container,
  Divider,
  Drawer,
  Fab,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import AddIcon from '@mui/icons-material/Add';
import { users } from '../../data/users';
import { list } from '../../data/courses';
import { Grid } from '@mui/material';
// import MyCourses from '../student-interface-page/MyCourses';
import InstructorCourses from './InstructorCourses';
import CreateCourse from './CreateCourse';

const initialCourse = {
  id: 0,
  title: '',
  thumbnail: '',
  description: '',
  rating: 0,
  price: 0,
  category: '',
  numberOfEnrolledStudents: 0,
  link: '',
  topics: [],
};

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const [instructor] = useState(users[1]);
  const [value, setValue] = useState(0);
  const [ownedCourses, setOwnedCourses] = useState([]);
  const [courseToViewOrEdit, setCourseToViewOrEdit] = useState({});
  const [viewCourse, setViewCourse] = useState(false);
  const [createNewCourse, setCreateNewCourse] = useState(true);
  const [newCourse, setNewCourse] = useState(initialCourse);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setOpen(false);
  };

  useEffect(() => {
    setOwnedCourses(
      list.filter((course) => instructor.courses.includes(course.id))
    );
  }, [list]);

  return (
    <Container>
      <AppBar
        position='static'
        open={open}
        style={{ display: 'flex', backgroundColor: 'whitesmoke' }}
      >
        <Toolbar>
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyItems: 'center',
            }}
          >
            <IconButton
              aria-label='open drawer'
              onClick={() => setOpen(!open)}
              edge='start'
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Fab color='primary' onClick={() => setCreateNewCourse(true)}>
            <Tooltip title='Add course'>
              <AddIcon />
            </Tooltip>
          </Fab>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='persistent'
        anchor='left'
        style={{ width: '300px' }}
        open={open}
      >
        <Tooltip title='Close Drawer'>
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowCircleLeftIcon fontSize='large' />
          </IconButton>
        </Tooltip>
        <Divider />

        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
        >
          <Tab label='My Courses' />
          <Tab label='Calendar' />
          <Tab label='Support' />
        </Tabs>
      </Drawer>
      <Container>
        <Grid item xs={12}>
          {createNewCourse ? (
            <CreateCourse
              setNewCourse={setNewCourse}
              newCourse={newCourse}
              setCreateNewCourse={setCreateNewCourse}
            />
          ) : (
            <InstructorCourses
              setCourseToViewOrEdit={setCourseToViewOrEdit}
              setViewCourse={setViewCourse}
              courses={ownedCourses}
            />
          )}
        </Grid>
      </Container>
    </Container>
  );
}
