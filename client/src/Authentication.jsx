import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from './Authentication/Storage';
import {useNavigate} from "react-router-dom"


const AuthenticationContext = createContext();

export default function AuthenticationProvider ({ children }){
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkSession() { 
    try {
      // Using Fetch with credentials included
      //const response = await fetch('http://localhost:3000/auth', {
      //  credentials: 'include',
      //});

      // If you prefer to use Axios
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI||'http://localhost:3000'}/auth`,{
         withCredentials: true
       });
      
       console.log(response.data.isAuthenticated)
        setIsAuthenticated(response.data.isAuthenticated)
     
      //console.log(data.isAuthenticated);
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Error checking session:', error);
    }
  };
  useEffect(() => {
    
    checkSession();
    
    
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthenticationContext.Provider>
  );
};


export const useAuth = () => useContext(AuthenticationContext);
