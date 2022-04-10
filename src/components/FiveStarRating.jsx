import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { makeStyles } from '@material-ui/core';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const useStyles = makeStyles({
  star: {
    color: 'gold',
  },
});

export default function FiveStarRating({ rating }) {
  const classes = useStyles();
  const [emptyStar] = useState(5 - rating);
  return (
    <div>
      {[...Array(rating)].map((star, index) => {
        return (
          <span key={index}>
            <StarIcon className={classes.star} />
          </span>
        );
      })}
      {[...Array(emptyStar)].map((star, index) => {
        return (
          <span key={index}>
            <StarOutlineIcon className={classes.star} />
          </span>
        );
      })}
    </div>
  );
}
