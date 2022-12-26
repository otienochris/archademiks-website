import {
  Button,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Email } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { LMS_USERS } from '../../commons/urls';

const schema = yup.object({
  oldPassword: yup.string().required('Old Password is required.'),
  password: yup.string().required('Password is required.'),
  password2: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('This is a required field'),
});

const useStyles = makeStyles({
  textField: {
    margin: '10px auto',
  },
});


function ProfileSecuritySettings({ email }) {
  const classes = useStyles();
  const token = useSelector((state) => state.login.value.token);
  const [passChanged, setPassChanged] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  const changePassword = async (url) => {
    await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }

    }).then(response => {
      if (response.status >= 200 || response.status < 300) {
        setPassChanged(true);
        alert("Password changed successfully")
      } else {
        alert("Error occured when changing password")
      }
      response.json()
    })
      .then(data => {
        if (passChanged) {
          console.log(data);
        }
      })
      .catch(error => console.log(error));
  }

  const onSubmit = (data) => {

    console.log(data);
    const api = LMS_USERS + "/changePassword?email=" + email + "&oldPassword=" + data.oldPassword + "&newPassword=" + data.password;
    changePassword(api)

    reset();
  };

  return (
    <Grid container>
      <Grid item xs={11} style={{ margin: '10px auto' }}>
        <Typography variant='h4' align='center'>
          Security
        </Typography>
        <Typography variant='body2' align='center'>
          Edit your account credentials here here.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={11} sm={10} md={6} style={{ margin: '10px auto' }}>
        <Typography variant='subtitle2'>Email:</Typography>
        <TextField
          placeholder='Change Your Email'
          variant='outlined'
          style={{ color: 'black' }}
          label='your email is: '
          fullWidth
          type={'email'}
          value={email}
          className={classes.textField}
          InputProps={{
            readOnly: true,
            startAdornment: <Email style={{ marginRight: '5px' }} />,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={11} sm={10} md={6} style={{ margin: '10px auto' }}>
        <form
          method='post'
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
        >
          <Typography variant='subtitle2'>Password:</Typography>
          <TextField
            placeholder='Current Password'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            type={'password'}
            className={classes.textField}
            {...register('oldPassword')}
            error={errors.oldPassword ? true : false}
            helperText={errors.oldPassword ? errors.oldPassword.message : ''}
          />
          <TextField
            placeholder='New Password'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            type={'password'}
            className={classes.textField}
            {...register('password')}
            error={errors.password ? true : false}
            helperText={errors.firstName ? errors.password.message : ''}
          />
          <TextField
            placeholder='Confirm New Password'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            type={'password'}
            className={classes.textField}
            {...register('password2')}
            error={errors.password2 ? true : false}
            helperText={errors.password2 ? errors.password2.message : ''}
          />
          <Button
            type='submit'
            onClick={handleSubmit(onSubmit)}
            variant={'contained'}
            color={'secondary'}
          >
            Change Password
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default ProfileSecuritySettings;
