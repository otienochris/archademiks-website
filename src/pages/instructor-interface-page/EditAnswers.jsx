import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add, Cancel, Delete, Edit, Save } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnswerAction } from '../../state/reducers/testsReducer';

function EditAnswers({ answers, addAnswerPayload }) {
  const [allAnswers, setAllAnswers] = useState(answers);
  const [addAnswer, setAddAnswer] = useState(false);
  const [newAnswer, setNewAnswer] = useState();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const dispatch = useDispatch();

  const handleSaveNewAnswer = () => {
    const max = answers
      .flatMap((anx) => anx.answerId)
      .reduce((a, b) => (a > b ? a : b));

    const newAnswerCompiled = {
      answerId: max + 1,
      content: newAnswer,
      isCorrect: isAnswerCorrect,
    };

    var xy = allAnswers.map((item) => item);
    xy.push(newAnswerCompiled);

    setAllAnswers(xy);

    addAnswerPayload.answer = newAnswerCompiled;

    dispatch(addAnswerAction(addAnswerPayload));

    setAddAnswer(false);
  };
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '200px',
            // height: '40px',
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          <Typography align='center' variant='h5' style={{ padding: '10px' }}>
            Answers
          </Typography>
        </div>
        <IconButton
          style={{
            backgroundColor: '#ff8c00',
            color: 'white',
            margin: 'auto 10px',
          }}
          onClick={() => setAddAnswer((state) => !state)}
        >
          <Add />
        </IconButton>
      </div>

      {addAnswer && (
        <Grid item xs={12}>
          <FormControlLabel
            style={{ marginLeft: '10px' }}
            control={
              <Checkbox
                style={{ color: '#ff8c00' }}
                onChange={(event) => setIsAnswerCorrect(event.target.checked)}
              />
            }
            label='Correct answer'
          />
          <TextField
            style={{
              margin: '10px 0px 10px 10px',
              borderRadius: '10px',
            }}
            label='New Answer'
            placeholder='add new answer'
            variant='outlined'
            fullWidth
            onChange={(event) => setNewAnswer(event.target.value)}
            InputProps={{
              endAdornment: (
                <>
                  <Tooltip title='Save the new answer'>
                    <IconButton onClick={handleSaveNewAnswer}>
                      <Save fontSize='large' style={{ color: '#ff8c00' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Cancel'>
                    <IconButton onClick={() => setAddAnswer(false)}>
                      <Cancel style={{ color: 'red' }} />
                    </IconButton>
                  </Tooltip>
                </>
              ),
            }}
          />
        </Grid>
      )}
      {allAnswers.map((answer) => (
        <div
          style={
            answer.isCorrect
              ? {
                  border: '4px solid green',
                  display: 'flex',
                  margin: '5px 10px',
                  borderRadius: '10px',
                }
              : {
                  border: '1px solid grey',
                  display: 'flex',
                  margin: '5px 10px',
                  borderRadius: '10px',
                }
          }
        >
          <IconButton
            onClick={() =>
              setAllAnswers((state) =>
                state.filter((item) => item.answerId !== answer.answerId)
              )
            }
          >
            <Delete
              style={{
                color: 'red',
                border: '1px solid red',
                borderRadius: '50%',
              }}
            />
          </IconButton>
          <IconButton>
            <Edit
              style={{
                color: 'grey',
                border: '1px solid grey',
                borderRadius: '50%',
              }}
            />
          </IconButton>
          <div style={{ margin: 'auto auto auto 10px' }}>
            <Typography variant='subtitle1'>{answer.content}</Typography>
          </div>
        </div>
      ))}
    </>
  );
}

export default EditAnswers;
