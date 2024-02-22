import React from 'react';
import Header from './Header';
import HomeBody from './HomeBody'
import Box from '@mui/material/Box';
import Footer from "./Footer";
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'
import About from './AboutSection'


const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },

}));

function Home() {

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);



  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  //const classes = useStyles();
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  const list = () => (
    <div
      className={classes.list}
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
          <ListItemText primary='Contact' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Box ref={section1Ref} sx={{
        background: 'linear-gradient(0deg, #1c262e 50%,  #869098)',
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
        background: 'linear-gradient(225deg,  #1c262e 65%, #00008B)',
        height: '100vh', // Full height
        width: '100vw', // Full width 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <About />

      </Box>
      <Box ref={section3Ref} sx={{ height: "auto", background: 'linear-gradient(-90deg,   #1c262e 45% ,#00008B)', }}>
        <Footer />
      </Box>
    </div>
  );
}

export default Home;