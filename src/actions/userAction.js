import axios from "axios";
import { API_URL } from "../helper";

export const loginAction = (data) => {
    // console.log("Data dari page Login", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
};

export const loginMiddleware = (email, password) => {
    return async(dispatch) => {
        try {
            let res = await axios.post(API_URL + `/auth/login`, {
                email, password
            });

            localStorage.setItem('eshopLog', res.data.token);
            delete res.data.token;
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data
            });
            return {success: true}
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCartAction = (cart) => {
    // console.log("Data dari page Login", data)
    return {
        type: "UPDATE_CART",
        payload: cart
    }
};

// kalau contoh logout tidak pake payload
export const logoutAction = () => {
    return {
        type: "LOGOUT_SUCCESS"
    }
};