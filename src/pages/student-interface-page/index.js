import { Divider, IconButton, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Container, Drawer, Tab, Tabs } from '@mui/material';
import Support from './Support';
import Calendar from './Calendar';
import MyCourses from './MyCourses';
import { list } from '../../data/courses';
import { loggedOnUser } from '../../data/users';

export default function Index() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [enrolledCourse, setEnrolledCourses] = useState([]);
  const [user] = useState(loggedOnUser);
  const [continueLearning, setContinueLearning] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setOpenDrawer(false);
    setContinueLearning(false);
  };

  useEffect(() => {
    setEnrolledCourses(
      list.filter((course) => user.courses.includes(course.id))
    );
  }, [user]);

  return (
    <>
      <Tooltip title='Open Drawer'>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <ArrowCircleRightIcon fontSize='large' />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor='left'
        style={{ width: '300px' }}
        open={openDrawer}
        onClose={false}
      >
        <Tooltip title='Close Drawer'>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
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
      {!continueLearning ? (
        <Container>
          {value === 2 ? (
            <Support />
          ) : value === 1 ? (
            <Calendar />
          ) : (
            <MyCourses
              courses={enrolledCourse}
              setContinueLearning={setContinueLearning}
            />
          )}
        </Container>
      ) : (
        'Learning'
      )}
    </>
  );
}
