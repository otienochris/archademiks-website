import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CourseCard from '../../components/CourseCard';
import { list } from '../../data/courses';

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: '#E0E8EC',
    marginTop: '30px auto',
    width: '100%',
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
  const [listOfCourses, setListOfCourse] = useState([]);
  const [backUpofPopularCourses, setBackUpofPopularCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // get courses that have 5 star ratings
    const mostPopularCourses = list.filter(
      (courseItem) => courseItem.rating == 5
    );
    setListOfCourse(mostPopularCourses);
    setBackUpofPopularCourses(mostPopularCourses);
    // create a set of categories
    mostPopularCourses.map((course) => {
      categories.push(course.category);
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
      setListOfCourse(backUpofPopularCourses);
    } else {
      newListOfCourses = list.filter(
        (course) => course.category == categoryName
      );
      setListOfCourse(newListOfCourses);
    }
  };

  return (
    <Grid container className={classes.mainContainer}>
      <Typography variant='h4' className={classes.mainTitle}>
        <span className={classes.spans}>Most Popular</span> Courses
      </Typography>
      <Grid container className={classes.categories}>
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
            justifyItems='center'
          >
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
