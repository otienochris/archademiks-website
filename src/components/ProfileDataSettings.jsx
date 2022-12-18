import {
  Box,
  Button,
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
import { ROLES } from '../commons/roles';
import { LMS_INSTRUCTORS, LMS_STUDENTS } from '../commons/urls';
import { useSelector } from 'react-redux';

const schema = yup.object({
  firstName: yup
    .string()
    .min(5)
    .max(50)
    .matches(
      '^[A-Za-z]+$',
      'First name cannot caintain spaces, digits or special characters'
    )
    .required('Course Title is required.'),
  lastName: yup
    .string()
    .min(5)
    .max(50)
    .matches(
      '^[A-Za-z]+$',
      'First name cannot caintain spaces, digits or special characters'
    )
    .required('Description is required.'),
  title: yup.string().max(200).nullable(),
  description: yup.string().max(200).nullable(),
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

function ProfileDataSettings({ user }) {
  console.log(user)
  const classes = useStyles();
  const loginDetails = useSelector((state) => state.login.value);
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
    setValue('firstName', user.firstName, { shouldValidate: true });
    setValue('lastName', user.lastName, { shouldValidate: true });
    console.log(loginDetails.role === ROLES.INSTRUCTOR)
    if (loginDetails.role === ROLES.INSTRUCTOR) {
      setValue('title', user.title, { shouldValidate: true });
      setValue('description', user.description, { shouldValidate: true });
    }
  }, [user]);

  const saveChanges = async (url, body) => {
    await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(body),
      headers: {
        Authorization: "Bearer " + loginDetails.token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }

    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }


  const onSubmit = (data) => {
    console.log(data)
    switch (loginDetails.role) {
      case ROLES.INSTRUCTOR:
        const url1 = LMS_INSTRUCTORS + "/" + user.instructorId;
        const instructorObj = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: user.email,
          title: data.title,
          description: data.description,
          countryCode: user.country,
          version: user.version,
          reviews: null,
          organizations: null,
          addresses: null,
          courses: null
        }
        saveChanges(url1, instructorObj);
        break;
      case ROLES.STUDENT:

        const url2 = LMS_STUDENTS + "/" + user.studentId;
        const studentObj = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: user.email,
          countryCode: user.countryCode,
          version: user.version
        }
        console.log(studentObj);
        saveChanges(url2, studentObj);
        break;
      case ROLES.PARENT:
        const url3 = LMS_INSTRUCTORS;
        const parentObj = {

        }
        saveChanges(url3, parentObj);
        break;

      default:
        break;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} style={{ margin: '20px auto' }}>
        <Typography variant='h4' align='center'>
          Profile
        </Typography>
        <Typography variant='body2' align='center'>
          Add information about yourself
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={11} sm={10} md={6} style={{ margin: '10px auto' }}>
        <Typography
          variant='h6'
          align='center'
          style={{
            marginBottom: '20px',
            width: '100px',
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          Account
        </Typography>
        <div className={classes.div}>
          <Typography className={classes.title} variant='subtitle2'>
            User type:
          </Typography>
          <TextField
            placeholder='Joine On'
            variant='outlined'
            style={{ marginRight: '0px' }}
            value={loginDetails.role}
            className={classes.textField}
            InputProps={{
              readOnly: true,
            }}
            size='small'
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
            value={new Date(user.creationDate).toDateString()}
            className={classes.textField}
            size='small'
            InputProps={{
              readOnly: true,
            }}
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
            value={new Date(user.modificationDate).toDateString()}
            className={classes.textField}
            size='small'
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={11} sm={10} md={6} style={{ margin: '10px auto' }}>
        <Typography
          variant='h6'
          align='center'
          style={{
            marginBottom: '20px',
            width: '100px',
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          Basics
        </Typography>
        <div className={classes.div} style={{ margin: '20px auto' }}>
          <Typography variant='subtitle2'>Country:</Typography>
          <Box
            component='div'
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            style={{ display: 'flex' }}
          >
            <h6 style={{ margin: '5px' }}>{user.countryCode}</h6>
            <img
              loading='lazy'
              width='20'
              src={`https://flagcdn.com/w20/${user.countryCode.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${user.countryCode.toLowerCase()}.png 2x`}
              alt=''
            />
          </Box>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='First Name'
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
            label='Last Name'
            placeholder='Enter Your Last Name'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            className={classes.textField}
            {...register('lastName')}
            error={errors.lastName ? true : false}
            helperText={errors.lastName ? errors.lastName.message : ''}
          />
          {loginDetails.role === ROLES.INSTRUCTOR && <TextField
            label='Title'
            placeholder='Enter Your Title'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            className={classes.textField}
            {...register('title')}
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ''}
          />}
          {loginDetails.role === ROLES.INSTRUCTOR && <TextField
            label='Description'
            placeholder='Enter Description'
            multiline
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            className={classes.textField}
            {...register('description')}
            error={errors.description ? true : false}
            helperText={errors.description ? errors.description.message : ''}
          />}

          <Button
            type='submit'
            onClick={handleSubmit(onSubmit)}
            // className={classes.btn}
            variant={'contained'}
            color={'secondary'}
          >
            Save Changes
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default ProfileDataSettings;
