import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './HomePage/Home'
import SignUp from './SignUpPage/SignUp'
import Login from './LoginPage/Login'
import User from './UserPage/User'
import AuthenticationProvider from './Authentication'
import ProtectedRoute from './ProtectedRoute'
import UploadForm from './UserPage/UploadPage/Upload'
//import Auth from './Auth'

function App() {

  return (
 <AuthenticationProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute> 
        }
      />

<Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadForm />
          </ProtectedRoute> 
        }
      />
      
    </Routes>
    </BrowserRouter>
  </AuthenticationProvider>  
  );
}

export default App
