import { makeStyles } from '@material-ui/core';
import React from 'react';
import CustomAppBar from './CustomAppBar';

const useStyles = makeStyles({
  children: {
    marginTop: '65px',
    backgroundImage:
      'linear-gradient(to right, white, whitesmoke, #FFFFFF, #EEEBD0, #EBB3A9, #E87EA1, #E86252)',
  },
});

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <CustomAppBar />
      <div className={classes.children}>{children}</div>
    </>
  );
}
