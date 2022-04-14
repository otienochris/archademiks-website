import { Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Footer from '../../components/Footer';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItem: 'center',
    margin: '20px auto',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItem: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    minHeight: '70vh',
    backgroundColor: 'rgba(210,215,211,.3)',
  },
  toggleButtons: {
    margin: '30px auto',
  },
});

export default function Index() {
  const classes = useStyles();
  const [action, setAction] = useState('login');

  const handleOnchage = (event, newValue) => {
    setAction(newValue);
  };
  return (
    <Container className={classes.mainContainer}>
      <Grid item className={classes.grid}>
        <ToggleButtonGroup
          value={action}
          exclusive
          onChange={handleOnchage}
          color='primary'
          className={classes.toggleButtons}
        >
          <ToggleButton value={'login'}>Log In</ToggleButton>
          <ToggleButton value={'signup'}>Sign Up</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item className={classes.grid}>
        {action === 'login' ? <LogIn /> : <SignUp />}
      </Grid>
      <Footer />
    </Container>
  );
}
