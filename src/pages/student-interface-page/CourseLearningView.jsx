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
  CheckBox,
  CheckBoxOutlineBlank,
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
  const [completedTopics, setCompletedTopics] = useState(currentCourseEnrollment == undefined || currentCourseEnrollment.completedTopicsIds == undefined || currentCourseEnrollment.completedTopicsIds == null ? [] : currentCourseEnrollment.completedTopicsIds)
  const [completedSubTopics, setCompletedSubTopics] = useState(currentCourseEnrollment == undefined || currentCourseEnrollment.completedSubTopicsIds == null || currentCourseEnrollment.completedSubTopicsIds == undefined ? {} : currentCourseEnrollment.completedSubTopicsIds)

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
          <Typography variant='h4' style={{ padding: '10px', backgroundColor: 'black', color: 'white' }}>{currentCourse.title}</Typography>
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
                    {completedTopics.includes(topic.topicId) ? <CheckBox style={{ color: 'green', margin: 'auto 15px auto 0px' }} /> : <CheckBoxOutlineBlank style={{ color: 'grey', margin: 'auto 15px auto 0px' }} />}
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
                // width: '100%',
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>

                <Button
                  startIcon={<ArrowBack />}
                  variant='text'
                  style={{
                    color: 'maroon',
                    fontWeight: 'bolder',
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '220px'
                  }}
                  onClick={() => {
                    setCompleteTopic(false);
                    setSubtopicsOpened(false);
                    setSubtopicIndex(0);
                  }}
                >
                  back to all topics
                </Button>
                <Typography variant='h5' style={{ flexGrow: 1, backgroundColor: 'black', color: 'white', padding: '10px', marginLeft: '5px' }} align='center'>{completeTopic && selectedTopic.title}</Typography>

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
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                      endIcon={<ArrowForwardIos />}
                      style={{
                        color: 'maroon',
                        fontWeight: 'bolder',
                      }}
                      onClick={() => {
                        setSubtopicsOpened(true);
                        document.getElementById('topic').scrollIntoView();
                      }}
                    >
                      Proceed to subtopics
                    </Button>
                    <Divider />
                  </Grid>
                </>
              ) : (
                <>
                  <SubTopicView

                    isCompleted={Object.keys(completedSubTopics).length == 0 ? false : Object.values(completedSubTopics).flatMap(id => id).includes(selectedTopic.subTopics[subtopicIndex].subTopicId)}
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
                          if (role == ROLES.STUDENT && !(Object.keys(completedSubTopics).length == 0 ? false : Object.values(completedSubTopics).flatMap(id => id).includes(selectedTopic.subTopics[subtopicIndex].subTopicId))) {
                            {
                              completeSubtopic();
                            }
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

          </Container>
        </Dialog>
      </Grid>

    </>
  );
}
