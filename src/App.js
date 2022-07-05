import './App.css';
import React from 'react';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Component/Navbar';
import background from './Images/bg.jpg';



function App() {
  return (
    <div style={{backgroundImage: `url(${background})`, height: "100%", backgroundPosition: "center", backgroundSize: "cover"}}>
      <NavbarComponent/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<RegisPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
