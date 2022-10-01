import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemText,
  Slide,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add, ExpandMore } from '@material-ui/icons';
import { ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import AddNewSubtopic from './AddNewSubtopic';
import EditSubtopic from './EditSubtopic';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function EditSubtopics({ topics, courseId }) {
  const [openEditPage, setOpenEditPage] = useState(false);
  const [subtopicToBeEdited, setSubtopicToBeEdited] = useState();
  const [subtopicSelected, setSubtopicSeleted] = useState(false);
  const [addNewSubtopic, setAddNewSubtopic] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState();
  return (
    <>
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
              <Grid item xs={12}>
                <Tooltip title='Add new subtopic'>
                  <IconButton
                    style={{
                      backgroundColor: '#ff8c00',
                      color: 'white',
                      margin: 'auto 10px',
                      margin: '10px',
                    }}
                    onClick={() => {
                      setAddNewSubtopic(true);
                      setSelectedTopic(topic);
                      console.log(topic);
                    }}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
                <Divider />
              </Grid>
              <List title='Click to edit' style={{ width: '100%' }}>
                {topic.subTopics.map((subtopic) => (
                  <Grid item s='12'>
                    <ListItemButton
                      style={{ width: '100%' }}
                      onClick={() => {
                        setSubtopicToBeEdited(subtopic);
                        setSubtopicSeleted(true);
                        setOpenEditPage(true);
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

      {/* edit subtopic */}
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
            Edit Sub-topic
          </DialogTitle>
          <DialogContent>
            {subtopicSelected && <EditSubtopic subtopic={subtopicToBeEdited} />}
          </DialogContent>
          <DialogActions
            style={{
              margin: '10px',
            }}
          >
            <Button
              variant='contained'
              onClick={() => {
                setSubtopicSeleted(false);
                setOpenEditPage(false);
              }}
              style={{ backgroundColor: '#ff8c00' }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Container>
      </Dialog>

      {/* add new sub topic */}
      <Dialog
        open={addNewSubtopic}
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
            Add Sub-topic
          </DialogTitle>
          <DialogContent>
            {addNewSubtopic && <AddNewSubtopic topicId={selectedTopic.id} />}
          </DialogContent>
          <DialogActions
            style={{
              margin: '10px',
            }}
          >
            <Button
              variant='contained'
              onClick={() => {
                setAddNewSubtopic(false);
              }}
              style={{ backgroundColor: '#ff8c00' }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </>
  );
}

export default EditSubtopics;
