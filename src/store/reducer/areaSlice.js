import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching areas
export const fetchAreas = createAsyncThunk('areas/fetchAreas', async () => {
    const res = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
    );
    return res.data; // Return the entire response data
});

// Create the area slice
const areaSlice = createSlice({
    name: 'areas',
    initialState: {
        area: [],
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
                state.area = action.payload.meals; // Correct the payload access
                // console.log(state.area);
            })
            .addCase(fetchAreas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default areaSlice.reducer;
