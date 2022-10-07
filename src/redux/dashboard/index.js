import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    poData:[],
    invoices:[],
};
const DashboardReducer = createSlice({
    name: "dashboard",
    initialState:initialState,
    reducers: {
        setPoData: (state = 0, action) => {
            state.poData = action.payload;
            console.log('AFTER ASSIGN PO',state.poData);
        },
        setInvoices: (state = 0, action) => {
            state.invoices =action.payload;
            console.log('AFTER ASSIGN INVOICES',state.invoices);
        },
    },
});

export const { setPoData } = DashboardReducer.actions;
export const { setInvoices } = DashboardReducer.actions;
export const getPoData = (state) => state.dashboard.poData;
export const getInvoices = (state) => state.dashboard.invoices;

export default DashboardReducer.reducer;
