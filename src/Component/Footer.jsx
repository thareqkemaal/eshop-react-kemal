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
                <div className="d-none d-sm-block col-sm-3">
                    <Text className="fw-bold">Products</Text>
                    <Text>Livingroom</Text>
                    <Text>Bedroom</Text>
                    <Text>Kitchen</Text>
                </div>
                <div className="d-none d-sm-block col-sm-3">
                    <Text className="fw-bold">Company</Text>
                    <Text>About Us</Text>
                    <Text>Career</Text>
                </div>
                <div className="d-none d-sm-block col-sm-3">
                    <Text className="fw-bold">Follow Us</Text>
                    <div className="d-flex justify-content-evenly" style={{height: "30%"}}>
                    <FaFacebook className="h-auto w-auto"/>
                    <FaInstagram className="h-auto w-auto"/>
                    <FaTwitter className="h-auto w-auto"/>
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