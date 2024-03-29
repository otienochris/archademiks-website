import {
  Button,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import StageOneOfCourseCreation from './StageOneOfCourseCreation';
import StageTwoOfCourseCreation from './StageTwoOfCourseCreation';
import StageThreeOfCourseCreation from './StageThreeOfCourseCreation';
import StageFourOfCourseCreation from './StageFourOfCourseCreation';
import { useStyles } from './newCourseUseStyles';
import { useDispatch } from 'react-redux';
import { saveCourse } from '../../state/reducers/coursesReducers';

const initialCourse = {
  id: 0,
  title: '',
  thumbnail: '',
  description: '',
  rating: 0,
  price: 0,
  category: '',
  link: '',
  topics: [],
  instructors: [],
};

export default function CreateCourse({ setCreateNewCourse }) {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const [newCourse, setNewCourse] = useState(initialCourse);
  const [isStageOneIsSubmited, setIsStageOneIsSubmited] = useState(false);
  const [isStageTwoIsSubmited, setIsStageTwoIsSubmited] = useState(false);
  const [isStageThreeIsSubmited, setIsStageThreeIsSubmited] = useState(false);
  const [isStageFourIsSubmited, setIsStageFourIsSubmited] = useState(false);
  const dispatch = useDispatch();

  const stepsDetails = [
    {
      title: 'Basic',
      component: (
        <StageOneOfCourseCreation
          classes={classes}
          setNewCourse={setNewCourse}
          newCourse={newCourse}
          setIsStageSubmited={setIsStageOneIsSubmited}
        />
      ),
    },
    {
      title: 'Topics',
      component: (
        <StageTwoOfCourseCreation
          classes={classes}
          setNewCourse={setNewCourse}
          newCourse={newCourse}
          setIsStageSubmited={setIsStageTwoIsSubmited}
        />
      ),
    },
    {
      title: 'Sub-Topics',
      component: (
        <StageThreeOfCourseCreation
          classes={classes}
          newCourse={newCourse}
          setNewCourse={setNewCourse}
          setIsStageSubmited={setIsStageThreeIsSubmited}
        />
      ),
    },
    {
      title: 'Preview',
      component: (
        <StageFourOfCourseCreation
          course={newCourse}
          setIsStageSubmited={setIsStageFourIsSubmited}
        />
      ),
    },
  ];

  const handleComplete = () => {
    setCreateNewCourse(false);
    setStep((current) => current + 1);

    // const courseId = Math.floor(Math.random() * 10);
    newCourse.id = 8;

    dispatch(saveCourse(newCourse));
    // dispatch(enrollCourse({ courseId: 8 }));
    console.log(newCourse);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  /**
   * This method handles the data submited in stage one of course creation
   * @param data - the sumbited data
   */

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} >
          <Stepper activeStep={step} style={{ display: 'flex' }} className={classes.stepperSection}>
            {stepsDetails.map((stepItem, index) => (
              <Step key={index} style={{ color: '#ff8c00' }}>
                <StepLabel>{stepItem.title}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} className={classes.formSection}>
          <div className={classes.form}>{stepsDetails[step].component}</div>
          <div className={classes.backNextButtonsSections}>
            <Button
              disabled={step === 0}
              className={classes.backButton}
              variant='contained'
              color='primary'
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
            {step < 3 ? (
              <Button
                disabled={
                  (!isStageOneIsSubmited && step === 0) ||
                  (!isStageTwoIsSubmited && step === 1) ||
                  (!isStageThreeIsSubmited && step === 2) ||
                  (!isStageFourIsSubmited && step === 3)
                  // || step >= 3
                }
                className={classes.nextButton}
                variant='contained'
                color={'primary'}
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                color='secondary'
                onClick={handleComplete}
                variant='contained'
              >
                Complete
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
