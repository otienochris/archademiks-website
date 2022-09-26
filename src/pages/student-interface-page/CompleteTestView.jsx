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
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useState } from 'react';

function CompleteTestView({ questions, setQuestions, setCompleteTest }) {
  const handleChange = (event) => {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((state) => state + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((state) => state - 1);
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
      <Grid container>
        <Grid item xs='12'>
          <Typography variant='subtitle1'>
            {questions[currentIndex].question}
          </Typography>
          {questions[currentIndex].answerType === 'MULTIPLE' ? (
            <FormControl>
              <FormGroup>
                {questions[currentIndex].answers.map((answer, idx) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={idx}
                        onChange={handleChange}
                        name={idx}
                      />
                    }
                    label={answer.content}
                  />
                ))}
              </FormGroup>
            </FormControl>
          ) : (
            <FormControl>
              <RadioGroup name='single-answers-radio-buttons'>
                {questions[currentIndex].answers.map((answer, idx) => (
                  <FormControlLabel
                    control={<Radio />}
                    value={idx}
                    label={answer.content}
                    key={idx}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
          <Divider style={{ margin: '20px auto' }} />
        </Grid>
      </Grid>
      <Grid
        item
        xs='12'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          color='secondary'
          variant='outlined'
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Prev
        </Button>
        <Button
          color='secondary'
          variant='contained'
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </Button>
      </Grid>
    </Container>
  );
}

export default CompleteTestView;
