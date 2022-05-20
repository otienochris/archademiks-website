import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { makeStyles } from '@material-ui/core';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const useStyles = makeStyles({
  star: {
    color: '#F5B841',
  },
});

export default function FiveStarRating({ rating }) {
  const classes = useStyles();
  return (
    <div>
      {[...Array(rating)].map((star, index) => {
        return (
          <span key={index}>
            <StarIcon className={classes.star} />
          </span>
        );
      })}
      {[...Array(5 - rating)].map((star, index) => {
        return (
          <span key={index}>
            <StarOutlineIcon className={classes.star} />
          </span>
        );
      })}
    </div>
  );
}
