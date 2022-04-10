import { Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import CourseCard from '../../components/CourseCard';
import { list } from '../../data/courses';

export default function Index() {
  const [listOfCourses, setListOfCourses] = useState(list);
  return (
    <Container>
      <Grid container justifyContent='center'>
        {listOfCourses.map((course, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={8}
            md={6}
            lg={4}
            // xl={3}
            justifyContent='center'
          >
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
