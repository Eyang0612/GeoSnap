import React from 'react';
import { Grid, Typography, Box, Paper } from '@mui/material';
import LogoImage from '../assets/HomeLogo.png'; // Import your image here
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/system';
import './HomeBody.css';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

function HomeBody() {
  return (
    <Box sx={{ flexGrow: 1, padding: 4}}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12} lg={6}>
          <Paper elevation={0} sx={{ padding: 2, backgroundColor: 'transparent', color: 'White'  }}>
            <Typography variant="h1" gutterBottom 
            sx={{fontFamily: 'Roboto, sans-serif', 
            textShadow: `
            0 1px 0 #ccc,
            0 2px 0 #c9c9c9,
            0 3px 0 #bbb,
            0 4px 0 #b9b9b9,
            0 5px 0 #aaa,
            0 6px 1px rgba(0,0,0,.1),
            0 0 5px rgba(0,0,0,.1),
            0 1px 3px rgba(0,0,0,.3),
            0 3px 5px rgba(0,0,0,.2),
            0 5px 10px rgba(0,0,0,.25),
            0 10px 10px rgba(0,0,0,.2),
            0 20px 20px rgba(0,0,0,.15)`,
            animation: `${fadeIn} ease-in 1s`}}>
              GeoSnap
            </Typography>
            <Typography variant="h6" sx={{
              animation: `${fadeIn} ease-in 1s`
            }}>
            Discover the World Through Your Memories.
            </Typography>
            <Typography variant="body1" sx={{
              animation: `${fadeIn} ease-in 1s`,
              marginTop: 2
            }}>
               GeoSnap revolutionizes the way you reminisce about your travels and special moments. With our cutting-edge platform, you can breathe new life into your cherished photographs by uncovering the exact locations where those memories were captured. Our service is designed to seamlessly integrate with your digital photo library, offering a unique blend of nostalgia and exploration.
            </Typography>
            <Button component={Link} to="/SignUp" color="inherit" variant="outlined" sx={{
        borderColor: 'white',
        color: 'white',
        animation: `${fadeIn} ease-in 2s`,
        transition: 'backgroundColor 500ms, color 500ms, borderColor 500ms, ease 500ms',
        '&:hover': {
          backgroundColor: 'white', // Background color for contained button
          color: 'black', // Text color for contained button
          // Optional: Change the border color on hover as well, if you want
          borderColor: 'black',
        }}
        }>Sign Up Now &#8594;</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} >
          <Box className={'wrap'}>
          <Box className={'circle'}
          >
            <img src={LogoImage} alt="App Visual" style={{ maxWidth: '100%', maxHeight: '100%'}} />
          </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeBody;
