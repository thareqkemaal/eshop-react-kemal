import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";

export const rootStore = configureStore({
  // properti reducer harus ada untuk mengelompokkan file file reducer;
  reducer: {
    userReducer,
  },
});
