import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#f3f3f3', padding: 2, background: 'transparent', color: 'white' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="subtitle1">
            Created by Eddie Yang
          </Typography>
        </Grid>
        <Grid item>
          <Link href="https://linkedin.com/in/eddie-yang-56b93527a" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon sx={{
        color: '#0077b5', // default color
        transition: 'color 500ms, ease 500ms',
        '&:hover': {
          color: 'white', // color on hover
          transform: 'scale(1.2)' // scale up on hover
        }
      }}/>
          </Link>
        </Grid>
        <Grid item>
          <Link href="https://github.com/Eyang0612" target="_blank" rel="noopener noreferrer">
            <GitHubIcon sx={{
        color: 'white', // default color
        transition: 'color 500ms, ease 500ms',
        '&:hover': {
          color: 'white', // color on hover
          transform: 'scale(1.2)' // scale up on hover
        }
      }}/>
          </Link>
        </Grid>
        <Grid item>
          <Link href="https://www.instagram.com/eddie_yanggg?igsh=bjR0dnUxMHd1c3R2&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <InstagramIcon sx={{
        color: '#cd486b', // default color
        transition: 'color 500ms, ease 500ms',
        '&:hover': {
          color: 'white', // color on hover
          transform: 'scale(1.2)' // scale up on hover
        }
      }}/>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
