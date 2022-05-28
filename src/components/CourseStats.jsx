import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  number: {
    color: '#ff8c00',
  },
  courseStat: {
    borderLeft: '2xp solid #ff8c00',
    fontSize: '3em',
  },
  title: {
    fontSize: '.9em',
  },
  description: {
    color: '#48546B',
  },
});
export default function CourseStats(props) {
  const classes = useStyles();
  const { number, title, description } = props;
  return (
    <div className={classes.courseStat}>
      <span>
        <Typography variant='h6'>
          <span className={classes.number}>{number}+ </span>{' '}
          <span className={classes.title}>{title}</span>
        </Typography>
      </span>
      <Typography variant='body2' className={classes.description}>
        {description}
      </Typography>
    </div>
  );
}
