import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItemText,
  Slide,
  Typography,
} from '@material-ui/core';
import { ArrowBackIosOutlined } from '@material-ui/icons';
import { ListItemButton } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import EditTopic from './EditTopic';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function EditTopics({ topics }) {
  const [openEditPage, setOpenEditPage] = useState(false);
  const [topicToBeEdited, setTopicToBeEdited] = useState();
  const [topicSelected, setTopicSeleted] = useState(false);
  return (
    <Grid container>
      <List title='Click to edit' style={{ width: '100%' }}>
        {topics.map((topic, idx) => (
          <Grid item xs={12} key={idx}>
            <ListItemButton
              style={{ width: '100%' }}
              onClick={() => {
                console.log(topic);
                setTopicToBeEdited(topic);
                setTopicSeleted(true);
                setOpenEditPage(true);
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

      <Dialog
        open={openEditPage}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleEditPageClose}
        fullScreen
      >
        <Container>
          <DialogTitle
            style={{
              backgroundColor: 'black',
              color: 'white',
              textAlign: 'center',
              margin: '10px',
            }}
          >
            Edit Topic
          </DialogTitle>
          <DialogContent>
            {topicSelected && <EditTopic topic={topicToBeEdited} />}
          </DialogContent>
          <DialogActions
            style={{
              margin: '10px',
            }}
          >
            <Button
              variant='contained'
              onClick={() => {
                setTopicSeleted(false);
                setOpenEditPage(false);
              }}
              style={{ backgroundColor: '#ff8c00' }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </Grid>
  );
}

export default EditTopics;
