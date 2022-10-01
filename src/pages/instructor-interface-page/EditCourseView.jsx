import {
  AppBar,
  Container,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import EditBasics from './EditBasics';
import EditSubtopics from './EditSubtopics';
import EditTests from './EditTests';
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
              >
                <Add />
              </IconButton>
            </Tooltip>
            <Divider />
            <EditTopics topics={course.topics} />
          </>
        ) : tab == 2 ? (
          <EditSubtopics topics={course.topics} />
        ) : (
          <EditTests topics={course.topics} />
        )}
      </Grid>
    </Grid>
  );
}

export default EditCourseView;
