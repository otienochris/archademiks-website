import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const useStyles = makeStyles({
  spans: {
    color: 'green',
  },
  gridItem: {
    margin: 'auto auto',
    width: '100%',
  },
  whatWeOfferTitle: {
    margin: '30px auto',
    textAlign: 'center',
    // backgroundColor: 'green',
    width: '100%',
  },
  gridContainer: {
    margin: '60px auto',
  },
  paper: {
    padding: '20px',
    margin: '20px auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '350px',
  },
  icon: {
    margin: '20px auto',
  },
});
export default function WhatWeOffer(props) {
  const classes = useStyles();
  return (
    <Container style={{ maxWidth: '100vw' }}>
      <Typography variant='h3' className={classes.whatWeOfferTitle}>
        What we <span className={classes.spans}>Offer</span>
        <hr />
      </Typography>
      <Grid
        container
        justifyContent='space-around'
        className={classes.gridContainer}
      >
        <Grid item xs={10} sm={6} md={3}>
          <Paper className={classes.paper} variant='outlined'>
            <SchoolIcon
              className={classes.icon}
              color='primary'
              style={{ fontSize: 100 }}
            />
            <Typography align='center' variant='h4'>
              Certification
            </Typography>
            <Typography align='center' variant='body2'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
              sequi maiores porro. Dolor, totam saepe eligendi veritatis quos
              consectetur ullam odit! Mollitia aperiam harum ab magni. Qui
              incidunt quas hic!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={10} sm={6} md={3}>
          <Paper className={classes.paper} variant='outlined'>
            <VerifiedIcon
              className={classes.icon}
              color='secondary'
              style={{ fontSize: 100 }}
            />
            <Typography align='center' variant='h4'>
              Quality Content
            </Typography>
            <Typography align='center' variant='body2'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
              sequi maiores porro. Dolor, totam saepe eligendi veritatis quos
              consectetur ullam odit! Mollitia aperiam harum ab magni. Qui
              incidunt quas hic!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={10} sm={6} md={3}>
          <Paper className={classes.paper} variant='outlined'>
            <SupportAgentIcon
              className={classes.icon}
              color='success'
              style={{ fontSize: 100 }}
            />
            <Typography align='center' variant='h4'>
              Support
            </Typography>
            <Typography align='center' variant='body2'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
              sequi maiores porro. Dolor, totam saepe eligendi veritatis quos
              consectetur ullam odit! Mollitia aperiam harum ab magni. Qui
              incidunt quas hic!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
