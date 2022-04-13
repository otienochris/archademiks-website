import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';

const footerLinks = {
  explore: [
    { title: 'Courses', path: '/courses' },
    { title: 'Tutors', path: '/tutors' },
  ],
  about: [
    { title: 'Privacy and Policy', path: '/privacy-and-policy' },
    { title: 'Terms and Conditions', path: '/terms-and-conditions' },
    { title: 'Support', path: '/support' },
  ],
  community: [
    { title: 'Scholarships', path: '/privacy-and-policy' },
    { title: 'Free Courses', path: '/courses/free' },
    { title: 'Refer a friend', path: '/referrals' },
  ],
  socials: {
    noteToAudience: 'Follows us and grow your network through:',
    socialMedia: {
      facebook: 'https://www.facebook.com/ExpDEgerton/',
      instagram: 'https://www.instagram.com/archademiks/',
      twitter: '#',
    },
  },
};

const useStyles = makeStyles({
  mainCointaner: {
    margin: '150px auto 5px auto',
    textAlign: 'center',
    borderTop: '2px solid gold',
  },
  socials: {
    margin: '15px auto',
    padding: 'auto 20px',
  },
  about: {
    margin: '15px auto',
    padding: 'auto 20px',
    borderLeft: '1px solid grey',
  },
  community: {
    margin: '15px auto',
    padding: 'auto 20px',
    borderLeft: '1px solid grey',
    borderRight: '1px solid grey',
  },
  explore: {
    margin: '15px auto',
    padding: 'auto 20px',
    borderLeft: '1px solid grey',
  },
  navLink: {
    textDecoration: 'none',
    display: 'block',
    margin: '30px auto',
    color: '#497592',
  },
  socialIcons: {
    marginRight: '50px',
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.mainCointaner}
      justifyContent='space-evenly'
    >
      <Grid item className={classes.socials} xs={12} sm={5}>
        <Typography variant='body1'>
          {footerLinks.socials.noteToAudience}
        </Typography>
        <div className={classes.socials}>
          <a
            href={footerLinks.socials.socialMedia.facebook}
            target='_blank'
            rel='noopener noreferrer'
            className={classes.socialIcons}
          >
            <FacebookIcon fontSize='large' />
          </a>
          <a
            href={footerLinks.socials.socialMedia.instagram}
            target='_blank'
            rel='noopener noreferrer'
            className={classes.socialIcons}
          >
            <InstagramIcon fontSize='large' />
          </a>
          <NavLink
            to={footerLinks.socials.socialMedia.twitter}
            target='_blank'
            rel='noopener noreferrer'
            className={classes.socialIcons}
          >
            <TwitterIcon fontSize='large' />
          </NavLink>
        </div>
      </Grid>
      <Grid item className={classes.explore} xs={4} sm={2}>
        <Typography style={{ marginBotton: '30px' }}>Explore</Typography>
        {footerLinks.explore.map((exploreItem, index) => (
          <NavLink
            key={index}
            to={exploreItem.path}
            className={classes.navLink}
          >
            {exploreItem.title}
          </NavLink>
        ))}
      </Grid>
      <Grid item className={classes.about} xs={4} sm={3}>
        <Typography>About</Typography>
        {footerLinks.about.map((aboutItem, index) => (
          <NavLink key={index} to={aboutItem.path} className={classes.navLink}>
            {aboutItem.title}
          </NavLink>
        ))}
      </Grid>
      <Grid item className={classes.community} xs={4} sm={2}>
        <Typography>Community</Typography>
        {footerLinks.community.map((communityItem, index) => (
          <NavLink
            key={index}
            to={communityItem.path}
            className={classes.navLink}
          >
            {communityItem.title}
          </NavLink>
        ))}
      </Grid>
      <Grid item xs={12} style={{ marginTop: '30px' }}>
        <hr />
        <CopyrightIcon
          style={{ display: 'inline-block', margin: '30px auto auto auto' }}
        />
        <Typography style={{ display: 'block' }}>Copyright 2022</Typography>
      </Grid>
    </Grid>
  );
}
