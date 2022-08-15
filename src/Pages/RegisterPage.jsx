import React from "react";
import Axios from 'axios';
import { API_URL } from '../helper.js'
import background from '../Images/bg.jpg';
import joinimage from '../Images/join-img.png';
import google from '../Images/google.png';
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";


const RegisPage = (props) => {
    const [database, setDatabase] = React.useState([]);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [arrayLength, setLength] = React.useState(0);
    const [passwordType, setPasswordType] = React.useState("password");

    const navigate = useNavigate();

    React.useEffect(() => {
        getData();
      }, []);

    const getData = () => {
        Axios.get(API_URL + '/auth')
        .then((response) => {
            console.log(response.data);
            setDatabase(response.data);
            setLength(response.data.length);
        }).catch((error) => {
            console.log(error);
        })
    }

    const resetInputField = () => {
        setUsername("");
        setEmail("");
        setPassword("");
    };

    const togglePassword = () => {
        if (passwordType === "password"){
            setPasswordType("text")
        } else {
            setPasswordType("password")
        }

        console.log(passwordType);
    }

    const toast = useToast();

    const btnSubmit = () => {
        let input = {
            username: username,
            email: email,
            password: password
        };

        Axios.post(API_URL + '/auth/regis', input)
        .then((response) => {
            console.log(response.data);
            if(response.data.success){
                getData();
                toast({
                    title: "Account Created",
                    description: `Welcome to E-SHOP ${response.data.username}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true
                });
                navigate("/", {replace: true});
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
    <div style={{backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundSize: "cover"}}>
        <div className="container">
            <div className="d-flex justify-content-center align-items-center"> 
                <div className="mt-5 py-5 p-md-5 d-flex justify-content-center">
                    <div className="shadow border rounded-3 d-flex flex-column bg-white p-2">
                        <div className="p-2 d-flex flex-column mb-2"> {/*banner*/}
                            <div className="d-flex align-items-center">
                                <div className="w-50 mb-2">
                                    <span className="fw-bold fs-3" style={{color: "#0b5fda"}}>E-SHOP</span>
                                </div>
                                <div className="w-50 text-end">
                                    <span style={{color: "#a1a1a1"}}>English (USA)</span>
                                </div>
                            </div>
                            <div>
                                <span style={{color: "#a1a1a1"}}>A central hub where best furniture can be found.</span>
                            </div>
                        </div>
                        <div className="p-2 row">
                            <div className="w-lg-50 d-flex align-items-center d-none d-lg-block col-lg-6"> {/*left image*/}
                                <img src={joinimage} className="img-fluid"/>
                            </div>
                            <div className="w-lg-50 d-flex flex-column align-items-center col-12 col-lg-6"> {/*right sign up*/}
                                <div className="w-100 p-1"> {/*right sign up banner*/}
                                    <span className="fw-bold" style={{color: "#a1a1a1"}}>START FOR FREE</span><br/>
                                    <span className="fw-bolder fs-1">Sign up to E-SHOP</span><br/>
                                    <span className="fw-bold" style={{color: "#a1a1a1"}}>Already a member? <a className="text-decoration-none" href="#">Log in</a></span>
                                    </div>
                                <div className="w-100 p-1 ms-2"> {/*right sign up input*/}
                                    <div className="mb-2 d-flex flex-column">
                                        <label className="form-label fw-bold fs-6" style={{color: "#545454"}}>Username</label>
                                        <input type="text" className="border fs-6 form-control-lg"
                                            style={{width: "90%"}} 
                                            placeholder="example01" onChange={(e) => setUsername(e.target.value)} value={username}>
                                        </input>
                                    </div>
                                    <div className="mb-2 d-flex flex-column">
                                        <label className="form-label fw-bold fs-6" style={{color: "#545454"}}>Email</label>
                                        <input type="email" className="border fs-6 form-control-lg"
                                            style={{width: "90%"}} 
                                            placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email}>
                                        </input>
                                    </div>
                                    <div className="mb-2 d-flex flex-column">
                                        <label className="form-label fw-bold fs-6" style={{color: "#545454"}}>Password</label>
                                        <div className="d-flex align-items-center border rounded" style={{width: "90%"}}>
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
                                    <div className="my-3" style={{width: "90%"}}> {/*right sign up create button*/}
                                        <button className="btn btn-primary w-100 p-3 fs-4 " 
                                        onClick={() => {btnSubmit(); resetInputField()}}
                                        type="button"
                                        >Create Account</button>
                                        <button type="button" className="shadow btn btn-light w-100 py-2 mt-3 d-flex justify-content-center align-items-center"
                                        onClick={() => window.open(`${API_URL}/auth/google`, '_blank').focus()}>
                                            <img src={google} style={{width: "7%"}}/>
                                            <span className="ms-2 fw-bold">Sign up with Google</span>
                                        </button>
                                        <div className="mt-5 text-muted">
                                            <span>This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ) 
};

export default RegisPage;