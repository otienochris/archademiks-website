import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Check } from '@material-ui/icons';
import { useState } from 'react';
import { Box } from '@material-ui/core';

function CircularProgressWithLabel(props) {
  const [isValue100] = useState(parseInt(props.value) >= 100);
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        style={isValue100 ? { color: 'green' } : { color: 'blue' }}
        variant='determinate'
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          style={isValue100 ? { color: 'green' } : { color: 'blue' }}
        >
          {isValue100 ? <Check /> : `${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CourseProgress({ currentProgress }) {
  const [progress, setProgress] = React.useState(currentProgress);

  React.useEffect(() => {
    setProgress(currentProgress);
  }, [progress]);

  return <CircularProgressWithLabel value={progress} />;
}
