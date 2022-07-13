import React from "react";
import { Text } from '@chakra-ui/react';
import Axios from 'axios';
import { API_URL } from '../helper.js';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const UserDisplayProduct = (props) => {
    const [database, setDatabase] = React.useState([]);
    const [filterData, setFilterData] = React.useState({
        brand: "",
        category: "",
    });
    const [filterName, setFilterName] = React.useState("");
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState(0);

    const navigate = useNavigate();

    React.useEffect(() => {
        getData();
      }, []);

      const getData = () => {
        Axios.get(API_URL + "/products")
        .then((response) => {
            setDatabase(response.data);
        }).catch((error) => {
            console.log(error);
        })
    };

    const printCard = () => {
        return database.map((val, idx) => {
            return (
            <div key={val.id} className="card col-12 col-sm-6 col-lg-4 p-2 mb-5 border-0" onClick={() => navigate(`/products/detail/${val.id}`)}> 
            {/** cara 1 di onClick bisa pake navigate("products/detail", {state: val}) */}
                <div className="d-flex align-items-center justify-content-center">
                    <img src={val.image}/>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <span className="border-0 rounded-3 bg-primary text-white" style={{position: "absolute"}}>
                        <div className="px-5 px-md-4 px-xl-5 py-2 mx-3 d-flex flex-column justify-content-center align-items-center">
                            <div className="fw-bold">Rp. {val.price.toLocaleString()}</div>
                            <div>{val.name.toUpperCase()}</div>
                        </div>
                    </span>
                </div>
            </div>
            )
        })
    };

    const btnFilter = () => {
        let query = [];

        for (let prop in filterData){
            if (filterData[prop]){
                query.push(`${prop}=${filterData[prop]}`)
            }
        };
        
        for (let props in database){
            if (database[props].name.includes(filterName)){
                query.push(`name=${database[props].name}`)
            };
        };

        for (let props in database){
            if (database[props].price >= minPrice && database[props].price <= maxPrice){
                query.push(`price=${database[props].price}`)
            };
        };
        console.log("before", query);
        // console.log("after", query.join("&"));

        Axios.get(API_URL + `/products?`+ query.join("&"))
        .then((response) => {
            console.log(response.data);
            setDatabase(response.data)
        }).catch((error) => {
            console.log(error)
        })
    };

    const btnReset = () => {
        Axios.get(API_URL + "/products")
        .then((response) => {
            setDatabase(response.data);
            setFilterName("");
            setFilterData({brand: "", category: ""});
        }).catch((error) => {
            console.log(error);
        })
    }
    

return (
    <div className="container py-5">
        {/*HEADER*/}
        <div className="row">
            <div className="col-12 col-md-9 mt-4">
                <Text fontSize="4xl" style={{fontWeight: "500"}}>Our Arrival Products</Text>
                <div className="d-flex">
                    <span style={{color: "#a1a1a1"}}>Prepare your product so that customer can
                        <span className="fw-bold" style={{color: "#0b5fda"}}> transact more easily</span>
                    </span>
                </div>
            </div>
        </div>
        <div aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#" onClick={() => navigate("/")}>Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Products</li>
            </ol>
        </div>
        <div className="row mt-3">
            {/*FILTER*/}
            <div className="col-12 col-md-4 col-lg-3 p-3 border-0 rounded-3 h-25 bg-primary">
                <div>
                    <span className="fw-bold fs-5 text-white">Filter</span>
                </div>
                <div className="my-2">
                    <input className="form-control" placeholder="Product Name"
                        onChange={(e) => setFilterName(e.target.value)} value={filterName}></input>
                    <select className="form-select my-2" value={filterData.brand}
                        onChange={(e) => setFilterData({...filterData, brand: e.target.value})}>
                        <option value="">Select Brand</option>
                        <option value="ikea">IKEA</option>
                        <option value="ace">ACE</option>
                        <option value="informa">INFORMA</option>
                    </select>
                    <select className="form-select my-2" value={filterData.category}
                        onChange={(e) => setFilterData({...filterData, category: e.target.value})}>
                        <option value="">Select Category</option>
                        <option value="livingroom">Livingroom</option>
                        <option value="bedroom">Bedroom</option>
                        <option value="kitchen">Kitchen</option>
                    </select>
                    <div className="d-flex">
                        <input className="form-control me-1" placeholder="Min. Price" 
                        onChange={(e) => setMinPrice(e.target.value)}></input>
                        <input className="form-control ms-1" placeholder="Max. Price" 
                        onChange={(e) => setMaxPrice(e.target.value)}></input>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-evenly">
                    <Button colorScheme="teal" onClick={btnFilter}>Filter</Button>
                    <Button colorScheme="yellow" onClick={btnReset}>Reset</Button>
                </div>
            </div>
            {/*CONTENT*/}
            <div className="col-12 col-md-8 col-lg-9">
                <div className="row m-0">
                    {printCard()}
                </div>
            </div>
        </div>
    </div>
    )
};

export default UserDisplayProduct;