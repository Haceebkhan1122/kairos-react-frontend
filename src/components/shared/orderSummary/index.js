import React from "react";
import "./style.scss";
import { Modal, Table } from "antd";
import { DeliveryDashboardApi } from "../../../api";

const OrderSummary = (props) => {
  const [dataSource, setDataSource] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [totalQTY, setTotalQTY] = React.useState(0);
  const [totalLines, setTotalLines] = React.useState(0);
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [totalOpen, setTotalOpen] = React.useState(0);
  const [totalArrived, setTotalArrived] = React.useState(0);
  const [totalDelivered, setTotalDelivered] = React.useState(0);
  const [totalStarted, setTotalStarted] = React.useState(0);
  const [busy, setBusy] = React.useState(false);
  const setAllModalData = (data) => {
    let array = [],
      qty = 0,
      amount = 0,
      lines = 0;
    console.log("Detail-->", props.detail);
    setTotalOrders(data.length);
    setTotalOpen(props.detail.open);
    setTotalArrived(props.detail.arrived);
    setTotalDelivered(props.detail.delivered);
    setTotalStarted(props.detail.started);
    data.forEach((item, i) => {
      array.push({
        key: i,
        order: item.UD27_Key3,
        spending: item.OrderHed_TotalCharges,
        lines: item.UD27_Character02,
      });
      lines += parseInt(item.UD27_Character02.split(",").length);
      amount += parseFloat(item.OrderHed_TotalCharges);
      item.UD27_Character02.split(",").forEach((l, i) => {
        qty += parseInt(l.split("*")[1]);
      });
    });
    setTotalLines(lines);
    setTotalAmount(amount);
    setTotalQTY(qty);
    setDataSource(array);
  };
  React.useEffect(() => {
    setBusy(true);
    DeliveryDashboardApi.getOrderSummary({
      id: props.id,
      date: props.date.split("T")[0],
    })
      .then((res) => {
        if (res.data.length > 0) {
          setAllModalData(res.data);
        }
        setBusy(false);
      })
      .catch((err) => {
        console.log(err);
        setBusy(false);
      });
  }, []);

  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      className: "text-left ms-2",
      width: "13%",
    },
    {
      title: "Spending",
      dataIndex: "spending",
      key: "spending",
      className: "me-2 text-end",
      width: "13%",
    },
    {
      title: "Lines",
      dataIndex: "lines",
      key: "lines",
      className: "text-left",
      style: { paddingLeft: "10px" },
    },
  ];
  return (
    <>
      <Modal
        width={900}
        title={<div style={{ "font-size": "13px" }}>Summary</div>}
        visible={props.visible}
        onCancel={() => {
          props.setVisible(false);
        }}
        wrapClassName="orderSummaryMdl"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonText="Close"
        cancelButtonProps={{
          style: {
            marginLeft: "auto",
            // fontWeight: "500",
            fontSize: "13px",
            background: "#E4E6EF",
            color: "black",
            borderRadius: "10px",
            borderColor: "transparent",
          },
        }}
      >
        <div>
          <div className="mdlBdyHead">
            <div className="headContent">
              <span className="headContentTxt">Total Orders:</span>
              <span className="headContentNo">{totalOrders}</span>
            </div>
            <div className="headContent">
              <span className="headContentTxt">Open:</span>
              <span className="headContentNo">{totalOpen}</span>
            </div>
            <div className="headContent">
              <span className="headContentTxt">Arrived:</span>
              <span className="headContentNo">{totalArrived}</span>
            </div>
            <div className="headContent">
              <span className="headContentTxt">Delivered:</span>
              <span className="headContentNo">{totalDelivered}</span>
            </div>
            <div className="headContent">
              <span className="headContentTxt">Started:</span>
              <span className="headContentNo">{totalStarted}</span>
            </div>
            <div className="headContent">
              <span className="headContentTxt">Total Lines:</span>
              <span className="headContentNo">{totalLines}</span>
            </div>
            <div className="headContent">
              <span className="headContentTxt">Total Qty:</span>
              <span className="headContentNo">{totalQTY}</span>
            </div>
            <div className="headContent">
              <span className="headContentTxt">Total Amount:</span>
              <span className="headContentNo">
                <label className="text-dark">$</label>
                {totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={dataSource}
              bordered={true}
              loading={busy}
              className="tableMain mt-1 rounded-bottom"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default OrderSummary;
