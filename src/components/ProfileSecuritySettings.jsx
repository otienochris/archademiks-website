import {
  Button,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import CustomButton from './custom-controls/CustomButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto',
  },
});

function ProfileSecuritySettings({ email }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} style={{ margin: '10px auto' }}>
        <Typography variant='h4' align='center'>
          Account
        </Typography>
        <Typography variant='body2' align='center'>
          Edit your account settings and change your password here.
        </Typography>
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
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={11} sm={10} md={6} style={{ margin: '10px auto' }}>
        <Typography variant='subtitle2'>Password:</Typography>
        <TextField
          placeholder='Current Password'
          variant='outlined'
          style={{ color: 'black' }}
          fullWidth
          type={'password'}
          className={classes.textField}
        />
        <TextField
          placeholder='New Password'
          variant='outlined'
          style={{ color: 'black' }}
          fullWidth
          type={'password'}
          className={classes.textField}
        />
        <TextField
          placeholder='Confirm New Password'
          variant='outlined'
          style={{ color: 'black' }}
          fullWidth
          type={'password'}
          className={classes.textField}
        />
        <CustomButton
          type='submit'
          text={'Change Password'}
          color='secondary'
        />
      </Grid>
    </Grid>
  );
}

export default ProfileSecuritySettings;
