import React from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { SignIn } from "./pages";
import { MainLayout } from "./components/layout";
import PrivateRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";
import "./scss/main.scss";
import authenticatedRoutes from "./app-routes";
import SalesDashboard from "./pages/salesDashboard/SalesDashboard";
import SaleOrderEntry from "./pages/salesDashboard/SaleOrderEntry";

function App() {
  let token = localStorage.getItem("tokenMKairos");
  let path = window.location.pathname;

  // console.log(path, token);

  function renderRoutes() {
    // if (token) {
    //   <Routes>
    //     <Route exact path="/sales-dashboard" element={<SalesDashboard />} />
    //   </Routes>
    // }
    if (token !== null) {
      // console.log('token is not null');
      return (
        <MainLayout>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route exact path="/sales-dashboard" element={<SalesDashboard />} />
            <Route exact path="/salesorder/addtocart" element={<SaleOrderEntry />} />
            {authenticatedRoutes.map(({ path, element }) => (
              <Route exact path={path} element={<PrivateRoute />}>
                <Route exact path={path} element={element} />
              </Route>
            ))}
          </Routes>
        </MainLayout>
      );
    } else {
      // console.log('token is null');
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route exact path="/sales-dashboard" element={<SalesDashboard />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<SignIn />} />
          </Route>
          <Route exact path="/signin" element={<PublicRoute />}>
            <Route exact path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      );
    }
  }

  return <Router>{renderRoutes()}</Router>;
}

export default App;
