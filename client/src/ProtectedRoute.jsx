import { Navigate } from "react-router-dom";
import  {AuthenticationContext}  from "./Authentication";
import {useContext} from 'react';

const ProtectedRoute = ({ children }) => {
const  {isAuthenticated}  =  useContext(AuthenticationContext);
console.log("passing");
console.log(isAuthenticated);
  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute
