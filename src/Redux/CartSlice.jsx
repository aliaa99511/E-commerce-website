import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    cartItems: {
        data: [],
        totalPrice: 0,
        numOfCartItems: 0,
        loading: false,
        error: null,
    },
    // numOfCartItems: {
    //     data: 0,
    //     loading: false
    // },
};

let headers = {
    token: localStorage.getItem('token') || ""
};

export const fetchShoppingCart = createAsyncThunk('cartItems/getShoppingCartItems', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers });
        return data;
    } catch (error) {
        console.error('fetch Shopping Cart Error:', error.response.data);
        return rejectWithValue(error.response.data);
    }
});

export const removeCartItem = createAsyncThunk(
    'cartItems/removeCartItem',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers });
            return data;
        } catch (error) {
            console.error('Remove CartItem Error:', error.response.data);
            return rejectWithValue(error.response.data);
        }
    });

export const updateCartProductQuantity = createAsyncThunk(
    'cartItems/updateCartQuantity',
    async ({ id, count }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers });
            return data;
        } catch (error) {
            console.error("Update Cart Quantity Error:", error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
);


let cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchShoppingCart
            .addCase(fetchShoppingCart.pending, (state) => {
                state.cartItems.loading = true;
            })
            .addCase(fetchShoppingCart.fulfilled, (state, action) => {
                state.cartItems.data = action.payload.data.products || [];
                state.cartItems.totalPrice = action.payload.data.totalCartPrice || 0;
                state.cartItems.numOfCartItems = action.payload.numOfCartItems;
                state.cartItems.loading = false;
                state.cartItems.error = null;
            })
            .addCase(fetchShoppingCart.rejected, (state, action) => {
                state.cartItems.loading = false;
                state.cartItems.error = action.payload;
            })

            //removeCartItem
            .addCase(removeCartItem.pending, (state) => {
                state.cartItems.loading = true;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.cartItems.data = action.payload.data.products || [];
                state.cartItems.totalPrice = action.payload.data.totalCartPrice || 0;
                state.cartItems.numOfCartItems = action.payload.numOfCartItems;
                state.cartItems.loading = false;
                state.cartItems.error = null;
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.cartItems.loading = false;
                state.cartItems.error = action.payload;
            })

            // updateCartProductQuantity
            .addCase(updateCartProductQuantity.pending, (state) => {
                state.cartItems.loading = true;
            })
            .addCase(updateCartProductQuantity.fulfilled, (state, action) => {
                state.cartItems.data = action.payload.data.products || [];
                state.cartItems.totalPrice = action.payload.data.totalCartPrice || 0;
                state.cartItems.loading = false;
                state.cartItems.error = null;
            })
            .addCase(updateCartProductQuantity.rejected, (state, action) => {
                state.cartItems.loading = false;
                state.cartItems.error = action.payload;
            })
    }
});

export const cartReducer = cartSlice.reducer;
