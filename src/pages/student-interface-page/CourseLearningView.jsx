import {
  Divider,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Slide,
  Dialog,
  Container,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Check,
  Close,
} from '@material-ui/icons';
import { ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SubTopicView from './SubTopicView';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function CourseLearningView({ course, userId, userType }) {
  const [subtopicsOpened, setSubtopicsOpened] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState();
  const [subtopicIndex, setSubtopicIndex] = useState(0);
  const [completeTopic, setCompleteTopic] = useState(false);
  const enrollmentDetails = useSelector(
    (state) =>
      state.courseEnrollments.value.filter(
        (item) => item.studentId === userId && item.courseId === course.id
      )[0]
  );
  const [completedTopics, setCompletedTopics] = useState(
    enrollmentDetails === undefined || userType === 'instructor'
      ? []
      : enrollmentDetails.completedTopics
  );

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12}>
        <Typography variant='h4'>{course.title}</Typography>
        <Divider />
      </Grid>
      <Grid item={12} style={{ width: '100%' }}>
        <List>
          {course.topics.map((topic, idx) => (
            <>
              <ListItem
                style={
                  completedTopics.includes(topic.id)
                    ? {
                        width: '100%',
                      }
                    : { width: '100%' }
                }
                key={idx}
              >
                <ListItemButton
                  style={{ width: '100%', display: 'flex' }}
                  onClick={() => {
                    setCompleteTopic(true);
                    setSelectedTopic(topic);
                  }}
                >
                  <ListItemText>
                    <Typography variant='subtitle1'>
                      {idx + 1} - {topic.title}
                    </Typography>
                  </ListItemText>
                  {completedTopics.includes(topic.id) && (
                    <Check
                      style={{
                        color: 'white',
                        backgroundColor: 'green',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Grid>

      {/* Complet Topic view */}
      <Dialog
        open={completeTopic}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
      >
        <Container>
          <DialogTitle
            id='topic'
            style={{
              backgroundColor: 'black',
              color: 'white',
              textAlign: 'center',
              margin: '10px',
            }}
          >
            {completeTopic && selectedTopic.title}
          </DialogTitle>
          <DialogContent>
            {!subtopicsOpened ? (
              <>
                {' '}
                <div
                  style={{
                    margin: '20px',
                    fontFamily: 'monospace',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `${completeTopic && selectedTopic.content}`,
                  }}
                />
                <Grid item xs={12}>
                  <Button
                    endIcon={<ArrowForwardIos />}
                    style={{
                      backgroundColor: '#ff8c00',
                      color: 'black',
                      fontWeight: 'bolder',
                      margin: '10px auto',
                    }}
                    onClick={() => {
                      setSubtopicsOpened(true);
                      document.getElementById('topic').scrollIntoView();
                    }}
                  >
                    Continue
                  </Button>
                  <Divider />
                </Grid>
              </>
            ) : (
              <>
                <SubTopicView
                  subTopic={
                    completeTopic && selectedTopic.subTopics[subtopicIndex]
                  }
                  // key={index}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    onClick={() => {
                      setSubtopicIndex((state) => state - 1);
                      document.getElementById('topic').scrollIntoView();
                    }}
                    disabled={subtopicIndex === 0}
                    style={
                      subtopicIndex === 0
                        ? {}
                        : {
                            color: '#ff8c00',
                            fontWeight: 'bolder',
                          }
                    }
                  >
                    <ArrowBackIos />
                  </Button>
                  <Typography>
                    subtopic {subtopicIndex + 1} of{' '}
                    {completeTopic && selectedTopic.subTopics.length}
                  </Typography>
                  {completeTopic &&
                  subtopicIndex + 1 === selectedTopic.subTopics.length ? (
                    <Button
                      onClick={() => {
                        setCompleteTopic(false);
                        setSubtopicsOpened(false);
                        setSubtopicIndex(0);
                      }}
                      style={{ backgroundColor: '#ff8c00', margin: '10px' }}
                      variant='contained'
                    >
                      Finish
                    </Button>
                  ) : (
                    <Button
                      style={
                        completeTopic &&
                        subtopicIndex + 1 === selectedTopic.subTopics.length
                          ? {}
                          : {
                              color: '#ff8c00',
                              fontWeight: 'bolder',
                            }
                      }
                      onClick={() => {
                        document.getElementById('topic').scrollIntoView();
                        setSubtopicIndex((state) => state + 1);
                      }}
                      disabled={
                        completeTopic &&
                        subtopicIndex + 1 === selectedTopic.subTopics.length
                      }
                    >
                      <ArrowForwardIos />
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
          <DialogActions
            style={{
              margin: 'auto',
            }}
          >
            <Button
              startIcon={<Close />}
              variant='outlined'
              onClick={() => {
                setCompleteTopic(false);
                setSubtopicsOpened(false);
                setSubtopicIndex(0);
              }}
              style={{ margin: 'auto' }}
            >
              Exit
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </Grid>
  );
}
