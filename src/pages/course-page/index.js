import {
  Container,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import InstructorPreview from '../../components/InstructorPreview';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { enrollUserToCourse } from '../../state/reducers/courseEnrollementReducer';

const useStyles = makeStyles({
  mainGridContainer: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    padding: '10px',
    position: 'relative',
    width: '100%',
    padding: '20px auto',
  },
  courseSnapshotDetailsGrid: {
    width: '100%',
    padding: '10px',
  },
  imageGrid: {
    width: '100%',
    boxShadow: '2px black',
  },
  img: {
    height: '150px',
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
  price: {
    color: '#143109',
    fontWeight: 'bolder',
    flexGrow: 1,
    textAlign: 'right',
    paddingRight: '20px',
    backgroundImage:
      'linear-gradient(to right, #AAAE7F, #D0D6B3, #F7F7F7, #EFEFEF)',
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

export default function Index({ courseId2 }) {
  const { courseId } = useParams();
  const [course, setCourse] = useState(initialCourse);
  const [value, setValue] = useState(0);
  const [listOfReviews, setListOfReviews] = useState(initialReviews);
  const reviews = useSelector((state) => state.reviews.value);
  const allCourses = useSelector((state) => state.courses.value);
  const isLoggedIn = useSelector((state) => state.login.value.isLoggedIn);
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    const filteredCourses = allCourses.filter(
      (course) => course.id == courseId || course.id == courseId2
    );
    const filteredReviews = reviews.filter(
      (review) => review.typeId == courseId && review.type === 'Course'
    );
    setCourse(filteredCourses[0]);
    setListOfReviews(filteredReviews);
  }, [courseId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGetForFree = () => {
    if (!isLoggedIn) {
      navigate('/login-signup', { replace: true });
    } else {
      dispatch(
        enrollUserToCourse({
          id: Math.floor(Math.random() * 100 + 1),
          studentId: user.id,
          courseId: course.id,
          status: 'Pending',
          amount: course.price,
          completionDate: null,
          creationDate: '2022-02-02',
          modificationDate: null,
          completedTopics: [],
        })
      );
      navigate('/students', { replace: true });
    }
  };

  const handleBuyButton = () => {
    if (!isLoggedIn) {
      navigate('/login-signup', { replace: true });
    } else {
      navigate('/courses/checkout/' + courseId, { replace: true });
    }
  };

  return (
    <Container style={{ padding: '20px auto' }}>
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

          <div style={{ display: 'flex' }}>
            <Typography
              variant='body1'
              style={{
                backgroundColor: `${getColorForCategoryBanner(
                  course.category
                )}`,
              }}
              className={classes.categoryBanner}
            >
              {course.category}
            </Typography>
            <Typography variant='h4' className={classes.price}>
              {course.price <= 0 ? 'Free' : `ksh. ${course.price}`}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          className={classes.courseSnapshotDetailsGrid}
          xs={12}
          sm={6}
          md={7}
        >
          <Typography variant='h4' style={{ width: '100%' }}>
            {course.title}
          </Typography>
          <Typography variant='body1' style={{ width: '100%' }}>
            {course.description}
          </Typography>
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
          {user.type === 'student' ||
          user.type === undefined ||
          user.type === '' ? (
            <CustomButton
              onClick={course.price > 0 ? handleBuyButton : handleGetForFree}
              endIcon={
                course.price > 0 ? <ShoppingCartCheckoutIcon /> : <StartIcon />
              }
              style={{
                position: 'sticky',
                width: '100%',
                backgroundColor: 'gold',
                color: 'black',
              }}
              text={course.price > 0 ? 'Buy' : 'Get for Free'}
            />
          ) : (
            <Typography
              style={{
                position: 'sticky',
                width: '100%',
                backgroundColor: 'white',
                color: 'black',
                textAlign: 'center',
              }}
              variant='h6'
            >
              {course.price > 0
                ? 'Being Sold at Ksh. ' + course.price
                : "It's a Free Course!"}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <AppBar position='static' color='default' className={classes.appbar}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab icon={<SummarizeIcon />} label={'Topics'} />
            <Tab icon={<ReviewsIcon />} label={'reviews'} />
            <Tab icon={<AssignmentIndIcon />} label={'tutors'} />
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
        ) : value === 1 ? (
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
        ) : (
          <Grid
            container
            justifyContent={'center'}
            className={classes.reviewsSection}
          >
            {course.instructors.map((instructor, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={8}
                md={6}
                lg={4}
                className={classes.review}
              >
                <InstructorPreview
                  key={instructor.id}
                  instructor={instructor}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Footer />
    </Container>
  );
}
