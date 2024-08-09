import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Avatar,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from '../assets/logo.svg';

export default function MenuAppBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const auth = localStorage.getItem('role');

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate('/login');
    localStorage.clear();
    setAnchorEl(null);
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#CB3066',
        }}
      >
        <Toolbar
          sx={{
            minHeight: '0px !important',
            height: '48px',
          }}
        >
          <Avatar
            sx={{
              p: 1,
              transition: 'transform 0.5s ease, box-shadow 0.5s ease',
              '&:hover': {
                transform: 'rotate(360deg)',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
            src={Logo}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OneApp
          </Typography>
          {auth ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  top: '33px',
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              sx={{
                height: '24px',
                width: '100px',
                margin: 'auto 0',
                background: '#ffffff',
                '&:hover': {
                  background: '#f0f0f0',
                },
              }}
              onClick={handleLogIn}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
