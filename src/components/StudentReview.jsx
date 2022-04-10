import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React, { useEffect } from 'react';
import FiveStarRating from './FiveStarRating';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Button } from '@mui/material';

const useStyles = makeStyles({
  card: {
    width: '350px',
    position: 'relative',
  },
  rating: {
    position: 'absolute',
    top: '20px',
    right: '5px',
  },
  quote: {
    backgroundColor: 'red',
  },
  avatar: {
    backgroundColor: 'gold',
    color: 'black',
  },
  content: {
    textAlign: 'center',
    display: 'inline',
  },
});

export default function StudentReview({ review }) {
  const classes = useStyles();
  const { student, rating, content } = review;
  const [showMore, setShowMore] = React.useState(false);

  // useEffect(() => {}, [showMore]);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {student.firstName.substring(0, 1).toUpperCase() +
              student.lastName.substring(0, 1).toUpperCase()}
          </Avatar>
        }
        title={
          student.firstName +
          ' ' +
          student.lastName.substring(0, 1).toUpperCase() +
          '.'
        }
        subheader={student.country}
      />

      <CardContent>
        <div className={classes.rating}>
          <FiveStarRating rating={rating} />
        </div>
        <Typography>
          <FormatQuoteIcon />
          <div className={classes.content}>
            {content.length < 100
              ? content
              : showMore
              ? content
              : `${content.substring(0, 100)}`}
            {content.length < 100 ? (
              ''
            ) : (
              <Button onClick={() => setShowMore(!showMore)}>
                {showMore ? '...less'.toLowerCase() : '...more'.toLowerCase()}
              </Button>
            )}
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}
