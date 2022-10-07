import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ProjectManagementSvg,
  TimeApprovalSvg,
  TimeEntrySvg,
} from "../../assets/icons";
import "./style.scss";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ backgroundColor: "#ECEEF7", height: "555px" }}>
        <div className="d-flex row py-3 mx-auto forHomeWidth">
          <div
            className="col-xl-8 col-lg-12 col-md-12 col-12 px-4 py-lg-4 py-md-4 py-4 py-lg-4 timeDiv"
            style={{ backgroundColor: "#E2DEF8", borderRadius: "5px" }}
          >
            <div className="d-flex row">
              <div className="px-1 col-xl-3 col-lg-3 col-md-6 col-6 p-0">
                <Link to="/sales-dashboard" className="timeCard py-5">
                  <span>
                    <TimeApprovalSvg />
                  </span>
                  <h1 className="timeCardText" style={{ color: "#181C32" }}>
                    Sales Dashboard
                  </h1>
                </Link>
              </div>
              <div className="px-1 col-xl-3 col-lg-3 col-md-6 col-6 p-0">
                <a
                  className="timeCard py-5"
                  onClick={() => {
                    console.log("Time Entry");
                  }}
                >
                  <span>
                    <TimeEntrySvg />
                  </span>
                  <h1 className="timeCardText" style={{ color: "#FFA800" }}>
                    Time Entry
                  </h1>
                </a>
              </div>
              <div className="px-1 col-xl-3 col-lg-3 col-md-6 col-6 p-0">
                <a className="timeCard py-5">
                  <span>
                    <TimeApprovalSvg />
                  </span>
                  <h1 className="timeCardText" style={{ color: "#181C32" }}>
                    Time Approval
                  </h1>
                </a>
              </div>

            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-12 p-xl-0 ps-xl-3 ps-lg-0 p-md-0 p-0 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
            <div className="p-4 rounded" style={{ backgroundColor: "#E2DEF8" }}>
              <div
                className="text-center py-5 px-3"
                style={{ backgroundColor: "#C9F7F5", borderRadius: "7px" }}
              >
                <span>
                  <ProjectManagementSvg />
                </span>
                <h3 className="PmText my-3">Project Management</h3>
                <p className="PmPara">
                  We are experienced ERP Project Managers who will look after
                  your business systems improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
