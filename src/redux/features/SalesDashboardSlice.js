import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPosts = createAsyncThunk('posts/getPosts', async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem("tokenMKairos");
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
            address: "",
            phone: "",
            length: 5,
            start: 0,
            draw: 1
        };
        const { data } = await axios.post("https://m.kairossolutions.co/api/mpartinfo/dashBoard", bodyParameters, config)
        // const data = await response.data;
        console.log(data, "datass")
        return data
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})


const initialState = {
    posts: [],
    loading: false,
};

const SalesDashboardSlice = createSlice({
    name: "posts",
    initialState: initialState,
    extraReducers: {
        [getPosts.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.posts = payload
        },
        [getPosts.rejected]: (state, { payload }) => {
            state.loading = false
        }
    }
});

export default SalesDashboardSlice.reducer


