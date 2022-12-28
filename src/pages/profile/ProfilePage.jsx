import { AppBar, Container, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ROLES } from '../../commons/roles';
import ProfileDataSettings from './ProfileDataSettings';
import ProfileNotificationSettings from './ProfileNotificationSettings';
import ProfileSecuritySettings from './ProfileSecuritySettings';

const tabOptions = [
  { title: 'bio data', disabled: false },
  { title: 'security', disabled: false },
  { title: 'notifications', disabled: false },
  { title: 'affiliations', disabled: true },
  { title: 'activities', disabled: true },
];

function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const userFromState = useSelector(state => state.user.value);
  const [user, setUser] = useState(userFromState);
  const loginDetails = useSelector((state) => state.login.value);
  const handleTabSelection = (event, newValue) => {
    setSelectedTab(newValue);
  };


  var id;
  useEffect(() => {
    const role = loginDetails.role;
    switch (role) {
      case ROLES.ADMIN:
        id = user.id;
        break;
      case ROLES.INSTRUCTOR:
        id = user.instructorId;
        break;
      case ROLES.STUDENT:
        id = user.studentId;
        break;

      default:
        break;
    }
  }, [user])

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
          //   centered
          variant='scrollable'
          style={{ backgroundColor: 'black', color: 'white', padding: '5px' }}
        >
          {tabOptions.map((option, idx) => (
            <Tab
              key={idx}
              value={idx}
              label={option.title}
              disabled={option.disabled}
            />
          ))}
        </Tabs>
      </AppBar>
      <div
        style={{
          height: '100%',
          minHeight: '75vh',
          border: '2px solid black',
          margin: '20px auto',
        }}
      >
        {selectedTab === 0 ? (
          <ProfileDataSettings setUser={setUser} user={user} />
        ) : selectedTab === 1 ? (
          <ProfileSecuritySettings email={user.email} />
        ) : (
          <ProfileNotificationSettings
            userId={user.id}
            userType={user.type}
            notifications={user.notifications}
          />
        )}
      </div>
    </Container>
  );
}

export default ProfilePage;
