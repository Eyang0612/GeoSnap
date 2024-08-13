import { Navigate } from "react-router-dom";
import  {useAuth}  from "./Authentication";


const ProtectedRoute = ({ children }) => {
const  {isAuthenticated}  =  useAuth();
console.log("passing");
console.log(isAuthenticated);
  if (!isAuthenticated) {
    // user is not authenticated
    console.log('not passing')
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute
