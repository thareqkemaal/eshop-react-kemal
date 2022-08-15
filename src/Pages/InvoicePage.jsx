import React from "react";
import Axios from 'axios';
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text, Button } from '@chakra-ui/react';

const Invoice = (props) => {
    const [data, setData] = React.useState([]);
    const [dataCart, setDataCart] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let user = localStorage.getItem("eshopLog")
        Axios.get(API_URL + `/users/${user}`)
        .then((res) => {
            console.log(res.data.invoice);
            console.log(res.data.invoice[0].cart);
            setData(res.data.invoice);
            setDataCart(res.data.invoice[0].cart);
            // setData(res.data.invoice);
            // setDataCart(res.data[0].cart);
        }).catch((err) => {
            console.log(err)
        })
    };

    const printRight = () => {
        return data.map((val, idx) => {
            return (
            <div className="col-6" key={val.id}>
                <div className="fw-bold">For :</div>
                <div>Buyer : <span className="fw-bold" style={{textTransform: "uppercase"}}>{val.username}</span></div>
                <div>Purchase Date : <span className="fw-bold">{val.date}</span></div>
                <div>Delivery Address : <span className="fw-bold">{val.address}</span></div>
            </div>
            )
        })
    };

    const invCode = () => {
        return data.map((val, idx) => {
            return (
                <span className="fw-bold" style={{color: "#0b5fda"}} key={val.id}>INV/{val.datems}/MPL/{val.id}</span>
            )
        })
    };

    const printBottom = () => {
        return dataCart.map((val, idx) => {
            return (
            <tbody key={val.idProduct}>
                <tr className="row m-0 py-1">
                    <td className="col-5 text-start">
                        <div className="row">
                            <div className="col-3">
                                <img src={val.images}/>
                            </div>
                            <div className="col-9">
                                <span className="fw-bold" style={{color: "#0b5fda", textTransform: "uppercase"}}>{val.name}</span><br/>
                                <span style={{textTransform: "uppercase"}}>Brand: {val.brand}</span><br/>
                                <span style={{textTransform: "uppercase"}}>Category: {val.category}</span>
                            </div>
                        </div>
                    </td>
                    <td className="col-1 text-center">
                        <span className="fw-bold">{val.quantity}</span>
                    </td>
                    <td className="col-3 text-center">
                        <span className="fw-bold">Rp. {val.price.toLocaleString("id")}</span>
                    </td>
                    <td className="col-3 text-center">
                        <span className="fw-bold">Rp. {(val.price * val.quantity).toLocaleString("id")}</span>
                    </td>
                </tr>
            </tbody>
            )
        })
    };

    const uBottom = () => {
        return data.map((val, idx) => {
            return (
            <div className="row mx-5 border-bottom border-dark" key={val.id}>
                <div className="col-6"></div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <span className="fw-bold">Total ({data.length} Item(s))</span><br/>
                            <span>Shipping</span><br/>
                            <span className="fw-bold">Total Bill</span><br/>
                            <span className="fw-bold">Payment: Cash</span><br/>
                            <span>Payment: Change</span>
                        </div>
                        <div className="col-6 text-end">
                            <span className="fw-bold">Rp. {val.totalCart.toLocaleString("id")}</span><br/>
                            <span>Rp. {val.shipment.toLocaleString("id")}</span><br/>
                            <span className="fw-bold">Rp. {(val.shipment + val.totalCart).toLocaleString("id")}</span><br/>
                            <span className="fw-bold">Rp. {val.inputCash.toLocaleString("id")}</span><br/>
                            <span>Rp. {val.change.toLocaleString("id")}</span>
                        </div>
                    </div>
                </div>
            </div>
            )
        })
    };


    return (
    <div className="container py-5">
        {/*HEADER*/}
        <div className="row my-3 mx-5">
            <div className="col-12 col-md-7">
                <Text fontSize="4xl" style={{fontWeight: "500", color: "#0b5fda"}} >E-SHOP <span className="text-dark">| Furniture</span></Text>
                <div className="d-flex">
                    <span className="fw-bold" style={{color: "#0b5fda"}}>Thank you
                        <span className="fw-normal" style={{color: "#a1a1a1"}}> for your purchase</span>
                    </span>
                </div>
            </div>
            <div className="col-12 col-md-5 text-end">
                <span className="fw-bold fs-5">INVOICE</span><br/>
                {invCode()}
            </div>
        </div>
        {/*TOP CONTENT*/}
        <div className="row mt-2 mx-5">
            {/*TOP-LEFT CONTENT*/}
            <div className="col-6">
                <div className="fw-bold">Published by :</div>
                <div>Seller : <span className="fw-bold">Eshop | Furniture</span></div>
            </div>
            {/*TOP-RIGHT CONTENT*/}
            {printRight()}
        </div>
        {/*BOTTOM CONTENT*/}
        <div className="row mt-2 mx-5">
            <table className="border-bottom border-dark">
                <thead>
                    <tr className="row m-0 py-1 border-top border-bottom border-dark">
                        <th className="col-5 text-center">PRODUCT INFO</th>
                        <th className="col-1 text-center">QTY</th>
                        <th className="col-3 text-center">PRICE PER PCS</th>
                        <th className="col-3 text-center">TOTAL PRICE</th>
                    </tr>
                </thead>
                {printBottom()}
            </table>
        </div>
        {/*UNDER BOTTOM CONTENT*/}
        {uBottom()}
    </div>
    )
};

export default Invoice;