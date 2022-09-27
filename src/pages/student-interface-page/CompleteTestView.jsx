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

const successMessages = [
  'You have worked so hard for this. Congrats!',
  'This is awesome! You’re awesome! Way to go!',
  'Bet you thought no one would notice you’ve hit your unmatched efforts. Well, I did!',
  'I’m impressed. Congradulations! Keep it up!',
  'Sincere congratulations on your hard-earned success.',
  'I’ve got a feeling this is only the beginning of even more great things to come for you!',
  'Celebrating the record you just set and looking forward to watching you cross your next finish line!',
  'Hurray! Words can’t express how proud I am!',
  'You are proof that good things come to those who are willing to sacrifice to reach a worthwhile goal. ',
  'Nice one! You have the creativity and determination to do whatever you can dream. ',
  'I hope you feel proud today and confident in your ability to rise to your next challenge.',
  'Celebrating the dedication you’ve shown on the way to this achievement. You’ve earned every bit of the success you’re enjoying.',
];

function CompleteTestView({ questions, setQuestions, setCompleteTest }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState([]);
  const [submited, setSubmited] = useState(false);
  const [result, setResult] = useState({});
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(undefined);

  const handleCheckbox = (event, type) => {
    var newValue = event.target.value;
    var isChecked = event.target.checked;

    if (type === 'MULTIPLE' && isChecked && !chosenAnswer.includes(newValue)) {
      chosenAnswer.push(parseInt(newValue));
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
    if (answerType === 'MULTIPLE') {
      const correctAnswers = questions[currentIndex].answers
        .filter((anx) => anx.isCorrect)
        .flatMap((correctAnswer) => correctAnswer.answerId);

      setIsAnswerCorrect(true); // assume is correct

      if (chosenAnswer.length > correctAnswers.lenth) {
        setIsAnswerCorrect(false);
      } else {
        chosenAnswer.map((choice) => {
          if (!correctAnswers.includes(choice)) {
            setIsAnswerCorrect(false);
            return;
          }
        });
      }
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
        style={{
          margin: '20px auto',
          backgroundColor: '#ff8c00',
          fontWeight: 'bolder',
          color: 'black',
        }}
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
                        style={
                          isAnswerCorrect === undefined
                            ? { color: 'grey' }
                            : isAnswerCorrect
                            ? { color: 'green' }
                            : { color: 'red' }
                        }
                        value={answer.answerId}
                        onChange={(event) => handleCheckbox(event, 'MULTIPLE')}
                      />
                    }
                    label={answer.content}
                  />
                ))}
              </FormGroup>
              {isAnswerCorrect === undefined ? (
                ''
              ) : isAnswerCorrect ? (
                <Typography
                  variant='h6'
                  style={{ color: 'green', margin: '20px' }}
                >
                  {
                    successMessages[
                      Math.floor(Math.random() * (successMessages.length - 1))
                    ]
                  }
                </Typography>
              ) : !isAnswerCorrect ? (
                <Typography
                  variant='h5'
                  style={{ color: 'red', margin: '20px' }}
                >
                  Oops! You got this one wrong
                </Typography>
              ) : (
                ''
              )}
              <Button
                fullWidth
                style={
                  submited
                    ? {}
                    : {
                        backgroundColor: '#ff8c00',
                        fontWeight: 'bolder',
                        color: 'black',
                      }
                }
                disabled={submited}
                onClick={() => handleSubmit('MULTIPLE')}
              >
                {submited ? 'Submited' : 'Submit'}
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
          style={
            currentIndex === questions.length - 1 || !submited
              ? {}
              : {
                  backgroundColor: '#ff8c00',
                  fontWeight: 'bolder',
                  color: 'black',
                }
          }
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
