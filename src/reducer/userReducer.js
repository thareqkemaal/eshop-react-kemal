const INITIAL_STATE = { // mirip react this.State
    id: "",
    username: "",
    email: "",
    role: "",
    status: "",
    cart: [],
    invoice:[]
};

export const userReducer = (state = INITIAL_STATE, action) => {
    console.log("Data Action", action)
    switch (action.type) {
        case "LOGIN_SUCCESS":
            delete action.payload.password; // menghapus data password dari payload
            return {...state, ...action.payload};
        case "UPDATE_CART":
            return {...state, cart: action.payload};
        // case "UPDATE_SUCCESS":
        //     return {...state, update: action.payload};
        case "LOGOUT_SUCCESS":
            return INITIAL_STATE;
        default:
            return state;
    }
}