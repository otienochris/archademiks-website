import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  btn: {
    borderRadius: '0px 15px 0px 15px',
    margin: '24px',
  },
});

export default function CustomButton(props) {
  const classes = useStyles();
  const { variant, color, text, ...others } = props;
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
