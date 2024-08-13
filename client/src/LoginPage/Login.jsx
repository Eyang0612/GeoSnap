import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import WorldMapImage from '../assets/LoginBackground/3DworldMap.png';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import {useContext} from 'react';
import { AuthenticationContext } from '../Authentication';
import {InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import myBackgroundImage from '../assets/Wave.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        GeoSnap
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const history = useNavigate();
  const [dataValid, setDataValidity] = useState(false); 
  const { checkSession } = useContext(AuthenticationContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI||'http://localhost:3000'}/login`, formData, {withCredentials: true,})
      await window.localStorage.setItem("id", response.data._id)
      await window.localStorage.setItem("firstname", response.data.firstname);
      await window.localStorage.setItem("lastname", response.data.lastname);
      if(response.status === 201){
       
        await checkSession()
        history('/user')
      }
     

      
      console.log('Login successful:', response.data);
    } catch (error) {
      setDataValidity(true);
      console.error('Login failed:', error);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh'
   }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${WorldMapImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
        sx={{
          
          backgroundImage: `linear-gradient(to top, transparent 30%, #ffffff 50%), url(${myBackgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto',
    backgroundPosition: 'bottom-center', // Center the background image
        }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, background: 'linear-gradient(90deg, hsla(186, 66%, 40%, 1) 0%, hsla(188, 78%, 69%, 1) 100%)' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
              error={dataValid}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
              error={dataValid}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword?"text":"password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Collapse in={dataValid}>
                  <Alert severity="error"
                    action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                      setDataValidity(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                     }
                      sx={{ mb: 2 }}
                    >
                      Error: email or password Does Not Exist
                  </Alert>
                </Collapse>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, background: 'linear-gradient(90deg, hsla(186, 66%, 40%, 1) 0%, hsla(188, 78%, 69%, 1) 100%)'}}
              >
                Login
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/Signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
