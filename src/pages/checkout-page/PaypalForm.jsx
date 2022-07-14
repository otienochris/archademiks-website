import React from 'react';
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Email } from '@material-ui/icons';
import { useState } from 'react';

const schema = yup.object({
  email: yup.string().email().required(),
});

function PaypalForm({ orderDetails, course }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  const baseUrlForPayment = 'https://demo-paypal-payment-service.herokuapp.com';
  // const baseUrlForPayment = 'http://localhost:8080';

  const handlePaypal = async (data) => {
    localStorage.setItem('courseId', JSON.stringify(course.id));
    setIsLoading(true);
    orderDetails.buyer.email = data.email;

    await fetch(baseUrlForPayment + '/paypal/payment/authorize', {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        window.open(data.link, '_self', 'noopener,noreferrer');
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(handlePaypal)}>
      <TextField
        style={{
          width: '100%',
        }}
        variant='outlined'
        label='Email'
        placeholder='Enter your paypal email'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Email />
            </InputAdornment>
          ),
        }}
        type='email'
        {...register('email')}
        error={errors.email ? true : false}
        helperText={errors.email ? errors.email.message : ''}
      />
      <Button
        style={{
          backgroundColor: '#62AB37',
          margin: '20px auto',
          width: '100%',
        }}
        variant='contained'
        startIcon={<DoubleArrowIcon />}
        type='submit'
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          `Click here to pay Ksh. ${course.price}`
        )}
      </Button>
    </form>
  );
}

export default PaypalForm;
