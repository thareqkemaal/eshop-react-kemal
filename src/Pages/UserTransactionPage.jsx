import React from 'react';
import Axios from 'axios';
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text, Button } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  import { useDisclosure } from '@chakra-ui/react';


const UserTransactionPage = (props) => {
    const [checkoutData, setCheckoutData] = React.useState([]);
    const [scrollBehavior, setScrollBehavior] = React.useState('inside');
    const [toggle, setToggle] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);
    const { onClose } = useDisclosure()


    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        Axios.get(API_URL + "/checkoutHistory")
        .then((res) => {
            setCheckoutData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    };

    const printCheckout = () => {
        return checkoutData.map((val, idx) => {
            return (
            <div key={val.id} className="border-3 rounded-3 my-3 mx-5 p-2">
                <div className='row m-0 p-1'>
                    <div className='col-2 fw-bold text-center'>Shopping</div>
                    <div className='col-2 text-center'>{val.date}</div>
                    <div className='col-2 text-center'><span className={ val.status == "PAID" ? 
                        'px-3 border rounded-3 bg-success fw-bold text-white' 
                        : 
                        'px-3 border rounded-3 bg-danger fw-bold text-white'}>
                        {val.status}</span>
                        </div>
                    <div className='col-4 text-muted'>{val.invCode}{val.id}</div>
                </div>
                <div className='row m-0 p-1'> 
                    <div className='col-2'>
                        <img src={val.cart[0].images} />
                    </div>
                    <div className='col-7'>
                        <div>
                            <span className='fw-bold' style={{textTransform: "uppercase"}}>{val.cart[0].name}</span>
                        </div>
                        <div>
                            <span>{val.cart[0].quantity} Item(s) x Rp. {val.cart[0].price.toLocaleString("id")}</span>
                        </div>
                        <div className='mt-2'>
                            <span>{ val.cart.length == 1 ? 
                            "" 
                            :
                             `With +${val.cart.length-1} Other Product(s)`}</span>
                        </div>
                    </div>
                    <div className='border-start col-3'>
                        <div>
                            <span className='text-muted'>Total Transaction</span>
                        </div>
                        <div>
                            <span className='fw-bold'>Rp. {(val.totalCart + val.shipment).toLocaleString("id")}</span>
                        </div>
                    </div>
                </div>
                <div className='row m-0 p-1 align-items-center'>
                    <div className='col-6'></div>
                    <div className='col-3 text-center'>
                        <a href="#" className='fw-bold' style={{color: "#0b5fda"}} onClick={() => {setToggle(!toggle); setSelectedData(val)}}>See Detail Transaction</a>
                    </div>
                    {
                        selectedData ? 
                            <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size="3xl">
                                <ModalOverlay/>
                                <ModalContent>
                                    <ModalHeader className='text-center fw-bold fs-4'>
                                        Transaction Detail
                                    </ModalHeader>
                                    <ModalBody className='row m-0 my-3'>
                                        <div scrollbehavior={scrollBehavior} className='col-8'>
                                            <div className='row'>
                                                <div className='text-start'>
                                                    <span className='px-3 border rounded-3 bg-danger fw-bold text-white'>{selectedData.status}</span>
                                                </div>
                                                <div className='d-flex justify-content-between my-3'>
                                                    <span>No. Invoice</span>
                                                    <span className='fw-bold' style={{color: "#0b5fda"}}>{selectedData.invCode}{selectedData.id}</span>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <span>Purchase Date</span>
                                                    <span>{selectedData.date}</span>
                                                </div>
                                            </div>
                                            <div className='mt-3 mb-2'>
                                                <div>
                                                    <span className='fw-bold'>Product Detail</span>
                                                </div>
                                                <div className='border rounded-3 row m-0'>
                                                    <div className='col-3'>
                                                        <img src={selectedData.cart[0].images}/>
                                                    </div>
                                                    <div className='col-5'>
                                                        <div>
                                                            <span className='fw-bold' style={{textTransform: "uppercase"}}>{selectedData.cart[0].name}</span>
                                                        </div>
                                                        <div>
                                                            <span>{selectedData.cart[0].quantity} Item(s) x Rp. {selectedData.cart[0].price.toLocaleString("id")}</span>
                                                        </div>
                                                    </div>
                                                    <div className='col-4'>
                                                        <div>
                                                            <span className='text-muted'>Price</span>
                                                        </div>
                                                        <div>
                                                            <span className='fw-bold'>Rp. {(selectedData.cart[0].price * selectedData.cart[0].quantity).toLocaleString("id")}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row m-0 border-top border-dark">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <span className="fw-bold">Total </span><br/>
                                                        <span>Shipping</span><br/>
                                                        <span className="fw-bold">Total Bill</span><br/>
                                                    </div>
                                                    <div className="col-6 text-end">
                                                        <span className="fw-bold">Rp. {selectedData.totalCart.toLocaleString("id")}</span><br/>
                                                        <span>Rp. {selectedData.shipment.toLocaleString("id")}</span><br/>
                                                        <span className="fw-bold">Rp. {(selectedData.totalCart + selectedData.shipment).toLocaleString("id")}</span><br/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-4 text-center'>
                                            <Button type="button" colorScheme="green" className='px-4 fw-bold mb-2'>Click to Pay</Button>
                                            <Button type="button" colorScheme="red" className='px-4' onClick={() => setToggle(!toggle)}>Cancel</Button>
                                        </div>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                            :
                            null
                    
                    }
                    <div className='col-3'>
                        <Button colorScheme="green" className='px-5'>Buy Again</Button>
                    </div>
                </div>
            </div>
            )
        })
    };

    return (
    <div className="container py-5">
        {/*HEADER*/}
        <div className="mt-3 mx-5">
            <div className="col-12 col-md-9">
                <Text fontSize="4xl" style={{fontWeight: "500"}}>Your Transaction List</Text>
                <div className="d-flex">
                    <span style={{color: "#a1a1a1"}}>Prepare your product so that customer can
                        <span className="fw-bold" style={{color: "#0b5fda"}}> transact more easily</span>
                    </span>
                </div>
            </div>
        </div>
        {/*CONTENT*/}
        {printCheckout()}
    </div>
    )
};

export default UserTransactionPage;