import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../state/reducers/allUsersReducer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const schema = yup.object({
  code: yup.string().required('Code is Required.'),
});

const uuid = '' + uuidv4();

const sendEmailUrl =
  'https://eucossa-notification-service.herokuapp.com/email/send/email-with-attachment';

const styles = makeStyles({
  form: {
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '300px',
    padding: '15px',
  },
  textField: {
    color: 'white',
  },
  submitBtn: {
    backgroundColor: '#ff8c00',
  },
  resendBtn: {
    backgroundColor: 'grey',
  },
  btnGroup: {
    marginTop: '20px',
  },
  header: {
    fontFamily: 'monospace',
  },
  divider: {},
  instructions: {
    marginTop: '10px',
    fontFamily: 'monospace',
    marginBottom: '40px',
  },
});

function EmailVerification({
  email,
  setEmailVerified,
  emailVerified,
  setAction,
}) {
  const classes = styles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSentSuccessfully, setEmailSentSuccessfuly] = useState(false);
  const users = useSelector((state) => state.allUsers.value);
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (users.filter((user) => user.email === email)[0].isDisabled) {
      console.log('verified');
    }
  }, [emailVerified]);

  const sendVerificationCode = async (email) => {
    const formData = new FormData();
    formData.append('emailTo', email.toAddress);
    formData.append('subject', email.subject);
    formData.append('message', email.message);

    setIsLoading(true);

    await fetch(sendEmailUrl, {
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

  const onResend = () => {
    const verificationCode = uuid.slice(14, 18);

    sendVerificationCode({
      toAddress: email,
      subject: 'Email Verification',
      message: '<p>' + verificationCode + '</p>',
    });

    reset();
  };

  const onSubmit = (data) => {
    data.email = email;
    dispatch(verifyEmail(data));
    setAction('login');
    setEmailVerified(true);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h4' className={classes.header}>
        Email Verification
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body2' className={classes.instructions}>
        We have sent a code to your email. Use it to verify your email to active
        your account
      </Typography>
      <TextField
        variant='outlined'
        label='Email Verification Code'
        placeholder='Enter Code sent to your email'
        className={classes.textField}
        {...register('code')}
        error={errors.code ? true : false}
        helperText={errors.code ? errors.code.message : ''}
      />

      {isLoading ? (
        <CircularProgress style={{ margin: 'auto' }} />
      ) : (
        <ButtonGroup
          fullWidth
          className={classes.btnGroup}
          disabled={isLoading}
        >
          <Button
            type='submit'
            variant='contained'
            className={classes.submitBtn}
          >
            Submit
          </Button>
          <Button
            fullWidth
            variant='outlined'
            className={classes.resendBtn}
            onClick={onResend}
          >
            Resend
          </Button>
        </ButtonGroup>
      )}
    </form>
  );
}

export default EmailVerification;
