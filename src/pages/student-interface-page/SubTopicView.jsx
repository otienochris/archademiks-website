import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Check, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
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

function SubTopicView({ subTopic, isCompleted }) {
  const classes = useStyles();
  const [viewContent, setViewContent] = useState(!isCompleted);
  return (
    <Grid container style={{ margin: '20px auto' }}>
      {subTopic &&
        <Grid item xs='12'>
          <div style={{ display: 'flex' }}>

            <Typography
              style={isCompleted ?
                { flexGrow: '1', backgroundColor: 'darkgreen', color: 'white', padding: '20px', margin: '5px 20px', borderRadius: '10px 10px 0px 0px', fontWeight: 'bolder' } :
                { flexGrow: '1', border: '4px solid grey', color: 'black', padding: '20px', margin: '5px 20px', borderRadius: '10px 10px 0px 0px', fontWeight: 'bolder' }} variant='h6' align='center'>
              Subtopic: {subTopic.title}

              {isCompleted ? (
                <Check
                  style={{
                    color: 'green',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    margin: 'auto 10px',
                    fontWeight: 'bolder',
                    // padding: '1px',
                    fontSize: '1em'
                  }}
                />
              ) : ''}
            </Typography>
          </div>
          <div style={{ margin: '20px' }}>
            {subTopic.link === '' || subTopic.link === null ? (
              <Typography variant='body1' align='center'>
                Video Not Available
              </Typography>
            ) : (
              <YoutubeEmbed embedId={subTopic.link} />
            )}
          </div>


          <Typography variant='body2' align='center' className={classes.tab}>
            Description
          </Typography>
          <Typography variant='body1' style={{ padding: '20px' }}>
            {subTopic.description}
          </Typography>

          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <Typography variant='body2' className={classes.tab} align='center'>
              Content
            </Typography>
            <IconButton onClick={() => setViewContent((state) => !state)} style={{ borderRadius: '0px' }} >
              {!viewContent ? <> <Visibility style={{ color: 'ff8c00' }} /> Show content </> : <><VisibilityOff style={{ color: 'black' }} /> Hide content</>}
            </IconButton>
          </div>

          {viewContent && (
            <div
              style={{
                // margin: '16px auto',
                padding: '20px',
                border: '2px solid grey',
                margin: '10px',
                borderRadius: '5px'
              }}
              className={classes.videoResponsive}
              dangerouslySetInnerHTML={{
                __html: `${subTopic.content}`,
              }}
            />
          )}
        </Grid>}
    </Grid>
  );
}

export default SubTopicView;
