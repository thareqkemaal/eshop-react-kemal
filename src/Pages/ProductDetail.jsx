import Axios from "axios";
import React from "react";
import { useParams } from 'react-router-dom';
import { API_URL } from "../helper";
import { Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react'
import { updateCartAction } from '../actions/userAction';
{/**cara 1 pake state => import { useLocation } from 'react-router-dom' */}


const ProductDetail = (props) => {

    {/** cara 1 pakai state 
    const { state } = useLocation();

    nanti tinggal dipanggil seperti ini:

    {state.name} dsb*/}

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
    // data product
    const { id } = useParams();
    const { name, description, brand, category, stock, price, image } = product;
    
    // data user
    const { cart, userId } = useSelector(({userReducer}) => {
        return {
            cart: userReducer.cart,
            userId: userReducer.id
        }
    });
    
    const [note, setNote] = React.useState("");
    const [counter, setCounter] = React.useState(0);
    const [subTotal, setSubtotal] = React.useState(0);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    
    React.useEffect(() => {
        product_detail()
    }, []);

    const product_detail = () => {
        Axios.get(API_URL + `/products?id=${id}`)
        .then((response) => {
            setProduct(response.data[0]);
            setSubtotal(response.data[0].price);
            setCounter(1)
        }).catch((error) => {
            console.log(error)
        })
    };

    const btnInc = () => {
        if (counter < stock) {
            let count = counter + 1;
            setCounter(count);
            let sub = count * price;
            setSubtotal(sub);
        }
    };

    const btnDec = () => {
        if (counter > 1){
            let count = counter - 1;
            setCounter(count);
            let sub = count * price;
            setSubtotal(sub);
        };
        
    };

    const btnCart = () => { 
        //ALGORITMA
        let temp = [...cart];
        // 1. memeriksa apakah produk sudah ada di dalam keranjang
        let index = temp.findIndex(val => val.idProduct == id)
        
        if (index >= 0){
            let add = temp[index].quantity + counter;
            
            temp.splice(index, 1, {
                idProduct: id,
                images: image,
                name: name,
                brand: brand,
                category: category,
                price: price,
                quantity: add
            })

        } else {
            // 2. menambahkan data produk ke dalam data keranjang sebelumnya
            temp.push({
                idProduct: id,
                images: image,
                name: name,
                brand: brand,
                category: category,
                price: price,
                quantity: counter
            });
        }
        // 3. melakukan update data ke db.json
        Axios.patch(API_URL + `/users/${userId}`, {cart: temp})
        .then((res) => {
            console.log(res.data)
            // 4. melakukan update data ke reducer
                // buat case baru di userreducer lalu buat function baru di useraction
            dispatch(updateCartAction(res.data.cart))
            // 5. redirect ke cart page
        }).catch((err) => {
            console.log(err)
        });
        
        navigate('/cart')

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
                        <Button type="button" className="fw-bold" colorScheme="green" onClick={() => btnCart()}>+ Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default ProductDetail;