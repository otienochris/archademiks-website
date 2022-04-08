import { CardContent, makeStyles, Typography } from '@material-ui/core';
import { Button, CardActions, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import FiveStarRating from './FiveStarRating';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  course: {
    margin: '20px',
    // height: '400px',
  },
  image: {
    height: '150px',
  },
  openBtn: {
    position: 'relative',
    bottom: '0px',
  },
});

export default function CourseCard(props) {
  const classes = useStyles();
  const { id, title, thumbnail, description, rating, price } = props;
  return (
    <Card sx={{ width: 350 }} className={classes.course}>
      <CardMedia
        className={classes.image}
        component='img'
        image={thumbnail}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description.substr(1, 150)}
        </Typography>
        <Typography variant='h6'>
          <FiveStarRating rating={rating} />
        </Typography>
        <Typography variant='h6'>ksh. {price}</Typography>
      </CardContent>
      <CardActions>
        <NavLink to={`/courses/` + id}>
          <Button
            variant='contained'
            endIcon={<ReadMoreIcon fontSize='large' />}
          >
            Open
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}
