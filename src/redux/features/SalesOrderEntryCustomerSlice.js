import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCustomers = createAsyncThunk('customers/getCustomers', async (arg, { rejectWithValue }) => {
    try {
        let token = localStorage.getItem("tokenMKairos");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const { data } = await axios.get("https://m.kairossolutions.co/api/mpartinfo/customer", config)
        // console.log(data, "customer from slice:")
        return data
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})


const initialState = {
    customers: [],
    loading: false,
};

const SalesOrderEntryCustomerSlice = createSlice({
    name: "customers",
    initialState: initialState,
    extraReducers: {
        [getCustomers.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getCustomers.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.getCustomers = payload
        },
        [getCustomers.rejected]: (state, { payload }) => {
            state.loading = false
        }
    }
});

export default SalesOrderEntryCustomerSlice.reducer


