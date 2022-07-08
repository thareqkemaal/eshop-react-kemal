import './App.css';
import React from 'react';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Component/Navbar';
import ProductPage from './Pages/ProductPage';
import FooterComponent from './Component/Footer';
import UserDisplayProduct from './Pages/UserDisplayProduct';
import LoginPage from './Pages/LoginPage';
import Axios from 'axios';
import { API_URL } from './helper';
import { useDispatch } from 'react-redux';
import { loginAction } from './actions/userAction';

function App() {
  const dispatchEvent = useDispatch();

  const keepLogin = () => {
    let eshopLog = localStorage.getItem("eshopLog")
    if(eshopLog) {
      Axios.get(API_URL + `/users?id=${eshopLog}`)
      .then((response) => {
        if (response.data.length > 0){
          localStorage.setItem("eshopLog", response.data[0].id);
          dispatchEvent(loginAction(response.data[0]));
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  };

  React.useEffect(() => {
    keepLogin()
  }, []);


  return (
    <div>
      <div>
        <NavbarComponent/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/register' element={<RegisPage/>}/>
          <Route path='/products/admin' element={<ProductPage/>}/>
          <Route path='/products' element={<UserDisplayProduct/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
        <FooterComponent/>
      </div>
    </div>
  );
}

export default App;
