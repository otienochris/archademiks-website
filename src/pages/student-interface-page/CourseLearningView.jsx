import {
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TopicDetails from './TopicDetails';

const useStyles = makeStyles({
  step: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
  },
});

export default function CourseLearningView({ course, userId, userType }) {
  const enrollmentDetails = useSelector(
    (state) =>
      state.courseEnrollments.value.filter(
        (item) => item.studentId === userId && item.courseId === course.id
      )[0]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(
    enrollmentDetails === undefined || userType === 'instructor'
      ? []
      : enrollmentDetails.completedTopics
  );

  const handleNext = () => {
    if (currentIndex < course.topics.length - 1) {
      setCurrentIndex((current) => current + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((current) => current - 1);
    }
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
          Prev
        </Button>
        <div style={{ flexGrow: '1' }}></div>

        <Typography
          style={
            completedTopics.includes(course.topics[currentIndex].id)
              ? {
                  border: '2px solid green',
                  // backgroundColor: 'green',
                  color: 'green',
                  padding: '7px',
                  borderRadius: '5px',
                }
              : {
                  border: '2px solid grey',
                  padding: '7px',
                  borderRadius: '5px',
                }
          }
        >
          Topic {currentIndex + 1} of {course.topics.length}
        </Typography>
        {completedTopics.includes(course.topics[currentIndex].id) ? (
          <Check
            fontSize='small'
            style={{
              backgroundColor: 'green',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              color: 'white',
            }}
          />
        ) : (
          ''
        )}

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
        <TopicDetails
          completedTopics={completedTopics}
          setCompletedTopics={setCompletedTopics}
          isCompleted={completedTopics.includes(course.topics[currentIndex].id)}
          topic={course.topics[currentIndex]}
          courseId={course.id}
          moveToNextTopic={handleNext}
        />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', margin: '20px auto' }}>
        <Button
          variant='contained'
          color='secondary'
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((current) => current - 1)}
        >
          Prev
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
