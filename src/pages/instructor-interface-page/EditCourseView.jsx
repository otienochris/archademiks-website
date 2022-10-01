import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Slide,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import AddNewTopic from './AddNewTopic';
import EditBasics from './EditBasics';
import EditSubtopics from './EditSubtopics';
import EditTests from './EditTests';
import EditTopics from './EditTopics';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function EditCourseView({ course }) {
  const [tab, setTab] = useState(0);
  const [addNewTopic, setAddNewTopic] = useState(false);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Grid container>
      <Grid item xs='12'>
        <AppBar position='static' style={{ backgroundColor: 'white' }}>
          <div style={{ color: 'black', margin: '10px auto' }}>
            <Typography variant='h3' align='center'>
              Edit Course
            </Typography>
            <Typography variant='body1' align='center'>
              Title: {course.title}{' '}
            </Typography>
          </div>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label='disabled tabs example'
            style={{ width: '100%', backgroundColor: 'black' }}
            variant='fullWidth'
          >
            <Tab label='Basics' />
            <Tab label='Topics' />
            <Tab label='Sub-Topics' />
            <Tab label='Tests' />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs='12'>
        {tab === 0 ? (
          <EditBasics course={course} />
        ) : tab === 1 ? (
          <>
            <Tooltip title='Add new topic'>
              <IconButton
                style={{
                  backgroundColor: '#ff8c00',
                  color: 'white',
                  margin: '10px',
                }}
                onClick={() => setAddNewTopic(true)}
              >
                <Add />
              </IconButton>
            </Tooltip>
            <Divider />
            <EditTopics topics={course.topics} courseId={course.id} />
          </>
        ) : tab == 2 ? (
          <EditSubtopics topics={course.topics} courseId={course.id} />
        ) : (
          <EditTests topics={course.topics} />
        )}

        {/* Add new topic */}
        <Dialog
          open={addNewTopic}
          TransitionComponent={Transition}
          keepMounted
          // onClose={handleEditPageClose}
          fullScreen
        >
          <Container>
            <DialogTitle
              style={{
                backgroundColor: 'black',
                color: 'white',
                textAlign: 'center',
                margin: '10px',
              }}
            >
              Add New Topic
            </DialogTitle>
            <DialogContent>
              {addNewTopic && <AddNewTopic courseId={course.id} />}
            </DialogContent>
            <DialogActions
              style={{
                margin: '10px',
              }}
            >
              <Button
                variant='contained'
                onClick={() => {
                  setAddNewTopic(false);
                }}
                style={{ backgroundColor: '#ff8c00' }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Container>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default EditCourseView;
