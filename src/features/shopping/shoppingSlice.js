import { createSlice } from "@reduxjs/toolkit";

const shoppingSlice = createSlice({
    name: 'shopping',
    initialState: {
        shoppingList: [],
        wishList: [],
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.shoppingList.find(e => e.id === action.payload.id);
            (item) ? item.quantity+=1 : state.shoppingList.push({...action.payload, 'quantity': 1});
        },
        removeFromCart: (state, action) => {
            state.shoppingList = state.shoppingList.filter(e => e.id !== action.payload);
        },
        addToWishList: (state, action) => {
            const item = state.wishList.find(e => e.id === action.payload.id);
            if (!item) {
                state.wishList.push(action.payload);
            } else {
                state.wishList = state.wishList.filter(e => e.id !== item.id)
            }
        },
        addQuantity: (state, action) => {
            const item = state.shoppingList.find(e => e.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        minusQuantity: (state, action) => {
            const item = state.shoppingList.find(e => e.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        setTotal: (state) => {
            const totalPrice = state.shoppingList.reduce((acc, e) => acc + (e.price * e.quantity), 0);
            state.total = Number(totalPrice.toFixed(2))
        },
    }
})

export default shoppingSlice.reducer;
export const { addToCart, removeFromCart, addToWishList, addQuantity, minusQuantity, setTotal } = shoppingSlice.actions;