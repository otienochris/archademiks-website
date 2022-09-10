import {
  AppBar,
  Container,
  Grid,
  List,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { TabPanelUnstyled } from '@mui/base';
import React from 'react';
import { useState } from 'react';
import ProfileDataSettings from './ProfileDataSettings';
import ProfileNotificationSettings from './ProfileNotificationSettings';
import ProfileSecuritySettings from './ProfileSecuritySettings';

const tabOptions = ['profile', 'account security', 'notifications'];

function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabSelection = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Container style={{ minHeight: '93.5vh' }}>
      <AppBar
        position='static'
        style={{
          marginTop: '70px',
          backgroundColor: 'white',
          color: 'black',
          border: '2px solid black',
        }}
      >
        <Typography variant='h3' align='center'>
          User Profile
        </Typography>
        <Tabs
          orientation='horizontal'
          value={selectedTab}
          onChange={handleTabSelection}
          centered
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          {tabOptions.map((option, idx) => (
            <Tab key={idx} value={idx} label={option} />
          ))}
        </Tabs>
      </AppBar>
      <div
        style={{
          height: '100%',
          border: '2px solid black',
          margin: '20px auto',
        }}
      >
        {selectedTab === 0 ? (
          <ProfileDataSettings />
        ) : selectedTab === 1 ? (
          <ProfileSecuritySettings email={'abx@xyz.com'} />
        ) : (
          <ProfileNotificationSettings />
        )}
      </div>
    </Container>
  );
}

export default ProfilePage;
