import {
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import CustomButton from './custom-controls/CustomButton';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto',
  },
});

function ProfileDataSettings() {
  const classes = useStyles();
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
        <div>
          <Typography variant='subtitle2'>User Type:</Typography>
        </div>
        <div style={{ margin: '5px auto' }}>
          <Typography variant='subtitle2'>Joined on:</Typography>
          <TextField
            placeholder='Joine On'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            value={new Date('2022-01-01').toDateString()}
            className={classes.textField}
          />
        </div>
        <div>
          <Typography variant='subtitle2'>Modified on:</Typography>
          <TextField
            placeholder='Last Modified On:'
            variant='outlined'
            style={{ color: 'black' }}
            fullWidth
            value={new Date('2022-01-01').toDateString()}
            className={classes.textField}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={11} sm={10} md={6} style={{ margin: '10px auto' }}>
        <Typography variant='subtitle2'>Basics:</Typography>
        <TextField
          placeholder='Change Your First Name'
          variant='outlined'
          style={{ color: 'black' }}
          fullWidth
          className={classes.textField}
        />
        <TextField
          placeholder='Change Your Last Name'
          variant='outlined'
          style={{ color: 'black' }}
          fullWidth
          className={classes.textField}
        />
        <TextField
          placeholder='Change Your Title'
          variant='outlined'
          style={{ color: 'black' }}
          fullWidth
          className={classes.textField}
        />
        <TextField
          placeholder='Change Description'
          multiline
          variant='outlined'
          style={{ color: 'black' }}
          fullWidth
          className={classes.textField}
        />
        <CustomButton type='submit' text={'Save Changes'} color='secondary' />
      </Grid>
    </Grid>
  );
}

export default ProfileDataSettings;
