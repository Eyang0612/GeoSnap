import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import {useState} from 'react';


export default function Header({menuClick}) {
  const toggleDrawer = (e) => menuClick(e);
  return (
    <AppBar position="fixed" sx={{ background: 'linear-gradient(180deg, #1c262e 80%,  #869098)',
    boxShadow: 'none', color: 'white' 
    }}>
      <Toolbar>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GeoSnap
          </Typography>
        
        <Stack spacing={2} direction="row">
        <Button component={Link} to="/Login" color="inherit" variant="outlined" sx={{
        borderColor: 'white',
        color: 'white',
        transition: 'backgroundColor 500ms, color 500ms, borderColor 500ms, ease 500ms',
        '&:hover': {
          backgroundColor: 'white', // Background color for contained button
          color: 'black', // Text color for contained button
          // Optional: Change the border color on hover as well, if you want
          borderColor: 'black'
        }
      }}>Login</Button>
        <Button component={Link} to="/SignUp" color="inherit" variant="outlined" sx={{
        borderColor: 'white',
        color: 'white',
        transition: 'backgroundColor 500ms, color 500ms, borderColor 500ms, ease 500ms',
        '&:hover': {
          backgroundColor: 'white', // Background color for contained button
          color: 'black', // Text color for contained button
          // Optional: Change the border color on hover as well, if you want
          borderColor: 'black'
        }}
        }>Sign Up</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
