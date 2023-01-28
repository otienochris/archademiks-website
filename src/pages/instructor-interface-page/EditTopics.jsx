import {
  Button,
  CircularProgress,
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
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LMS_COURSES } from '../../commons/urls';
import EditTopic from './EditTopic';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function EditTopics({ courseId }) {
  const [openEditPage, setOpenEditPage] = useState(false);
  const [topicToBeEdited, setTopicToBeEdited] = useState();
  const [topicSelected, setTopicSeleted] = useState(false);
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
  }, [courseId, isLoading])


  return (
    <Grid container>
      {isLoading ? <CircularProgress /> : <List title='Click to edit' style={{ width: '100%' }}>
        {allTopics.map((topic, idx) => (
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
                  <span style={{ margin: '10px' }}>{idx + 1}.</span>
                  {topic.title}
                </Typography>
              </ListItemText>
            </ListItemButton>
            <Divider />
          </Grid>
        ))}
      </List>
      }

      {/* edit a topic */}
      <Dialog
        open={openEditPage}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleEditPageClose}
        fullScreen
      >
        <Container>
          <DialogTitle
          >
            <Button
              variant='text'
              startIcon={<ArrowBackIosOutlined />}
              onClick={() => {
                setTopicSeleted(false);
                setOpenEditPage(false);
              }}
              style={{ color: 'maroon', fontWeight: 'bolder', marginBottom: '10px' }}
            >
              Back to all topics
            </Button>
            <Typography
              variant='h5'
              style={{
                backgroundColor: 'black',
                color: 'white',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              Edit Topic
            </Typography>
          </DialogTitle>
          <DialogContent>
            {topicSelected && <EditTopic setOpenEditPage={setOpenEditPage} setIsLoading={setIsLoading} topic={topicToBeEdited} />}
          </DialogContent>
        </Container>
      </Dialog>
    </Grid>
  );
}

export default EditTopics;
