import React from 'react';
import Axios from 'axios';
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text, Button } from '@chakra-ui/react';
import { updateCartAction } from '../actions/userAction';
import { checkoutAction } from '../actions/productAction';

const UserCart = (props) => {
    const [dataCart, setDataCart] = React.useState([])
    const [databaseProd, setDatabaseProd] = React.useState([])
    const [totalCart, setTotalCart] = React.useState(0);
    const [shipping, setShipping] = React.useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { name } = useSelector(({userReducer}) => {
        return {
            name: userReducer.username
        };
    });

    React.useEffect(() => {
        getData();
        getProdData();
    }, []);

    const getProdData = () => {
        Axios.get(API_URL + "/products")
        .then((res)=>{
            console.log(res.data);
            setDatabaseProd(res.data);
        }).catch((err) => {
            console.log(err)
        })
    };

    const getData = () => {
        let onUser = localStorage.getItem("eshopLog")
        Axios.get(API_URL + `/users/${onUser}`)
        .then((res) => {
            setDataCart(res.data.cart);
            
            let total = 0;
            res.data.cart.forEach((val, idx) => {
                total += (val.price * val.quantity);
            });
            setTotalCart(total);
        }).catch((err) => {
            console.log(err)
        })
    };

    const removeItem = (value) => {
        let userId = localStorage.getItem("eshopLog");
        let temp = [...dataCart];
        let index = temp.findIndex(val => val.idProduct == value);

        temp.splice(index, 1);

        Axios.patch(API_URL + `/users/${userId}`, {cart: temp})
        .then((res) => {
            dispatch(updateCartAction(res.data.cart));
            getData();
            }).catch((err) => {
            console.log(err);
        });
        
    };

    const btnInc = (value) => {
        let userId = localStorage.getItem("eshopLog");
        let temp = [...dataCart];
        let index = temp.findIndex(val => val.idProduct == value);
        let findStock = databaseProd.findIndex(val => val.id == value);
        
        if (temp[index].quantity >= 1 && temp[index].quantity < databaseProd[findStock].stock){
            temp[index].quantity += 1;
        } else if (temp[index].quantity == databaseProd[findStock].stock){
            alert("You Hit Maximum Available Stock");
        }

        Axios.patch(API_URL + `/users/${userId}`, {cart: temp})
        .then((res) => {
            // console.log("sesudah", res.data.cart[index].quantity)
            getData();
        }).catch((err) => {
            console.log(err)
        });
    };

    const btnDec = (value) => {
        let userId = localStorage.getItem("eshopLog");
        let temp = [...dataCart];
        let index = temp.findIndex(val => val.idProduct == value);

        if(temp[index].quantity > 1){
            temp[index].quantity -= 1;
        };

        Axios.patch(API_URL + `/users/${userId}`, {cart: temp})
        .then((res) => {
            // console.log("sesudah", res.data.cart[index].quantity)
            getData();
        }).catch((err) => {
            console.log(err)
        });
    };

    const btnCheckout = () => {
        if (shipping != 0){
            let temp = [...dataCart];
            let shipment = parseInt(shipping);
    
            // console.log("ini payment", payment)
            let genRandomNum = Math.floor(100000 + Math.random() * 900000);
    
            let input = {
                id: genRandomNum,
                username: name,
                totalCart,
                shipment,
                cart: temp,
            };
    
            dispatch(checkoutAction(input))
            navigate("/checkout")
        } else {
            alert("You Have Not Selected Shipping")
        }
    };

    const printCart = () => {
        return dataCart.map((val, idx) => {
            return (
                <tbody key={val.idProduct}>
                    <tr className='row m-0 my-1'>
                        <td className='col-5 text-center'>
                            <div className='row'>
                                <div className='col-6'>
                                    <img src={val.images}/>
                                </div>
                                <div className='col-6 p-1'>
                                    <div className='h-75'>
                                        <Text className='fw-bold text-start' style={{textTransform: "capitalize"}}>{val.name}</Text>
                                        <Text className='text-start'>Brand: <a style={{textTransform: "uppercase"}}>{val.brand}</a></Text>
                                        <Text className='text-start'>Category: <a style={{textTransform: "uppercase"}}>{val.category}</a></Text>
                                    </div>
                                    <div className='h-25 d-flex'>
                                        <button type="button" className='btn btn-outline-danger'
                                        onClick={() => removeItem(val.idProduct)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className='col-2 text-center d-flex align-items-center'>
                            <div className="border-2 rounded-3 row m-0 w-100">
                                <button type="button" className="btn col-3 fw-bold fs-5 p-1" onClick={() => btnDec(val.idProduct)}>-</button>
                                <Text className="col-6 d-flex align-items-center justify-content-center">{val.quantity}</Text>
                                <button type="button" className="btn col-3 fw-bold fs-5 p-1" onClick={() => btnInc(val.idProduct)}>+</button>
                            </div>
                        </td>
                        <td className='col-2 fw-bold d-flex align-items-center justify-content-center'>
                            <a>Rp. {val.price.toLocaleString("id")}</a>
                        </td>
                        <td className='col-3 fw-bold d-flex align-items-center justify-content-center'>
                            <a>Rp. {(val.price * val.quantity).toLocaleString("id")}</a>
                        </td>
                    </tr>
                </tbody>
            )
        })
    };


    return (
    <div className="container py-5">
        {/*HEADER*/}
        <div className="row mt-3">
            <div className="col-12 col-md-9">
                <Text fontSize="4xl" style={{fontWeight: "500"}}>Your Shopping Cart</Text>
                <div className="d-flex">
                    <span style={{color: "#a1a1a1"}}>Prepare your product so that customer can
                        <span className="fw-bold" style={{color: "#0b5fda"}}> transact more easily</span>
                    </span>
                </div>
            </div>
        </div>
        {/*CONTENT*/}
        <div className="row my-4">
            {/*LEFT SIDE*/}
            <div className="col-9">
                <table className='w-100'>
                    <thead style={{borderBottom: "2px solid black"}}>
                        <tr className='row m-0'>
                            <th className='col-5 text-center'>PRODUCT DETAILS</th>
                            <th className='col-2 text-center'>QUANTITY</th>
                            <th className='col-2 text-center'>PRICE</th>
                            <th className='col-3 text-center'>TOTAL</th>
                        </tr>
                    </thead>
                    {printCart()}
                </table>
            </div>
            {/*RIGHT SIDE*/}
            <div className="border col-3 p-2">
                <div className="border-2 rounded-3 p-2">
                    <div className="fw-bold" style={{color: "#0b5fda"}}>
                        Items: {dataCart.length}
                    </div>
                    <div className="fw-bold fs-5">
                        Rp. {totalCart.toLocaleString("id")}
                    </div>
                    <div>
                    <div className='my-2'>
                        <select className='p-2 border-2' onChange={(e) => setShipping(e.target.value)}>
                            <option value="0">Select Shipping</option>
                            <option value="50000">Standard Delivery Rp. 50.000</option>
                            <option value="250000">Fast Delivery Rp. 250.000</option>
                        </select>
                    </div>
                    </div>
                    <div className="fw-bold" style={{color: "#0b5fda"}}>
                        TOTAL:
                    </div>
                    <div className="fw-bold fs-5">
                        Rp. {(totalCart + parseInt(shipping)).toLocaleString("id")}
                    </div>
                    <div className="mt-3">
                        <Button type="button" className="fw-bold" colorScheme="purple"
                        onClick={() => btnCheckout()}>Process to Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default UserCart;
