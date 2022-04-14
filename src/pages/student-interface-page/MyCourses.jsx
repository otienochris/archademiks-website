import { Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import CourseInProgressPreview from '../../components/CourseInProgressPreview';

export default function MyCourses({ courses, setContinueLearning }) {
  return (
    <>
      <Typography variant='h6'>My Courses</Typography>
      <Grid container justifyContent={'center'}>
        {courses.map((course) => (
          <Grid item xs={12} sm={8} md={4}>
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
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
