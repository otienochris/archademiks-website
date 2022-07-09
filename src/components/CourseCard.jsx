import { CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { Button, CardActions, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import FiveStarRating from './FiveStarRating';
import { NavLink, useNavigate } from 'react-router-dom';
import { getColorForCategoryBanner } from '../utils/colorCategoryBanner';

const useStyles = makeStyles({
  course: {
    margin: '20px',
    position: 'relative',
    // minHeight: '430px',
  },
  image: {
    height: '150px',
  },
  openBtn: {
    backgroundColor: '#F18805',
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
    color: 'black',
  },
  cardContent: {
    backgroundColor: '#1E1E24',
    color: '#FFF8F0',
    height: '100%',
  },
});

export default function CourseCard({ course }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id, title, category, thumbnail, description, rating, price } = course;
  return (
    <Card sx={{ width: 350 }} className={classes.course}>
      <CardMedia
        className={classes.image}
        component='img'
        image={thumbnail}
        alt={title}
      />
      <CardContent className={classes.cardContent}>
        <Grid container justifyContent='center'>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant='h5'
              // component='div'
              style={{ height: '70px' }}
            >
              {title}
            </Typography>
            <Typography variant='body2'>
              {description.length < 150
                ? description
                : description.substr(1, 150) + '...'}
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: '10px' }}>
            <Grid item xs={6}>
              <FiveStarRating rating={rating} />
            </Grid>
            <Grid item xs={6}>
              {price <= 0 ? (
                <Typography
                  align='right'
                  variant='h4'
                  style={{
                    color: 'yellowgreen',
                    fontWeight: 'bolder',
                    marginRight: '5px',
                  }}
                >
                  Free
                </Typography>
              ) : price <= 1000 ? (
                <Typography
                  align='right'
                  variant='h4'
                  style={{
                    color: '#F18805',
                    fontWeight: 'bolder',
                    marginRight: '5px',
                    // display: 'inline-block',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 'lighter',
                      fontSize: '0.5em',
                      color: 'whitesmoke',
                    }}
                  >
                    $
                  </span>
                  {price}
                </Typography>
              ) : (
                `ksh. ${price}`
              )}
            </Grid>
          </Grid>
          <Typography
            className={classes.category}
            style={{
              backgroundColor: `${getColorForCategoryBanner(category)}`,
            }}
          >
            {category}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant='contained'
            endIcon={<ReadMoreIcon fontSize='large' />}
            onClick={() => navigate('/courses/' + id)}
            className={classes.openBtn}
            style={{ backgroundColor: '#F18805' }}
          >
            View
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
}
