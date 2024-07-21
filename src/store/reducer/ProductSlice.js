import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching a single product
export const fetchSingleProduct = createAsyncThunk(
    'product/fetchSingleProduct',
    async (event) => {
        const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${event}`
        );
        return res.data; // Return the entire response data
    }
);

// Create the single product slice
const singleProductSlice = createSlice({
    name: 'productSingle',
    initialState: {
        product: null, // Use null for a single product instead of an array
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload.meals[0]; // Access the first item in the meals array
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default singleProductSlice.reducer;
