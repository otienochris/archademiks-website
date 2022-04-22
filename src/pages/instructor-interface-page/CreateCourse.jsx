import { Button, Container, Step, StepLabel, Stepper } from '@material-ui/core';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';

import StageOneOfCourseCreation from './StageOneOfCourseCreation';
import StageTwoOfCourseCreation from './StageTwoOfCourseCreation';
import StageThreeOfCourseCreation from './StageThreeOfCourseCreation';
import StageFourOfCourseCreation from './StageFourOfCourseCreation';
import { useStyles } from './newCourseUseStyles';

const initialCourse = {
  id: 0,
  title: '',
  thumbnail: '',
  description: '',
  rating: 0,
  price: 0,
  category: '',
  numberOfEnrolledStudents: 0,
  link: '',
  topics: [],
};

export default function CreateCourse({ setCreateNewCourse }) {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const [newCourse, setNewCourse] = useState(initialCourse);
  const [isStageOneIsSubmited, setIsStageOneIsSubmited] = useState(false);
  const [isStageTwoIsSubmited, setIsStageTwoIsSubmited] = useState(false);
  const [isStageThreeIsSubmited, setIsStageThreeIsSubmited] = useState(false);
  const [isStageFourIsSubmited, setIsStageFourIsSubmited] = useState(false);

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

  /**
   * This method handles the data submited in stage one of course creation
   * @param data - the sumbited data
   */

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4 ' className={classes.mainTitle}>
            Create New Course:
          </Typography>
          <Stepper activeStep={step} className={classes.stepperSection}>
            {stepsDetails.map((stepItem, index) => (
              <Step key={index}>
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
            <Button
              disabled={
                (!isStageOneIsSubmited && step === 0) ||
                (!isStageTwoIsSubmited && step === 1) ||
                (!isStageThreeIsSubmited && step === 2) ||
                (!isStageFourIsSubmited && step === 3) ||
                step === stepsDetails.length
              }
              className={classes.nextButton}
              variant='contained'
              color='primary'
              onClick={() =>
                step === 3 ? setCreateNewCourse(false) : setStep(step + 1)
              }
              style={
                step === 3
                  ? { backgroundColor: 'green', color: 'whitesmoke' }
                  : {}
              }
            >
              {step === 3 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
