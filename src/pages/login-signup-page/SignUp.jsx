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
  CircularProgress,
} from '@material-ui/core';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { countries } from '../../components/CountrySelect';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addUser } from '../../state/reducers/allUsersReducer';
import { useState } from 'react';
import EmailVerification from './EmailVerification';

/**
 * The send email url accepts an email object as form data made using POST
 */

const sendEmailUrl =
  'http://localhost:8081/notification-service/mail/send-simple-message';
const baseUrl = "http://localhost:8083/lms/api/v1";
const saveStudentUrl = baseUrl + "/students/signup";
const saveInstructorUrl = baseUrl + "/instructors/signup";
const saveParentUrl = baseUrl + "/parents/signup";

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

const uuid = '' + uuidv4();

export default function SignUp({ setAction }) {
  const classes = useStyles();
  const dispacth = useDispatch();
  const [email, setEmail] = useState('');
  const [emailSendSuccessfully, setEmailSentSuccessfuly] = useState(false);
  const [userSaved, setUserSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const schema = yup.object({
    firstName: yup
      .string()
      .matches(
        '^[A-Za-z]+$',
        'First name cannot caintain spaces, digits or special characters'
      )
      .required('First name is requried'),
    secondName: yup
      .string()
      .matches(
        '^[A-Za-z]+$',
        'First name cannot caintain spaces, digits or special characters'
      )
      .required('Second name is required'),
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
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  const sendVerificationCode = async (email) => {
    const formData = new FormData();
    formData.append('to', email.toAddress);
    formData.append('subject', email.subject);
    formData.append('text', email.message);

    setIsLoading(true);

    await fetch(sendEmailUrl, {
      method: 'POST',
      mode: 'cors',
      body: formData,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setEmailSentSuccessfuly(true);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setIsLoading(false);
  };

  const saveUser = async (url, body) => {
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
      headers: {
        // Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHVkZW50MUBnbWFpbC5jb20iLCJleHAiOjE2NzEyMTExMjMsImlhdCI6MTY3MTE3NTEyM30.ibSZUEqyw4ut8-fh99Zes7h7D0V4EPPAuK9DiC-Ri9SBjRlJ-BI1Y9_b7Vv-GRhTLXw_vnWjl3akI1UP1vjZGA",
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setUserSaved(true);
          alert("User saved successfully");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  const saveUserInBackend = (data) => {
    console.log(data);
    const userObj = {
      firstName: data.firstName,
      lastName: data.secondName,
      email: data.email,
      countryCode: data.country,
      newPassword: data.password,
      courses: null,
      organizations: null,
      reviews: null,
      addresses: null,
      relatives: null,
      version: 0
    }

    switch (data.userType) {
      case "STUDENT":
        saveUser(saveStudentUrl, userObj);
        break;
      case "INSTRUCTOR":
        saveUser(saveInstructorUrl, userObj);
        break;
      case "PARENT":
        saveUser(saveParentUrl, userObj);
        break;

      default:
        break;
    }
  }

  const onSubmit = (data) => {

    // TODO save user
    saveUserInBackend(data);
    dispacth(addUser(data));

    setEmail(data.email);



    reset();
  };

  return (
    <>
      {emailSendSuccessfully ? (
        <EmailVerification
          setAction={setAction}
          email={email}
          setEmailVerified={setEmailVerified}
          emailVerified={emailVerified}
        />
      ) : (
        <form
          method='post'
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
        >
          <Typography
            variant='h5'
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
            disabled={emailSendSuccessfully}
            variant='contained'
            type='submit'
            className={classes.button}
            style={{ backgroundColor: '#ff8c00', color: 'black' }}
          >
            {isLoading ? <CircularProgress /> : 'signup'}
          </Button>
        </form>
      )}
    </>
  );
}
