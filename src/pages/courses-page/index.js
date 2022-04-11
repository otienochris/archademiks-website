import {
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CourseCard from '../../components/CourseCard';
import { list } from '../../data/courses';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import Footer from '../../components/Footer';

const useStyles = makeStyles({
  mainContainer: {
    display: 'inline-block',
    width: '95%',
  },
  seachbar: {
    width: '100%',
    overflowWrap: 'anywhere',
    margin: '30px auto',
  },
  searchBarSection: {
    margin: '50px auto 20px auto',
  },
});

export default function Index() {
  const classes = useStyles();
  const [listOfCourses, setListOfCourses] = useState(list);
  const [searchKey, setSearchKey] = useState('');

  const handleSeachKeyInput = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    const newFilteredList = list.filter(
      (courseItem) =>
        courseItem.category.toLowerCase().includes(searchKey.toLowerCase()) ||
        courseItem.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        courseItem.description
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        courseItem.price <= searchKey ||
        courseItem.rating == searchKey
    );
    setListOfCourses(newFilteredList);
  }, [searchKey]);

  return (
    <Container>
      <Grid container justifyContent='center' className={classes.mainContainer}>
        <Grid
          container
          justifyContent={'center'}
          className={classes.searchBarSection}
        >
          <Grid
            item
            xs={12}
            md={3}
            style={{ width: '100%', margin: '20px auto' }}
          >
            <Typography variant='h4' style={{ flexGrow: 1 }}>
              Courses
            </Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <hr style={{ width: '100%', marginBottom: '10px' }} />
          </Grid> */}
          <Grid item xs={12} md={9} className={classes.seachbar}>
            <TextField
              className={classes.seachbar}
              onChange={(e) => handleSeachKeyInput(e)}
              variant='outlined'
              label='filter'
              type='search'
              placeholder='... by title/description/category/price/rating'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr style={{ width: '100%' }} />
        </Grid>
        <Grid container justifyContent={'center'} style={{ width: '100%' }}>
          {listOfCourses.map((course, index) => (
            <Grid key={index} item xs={12} sm={8} md={6} lg={4}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
