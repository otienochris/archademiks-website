import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import { ExpandMore } from '@mui/icons-material';
import { Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import YoutubeEmbed from '../../components/YoutubeEmbed';

const useStyles = makeStyles({
  step: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
  },
});

export default function TopicDetails({ topic }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Accordion style={{ width: '100%' }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container>
          <Grid item xs={12}>
            <Typography style={{ width: '100%' }} align='center' variant='h6'>
              {topic.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align='center' variant='body2'>
              {topic.description}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12}>
            {topic.link && <YoutubeEmbed embedId={topic.link} />}
            <div
              style={{
                margin: '16px',
                padding: '5px',
                border: '2px solid grey',
              }}
              className={classes.videoResponsive}
              dangerouslySetInnerHTML={{
                __html: `${topic.content}`,
              }}
            />
            <Typography
              style={{ width: '100%', textAlign: 'center' }}
              variant='h6'
            >
              Lessons
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stepper
              activeStep={activeStep}
              orientation='vertical'
              className={classes.step}
            >
              {topic.subTopics.map((subTopic, index) => (
                <Step key={index}>
                  <StepLabel>{subTopic.title}</StepLabel>
                  <StepContent>
                    <Typography variant='body1'>
                      {subTopic.description}
                    </Typography>

                    {subTopic.link === '' || subTopic.link === null ? (
                      ''
                    ) : (
                      <YoutubeEmbed embedId={subTopic.link} />
                    )}

                    <div
                      className={classes.videoResponsive}
                      dangerouslySetInnerHTML={{
                        __html: `${subTopic.content}`,
                      }}
                    />
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant='contained'
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === subTopic.length - 1
                            ? 'Finish'
                            : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
