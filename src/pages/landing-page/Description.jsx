import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/custom-controls/CustomButton';

const useStyles = makeStyles({
  mainGrid: {
    minHeight: '94vh',
    marginTop: '30px',
    backgroundImage: 'url("/Basic-Landing-Page-background.jpg")',
    // backgroundImage: 'url("/main_background.jpg")',
    color: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    // opacity: '0.9',
    backgroundColor: 'black',
    color: 'white',
  },
  gridItem: {
    margin: 'auto 10px',
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  spans: {
    color: '#ff8c00',
  },
  mainTitle: {
    marginBottom: '20px',
  },
  navlink: {
    textDecoration: 'none',
  },
});

export default function Description() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid container justifyContent='center' className={classes.mainGrid}>
      <Grid
        item
        xs={11}
        sm={8}
        md={5}
        className={classes.gridItem}
        // style={{ maxWidth: '450px' }}
      >
        <Typography
          variant='h3'
          className={classes.mainTitle}
          style={{ fontFamily: 'monospace' }}
        >
          Get your <span className={classes.spans}>Certification</span> and{' '}
          <span className={classes.spans}>Skills</span> Online
          <hr />
        </Typography>
        <Typography
          variant='subtitle1'
          style={{ fontFamily: 'monospace', margin: '20px auto' }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit,
          quisquam iste harum voluptates minima quia magni numquam! Molestias
          vitae numquam enim blanditiis reprehenderit itaque eveniet. Eum earum
          accusantium ut aspernatur!
        </Typography>
        {/* <NavLink className={classes.navlink} to={'/login-signup'}> */}
        <CustomButton
          text='Get Started'
          onClick={() => navigate('/login-signup', { replace: true })}
          style={{
            backgroundColor: '#ff8c00',
            color: 'black',
            fontWeight: 'bolder',
          }}
        />
        {/* </NavLink> */}
      </Grid>
    </Grid>
  );
}
