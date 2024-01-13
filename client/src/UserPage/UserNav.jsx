import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {useContext} from 'react';
import { AuthenticationContext } from '../Authentication';
import { useNavigate } from 'react-router-dom';


const UserNavBar = () => {
const {checkSession } = useContext(AuthenticationContext)
const history = useNavigate();
const logout = () => {
    window.localStorage.clear();
    history('/');
    checkSession();
}
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" href="#gallery">Upload</Button>
        <Button color="inherit" href="#gallery">Gallery</Button>
        <Button color="inherit" href="#map">Map</Button>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavBar;
