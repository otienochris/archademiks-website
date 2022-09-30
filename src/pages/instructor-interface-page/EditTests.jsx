import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditTest from './EditTest';

function EditTests({ topics }) {
  const [testToBeEdited, setTestToBeEdited] = useState();
  const [isTestSelected, setIsTestSeleted] = useState(false);
  const topicIds = topics.flatMap((topic) => topic.id);
  const tests = useSelector((state) => state.tests.value);

  return (
    <>
      {!isTestSelected ? (
        <div>
          {topics.map((topic) => (
            <Accordion style={{ margin: '5px auto' }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant='h6'>
                  <span style={{ margin: '10px' }}>{topic.id}.</span>
                  {topic.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <List title='Click to edit' style={{ width: '100%' }}>
                    {tests.map((test) =>
                      test.topicId === topic.id ? (
                        <Grid item xs='12' style={{ display: 'flex' }}>
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
          {/* <EditSubtopic subtopic={testToBeEdited} /> */}
          <EditTest test={testToBeEdited} />
        </div>
      )}
    </>
  );
}

export default EditTests;
