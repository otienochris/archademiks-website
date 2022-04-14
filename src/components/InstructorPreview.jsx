import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
// import { ExpandMore } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { CardActions, Collapse, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

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

export default function InstructorPreview({ instructor }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>{`${instructor.firstName[0] +
            instructor.lastName[0]}`}</Avatar>
        }
        title={`${instructor.firstName + ' ' + instructor.lastName}`}
        subheader={instructor.title}
      />
      <CardContent>
        <Typography>{instructor.briefDescription}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          aria-label='whatsapp'
          disabled={
            instructor.contacts[3].url === '' ||
            instructor.contacts[3].url === null
              ? true
              : false
          }
        >
          <a
            href={`https://api.whatsapp.com/send?phone=${instructor.contacts[3].url}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <WhatsAppIcon style={{ color: 'green' }} />
          </a>
        </IconButton>
        <IconButton
          aria-label='share'
          disabled={
            instructor.contacts[0].url === '' ||
            instructor.contacts[0].url === null
              ? true
              : false
          }
        >
          <a
            href={instructor.contacts[0].url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedInIcon style={{ color: 'blue' }} />
          </a>
        </IconButton>
        <IconButton
          disabled={
            instructor.contacts[2].url === '' ||
            instructor.contacts[2].url === null
              ? true
              : false
          }
        >
          <a
            href={instructor.contacts[2].url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ConnectWithoutContactIcon />
          </a>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout={'auto'} unmountOnExit>
        <CardContent>
          <Grid container justifyContent={'center'}>
            {/* <Grid item xs={12}>
              <Typography variant='h6'>Education History</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Work Experience</Typography>
            </Grid> */}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}
