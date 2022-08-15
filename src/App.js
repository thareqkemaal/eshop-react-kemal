import './App.css';
import React from 'react';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './Component/Navbar';
import ProductPage from './Pages/ProductPage';
import FooterComponent from './Component/Footer';
import UserDisplayProduct from './Pages/UserDisplayProduct';
import LoginPage from './Pages/LoginPage';
import Axios from 'axios';
import { API_URL } from './helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './actions/userAction';
import ProductDetail from './Pages/ProductDetail';
import UserCart from './Pages/UserCart';
import NotFoundPage from './Pages/NotFoundPage';
import Checkout from './Pages/CheckoutPage';
import Invoice from './Pages/InvoicePage';
import UserTransactionPage from './Pages/UserTransactionPage';
import VerifPage from './Pages/VerificationPage';

function App() {
  const dispatchEvent = useDispatch();

  const [loading, setLoading] = React.useState(true);

  const { username, role } = useSelector(({ userReducer }) => {
    return {
      username: userReducer.username,
      role: userReducer.role
    }
  })

  const keepLogin = () => {
    let eshopLog = localStorage.getItem("eshopLog")
    if(eshopLog) {
      Axios.get(API_URL + `/auth/keep`, {
        headers: {
          'Authorization' : `Bearer ${eshopLog}`
        }
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.token){
          localStorage.setItem("eshopLog", response.data.token);
          delete response.data.token;
          setLoading(false);
          dispatchEvent(loginAction(response.data));
        }
      }).catch((error) => {
        console.log(error);
      })
    } else {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    keepLogin()
  }, []);


  return (
    <div>
      <div>
        <NavbarComponent loading={loading}/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/verification/:token' element={<VerifPage/>}/>
          {
            role ? 
            null :
            <>
            <Route path='/register' element={<RegisPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            </>
          }
          {/* 
          {
            role == "Admin" &&
            <>
              <Route path='/products/admin' element={<ProductPage/>}/>
            </>
          }
          disebut single ternary
          */}
          {
            role == "admin" ?
              <>
                <Route path='/products/admin' element={<ProductPage/>}/>
                <Route path='/products' element={<UserDisplayProduct/>}/>
              </>
              :
              <>
                <Route path='/products' element={<UserDisplayProduct/>}/>
                <Route path='/products/detail/:id' element={<ProductDetail/>}/>
                <Route path='/cart' element={<UserCart/>}/>
                <Route path='/usertransaction' element={<UserTransactionPage/>}/>
                {/* <Route path='/checkout' element={<Checkout/>}/> */}
                <Route path='/invoice' element={<Invoice/>}/>
              </>
          }
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
        <FooterComponent/>
      </div>
    </div>
  );
}

export default App;
