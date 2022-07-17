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
import React, { useEffect, useState } from 'react';
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
  titles: {
    marginLeft: '20px',
    fontFamily: 'monospace',
    backgroundColor: 'orange',
  },
});

export default function TopicDetails({
  topic,
  isCompleted,
  courseId,
  completedTopics,
  setCompletedTopics,
  moveToNextTopic,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.value.id);
  const [activeStep, setActiveStep] = useState(0);
  // const [activeStep, setActiveStep] = useState(
  //   isCompleted ? topic.subTopics.length - 1 : 0
  // );
  const [isTopicCompleted, setIsTopicCompleted] = useState();

  useEffect(() => {
    setIsTopicCompleted(isCompleted);
    setActiveStep(0);
  }, [isCompleted, topic]);

  const handleNext = (isEndOfTopics) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (isEndOfTopics) {
      dispatch(
        addCompletedTopic({
          courseId: courseId,
          studentId: userId,
          topicId: topic.id,
        })
      );
      // setIsTopicCompleted(true);
      const topics = completedTopics.filter((item) => true);
      topics.push(parseInt(topic.id));
      setCompletedTopics(topics);
      moveToNextTopic();
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
        isCompleted || isTopicCompleted
          ? { width: '100%', border: '1px solid green', margin: '5px auto' }
          : { width: '100%', margin: '5px auto' }
      }
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container>
          <Grid item xs={12} style={{ display: 'flex', direction: 'row' }}>
            {isCompleted ? (
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
              variant={isCompleted ? 'body2' : 'h6'}
            >
              {topic.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {!isCompleted ? (
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
            <Typography
              variant='h5'
              style={{
                backgroundColor: 'black',
                color: 'whitesmoke',
                padding: '20px',
              }}
            >
              Introduction:
            </Typography>
            <hr />
            <div
              style={{
                margin: '16px',
                padding: '5px',
                // border: '2px solid grey',
                padding: '30px 5px 30px 30px',
                fontFamily: 'monospace',
              }}
              className={classes.videoResponsive}
              dangerouslySetInnerHTML={{
                __html: `${topic.content}`,
              }}
            />
            <Typography
              variant='h5'
              style={{
                backgroundColor: 'black',
                color: 'whitesmoke',
                padding: '20px',
              }}
            >
              Sub-topic(s)
            </Typography>
            <hr />
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
                    <Typography
                      variant='subtitle1'
                      style={{
                        backgroundColor: 'black',
                        color: 'whitesmoke',
                        padding: '10px',
                      }}
                    >
                      Description:
                    </Typography>
                    <Typography
                      variant='body1'
                      style={{ fontFamily: 'monospace', padding: '20px' }}
                    >
                      {subTopic.description}
                    </Typography>

                    <Typography
                      variant='subtitle1'
                      style={{
                        backgroundColor: 'black',
                        color: 'whitesmoke',
                        padding: '10px',
                      }}
                    >
                      Video:
                    </Typography>
                    <div style={{ margin: '20px' }}>
                      {subTopic.link === '' || subTopic.link === null ? (
                        <Typography variant='body1' align='center'>
                          Video Not Available
                        </Typography>
                      ) : (
                        <YoutubeEmbed embedId={subTopic.link} />
                      )}
                    </div>

                    <Typography
                      variant='subtitle1'
                      style={{
                        backgroundColor: 'black',
                        color: 'whitesmoke',
                        padding: '10px',
                      }}
                    >
                      Content:
                    </Typography>
                    <div
                      style={{
                        margin: '16px',
                        border: '2px solid grey',
                        padding: '30px',
                        fontFamily: 'monospace',
                      }}
                      className={classes.videoResponsive}
                      dangerouslySetInnerHTML={{
                        __html: `${subTopic.content}`,
                      }}
                    />
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <ButtonGroup style={{ margin: '20px auto' }}>
                          {isCompleted &&
                          index === topic.subTopics.length - 1 ? (
                            ''
                          ) : (
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() =>
                                handleNext(index + 1 === topic.subTopics.length)
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
