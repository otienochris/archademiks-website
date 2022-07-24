import { Typography } from '@material-ui/core';
import React from 'react';

function Certificate() {
  return (
    <>
      <div
        style={{
          width: '1000px',
          height: '740px',
          backgroundImage: 'url("/certificateBackground.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
        }}
        className='certificate'
      >
        <Typography
          variant='subtitle1'
          style={{ position: 'absolute', top: '200px', left: '360px' }}
        >
          Akademi proudly certifies that:
        </Typography>

        <Typography
          variant='h4'
          style={{ position: 'absolute', top: '270px', left: '250px' }}
        >
          CHRISTOPHER OCHIENG OTIENO
        </Typography>

        <Typography
          variant='subtitle1'
          style={{ position: 'absolute', top: '340px', left: '380px' }}
        >
          has successfuly completed:
        </Typography>

        <Typography
          variant='h4'
          style={{ position: 'absolute', top: '410px', left: '150px' }}
        >
          ZERO TO HERO: SPRINGBOOT MASTERCLASS.
        </Typography>
      </div>
    </>
  );
}

export default Certificate;
