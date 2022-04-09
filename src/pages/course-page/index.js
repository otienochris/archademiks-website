import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { list } from '../../data/courses';

export default function Index() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    const filteredCourse = list.filter((course) => course.id == courseId);
    setCourse(filteredCourse[0]);
  }, [courseId]);

  return (
    <Container>
      <Typography>{course.title}</Typography>
    </Container>
  );
}
