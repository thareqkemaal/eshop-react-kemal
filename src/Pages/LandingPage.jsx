import React from "react";
import background from '../Images/bg.jpg';
import bgtrans from '../Images/transparent.png';
import sofa from '../Images/sofa.jpg';
import mejamakan from '../Images/mejamakan.jpg';
import tempattidur from '../Images/tempattidur.jpg';
import { Text } from '@chakra-ui/react'

const LandingPage = (props) => {

    return (
    <div>
        <div style={{backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundSize: "cover"}}>
                <div className="d-flex justify-content-center align-items-center"> 
                    <div className="d-none d-md-block my-5 p-5 w-75" style={{height: "100vh"}}></div>
                    <div className="w-100 w-md-50" style={{height: "100vh"}}>
                        <div className="h-100 d-flex align-items-center flex-column">
                            <div className="w-100 h-25 mt-5"></div>
                            <div className="w-100 h-75 mb-5">
                                <div id="carouselControls" className="h-100 carousel slide" data-bs-ride="carousel">
                                    <div className="border h-100 carousel-inner">
                                    <Text fontSize='6xl'>UNDER MAINTENANCE</Text>
                                        {/* <div className="h-100 " style={{position: "absolute", zIndex: "1", backgroundColor: "white"}}>
                                            <img src={bgtrans} className="image-fluid"/>
                                        </div>
                                        <div className="carousel-item active p-3" data-bs-interval="400000">
                                            <div style={{position: "relative", zIndex: "1"}}>
                                                <div className="px-4 pt-3">
                                                    <p className="fs-5">Find Your Best <span className="fw-bold">Living Room</span> Furniture</p>
                                                    <p className="fs-6 fs-md-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis enim semper, tristique tellus quis, molestie elit. Nam at luctus eros. Nullam nec tincidunt sapien. Mauris faucibus, neque sit amet scelerisque dignissim, tortor velit commodo quam, in bibendum velit ante nec odio.</p>
                                                </div>
                                                <div className="text-end">
                                                    <button className="btn btn-outline-primary px-5 me-5 mb-4">Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-item p-3" data-bs-interval="4000">
                                            <div style={{position: "relative", zIndex: "1"}}>
                                                <div className="px-4 pt-3">
                                                    <p className="fs-2">Find Your Best <span className="fw-bold">Dining Room</span> Furniture</p>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis enim semper, tristique tellus quis, molestie elit. Nam at luctus eros. Nullam nec tincidunt sapien. Mauris faucibus, neque sit amet scelerisque dignissim, tortor velit commodo quam, in bibendum velit ante nec odio.</p>
                                                </div>
                                                <div className="text-end">
                                                    <button className="btn btn-outline-primary px-5 me-5 mb-4">Explore More</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-item p-3" data-bs-interval="5000">
                                            <div style={{position: "relative", zIndex: "1"}}>
                                                <div className="px-4 pt-3">
                                                    <p className="fs-2">Find Your Best <span className="fw-bold">Bed Room</span> Furniture</p>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis enim semper, tristique tellus quis, molestie elit. Nam at luctus eros. Nullam nec tincidunt sapien. Mauris faucibus, neque sit amet scelerisque dignissim, tortor velit commodo quam, in bibendum velit ante nec odio.</p>
                                                </div>
                                                <div className="text-end">
                                                    <button className="btn btn-outline-primary px-5 me-5 mb-4">View Gallery</button>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div className="article">   
        <div classNames="container-fluid">
            <div className="row m-5 d-flex align-items-center">
                <div className="col-12 col-md-6">
                    <p className="fs-2 fw-bold text-decoration-underline">FRIHETEN</p>
                    <p className="fs-5 fw-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img src={sofa} style={{width: "80%"}}/>
                </div>
            </div>
            <div className="row m-5 d-md-none d-flex align-items-center">
                <div className="col-12 col-md-6">
                    <p className="fs-2 fw-bold text-decoration-underline">EKEDALEN</p>
                    <p className="fs-5 fw-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat odio facilisis. Sit amet venenatis urna cursus. Nunc id cursus metus aliquam eleifend mi in nulla. Morbi enim nunc faucibus a. Dolor sit amet consectetur adipiscing elit pellentesque.</p>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img src={mejamakan} style={{width: "80%"}}/>
                </div>
            </div>
            <div className="row d-none m-5 d-md-flex align-items-center">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img src={mejamakan} style={{width: "80%"}}/>
                </div>
                <div className="col-12 col-md-6">
                    <p className="fs-2 fw-bold text-decoration-underline">EKEDALEN</p>
                    <p className="fs-5 fw-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat odio facilisis. Sit amet venenatis urna cursus. Nunc id cursus metus aliquam eleifend mi in nulla. Morbi enim nunc faucibus a. Dolor sit amet consectetur adipiscing elit pellentesque.</p>
                </div>
            </div>
            <div className="row m-5 d-flex align-items-center">
                <div className="col-12 col-md-6">
                    <p className="fs-2 fw-bold text-decoration-underline">MALM</p>
                    <p className="fs-5 fw-light">orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id faucibus nisl tincidunt eget nullam non nisi est sit. In eu mi bibendum neque egestas congue quisque egestas. Sed risus pretium quam vulputate dignissim suspendisse in. Eget lorem dolor sed viverra ipsum nunc.</p>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img src={tempattidur} style={{width: "80%"}}/>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
};

export default LandingPage;