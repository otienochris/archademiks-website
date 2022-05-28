import { makeStyles } from '@material-ui/core';
import React from 'react';
// import CustomAppBar from './CustomAppBar';
import CustomAppBar2 from './CustomAppBar2';

const useStyles = makeStyles({
  main: {
    backgroundColor: 'whitesmoke',
  },
  children: {
    marginTop: '58px',
  },
});

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <CustomAppBar2 />
      <div className={classes.children}>{children}</div>
    </div>
  );
}
