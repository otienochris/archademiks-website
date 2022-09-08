import {
  Container,
  Divider,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/custom-controls/CustomButton';

const schema = yup.object({
  password: yup.string().required('Passord is required to signup.'),
  password2: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('This is a required field'),
});

const useStyles = makeStyles({
  textField: {
    width: '300px',
    alignSelf: 'center',
    margin: '30px',
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
    backgroundColor: 'white',
    padding: '20px',
    margin: 'auto',
  },
});

function ResetPasswordView() {
  const classes = useStyles();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const body = { password: data.password, token: token };
    console.log(body);
    // TODO: call backend to actually change password
  };

  return (
    <Container
      style={{
        minHeight: '93.5vh',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        method='post'
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant='h4'
          align='center'
          style={{ fontFamily: 'monospace', margin: '20px auto' }}
        >
          Reset Password
        </Typography>
        <Divider />
        <TextField
          className={classes.textField}
          label='New Password'
          autoComplete='off'
          placeholder='Enter your new password'
          type={'password'}
          {...register('password')}
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password.message : ''}
        />

        <TextField
          className={classes.textField}
          label='Confirm Password'
          autoComplete='off'
          placeholder='Confirm your password'
          type={'password'}
          {...register('password2')}
          error={errors.password2 ? true : false}
          helperText={errors.password2 ? errors.password2.message : ''}
        />
        <CustomButton type='submit' text='Submit' className={classes.button} />
      </form>
    </Container>
  );
}

export default ResetPasswordView;
