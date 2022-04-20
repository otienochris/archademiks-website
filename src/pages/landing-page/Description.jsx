import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomButton from '../../components/custom-controls/CustomButton';

const useStyles = makeStyles({
  mainGrid: {
    minHeight: '60vh',
    marginTop: '30px',
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
    color: 'green',
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
  return (
    <Grid
      container
      justifyContent='center'
      justifyItems='center'
      className={classes.mainGrid}
    >
      <Grid item xs={10} sm={8} md={4} className={classes.gridItem}>
        <Typography variant='h4' className={classes.mainTitle}>
          Get your <span className={classes.spans}>Certification</span> and{' '}
          <span className={classes.spans}>Skills</span> Online
          <hr />
        </Typography>
        <Typography variant='body1'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit,
          quisquam iste harum voluptates minima quia magni numquam! Molestias
          vitae numquam enim blanditiis reprehenderit itaque eveniet. Eum earum
          accusantium ut aspernatur!
        </Typography>
        <NavLink className={classes.navlink} to={'/login-signup'}>
          <CustomButton text='Get Started' />
        </NavLink>
      </Grid>

      <Grid item xs={10} sm={8} md={4} className={classes.gridItem}>
        <img
          src='https://static.vecteezy.com/system/resources/previews/005/051/189/original/boy-study-in-online-school-illustration-concept-flat-illustration-isolated-on-white-background-vector.jpg'
          alt='A person learning online'
        />
      </Grid>
    </Grid>
  );
}
