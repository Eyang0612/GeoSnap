import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from './Authentication/Storage';
import {useNavigate} from "react-router-dom"


export const AuthenticationContext = createContext();

export default function AuthenticationProvider ({ children }){
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUserSession] = useState(false);

  // call this function when you want to authenticate the user
  const login = (data) => {
    setUserSession(data);

  };

  // call this function to sign out logged in user
  const logout = () => {
    setUserSession(null);
    
  };
  const checkSession = () => {
    try {
      // Using Fetch with credentials included
      //const response = await fetch('http://localhost:3000/verifySession', {
      //  credentials: 'include',
      //});

      // If you prefer to use Axios
      //const response = await axios.get('http://localhost:3000/verifySession',{
      //    withCredentials: true
      //  });
      //  console.log("whatsgoing on")
      //const data = await response.data;
      const id = localStorage.getItem("id");
      console.log(id);
      if(id){
      setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
      //console.log(data.isAuthenticated);
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };
  useEffect(() => {
    
    checkSession();
    const id = localStorage.getItem("id");
      console.log(id);
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, checkSession}}>
      {children}
    </AuthenticationContext.Provider>
  );
};



