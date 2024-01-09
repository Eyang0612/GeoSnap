import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';

function AboutSection() {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1">
              We are a passionate team dedicated to providing the best service in our industry. Our mission is to deliver exceptional experiences to our customers through innovative solutions and outstanding customer service. We believe in continuous improvement, collaboration, and creating value in all we do.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Our journey began in [Year], and since then, we have been committed to achieving excellence and fostering growth in our community. We're proud of our achievements and excited for the future!
            </Typography>
            {/* Add more content or components as needed */}
          </Paper>
        </Grid>
        {/* You can add more grid items for additional content such as images, lists, etc. */}
      </Grid>
    </Box>
  );
}

export default AboutSection;
