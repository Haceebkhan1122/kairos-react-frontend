import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getParts = createAsyncThunk('parts/getParts', async (arg, { rejectWithValue }) => {
    try {
        let token = localStorage.getItem("tokenMKairos");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const { data } = await axios.get("https://m.kairossolutions.co/api/mpartinfo/getpartlistsearch?codes", config)
        // console.log(data, "parts from slice:")
        return data
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})


const initialState = {
    parts: [],
    loading: false,
};

const SalesOrderPartSlice = createSlice({
    name: "parts",
    initialState: initialState,
    extraReducers: {
        [getParts.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getParts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.getCustomers = payload
        },
        [getParts.rejected]: (state, { payload }) => {
            state.loading = false
        }
    }
});

export default SalesOrderPartSlice.reducer


