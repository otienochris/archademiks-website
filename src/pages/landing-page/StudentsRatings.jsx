import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StudentReview from '../../components/StudentReview';

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
    color: '#ff8c00',
  },
  title: {
    margin: '40px auto',
    padding: 'auto 20px',
    textAlign: 'center',
    width: '90%',
  },
  mainContainer: {
    // backgroundColor: '#E0E8EC',
    color: 'white',
    backgroundImage: 'linear-gradient(to right, #434343 0%, black 100%)',
  },
});

export default function StudentsRatings() {
  const classes = useStyles();
  const [listOfReviews, setListOfReviews] = useState([]);
  const reviews = useSelector((state) => state.reviews.value);

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
