import { Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React from 'react';
import TopicDetails from './TopicDetails';

const useStyles = makeStyles({
  step: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
  },
});

export default function CourseLearningView({ course }) {
  const classes = useStyles();
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12}>
        <Typography variant='h6'>{course.title}</Typography>
        <Divider />
      </Grid>
      <Grid container justifyContent='center'>
        {course.topics.map((topic, index) => (
          <TopicDetails key={index} topic={topic} />
        ))}
      </Grid>
    </Grid>
  );
}
