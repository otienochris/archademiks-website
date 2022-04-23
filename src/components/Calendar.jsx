import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export default function Calendar({ year, firstDay, month }) {
  const numberOfBoxes = [...Array(42)];
  const daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let day = 0;
  let skippedDays = -1;

  const [currentYear] = useState(year);
  const [currentMonth] = useState(month);
  const [firstDayState] = useState(firstDay);
  const [numberOfDays] = useState(getDaysInMonth(currentYear, currentMonth));

  const updateDay = () => {
    day += 1;
    return day;
  };
  const skipday = () => {
    skippedDays += 1;
    return skippedDays < firstDayState ? true : false;
  };

  useEffect(() => {
    // console.log(month, year, firstDay);
    console.log(currentYear, currentMonth, firstDay);
  }, [currentMonth, currentYear, month, year]);

  return (
    <Grid container justifyContent='center'>
      {[...Array(7)].map((verticalBox, index) => (
        <Grid item xs={1}>
          <Typography variant='body2' align='center'>
            {daysOfTheWeek[index]}{' '}
          </Typography>
        </Grid>
      ))}
      <Grid container justifyContent='center'>
        {numberOfBoxes.map((vbox, index) => {
          return (
            <>
              {(index + 1) % 7 === 0 ? (
                <Grid item xs={12}></Grid>
              ) : (
                <Grid
                  item
                  xs={1}
                  style={{ margin: '2px', boxShadow: '1px 1px 3px green' }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minHeight: '70px',
                      border: '1px solid grey',
                      backgroundColor: '#252422',
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      justifyItems: 'center',
                      '&:hover': {
                        backgroundImage:
                          'linear-gradient(to right, white, whitesmoke, #FFFFFF, #EEEBD0, #EBB3A9, #E87EA1, #E86252)',
                        color: '#252422',
                      },
                    }}
                  >
                    <Typography
                      style={{
                        color: '#403D39',
                        position: 'absolute',
                        top: '3px',
                        right: '3px',
                        border: '1px solid #FFFCF2',
                        width: '23px',
                        height: '23px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFCF2',
                        boxShadow: '2px 2px 3px #EB5E28',
                      }}
                      variant='body2'
                      align='center'
                    >
                      {skipday()
                        ? ''
                        : day === numberOfDays
                        ? ' '
                        : updateDay()}
                    </Typography>

                    <div
                      style={{
                        width: '60%',
                        border: '1px solid #EB5E28',
                        margin: 'auto',
                      }}
                    ></div>
                  </Box>
                </Grid>
              )}
            </>
          );
        })}
      </Grid>
    </Grid>
  );
}
