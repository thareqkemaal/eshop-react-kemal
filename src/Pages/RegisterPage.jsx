import React from "react";
import joinimage from '../Images/join-img.png';
import google from '../Images/google.png';
import Axios from 'axios';
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import background from '../Images/bg.jpg';


const url = "http://localhost:2022"


const RegisPage = (props) => {
    const [database, setDatabase] = React.useState([]);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [arrayLength, setLength] = React.useState(0);
    const [passwordType, setPasswordType] = React.useState("password");

    React.useEffect(() => {
        getData();
      }, []);

    const getData = () => {
        Axios.get(url + '/users')
        .then((response) => {
            console.log(response.data);
            setDatabase(response.data);
            setLength(response.data.length);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleUsername = (e) => {
        console.log(e.target.value);
        setUsername(e.target.value);
    };

    const handleEmail = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    };

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

    const btnSubmit = () => {
        let input = {
            id: arrayLength + 1,
            username: username,
            email: email,
            role: "User",
            status: "Unverified",
            password: password
        };

        Axios.post(url + '/users', input)
        .then((response) => {
            console.log(response.data);
            getData();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
    <div style={{backgroundImage: `url(${background})`}}>
        <div className="container">
            <div className="d-flex justify-content-center align-items-center"> 
                <div className="mt-5 p-5 d-flex justify-content-center">
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
                        <div className="d-flex p-2 justify-content-evenly row">
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
                                    <div className="my-2">
                                        <span className="fw-bold fs-6 ms-2" style={{color: "#545454"}}>Username</span><br/>
                                        <input className="border rounded-1 p-3 d-flex align-items-center" style={{width: "90%"}} 
                                        placeholder="example01" onChange={handleUsername} value={username}></input>
                                    </div>
                                    <div className="my-2">
                                        <span className="fw-bold fs-6 ms-2" style={{color: "#545454"}}>E-Mail</span><br/>
                                        <input className="border rounded-1 p-3 d-flex align-items-center" style={{width: "90%"}} 
                                        placeholder="name@example.com" onChange={handleEmail} value={email}></input>
                                    </div>
                                    <div className="my-2">
                                        <span className="fw-bold fs-6 ms-2" style={{color: "#545454"}}>Password</span><br/>
                                        <div className="d-flex align-items-center" style={{width: "90%"}}>
                                            <input className="border rounded-start d-flex align-items-center px-2 py-3" style={{width: "85%"}} 
                                            placeholder="max. 8 character" onChange={handlePassword} value={password}
                                            type={passwordType}></input>
                                            <div style={{width: "15%", height: "58px"}} className="d-flex align-items-center justify-content-center">
                                                <button className="border rounded-end w-100 h-100" onClick={togglePassword}>
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
                                        <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
                                            <img src={google} style={{width: "7%"}}/>
                                            <a className="ms-2 text-decoration-none fw-bold" href="#">Sign up with Google</a>
                                        </div>
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