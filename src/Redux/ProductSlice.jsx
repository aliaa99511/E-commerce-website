import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: {
        data: [],
        loading: false
    },
    categories: {
        data: [],
        loading: false
    },
    error: null,
};

export const fetchAllProducts = createAsyncThunk('product/getProducts', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchAllCategories = createAsyncThunk('product/getCategories', async (_, { rejectWithValue }) => {
    try {

        let data = axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        return data;
    } catch (error) {
        console.error("fetch Categories Error:", error)
        return rejectWithValue(error.response.data);
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.products.loading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.products.data = action.payload;
                state.products.loading = false;
                state.error = null;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.products.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllCategories.pending, (state) => {
                state.categories.loading = true
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.categories.data = action.payload.data.data
                state.categories.loading = false
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.error = action.payload
            })
    },
});

export const productReducer = productSlice.reducer;
