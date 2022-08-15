import React from "react";
import background from '../Images/bg.jpg';
import check from '../Images/check.png';
import { loginAction, loginMiddleware } from '../actions/userAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../helper";


const VerifPage = (props) => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const verifyBtn = () => {
            //console.log(token)
            axios.patch(API_URL + `/auth/verify`, {}, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }}).then(res => {
                console.log(res.data);
                if (res.data.iduser){
                    delete res.data.token;
                    dispatch(loginAction(res.data));
                    navigate('/', {replace: true});
                }
            }).catch(error => {
                console.log(error)
            })
            
    }

    return (
    <div style={{backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundSize: "cover"}}>
        <div className="container">
            <div className="d-flex justify-content-center align-items-center"> 
                <div className="mt-5 py-5 p-md-5 d-flex justify-content-center">
                    <div className="shadow border rounded-3 d-flex flex-column justify-content-center align-items-center bg-white p-5">
                        <img src={check} style={{width: "400px"}}/>
                        <Text className="my-4">After Register, you can access all feature with verified account.</Text>
                        <Button colorScheme="green" onClick={verifyBtn}>VERIFIED ACCOUNT</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ) 
};

export default VerifPage;