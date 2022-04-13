import {
  Container,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  Accordion,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AppBar, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { list } from '../../data/courses';
import { reviews } from '../../data/reviews';
import { getColorForCategoryBanner } from '../../utils/colorCategoryBanner';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FiveStarRating from '../../components/FiveStarRating';
import Footer from '../../components/Footer';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ReviewsIcon from '@mui/icons-material/Reviews';
import StudentReview from '../../components/StudentReview';
import CustomButton from '../../components/custom-controls/CustomButton';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StartIcon from '@mui/icons-material/Start';

const useStyles = makeStyles({
  mainGridContainer: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    padding: '10px',
    position: 'relative',
    width: '100%',
  },
  courseSnapshotDetailsGrid: {
    width: '80%',
    padding: '20px',
  },
  imageGrid: {
    width: '100%',
    boxShadow: '2px black',
  },
  img: {
    height: '300px',
    width: '100%',
    objectFit: 'cover',
    boxShadow: '2px 5px 8px grey',
    borderRadius: '4px',
  },
  moduleAndRatingSection: {
    display: 'flex',
  },
  topicsSection: {
    flexDirection: 'row',
  },
  topics: {
    display: 'inline-block',
    flexGrow: 1,
    fontSize: '1.5em',
  },
  ratingSection: {
    padding: '2px',
    margin: '3px',
    backgroundColor: 'black',
    position: 'absolute',
    top: '8px',
    left: '8px',
  },
  categoryBanner: {
    padding: '5px',
    display: 'inline-block',
    boxShadow: '2px 5px 5px grey',
    marginBottom: '30px',
  },
  review: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  reviewsSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appbar: {
    margin: '20px auto',
  },
  accordion: {
    margin: '2px auto',
  },
});

const initialCourse = {
  id: 0,
  title: '',
  thumbnail: '',
  description: '',
  rating: 0,
  price: 0.0,
  category: '',
  numberOfEnrolledStudents: 0,
  creationDate: '',
  modificationDate: '',
  topics: [{}],
  subTopics: [{}],
  content: [{}],
  links: [{}],
};
const initialReviews = [
  {
    id: 0,
    type: 0,
    typeId: '',
    student: {
      id: 0,
      firstName: '',
      lastName: '',
      country: '',
    },
    rating: 0,
    content: '',
  },
];

export default function Index() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(initialCourse);
  const [value, setValue] = useState(0);
  const [listOfReviews, setListOfReviews] = useState(initialReviews);

  const classes = useStyles();

  useEffect(() => {
    const filteredCourses = list.filter((course) => course.id == courseId);
    const filteredReviews = reviews.filter(
      (review) => review.typeId == courseId && review.type === 'Course'
    );
    setCourse(filteredCourses[0]);
    setListOfReviews(filteredReviews);
  }, [courseId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid
        container
        justifyContent={'center'}
        className={classes.mainGridContainer}
      >
        <Grid item className={classes.imageGrid} xs={12} sm={6} md={5}>
          <img
            src={course.thumbnail}
            alt='course thumbnail'
            className={classes.img}
          />
        </Grid>
        <Grid
          item
          className={classes.courseSnapshotDetailsGrid}
          xs={12}
          sm={6}
          md={7}
        >
          <Typography variant='body1'>
            <span
              style={{
                backgroundColor: `${getColorForCategoryBanner(
                  course.category
                )}`,
              }}
              className={classes.categoryBanner}
            >
              {course.category}
            </span>
          </Typography>
          <Typography variant='h4'>{course.title}</Typography>
          <div style={{ color: '#497592' }}>
            {course.price <= 0 ? (
              <Typography
                variant='h4'
                style={{
                  fontWeight: 'bolder',
                  marginRight: '5px',
                }}
              >
                Free
              </Typography>
            ) : course.price <= 1000 ? (
              <span>
                ksh.
                <Typography
                  variant='h4'
                  style={{
                    fontWeight: 'bolder',
                    marginRight: '5px',
                    display: 'inline-block',
                  }}
                >
                  {course.price}
                </Typography>
              </span>
            ) : (
              `ksh. ${course.price}`
            )}
          </div>
          <Typography variant='body1'>{course.description}</Typography>
          <section className={classes.moduleAndRatingSection}>
            <ViewModuleIcon fontSize='large' />
            <Typography className={classes.topics}>
              {course.topics.length > 1
                ? `${course.topics.length} topics`
                : `${course.topics.length} topic`}
              {}
            </Typography>
            <div className={classes.ratingSection}>
              <FiveStarRating rating={course.rating} />
            </div>
          </section>
          {course.price > 0 ? (
            <NavLink
              style={{ textDecoration: 'none' }}
              to={'/courses/checkout/' + courseId}
            >
              <CustomButton
                endIcon={<ShoppingCartCheckoutIcon />}
                style={{
                  position: 'sticky',
                  width: '100%',
                  backgroundColor: 'gold',
                  color: 'black',
                }}
                text='Buy'
              />
            </NavLink>
          ) : (
            <CustomButton
              endIcon={<StartIcon />}
              style={{ width: '100%' }}
              text='Get for Free'
              color='primary'
            />
          )}
        </Grid>
      </Grid>
      <Grid item>
        <AppBar position='static' color='default' className={classes.appbar}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab icon={<SummarizeIcon />} label={'Topics'} />
            <Tab icon={<ReviewsIcon />} label={'reviews'} />
          </Tabs>
        </AppBar>
        {value === 0 ? (
          <div className={classes.courseSummary}>
            {course.topics.map((topic, index) => (
              <Accordion
                key={index}
                color='primary'
                className={classes.accordion}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6'>{topic.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>{topic.description}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          <Grid
            container
            justifyContent={'center'}
            className={classes.reviewsSection}
          >
            {listOfReviews.map((review, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={8}
                md={6}
                lg={4}
                className={classes.review}
              >
                <StudentReview key={review.id} review={review} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Footer />
    </Container>
  );
}
