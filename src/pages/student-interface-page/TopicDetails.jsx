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
  IconButton,
} from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, Check } from '@material-ui/icons';
import { ExpandMore } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import YoutubeEmbed from '../../components/YoutubeEmbed';
import { addCompletedTopic } from '../../state/reducers/courseEnrollementReducer';
import SubTopicView from './SubTopicView';

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
  tab: {
    backgroundColor: 'black',
    color: 'whitesmoke',
    padding: '10px',
    width: '130px',
    marginLeft: '20px',
  },
});

export default function TopicDetails({
  topic,
  isCompleted,
  courseId,
  completedTopics,
  setCompletedTopics,
  moveToNextTopic,
  setSubtopicsOpened,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.value.id);
  const [activeStep, setActiveStep] = useState(0);
  // const [activeStep, setActiveStep] = useState(
  //   isCompleted ? topic.subTopics.length - 1 : 0
  // );
  const [isTopicCompleted, setIsTopicCompleted] = useState();
  const [subtopicIndex, setSubtopicIndex] = useState(0);
  const [openSubtopics, setOpenSubtopis] = useState(false);

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

      // move top
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      {!openSubtopics ? (
        <Accordion
          style={
            isCompleted || isTopicCompleted ? { border: '1px solid green' } : {}
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
                  variant={'h6'}
                >
                  {topic.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align='left' variant='body2'>
                  {topic.description}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant='body1'
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
                    margin: '20px',
                    // padding: '5px',
                    // border: '2px solid grey',
                    // padding: '30px 5px 30px 30px',
                    fontFamily: 'monospace',
                  }}
                  className={classes.videoResponsive}
                  dangerouslySetInnerHTML={{
                    __html: `${topic.content}`,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  endIcon={<ArrowForwardIos />}
                  fullWidth
                  style={{
                    backgroundColor: '#ff8c00',
                    color: 'black',
                    fontWeight: 'bolder',
                  }}
                  onClick={() => {
                    setSubtopicsOpened(true);
                    setOpenSubtopis(true);
                  }}
                >
                  Next (subtopics)
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <div
            style={{
              backgroundColor: 'black',
              color: 'whitesmoke',
              padding: '20px',
              display: 'flex',
              marginTop: '20px',
            }}
          >
            <Grid item xs='6'>
              <Button
                id='backToTopicButton'
                startIcon={openSubtopics ? <ArrowBackIos /> : undefined}
                style={{
                  backgroundColor: '#ff8c00',
                  color: 'black',
                  fontWeight: 'bolder',
                }}
                onClick={() => {
                  setSubtopicsOpened(false);
                  setOpenSubtopis(false);
                }}
              >
                Topics
              </Button>
            </Grid>
            <Grid container>
              <Grid item xs='12' sm='6'>
                <Typography
                  align='center'
                  variant='body1'
                  style={{ flexGrow: '1' }}
                >
                  Sub-topics
                </Typography>
              </Grid>
              <Grid item xs='12' sm='6'>
                <Typography align='center'>
                  {subtopicIndex + 1} of {topic.subTopics.length}
                </Typography>
              </Grid>
            </Grid>
          </div>

          <SubTopicView
            subTopic={topic.subTopics[subtopicIndex]}
            // key={index}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => {
                setSubtopicIndex((state) => state - 1);
                document.getElementById('backToTopicButton').scrollIntoView();
              }}
              disabled={subtopicIndex === 0}
              style={
                subtopicIndex === 0
                  ? {}
                  : {
                      // backgroundColor: '#ff8c00',
                      color: '#ff8c00',
                      fontWeight: 'bolder',
                    }
              }
            >
              <ArrowBackIos />
              <Typography variant='h6'>Prev</Typography>
            </IconButton>
            <Typography>
              subtopic {subtopicIndex + 1} of {topic.subTopics.length}
            </Typography>
            <IconButton
              style={
                subtopicIndex === 0
                  ? {}
                  : {
                      // backgroundColor: '#ff8c00',
                      color: '#ff8c00',
                      fontWeight: 'bolder',
                    }
              }
              onClick={() => {
                document.getElementById('backToTopicButton').scrollIntoView();
                setSubtopicIndex((state) => state + 1);
              }}
              disabled={subtopicIndex + 1 === topic.subTopics.length}
            >
              <Typography>Next</Typography>
              <ArrowForwardIos />
            </IconButton>
          </div>
        </>
      )}{' '}
    </>
  );
}
