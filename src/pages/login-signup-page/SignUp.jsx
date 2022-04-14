import { makeStyles, Paper, TextField } from '@material-ui/core';
import React from 'react';
import CustomButton from '../../components/custom-controls/CustomButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles({
  textField: {
    width: '300px',
    alignSelf: 'center',
    margin: '10px 30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    minHeight: '575px',
  },
});

const schema = yup.object({
  firstName: yup.string().required('First name is requried'),
  secondName: yup.string().required('Second name is required'),
  email: yup
    .string()
    .email('Provided Email is invalid')
    .required('Email is required to login.'),
  password: yup.string().required('Passord is required to signup.'),
  password2: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('This is a required field'),
});

export default function SignUp() {
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

  return (
    <form
      method='post'
      onSubmit={handleSubmit(onSubmit)}
      className={classes.form}
    >
      <TextField
        className={classes.textField}
        variant='outlined'
        placeholder='Enter your first name'
        autoComplete='off'
        label='First Name'
        type={'text'}
        {...register('firstName')}
        error={errors.firstName ? true : false}
        helperText={errors.firstName ? errors.firstName.message : ''}
      />
      <TextField
        className={classes.textField}
        variant='outlined'
        placeholder='Enter your second name'
        autoComplete='off'
        label='Second Name'
        type={'text'}
        {...register('secondName')}
        error={errors.secondName ? true : false}
        helperText={errors.secondName ? errors.secondName.message : ''}
      />
      <TextField
        className={classes.textField}
        variant='outlined'
        placeholder='Enter your email'
        autoComplete='off'
        label='email'
        type={'email'}
        {...register('email')}
        error={errors.email ? true : false}
        helperText={errors.email ? errors.email.message : ''}
      />
      <TextField
        className={classes.textField}
        variant='outlined'
        label='password'
        autoComplete='off'
        placeholder='Enter your password'
        type={'password'}
        {...register('password')}
        error={errors.password ? true : false}
        helperText={errors.password ? errors.password.message : ''}
      />
      <TextField
        className={classes.textField}
        variant='outlined'
        label='Confirm Password'
        autoComplete='off'
        placeholder='Confirm your password'
        type={'password'}
        {...register('password2')}
        error={errors.password2 ? true : false}
        helperText={errors.password2 ? errors.password2.message : ''}
      />
      <CustomButton type='submit' text='signup' className={classes.textField} />
    </form>
  );
}
