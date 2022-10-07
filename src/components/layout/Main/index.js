// Main layout component that defines overall structure
import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import MyHeader from "../Header";
import MyFooter from "../Footer";
import "./style.scss";
import mainStyle from "../../../scss/main.scss";

const { Header, Footer, Content } = Layout;

const MainLayout = (props) => {
  return (
    <>
      <Layout className="bg-main">
        <div
          style={{
            padding: "0",
            height: "86px",
            backgroundColor: mainStyle.$primary,
          }}
        >
          <MyHeader />
        </div>
        <Content style={{ minHeight: " calc( 100vh - 163px )" }}>
          {props.children}
        </Content>
        <Footer style={{ backgroundColor: "transparent" }}>
          <MyFooter />
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
