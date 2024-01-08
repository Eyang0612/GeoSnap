import React from 'react';
import Header from './Header';
import HomeBody from './HomeBody'
import Box from '@mui/material/Box';
import Footer from "./Footer";
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

/*const useStyles = makeStyles((theme) => ({
  background: {
    //backgroundImage: `url(${backgroundImage})`, // Replace with your image path
    backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    backgroundSize: 'cover', // Cover the entire space
    backgroundPosition: 'center', // Center the image
    height: '100vh', // Full height
    width: '100vw' // Full width
  },
  // ... other styles
}));*/

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
 
}));

function Home() {
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
        {['Home', 'About', 'Contact'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        background: 'linear-gradient(0deg, #1c262e 80%,  #869098)',
        background_size: 'cover', // Cover the entire space
        background_position: 'center', // Center the image
        height: '100vh', // Full height
        width: '100vw' // Full width
      }}
    >
      <Header menuClick={toggleDrawer}/>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    <HomeBody/>
    <Footer/>
    </Box>
  );
}

export default Home;