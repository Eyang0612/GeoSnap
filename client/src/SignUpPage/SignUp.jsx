import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import {v4 as uuid} from 'uuid';
import {InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import myBackgroundImage from '../assets/Wave.png';
import './SignUp.css'


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

export default function SignUp() {
  const history = useNavigate();
  const [firstname, setFirstname] = useState(true);
  const [lastname, setLastname] = useState(true);
  const [email, setEmail] = useState(true);
  const [emailText, setEmailText] = useState("");
  const [password, setPassword] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [doubleCheckText, setDoubleCheckText] = useState(""); 
  const [passwordCheckText, setPasswordCheckText] = useState(""); 
  const [passwordText, setPasswordText] = useState("Password must have a minimum of 6 characters");
  const [openWarning, setOpenWarning] = useState(false); 

  const [showPassword, setShowPassword] = useState(false);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      
      email: data.get('email'),
      password: data.get('password'),
      firstname: data.get('firstName'),
      lastname:  data.get('lastName')
    };
    
    setDoubleCheckText(data.get('passwordCheck'));
    if(userInputValid(userData)){
    try {
      const response = await axios.post("http://localhost:3000/signup", userData);
      console.log('User created:', response.data);
      history('/login');
      
      // Handle success (redirect, show message, etc.)
    } catch (error) {
      console.error('Error creating user:', error);
      setOpenWarning(true);
    }
  }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  function validateEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email)
  };

  const validatePassword = (password) => password.length >=6;
    
  

  function userInputValid (userData){
    let isValid = true;
    if(userData.email === ""){
      isValid = false;
      
      setEmail(false);
      setEmailText("This field cannot be empty");
    }else if(!validateEmail(userData.email)){
      setEmail(false);
      setEmailText("This email is not valid");
    }else{
      setEmail(true);
      setEmailText("");
    }
    if(userData.password === ""){
      isValid = false;
      setPassword(false);
      setPasswordText("This email is not valid");
    }else if(!validatePassword(userData.password)){
      isValid = false;
      setPassword(false);
      setPasswordText("Password does not meet the requirement: (min 6 characters)");
    }else if(userData.password !== doubleCheckText){
      isValid = false;
      setPasswordCheck(false);
      setPasswordCheckText("Password does not match");
    }
    else{
      setPassword(true);
      setPasswordText("Password must have a minimum of 6 characters");
    }
    if(userData.firstname === ""){
      isValid = false;
      setFirstname(false);
    }else{
      setFirstname(true);
    }
    if(userData.lastname === ""){
      isValid = false;
      setLastname(false);
    }else{
      setLastname(true);
    }

    return isValid;

  }

    
  

  return (
    <Box>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
          <Avatar sx={{ m: 1, background: 'linear-gradient(90deg, hsla(186, 66%, 40%, 1) 0%, hsla(188, 78%, 69%, 1) 100%)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                error = {!firstname}
                helperText ={!firstname? "This field cannot be empty" : ""}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                error = {!lastname}
                helperText ={!lastname? "This field cannot be empty" : ""}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error = {!email}
                  helperText ={emailText}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error = {!password}
                helperText ={passwordText}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword?"text":"password"}
                  id="password"
                  autoComplete="new-password"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                error = {!passwordCheck}
                helperText ={passwordCheckText}
                  required
                  fullWidth
                  name="passwordCheck"
                  label="Confirm Password"
                  type="password"
                  id="passwordCheck"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Collapse in={openWarning}>
                  <Alert severity="error"
                    action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                      setOpenWarning(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                     }
                      sx={{ mb: 2 }}
                    >
                      Error: Data not register or Email Already Exist.
                  </Alert>
                </Collapse>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: 'linear-gradient(90deg, hsla(186, 66%, 40%, 1) 0%, hsla(188, 78%, 69%, 1) 100%)' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    <img src={myBackgroundImage} style={{
        position: 'absolute',
        bottom: 0,
        left:0,
        right: 0,
        height: '30%',
        width: '100%',
        zIndex: -1,
        
        backgroundSize: 'cover',
  backgroundPosition: 'center', // Center the background image
      
    }}/>
    </Box>
  );
}