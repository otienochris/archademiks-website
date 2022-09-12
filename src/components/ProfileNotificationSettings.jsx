import {
  Button,
  Checkbox,
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
    setValue('promotion', notifications.promotions);
    setValue('announcement', notifications.announcements);
    setValue('purchase', notifications.purchases);
    setValue('dropout', notifications.dropouts);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            {userType === 'STUDENT' || userType === 'PARENT' ? (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={notifications.promotions}
                      {...register('promotion')}
                    />
                  }
                  label='Promotions, course recommendations, and helpful resources from Akademy'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={notifications.announcements}
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
                      defaultChecked={notifications.purchases}
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
        </form>
      </Grid>
    </Grid>
  );
}

export default ProfileNotificationSettings;
