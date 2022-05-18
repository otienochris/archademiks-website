import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import QuickStart from './QuickStart';
import { users } from '../../data/users';
import { list } from '../../data/courses';
import { sales } from '../../data/finances';
import { makeStyles } from '@material-ui/styles';
import FinancialQuickStat from './FinancialQuickStat';
import ChartComponent from './ChartComponent';
import { userPerMonth } from '../../data/reportData';
import { salesPerMonth } from '../../data/reportData';

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
    <Grid container alignContent='center' alignItems='center'>
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

      <Grid item xs={12}>
        <ChartComponent
          title={'users'}
          data={userPerMonth.data}
          xaxisKey={'month'}
          lineOneKey={'students'}
          lineTwoKey={'instructors'}
        />
      </Grid>

      <Grid item xs={12}>
        <ChartComponent
          title={'Sales'}
          data={salesPerMonth.data}
          xaxisKey={'month'}
          lineOneKey={'amount'}
        />
      </Grid>

      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default AdminDashboard;
