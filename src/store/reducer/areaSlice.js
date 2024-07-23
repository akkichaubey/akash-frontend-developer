import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching areas
export const fetchAreas = createAsyncThunk('area/fetchAreas', async () => {
    const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
    );
    return response.data.meals;
});

const areaSlice = createSlice({
    name: 'area',
    initialState: {
        areas: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAreas.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAreas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.areas = action.payload;
            })
            .addCase(fetchAreas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default areaSlice.reducer;
