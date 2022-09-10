import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  List,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ArrowBackIosOutlined, ExpandMore } from '@material-ui/icons';
import { ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import EditSubtopic from './EditSubtopic';

function EditSubtopics({ topics }) {
  const [subtopicToBeEdited, setSubtopicToBeEdited] = useState();
  const [subtopicSelected, setSubtopicSeleted] = useState(false);
  return (
    <>
      {!subtopicSelected ? (
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
                    {topic.subTopics.map((subtopic) => (
                      <Grid item s='12'>
                        <ListItemButton
                          style={{ width: '100%' }}
                          onClick={() => {
                            setSubtopicToBeEdited(subtopic);
                            setSubtopicSeleted(true);
                          }}
                        >
                          <ListItemText>
                            <Typography variant='body1'>
                              {subtopic.title}
                            </Typography>
                          </ListItemText>
                        </ListItemButton>
                        <Divider />
                      </Grid>
                    ))}
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
            style={{ margin: '20px' }}
            onClick={() => {
              setSubtopicSeleted(false);
              setSubtopicToBeEdited(null);
            }}
          >
            Back To Sub-Topics
          </Button>
          <EditSubtopic subtopic={subtopicToBeEdited} />
        </div>
      )}
    </>
  );
}

export default EditSubtopics;
