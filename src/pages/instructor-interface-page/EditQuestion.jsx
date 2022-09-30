import { Typography } from '@material-ui/core';
import React from 'react';
import EditAnswers from './EditAnswers';

function EditQuestion({ question, addAnswerPayload }) {
  addAnswerPayload.questionId = question.questionId;

  return (
    <>
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
