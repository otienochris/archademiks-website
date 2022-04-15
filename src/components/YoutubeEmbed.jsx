import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  videoResponsive: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: '0',
  },
  iframe: {
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    position: ' ',
  },
});

export default function YoutubeEmbed({ embedId }) {
  const classes = useStyles();
  return (
    <div className={classes.videoResponsive}>
      <iframe
        className={classes.iframe}
        width='853'
        height='480'
        src={'https://www.youtube.com/embed/' + embedId}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  );
}
