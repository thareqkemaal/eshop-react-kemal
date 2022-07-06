import React from "react";
import { Text } from '@chakra-ui/react';
import Axios from 'axios';
import { API_URL } from '../helper.js';

const ProductPage = (props) => {

    React.useEffect(() => {
        getData();
      }, []);

    const getData = () => {
        Axios.get(API_URL + "/products")
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
    <div>
        TES
    </div>
    )
};

export default ProductPage;