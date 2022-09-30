import { IconButton, Typography } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import React from 'react';
import EditAnswers from './EditAnswers';

function EditQuestion({ question }) {
  return (
    <>
      <Typography variant='body1' style={{ margin: '5px' }}>
        {question.question}
      </Typography>
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
        >
          <Add />
        </IconButton>
      </div>
      <EditAnswers answers={question.answers} />
    </>
  );
}

export default EditQuestion;
