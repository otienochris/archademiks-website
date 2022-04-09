import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  paper: {
    width: '150px',
  },
});

export default function CustomPaper(props) {
  const classes = useStyles();
  const { variant, ...others } = props;
  return (
    <Paper
      className={classes.paper}
      variant={variant || 'outlined'}
      square
      {...others}
    ></Paper>
  );
}
