import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const auth = localStorage.getItem("tokenMKairos")
    return auth ?  <Navigate to="/"/> : <Outlet />;
}
export default PublicRoute;