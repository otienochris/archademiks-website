import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  examTab: {
    backgroundColor: '#F4A259',
    color: 'black',
    padding: '10px',
    width: '130px',
    marginLeft: '20px',
    fontWeight: 'bolder',
  },
  assignmentTab: {
    backgroundColor: '#5B8E7D',
    color: '#EBF5EE',
    padding: '10px',
    width: '130px',
    marginLeft: '20px',
    fontWeight: 'bolder',
  },
  optional: {
    padding: '10px',
    width: '130px',
    border: '2px solid green',
    borderRadius: '20px',
    margin: 'auto 10px',
    fontWeight: 'bolder',
  },
  mandatory: {
    padding: '10px',
    width: '130px',
    border: '2px solid red',
    borderRadius: '20px',
    margin: 'auto 10px',
    fontWeight: 'bolder',
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px auto',
  },
});

function Tests({ testCodes, setQuestions, setCompleteTest }) {
  const tests = useSelector((state) =>
    state.tests.value.filter((item) => testCodes.includes(item.testId))
  );

  // const questions = useSelector((state) => state.questions.value);
  // const questions = tests.;

  const classes = useStyles();

  const handleStartTest = (testId) => {
    setQuestions(
      tests
        .filter((test) => test.testId === testId)
        .flatMap((test) => test.questions)
    );
    setCompleteTest(true);
  };

  return (
    <Container style={{ minHeight: '93.5vh' }}>
      {tests.map((test, idx) => (
        <Accordion
          key={idx}
          style={
            test.type === 'EXAM'
              ? {
                  padding: '0px',
                  border: '3px solid #F4A259',
                  borderRadius: '0px 0px 20px 20px',
                  margin: '10px auto',
                }
              : {
                  padding: '0px',
                  border: '3px solid #5B8E7D',
                  borderRadius: '0px 0px 20px 20px',
                  margin: '10px auto',
                }
          }
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Grid container>
              <Grid item xs='12' sm='6' md='3' style={{ display: 'flex' }}>
                <Typography
                  className={
                    test.isOptional ? classes.optional : classes.mandatory
                  }
                  variant='body2'
                  align='center'
                >
                  {test.isOptional ? 'Optional' : 'Mandatory'}
                </Typography>
                <Typography
                  className={
                    test.type === 'EXAM'
                      ? classes.examTab
                      : classes.assignmentTab
                  }
                  style={{ borderRadius: '20px', margin: 'auto 10px' }}
                  variant='body2'
                  align='center'
                >
                  {test.type}
                </Typography>
              </Grid>

              <Grid item xs='12' sm='6' md='9'>
                <div
                  style={{
                    height: '100%',
                    margin: 'auto 5px',
                    padding: 'auto 10px',
                  }}
                >
                  <Typography variant='h6' align='center'>
                    {test.title}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction='row'>
              <Grid item xs='12' md='6' style={{ padding: '10px' }}>
                <Typography variant='h6' align='center'>
                  Details
                </Typography>
                <Divider />
                <div className={classes.detail}>
                  <Typography variant='body2'>Questions:</Typography>
                  <Typography variant='subtitle2'>
                    {test.questions.length}
                  </Typography>
                </div>
                <Divider />
                <div className={classes.detail}>
                  <Typography variant='body2'>Creation Date:</Typography>
                  <Typography variant='subtitle2'>
                    {new Date(test.creationDate).toDateString()}
                    {' at '}
                    {new Date(test.creationDate).toLocaleTimeString()}
                  </Typography>
                </div>
                <Divider />
                <div className={classes.detail}>
                  <Typography variant='body2'>Modification Date:</Typography>
                  <Typography variant='subtitle2'>
                    {new Date(test.modificationDate).toDateString()}
                    {' at '}
                    {new Date(test.modificationDate).toLocaleTimeString()}
                  </Typography>
                </div>
                <Divider />
                <div className={classes.detail}>
                  <Typography variant='body2'>Start Date:</Typography>
                  <Typography variant='subtitle2'>
                    {new Date(test.startDateAndTime).toDateString()}
                    {' at '}
                    {new Date(test.startDateAndTime).toLocaleTimeString()}
                  </Typography>
                </div>
                <Divider />
                <div className={classes.detail}>
                  <Typography variant='body2'>End Date:</Typography>
                  <Typography variant='subtitle2'>
                    {new Date(test.endDateAndTime).toDateString()}
                    {' at '}
                    {new Date(test.endDateAndTime).toLocaleTimeString()}
                  </Typography>
                </div>
                <Divider />
              </Grid>
              <Grid item xs='12' md='6'>
                <Typography align='center'>Statistics</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
          <AccordionActions
            style={
              test.type === 'EXAM'
                ? {
                    borderRadius: '0px 0px 20px 20px',
                    display: 'flex',
                    justifyItems: 'center',
                    justifyContent: 'center',
                  }
                : {
                    borderRadius: '0px 0px 20px 20px',
                    display: 'flex',
                    justifyItems: 'center',
                    justifyContent: 'center',
                  }
            }
          >
            <Button
              style={{
                backgroundColor: '#ff8c00',
                fontWeight: 'bolder',
                color: 'black',
              }}
              onClick={() => handleStartTest(test.testId)}
            >
              Start test
            </Button>
            {test.isOptional && (
              <Button variant='outlined' color='secondary'>
                Drop Out
              </Button>
            )}
          </AccordionActions>
        </Accordion>
      ))}
    </Container>
  );
}

export default Tests;
