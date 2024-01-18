
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {useContext} from 'react';
import { AuthenticationContext } from '../Authentication';
import { useNavigate } from 'react-router-dom';


const UserNavBar = ({setOpenMap}) => {
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
        <Button color="inherit" onClick={() => history('/upload')}>Upload</Button>
        <Button color="inherit" onClick={() => setOpenMap(false)}>Gallery</Button>
        <Button color="inherit" onClick={() => setOpenMap(true)}>Map</Button>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavBar;
