import React, { useEffect } from 'react';

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';

import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../state/reducers/loginReducer';
import { resetLoggedInUser } from '../state/reducers/userReducer';

function CustomAppBar2() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((state) => state.user.value);
  const isLoggedIn = useSelector((state) => state.login.value.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    const isLoggedInFromLocalStorage = localStorage.getItem('isLoggedIn');

    console.log(userFromLocalStorage);
    console.log(isLoggedInFromLocalStorage);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    if (isLoggedIn) {
      setAnchorElUser(event.currentTarget);
    } else {
      navigate('/login-signup', { replace: true });
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDashboard = () => {
    switch (user.type) {
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
    setAnchorElUser(null);
  };

  const handleProfile = () => {};
  const handleReports = () => {};
  const handleLogout = () => {
    dispatch(loginAction({ isLoggedIn: false, token: '' }));
    dispatch(resetLoggedInUser());
    navigate('/');
    setAnchorElUser(null);
  };

  const settings = [
    { title: 'Profile', action: handleProfile, disabled: true },
    { title: 'Dashboard', action: handleDashboard, disabled: false },
    { title: 'Reports', action: handleReports, disabled: true },
    { title: 'Logout', action: handleLogout, disabled: false },
  ];

  const handleAboutPage = () => {
    navigate('/about', { replace: true });
    setAnchorElNav(null);
  };

  const handleCoursesPage = () => {
    navigate('/courses', { replace: true });
    setAnchorElNav(null);
  };

  const handlePartnersPage = () => {
    navigate('/partners', { replace: true });
    setAnchorElNav(null);
  };

  const pages = [
    {
      title: 'About',
      action: handleAboutPage,
      disable: false,
    },
    {
      title: 'Courses',
      action: handleCoursesPage,
      disable: false,
    },
    {
      title: 'Partners',
      action: handlePartnersPage,
      disable: false,
    },
  ];

  return (
    <AppBar position='fixed' style={{ backgroundColor: 'black' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MenuBookIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            onClick={() => navigate('/', { replace: true })}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            onClick={() => navigate('/', { replace: true })}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Akademi
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={page.action}>
                  <Typography textAlign='center'>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MenuBookIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
            onClick={() => navigate('/', { replace: true })}
          />
          <Typography
            variant='h5'
            noWrap
            component='a'
            onClick={() => navigate('/', { replace: true })}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Akademi
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={page.action}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Options'>
              <Button
                variant='text'
                onClick={handleOpenUserMenu}
                style={{ color: 'white' }}
                endIcon={<AccountCircleIcon fontSize='medium' />}
              >
                {isLoggedIn ? user.lastName : 'login'}
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={setting.action}
                  disabled={setting.disabled}
                >
                  <Typography textAlign='center'>{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomAppBar2;
