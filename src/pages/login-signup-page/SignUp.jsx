import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles({
  textField: {
    width: '300px',
    alignSelf: 'center',
    margin: '10px 30px',
    backgroundColor: 'white',
  },
  notchedOutline: {
    // borderColor: '#ff8c00',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    minHeight: '575px',
    backgroundColor: 'white',
    // border: '4px solid #ff8c00',
  },
  radiogroup: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    // color: 'white',
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '300px',
    // flexDirection: 'column',
  },
  button: {
    width: '300px',
    alignSelf: 'center',
    margin: '10px 30px',
    backgroundColor: '#ff8c00',
  },
});

const schema = yup.object({
  firstName: yup.string().required('First name is requried'),
  secondName: yup.string().required('Second name is required'),
  userType: yup
    .string()
    .nullable()
    .oneOf(['student', 'instructor'])
    .required('A user type is required'),
  email: yup
    .string()
    .email('Provided Email is invalid')
    .required('Email is required to signup.'),
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
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline,
          },
        }}
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
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline,
          },
        }}
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
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline,
          },
        }}
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
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline,
          },
        }}
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
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline,
          },
        }}
      />
      <RadioGroup row className={classes.radiogroup}>
        <FormControlLabel
          value='student'
          control={<Radio />}
          label='Student'
          {...register('userType')}
        />
        <FormControlLabel
          value='instructor'
          control={<Radio />}
          label='Instructor'
          {...register('userType')}
        />
      </RadioGroup>
      <span style={{ color: 'red', textAlign: 'center', marginBottom: '5px' }}>
        {errors.userType ? errors.userType.message : ''}
      </span>
      <Button
        variant='contained'
        type='submit'
        className={classes.button}
        style={{ backgroundColor: '#ff8c00', color: 'black' }}
      >
        signup
      </Button>
    </form>
  );
}
