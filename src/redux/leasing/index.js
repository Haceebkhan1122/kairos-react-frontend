import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  selectedEquipDate: [],
  freeOrBusyEquip: [],
};
const leasingReducer = createSlice({
  name: "leasing",
  initialState: initialState,
  reducers: {
    setDateInRedux: (state = 0, action) => {
      state.selectedEquipDate = action.payload;
    },
    setFreeOrBusyEquipInRedux: (state = 0, action) => {
      state.freeOrBusyEquip = action.payload;
    },
    setDataSourceRedux: (state = 0, action) => {
      state.data = action.payload;
    },
    addDataInRedux: (state = 0, action) => {
      state.data.push(action.payload);
    },
    confirmQuoteRedux: (state = 0, action) => {
      const d = state.data.map((item) => {
        if (item.quoteId === action.payload) {
          item.status = true;
        }
        return item;
      });
      state.data = d;
    },
    createOrderFromQuoteRedux: (state = 0, action) => {
      const equip = action.payload.equip;
      const quoteId = action.payload.quoteId;
      const newData = action.payload.newData;
      let dataSourceCopy = state.data.map((item) => {
        if (item.quoteId === quoteId) {
          item.text =
            parseInt(newData.UD12_Number01).toFixed(0).toString() +
            " " +
            parseInt(newData.UD12_Number02).toFixed(0).toString() +
            " " +
            newData.Customer_CustID +
            "~" +
            newData.Customer_Name;
          item.type = newData.UD12_Key1;
          item.orderId =
            newData.UD12_ShortChar01 === "Order"
              ? parseInt(newData.UD12_Number01).toFixed(0)
              : "";
          item.quoteId =
            newData.UD12_ShortChar01 === "Quote"
              ? parseInt(newData.UD12_Number01).toFixed(0)
              : "";
          item.status = newData.OrderHed_OpenOrder;
          item.startDate = new Date(newData.UD12_Date01);
          item.endDate = new Date(
            newData.UD12_Date02.split("T")[0] + "T" + 23 + ":30:00"
          );
          item.otsAddress1 = newData.OrderHed_OTSAddress1;
          item.otsAddress2 = newData.OrderHed_OTSAddress2;
          item.otsName = newData.OrderHed_OTSName;
          item.otsCity = newData.OrderHed_OTSCity;
          item.otsZip = newData.OrderHed_OTSZIP;
          item.shipToNum = newData.OrderHed_ShipToNum;
          item.UseOTS = newData.OrderHed_UseOTS;
          item.description = equip.text.split("-")[1];
          item.customerName = newData.Customer_Name;
          item.customerId = newData.Customer_CustID;
          item.partDescription = equip.text;
          item.allDay = false;
        }
        return item;
      });
      state.data = dataSourceCopy;
    },
  },
});

export const { setDataSourceRedux } = leasingReducer.actions;
export const { setFreeOrBusyEquipInRedux } = leasingReducer.actions;
export const { setDateInRedux } = leasingReducer.actions;
export const { addDataInRedux } = leasingReducer.actions;
export const { confirmQuoteRedux } = leasingReducer.actions;
export const { createOrderFromQuoteRedux } = leasingReducer.actions;
export const getDataSourceRedux = (state) => state.leasing.data;
export const getFreeOrBusyEquipInRedux = (state) =>
  state.leasing.freeOrBusyEquip;
export const getDateInRedux = (state) => state.leasing.selectedEquipDate;

export default leasingReducer.reducer;
