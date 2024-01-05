import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './HomePage/Home'
import SignUp from './SignUpPage/SignUp'
import Login from './LoginPage/Login'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/Login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App
