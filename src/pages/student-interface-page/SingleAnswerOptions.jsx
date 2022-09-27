import { List, makeStyles, Typography } from '@material-ui/core';
import { ListItemButton } from '@mui/material';
import React from 'react';
import { useState } from 'react';

function SingleAnswerOptions({ submited, answers, setChosenAnswer }) {
  const [selected, setSelected] = useState();
  return (
    <List>
      {answers.map((answer, idx) => (
        <ListItemButton
          key={idx}
          disabled={selected !== answer.answerId && submited}
          style={
            selected === answer.answerId && submited && answer.isCorrect
              ? {
                  border: '4px solid green',
                  color: 'green',
                }
              : selected === answer.answerId && submited && !answer.isCorrect
              ? {
                  border: '4px solid red',
                  color: 'red',
                }
              : selected === answer.answerId
              ? {
                  //   backgroundColor: 'black',
                  //   color: 'white',
                  border: '4px solid grey',
                  margin: '20px auto',
                }
              : {
                  border: '1px solid grey',
                  margin: '20px auto',
                }
          }
          onClick={() => {
            setSelected(answer.answerId);
            setChosenAnswer([answer.answerId]);
          }}
        >
          <Typography variant='subtitle1'>
            {idx + 1} {answer.content}
          </Typography>
        </ListItemButton>
      ))}
    </List>
  );
}

export default SingleAnswerOptions;
