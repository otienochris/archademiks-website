import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import FinancialQuickStat from '../admin-interface-page/FinancialQuickStat';
import QuickStart from '../admin-interface-page/QuickStart';

function CourseStatics({ course }) {
  const courseEnrollmentDetails = useSelector(
    (state) => state.courseEnrollments.value
  );
  const reviews = useSelector((state) => state.reviews.value);
  console.log(course);
  return (
    <Grid container style={{ margin: '20px auto' }}>
      <Grid item xs={12} md={6}>
        <div>
          <QuickStart
            title={'In-progress'}
            borderColor={'2px solid lightgrey'}
            data={courseEnrollmentDetails.filter(
              (item) => item.courseId === course.id && item.status === 'pending'
            )}
          />
          <QuickStart
            borderColor={'2px solid yellowgreen'}
            title={'Completions'}
            data={courseEnrollmentDetails.filter(
              (item) =>
                item.courseId === course.id && item.status === 'completed'
            )}
          />
          <QuickStart
            borderColor={'2px solid red'}
            title={'Drop-Outs'}
            data={courseEnrollmentDetails.filter(
              (item) =>
                item.courseId === course.id && item.status === 'cancelled'
            )}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div style={{ width: '100%' }}>
          <FinancialQuickStat
            title={'Sales'}
            data={courseEnrollmentDetails.filter(
              (item) =>
                item.courseId === course.id &&
                (item.status === 'completed' || item.status === 'pending')
            )}
          />
          <QuickStart
            title={'Enrollments'}
            data={courseEnrollmentDetails.filter(
              (item) => item.courseId === course.id
            )}
          />
          <QuickStart
            title={'Reviews'}
            data={reviews.filter(
              (item) => item.type === 'Course' && item.typeId === course.id
            )}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default CourseStatics;
