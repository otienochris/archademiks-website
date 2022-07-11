import React, { useState } from 'react';
import CustomButton from '../../components/custom-controls/CustomButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../../state/reducers/userReducer';
import { loginAction } from '../../state/reducers/loginReducer';
import { TextField } from '@mui/material';

const useStyles = makeStyles({
  textField: {
    width: '300px',
    alignSelf: 'center',
    margin: '30px',
    border: '2px solid #ff8c00',
    backgroundColor: 'white',
  },
  button: {
    width: '300px',
    alignSelf: 'center',
    margin: '30px',
    backgroundColor: 'black',
    color: 'whitesmoke',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    minHeight: '575px',
    backgroundColor: 'white',
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
  const users = useSelector((state) => state.allUsers.value);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState(users);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let userLoggedIn = usersList.filter(
      (user) => user.email === data.email && user.password === data.password
    );

    if (userLoggedIn.length == 0) {
      setWrongCredentials(true);
      alert('Wrong password');
    } else {
      const userDetails = userLoggedIn[0];
      localStorage.setItem('user', JSON.stringify(userDetails));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      switch (userDetails.type) {
        case 'instructor':
          dispatch(setLoggedInUser({ user: userDetails }));
          dispatch(loginAction({ isLoggedIn: true, token: 'hfoshfsofh' }));
          navigate('/instructor');
          break;
        case 'student':
          dispatch(setLoggedInUser({ user: userDetails }));
          dispatch(loginAction({ isLoggedIn: true, token: 'hfoshfsofh' }));
          navigate('/students');
          break;
        case 'admin':
          dispatch(setLoggedInUser({ user: userDetails }));
          dispatch(loginAction({ isLoggedIn: true, token: 'hfoshfsofh' }));
          navigate('/admin');
          break;
        default:
          break;
      }
    }
  };

  return (
    <form
      method='post'
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        variant='h6'
        align='center'
        style={{ fontFamily: 'monospace', margin: '20px auto' }}
      >
        Login
      </Typography>
      <Divider />
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
      <CustomButton type='submit' text='Log In' className={classes.button} />
    </form>
  );
}
