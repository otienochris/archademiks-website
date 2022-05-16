import {
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Container, Drawer, Tab, Tabs } from '@mui/material';
import Support from './Support';
import Calendar from '../../components/Calendar';
import MyCourses from './MyCourses';
import { list } from '../../data/courses';
import { users } from '../../data/users';
import CourseLearningView from './CourseLearningView';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Index() {
  // const date = new Date();

  const [date] = useState(new Date());
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [enrolledCourse, setEnrolledCourses] = useState([]);
  const [user] = useState(users[0]);
  const [continueLearning, setContinueLearning] = useState(false);
  const [courseToContinue, setCourseToContinue] = useState({});
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [firstDay, setFirstDay] = useState(new Date(year, month, 1).getDay());
  const monthsOfTheYear = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setOpenDrawer(false);
    setContinueLearning(false);
  };

  const handleCalendarPrev = () => {
    if (month === 0) {
      setYear((prev) => prev - 1);
      setMonth(11);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleCalendarNext = () => {
    if (month === 11) {
      setYear((prev) => prev + 1);
      setMonth(11);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setEnrolledCourses(
      list.filter((course) => user.courses.includes(course.id))
    );

    // console.log(year, month, firstDay);
    setFirstDay(new Date(year, month, 1).getDay());
  }, [user.courses, month, year, firstDay]);

  return (
    <>
      <Tooltip title='Open Drawer'>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <ArrowCircleRightIcon fontSize='large' />
        </IconButton>
      </Tooltip>
      <Drawer
        variant='persistent'
        anchor='left'
        style={{ width: '300px' }}
        open={openDrawer}
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
            <Grid cointainer justifyContent='center'>
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <IconButton onClick={handleCalendarPrev}>
                  <ArrowBackIosIcon />
                </IconButton>

                <Typography variant='body2'>
                  <span>{year}, </span> {monthsOfTheYear[month]}
                </Typography>
                <IconButton onClick={handleCalendarNext}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Calendar firstDay={firstDay} year={year} month={month} />
              </Grid>
            </Grid>
          ) : (
            <MyCourses
              courses={enrolledCourse}
              setContinueLearning={setContinueLearning}
              setCourseToContinue={setCourseToContinue}
            />
          )}
        </Container>
      ) : (
        <Container style={{ minHeight: '87vh' }}>
          <CourseLearningView course={courseToContinue} />
        </Container>
      )}
    </>
  );
}
