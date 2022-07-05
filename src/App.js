import './App.css';
import React from 'react';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Component/Navbar';

function App() {
  return (
    <div>
      <NavbarComponent/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<RegisPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
