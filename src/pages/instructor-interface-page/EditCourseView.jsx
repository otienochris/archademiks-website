import {
  AppBar,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import EditBasics from './EditBasics';
import EditTopics from './EditTopics';

function EditCourseView({ course }) {
  const [tab, setTab] = useState(0);
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
            <Tab label='Tests' disabled />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs='12'>
        {tab === 0 ? (
          <EditBasics course={course} />
        ) : tab === 1 ? (
          <EditTopics topics={course.topics} />
        ) : (
          'subtopics'
        )}
      </Grid>
    </Grid>
  );
}

export default EditCourseView;
