import React from "react";
import { Table } from "antd";
import { DeliveryDashboardApi } from "../../../api";

const OrderSummary = (props) => {
  const [dataSource, setDataSource] = React.useState([]);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    setBusy(true);
    DeliveryDashboardApi.getArInvoice({ id: props.orderId })
      .then((res) => {
        setDataSource(res);
        setBusy(false);
      })
      .catch((err) => {
        console.log(err);
        setBusy(false);
      });
  }, []);

  const columns = [
    {
      title: "Line",
      dataIndex: "InvcDtl_InvoiceLine",
      key: "InvcDtl_InvoiceLine",
      className: "text-center",
      width: "13%",
    },
    {
      title: "Line Description",
      dataIndex: "InvcDtl_LineDesc",
      key: "InvcDtl_LineDesc",
      className: "text-center",
      width: "20%",
    },
    {
      title: "Tax Region Code",
      dataIndex: "InvcDtl_TaxRegionCode",
      key: "InvcDtl_TaxRegionCode",
      className: "text-center",
    },
    {
      title: "Changed By",
      dataIndex: "InvcDtl_ChangedBy",
      key: "InvcDtl_ChangedBy",
      className: "text-center",
    },
    {
      title: "Changed Date",
      dataIndex: "InvcDtl_ChangeDate",
      key: "InvcDtl_ChangeDate",
      className: "text-center",
      style: { paddingLeft: "10px" },
      render: (text, record) => {
        return <div>{record.InvcDtl_ChangeDate.split("T")[0]}</div>;
      },
    },
  ];
  return (
    <>
      {/*<Modal*/}
      {/*  width={900}*/}
      {/*  title={*/}
      {/*    <div style={{ "font-size": "13px" }}>*/}
      {/*      AR Invoice - Order:{props.orderId}*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*  visible={props.visible}*/}
      {/*  onCancel={() => {*/}
      {/*    props.setVisible(false);*/}
      {/*  }}*/}
      {/*  wrapClassName="orderSummaryMdl"*/}
      {/*  okButtonProps={{ style: { display: "none" } }}*/}
      {/*  cancelButtonText="Close"*/}
      {/*  cancelButtonProps={{*/}
      {/*    style: {*/}
      {/*      marginLeft: "auto",*/}
      {/*      fontSize: "13px",*/}
      {/*      background: "#E4E6EF",*/}
      {/*      color: "black",*/}
      {/*      borderRadius: "10px",*/}
      {/*      borderColor: "transparent",*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      <div>
        Ar Invoices
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
      {/*</Modal>*/}
    </>
  );
};
export default OrderSummary;
