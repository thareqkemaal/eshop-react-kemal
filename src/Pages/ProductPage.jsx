import React from "react";
import { Select, Text } from '@chakra-ui/react';
import Axios from 'axios';
import { API_URL } from '../helper.js';
import NavbarBlackComponent from '../Component/NavbarBlack';
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
            console.log(response.data);
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
                    title: `Product ${response.data.name} Created`,
                    status: "success",
                    duration: 5000,
                    isClosable: true
                });
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    const printData = () => {
        return database.map((val, idx) => {
            return (
                <div key={val.id}>
                    <tr className="row m-0 py-1">
                        <td className="col-1 d-flex align-items-center justify-content-center fw-bold">{idx + 1}</td>
                        <td className="col-2"><img src={val.image}/></td>
                        <td className="col-2 d-flex align-items-center justify-content-center fw-bold" style={{textTransform: "capitalize"}}>{val.name}</td>
                        <td className="col-1 d-flex align-items-center justify-content-center" style={{textTransform: "uppercase"}}>{val.brand}</td>
                        <td className="col-2 d-flex align-items-center justify-content-center" style={{textTransform: "capitalize"}}>{val.category}</td>
                        <td className="col-2 d-flex align-items-center justify-content-center">Rp. {val.price.toLocaleString("id")}</td>
                        <td className="col-2 d-flex align-items-center justify-content-evenly">
                            <Button colorScheme="yellow"><BsPencilSquare/></Button>
                            <Button colorScheme="red"><BsFillTrashFill/></Button>
                        </td>
                    </tr>
                </div>
            )
        })
    };

    return (
    <NavbarBlackComponent>
    <div className="container border">
        {/*HEADER*/}
        <div className="mt-5 d-flex">
            <div className="col-9 mt-4">
                <Text fontSize="4xl" style={{fontWeight: "500"}}>Manage Your Products</Text>
                <div className="d-flex">
                    <span style={{color: "#a1a1a1"}}>Prepare your product so that customer can
                        <span className="fw-bold" style={{color: "#0b5fda"}}> transact more easily</span>
                    </span>
                </div>
            </div>
            <div className="col-3 mt-4 d-flex align-items-end justify-content-center">
                <Button colorScheme="green" onClick={onOpen}><BsFillPlusCircleFill className="me-2"/>Add</Button>

                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Insert Your New Product</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Product Name</FormLabel>
                                <Input type="text" onChange={(e) => {setName(e.target.value)}}/>
                                <FormLabel>Description</FormLabel>
                                <Input type="text" onChange={(e) => {setDescription(e.target.value)}}/>
                                <FormLabel>Brand</FormLabel>
                                <Input type="text" onChange={(e) => {setBrand(e.target.value)}}/>
                                <FormLabel>Category</FormLabel>
                                {/* <Input type="text" onChange={(e) => {setCategory(e.target.value)}}/> */}
                                <Select placeholder="Select Category" onChange={(e) => {setCategory(e.target.value)}}>
                                    <option value="bedroom">Bedroom</option>
                                    <option value="kitchen">Kitchen</option>
                                    <option value="livingroom">Livingroom</option>
                                </Select>
                                <FormLabel>Stock</FormLabel>
                                <Input type="number" onChange={(e) => {setStock(e.target.value)}}/>
                                <FormLabel>Price (Rp.)</FormLabel>
                                <Input type="number" onChange={(e) => {setPrice(e.target.value)}}/>
                                <FormLabel>Product Image</FormLabel>
                                <Input type="text" onChange={(e) => {setImage(e.target.value)}}/>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="green" mr="3" onClick={() => {btnSubmit(); onClose()}}>Save</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
        {/*CONTENT*/}
        <div className="my-5">
            <table className="w-100">
                <thead>
                    <tr className="row m-0 py-1 fw-bold text-center" style={{borderBottom: "2px solid black"}}>
                        <td className="col-1">No.</td>
                        <td className="col-2">Preview</td>
                        <td className="col-2">Name</td>
                        <td className="col-1">Brand</td>
                        <td className="col-2">Category</td>
                        <td className="col-2">Price</td>
                        <td className="col-2">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {printData()}
                </tbody>
            </table>
        
        </div>
    </div> 
    </NavbarBlackComponent>
    )
};

export default ProductPage;