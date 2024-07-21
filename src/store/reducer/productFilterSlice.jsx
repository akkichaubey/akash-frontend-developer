import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching products by area
export const fetchProductByArea = createAsyncThunk(
    'products/fetchByArea',
    async (area) => {
        const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        console.log(res.data);
        return res.data;
    }
);

// Thunk for fetching products by category
export const fetchProductsByCategories = createAsyncThunk(
    'products/fetchByCategories',
    async (category) => {
        const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        return res.data;
    }
);

// Create the product filter slice
const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductByArea.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductByArea.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.meals || [];
            })
            .addCase(fetchProductByArea.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductsByCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.meals || [];
            })
            .addCase(fetchProductsByCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productFilterSlice.reducer;
