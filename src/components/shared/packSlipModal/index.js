import React from "react";
import { Table } from "antd";
import { DeliveryDashboardApi } from "../../../api";

const OrderSummary = (props) => {
  const [dataSource, setDataSource] = React.useState([]);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    setBusy(true);
    DeliveryDashboardApi.getPackSlip({ id: props.orderId })
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
      dataIndex: "ShipDtl_OrderLine",
      key: "ShipDtl_OrderLine",
      className: "text-center",
      width: "13%",
    },
    {
      title: "Line Description",
      dataIndex: "ShipDtl_LineDesc",
      key: "ShipDtl_LineDesc",
      className: "text-center",
      width: "25%",
    },
    {
      title: "Changed By",
      dataIndex: "ShipDtl_ChangedBy",
      key: "ShipDtl_ChangedBy",
      className: "text-center",
    },
    {
      title: "Changed Date",
      dataIndex: "ShipDtl_ChangeDate",
      key: "ShipDtl_ChangeDate",
      className: "text-center",
      render: (text, record) => {
        return <div>{record.ShipDtl_ChangeDate.split("T")[0]}</div>;
      },
    },
  ];
  return (
    <>
      {/*<Modal*/}
      {/*  width={900}*/}
      {/*  title={*/}
      {/*    <div style={{ "font-size": "13px" }}>*/}
      {/*      PackSlip - Order:{props.orderId}*/}
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
        Pack Slips
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
