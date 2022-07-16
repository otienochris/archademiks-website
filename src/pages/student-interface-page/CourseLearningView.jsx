import {
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CourseProgress from './CourseProgress';
import TopicDetails from './TopicDetails';

const useStyles = makeStyles({
  step: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
  },
});

export default function CourseLearningView({ course, userId }) {
  const enrollmentDetails = useSelector(
    (state) =>
      state.courseEnrollments.value.filter(
        (item) => item.studentId === userId && item.courseId === course.id
      )[0]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(
    enrollmentDetails === undefined ? [] : enrollmentDetails.completedTopics
  );

  const handleNext = () => {
    setCurrentIndex((current) => current + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((current) => current - 1);
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12}>
        <Typography variant='h4'>{course.title}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', margin: '20px auto' }}>
        <Button
          variant='contained'
          color='secondary'
          disabled={currentIndex === 0}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <div style={{ flexGrow: '1' }}></div>
        <Typography>
          Topic {currentIndex} (
          {completedTopics.includes(course.topics[currentIndex].id)
            ? 'Done'
            : 'Pending'}
          ) of {course.topics.length}
        </Typography>
        <div style={{ flexGrow: '1' }}></div>
        <Button
          variant='contained'
          color='secondary'
          disabled={currentIndex === course.topics.length - 1}
          onClick={handleNext}
        >
          Next
        </Button>
      </Grid>
      <Grid item xs={12} style={{ minHeight: '60vh' }}>
        {console.log(completedTopics.includes(course.topics[currentIndex].id))}
        <TopicDetails
          completedTopics={completedTopics}
          setCompletedTopics={setCompletedTopics}
          isCompleted={completedTopics.includes(course.topics[currentIndex].id)}
          topic={course.topics[currentIndex]}
          courseId={course.id}
        />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', margin: '20px auto' }}>
        <Button
          variant='contained'
          color='secondary'
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((current) => current - 1)}
        >
          Previous
        </Button>
        <div style={{ flexGrow: '1' }}></div>
        <Button
          variant='contained'
          color='secondary'
          disabled={currentIndex === course.topics.length - 1}
          onClick={() => setCurrentIndex((current) => current + 1)}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
}
