import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { isOpen: false },
  reducers: {
    openCart: (state) => { state.isOpen = true; },
    closeCart: (state) => { state.isOpen = false; },
    // toggleCart: (state) => { state.isOpen = !state.isOpen; },
  },
});

export const { openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;