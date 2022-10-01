import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import EditAnswers from './EditAnswers';

function EditQuestion({ question, addAnswerPayload }) {
  addAnswerPayload.questionId = question.questionId;

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={'auto'}>
          <Typography
            align='center'
            style={
              question.level === 'EASY'
                ? {
                    backgroundColor: '#0CF574',
                    border: '2px solid #0CF574',
                    borderRadius: '10px',
                    color: 'black',
                    fontWeight: 'bolder',
                    margin: '10px',
                    padding: '10px',
                  }
                : question.level === 'MODERATE'
                ? {
                    backgroundColor: '#FFD166',
                    border: '2px solid #FFD166',
                    borderRadius: '10px',
                    color: 'black',
                    fontWeight: 'bolder',
                    margin: '10px',
                    padding: '10px',
                  }
                : {
                    backgroundColor: '#F71735',
                    border: '2px solid #F71735',
                    borderRadius: '10px',
                    color: 'black',
                    fontWeight: 'bolder',
                    margin: '10px',
                    padding: '10px',
                  }
            }
          >
            {question.level}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          <Typography
            align='center'
            style={{
              border: '2px solid black',
              borderRadius: '10px',
              color: 'black',
              margin: '10px',
              padding: '10px',
              fontWeight: 'bolder',
            }}
          >
            {question.answerType}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant='body1' style={{ margin: '5px' }}>
        {question.question}
      </Typography>

      <EditAnswers
        answers={question.answers}
        addAnswerPayload={addAnswerPayload}
      />
    </>
  );
}

export default EditQuestion;
