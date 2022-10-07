import React, { useEffect } from "react";
import Logo from "../../shared/Logo";
import "./style.scss";
import {
  CarOutlined,
  DownOutlined,
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import { Button, Dropdown, Menu, message, Space } from "antd";
import { useNavigate } from "react-router-dom";

const MyHeader = () => {
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();
  useEffect(() => {
    var token = localStorage.getItem("tokenMKairos");
    if (token) {
      var decode = jwt_decode(token);
      setUserData(decode.user);
    }
  }, []);

  function handleButtonClick(e) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }

  function handleMenuClick(e) {
    console.log("click", e);
    if (e.key === "1") {
      navigate("/routeplanner");
    } else if (e.key === "2") {
      navigate("/leasing");
    }
  }

  const menuAdminActions = (
    <Menu
      onClick={(e) => {
        console.log(e);
      }}
      className="py-3"
    >
      <Menu.Item className="dropDownListTxt" key="1" icon={<UserOutlined />}>
        File Bulk Users
      </Menu.Item>
      <Menu.Item className="dropDownListTxt" key="2" icon={<UserOutlined />}>
        Bulk Users
      </Menu.Item>
      <Menu.Item className="dropDownListTxt" key="3" icon={<UserOutlined />}>
        All Users
      </Menu.Item>
      <Menu.Item className="dropDownListTxt" key="4" icon={<UserOutlined />}>
        Users History
      </Menu.Item>
      <Menu.Item className="dropDownListTxt" key="5" icon={<UserOutlined />}>
        Online Users
      </Menu.Item>
      <Menu.Item className="dropDownListTxt" key="6" icon={<UserOutlined />}>
        Email Setup
      </Menu.Item>
    </Menu>
  );
  const menuSalesDashboard = (
    <Menu className="py-3 headerLowerDropDown">
      <Menu.Item
        className="LowerdropDownListTxt"
        key="1"
        icon={<CarOutlined className="me-0 me-1" />}
      >
        Order Entry
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="2"
        icon={<FileDoneOutlined className="me-0 me-1" />}
      >
        Sales Dashboard
      </Menu.Item>
      {/* <Menu.Item
        className="LowerdropDownListTxt"
        key="3"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        All Users
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="4"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Users History
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="5"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Online Users
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="6"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Email Setup
      </Menu.Item> */}
    </Menu>
  );
  const menuDeliveryPlanning = (
    <Menu onClick={handleMenuClick} className="py-3 headerLowerDropDown">
      <Menu.Item
        className="LowerdropDownListTxt"
        key="1"
        icon={<CarOutlined className="me-0 me-1" />}
      >
        Delivery Dashboard
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="2"
        icon={<FileDoneOutlined className="me-0 me-1" />}
      >
        Leasing
      </Menu.Item>
      {/* <Menu.Item
        className="LowerdropDownListTxt"
        key="3"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        All Users
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="4"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Users History
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="5"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Online Users
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="6"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Email Setup
      </Menu.Item> */}
    </Menu>
  );
  const menuTimeEntry = (
    <Menu
      onClick={(e) => {
        console.log(e);
      }}
      className="py-3 headerLowerDropDown"
    >
      <Menu.Item
        className="LowerdropDownListTxt"
        key="1"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Time Entry
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="2"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Time Approval
      </Menu.Item>
    </Menu>
  );
  const menuApprovals = (
    <Menu
      onClick={(e) => {
        console.log(e);
      }}
      className="py-3 headerLowerDropDown"
    >
      <Menu.Item
        className="LowerdropDownListTxt"
        key="1"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Requistion Entry
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="2"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Requistion Approval
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="3"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        AP Invoice Approval
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="4"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        PO Approval
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="5"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        Approval Tree Setup
      </Menu.Item>
    </Menu>
  );
  const menuOthers = (
    <Menu
      onClick={(e) => {
        console.log(e);
      }}
      className="py-3 headerLowerDropDown"
    >
      <Menu.Item
        className="LowerdropDownListTxt"
        key="1"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        PO Receipt
      </Menu.Item>
      <Menu.Item
        className="LowerdropDownListTxt"
        key="2"
        icon={<UserOutlined className="me-0 me-1" />}
      >
        BAQ
      </Menu.Item>
    </Menu>
  );

  function logoutClickHandler() {
    localStorage.removeItem("tokenMKairos");
    window.location.replace("/");
  }

  // console.log(userData)
  return (
    <>
      <div
        style={{
          height: "100%",
          backgroundColor: "transparent",
          width: "100%",
        }}
      >
        <div>
          <div className="headerUpper mt-2">
            <div className="d-flex align-items-center">
              <Logo className="LogoContainer" />
            </div>
            <div className="">
              <div className="d-flex">
                <div>
                  <Space wrap>
                    <Dropdown overlay={menuAdminActions}>
                      <Button className="headerUpperBtn">
                        Admin Action <DownOutlined />
                      </Button>
                    </Dropdown>
                  </Space>
                </div>
                <div>
                  <button className="headerUpperBtn">
                    <span className="me-3 v-align-top">
                      {" "}
                      <UserOutlined className="align-baseline" />
                    </span>
                    <span>{userData.username}</span>
                  </button>
                </div>
                <div>
                  <button
                    onClick={logoutClickHandler}
                    className="headerUpperBtn"
                    style={{ width: "70px" }}
                  >
                    <span>Logout</span>
                  </button>
                </div>
              </div>
              <div>
                <a className="headerUpperTxt">
                  {userData.company}, {userData.name}, {userData.PlantName}
                </a>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="headerLower d-flex">
              <div>
                <Space wrap>
                  <Dropdown trigger={["click"]} overlay={menuSalesDashboard}>
                    <Button className="headerLowerBtn">
                      Sales Dashboard{" "}
                      <DownOutlined className="ms-md-3 ms-sm-2 ms-1 align-top" />
                    </Button>
                  </Dropdown>
                </Space>
              </div>
              <div>
                <Space wrap>
                  <Dropdown trigger={["click"]} overlay={menuDeliveryPlanning}>
                    <Button className="headerLowerBtn">
                      Delivery Planning{" "}
                      <DownOutlined className="ms-md-3 ms-sm-2 ms-1 align-top" />
                    </Button>
                  </Dropdown>
                </Space>
              </div>
              {/* <div>
              <Space wrap>
                <Dropdown trigger={["click"]} overlay={menuTimeEntry}>
                  <Button className="headerLowerBtn">
                    Time Entry{" "}
                    <DownOutlined className="ms-md-3 ms-sm-2 ms-1 align-top" />
                  </Button>
                </Dropdown>
              </Space>
            </div> */}
              {/* <div>
              <Space wrap>
                <Dropdown trigger={["click"]} overlay={menuApprovals}>
                  <Button className="headerLowerBtn">
                    Approvals{" "}
                    <DownOutlined className="ms-md-3 ms-sm-2 ms-1 align-top" />
                  </Button>
                </Dropdown>
              </Space>
            </div> */}
              {/* <div>
              <Space wrap>
                <Dropdown trigger={["click"]} overlay={menuOthers}>
                  <Button className="headerLowerBtn">
                    Others{" "}
                    <DownOutlined className="ms-md-3 ms-sm-2 ms-1 align-top" />
                  </Button>
                </Dropdown>
              </Space>
            </div> */}
              {/* <div>
              <button className="headerLowerBtn">
                <span className="me-md-2 me-sm-1 v-align-top">
                  {" "}
                  <UserOutlined className="align-baseline" />
                </span>
                <span>Project Import</span>
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyHeader;
