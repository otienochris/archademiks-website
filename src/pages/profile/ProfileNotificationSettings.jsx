import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect } from 'react';

const schema = yup.object({
  promotion: yup.bool(),
  announcement: yup.bool(),
  purchase: yup.bool(),
  dropout: yup.bool(),
});

function ProfileNotificationSettings({ userType, userId, notifications }) {
  const { register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });


  const onSubmit = (data) => {
    data.userId = userId;
    console.log(data);
    // TODO: persist
  };

  useEffect(() => {
    if (notifications != undefined) {
      if (notifications.promotions != undefined) {
        setValue('promotion', notifications.promotions);
      }
      if (notifications.announcements != undefined) {
        setValue('announcement', notifications.announcements);
      }
      if (notifications.purchases != undefined) {
        setValue('purchase', notifications.purchases);
      }
      if (notifications.dropouts != undefined) {
        setValue('dropout', notifications.dropouts);
      }
    }
  }, []);

  return (
    <Grid container>
      <Grid item xs={11} style={{ margin: '10px auto' }}>
        <Typography variant='h4' align='center'>
          Notifications
        </Typography>
        <Typography variant='body2' align='center'>
          Opt in or out of promotional messages from Akademi
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        item
        xs={11}
        sm={10}
        md={6}
        style={{
          margin: '10px auto',
        }}
      >
        <Typography
          variant='h6'
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            padding: '5px',
            borderBottom: '2px solid grey',
          }}
        >
          I want to receive notifications on:
        </Typography>
        {notifications == undefined ?
          <Container>Not yet allowed to configure notification settings</Container> :
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              {userType === 'STUDENT' || userType === 'PARENT' ? (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={notifications == undefined && notifications.promotions}
                        {...register('promotion')}
                      />
                    }
                    label='Promotions, course recommendations, and helpful resources from Akademy'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={notifications == undefined && notifications.announcements}
                        {...register('announcement')}
                      />
                    }
                    label="Announcements from instructors whose course(s) I'm enrolled in."
                  />
                </>
              ) : (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={notifications == undefined && notifications.purchases}
                        {...register('purchase')}
                      />
                    }
                    label='Each course purchase.'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={notifications.dropouts}
                        {...register('dropout')}
                      />
                    }
                    label='Each course dropout.'
                  />
                </>
              )}
              <Button
                color={'secondary'}
                variant={'contained'}
                onClick={handleSubmit}
                type='submit'
                style={{ margin: '40px 0px 20px 0px', width: '200px' }}
              >
                Submit Changes
              </Button>
            </FormGroup>
          </form>}
      </Grid>
    </Grid>
  );
}

export default ProfileNotificationSettings;
