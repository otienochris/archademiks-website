import React from 'react';
import { InputAdornment } from '@material-ui/core';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TextField, Button } from '@mui/material';
import { Email } from '@material-ui/icons';

const schema = yup.object({
  email: yup.string().email().required(),
});

function PaypalForm({ course }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  const handlePaypal = (data) => {
    console.log(data);
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
        Pay Ksh. {course.price}
      </Button>
    </form>
  );
}

export default PaypalForm;
