const INITIAL_STATE = { // mirip react this.State
    id: 0,
    userId: 0,
    username: "",
    totalCart: 0,
    shipment: 0,
    cart: [],
    address: "",
    inputCash: 0,
    change: 0,
    date: "",
    datems: 0
};

export const productReducer = (state = INITIAL_STATE, action) => {
    // console.log("ini payload address", action.payload)
    switch (action.type) {
        case "CHECKOUT_SUCCESS": // menghapus data password dari payload
            return {...state, ...action.payload};
        case "PAYMENT_SUCCESS":
            return {...state, ...action.payload};
        case "USERPAY_SUCCESS":
            return INITIAL_STATE;
        default:
            return state;
    };
    
};