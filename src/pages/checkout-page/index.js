import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Container,
  Typography,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Footer from '../../components/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaypalForm from './PaypalForm';
import MpesaForm from './MpesaForm';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const addressObject = {
  city: '',
  country: '',
  countryCode: '',
  postalCode: '',
  street: '',
};

const productObject = {
  discount: 0,
  name: '',
  price: 0,
  quantity: 0,
  shippingFee: 0,
};

// sb-l1aub17855745@personal.example.com

const initialOrderDetails = {
  buyer: {
    addresses: {
      SHIPPING_ADDRESS: addressObject,
    },
    email: '',
    firstName: '',
    lastName: '',
  },
  orderDescription: '',
  products: [productObject],
};

const useStyles = makeStyles({
  options: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  paymentSection: {
    margin: '8px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
  },
  img: {
    height: '290px',
    margin: '20px',
  },
  paymentOptionTitle: {
    width: '100%',
    backgroundColor: 'rgba(210,215,211,.5)',
    textAlign: 'center',
    padding: '5px',
    margin: '20px auto',
    color: '#393424',
  },
});

export default function Index() {
  const dispacth = useDispatch();
  const { courseId } = useParams();
  const allCourses = useSelector((state) => state.courses.value);
  const [course] = useState(
    allCourses.filter((course) => parseInt(course.id) === parseInt(courseId))[0]
  );
  const classes = useStyles();
  const user = useSelector((state) => state.user.value);
  const isLoggedIn = useSelector((state) => state.login.value.isLoggedIn);
  const courseEnrollments = useSelector(
    (state) => state.courseEnrollments.value
  );

  useEffect(() => {
    // set buyer
    initialOrderDetails.buyer.firstName = user.firstName;
    initialOrderDetails.buyer.lastName = user.lastName;
    initialOrderDetails.buyer.email = user.email;
    // set address
    initialOrderDetails.buyer.addresses.SHIPPING_ADDRESS = user.addresses[0];

    //set description
    initialOrderDetails.orderDescription = 'Course Purchase: ' + course.title;
    // set products
    productObject.name = course.title;
    productObject.price = course.price;
    productObject.discount = 0;
    productObject.quantity = 1;
    initialOrderDetails.products = [productObject];

    // set local storage
    localStorage.setItem('courseId', courseId);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem(
      'courseEnrollments',
      JSON.stringify(courseEnrollments)
    ); // carry foward this state after redirect
  }, [course, courseId]);

  return (
    <Container>
      <Grid container style={{ minHeight: '80vh' }}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            style={{
              textAlign: 'center',
              width: '100%',
              backgroundColor: 'rgba(210,215,211,1)',
              marginTop: '20px',
            }}
          >
            Check Out
          </Typography>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={6} lg={4}>
            <CourseCard course={course} />
          </Grid>

          <Grid item xs={12} md={6} lg={8} className={classes.options}>
            <Typography variant='h5' className={classes.paymentOptionTitle}>
              Payment Options
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{
                  fontWeight: 'bolder',
                  color: '#393424',
                  backgroundImage:
                    'linear-gradient(to right, #FEFCFB, #A6EBC9, #61FF7E, #5EEB5B, #62AB37)',
                }}
              >
                1. Lipa Na Mpesa
              </AccordionSummary>
              <AccordionDetails>
                <Grid container justifyContent='center'>
                  <Grid item xs={12} lg={6} className={classes.paymentSection}>
                    <MpesaForm
                      course={course}
                      orderDetails={initialOrderDetails}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <img
                      src='/images/tillForPayment.png'
                      alt='till number'
                      className={classes.img}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{
                  fontWeight: 'bolder',
                  color: '#FEFCFB',
                  backgroundImage:
                    'linear-gradient(to right, #0A1128, #001F54, #034078, #2997D8, #FEFCFB)',
                }}
              >
                2. Paypal
              </AccordionSummary>
              <AccordionDetails>
                <Grid item xs={12} lg={6} className={classes.paymentSection}>
                  <PaypalForm
                    course={course}
                    orderDetails={initialOrderDetails}
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
