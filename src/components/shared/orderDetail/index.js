import React from "react";
import "./style.scss";
import { Badge, Modal, Spin, Table } from "antd";
import { DeliveryDashboardApi } from "../../../api";
import { ArInvoiceModal, AttachmentModal, PackSlipModal } from "../index";

const OrderDetail = (props) => {
  const [busy, setBusy] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);
  const [map, setMap] = React.useState({
    duration: "",
    distance: "",
  });
  const [orderHeader, setOrderHeader] = React.useState({
    distance: "",
    duration: "",
    orderNum: "",
    customerId: "",
    customerName: "",
    totalAmount: "",
    soldTo: "",
    shipTo: "",
  });
  React.useEffect(() => {
    setBusy(true);
    DeliveryDashboardApi.getOrderDetails({ orderId: props.orderId.orderId })
      .then((res) => {
        let lines = [];
        res.orderLines.data.forEach((line, i) => {
          setOrderHeader({
            distance: "",
            duration: "",
            orderNum: res.orderHeader.OrderHed_OrderNum,
            customerId: res.orderHeader.Customer_CustID,
            customerName: res.orderHeader.Customer_Name,
            totalAmount: parseFloat(
              res.orderHeader.OrderHed_TotalCharges
            ).toFixed(2),
            soldTo: res.orderHeader.soldto,
            shipTo: res.orderHeader.shipto,
          });
          lines.push({
            key: i,
            part: line.PartNum,
            description: line.LineDesc,
            unitPrice: parseFloat(line.UnitPrice).toFixed(2),
            qty: parseFloat(line.OrderQty).toFixed(2),
            total: parseFloat(line.TotalPrice).toFixed(2),
          });
        });
        if (res.orderHeader.map) {
          setMap({
            distance: res.orderHeader.map?.distance?.text.toString(),
            duration: res.orderHeader.map?.duration?.text.toString(),
          });
        }
        setDataSource(lines);
        setBusy(false);
        console.log("OrderDetail-API", res);
      })
      .catch((error) => {
        setBusy(false);
        console.log("ERROR-->", error);
      });
  }, []);

  const columns = [
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
      className: "text-start ms-2",
      width: "13%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: "text-start ms-2",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      className: "text-end",
      style: { paddingLeft: "10px" },
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      className: "text-end",
      style: { paddingLeft: "10px" },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      className: "text-end",
      style: { paddingLeft: "10px" },
    },
  ];
  return (
    <>
      <Modal
        wrapClassName="orderDetailMdl"
        width={900}
        title="Order Detail"
        visible={props.visible}
        onCancel={() => {
          props.setVisible(false);
        }}
        className="orderSummaryMdl"
        closable={false}
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
        <Spin spinning={busy}>
          <div className="orderDetailMain">
            <div className="px-4 py-3">
              <div className="topLineInputs d-flex">
                <div className="d-flex justify-content-end w-50">
                  <span className="me-2 inputTxt">Distance:</span>
                  <span>
                    <input
                      value={map.distance}
                      className="mdlTopInput"
                      disabled
                    ></input>
                  </span>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <span className="me-2 inputTxt">Duration:</span>
                  <span>
                    <input
                      value={map.duration}
                      className="mdlTopInput"
                      disabled
                    />
                  </span>
                </div>
              </div>
              <div className="d-flex inputsRow">
                <div className="d-flex justify-content-end w-50">
                  <span className="me-2 inputTxt">Order Num:</span>
                  <span>
                    <input
                      value={orderHeader.orderNum}
                      className="mdlInputs"
                      disabled
                    />
                  </span>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <span className="me-2 inputTxt">Customer ID:</span>
                  <span>
                    <input
                      value={orderHeader.customerId}
                      className="mdlInputs"
                      disabled
                    />
                  </span>
                </div>
              </div>
              <div className="d-flex inputsRow">
                <div className="d-flex justify-content-end w-50">
                  <span className="me-2 inputTxt">Customer Name:</span>
                  <span>
                    <input
                      value={orderHeader.customerName}
                      className="mdlInputs"
                      disabled
                    />
                  </span>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <span className="me-2 inputTxt">Total Amounts:</span>
                  <span>
                    <input
                      value={orderHeader.totalAmount}
                      className="mdlInputs"
                      disabled
                    />
                  </span>
                </div>
              </div>
              <div className="d-flex inputsRow mt-1">
                <div className="d-flex justify-content-end w-50">
                  <span className="me-2 inputTxt">Sold To:</span>
                  <span>
                    <textarea
                      value={orderHeader.soldTo}
                      className="mdlTextArea"
                      disabled
                    ></textarea>
                  </span>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <span className="me-2 inputTxt">Ship To:</span>
                  <span>
                    <textarea
                      value={orderHeader.shipTo}
                      className="mdlTextArea"
                      disabled
                    ></textarea>
                  </span>
                </div>
              </div>

              <div></div>
              <div></div>
            </div>
            <div>
              <Table
                columns={columns}
                dataSource={dataSource}
                bordered={true}
                // loading={busy}
                className="tableMain mt-1 rounded-bottom"
              />
            </div>
            {props.orderId.hasArInvoices && (
              <ArInvoiceModal
                orderId={props.orderId.text.split("~")[0].split(":")[1]}
              />
            )}
            {props.orderId.hasAttachments && (
              <AttachmentModal
                orderId={props.orderId.text.split("~")[0].split(":")[1]}
              />
            )}
            {props.orderId.hasPackSlips && (
              <PackSlipModal
                orderId={props.orderId.text.split("~")[0].split(":")[1]}
              />
            )}
          </div>
          <div className="orderDetailMdlRibbon">
            <Badge.Ribbon
              text="Unpaid"
              color="#F64E60"
              style={{ height: "30px" }}
            ></Badge.Ribbon>
          </div>
        </Spin>
      </Modal>
    </>
  );
};
export default OrderDetail;
