import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import YoutubeEmbed from '../../components/YoutubeEmbed';

const useStyles = makeStyles({
  step: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
  },
  titles: {
    marginLeft: '20px',
    fontFamily: 'monospace',
    backgroundColor: 'orange',
  },
  tab: {
    backgroundColor: 'black',
    color: 'whitesmoke',
    padding: '10px',
    width: '130px',
    marginLeft: '20px',
  },
});

function SubTopicView({ subTopic }) {
  const classes = useStyles();
  return (
    <Grid container style={{ margin: '20px auto' }}>
      <Grid item xs='12'>
        <Typography variant='h4' align='center'>
          {subTopic.title}
        </Typography>
        <Typography variant='subtitle2' align='center' className={classes.tab}>
          Description
        </Typography>
        <Typography variant='body1' style={{ padding: '20px' }}>
          {subTopic.description}
        </Typography>
        <Typography variant='subtitle2' align='center' className={classes.tab}>
          Video
        </Typography>
        <div style={{ margin: '20px' }}>
          {subTopic.link === '' || subTopic.link === null ? (
            <Typography variant='body1' align='center'>
              Video Not Available
            </Typography>
          ) : (
            <YoutubeEmbed embedId={subTopic.link} />
          )}
        </div>
        <Typography variant='subtitle2' className={classes.tab} align='center'>
          Content
        </Typography>
        <div
          style={{
            margin: '16px auto',
            // border: '2px solid grey',
            padding: '20px',
            // fontFamily: 'monospace',
          }}
          className={classes.videoResponsive}
          dangerouslySetInnerHTML={{
            __html: `${subTopic.content}`,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default SubTopicView;
