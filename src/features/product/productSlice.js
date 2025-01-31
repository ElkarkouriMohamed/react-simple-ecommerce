import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 2000,
})

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, {rejectWithValue, getState, dispatch}) => {
    const { page, hasMore } = getState().product;
    if (!hasMore) {
        return rejectWithValue('you got all products!');
    };

    try {
        const response = await api.get(`/products?limit=20&skip=${page * 20}`);
        const data = response.data.products.map(e => ({...e, 'wishList': false}));
        return data;
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        products: [],
        errors: '',
        page: 0,
        hasMore: true,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.length === 0) {
                state.hasMore = false;
            } else {
                state.products = [...state.products, ...action.payload];
                state.errors = '';
                state.page += 1;
            }
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
    }
})

export default productSlice.reducer;
export const productActions = productSlice.actions;