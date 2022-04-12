import { CardContent, makeStyles, Typography } from '@material-ui/core';
import { Button, CardActions, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import FiveStarRating from './FiveStarRating';
import { NavLink } from 'react-router-dom';
import { getColorForCategoryBanner } from '../utils/colorCategoryBanner';

const useStyles = makeStyles({
  course: {
    margin: '20px',
    position: 'relative',
    minHeight: '430px',
  },
  image: {
    height: '150px',
  },
  openBtn: {
    textDecoration: 'none',
    position: 'absolute',
    bottom: '38px',
    right: '15px',
  },
  category: {
    display: 'inline-block',
    margin: '1px auto',
    padding: '2px 5px',
    position: 'absolute',
    top: '-1px',
    left: '0px',
    fontWeight: 'bold',
    borderBottomRightRadius: '5px',
  },
  fiveStarRating: {
    margin: '5px auto',
    position: 'absolute',
    bottom: '57px',
    left: '10px',
  },
  price: {
    position: 'absolute',
    bottom: '30px',
    left: '15px',
  },
});

export default function CourseCard({ course }) {
  const classes = useStyles();
  const { id, title, category, thumbnail, description, rating, price } = course;
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
        <Typography variant='body2'>
          {description.length < 150
            ? description
            : description.substr(1, 150) + '...'}
        </Typography>
        <Typography variant='h6' className={classes.fiveStarRating}>
          <FiveStarRating rating={rating} />
        </Typography>
        <div className={classes.price}>
          {price <= 0 ? (
            <Typography
              variant='h4'
              style={{
                color: '#FF785A',
                fontWeight: 'bolder',
                marginRight: '5px',
              }}
            >
              Free
            </Typography>
          ) : price <= 1000 ? (
            <span>
              ksh.
              <Typography
                variant='h4'
                style={{
                  color: '#43B929',
                  fontWeight: 'bolder',
                  marginRight: '5px',
                  display: 'inline-block',
                }}
              >
                {price}
              </Typography>
            </span>
          ) : (
            `ksh. ${price}`
          )}
        </div>
        <Typography
          className={classes.category}
          style={{
            backgroundColor: `${getColorForCategoryBanner(category)}`,
          }}
        >
          {category}
        </Typography>
        {/* <div>{category}</div> */}
      </CardContent>
      <CardActions>
        <NavLink to={`/courses/` + id} className={classes.openBtn}>
          <Button
            variant='contained'
            endIcon={<ReadMoreIcon fontSize='large' />}
          >
            View
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}
