import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  makeStyles,
  Slide,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { DeleteForever, RemoveRedEye, Settings } from '@material-ui/icons';
import { Leaderboard, ModeEdit } from '@mui/icons-material';
import CourseStatics from './CourseStatics';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles({
  action: {
    // position: 'absolute',jh
    margin: '0px',
    height: '50px',
    width: '50px',
  },
});

export default function InstructorCoursePreview({
  course,
  setCourseToViewOrEdit,
  setViewCourse,
  setEditCourse,
}) {
  const classes = useStyles();
  const [openSettings, setOpenSettings] = useState(false);
  const [openStatistics, setOpenStatistics] = useState(false);

  const handleViewButton = () => {
    setCourseToViewOrEdit(course);
    setViewCourse(true);
  };
  const handleEditButton = () => {
    setCourseToViewOrEdit(course);
    setEditCourse(true);
  };
  const handleDeleteButton = () => {
    setCourseToViewOrEdit(course);
  };
  return (
    <>
      <Card
        style={{
          margin: '20px',
        }}
      >
        <CardMedia
          component={'img'}
          height='60'
          image={course.thumbnailLink}
          alt='course thumbnail'
        />
        <CardContent>
          <Typography
            variant='body1'
            style={{ marginRight: '50px', height: '70px' }}
          >
            {course.title}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: '#ff8c00',
          }}
        >
          <Tooltip title='Open Course'>
            <IconButton
              onClick={handleViewButton}
              style={{ backgroundColor: 'black' }}
            >
              <RemoveRedEye fontSize='small' style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Edit Course'>
            <IconButton
              onClick={handleEditButton}
              style={{ backgroundColor: 'black' }}
            >
              <ModeEdit fontSize='small' style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>

          {/* <Tooltip title='Delete Course'>
          <IconButton onClick={handleDeleteButton}>
            <DeleteForever fontSize='large' style={{ color: 'red' }} />
          </IconButton>
        </Tooltip> */}
          {/* <div style={{ flexGrow: '1' }}></div> */}
          <Tooltip title='Setting'>
            <IconButton
              style={{ backgroundColor: 'black' }}
              onClick={() => setOpenSettings(true)}
            >
              <Settings fontSize='small' style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Statistics' onClick={() => setOpenStatistics(true)}>
            <IconButton style={{ backgroundColor: 'black' }}>
              <Leaderboard fontSize='small' style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      {/* settings dialog */}
      <Dialog
        fullScreen
        open={openSettings}
        // onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Container style={{ minHeight: '100vh' }}>
          <DialogTitle
            style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '20px',
            }}
          >
            <Typography variant='h4' align='center'>
              Course Settings
            </Typography>
          </DialogTitle>

          <DialogContent></DialogContent>

          <DialogActions>
            <ButtonGroup>
              <Button
                variant='contained'
                onClick={() => setOpenSettings(false)}
                style={{ backgroundColor: '#ff8c00', fontWeight: 'bolder' }}
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setOpenSettings(false)}
                style={{
                  border: '2px solid #ff8c00',
                  margin: 'auto 10px',
                  fontWeight: 'bolder',
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Container>
      </Dialog>

      {/* statistics dialog */}
      <Dialog
        fullScreen
        open={openStatistics}
        // onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Container style={{ minHeight: '100vh' }}>
          <DialogTitle
            style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '20px',
            }}
          >
            <Typography variant='h4' align='center'>
              Course Statistics
            </Typography>
          </DialogTitle>

          <DialogContent>
            <CourseStatics course={course} />
            <Divider />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => setOpenStatistics(false)}
              style={{
                backgroundColor: '#ff8c00',
                margin: 'auto',
                fontWeight: 'bolder',
              }}
            >
              Back
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </>
  );
}
