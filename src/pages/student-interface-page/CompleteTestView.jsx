import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import {
  ArrowCircleLeftTwoTone,
  ArrowCircleRightTwoTone,
} from '@mui/icons-material';
import React, { useState } from 'react';
import SingleAnswerOptions from './SingleAnswerOptions';

function CompleteTestView({ questions, setQuestions, setCompleteTest }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState([]);
  const [submited, setSubmited] = useState(false);
  const [result, setResult] = useState({});

  const handleCheckbox = (event, type) => {
    var newValue = event.target.value;
    var isChecked = event.target.checked;

    if (type === 'MULTIPLE' && isChecked && !chosenAnswer.includes(newValue)) {
      chosenAnswer.push(newValue);
    }

    if (type === 'MULTIPLE' && !isChecked) {
      const idx = chosenAnswer.indexOf(newValue);
      chosenAnswer.splice(idx, 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex((state) => state + 1);
    setSubmited(false);
  };

  const handleSubmit = (answerType) => {
    console.log(chosenAnswer);
    if ('MULTIPLE') {
    } else {
    }
    setSubmited(true);
  };
  return (
    <Container style={{ minHeight: '93.5vh' }}>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          setCompleteTest(false);
        }}
        startIcon={<ArrowBack />}
        style={{ margin: '20px auto' }}
      >
        Back to tests
      </Button>
      <Divider />
      <Grid container>
        <Grid item xs='12'>
          <Typography variant='h6'>Question {currentIndex + 1} </Typography>
          <Typography variant='subtitle1' style={{ margin: '20px' }}>
            {questions[currentIndex].question}
          </Typography>
          {questions[currentIndex].answerType === 'MULTIPLE' ? (
            <div>
              <Typography variant='h6'>Choose Multiple Answers: </Typography>
              <FormGroup style={{ margin: '20px' }}>
                {questions[currentIndex].answers.map((answer, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        value={answer.answerId}
                        onChange={(event) => handleCheckbox(event, 'MULTIPLE')}
                      />
                    }
                    label={answer.content}
                  />
                ))}
              </FormGroup>
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                disabled={submited}
                onClick={() => handleSubmit('MULTIPLE')}
              >
                Submit
              </Button>
            </div>
          ) : (
            <Grid item xs='12'>
              <Typography variant='h6'>Choose One Answer below: </Typography>
              <SingleAnswerOptions
                setChosenAnswer={setChosenAnswer}
                answers={questions[currentIndex].answers}
                submited={submited}
              />
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                disabled={submited}
                onClick={() => handleSubmit('SINGLE')}
              >
                {submited ? 'Submited' : 'Submit'}
              </Button>
            </Grid>
          )}

          <Divider style={{ margin: '20px auto' }} />
        </Grid>
      </Grid>
      <Grid
        item
        xs='12'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div></div>
        <Button
          color='primary'
          variant='contained'
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1 || !submited}
          endIcon={<ArrowCircleRightTwoTone />}
        >
          Next
        </Button>
      </Grid>
    </Container>
  );
}

export default CompleteTestView;
