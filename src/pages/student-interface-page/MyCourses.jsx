import { Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import CourseInProgressPreview from '../../components/CourseInProgressPreview';

export default function MyCourses({
  courses,
  setContinueLearning,
  setCourseToContinue,
}) {
  const userId = useSelector((state) => state.user.value.id);
  const enrollmentDetails = useSelector((state) =>
    state.courseEnrollments.value.filter((item) => item.studentId === userId)
  );

  return (
    <>
      <Typography variant='h6'>My Courses</Typography>
      <Grid container justifyContent={'center'}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={8} md={4} key={index}>
            <Box
              sx={{
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CourseInProgressPreview
                course={course}
                setContinueLearning={setContinueLearning}
                setCourseToContinue={setCourseToContinue}
                enrollmentDetails={enrollmentDetails.filter(
                  (enrollmentDetail) =>
                    parseInt(enrollmentDetail.courseId) ===
                      parseInt(course.id) &&
                    parseInt(enrollmentDetail.studentId) === parseInt(userId)
                )}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
