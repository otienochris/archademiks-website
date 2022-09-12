import {
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useState } from 'react';
import FAQ from './FAQ';

const styles = makeStyles({
  image: {
    width: '150px',
    height: '150px',
  },
  searchArea: {
    minHeight: '40vh',
    display: 'flex',
    flexDirection: 'column',
    margin: '20px auto',
  },
  faqArea: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px auto',
  },
  title: {
    margin: 'auto',
    padding: '20px',
    fontFamily: 'monospace',
  },
  seachBar: {
    margin: 'auto',
  },
  mainContainer: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default function Index() {
  const classes = styles();
  return (
    <Container style={{ minHeight: '93.4vh' }}>
      <Grid container className={classes.mainContainer}>
        <Grid item xs={11} sm={10} md={8} className={classes.searchArea}>
          <div style={{ margin: 'auto' }}>
            <Typography className={classes.title} variant='h5' align='center'>
              Hello there, how can we help?
            </Typography>
            <TextField
              fullWidth
              variant='outlined'
              className={classes.seachBar}
              InputProps={{
                startAdornment: <Search />,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={10} className={classes.faqArea}>
          <FAQ />
        </Grid>
      </Grid>
    </Container>
  );
}
