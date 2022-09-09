import {
  Button,
  Divider,
  Grid,
  List,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ArrowBackIosOutlined } from '@material-ui/icons';
import { ListItemButton } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import EditTopic from './EditTopic';

function EditTopics({ topics }) {
  const [topicToBeEdited, setTopicToBeEdited] = useState();
  const [topicSelected, setTopicSeleted] = useState(false);
  return (
    <Grid container>
      {topicSelected ? (
        <div>
          <Button
            color='secondary'
            variant='contained'
            startIcon={<ArrowBackIosOutlined />}
            style={{ margin: '20px' }}
            onClick={() => {
              setTopicSeleted(false);
              setTopicToBeEdited(null);
            }}
          >
            Back To Topics
          </Button>
          <EditTopic topic={topicToBeEdited} />
        </div>
      ) : (
        <List title='Click to edit' style={{ width: '100%' }}>
          {topics.map((topic) => (
            <Grid item xs='12'>
              <ListItemButton
                style={{ width: '100%' }}
                onClick={() => {
                  setTopicToBeEdited(topic);
                  setTopicSeleted(true);
                }}
              >
                <ListItemText>
                  <Typography variant='h6'>
                    <span style={{ margin: '10px' }}>{topic.id}.</span>
                    {topic.title}
                  </Typography>
                </ListItemText>
              </ListItemButton>
              <Divider />
            </Grid>
          ))}
        </List>
      )}
    </Grid>
  );
}

export default EditTopics;
