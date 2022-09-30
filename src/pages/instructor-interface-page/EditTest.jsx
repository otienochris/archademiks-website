import {
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Delete,
  Edit,
  Save,
} from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import EditQuestion from './EditQuestion';

function EditTest({ test }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Grid container>
      <Grid item xs='12' sm='9' md='10'>
        <Divider />
        <div style={{ margin: 'auto', padding: '10px' }}>
          <Typography variant='h6'>{test.title}</Typography>
        </div>
      </Grid>
      <Grid
        item='12'
        sm='3'
        md='2'
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Button
          endIcon={<Save />}
          style={{ color: 'white', backgroundColor: 'green', margin: '5px' }}
        >
          Save Changes
        </Button>
      </Grid>

      <Grid item xs='12' style={{ padding: '5px' }}>
        <Divider />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant='h5'
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              width: '200px',
            }}
          >
            Question {currentIndex + 1} of {test.questions.length}
          </Typography>
          <IconButton
            style={{
              color: 'white',
              backgroundColor: '#ff8c00',
              borderRadius: '50%',
              margin: 'auto 10px',
            }}
          >
            <Edit />
          </IconButton>
        </div>
        <EditQuestion question={test.questions[currentIndex]} />

        <Divider />
      </Grid>

      <Grid
        item
        xs='12'
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'black',
          padding: '10px',
        }}
      >
        <Button
          onClick={() => setCurrentIndex((state) => state - 1)}
          startIcon={<ArrowBackIos />}
          disabled={currentIndex === 0}
          style={
            currentIndex === 0
              ? { color: 'grey', fontWeight: 'bolder' }
              : {
                  color: '#ff8c00',
                  fontWeight: 'bolder',
                }
          }
        >
          quiz {currentIndex === 0 ? '' : currentIndex}
        </Button>
        <Button
          onClick={() => setCurrentIndex((state) => state + 1)}
          endIcon={<ArrowForwardIos />}
          disabled={test.questions.length - 1 === currentIndex}
          style={
            test.questions.length - 1 === currentIndex
              ? { color: 'grey', fontWeight: 'bolder' }
              : {
                  color: '#ff8c00',
                  fontWeight: 'bolder',
                }
          }
        >
          quiz{' '}
          {test.questions.length - 1 === currentIndex ? '' : currentIndex + 2}
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditTest;
