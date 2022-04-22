import { Grid } from '@material-ui/core';
import React from 'react';
import CourseCard from '../../components/CourseCard';
import CourseLearningView from '../student-interface-page/CourseLearningView';

export default function StageFourOfCourseCreation({ course }) {
  return (
    <Grid container justifyContent='center'>
      <CourseCard course={course} />
      <CourseLearningView course={course} />;
    </Grid>
  );
}
