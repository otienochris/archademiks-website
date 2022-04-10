import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Contacts', path: '/contacts' },
  { title: 'Courses', path: '/courses' },
];

const useStyle = makeStyles({
  toolBar: {
    display: 'flex',
    flexDirection: 'column',
  },
  typography: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#fefefe',
    color: 'black',
  },
  navlink: {
    color: 'black',
    textDecoration: 'none',
    margin: '30px 5px',
  },
  activeNavLink: {
    borderBottom: '2px solid orange',
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold',
    margin: '30px 5px',
  },
  linkSection: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    width: '100%',
    padding: '10px',
  },
  logoUserSection: {},
});

export default function CustomAppBar() {
  const classes = useStyle();

  return (
    <AppBar position='static' className={classes.appBar} elevation={1}>
      <Toolbar className={classes.toolBar}>
        <Grid container className={classes.logoUserSection}>
          <Typography variant='h6' className={classes.typography}>
            Archademiks
          </Typography>
          <NavLink to={'/login-signup'}>
            <Button startIcon={<Avatar />} />
          </NavLink>
        </Grid>
        {/* <CustomButton text='Enroll Now' variant='outlined' /> */}
        <Grid container className={classes.linkSection}>
          {pages.map((page, index) => {
            return (
              <Grid item key={index}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.activeNavLink : classes.navlink
                  }
                  key={page.path}
                  to={page.path}
                >
                  {page.title}
                </NavLink>
              </Grid>
            );
          })}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
