import React, { useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const today = new Date();

function QuickStart({ title, data, borderColor }) {
  const useStyles = makeStyles({
    paper: {
      width: '300px',
      padding: '20px',
      margin: '5px auto',
      // border: borderColor == undefined ? '2px solid lightgrey' : borderColor,
      backgroundColor: 'black',
    },
    select: {
      minWidth: '100%',
    },
  });

  const classes = useStyles();
  const [count, setCount] = useState(data.length);
  const [period, setPeriod] = useState(0);

  const lastXMonths = (itemCreationDate, monthsBack) => {
    const yearsX = monthsBack / 12;
    const monthX = monthsBack % 12;
    if (
      today.getMonth() + 1 < monthsBack &&
      itemCreationDate.getTime() >=
        new Date(
          today.getFullYear() - 1, // step one year back
          12 - (monthsBack - today.getMonth() + 1), // get current month
          1,
          null,
          null,
          null,
          0
        )
    ) {
      setCount((current) => current + 1);
    } else if (
      itemCreationDate.getTime() >=
      new Date(
        today.getFullYear(),
        today.getMonth() + 1 - monthsBack,
        1,
        null,
        null,
        null,
        0
      )
    ) {
      setCount((current) => current + 1);
    }
  };

  const handlePeriodSelection = (event) => {
    const currentPeriod = event.target.value;
    setPeriod(currentPeriod);
    setCount(0);

    if (currentPeriod == 0) {
      setCount(data.length);
    } else if (currentPeriod == 1) {
      data.map((item) => {
        lastXMonths(new Date(item.creationDate), 1);
      });
    } else if (currentPeriod == 2) {
      data.map((item) => {
        lastXMonths(new Date(item.creationDate), 3);
      });
    } else if (currentPeriod == 3) {
      data.map((item) => {
        lastXMonths(new Date(item.creationDate), 6);
      });
    } else if (currentPeriod == 4) {
      data.map((item) => {
        // lastXMonths(new Date(item.creationDate), 12);
        const itemCreationDate = new Date(item.creationDate);
        const startingDate = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate(),
          null,
          null,
          null,
          0
        );
        if (itemCreationDate.getTime() >= startingDate.getTime()) {
          setCount((current) => current + 1);
        }
      });
    }
  };

  return (
    <Paper className={classes.paper} variant='outlined'>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant='h6' style={{ color: '#FFF8F0' }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth style={{ color: '#FFF8F0' }}>
            <InputLabel style={{ color: '#FFF8F0' }}>Period</InputLabel>
            <Select
              value={period}
              onChange={handlePeriodSelection}
              style={{
                backgroundColor: 'white',
              }}
            >
              <MenuItem value={0}>
                <em>All</em>
              </MenuItem>
              <MenuItem value={1}>Last 1 Month</MenuItem>
              <MenuItem value={2}>Last 3 Months</MenuItem>
              <MenuItem value={3}>Last 6 Months</MenuItem>
              <MenuItem value={4}>Last 1 Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h3' style={{ color: '#F18805' }}>
            {count}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1' style={{ color: '#FFF8F0' }}>
            {data.length === 0 ? 100 : Math.round((count / data.length) * 100)}{' '}
            <span>%</span>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default QuickStart;
