import { Button, ButtonGroup, Container, makeStyles } from '@material-ui/core';
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
    margin: '69px auto',
    // backgroundColor: 'black',
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
    // backgroundColor: 'rgba(210,215,211,.3)',
    // backgroundColor: 'black',
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
          backgroundImage: 'url(/background2.webp)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {action === 'login' ? <LogIn /> : <SignUp />}
      </Grid>
      <Footer />
    </Container>
  );
}
