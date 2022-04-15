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
import React, { useEffect, useState } from 'react';
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
        <Grid item xs={12}>
          <Typography align='left' variant='h6'>
            {topic.title}{' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>{topic.description}</Typography>
        </Grid>
        <Divider />
      </AccordionSummary>
      <AccordionDetails>
        <Stepper
          activeStep={activeStep}
          orientation='vertical'
          className={classes.step}
        >
          {topic.subTopics.map((subTopic, index) => (
            <Step key={index}>
              <StepLabel>{subTopic.title}</StepLabel>
              <StepContent>
                <Typography variant='body1'>{subTopic.description}</Typography>

                {subTopic.link === '' || subTopic.link === null ? (
                  ''
                ) : (
                  <YoutubeEmbed embedId={subTopic.link} />
                )}

                <Typography variant='body2'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Optio blanditiis id inventore voluptatem nulla ipsum at alias
                  cum, vel repudiandae cupiditate nemo numquam facere quidem
                  provident voluptatibus pariatur iusto. Et non expedita
                  consequuntur unde quo. Sapiente obcaecati sint, in, sed
                  necessitatibus repudiandae distinctio aliquid, enim temporibus
                  expedita maiores quisquam dolore officiis similique commodi.
                  Laudantium aspernatur quidem consequatur exercitationem. Nihil
                  modi, velit aliquam fuga, totam perspiciatis aut, molestias
                  esse voluptatum vero sequi possimus illum ut tempore quaerat
                  delectus quos facere dolores hic est placeat? Repudiandae et
                  quaerat laboriosam enim quo. Sapiente assumenda omnis minus
                  eum ullam vitae dolorum ducimus non beatae repellat illo
                  laudantium repellendus excepturi, maxime facilis voluptas
                  laboriosam nesciunt consectetur dolores corporis eligendi,
                  quaerat temporibus eius quasi. Corrupti nostrum mollitia,
                  culpa aspernatur laudantium voluptas incidunt excepturi ipsum,
                  harum minus libero labore adipisci. Accusamus nisi labore
                  voluptas necessitatibus amet atque, sapiente dolores
                  doloremque? Explicabo fuga quisquam consectetur cupiditate
                  temporibus at voluptates molestiae enim, dolorem totam amet
                  adipisci suscipit consequatur molestias ducimus ipsum iure
                  quibusdam! Veniam qui facilis, magnam quis, nostrum dolor sed
                  repellat commodi doloremque exercitationem dolorum accusantium
                  ratione saepe aliquam atque? Dolorum incidunt eligendi vitae
                  praesentium quibusdam magnam velit, et iusto accusamus ad,
                  molestias veniam quidem? Sit, nisi? Eum nobis possimus,
                  provident eius rerum maiores ullam ducimus porro temporibus,
                  neque natus veniam quam voluptas et quibusdam unde voluptate
                  aliquid. Voluptatem aperiam facere dolorum obcaecati optio
                  alias itaque sapiente id labore ipsa eius cum similique qui
                  nihil consequuntur quos, hic accusamus vel. Pariatur nulla
                  autem sequi provident perferendis assumenda deleniti maxime.
                  Amet cum deserunt numquam ratione temporibus molestiae quam
                  eveniet, necessitatibus quod hic, praesentium modi similique
                  voluptate nesciunt quaerat enim architecto. Ipsam unde
                  pariatur laudantium vel saepe quae distinctio. Nostrum dolore
                  repudiandae atque sapiente ex numquam corrupti, aperiam
                  adipisci ea quibusdam hic, ab est explicabo iste magni natus
                  dolores laboriosam.
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant='contained'
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === subTopic.length - 1 ? 'Finish' : 'Continue'}
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
      </AccordionDetails>
    </Accordion>
  );
}
