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
  setContinueLearning,
  setCourseToContinue,
  enrollmentDetails,
  setCurrentCourseEnrollmentId
}) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.value.token);
  const [course] = useState(enrollmentDetails.course);
  const [topics, setTopics] = useState([])
  setCurrentCourseEnrollmentId(enrollmentDetails.courseEnrollmentId);
  // const [completedTopics, setCompletedTopics] = useState(enrollmentDetails.course.completedTopics.length);

  const [expanded, setExpanded] = useState(false);
  // const [certificateId] = useState(enrollmentDetails[0].certificateId);
  const [courseCompletionPercentage] = useState(Object.keys(enrollmentDetails.completedTopics).length === 0 ? 0 :
    Math.floor(
      (enrollmentDetails.completedTopics.length / topics.length) * 100
      // (enrollmentDetails.completedTopics.length / 5) * 100
    )
  );
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleContinueLearnig = () => {
    setCourseToContinue(course);
    setContinueLearning(true);
  };

  const getTopics = async () => {
    await fetch(LMS_COURSES + "/" + enrollmentDetails.course.courseId + "/topics", {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // setIsLoading(false);
        if (response.status >= 200 && response.status < 300) {

        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTopics(data._embedded.topicDtoList)
      })
      .catch((error) => {
        // setIsLoading(false);
        console.log(error)
      });
  }

  useEffect(() => {
    getTopics();
  }, [])


  return (
    <Card style={{ margin: '20px', maxWidth: '300px' }}>
      <CardMedia
        component={'img'}
        height='194'
        image={course.thumbnailLink}
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
          {course.title}
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
            {enrollmentDetails.completedTopics.length == 0
              ? 'Start Course'
              : enrollmentDetails.completedTopics.length <
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
