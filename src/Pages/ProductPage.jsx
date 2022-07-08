import React from "react";
import { ModalFocusScope, Select, Text, Textarea } from '@chakra-ui/react';
import Axios from 'axios';
import { API_URL } from '../helper.js';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react';
  import {
    Image,
    Top,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';
  import { BsFillPlusCircleFill } from "react-icons/bs";
  import { BsPencilSquare } from "react-icons/bs";
  import { BsFillTrashFill } from "react-icons/bs";
  import { Button, ButtonGroup } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'

const ProductPage = (props) => {
    const [database, setDatabase] = React.useState([]);
    const [dbLength, setLength] = React.useState(0);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [brand, setBrand] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [stock, setStock] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [image, setImage] = React.useState("");
    const [toggleDelete, setToggleDelete] = React.useState(false);
    const [toggle, setToggle] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);

    const [filterData, setFilterData] = React.useState({
        // name: "",
        brand: "",
        category: ""
    });
    const [filterName, setFilterName] = React.useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('md');
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
    const toast = useToast(); 

    React.useEffect(() => {
        getData();
      }, []);

    const getData = () => {
        Axios.get(API_URL + "/products")
        .then((response) => {
            setDatabase(response.data);
            setLength(response.data.length);
        }).catch((error) => {
            console.log(error);
        })
    };

    const btnSubmit = () => {
        let input = {
            id: dbLength + 1,
            name: name.toLowerCase(),
            description: description.toLowerCase(),
            brand: brand.toLowerCase(),
            category: category.toLowerCase(),
            stock: parseInt(stock),
            price: parseInt(price),
            image: image
        };

        Axios.post(API_URL + "/products", input)
        .then((response) => {
            console.log(response.data);
            if(response.data.id){
                getData();
                toast({
                    position: "top",
                    title: `Product ${response.data.name.toUpperCase()} Created`,
                    status: "success",
                    duration: 5000,
                    isClosable: true
                });
                setImage("")
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    const btnDelete = (value) => {
        Axios.delete(API_URL + "/products/" + value)
        .then((response) => {
                console.log("item deleted");
                getData();
                toast({
                    position: "top",
                    title: `Product Deleted`,
                    status: "warning",
                    duration: 5000,
                    isClosable: true
                });
                setSelectedData(null);
                setToggleDelete(!toggleDelete);
        }).catch((error) => {
            console.log(error);
        })
    }

    const printData = () => {
        return database.map((val, idx) => {
            return (
                    <tbody key={val.id}>
                        <tr className="row m-0 py-1">
                            <td className="d-none d-sm-block col-sm-1 d-sm-flex align-items-center justify-content-center fw-bold">{idx + 1}</td>
                            <td className="col-sm-2"><img src={val.image}/></td>
                            <td className="col-sm-2 d-flex align-items-center justify-content-center fw-bold">{val.name.toUpperCase()}</td>
                            <td className="col-sm-1 d-flex align-items-center justify-content-center">{val.brand.toUpperCase()}</td>
                            <td className="col-sm-2 d-flex align-items-center justify-content-center" style={{textTransform: "capitalize"}}>{val.category}</td>
                            <td className="col-sm-2 d-flex align-items-center justify-content-center">Rp. {val.price.toLocaleString("id")}</td>
                            <td className="col-sm-2 d-flex align-items-center justify-content-evenly">
                                <Button colorScheme="yellow"><BsPencilSquare/></Button>
                                <Button colorScheme="red" onClick={() => {
                                setSelectedData(val);
                                setToggleDelete(!toggleDelete)}}><BsFillTrashFill/></Button>
                            </td>
                        </tr>
                    </tbody>
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
    <div className="container-fluid container-lg py-5">
        {/*HEADER*/}
        <div className="row">
            <div className="col-12 col-md-9 mt-4">
                <Text fontSize="4xl" style={{fontWeight: "500"}}>Manage Your Products</Text>
                <div className="d-flex">
                    <span style={{color: "#a1a1a1"}}>Prepare your product so that customer can
                        <span className="fw-bold" style={{color: "#0b5fda"}}> transact more easily</span>
                    </span>
                </div>
            </div>
            <div className="col-12 col-md-3 mt-4 d-flex align-items-end justify-content-end justify-content-md-center">
                <Button colorScheme="green" onClick={onOpen}><BsFillPlusCircleFill className="me-2"/>Add</Button>

                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="4xl">
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Insert Your New Product</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <Image src={image} fallbackSrc='https://swiftmomentum.com/wp-content/uploads/2013/03/default-placeholder-1024x1024-500x500.png'/>
                                    <FormLabel>Product Preview</FormLabel>
                                    <Input type="text" onChange={(e) => {setImage(e.target.value)}} placeholder="Image URL"/>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <FormControl>
                                        <FormLabel>Product Name</FormLabel>
                                        <Input type="text" onChange={(e) => {setName(e.target.value)}}/>

                                        <FormLabel>Description</FormLabel>
                                        <Textarea type="" onChange={(e) => {setDescription(e.target.value)}}/>

                                        <FormLabel>Brand</FormLabel>
                                        <Input type="text" onChange={(e) => {setBrand(e.target.value)}}/>

                                        <FormLabel>Category</FormLabel>
                                        <Select placeholder="Select Category" onChange={(e) => {setCategory(e.target.value)}}>
                                            <option value="bedroom">Bedroom</option>
                                            <option value="kitchen">Kitchen</option>
                                            <option value="livingroom">Livingroom</option>
                                        </Select>

                                        <FormLabel>Stock</FormLabel>
                                        <Input type="number" onChange={(e) => {setStock(e.target.value)}}/>

                                        <FormLabel>Price (Rp.)</FormLabel>
                                        <Input type="number" onChange={(e) => {setPrice(e.target.value)}}/>
                                    </FormControl>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="green" mr="3" onClick={() => {btnSubmit(); onClose()}}>Save</Button>
                            <Button onClick={() => {setToggle(!toggle); setImage(""); onClose()}}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {
                    selectedData ? 
                        <Modal isOpen={toggleDelete} onClose={() => setToggleDelete(!toggleDelete)}>
                            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>Are you sure to delete <span className="fw-bold">{selectedData.name.toUpperCase()}</span> ?</ModalHeader>
                                <ModalFooter>
                                    <ButtonGroup>
                                        <Button type="button" variant="outline" colorScheme="yellow" 
                                        onClick={() => {setSelectedData(null); setToggleDelete(!toggleDelete)}}>No</Button>
                                        <Button type="button" variant="outline" colorScheme="green" 
                                            onClick={() => btnDelete(selectedData.id)} isOpen>Yes</Button>
                                    </ButtonGroup>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        : null
                }

            </div>
        </div>
        {/*FILTER*/}
        <div className="mt-4 row">
            <div className="col-12 row m-0 fw-bold" style={{color: "#a1a1a1"}}>FILTER</div>
            <div className="col-12 col-md-9 my-2">
                <div className="d-flex flex-column d-md-flex flex-md-row">
                    <div className="col-md-4">
                        <Input type="text" placeholder="Product Name" onChange={(e) => setFilterName(e.target.value)}
                            value={filterName}></Input>
                    </div>
                    <div className="col-md-4 mx-md-2">
                        <Select className="my-2 my-md-0" placeholder="Select Brand" value={filterData.brand}
                            onChange={(e) => setFilterData({...filterData, brand: e.target.value})} >
                            <option value="ikea">IKEA</option>
                            <option value="ace">ACE</option>
                            <option value="informa">INFORMA</option>
                        </Select>
                    </div>
                    <div className="col-md-4">
                        <Select placeholder="Select Category" value={filterData.category}
                            onChange={(e) => setFilterData({...filterData, category: e.target.value})}>
                            <option value="livingroom">Livingroom</option>
                            <option value="bedroom">Bedroom</option>
                            <option value="kitchen">Kitchen</option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3 my-2 d-flex align-items-end justify-content-evenly">
                    <Button type="button" colorScheme="teal" className="px-4" onClick={btnFilter}>Search</Button>
                    <Button type="button" colorScheme="blackAlpha" className="px-4" onClick={btnReset}>Reset</Button>
            </div>
        </div>
        {/*CONTENT*/}
        <div className="mb-5 mt-3">
            <table className="w-100">
                <thead>
                    <tr className="row m-0 py-1 fw-bold text-center" style={{borderBottom: "2px solid black"}}>
                        <td className="col-12 d-sm-none">Product List</td>
                        <td className="d-none d-sm-block col-sm-1">No.</td>
                        <td className="d-none d-sm-block col-sm-2">Preview</td>
                        <td className="d-none d-sm-block col-sm-2">Name</td>
                        <td className="d-none d-sm-block col-sm-1">Brand</td>
                        <td className="d-none d-sm-block col-sm-2">Category</td>
                        <td className="d-none d-sm-block col-sm-2">Price</td>
                        <td className="d-none d-sm-block col-sm-2">Action</td>
                    </tr>
                </thead>
                {printData()}
                
            </table>
        
        </div>
    </div>
    )
};

export default ProductPage;