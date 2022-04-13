import { makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  textFieldStyle: {
    margin: theme.spacing(2),
  },
}));

export default function CustomTextField(props) {
  const classes = useStyles();
  const {
    label,
    inputError,
    placeholder,
    color,
    helperText,
    autoComplete,
    variant,
    ...others
  } = props;
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      color={color || 'primary'}
      autoComplete='off'
      variant={variant || 'outlined'}
      className={classes.textFieldStyle}
      error={inputError ? true : false}
      helperText={inputError ? inputError.message : ''}
      {...others}
    />
  );
}
