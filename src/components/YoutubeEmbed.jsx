import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  videoResponsive: {
    // paddingBottom: '10px',
    // position: 'relative',
  },
  iframe: {
    // left: 0,
    // top: 0,
    // height: '100%',
    // width: '100%',
    // position: 'absolute',
  },
});

export default function YoutubeEmbed({ embedId }) {
  const classes = useStyles();
  const iframe =
    '<iframe style="height:68vh;width:100%;border:none;overflow:hidden;" src="https://www.youtube.com/embed/' + embedId +
    '" title="Youtube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />';

  return (
    <div
      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      className={classes.videoResponsive}
      dangerouslySetInnerHTML={{
        __html: iframe,
      }}
    />
  );
}
