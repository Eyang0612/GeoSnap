
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { AuthenticationContext } from '../Authentication';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserNavBar = ({ setOpenMap }) => {
  const { checkSession } = useContext(AuthenticationContext)
  const history = useNavigate();
  const logout = async () => {

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI || 'http://localhost:3000'}/logout`,{}, {
        withCredentials: true, // Important: This ensures cookies are sent with the request
      });
      console.log('testing')
      if (response.status === 200) {
        console.log('Logout successful:', response.data);
        window.localStorage.clear();
        history('/');
        await checkSession();
        // Handle successful logout (e.g., redirect to login page, clear user state)
      } else {
        console.error('Logout failed');
        // Handle failed logout (e.g., show error message)
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }
  return (
    <AppBar position="absolute" sx={{ zIndex: 15000, background: 'linear-gradient(275deg, hsla(186, 66%, 40%, 1) 0%, hsla(188, 78%, 69%, 1) 100%)' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          GeoSnap
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
