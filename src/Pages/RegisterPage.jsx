import React from "react";
import joinimage from '../Images/join-img.png';
import eye from '../Images/eye.png';
import google from '../Images/google.png';
import Axios from 'axios';
import { VscEyeClosed } from "react-icons/vsc";

const url = "http://localhost:2022"


const RegisPage = (props) => {
    const [database, setDatabase] = React.useState([]);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [arrayLength, setLength] = React.useState(0);

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
    <div>
        <div className="container">
            <div className="d-flex justify-content-center align-items-center">
                <div className="p-5 d-flex justify-content-center">
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
                                    <span className="fw-bold fs-6" style={{color: "#a1a1a1"}}>START FOR FREE</span><br/>
                                    <span className="fw-bolder fs-2">Sign up to E-SHOP</span><br/>
                                    <span className="fw-bold fs-6" style={{color: "#a1a1a1"}}>Already a member? <a className="text-decoration-none" href="#">Log in</a></span>
                                    </div>
                                <div className="w-100 p-1 ms-2"> {/*right sign up input*/}
                                    <div className="my-2">
                                        <span className="fw-bold fs-6 ms-2" style={{color: "#545454"}}>Username</span><br/>
                                        <div className="border rounded-1 p-1 d-flex align-items-center" style={{width: "90%"}}>
                                            <input  className="border-0 p-2" style={{width: "90%"}} placeholder="example01"
                                            onChange={handleUsername} type="text"></input><br/>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <span className="fw-bold fs-6 ms-2" style={{color: "#545454"}}>E-Mail</span><br/>
                                        <div className="border rounded-1 p-1 d-flex align-items-center" style={{width: "90%"}}>
                                            <input className="border-0 p-2" style={{width: "90%"}} placeholder="name@domain.com"
                                            onChange={handleEmail} type="text"></input><br/>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <span className="fw-bold fs-6 ms-2" style={{color: "#545454"}}>Password</span><br/>
                                        <div className="border rounded-1 p-1 d-flex align-items-center" style={{width: "90%"}}>
                                            <input  className="border-0 p-2" style={{width: "90%"}} placeholder="max. 8 character"
                                            onChange={handlePassword} type="password"></input><br/>
                                            <div style={{width: "10%"}} className="mx-2 d-flex align-items-center">
                                                <VscEyeClosed className="img-fluid w-75"/>  
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-3"> {/*right sign up create button*/}
                                        <button className="btn btn-primary w-75 p-3 fs-5" 
                                        onClick={() => {btnSubmit(); resetInputField()}}
                                        type="button"
                                        >Create Account</button>
                                        <div className="w-75 mt-3 d-flex justify-content-center align-items-center">
                                            <img src={google} style={{width: "10%"}}/>
                                            <a className="ms-2 text-decoration-none fw-bold" href="#">Sign up with Google</a>
                                        </div>
                                        <div className="mt-5 text-muted">
                                            <span>This site is protected by reCAPTCHA and the Google</span><br/>
                                            <span>
                                            <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.</span>
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