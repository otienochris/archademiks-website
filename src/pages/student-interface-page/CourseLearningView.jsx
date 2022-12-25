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
  CircularProgress,
} from '@material-ui/core';
import {
  ArrowBack,
  ArrowBackIos,
  ArrowForwardIos,
  Check,
  Close,
} from '@material-ui/icons';
import { ListItemButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LMS_COURSES, LMS_COURSE_ENROLLMENTS } from '../../commons/urls';
import SubTopicView from './SubTopicView';
import { ROLES } from '../../commons/roles';
import { toast } from 'react-toastify';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function CourseLearningView({ course, currentCourseEnrollment, setRefresh }) {
  const [subtopicsOpened, setSubtopicsOpened] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState();
  const [subtopicIndex, setSubtopicIndex] = useState(0);
  const [completeTopic, setCompleteTopic] = useState(false);
  const [courseEnrollment, setCourseEnrollment] = useState(currentCourseEnrollment);
  const token = useSelector((state) => state.login.value.token);
  const [allTopics, setAllTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const role = useSelector(state => state.login.value.role);
  const [currentCourse] = useState(course);


  useEffect(() => { }, [courseEnrollment])

  const completeSubtopic = async () => {

    const subTopicId = selectedTopic.subTopics[subtopicIndex].subTopicId;

    await fetch(LMS_COURSE_ENROLLMENTS + "/" + courseEnrollment.courseEnrollmentId + "/complete-subtopic/" + subTopicId, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {

        if (response.status >= 200 && response.status < 300) {
          setRefresh(state => !state)

          toast.success("Subtopic completed successfully", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          response.json()
            .then(data => {
              setCourseEnrollment(data)
              console.log(data);
            })
        } else {
          response.json()
            .then(data => {
              // toast.error(data.message, {
              //   position: toast.POSITION.BOTTOM_RIGHT
              // });
              console.log(data)
            })
        }
      }).catch(error => console.log(error))
      .finally(() => setRefresh(state => !state));
  }

  const getTopics = async () => {
    await fetch(LMS_COURSES + "/" + currentCourse.courseId + "/topics", {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          response.json()
            .then((data) => {
              setAllTopics(data._embedded.topicDtoList)
            })
        } else {
          response.json()
            .then((data) => {
              alert(data.message)
            })
        }
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setIsLoading(false);
      })

  }

  useEffect(() => {
    getTopics();
  }, [currentCourse])

  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12}>
          <Typography variant='h4'>{currentCourse.title}</Typography>
          <Divider />
        </Grid>
        <Grid item={12} style={{ width: '100%' }}>
          {isLoading ? <CircularProgress /> : <List>
            {allTopics.map((topic, idx) => (
              <div key={idx}>
                <ListItem
                  style={
                    { width: '100%' }
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
                  </ListItemButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>}
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
                margin: '10px',
                width: '100%',
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row'
              }}>

                <Button
                  startIcon={<ArrowBack />}
                  variant='contained'
                  style={{
                    backgroundColor: '#ff8c00',
                    color: 'black',
                    fontWeight: 'bolder',
                    margin: '10px auto',
                    padding: '10px',
                    width: '120px'
                  }}
                  onClick={() => {
                    setCompleteTopic(false);
                    setSubtopicsOpened(false);
                    setSubtopicIndex(0);
                  }}
                >
                  Back
                </Button>
                <Typography variant='h4' style={{ flexGrow: 1, backgroundColor: 'black', color: 'white', padding: '20px', marginLeft: '5px' }} align='center'>{completeTopic && selectedTopic.title}</Typography>

              </div>
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
                        padding: '10px',
                        width: '120px'
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

                    isCompleted={Object.values(courseEnrollment.completedTopics).flatMap(id => id).includes(selectedTopic.subTopics[subtopicIndex].subTopicId)}
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
                          if (role == ROLES.STUDENT) {
                            completeSubtopic();
                          }
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
                          if (role == ROLES.STUDENT) {
                            completeSubtopic();
                          }
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

    </>
  );
}
