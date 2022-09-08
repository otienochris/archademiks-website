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
  AppBar,
  Grid,
  makeStyles,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import AddIcon from '@mui/icons-material/Add';
import InstructorCourses from './InstructorCourses';
import CreateCourse from './CreateCourse';
import { useSelector } from 'react-redux';
import CourseLearningView from '../student-interface-page/CourseLearningView';
import { ArrowLeftOutlined } from '@material-ui/icons';
import EditCourseView from './EditCourseView';

const useStyles = makeStyles({
  mainContainer: {
    minHeight: '93.5vh',
  },
});

export default function Index() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);
  const [courseToViewOrEdit, setCourseToViewOrEdit] = useState({});
  const [viewCourse, setViewCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(false);
  const [createNewCourse, setCreateNewCourse] = useState(false);
  const instructor = useSelector((state) => state.user.value);
  const ownedCourses = useSelector((state) =>
    state.courses.value.filter((course) =>
      instructor.courses.includes(course.id)
    )
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setOpen(false);
  };

  return (
    <Container className={classes.mainContainer}>
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
          {!createNewCourse && (
            <Fab color='primary' onClick={() => setCreateNewCourse(true)}>
              <Tooltip title='Add course'>
                <AddIcon />
              </Tooltip>
            </Fab>
          )}
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
          <Tab label='My Courses' onClick={() => setCreateNewCourse(false)} />
          <Tab label='Calendar' />
          <Tab label='Support' />
        </Tabs>
      </Drawer>
      <Container>
        {/* <Grid item xs={12}> */}
        {createNewCourse ? (
          <div>
            <Button
              variant='contained'
              color='primary'
              startIcon={<ArrowLeftOutlined />}
              onClick={() => {
                setViewCourse(false);
                setEditCourse(false);
                setCreateNewCourse(false);
              }}
              style={{ margin: '30px auto' }}
            >
              Back to all courses
            </Button>
            <Divider />
            <CreateCourse setCreateNewCourse={setCreateNewCourse} />
          </div>
        ) : viewCourse ? (
          <div style={{ margin: '5px auto' }}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<ArrowLeftOutlined />}
              onClick={() => {
                setViewCourse(false);
                setEditCourse(false);
                setCreateNewCourse(false);
              }}
              style={{ margin: '30px auto' }}
            >
              Back to my courses
            </Button>
            <Divider />
            <CourseLearningView
              course={courseToViewOrEdit}
              userId={undefined}
              userType='instructor'
            />
          </div>
        ) : editCourse ? (
          <div style={{ margin: '5px auto' }}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<ArrowLeftOutlined />}
              onClick={() => {
                setViewCourse(false);
                setEditCourse(false);
                setCreateNewCourse(false);
              }}
              style={{ margin: '30px auto' }}
            >
              Back to my courses
            </Button>
            <Divider />
            <EditCourseView course={courseToViewOrEdit} />
          </div>
        ) : (
          <InstructorCourses
            setCourseToViewOrEdit={setCourseToViewOrEdit}
            setViewCourse={setViewCourse}
            setEditCourse={setEditCourse}
            courses={ownedCourses}
          />
        )}
        {/* </Grid> */}
      </Container>
    </Container>
  );
}
