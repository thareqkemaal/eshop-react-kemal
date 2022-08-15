import React from "react";
import Axios from 'axios';
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text, Button } from '@chakra-ui/react';
import { BsShieldCheck } from "react-icons/bs";
import { paymentAction, userPayAction } from "../actions/productAction";
import { useToast } from '@chakra-ui/react'


const Checkout = (props) => {
    const [data, setData] = React.useState([]);
    const [paymentMethod, setPaymentMethod] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [inputCash, setInputCash] = React.useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast(); 

    const { id, name, cart, totalCart, shipment } = useSelector(({productReducer}) => {
        return {
            id: productReducer.id,
            name: productReducer.username,
            cart: productReducer.cart,
            totalCart: productReducer.totalCart,
            shipment: productReducer.shipment
        }
    });

    const { invoice } = useSelector(({userReducer}) => {
        return {
            invoice: userReducer.invoice
        }
    });
    
    React.useEffect(()=> {
        getData()
    }, []);

    const getData = () => {
        setData(cart);
    };

    const btnPay = () => {
        if (paymentMethod != ""){
            if(inputCash == 0 || inputCash < (totalCart + shipment)){
                alert("Not Enough Cash");
            } else {
                let userId = localStorage.getItem("eshopLog");
                let change = inputCash - (totalCart + shipment);
                const timestamp = new Date().getTime();
                const date = new Date(timestamp);

                let temp = [...invoice];
                
                let input = ({
                    userId: parseInt(userId),
                    id: parseInt(id),
                    username: name,
                    shipment: shipment,
                    totalCart: totalCart,
                    cart: cart,
                    address,
                    inputCash: parseInt(inputCash),
                    change,
                    date: date.toLocaleDateString("id"),
                    datems: timestamp
                });

                if (temp.length > 0){
                    temp.splice(0, 1);
                } else {
                    temp.push(input);
                };
        
                Axios.patch(API_URL + `/users/${userId}`, {invoice: temp})
                .then((res) => {
                    dispatch(userPayAction());

                    toast({
                        position: "top",
                        title: `Thank You for Your Purchase`,
                        status: "success",
                        duration: 5000,
                        isClosable: true
                    });

                    {/*masih ada bug ketika sudah selesai transaksi, cart di navbar belum nol, baru bisa ketika di refresh */}
                    let temp = [];
                    Axios.patch(API_URL + `/users/${userId}`, {cart: temp})
                    .then((res) => {
                        console.log("cart empty");

                        Axios.post(API_URL + `/checkoutHistory`, input)
                        .then((res) => {
                            console.log("added to checkout history");
                        }).catch((err) => {
                            console.log(err);
                        });
                    }).catch((err) => {
                        console.log(err);
                    });

                    navigate("/invoice", {replace: true});
                }).catch((err) => {
                    console.log(err)
                });
                
            }
        } else if (paymentMethod == ""){
            alert("You have not Selected Any Payment");
        }
    };

    return (
    <div className="border container py-5">
        {/*HEADER*/}
        <div className="row mt-3">
            <div className="col-12 col-md-9">
                <Text fontSize="4xl" style={{fontWeight: "500"}}>Checkout</Text>
                <div className="d-flex">
                    <span style={{color: "#a1a1a1"}}>Prepare your product so that customer can
                        <span className="fw-bold" style={{color: "#0b5fda"}}> transact more easily</span>
                    </span>
                </div>
            </div>
        </div>
        {/*CONTENT*/}
        <div className="border row">
            {/*LEFT SIDE*/}
            <div className="border col-8 p-2">
                <div className="my-2">
                    <a className="fw-bold">Delivery Address:</a><br/>
                    <div className="my-2">
                        <a className="fw-bold" style={{textTransform: "uppercase"}}>{name}</a>
                    </div>
                    <textarea className="form-control w-75" rows="4" placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}></textarea>
                </div>
            </div>
            {/*RIGHT SIDE*/}
            <div className="border col-4 p-2">
                <div className="border-3 rounded-3 p-3 bg-primary">
                    <div className="d-flex align-items-center justify-content-between text-white">
                        <div className="fw-bold">
                            Total Product: {data.length} item(s)
                        </div>
                        <div className="fw-bold fs-5">
                            Rp. {totalCart.toLocaleString("id")}
                        </div>
                    </div>
                    <div className="border-bottom border-white d-flex align-items-center justify-content-between text-white">
                        <div className="fw-bold">
                            Shipping:
                        </div>
                        <div className="fw-bold fs-5">
                            Rp. {shipment.toLocaleString("id")}
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between text-white">
                        <div className="fw-bold">
                            TOTAL:
                        </div>
                        <div className="fw-bold fs-5">
                            Rp. {(totalCart + shipment).toLocaleString("id")}
                        </div>
                    </div>
                    <div className="mt-3">
                        <select className="border rounded-3 p-2 btn-outline-primary fw-bold"
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option className="bg-white text-dark" value="">Choose Your Payment</option>
                            <option className="bg-white text-dark" value="cash">Cash</option>
                        </select>
                        <div className="my-2">
                            <input type="number" 
                                className={ paymentMethod == "cash" ? "d-block p-2 border-2 border-primary rounded-3 w-75" : "d-none"} 
                                placeholder="Input Your Cash"
                                onChange={(e) => setInputCash(e.target.value)}>
                            </input>
                        </div>
                        <div className="d-flex justify-content-center mt-3 mb-2">
                            <Button colorScheme="green" className="px-4 fw-bold fs-5"
                            onClick={btnPay}><BsShieldCheck/> Click to Pay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default Checkout;