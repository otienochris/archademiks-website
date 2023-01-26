import React, { useState } from 'react';
import CustomButton from '../../components/custom-controls/CustomButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../../state/reducers/userReducer';
import { loginAction } from '../../state/reducers/loginReducer';
import { TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { LMS_AUTHENTICATION, LMS_INSTRUCTORS, LMS_STUDENTS, NOTIFICATION_SEND_SIMPLE_MAIL } from '../../commons/urls';
import { ROLES } from '../../commons/roles';
import { toast } from 'react-toastify';

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
    padding: '20px',
  },
});

const schema = yup.object({
  email: yup
    .string()
    .email('Provided Email is invalid')
    .required('Email is required.'),
  password: yup.string().required('Passord is required to log in.'),
});

export default function LogIn() {
  const users = useSelector((state) => state.allUsers.value);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState(users);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSentSuccessfuly, setEmailSentSuccessfuly] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const fetchLoggedInUserDetails = async (url, token, role) => {
    console.log("url " + url)
    await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          response.json().then((data) => {
            dispatch(setLoggedInUser({ user: data }));
            if (!wrongCredentials) {
              switch (role) {
                case ROLES.INSTRUCTOR:
                  navigate('/instructor');
                  break;
                case ROLES.STUDENT:
                  navigate('/students');
                  break;
                case ROLES.SUPER_ADMIN:
                  navigate('/admin');
                  break;
                case ROLES.ADMIN:
                  navigate('/admin');
                  break;
                default:
                  break;
              }
            }
          })
        } else if (response.status == 400) {
          response.body(data => {
            toast.error(data.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          })
        }
      })
      .catch((error) => {
        toast.error("Error occurred while ", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        console.log(error)
      });
  }

  const authenticateUser = async (username, password) => {
    await fetch(LMS_AUTHENTICATION, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ username, password }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then(data => {
          const role = data.role;
          const token = data.token;
          dispatch(loginAction({ isLoggedIn: true, token, role }));
          toast.success("Welcome Back", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          switch (role) {
            case ROLES.INSTRUCTOR:
              fetchLoggedInUserDetails(LMS_INSTRUCTORS + "/username/" + username, token, role);
              break;
            case ROLES.STUDENT:
              fetchLoggedInUserDetails(LMS_STUDENTS + "/username/" + username, token, role);
              break;
            case ROLES.ADMIN:
            case ROLES.SUPER_ADMIN:
              dispatch(setLoggedInUser({ user: { firstName: "SUPER", lastName: "ADMIN" } }));
              navigate('/admin');
              break;
            default:
              break;
          }
        })
      } else if (response.status >= 400 && response.status < 500) {
        response.json().then(data => {
          toast.error(data.message, { position: toast.POSITION.TOP_CENTER });
        })
      }
    })
      .catch((error) => {
        console.log(error)
      });
  }

  const onSubmit = (data) => {
    authenticateUser(data.email, data.password);
  };

  const sendChangePasswordCode = async (emailToSendCode) => {
    const uuid = '' + uuidv4();
    const url = window.location.origin;
    const formData = new FormData();
    formData.append('emailTo', emailToSendCode);
    formData.append('subject', 'Change Password');
    formData.append('message', url + '/reset-password?token=' + uuid);

    setIsLoading(true);

    await fetch(NOTIFICATION_SEND_SIMPLE_MAIL, {
      method: 'POST',
      mode: 'cors',
      body: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          setEmailSentSuccessfuly(true);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setIsLoading(false);
  };

  return (
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
        {forgotPassword ? 'Change Password' : 'Login'}
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
      {forgotPassword ? undefined : (
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
      )}
      {forgotPassword ? undefined : (
        <CustomButton type='submit' text='Log In' className={classes.button} />
      )}
      {forgotPassword ? (
        <CustomButton
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress /> : ''}
          onClick={() => sendChangePasswordCode(getValues('email'))}
          text={isLoading ? '' : !emailSentSuccessfuly ? 'Submit' : 'Re-submit'}
          className={classes.button}
        />
      ) : (
        <CustomButton
          onClick={() => setForgotPassword(true)}
          variant='text'
          text='Forgot Password'
          style={{ margin: '0px' }}
        />
      )}
    </form>
  );
}
