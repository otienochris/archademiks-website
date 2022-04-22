import { Grid, makeStyles, Typography } from '@material-ui/core';
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
  allCoursesBtn: {
    textDecoration: 'none',
  },
});

export default function SecondDescription(props) {
  const classes = useStyles();
  return (
    <Grid container justifyContent='center' className={classes.mainGrid}>
      <Grid item xs={10} sm={8} md={4} className={classes.gridItem}>
        <Typography variant='h4' className={classes.mainTitle}>
          Excelent Learning <span className={classes.spans}>Experience</span>
        </Typography>
        <Typography variant='body1'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit,
          quisquam iste harum voluptates minima quia magni numquam! Molestias
          vitae numquam enim blanditiis reprehenderit itaque eveniet. Eum earum
          accusantium ut aspernatur!
        </Typography>
        <NavLink to={'/courses'} className={classes.allCoursesBtn}>
          <CustomButton text='View All Courses' />
        </NavLink>
      </Grid>

      <Grid
        item
        xs={10}
        sm={8}
        md={4}
        // md={3}
        className={classes.gridItem}
      >
        <img
          src='https://static.vecteezy.com/system/resources/previews/003/573/815/original/software-developer-semi-flat-color-character-sitting-figure-person-on-white-programmer-at-work-isolated-modern-cartoon-style-illustration-for-graphic-design-and-animation-vector.jpg'
          alt='A person learning online'
        />
      </Grid>
    </Grid>
  );
}
