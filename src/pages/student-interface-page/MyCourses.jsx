import { Typography, Box, Grid, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CourseInProgressPreview from '../../components/CourseInProgressPreview';

export default function MyCourses({
  courseEnrollments,
  setContinueLearning,
  setCourseToContinue,
}) {

  console.log(courseEnrollments);

  const [courses, setCourses] = useState(courseEnrollments.flatMap(courseEnrollment => courseEnrollment.course));

  useEffect(() => {
    setCourses(courseEnrollments.flatMap(courseEnrollment => courseEnrollment.course))
  }, [])


  console.log(courses);

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
                setContinueLearning={setContinueLearning}
                setCourseToContinue={setCourseToContinue}
                enrollmentDetails={courseEnrollment}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
