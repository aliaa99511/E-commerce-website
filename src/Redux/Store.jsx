import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { productReducer } from "./ProductSlice";
import { cartReducer } from "./CartSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productReducer,
        cart: cartReducer,
    }
})