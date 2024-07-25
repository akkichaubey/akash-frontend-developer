import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching products by area with pagination
export const fetchProductByArea = createAsyncThunk(
    'products/fetchByArea',
    async ({ area, page }, { getState }) => {
        const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        const start = (page - 1) * 12;
        const end = page * 12;
        const paginatedMeals = res.data.meals.slice(start, end);
        return { meals: paginatedMeals, total: res.data.meals.length, page };
    }
);

// Thunk for fetching products by category with pagination
export const fetchProductsByCategories = createAsyncThunk(
    'products/fetchByCategories',
    async ({ category, page }, { getState }) => {
        const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const start = (page - 1) * 12;
        const end = page * 12;
        const paginatedMeals = res.data.meals.slice(start, end);
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
        sortOrder: 'asc',
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
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
            state.products = state.products.slice().sort((a, b) => {
                if (state.sortOrder === 'asc') {
                    return a.strMeal.localeCompare(b.strMeal);
                } else {
                    return b.strMeal.localeCompare(a.strMeal);
                }
            });
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
                // Sort products after fetching
                state.products = state.products.slice().sort((a, b) => {
                    if (state.sortOrder === 'asc') {
                        return a.strMeal.localeCompare(b.strMeal);
                    } else {
                        return b.strMeal.localeCompare(a.strMeal);
                    }
                });
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
                // Sort products after fetching
                state.products = state.products.slice().sort((a, b) => {
                    if (state.sortOrder === 'asc') {
                        return a.strMeal.localeCompare(b.strMeal);
                    } else {
                        return b.strMeal.localeCompare(a.strMeal);
                    }
                });
            })
            .addCase(fetchProductsByCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCurrentPage, setCurrentCategory, setIsArea, setSortOrder } =
    productFilterSlice.actions;

export default productFilterSlice.reducer;
