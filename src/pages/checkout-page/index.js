import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { list } from '../../data/courses';
import CourseCard from '../../components/CourseCard';
import { AccordionDetails, Grid, InputAdornment } from '@material-ui/core';
import Footer from '../../components/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Accordion,
  AccordionSummary,
  Container,
  TextField,
  Typography,
  Button,
  ButtonGroup,
} from '@mui/material';

const phoneRegExp = /^([0-9]{10})|(\+[0-9]{3}[0-9]{9})$/;

const schema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid. Eg. 07 **** ****')
    .required(),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const filteredCourses = list.filter((course) => course.id == courseId);
    setCourse(filteredCourses[0]);
  }, [course]);

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
                  <form onSubmit={handleSubmit(onSubmit)} method='post'>
                    <TextField
                      variant='outlined'
                      label='Phone Number'
                      placeholder='Enter your phone number'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <PhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                      type='tel'
                      {...register('phone')}
                      error={errors.phone ? true : false}
                      helperText={errors.phone ? errors.phone.message : ''}
                    />
                    <ButtonGroup fullWidth style={{ margin: '5px auto' }}>
                      <Button
                        style={{
                          backgroundColor: '#62AB37',
                        }}
                        variant='contained'
                        startIcon={<DoubleArrowIcon />}
                        type='submit'
                      >
                        Pay Ksh. {course.price}
                      </Button>
                      <Button
                        variant='outlined'
                        color='info'
                        startIcon={<CheckIcon />}
                      >
                        confirm payment
                      </Button>
                    </ButtonGroup>
                  </form>
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
          <Accordion disabled>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              2. Card payment
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='h4'>Manual Process</Typography>
              <Typography>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eligendi, quaerat maiores exercitationem quae odio nemo, rem
                repellat incidunt iusto beatae saepe eos provident nobis ullam
                blanditiis voluptatum minus dolore cumque.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
