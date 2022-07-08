const INITIAL_STATE = { // mirip react this.State
    id: "",
    username: "",
    email: "",
    role: "",
    status: ""
};

export const userReducer = (state = INITIAL_STATE, action) => {
    console.log("Data Action", action)
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {...state, ...action.payload};
        // case "UPDATE_SUCCESS":
        //     return {...state, update: action.payload};
        case "LOGOUT_SUCCESS":
            return INITIAL_STATE;
        default:
            return state;
    }
}