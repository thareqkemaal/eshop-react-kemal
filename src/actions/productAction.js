export const checkoutAction = (data) => {
    // console.log("Data dari page Login", data)
    return {
        type: "CHECKOUT_SUCCESS",
        payload: data
    }
};

export const paymentAction = (data) => {
    // console.log("Data payment", data)
    return {
        type: "PAYMENT_SUCCESS",
        payload: data
    }
};

export const userPayAction = () => {
    // console.log("Data payment", data)
    return {
        type: "USERPAY_SUCCESS",
    }
};