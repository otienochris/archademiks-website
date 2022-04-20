import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  videoResponsive: {
    paddingBottom: '10px',
    position: 'relative',
  },
  iframe: {
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});

export default function YoutubeEmbed({ embedId }) {
  const classes = useStyles();
  const iframe =
    '<iframe className={classes.iframe} src="https://www.youtube.com/embed/' +
    embedId +
    '" height="480" width="100%" title="Youtube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />';

  return (
    <div
      className={classes.videoResponsive}
      dangerouslySetInnerHTML={{
        __html: iframe,
      }}
    />
  );
}
