import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";

export const rootStore = configureStore({
  // properti reducer harus ada untuk mengelompokkan file file reducer;
  reducer: {
    userReducer,
    productReducer
  },
});
