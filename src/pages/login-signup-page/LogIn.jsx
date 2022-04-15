import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import { TextField } from '@mui/material';
import React from 'react';
import CustomButton from '../../components/custom-controls/CustomButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Redirect, { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  textField: {
    width: '300px',
    alignSelf: 'center',
    margin: '30px',
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
  email: yup
    .string()
    .email('Provided Email is invalid')
    .required('Email is required to login.'),
  password: yup.string().required('Passord is required to log in.'),
});

export default function LogIn() {
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    data.email === 'admin@gmail.com'
      ? navigate('/instructor/chris')
      : data.email === 'otienochris98@gmail.com'
      ? navigate('/students/chris')
      : navigate('/login-signup', { replace: true });
  };

  return (
    <form
      method='post'
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        className={classes.textField}
        placeholder='Enter your email'
        autoComplete='off'
        label='email'
        type={'email'}
        style={{
          margin: '20px auto',
        }}
        {...register('email')}
        error={errors.email ? true : false}
        helperText={errors.email ? errors.email.message : ''}
      />
      <TextField
        className={classes.textField}
        label='password'
        autoComplete='off'
        placeholder='Enter your password'
        type={'password'}
        {...register('password')}
        error={errors.password ? true : false}
        helperText={errors.password ? errors.password.message : ''}
      />
      <CustomButton type='submit' text='Log In' className={classes.textField} />
    </form>
  );
}
