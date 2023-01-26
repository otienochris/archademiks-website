import React, { useEffect, useState } from 'react';
import CourseCard from '../../components/CourseCard';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../../components/Footer';
import {
  makeStyles,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { LMS_COURSES } from '../../commons/urls';
import { setCourses } from '../../state/reducers/coursesReducers';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    width: '100%',
  },
  seachbar: {
    width: '100%',
    overflowWrap: 'anywhere',
    margin: '10px 20px 20px 10px',
  },
  searchBarSection: {
    margin: '20px auto',
  },
  courseListSection: {
    // backgroundColor: 'lightgrey',
  },
  notchedOutline: {
    borderColor: '#ff8c00',
  },
});

export default function Index() {
  const classes = useStyles();
  const coursesFromState = useSelector((state) => state.courses.value);
  const [listOfCourses, setListOfCourses] = useState(coursesFromState);
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.login.value.token);
  const dispacth = useDispatch();

  const handleSeachKeyInput = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  };

  const fetchCourses = async () => {
    await fetch(LMS_COURSES, {
      method: 'GET',
      mode: 'cors',
      Authorization: "Bearer " + token
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
        return response.json();
      })
      .then((data) => {
        dispacth(setCourses(data._embedded.courseDtoList));
        console.log(data._embedded.courseDtoList);
        setListOfCourses(data._embedded.courseDtoList);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {

    fetchCourses();

    const newFilteredList = coursesFromState.filter(
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
  }, [isLoading, searchKey]);

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
          // md={3}
          // style={{ width: '100%', margin: '20px auto' }}
          >
            <h1
              variant='h4'
              style={{
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: 'regular',
                margin: '20px',
              }}
            >
              All Courses:
            </h1>
          </Grid>
          <Grid
            item
            xs={12}
            // md={9}
            className={classes.seachbar}
          >
            <TextField
              className={classes.seachbar}
              onChange={(e) => handleSeachKeyInput(e)}
              variant='outlined'
              label='search'
              type='search'
              placeholder='... by title/description/category/price/rating'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon />
                  </InputAdornment>
                ),
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent={'center'}
          style={{ width: '100%' }}
          className={classes.courseListSection}
        >
          {isLoading ? <CircularProgress /> : listOfCourses.map((course, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={7}
              md={6}
              lg={4}
              className={classes.mainContainer}
            >
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
