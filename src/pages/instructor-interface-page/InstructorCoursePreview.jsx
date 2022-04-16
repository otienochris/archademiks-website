import React, { useState } from 'react';
import CustomButton from '../../components/custom-controls/CustomButton';
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';

export default function InstructorCoursePreview({ course }) {
  const handleViewButton = () => {};
  return (
    <Card style={{ margin: '20px' }}>
      <CardMedia
        component={'img'}
        height='100'
        image={course.thumbnail}
        alt='course thumbnail'
      />
      <CardContent>
        <Typography variant='body1'>{course.title}</Typography>
        <Typography variant='h6'>10 Assignments</Typography>
        <Typography variant='h6'>{course.topics.length} Modules</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button variant='contained' color='primary' onClick={handleViewButton}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
