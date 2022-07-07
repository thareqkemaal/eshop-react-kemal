import './App.css';
import React from 'react';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Component/Navbar';
import ProductPage from './Pages/ProductPage';
import FooterComponent from './Component/Footer';
import UserDisplayProduct from './Pages/UserDisplayProduct';

function App() {
  return (
    <div>
      <div>
        <NavbarComponent/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/register' element={<RegisPage/>}/>
          <Route path='/products/admin' element={<ProductPage/>}/>
          <Route path='/products' element={<UserDisplayProduct/>}/>
        </Routes>
        <FooterComponent/>
      </div>
    </div>
  );
}

export default App;
