import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './reducer/categoriesSlice';
import areaSlice from './reducer/areaSlice';
import singleProductSlice from './reducer/ProductSlice';
import productFilterReducer from './reducer/productFilterSlice';
const store = configureStore({
    reducer: {
        productFilter: productFilterReducer,
        categories: categoriesReducer,
        area: areaSlice,
        product: singleProductSlice,
    },
});

export default store;
