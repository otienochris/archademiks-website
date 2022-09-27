import {
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import {
  ArrowBackRounded,
  ArrowForward,
  ArrowForwardIosRounded,
  Check,
} from '@material-ui/icons';
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
  const [subtopicsOpened, setSubtopicsOpened] = useState(false);
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
      {!subtopicsOpened && (
        <Grid item xs={12} style={{ display: 'flex', margin: '20px auto' }}>
          <Button
            startIcon={<ArrowBackRounded />}
            variant='contained'
            style={
              currentIndex === 0
                ? {}
                : {
                    backgroundColor: '#ff8c00',
                    color: 'black',
                    fontWeight: 'bolder',
                  }
            }
            disabled={currentIndex === 0}
            onClick={handlePrevious}
          >
            Topic {currentIndex}
          </Button>
          <div style={{ flexGrow: '1' }}></div>

          <Typography
            style={{
              padding: '7px',
              borderRadius: '5px',
            }}
          >
            {currentIndex + 1} of {course.topics.length}
          </Typography>

          <div style={{ flexGrow: '1' }}></div>
          <Button
            endIcon={<ArrowForward />}
            variant='contained'
            color='secondary'
            style={
              currentIndex === course.topics.length - 1
                ? {}
                : {
                    backgroundColor: '#ff8c00',
                    color: 'black',
                    fontWeight: 'bolder',
                  }
            }
            disabled={currentIndex === course.topics.length - 1}
            onClick={handleNext}
          >
            Topic {currentIndex + 2}
          </Button>
        </Grid>
      )}
      <Grid item xs={12} style={{ minHeight: '60vh' }}>
        <Divider />
        <TopicDetails
          completedTopics={completedTopics}
          setCompletedTopics={setCompletedTopics}
          isCompleted={completedTopics.includes(course.topics[currentIndex].id)}
          topic={course.topics[currentIndex]}
          courseId={course.id}
          moveToNextTopic={handleNext}
          setSubtopicsOpened={setSubtopicsOpened}
        />
      </Grid>
      {!subtopicsOpened && (
        <Grid item xs={12} style={{ display: 'flex', margin: '20px auto' }}>
          <Button
            startIcon={<ArrowBackRounded />}
            variant='contained'
            style={
              currentIndex === 0
                ? {}
                : {
                    backgroundColor: '#ff8c00',
                    color: 'black',
                    fontWeight: 'bolder',
                  }
            }
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((current) => current - 1)}
          >
            Topic {currentIndex + 1}
          </Button>
          <div style={{ flexGrow: '1' }}></div>
          <Button
            endIcon={<ArrowForward />}
            variant='contained'
            style={
              currentIndex === course.topics.length - 1
                ? {}
                : {
                    backgroundColor: '#ff8c00',
                    color: 'black',
                    fontWeight: 'bolder',
                  }
            }
            disabled={currentIndex === course.topics.length - 1}
            onClick={() => setCurrentIndex((current) => current + 1)}
          >
            Topic {currentIndex + 2}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
