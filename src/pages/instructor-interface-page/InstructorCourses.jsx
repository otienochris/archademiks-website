import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import InstructorCoursePreview from './InstructorCoursePreview';

export default function InstructorCourses({
  courses,
  setCourseToViewOrEdit,
  setViewCourse,
}) {
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
              <InstructorCoursePreview
                setCourseToViewOrEdit={setCourseToViewOrEdit}
                setViewCourse={setViewCourse}
                course={course}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
