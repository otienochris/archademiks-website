import { Button, ButtonGroup, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Footer from '../../components/Footer';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItem: 'center',
    margin: '69px auto',
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
  },
  toggleButtons: {
    margin: '30px auto',
  },
});

export default function Index() {
  const classes = useStyles();
  const [action, setAction] = useState('login');

  // const handleOnchage = (event, newValue) => {
  //   setAction(newValue);
  // };

  return (
    <Container className={classes.mainContainer}>
      <Grid item className={classes.grid}>
        <ButtonGroup className={classes.toggleButtons}>
          <Button
            onClick={() => setAction('login')}
            variant={action === 'login' ? 'contained' : 'outlined'}
            // color='secondary'
            style={
              action === 'login'
                ? { backgroundColor: 'black', color: 'white' }
                : {}
            }
          >
            Log in
          </Button>
          <Button
            style={action === 'signup' ? { backgroundColor: '#ff8c00' } : {}}
            onClick={() => setAction('signup')}
            variant={action === 'signup' ? 'contained' : 'outlined'}
          >
            Sign up
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid
        item
        className={classes.grid}
        style={{
          // backgroundImage: 'url(/background2.webp)',
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          // backgroundAttachment: 'fixed',
          backgroundImage:
            'linear-gradient(to left, #293132, #474044, #4F5165, #547AA5, #50D8D7)',
        }}
      >
        {action === 'login' ? <LogIn /> : <SignUp setAction={setAction} />}
      </Grid>
      <Footer />
    </Container>
  );
}
