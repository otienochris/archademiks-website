import React from 'react';
import { InputAdornment } from '@material-ui/core';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TextField, Button, ButtonGroup } from '@mui/material';
import { useSelector } from 'react-redux';

const phoneRegExp = /^([0-9]{10})|(\+[0-9]{3}[0-9]{9})$/;

const schema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid. Eg. 07 **** ****')
    .required(),
});

function MpesaForm({ orderDetails, course }) {
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method='post'>
      <TextField
        style={{ width: '100%' }}
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
        <Button variant='outlined' color='info' startIcon={<CheckIcon />}>
          confirm payment
        </Button>
      </ButtonGroup>
    </form>
  );
}

export default MpesaForm;
