import { AppBar, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AccountFAQ from './AccountFAQ';
import CourseFAQ from './CourseFAQ';

function FAQ({frequentlyAskedQuestions}) {
  
  const [selectedTab, setSelectedTab] = useState(0);

  console.log(frequentlyAskedQuestions);

  const handleTabSelection = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Grid container>
      <Grid item xs='12' style={{ margin: 'auto' }}>
        <AppBar
          position='static'
          style={{
            backgroundColor: 'white',
            color: 'black',
          }}
        >
          <Typography variant='h4' align='center' style={{ padding: '20px' }}>
            FAQ
          </Typography>
          <Tabs
            orientation='horizontal'
            value={selectedTab}
            onChange={handleTabSelection}
            centered
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '5px',
            }}
          >
            <Tab value={0} label='Account' />
            <Tab value={1} label='Course' />
          </Tabs>
        </AppBar>
        {selectedTab === 0 ? (
          <AccountFAQ
            frequentlyAskedQuestions={frequentlyAskedQuestions.filter(
              (faq) => faq.type === 'ACCOUNT'
            )}
          />
        ) : (
          <CourseFAQ
            frequentlyAskedQuestions={frequentlyAskedQuestions.filter(
              (faq) => faq.type === 'COURSE'
            )}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default FAQ;
