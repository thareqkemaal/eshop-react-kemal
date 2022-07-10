import Axios from "axios";
import React from "react";
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import { API_URL } from "../helper";
import { Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { useDispatch } from 'react-redux';


const ProductDetail = (props) => {
    const [product, setProduct] = React.useState({
        id: 0,
        name: "",
        description: "",
        brand: "",
        category: "",
        stock: 0,
        price: 0,
        image: ""
    });

    const [note, setNote] = React.useState("");
    const [counter, setCounter] = React.useState(0);
    const [subTotal, setSubtotal] = React.useState(0);
    
    const { id } = useParams();

    const { name, description, brand, category, stock, price, image } = product;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        product_detail()
    }, []);

    const product_detail = () => {
        Axios.get(API_URL + `/products?id=${id}`)
        .then((response) => {
            setProduct(response.data[0]);
        }).catch((error) => {
            console.log(error)
        })
    };

    const btnInc = () => {
        if (stock > 0) {
            let count = counter + 1;
            setCounter(count);
            let remain = parseInt(stock - 1);
            setProduct({...product, stock: remain});
            let sub = count * price;
            setSubtotal(sub);

        } else if (stock == 0){
            alert("Run of Out Stock")
        }
    };

    const btnDec = () => {
        if (counter != 0){
            let count = counter - 1;
            setCounter(count);
            let remain = stock + 1;
            setProduct({...product, stock: remain});
            let sub = count * price;
            setSubtotal(sub);
        };
        
    };

    const updateStock = () => {
        let account = localStorage.getItem("eshopLog");
        
        Axios.patch(API_URL + "/products/" + id, {stock: stock})
        .then((response) => {
            console.log("success update");
            setCounter(0);
        }).catch((error) => {
            console.log(error);
        });
    };

    const btnCart = () => {
        
    };
    
    return (
    <div className="container py-5">
        {/*HEADER*/}
        <div className="row">
            <div className="col-12 col-md-9 mt-4">
                <Text fontSize="4xl" style={{fontWeight: "500"}}>Product Detail</Text>
                <div className="d-flex">
                    <span style={{color: "#a1a1a1"}}>Prepare your product so that customer can
                        <span className="fw-bold" style={{color: "#0b5fda"}}> transact more easily</span>
                    </span>
                </div>
            </div>
        </div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#" onClick={() => navigate("/")}>Home</a></li>
                <li className="breadcrumb-item"><a href="#" onClick={() => navigate("/products")}>Products</a></li>
                <li className="breadcrumb-item active" aria-current="page" style={{textTransform: "capitalize"}}>{name}</li>
            </ol>
        </nav>
        {/*CONTENT*/}
        <div className="mt-3 row m-0">
            {/*LEFT IMAGE*/}
            <div className="col-12 col-md-4 p-2 d-flex justify-content-center">
                <img src={image}/>
            </div>
            {/*MIDDLE CONTENT*/}
            <div className="col-12 col-md-5 p-3">
                <div>
                    <Text className="fw-bold fs-3" style={{textTransform: "capitalize"}}>{name}</Text>
                </div>
                <div>
                    <Text className="fw-bold fs-2 my-3">Rp. {price.toLocaleString("id")}</Text>
                </div>
                <div>
                    <Text className="fw-bold fs-5">Detail</Text>
                    <div>
                        <Text>Condition: New</Text>
                        <Text>Category: <a style={{textTransform: "uppercase"}}>{category}</a></Text>
                    </div>
                        <Text>Product Brand: <a style={{textTransform: "uppercase"}}>{brand}</a></Text>
                        <Text >Product Description:</Text>
                        <Text className="ms-2" style={{textTransform: "capitalize"}}>{description}</Text>
                </div>
            </div>
            {/*RIGHT ACTION*/}
            <div className="col-12 col-md-3 p-2">
                <div className="border-2 rounded-3 p-2">
                    {/*SET AMOUNT*/}
                    <div className="fw-bold" style={{color: "#0b5fda"}}>
                        Set Amount:
                    </div>
                    <div className="border rounded-3 row m-0 w-50">
                        <button type="button" className="btn col-3 fw-bold fs-5 p-1" onClick={() => btnDec()}>-</button>
                        <Text className="col-6 d-flex align-items-center justify-content-center">{counter}</Text>
                        <button type="button" className="btn col-3 fw-bold fs-5 p-1" onClick={() => btnInc()}>+</button>
                    </div>
                    <div className="fw-bold" style={{color: "#0b5fda"}}>
                        Available Stock: <a>{stock}</a>
                    </div>
                    {/*SET NOTES*/}
                    <div className="my-3">
                        <div className="fw-bold" style={{color: "#0b5fda"}}>
                            Add your Notes:
                        </div>
                        <div>
                            <input type="text" className="p-2 border-2 rounded-2 w-75"
                                onChange={(e) => setNote(e.target.value)}></input>
                        </div>
                    </div>
                    {/*SET SUBTOTAL*/}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="fw-bold" style={{color: "#0b5fda"}}>
                            Subtotal
                        </div>
                        <div className="fw-bold fs-5">
                            Rp. {subTotal.toLocaleString("id")}
                        </div>
                    </div>
                    {/*ADD TO CART BUTTON*/}
                    <div className="mt-3">
                        <Button type="button" className="fw-bold" colorScheme="green" onClick={() => {updateStock(); btnCart()}}>+ Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default ProductDetail;