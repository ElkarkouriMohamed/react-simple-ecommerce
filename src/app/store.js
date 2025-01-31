import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import shoppingReducer from "../features/shopping/shoppingSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        shopping: shoppingReducer,
        cart: cartReducer,
    }
})

export default store;