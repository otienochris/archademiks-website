import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { list } from '../../data/courses';
import CourseCard from '../../components/CourseCard';
import { AccordionDetails, Grid, makeStyles } from '@material-ui/core';
import Footer from '../../components/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Accordion,
  AccordionSummary,
  Container,
  Typography,
} from '@mui/material';
import PaypalForm from './PaypalForm';
import MpesaForm from './MpesaForm';

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

const useStyles = makeStyles({
  options: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
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
  const { courseId } = useParams();
  const [course, setCourse] = useState(initialCourse);
  const classes = useStyles();

  useEffect(() => {
    const filteredCourses = list.filter((course) => course.id == courseId);
    setCourse(filteredCourses[0]);
    // setAccessKey(use);
  }, [course, courseId]);

  return (
    <Container>
      <Grid item xs={12}>
        <Typography
          variant='h4'
          style={{
            textAlign: 'center',
            width: '100%',
            backgroundColor: 'rgba(210,215,211,1)',
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
                  'linear-gradient(to right, #A6EBC9, #61FF7E, #5EEB5B, #62AB37)',
              }}
            >
              1. Lipa Na Mpesa
            </AccordionSummary>
            <AccordionDetails>
              <Grid container justifyContent='center'>
                <Grid item xs={12} lg={6} className={classes.paymentSection}>
                  <MpesaForm course={course} />
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
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              2. Paypal
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12} lg={6} className={classes.paymentSection}>
                <PaypalForm course={course} />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
