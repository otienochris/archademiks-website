import React from 'react';
import { InputAdornment } from '@material-ui/core';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TextField, Button } from '@mui/material';
import { Email } from '@material-ui/icons';
import { useSelector } from 'react-redux';

const schema = yup.object({
  email: yup.string().email().required(),
});

function PaypalForm({ setPaymentApproved, orderDetails, course }) {
  const user = useSelector((state) => state.user.value);

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
    orderDetails.buyer.email = data.email;
    console.log(orderDetails);

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
        if (data != undefined) {
          setPaymentApproved(true);
        }
        window.open(data.link, '_blank', 'noopener,noreferrer');
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit(handlePaypal)}>
      <TextField
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
        }}
        variant='contained'
        startIcon={<DoubleArrowIcon />}
        type='submit'
      >
        Click here to pay Ksh. {course.price}
      </Button>
    </form>
  );
}

export default PaypalForm;
