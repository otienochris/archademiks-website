import { Box, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import InstructorCoursePreview from './InstructorCoursePreview';

export default function InstructorCourses({
  courses,
  setCourseToViewOrEdit,
  setViewCourse,
  setEditCourse,
}) {
  return (
    <>
      <Typography style={{ margin: '23px auto' }} align='left' variant='h6'>
        My Courses
      </Typography>
      <Divider />
      <Grid container>
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
                setEditCourse={setEditCourse}
                course={course}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
