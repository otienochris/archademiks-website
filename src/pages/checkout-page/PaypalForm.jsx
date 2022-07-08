import React from 'react';
import { CircularProgress, InputAdornment } from '@material-ui/core';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TextField, Button } from '@mui/material';
import { Email } from '@material-ui/icons';
import { useSelector } from 'react-redux';
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

  const handlePaypal = async (data) => {
    localStorage.setItem('courseId', JSON.stringify(course.id));
    setIsLoading(true);
    orderDetails.buyer.email = data.email;

    const response = await fetch(
      'http://localhost:8080/paypal/payment/authorize',
      {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      }
    )
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
