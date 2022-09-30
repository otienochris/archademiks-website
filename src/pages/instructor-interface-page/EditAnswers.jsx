import { IconButton, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';

function EditAnswers({ answers }) {
  return (
    <>
      {answers.map((answer) => (
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
          <IconButton>
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
