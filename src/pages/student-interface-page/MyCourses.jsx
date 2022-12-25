import { Typography, Box, Grid, Divider } from '@material-ui/core';
import React from 'react';
import CourseInProgressPreview from '../../components/CourseInProgressPreview';

export default function MyCourses({
  courseEnrollments,
  setContinueLearning,
  setCourseToContinue,
  setCurrentCourseEnrollmentId
}) {

  return (
    <>
      <Typography variant='h6'>My Courses</Typography>
      <Divider />
      <Grid container>
        {courseEnrollments.map((courseEnrollment, index) => (
          <Grid item xs={12} sm={8} md={4} key={index}>
            <Box
              sx={{
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CourseInProgressPreview
                course={courseEnrollment.course}
                courseEnrollmentId={courseEnrollment.courseEnrollmentId}
                completedTopics={courseEnrollment.completedTopics}
                setContinueLearning={setContinueLearning}
                setCourseToContinue={setCourseToContinue}
                setCurrentCourseEnrollmentId={setCurrentCourseEnrollmentId}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
