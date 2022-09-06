import { Typography } from '@material-ui/core';
import React from 'react';

function Certificate({ certificate }) {
  console.log(certificate);

  return (
    <div
      style={{
        width: '1000px',
        height: '740px',
        backgroundImage: 'url("/certificateBackground.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
      }}
      id='certificate'
    >
      <Typography
        align='center'
        variant='subtitle1'
        style={{ position: 'absolute', top: '200px', width: '100%' }}
      >
        Akademi proudly certifies that:
      </Typography>

      <Typography
        variant='h4'
        align='center'
        style={{
          position: 'absolute',
          top: '270px',
          width: '100%',
          padding: '0px 30px',
        }}
      >
        {certificate.studentFullName}
      </Typography>

      <Typography
        variant='subtitle1'
        style={{ position: 'absolute', top: '340px', left: '380px' }}
      >
        has successfuly completed:
      </Typography>

      <div
        style={{
          position: 'absolute',
          top: '410px',
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h4'
          align='center'
          style={{
            maxWidth: '80%',
            margin: 'auto',
          }}
        >
          {certificate.courseTitle}
        </Typography>
      </div>
    </div>
  );
}

export default Certificate;
