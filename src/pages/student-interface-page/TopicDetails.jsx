import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  makeStyles,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  Divider,
  Grid,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { ExpandMore } from '@mui/icons-material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import YoutubeEmbed from '../../components/YoutubeEmbed';
import { addCompletedTopic } from '../../state/reducers/courseEnrollementReducer';

const useStyles = makeStyles({
  step: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
  },
});

export default function TopicDetails({
  topic,
  isCompleted,
  courseId,
  setRefreshCourseProgress,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.value.id);
  const [isTopicCompleted, setIsTopicCompleted] = useState(isCompleted);
  const [activeStep, setActiveStep] = useState(
    isTopicCompleted ? topic.subTopics.length - 1 : 0
  );

  const handleNext = (isEndOfTopics) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (isEndOfTopics) {
      setIsTopicCompleted(true);
      dispatch(
        addCompletedTopic({
          courseId: courseId,
          studentId: userId,
          topicId: topic.id,
        })
      );
      // TODO: update enrollment details
      // TODO: persist change
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Accordion
      style={
        isTopicCompleted
          ? { width: '100%', border: '1px solid green', margin: '5px auto' }
          : { width: '100%', margin: '5px auto' }
      }
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container>
          <Grid item xs={12} style={{ display: 'flex', direction: 'row' }}>
            {isTopicCompleted ? (
              <Check
                style={{
                  color: 'white',
                  width: '15px',
                  height: '15px',
                  border: '1px solid green',
                  borderRadius: '50%',
                  margin: 'auto 5px',
                  backgroundColor: 'green',
                }}
                fontSize='small'
              />
            ) : (
              ''
            )}
            <Typography
              style={{ width: '100%' }}
              align='left'
              variant={isTopicCompleted ? 'body2' : 'h6'}
            >
              {topic.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {!isTopicCompleted ? (
              <Typography align='left' variant='body2'>
                {topic.description}
              </Typography>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
        <Divider />
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12}>
            {topic.link && <YoutubeEmbed embedId={topic.link} />}
            <div
              style={{
                margin: '16px',
                padding: '5px',
                border: '2px solid grey',
              }}
              className={classes.videoResponsive}
              dangerouslySetInnerHTML={{
                __html: `${topic.content}`,
              }}
            />
            <Typography
              style={{ width: '100%', textAlign: 'center' }}
              variant='h6'
            >
              Lessons
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stepper
              activeStep={activeStep}
              orientation='vertical'
              className={classes.step}
            >
              {topic.subTopics.map((subTopic, index) => (
                <Step key={index}>
                  <StepLabel>{subTopic.title}</StepLabel>
                  <StepContent>
                    <Typography variant='body1'>
                      {subTopic.description}
                    </Typography>

                    {subTopic.link === '' || subTopic.link === null ? (
                      ''
                    ) : (
                      <YoutubeEmbed embedId={subTopic.link} />
                    )}

                    <div
                      className={classes.videoResponsive}
                      dangerouslySetInnerHTML={{
                        __html: `${subTopic.content}`,
                      }}
                    />
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <ButtonGroup style={{ margin: '20px auto' }}>
                          {isTopicCompleted &&
                          index === topic.subTopics.length - 1 ? (
                            ''
                          ) : (
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() =>
                                handleNext(index + 1 == topic.subTopics.length)
                              }
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === topic.subTopics.length - 1
                                ? 'Finish'
                                : 'Next'}
                            </Button>
                          )}
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                            variant='contained'
                            color='secondary'
                          >
                            Back
                          </Button>
                        </ButtonGroup>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
