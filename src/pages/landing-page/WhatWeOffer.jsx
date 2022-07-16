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
    height: '360px',
  },
  icon: {
    margin: '20px auto',
    fontSize: 70,
  },
});
export default function WhatWeOffer(props) {
  const classes = useStyles();
  return (
    <Container>
      <Typography variant='h3' className={classes.whatWeOfferTitle}>
        What we <span className={classes.spans}>Offer </span>:
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
              Certifications are the surest way to prove what you have learned
              and mastered. Akademi offers affordable courses that grant
              certificates of completion that are easily downloadable and
              sharable on social media.
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
              Our courses go through intense review and scrutiny by
              professionals to yield high quality content that meets current
              market needs. Enrolling and completing Akademi's courses improves
              your competitiveness globally.
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
              We value our clients. Therefore, we aim to provide the best
              learning experience through user friendly platform that require
              little support. However, if stuck, our support team are few
              seconds away.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
