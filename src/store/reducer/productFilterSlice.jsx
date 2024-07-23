import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching products by area with pagination
export const fetchProductByArea = createAsyncThunk(
    'products/fetchByArea',
    async ({ area, page }) => {
        const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        const paginatedMeals = res.data.meals.slice((page - 1) * 12, page * 12);
        return { meals: paginatedMeals, total: res.data.meals.length, page };
    }
);

// Thunk for fetching products by category with pagination
export const fetchProductsByCategories = createAsyncThunk(
    'products/fetchByCategories',
    async ({ category, page }) => {
        const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const paginatedMeals = res.data.meals.slice((page - 1) * 12, page * 12);
        return { meals: paginatedMeals, total: res.data.meals.length, page };
    }
);

const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
        totalProducts: 0,
        currentPage: 1,
        currentCategory: 'Indian',
        isArea: true,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        setIsArea: (state, action) => {
            state.isArea = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductByArea.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductByArea.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.meals || [];
                state.totalProducts = action.payload.total;
                state.currentPage = action.payload.page;
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
                state.totalProducts = action.payload.total;
                state.currentPage = action.payload.page;
            })
            .addCase(fetchProductsByCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCurrentPage, setCurrentCategory, setIsArea } =
    productFilterSlice.actions;

export default productFilterSlice.reducer;
