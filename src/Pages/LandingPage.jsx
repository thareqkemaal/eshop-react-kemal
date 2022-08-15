import React from "react";
import background from '../Images/bg.jpg';
import sofa from '../Images/sofa.jpg';
import mejamakan from '../Images/mejamakan.jpg';
import tempattidur from '../Images/tempattidur.jpg';


const LandingPage = (props) => {

return (
    <div>
        <div style={{backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="py-5 d-flex">
                <div className="d-none d-md-block col-6" style={{height: "100vh"}}></div>
                <div className="col-12 col-md-6" style={{height: "100vh"}}>
                    <div className="d-none d-md-block h-50"></div>
                    <div className="d-md-none h-25"></div>
                    <div className="h-50">
                        <div className="h-100 w-100">
                            <div style={{backgroundColor: "rgba(52, 52, 52, 0.2)"}}>
                                <div style={{color: "rgba(0, 0, 0)"}}>
                                    <div id="carouselControls" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active p-3" data-bs-interval="4000">
                                                <div className="px-4 pt-3">
                                                    <p className="fs-3">Find Your Best <span className="fw-bold">Livingroom</span> Furniture</p>
                                                    <p className="fs-6 fs-md-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis enim semper, tristique tellus quis, molestie elit. Nam at luctus eros. Nullam nec tincidunt sapien. Mauris faucibus, neque sit amet scelerisque dignissim, tortor velit commodo quam, in bibendum velit ante nec odio.</p>
                                                </div>
                                                <div className="text-end">
                                                    <button className="btn btn-outline-primary px-5 me-5 mb-4">Buy Now</button>
                                                </div>
                                            </div>
                                            <div className="carousel-item p-3" data-bs-interval="4000">
                                                <div className="px-4 pt-3">
                                                    <p className="fs-3">Find Your Best <span className="fw-bold">Kitchen</span> Furniture</p>
                                                    <p className="fs-6 fs-md-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis enim semper, tristique tellus quis, molestie elit. Nam at luctus eros. Nullam nec tincidunt sapien. Mauris faucibus, neque sit amet scelerisque dignissim, tortor velit commodo quam, in bibendum velit ante nec odio.</p>
                                                </div>
                                                <div className="text-end">
                                                    <button className="btn btn-outline-primary px-5 me-5 mb-4">Buy Now</button>
                                                </div>
                                            </div>
                                            <div className="carousel-item p-3" data-bs-interval="4000">
                                                <div className="px-4 pt-3">
                                                    <p className="fs-3">Find Your Best <span className="fw-bold">Bedroom</span> Furniture</p>
                                                    <p className="fs-6 fs-md-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis enim semper, tristique tellus quis, molestie elit. Nam at luctus eros. Nullam nec tincidunt sapien. Mauris faucibus, neque sit amet scelerisque dignissim, tortor velit commodo quam, in bibendum velit ante nec odio.</p>
                                                </div>
                                                <div className="text-end">
                                                    <button className="btn btn-outline-primary px-5 me-5 mb-4">Buy Now</button>
                                                </div>
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
                </div>
            </div>
        </div>
        <div className="article">   
        <div className="container-fluid">
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