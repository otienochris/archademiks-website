import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginAction } from '../state/reducers/loginReducer';
import { resetLoggedInUser } from '../state/reducers/userReducer';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Contacts', path: '/contacts' },
  { title: 'Courses', path: '/courses' },
];

const useStyle = makeStyles({
  toolBar: {
    display: 'flex',
    flexDirection: 'column',
  },
  typography: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#fefefe',
    color: 'black',
    height: '65px',
  },
  navlink: {
    color: 'black',
    textDecoration: 'none',
    margin: '30px 5px',
  },
  activeNavLink: {
    borderBottom: '2px solid orange',
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold',
    margin: '30px 5px',
  },
  linkSection: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    width: '100%',
    height: '30px',
    padding: '10px',
  },
  logoUserSection: {
    height: '30px',
    width: '100%',
  },
});

export default function CustomAppBar() {
  const classes = useStyle();
  const user = useSelector((state) => state.user.value);
  const isLoggedIn = useSelector((state) => state.login.value.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate('/login-signup');
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(loginAction({ isLoggedIn: false, token: '' }));
    dispatch(resetLoggedInUser());
    navigate('/');
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    console.log(user);
    switch (user.role) {
      case 'instructor':
        navigate('/instructor');
        break;
      case 'student':
        navigate('/students');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.appBar} elevation={1}>
      <Toolbar className={classes.toolBar}>
        <Grid container className={classes.logoUserSection}>
          <Typography variant='h6' className={classes.typography}>
            Archademiks
          </Typography>
          <Button
            variant='text'
            onClick={handleClick}
            // onClick={() => navigate('/login-signup')}
            id='menu-button'
            aria-controls={openMenu ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={openMenu ? 'true' : undefined}
            endIcon={<AccountCircleIcon fontSize='medium' />}
          >
            {isLoggedIn ? user.name : 'Log in'}
          </Button>
          <Menu
            id='account-menu'
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
          >
            {}
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Grid>
        <Grid container className={classes.linkSection}>
          {pages.map((page, index) => {
            return (
              <Grid item key={index}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.activeNavLink : classes.navlink
                  }
                  key={page.path}
                  to={page.path}
                >
                  {page.title}
                </NavLink>
              </Grid>
            );
          })}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
