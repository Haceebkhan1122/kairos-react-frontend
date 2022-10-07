import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import dashboardReducer from "./dashboard";
import hooksReducer from "./hooks";
import leasingReducer from "./leasing";
import SalesDashboardSlice from "./features/SalesDashboardSlice";
import SalesOrderEntryCustomerSlice from "./features/SalesOrderEntryCustomerSlice";
import SalesOrderPartSlice from "./features/SalesOrderPartSlice";

const store = configureStore({
  reducer: {
    app: authReducer,
    dashboard: dashboardReducer,
    hooks: hooksReducer,
    leasing: leasingReducer,
    post: SalesDashboardSlice,
    customer: SalesOrderEntryCustomerSlice,
    part: SalesOrderPartSlice
  },
});

export default store;
