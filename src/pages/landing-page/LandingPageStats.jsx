import { Grid, makeStyles } from '@material-ui/core';
import { Typography } from '@mui/material';
import React from 'react';
import CourseStats from '../../components/CourseStats';

const stats = [
  {
    number: 30,
    title: 'Courses',
    description:
      'Different Courses cutting across major market needs in the contemporary global market',
  },
  {
    number: 150,
    title: 'Students',
    description:
      'Across the world, sharing and bettering their skills and networks.',
  },
  {
    number: 40,
    title: 'Tutors',
    description:
      'Tutors who have market experience. They prepare and deliver up-to date content that meets market needs.',
  },
];

const useStyles = makeStyles({
  leadingLine: {
    borderLeft: '2px solid #ff8c00',
    height: '100%',
  },
  mainContainer: {
    width: '100%',
    margin: '30px auto',
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  statsSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyItems: 'center',
    width: '100%',
    borderLeft: '2px solid grey',
    padding: '20px',
    margin: '10px auto',
  },
  spans: {
    color: 'Grey',
  },
  mainTitle: {
    marginBottom: '20px',
    textAlign: 'center',
  },
});
export default function LandingPageStats() {
  const classes = useStyles();
  return (
    <Grid container className={classes.mainContainer} justifyContent='center'>
      <Grid item xs={12} className={classes.mainTitle}>
        <Typography variant='h4' className={classes.mainTitle}>
          <span className={classes.spans}>statistics</span>
        </Typography>
      </Grid>
      <Grid container className={classes.mainContainer}>
        {stats.map((statistic, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={4}
            md={3}
            className={classes.statsSection}
          >
            <CourseStats
              number={statistic.number}
              title={statistic.title}
              description={statistic.description}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
