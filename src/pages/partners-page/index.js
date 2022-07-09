import { Container, makeStyles } from '@material-ui/core';
import React from 'react';

const styles = makeStyles({
  image: {
    width: '150px',
    height: '150px',
  },
});

export default function Index() {
  const classes = styles();
  return <Container></Container>;
}
