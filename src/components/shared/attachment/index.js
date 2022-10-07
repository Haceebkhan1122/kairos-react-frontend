import React from "react";
import { Table } from "antd";
import { DeliveryDashboardApi } from "../../../api";

const OrderSummary = (props) => {
  const [dataSource, setDataSource] = React.useState([]);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    setBusy(true);
    DeliveryDashboardApi.getAttachment({ id: props.orderId })
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
      title: "File Type",
      dataIndex: "XFileRefDocTypeID",
      key: "XFileRefDocTypeID",
      className: "text-center",
      width: "13%",
    },
    {
      title: "File Desc",
      dataIndex: "XFileRefXFileDesc",
      key: "XFileRefXFileDesc",
      className: "text-center",
      width: "13%",
    },
    {
      title: "File Ref Num",
      dataIndex: "XFileRefNum",
      key: "XFileRefNum",
      className: "text-center",
      width: "20%",
    },
    {
      title: "File Name",
      dataIndex: "XFileRefXFileName",
      key: "XFileRefXFileName",
      className: "text-center",
    },
  ];
  return (
    <>
      {/*<Modal*/}
      {/*  width={900}*/}
      {/*  title={*/}
      {/*    <div style={{ "font-size": "13px" }}>*/}
      {/*      Attachment - Order:{props.orderId}*/}
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
        Attachments
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
