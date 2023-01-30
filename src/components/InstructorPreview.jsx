import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export default function InstructorPreview({ instructor }) {

  return (
    <Card>
      <CardHeader
        style={{ borderBottom: '1px solid grey' }}
        avatar={
          <Avatar>{`${instructor.firstName[0] + instructor.lastName[0]
            }`}</Avatar>
        }
        title={`${instructor.firstName + ' ' + instructor.lastName}`}
        subheader={instructor.title}
      />
      <CardContent>
        <Typography>{instructor.description}</Typography>
      </CardContent>

      <CardActions style={{ display: 'block', backgroundColor: '#0D0221', padding: '10px auto', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <IconButton
          aria-label='whatsapp'
          style={{ borderLeft: '1px solid yellowgreen', borderRight: '1px solid yellowgreen', borderRadius: '5px', padding: '5px', margin: 'auto 10px auto 0px' }}
        >
          <a
            href={instructor.contacts == undefined || instructor.contacts[3].url === null || instructor.contacts[3].url === '' ? 'https://api.whatsapp.com/send?phone=+254772348798' : `https://api.whatsapp.com/send?phone=${instructor.contacts[3].url}`}
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: 'none', color: 'yellowgreen' }}
          >
            <WhatsAppIcon /> <span style={{ fontSize: '0.5em' }}>Whatsapp</span>
          </a>
        </IconButton>
        <IconButton
          aria-label='share'
          style={{ borderLeft: '1px solid white', borderRight: '1px solid white', borderRadius: '5px', borderRadius: '5px', padding: '5px', margin: 'auto 10px auto 0px' }}
        >
          <a
            href={instructor.contacts == undefined || instructor.contacts[0].url === null || instructor.contacts[0].url === '' ? 'https://www.linkedin.com/in/christopher-otieno-556779193/' : instructor.contacts[0].url}
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <LinkedInIcon /> <span style={{ fontSize: '0.5em' }}>LinkedIn</span>
          </a>
        </IconButton>
        <IconButton
          style={{ borderLeft: '1px solid #ff8c00', borderRight: '1px solid #ff8c00', borderRadius: '5px', borderRadius: '5px', padding: '5px', margin: 'auto 10px auto 0px' }}
        >
          <a
            href={instructor.contacts == undefined || instructor.contacts[2].url === null || instructor.contacts[2].url === '' ? 'https://archademiks.slack.com/archives/C03BAMJV0JJ' : instructor.contacts[2].url}
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: 'none', color: '#ff8c00' }}
          >
            <ConnectWithoutContactIcon /> <span style={{ fontSize: '0.5em' }}>Slack</span>
          </a>
        </IconButton>
      </CardActions>
    </Card>
  );
}
