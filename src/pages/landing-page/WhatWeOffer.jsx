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
    color: '#ff8c00',
  },
  gridItem: {
    margin: 'auto auto',
    width: '100%',
  },
  whatWeOfferTitle: {
    margin: '30px auto',
    textAlign: 'center',
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
    border: '2px solid #ff8c00',
    backgroundColor: 'black',
    color: 'white',
  },
  icon: {
    margin: '20px auto',
    fontSize: 70,
  },
});
export default function WhatWeOffer(props) {
  const classes = useStyles();
  return (
    <Container style={{ maxWidth: '100%' }}>
      <Typography variant='h3' className={classes.whatWeOfferTitle}>
        What we <span className={classes.spans}>Offer</span>
      </Typography>
      <Grid
        container
        justifyContent='space-around'
        className={classes.gridContainer}
      >
        <Grid item xs={10} sm={6} md={3}>
          <Paper className={classes.paper} variant='outlined'>
            <SchoolIcon className={classes.icon} style={{ fontSize: 50 }} />
            <Typography
              align='center'
              variant='h4'
              style={{ color: '#ff8c00' }}
            >
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
            <VerifiedIcon className={classes.icon} style={{ fontSize: 50 }} />
            <Typography
              align='center'
              variant='h4'
              style={{ color: '#ff8c00' }}
            >
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
              style={{ fontSize: 50 }}
            />
            <Typography
              align='center'
              variant='h4'
              style={{ color: '#ff8c00' }}
            >
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
