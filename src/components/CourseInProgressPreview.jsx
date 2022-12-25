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
  CardActions,
  Grid,
  Divider,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CourseProgress from '../pages/student-interface-page/CourseProgress';
import { useNavigate } from 'react-router-dom';
import { LMS_COURSES } from '../commons/urls';
import { useSelector } from 'react-redux';

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
  courseEnrollmentId,
  setContinueLearning,
  setCourseToContinue,
  setCurrentCourseEnrollmentId,
  completedTopics
}) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.value.token);
  const [currentCourse] = useState(course);
  const [topics, setTopics] = useState([])
  const [currentCompletedTopics, setCurrentCompletedTopics] = useState(completedTopics)
  const [expanded, setExpanded] = useState(false);
  const [courseCompletionPercentage] = useState(Object.keys(currentCompletedTopics).length === 0 ? 0 : 60
    // Math.floor(
    //   (enrollmentDetails.completedTopics.length / topics.length) * 100
    // )
  );
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleContinueLearnig = () => {
    setCourseToContinue(currentCourse);
    setCurrentCourseEnrollmentId(courseEnrollmentId);
    setContinueLearning(true);
  };

  const getTopics = async () => {
    await fetch(LMS_COURSES + "/" + course.courseId + "/topics", {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          response.json()
            .then((data) => {
              setTopics(data._embedded.topicDtoList)
            })
            .catch((error) => {
              console.log(error)
            });
        } else {
          response.json()
            .then((data) => {
              alert(data.message)
            })
            .catch((error) => {
              console.log(error)
            });
        }
      })

  }

  useEffect(() => {
    getTopics();
  }, [])


  return (
    <Card style={{ margin: '20px', maxWidth: '300px' }}>
      <CardMedia
        component={'img'}
        height='194'
        image={currentCourse.thumbnailLink}
        alt='course thumbnail'
        style={{ height: '80px' }}
      />
      <CardContent style={{ height: '90px' }}>
        <Typography
          style={{
            fontFamily: 'monospace',
            margin: '20px 0px 0px 0px',
          }}
          variant='subtitle2'
        >
          {currentCourse.title}
        </Typography>
      </CardContent>

      <CardActions
        style={{
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          alignItems: '',
        }}
      >
        <CourseProgress currentProgress={courseCompletionPercentage} />
        <Button
          variant='contained'
          onClick={handleContinueLearnig}
          style={{
            flexGrow: 1,
            backgroundColor: '#ff8c00',
          }}
          color='primary'
        >
          <Typography
            variant='subtitle2'
            style={{
              fontFamily: 'monospace',
              color: '#230C0F',
            }}
          >
            {Object.keys(currentCompletedTopics).length == 0
              ? 'Start Course'
              : Object.keys(currentCompletedTopics).length <
                topics.length
                ? 'Continue Learning'
                : 'Revisit'}
          </Typography>
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon fontSize='medium' style={{ color: '#ff8c00' }} />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Grid container justifyContent='center' style={{ margin: '10px auto' }}>
          <Grid item xs={6}>
            <Button
              onClick={() =>
                // navigate('/certificates/' + certificateId, {
                //   replace: true,
                // })
                alert("Pending")
              }
              variant='outlined'
              color='primary'
              disabled={courseCompletionPercentage < 100}
              style={{ margin: 'auto 10px' }}
            >
              <Typography variant='body2'>Generate Certificate</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color='secondary'
              variant='contained'
              fullWidth
              style={{
                backgroundColor: '#ff8c00',
                margin: '0px 10px',
                width: '120px',
                height: '100%',
              }}
              onClick={() => navigate('/tests?courseId=1&studentId=3')}
            >
              <Typography variant='body2'>Complete Tests</Typography>
            </Button>
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
}
