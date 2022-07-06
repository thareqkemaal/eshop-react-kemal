import './App.css';
import React from 'react';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Component/Navbar';
import ProductPage from './Pages/ProductPage';
import FooterComponent from './Component/Footer';

function App() {
  return (
    <div>
      <div>
        <NavbarComponent/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/register' element={<RegisPage/>}/>
          <Route path='/product/admin' element={<ProductPage/>}/>
        </Routes>
        <FooterComponent/>
      </div>
    </div>
  );
}

export default App;
