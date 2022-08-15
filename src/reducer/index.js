import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";
import reduxThunk from 'redux-thunk';


export const rootStore = configureStore({
  // properti reducer harus ada untuk mengelompokkan file file reducer;
  reducer: {
    userReducer,
    productReducer
  },
}, applyMiddleware(reduxThunk));
