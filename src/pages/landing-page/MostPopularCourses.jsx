import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CourseCard from '../../components/CourseCard';
import { list } from '../../data/courses';

const useStyles = makeStyles({
  mainContainer: {
    borderTop: '2px solid #E0E8EC',
    borderBottom: '2px solid #E0E8EC',
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  categories: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  category: {
    margin: '5px',
  },
  spans: {
    color: '#ff8c00',
  },
  mainTitle: {
    color: 'white',
    margin: '30px auto',
  },
  courses: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    width: '100%',
    // backgroundColor: 'white',
    margin: '5px',
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
    <Container
      style={{
        // backgroundImage: 'url("/Basic-Landing-Page-background.jpg")',
        color: 'white',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundImage: 'url("/main_background.jpg")',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4' align='center' className={classes.mainTitle}>
            <span className={classes.spans}>Most Popular</span> Courses
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='h6'
            style={{ fontFamily: 'monospace', marginLeft: '20px' }}
          >
            Filters:{' '}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.category}>
          <Button onClick={() => filterByCategory('')} variant='contained'>
            All Courses
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
        // sm={3}
        // md={2}
        >
          {categories.map((category, index) => (
            <Button
              className={classes.category}
              key={index}
              style={{ color: 'white', borderColor: '#ff8c00' }}
              onClick={() => filterByCategory(category)}
              variant='outlined'
            >
              {category}
            </Button>
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
            >
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
