import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './HomePage/Home'
import SignUp from './SignUpPage/SignUp'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App
