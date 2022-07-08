import React from "react";
import Axios from "axios";
import { API_URL } from '../helper.js';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../actions/userAction';
import { useDispatch } from 'react-redux';
import { Text } from '@chakra-ui/react';
import background from '../Images/bg.jpg';
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

const LoginPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("");
    const [passwordType, setPasswordType] = React.useState("password");

    const togglePassword = () => {
        if (passwordType === "password"){
            setPasswordType("text")
        } else {
            setPasswordType("password")
        }
        console.log(passwordType);
    };

    const btnLogin = () => {
        Axios.get(API_URL + `/users?email=${email}&password=${password}`)
        .then((response) => {
            console.log(response.data);
            localStorage.setItem("eshopLog", response.data[0].id); 
            dispatch(loginAction(response.data[0])); // untuk menyimpan data ke global
            navigate('/', {replace: true}); // untuk pindah ke landing page dan tidak bisa kembali ke sign in
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div style={{backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundSize: "cover", height: "100vh"}}>
            <div className="container py-5">
                <div id="form-login" className="card bg-white my-5 p-3 m-auto shadow">
                    <Text fontSize="4xl" className="fw-bold">Sign in for Shopping</Text>
                    <div className="d-flex">
                        <h6 style={{color: "#a1a1a1"}}>Not Have Account?</h6>
                        <h6 className="ms-2" style={{color: "#0b5fda"}}>Sign Up</h6>
                    </div>
                    <div>
                        <label className="form-label fw-bold text-muted">Email</label>
                        <input type="email" className="form-control p-3" 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label className="form-label fw-bold text-muted">Password</label>
                        <div className="d-flex align-items-center border rounded">
                            <input type={passwordType} className="col-10 border-0 fs-6 form-control-lg" 
                                // style={{width: "85%"}} 
                                placeholder="8 - 20 characters" onChange={(e) => setPassword(e.target.value)} value={password}>
                            </input>
                            <div style={{height: "50px"}} className="col-2 d-flex align-items-center justify-content-center">
                                <button className="border-0 bg-transparent w-100 h-100" 
                                    onClick={togglePassword}>
                                    {passwordType === "password" ? <VscEyeClosed className="image-fluid w-75 h-50"/> :
                                    <VscEye className="image-fluid w-75 h-50"/>}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <h6 className="my-2" style={{color: "#a1a1a1"}}>Forgot Password? <a href="#" style={{color: "#0b5fda"}}>Click Here</a></h6>
                        <button className="btn btn-primary py-2 px-3 w-25 fw-bold fs-4"
                            onClick={btnLogin}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;

