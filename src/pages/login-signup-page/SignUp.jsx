import {
  Button,
  makeStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Box,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { countries } from '../../components/CountrySelect';

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
    margin: '20px auto',
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
    flexDirection: 'column',
  },
  button: {
    width: '300px',
    alignSelf: 'center',
    margin: '10px 30px',
    backgroundColor: '#ff8c00',
  },
  select: {
    width: '300px',
    alignSelf: 'center',
    margin: '10px 30px',
    backgroundColor: 'white',
  },
  customErroSpan: {
    color: 'red',
    textAlign: 'left',
    marginLeft: '30px',
    width: '100%',
  },
});

export default function SignUp() {
  const classes = useStyles();

  const schema = yup.object({
    firstName: yup.string().required('First name is requried'),
    secondName: yup.string().required('Second name is required'),
    userType: yup
      .string()
      .nullable()
      .oneOf(['STUDENT', 'INSTRUCTOR', 'PARENT'])
      .required('A user type is required'),
    email: yup
      .string()
      .email('Provided Email is invalid')
      .required('Email is required to signup.'),
    country: yup.string().required(),
    password: yup.string().required('Passord is required to signup.'),
    password2: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('This is a required field'),
  });

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
      <Typography
        variant='h6'
        align='center'
        style={{ fontFamily: 'monospace', margin: '20px auto' }}
      >
        Create Free Account:{' '}
      </Typography>
      <Divider />
      <FormControl sx={{ m: 1, minWidth: 120 }} className={classes.select}>
        <InputLabel style={{ marginLeft: '10px' }} id='select-user-type'>
          Type of User
        </InputLabel>
        <Select
          labelId='select-user-type'
          variant='outlined'
          {...register('userType')}
          error={errors.userType ? true : false}
        >
          <MenuItem value='' disabled>
            <em>None</em>
          </MenuItem>
          <Divider />
          <MenuItem value='STUDENT'>Student</MenuItem>
          <MenuItem value='INSTRUCTOR'>Instructor</MenuItem>
          <MenuItem value='PARENT'>Parent</MenuItem>
        </Select>
        <FormHelperText>
          {errors.userType ? errors.userType.message : ''}
        </FormHelperText>
      </FormControl>
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

      <FormControl sx={{ m: 1, minWidth: 120 }} className={classes.select}>
        <InputLabel style={{ marginLeft: '10px' }} id='select-country'>
          Country
        </InputLabel>
        <Select
          labelId='select-country'
          variant='outlined'
          {...register('country')}
          error={errors.school ? true : false}
        >
          <MenuItem value='' disabled>
            <em>None</em>
          </MenuItem>
          <Divider />
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.code}>
              <Box
                component='li'
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                // {...props}
              >
                <img
                  loading='lazy'
                  width='20'
                  src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                  alt=''
                />
                {country.label} ({country.code}) +{country.phone}
              </Box>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {errors.country ? errors.country.message : ''}
        </FormHelperText>
      </FormControl>
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
