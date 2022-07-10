import { Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import CourseProgress from './CourseProgress';
import TopicDetails from './TopicDetails';

const useStyles = makeStyles({
  step: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
  },
});

export default function CourseLearningView({ course, enrollmentDetails }) {
  const [completedTopics] = useState(enrollmentDetails.completedTopics);

  // const classes = useStyles();
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12}>
        <Typography variant='h4'>{course.title}</Typography>
        <Divider />
      </Grid>
      <Grid container justifyContent='center'>
        {course.topics.map((topic, index) => (
          <TopicDetails
            isCompleted={completedTopics.includes(topic.id)}
            key={index}
            topic={topic}
            courseId={course.id}
          />
        ))}
      </Grid>
    </Grid>
  );
}
