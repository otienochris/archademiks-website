import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  ArrowBackIosOutlined,
  Delete,
  Edit,
  ExpandMore,
} from '@material-ui/icons';
import { ListItemButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LMS_COURSES } from '../../commons/urls';
import EditTest from './EditTest';

function EditTests({ courseId }) {
  const [testToBeEdited, setTestToBeEdited] = useState();
  const [isTestSelected, setIsTestSeleted] = useState(false);
  const tests = useSelector((state) => state.tests.value);
  const [addAnswerPayload, setAddAnswerPayload] = useState({
    testId: 0,
    questionId: 0,
    answer: {},
  });
  const token = useSelector((state) => state.login.value.token);
  const [allTopics, setAllTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTopics = async () => {
    await fetch(LMS_COURSES + "/" + courseId + "/topics", {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setIsLoading(false);
        if (response.status >= 200 && response.status < 300) {

        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAllTopics(data._embedded.topicDtoList)
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error)
      });
  }

  useEffect(() => {
    getTopics();
  }, [courseId])



  return (
    <>
      {isLoading ? <CircularProgress /> : !isTestSelected ? (
        <div>
          {allTopics.map((topic, idx) => (
            <Accordion key={idx} style={{ margin: '5px auto' }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant='h6'>
                  <span style={{ margin: '10px' }}>{idx + 1}.</span>
                  {topic.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <List title='Click to edit' style={{ width: '100%' }}>
                    {tests.map((test, idx) =>
                      test.topicId === topic.id ? (
                        <Grid
                          key={idx}
                          item
                          xs='12'
                          style={{ display: 'flex' }}
                        >
                          <div
                            style={{
                              border: '1px solid grey',
                              display: 'flex',
                            }}
                          >
                            <IconButton>
                              <Delete
                                style={{
                                  color: 'red',
                                  border: '1px solid red',
                                  borderRadius: '50%',
                                }}
                              />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setTestToBeEdited(test);
                                setIsTestSeleted(true);
                              }}
                            >
                              <Edit
                                style={{
                                  color: 'grey',
                                  border: '1px solid grey',
                                  borderRadius: '50%',
                                }}
                              />
                            </IconButton>
                          </div>
                          <ListItemButton
                            style={{ width: '100%', border: '1px solid grey' }}
                            onClick={() => {
                              setTestToBeEdited(test);
                              setIsTestSeleted(true);
                            }}
                          >
                            <ListItemText>
                              <Typography variant='body1'>
                                {test.title}
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                          <Divider />
                        </Grid>
                      ) : (
                        ''
                      )
                    )}
                  </List>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ) : (
        <div>
          <Button
            color='secondary'
            variant='contained'
            startIcon={<ArrowBackIosOutlined />}
            style={{
              margin: '20px',
              backgroundColor: '#ff8c00',
              color: 'black',
              fontWeight: 'bolder',
            }}
            onClick={() => {
              setIsTestSeleted(false);
              setTestToBeEdited(null);
            }}
          >
            all tests per topic
          </Button>
          <EditTest test={testToBeEdited} addAnswerPayload={addAnswerPayload} />
        </div>
      )}
    </>
  );
}

export default EditTests;
