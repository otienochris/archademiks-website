import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import QuickStart from './QuickStart';
import { users } from '../../data/users';
import { list } from '../../data/courses';
import { sales } from '../../data/finances';
import { makeStyles } from '@material-ui/styles';
import FinancialQuickStat from './FinancialQuickStat';

const useStyles = makeStyles({
  mainGrid: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
});

function AdminDashboard() {
  const classes = useStyles();
  const [students, setStudents] = useState(
    users.filter((user) => user.type == 'student')
  );
  const [tutors, setTutors] = useState(
    users.filter((user) => user.type == 'instructor')
  );

  return (
    <Grid container>
      <Grid container className={classes.mainGrid}>
        <Grid item xs={12} sm={6} lg={3}>
          <QuickStart title={'Students'} data={students} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <QuickStart title={'Tutors'} data={tutors} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <QuickStart title={'Courses'} data={list} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <FinancialQuickStat
            title={'Sales'}
            data={sales}
            conversionRate={116.41}
          />
        </Grid>
      </Grid>
      <Grid></Grid>
      <Grid></Grid>
    </Grid>
  );
}

export default AdminDashboard;
