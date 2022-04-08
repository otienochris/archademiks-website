import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CourseCard from '../../components/CourseCard';
import { list } from '../../data/courses';

const useStyles = makeStyles({
  mainContainer: {
    position: 'absolute',
    backgroundColor: '#E0E8EC',
    marginTop: '20px',
    width: '100%',
    left: '0px',
    right: '0px',
    minHeight: '50vh',
    borderTop: '2px solid #E0E8EC',
    borderBottom: '2px solid #E0E8EC',
  },
  categories: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  category: {
    margin: '20px',
  },
  spans: {
    color: 'green',
  },
  mainTitle: {
    margin: '30px auto',
  },
  courses: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    width: '100%',
  },
});

export default function MostPopularCourses() {
  const classes = useStyles();
  const [listOfCourses, setListOfCourse] = useState(list);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    listOfCourses.map((course) => {
      categories.push(...course.categories);
    });
    const setOfCategories = new Set();
    categories.map((category) => {
      if (!setOfCategories.has(category)) {
        setOfCategories.add(category);
      }
    });
    setCategories(Array.from(setOfCategories));
  }, []);

  const filterByCategory = (categoryName) => {
    let newListOfCourses;
    if (categoryName === '') {
      setListOfCourse(list);
    } else {
      newListOfCourses = list.filter((course) =>
        course.categories.includes(categoryName)
      );
      setListOfCourse(newListOfCourses);
    }
  };

  return (
    <Grid container className={classes.mainContainer}>
      <Typography variant='h4' className={classes.mainTitle}>
        <span className={classes.spans}>Most Popular</span> Courses
      </Typography>
      <Grid container wrap className={classes.categories}>
        <Grid item className={classes.category}>
          <Button onClick={() => filterByCategory('')} variant='contained'>
            All Courses
          </Button>
        </Grid>
        {categories.map((category, index) => (
          <Grid key={index} item className={classes.category}>
            <Button
              onClick={() => filterByCategory(category)}
              variant='contained'
            >
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent='center'>
        {listOfCourses.map((course, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={8}
            md={6}
            lg={4}
            xl={3}
            className={classes.courses}
            justifyContent='space-around'
            justifyItems='center'
          >
            <CourseCard
              id={course.id}
              thumbnail={course.thumbnail}
              title={course.title}
              description={course.description}
              rating={course.rating}
              price={course.price}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
