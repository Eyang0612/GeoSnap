import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './HomePage/Home'
import SignUp from './SignUpPage/SignUp'
import Login from './LoginPage/Login'
import User from './UserPage/User'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/user" element={<User/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App
