import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { DeleteForever, RemoveRedEye } from '@material-ui/icons';
import { ModeEdit } from '@mui/icons-material';

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
    <Card
      style={{
        margin: '20px',
        height: '195px',
        width: '330px',
      }}
    >
      <CardMedia
        component={'img'}
        height='60'
        image={course.thumbnail}
        alt='course thumbnail'
      />
      <CardContent>
        <Typography
          variant='body1'
          style={{ marginRight: '50px', height: '70px' }}
        >
          {course.title}
        </Typography>
        <Divider />
        <div
          style={{
            display: 'flex',
            alignContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <RemoveRedEye
            onClick={handleViewButton}
            style={{
              width: '110px',
              height: '50px',
              padding: '9px',
              color: 'darkgreen',
            }}
          />

          <ModeEdit
            onClick={handleEditButton}
            style={{
              width: '110px',
              height: '50px',
              color: 'white',
              backgroundColor: 'black',
              padding: '9px',
            }}
          />
          <DeleteForever
            style={{
              width: '110px',
              height: '50px',
              color: 'red',
              padding: '9px',
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
