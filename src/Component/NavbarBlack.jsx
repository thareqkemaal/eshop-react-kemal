import React from "react";
import { useNavigate } from 'react-router-dom';

const NavbarBlackComponent = (props) => {

    const navigate = useNavigate();

    return  (
        <div>
            <div style={{position: "absolute", zIndex: "2", width: "100%"}}>
                <div className="navbar navbar-expand-lg navbar-light bg-transparent">
                    <div className="container">
                        <span className="navbar-brand" onClick={()=>navigate('/')}>
                            <span className="fw-bold text-dark">
                                E-SHOP
                            </span>
                            <span className="lead ms-1 text-dark">
                                | Furniture
                            </span>
                        </span>
                        <button className="navbar-toggler" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#eshopNavbar" 
                            aria-controls="eshopNavbar" aria-expanded="false">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="eshopNavbar">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li>
                                    <span className="nav-link text-dark" 
                                    onClick={()=>navigate('/product/admin')}>
                                        Product
                                    </span>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <div className="btn-group">
                                    <button className="btn btn-outline-primary">Sign In</button>
                                    <button className="btn btn-primary" 
                                    type="button" 
                                    onClick={()=>navigate('/register')}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>{props.children}</div>
        </div>
    )
};

export default NavbarBlackComponent;