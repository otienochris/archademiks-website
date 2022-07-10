import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  styled,
  Typography,
} from '@material-ui/core';
import { CardActions } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomButton from './custom-controls/CustomButton';
import CourseProgress from '../pages/student-interface-page/CourseProgress';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CourseInProgressPreview({
  course,
  setContinueLearning,
  setCourseToContinue,
  enrollmentDetails,
}) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleContinueLearnig = () => {
    setCourseToContinue(course);
    setContinueLearning(true);
  };
  return (
    <Card style={{ margin: '20px' }}>
      <CardMedia
        component={'img'}
        height='194'
        image={course.thumbnail}
        alt='course thumbnail'
      />
      <CardContent>
        <Typography variant='body1'>{course.title}</Typography>
      </CardContent>

      <CardActions style={{ margin: 'auto 0px' }}>
        <CourseProgress
          currentProgress={Math.floor(
            (enrollmentDetails[0].completedTopics.length /
              course.topics.length) *
              100
          )}
        />
        <CustomButton
          text='Continue Learning'
          variant='outlined'
          onClick={handleContinueLearnig}
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <ButtonGroup fullWidth style={{ margin: 'auto 0px' }}>
          <Button variant='outlined' color='primary'>
            <Typography variant='body2'>10 Assignments</Typography>
          </Button>
          <Button variant='contained' color='primary'>
            <Typography variant='body2'>
              {course.topics.length} modules
            </Typography>
          </Button>
          <Button variant='outlined' color='primary'>
            <Typography variant='body1'>
              {Math.floor(
                (enrollmentDetails[0].completedTopics.length /
                  course.topics.length) *
                  100
              )}
              % Done
            </Typography>
          </Button>
        </ButtonGroup>
      </Collapse>
    </Card>
  );
}
