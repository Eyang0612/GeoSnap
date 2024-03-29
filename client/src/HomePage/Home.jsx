import React from 'react';
import Header from './Header';
import HomeBody from './HomeBody'
import Box from '@mui/material/Box';
import Footer from "./Footer";
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import About from './AboutSection';
import Purpose from './PurposeSection';
import WaveImage from '../assets/Ocean.png';
import { Typography } from '@mui/material';




function Home() {

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);



  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const [drawerOpen, setDrawerOpen] = useState(false);
  //const classes = useStyles();
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  const list = () => (
    <Box
      sx={{width:250}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => scrollToRef(section1Ref)}>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button onClick={() => scrollToRef(section2Ref)}>
          <ListItemText primary='About' />
        </ListItem>
        <ListItem button onClick={() => scrollToRef(section3Ref)}>
          <ListItemText primary='Purpose' />
        </ListItem>
        <ListItem button onClick={() => scrollToRef(section4Ref)}>
          <ListItemText primary='Contact' />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Box ref={section1Ref} sx={{
        background: 'linear-gradient(90deg, hsla(186, 66%, 40%, 1) 100%, hsla(188, 78%, 69%, 1) 100%)',
        background_size: 'cover', // Cover the entire space
        background_position: 'center', // Center the image
        height: '100vh', // Full height
        width: '100vw', // Full width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',


      }}
      >
        <Header menuClick={toggleDrawer} />

        <HomeBody />

      </Box>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Box ref={section2Ref} sx={{
        background: `linear-gradient(180deg,  hsla(186, 66%, 40%, 1) 0%, transparent 60%),url(${WaveImage})`,
        height: '100vh', // Full height
        width: '100vw', // Full width 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <About />

      </Box>
      <Box ref={section3Ref}>
        <Purpose/>
      </Box>
      <Box ref={section4Ref} sx={{ height: "auto", background: 'linear-gradient(0deg,  hsla(186, 66%, 40%, 1) 45% ,transparent)', }}>
        <Footer />
      </Box>
    </div>
  );
}

export default Home;