import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  btn: {
    borderRadius: '0px 15px 0px 15px',
    margin: '24px',
  },
});

export default function CustomButton({ variant, color, text, ...others }) {
  const classes = useStyles();
  return (
    <Button
      className={classes.btn}
      variant={variant || 'contained'}
      color={color || 'primary'}
      {...others}
    >
      {text}
    </Button>
  );
}
