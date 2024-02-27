import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';

function AboutSection() {
  return (
    <Box sx={{ padding: 0 }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, 
          marginLeft: 0,
          marginRight: 0
          }}>
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1">
            Week before starting this project, I was scrolling through my old photos. I realized how much of my youth's beauty I had overlooked: the family trips, the natural landscapes, and the serene moments that I had taken for granted. My childhood was a time of boundless freedom, yet I hadn't fully cherished those moments.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
            As time swiftly moved forward, I found myself pondering whether the essence of those captured moments could ever truly be relived. The idea of placing my newer memories into a time capsule became a captivating thought, a way to see the growth in the world I've traversed and the places that have touched my soul.
            </Typography>
            <Typography  variant="body1" sx={{ marginTop: 2 }}>
            GeoSnap emerged from this reflection—a platform dedicated to everyone seeking to reclaim their lost childhood memories, preserve their precious moments, and visualize the breadth of their travels across our magnificent globe. Here, we offer a sanctuary for your memories, a gallery of life's treasures, and a map of your adventures. Join us in creating a tapestry of experiences that span the beauty of our world, stitched together through the memories we hold dear. Welcome to our community, where every snapshot tells a story of discovery, joy, and the endless journey of exploration.
            </Typography>
          </Paper>
        </Grid>
        {/* You can add more grid items for additional content such as images, lists, etc. */}
      </Grid>
    </Box>
  );
}

export default AboutSection;
