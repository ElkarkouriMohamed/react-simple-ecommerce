import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name: 'shopping',
    initialState: {
        loading: [],
    },
    reducers: {
        finishLoading: (state, action) => {
            const id = action.payload;
            state.loading = state.loading.map(e => e.id === id ? { ...e, loading: false } : e)
        }
    },
    extraReducers: (builder) => {
        builder.addCase("product/fetchProducts/fulfilled", (state, action) => {
            const products = action.payload;
            state.loading.push(...products.map((e) => ({ 'id': e.id, 'loading': true })));
        })
    }
})

export default imageSlice.reducer;
export const { finishLoading } = imageSlice.actions;