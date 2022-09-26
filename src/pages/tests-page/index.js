import { Container, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CompleteTestView from '../student-interface-page/CompleteTestView';
import Tests from '../student-interface-page/Tests';

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [questions, setQuestions] = useState();
  const [completeTest, setCompleteTest] = useState(false);

  const courseEnrollment = useSelector(
    (state) =>
      state.courseEnrollments.value.filter(
        (item) =>
          item.studentId === parseInt(searchParams.get('studentId')) &&
          item.courseId === parseInt(searchParams.get('courseId'))
      )[0]
  );
  const testEnrollment = useSelector(
    (state) =>
      state.testEnrollments.value.filter(
        (item) => item.testEnrollmentId === courseEnrollment.testEnrollmentId
      )[0]
  );

  console.log(questions);

  return (
    <Container>
      <div
        style={{
          height: '100px',
          backgroundColor: '#31231E',
          color: 'whitesmoke',
          padding: 'auto',
          marginBottom: '10px',
          marginTop: '8vh',
          display: 'flex',
        }}
      >
        <div
          style={{
            margin: 'auto auto 10px auto',
            justifySelf: 'center',
          }}
        >
          <Typography variant='h3' align='center'>
            TESTS
          </Typography>
        </div>
      </div>
      {completeTest ? (
        <CompleteTestView
          questions={questions}
          setQuestions={setQuestions}
          setCompleteTest={setCompleteTest}
        />
      ) : (
        <Tests
          testCodes={testEnrollment.tests}
          setQuestions={setQuestions}
          setCompleteTest={setCompleteTest}
        />
      )}
    </Container>
  );
}
