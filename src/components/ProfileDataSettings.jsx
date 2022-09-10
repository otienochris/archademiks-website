import {
  Box,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import CustomButton from './custom-controls/CustomButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  firstName: yup.string().min(5).max(50).required('Course Title is required.'),
  lastName: yup.string().min(5).max(50).required('Description is required.'),
  title: yup.string().max(200),
  description: yup.string().max(200),
});

const useStyles = makeStyles({
  textField: {
    margin: '10px auto',
  },
  title: {
    margin: 'auto 0px',
  },
  div: {
    margin: '0px auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    justifyItems: 'center',
  },
});

function ProfileDataSettings({
  userId,
  nationality,
  userType,
  dateJoined,
  dateModified,
  firstName,
  lastName,
  userTitle,
  userDescription,
}) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  useEffect(() => {
    setValue('firstName', firstName, { shouldValidate: true });
    setValue('lastName', lastName, { shouldValidate: true });
    setValue('title', userTitle, { shouldValidate: true });
    setValue('description', userDescription, { shouldValidate: true });
  }, [firstName, lastName, userTitle, userDescription]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid container>
      <Grid item xs={12} style={{ margin: '10px auto' }}>
        <Typography variant='h4' align='center'>
          Profile
        </Typography>
        <Typography variant='body2' align='center'>
          Add information about yourself
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={11} sm={10} md={6} style={{ margin: '10px auto' }}>
        <div className={classes.div}>
          <Typography variant='subtitle2'>Nationality:</Typography>
          <Box
            component='div'
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            style={{ display: 'flex' }}
          >
            <h6 style={{ margin: '5px' }}>{nationality}</h6>
            <img
              loading='lazy'
              width='20'
              src={`https://flagcdn.com/w20/${nationality.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${nationality.toLowerCase()}.png 2x`}
              alt=''
            />
          </Box>
        </div>
        <div className={classes.div}>
          <Typography className={classes.title} variant='subtitle2'>
            User type:
          </Typography>
          <TextField
            placeholder='Joine On'
            variant='outlined'
            style={{ marginRight: '0px' }}
            value={userType}
            className={classes.textField}
          />
        </div>
        <div className={classes.div}>
          <Typography className={classes.title} variant='subtitle2'>
            Joined on:
          </Typography>
          <TextField
            placeholder='Joine On'
            variant='outlined'
            style={{ marginRight: '0px' }}
            value={new Date(dateJoined).toDateString()}
            className={classes.textField}
          />
        </div>
        <div className={classes.div}>
          <Typography className={classes.title} variant='subtitle2'>
            Modified on:
          </Typography>
          <TextField
            placeholder='Last Modified On:'
            variant='outlined'
            style={{ marginRight: '0px' }}
            value={new Date(dateModified).toDateString()}
            className={classes.textField}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={11} sm={10} md={6} style={{ margin: '10px auto' }}>
        <Typography variant='subtitle2'>Basics:</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder='Enter Your First Name'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            className={classes.textField}
            {...register('firstName')}
            error={errors.firstName ? true : false}
            helperText={errors.firstName ? errors.firstName.message : ''}
          />
          <TextField
            placeholder='Enter Your Last Name'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            className={classes.textField}
            {...register('lastName')}
            error={errors.lastName ? true : false}
            helperText={errors.lastName ? errors.firstName.message : ''}
          />
          <TextField
            placeholder='Enter Your Title'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            className={classes.textField}
            {...register('title')}
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ''}
          />
          <TextField
            placeholder='Enter Description'
            multiline
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            className={classes.textField}
            {...register('description')}
            error={errors.description ? true : false}
            helperText={errors.description ? errors.description.message : ''}
          />
          <CustomButton type='submit' text={'Save Changes'} color='secondary' />
        </form>
      </Grid>
    </Grid>
  );
}

export default ProfileDataSettings;
