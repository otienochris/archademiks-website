import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import FiveStarRating from './FiveStarRating';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  card: {
    width: '350px',
    position: 'relative',
    margin: '20px',
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
  const student = useSelector(
    (state) =>
      state.allUsers.value.filter((user) => user.id == review.userId)[0]
  );
  const { rating, content } = review;
  const [showMore, setShowMore] = React.useState(false);

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
        <div className={classes.content}>
          <Typography>
            <FormatQuoteIcon />
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
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
