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
import CustomMaterialTable from '../../components/CustomMaterialTable';

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

  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

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

      <Grid item xs={12} sm={0} lg={0}>
        {/* <Typography>Go to larger screen to view the charts</Typography> */}
      </Grid>
      <Grid item xs={12} sm={0}></Grid>

      <Grid item sm={12}>
        {isDesktop ? (
          <ChartComponent
            title={'Sales per year: '}
            data={salesPerMonth}
            xaxisKey={'month'}
            lineOneKey={'amount'}
          />
        ) : (
          <div style={{ margin: '20px auto' }}>
            <CustomMaterialTable
              style={{ margin: '10px auto' }}
              title={'Sales'}
              data={salesPerMonth.flatMap((item) => {
                const sum = item.data
                  .flatMap((item2) => item2.amount)
                  .reduce((prev, curr) => prev + curr);
                return { year: item.year, amount: sum };
              })}
              columns={[
                { title: 'Year', field: 'year' },
                { title: 'Total Amount', field: 'amount' },
              ]}
              allowActions={false}
              allowSearch={false}
              allowGrouping={false}
            />
          </div>
        )}
      </Grid>
      <Grid item sm={12}>
        {isDesktop ? (
          <ChartComponent
            title={'User enrollments per year: '}
            data={userPerMonth}
            xaxisKey={'month'}
            lineOneKey={'students'}
            lineTwoKey={'instructors'}
          />
        ) : (
          <div style={{ margin: '20px auto' }}>
            <CustomMaterialTable
              style={{ margin: '10px auto' }}
              title={'Users'}
              data={userPerMonth.flatMap((item) => {
                const instructorsNo = item.data
                  .flatMap((item2) => item2.instructors)
                  .reduce((prev, curr) => prev + curr);
                const studentsNo = item.data
                  .flatMap((item2) => item2.students)
                  .reduce((prev, curr) => prev + curr);
                return {
                  year: item.year,
                  noOfUsers: instructorsNo + studentsNo,
                };
              })}
              columns={[
                { title: 'Year', field: 'year' },
                { title: 'Enrolled Users', field: 'noOfUsers' },
              ]}
              allowActions={false}
              allowSearch={false}
              allowGrouping={false}
            />
          </div>
        )}
      </Grid>

      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default AdminDashboard;
