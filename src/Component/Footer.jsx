import React from "react";
import { useNavigate } from 'react-router-dom';
import { Select, Text } from '@chakra-ui/react';
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const FooterComponent = (props) => {
    const navigate = useNavigate();

    return (
    <div className="py-4" style={{backgroundColor: "#dbdbdb"}}>
        <div className="container">
            <div className="d-flex text-center">
                <div className="col-12 col-sm-3 fs-5">
                    <span className="fw-bold" style={{color: "#0b5fda"}}>E-SHOP</span> | Furniture
                </div>
                <div className="d-none d-sm-flex col-sm-3 justify-content-center">
                    <div className="d-flex flex-column text-start">
                        <span className="fw-bold">Products</span>
                        <span>Bedroom</span>
                        <span>Livingroom</span>
                        <span>Kitchen</span>
                    </div>
                </div>
                <div className="d-none d-sm-flex col-sm-3 justify-content-center">
                    <div className="d-flex flex-column text-start">
                        <span className="fw-bold">Company</span>
                        <span>About Us</span>
                        <span>Career</span>
                    </div>
                </div>
                <div className="d-none d-sm-block col-sm-3">
                    <Text className="fw-bold">Follow Us</Text>
                    <div className="d-flex justify-content-center" style={{height: "30%"}}>
                    <FaFacebook className="h-auto w-auto" style={{color: "#0b5fda"}}/>
                    <FaInstagram className="mx-2 h-auto w-auto" style={{color: "#0b5fda"}}/>
                    <FaTwitter className="h-auto w-auto" style={{color: "#0b5fda"}}/>
                    </div>
                </div>
            </div>
            <div className="text-center mt-3" style={{color: "#a1a1a1"}}>
                © 2022 ESHOPEngineer. All rights reserved.
            </div>
        </div>
    </div>

    )
};

export default FooterComponent;