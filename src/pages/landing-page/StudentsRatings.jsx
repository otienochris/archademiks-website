import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React, { useEffect, useState } from 'react';
import StudentReview from '../../components/StudentReview';
import { reviews } from '../../data/reviews';

const useStyles = makeStyles({
  review: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  reviewsSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  spans: {
    color: 'green',
  },
  title: {
    margin: '40px auto',
    padding: 'auto 20px',
    textAlign: 'center',
    width: '90%',
  },
  mainContainer: {
    backgroundColor: '#E0E8EC',
  },
});

export default function StudentsRatings() {
  const classes = useStyles();
  const [listOfReviews, setListOfReviews] = useState([]);

  useEffect(() => {
    const systemRatings = reviews.filter((review) =>
      review.type.startsWith('S')
    );
    setListOfReviews(systemRatings);
  }, []);

  return (
    <Grid container justifyContent='center' className={classes.mainContainer}>
      <Grid item className={classes.title}>
        <Typography variant='h4'>
          What Our <span className={classes.spans}>Students</span> Have to Say
        </Typography>
      </Grid>
      <Grid container className={classes.reviewsSection}>
        {listOfReviews.map((review, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={8}
            md={6}
            lg={4}
            className={classes.review}
          >
            <StudentReview key={review.id} review={review} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
