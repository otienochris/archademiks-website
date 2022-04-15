import React from 'react';
import YouTube from 'react-youtube';

// https://youtu.be/_nBlN9yp9R8
export default function YoutubeReact({ videoId }) {
  const videoOnReady = (event) => {
    event.target.pauseVideo();
  };
  return (
    <YouTube
      videoId={videoId}
      opts={{ height: '390', width: '640', playerVars: { autoPlay: 1 } }}
      //   onReady={videoOnReady}
    />
  );
}
