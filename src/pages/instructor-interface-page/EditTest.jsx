import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, Edit, Save } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import EditQuestion from './EditQuestion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function EditTest({ test, addAnswerPayload }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openEditPage, setOpenEditPage] = useState(false);
  const [answerType, setAnswerType] = useState('');
  const [editedQuestion, setEditedQuestion] = useState();
  const [editedHint, setHint] = useState();
  const [questionLevel, setQuestionLevel] = useState();

  addAnswerPayload.testId = test.testId;

  const handleEditPageClose = () => {
    setOpenEditPage(false);
  };

  const handleSubmitQuestionChanges = () => {
    console.log(answerType);
    console.log(editedQuestion);
    setOpenEditPage(false);
  };

  return (
    <Grid container>
      <Grid item xs='12' sm='9' md='10'>
        <Divider />
        <div style={{ margin: 'auto', padding: '10px' }}>
          <Typography variant='h6'>{test.title}</Typography>
        </div>
      </Grid>
      <Grid
        item='12'
        sm='3'
        md='2'
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Button
          endIcon={<Save />}
          style={{ color: 'white', backgroundColor: 'green', margin: '5px' }}
        >
          Save Changes
        </Button>
      </Grid>

      <Grid item xs='12' style={{ padding: '5px' }}>
        <Divider />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant='h5'
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              width: '200px',
            }}
          >
            Question {currentIndex + 1} of {test.questions.length}
          </Typography>
          <IconButton
            style={{
              color: 'white',
              backgroundColor: '#ff8c00',
              borderRadius: '50%',
              margin: 'auto 10px',
            }}
            onClick={() => setOpenEditPage(true)}
          >
            <Edit />
          </IconButton>
          <Dialog
            open={openEditPage}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleEditPageClose}
            fullScreen
          >
            <Container
              style={{
                margin: 'auto',
              }}
            >
              <DialogTitle
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  textAlign: 'center',
                  margin: '10px',
                }}
              >
                Edit Question
              </DialogTitle>
              <DialogContent>
                <TextField
                  minRows={5}
                  multiline
                  label='Question Box'
                  placeholder='Enter the question here'
                  variant='outlined'
                  defaultValue={test.questions[currentIndex].question}
                  fullWidth
                  onChange={(event) => setEditedQuestion(event.target.value)}
                  style={{ margin: '20px auto' }}
                />

                <TextField
                  minRows={5}
                  multiline
                  label='Hint Box'
                  placeholder='Enter hints here'
                  variant='outlined'
                  defaultValue={test.questions[currentIndex].hint}
                  fullWidth
                  onChange={(event) => setHint(event.target.value)}
                  style={{ margin: '20px auto' }}
                />

                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <FormControl
                      style={{ minWidth: '200px', margin: '20px auto' }}
                    >
                      <InputLabel id='question-level-label'>
                        Question Level
                      </InputLabel>
                      <Select
                        labelId='question-level-label'
                        id='question-level'
                        value={questionLevel}
                        defaultValue={test.questions[currentIndex].level}
                        label='Question Level'
                        onChange={(event) =>
                          setQuestionLevel(event.target.value)
                        }
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'EASY'}>EASY</MenuItem>
                        <MenuItem value={'MODERATE'}>MODERATE</MenuItem>
                        <MenuItem value={'HARD'}>HARD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <FormControl
                      style={{ minWidth: '200px', margin: '20px auto' }}
                    >
                      <InputLabel id='answer-type-label'>
                        Answer Type
                      </InputLabel>
                      <Select
                        labelId='answer-type-label'
                        id='answer-type'
                        value={answerType}
                        defaultValue={test.questions[currentIndex].answerType}
                        label='Answer type'
                        onChange={(event) => setAnswerType(event.target.value)}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'MULTI_CHOICE'}>MULTI_CHOICE</MenuItem>
                        <MenuItem value={'OPEN_ENDED'}>OPEN_ENDED</MenuItem>
                        <MenuItem value={'SINGLE_CHOICE'}>
                          SINGLE_CHOICE
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider
                  style={{
                    margin: '10px',
                  }}
                />
              </DialogContent>

              <DialogActions
                style={{
                  margin: '10px',
                }}
              >
                <Button
                  variant='outlined'
                  style={{ color: '#ff8c00', borderColor: 'ff8c00' }}
                  onClick={handleSubmitQuestionChanges}
                >
                  Save
                </Button>
                <Button
                  variant='contained'
                  onClick={() => setOpenEditPage(false)}
                  style={{ backgroundColor: '#ff8c00' }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Container>
          </Dialog>
        </div>
        <EditQuestion
          question={test.questions[currentIndex]}
          addAnswerPayload={addAnswerPayload}
        />

        <Divider />
      </Grid>

      <Grid
        item
        xs='12'
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'black',
          padding: '10px',
        }}
      >
        <Button
          onClick={() => setCurrentIndex((state) => state - 1)}
          startIcon={<ArrowBackIos />}
          disabled={currentIndex === 0}
          style={
            currentIndex === 0
              ? { color: 'grey', fontWeight: 'bolder' }
              : {
                  color: '#ff8c00',
                  fontWeight: 'bolder',
                }
          }
        >
          quiz {currentIndex === 0 ? '' : currentIndex}
        </Button>
        <Button
          onClick={() => setCurrentIndex((state) => state + 1)}
          endIcon={<ArrowForwardIos />}
          disabled={test.questions.length - 1 === currentIndex}
          style={
            test.questions.length - 1 === currentIndex
              ? { color: 'grey', fontWeight: 'bolder' }
              : {
                  color: '#ff8c00',
                  fontWeight: 'bolder',
                }
          }
        >
          quiz{' '}
          {test.questions.length - 1 === currentIndex ? '' : currentIndex + 2}
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditTest;
