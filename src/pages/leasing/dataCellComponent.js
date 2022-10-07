import moment from "moment";
import React from "react";
import MyFormModal from "../../components/shared/myFormModal";

const DataCellComponent = (props) => {
  const [visibleFormModal, setVisibleFormModal] = React.useState(false);
  const selectedOrderOrQuoteData = React.useRef({});
  let flag = false;
  let cellStartDate = new Date(
    moment(new Date(props.data.startDate)).format("YYYY:MM:DD")
  );
  let searchFromDate = new Date(
    moment(new Date(props.selectedQuipDate[0]).getTime()).format("YYYY:MM:DD")
  );
  let searchToDate = new Date(
    moment(new Date(props.selectedQuipDate[1]).getTime()).format("YYYY:MM:DD")
  );
  if (
    cellStartDate.getTime() >= searchFromDate.getTime() &&
    cellStartDate.getTime() <= searchToDate.getTime()
  ) {
    flag = true;
  }
  let onDataCellClick = () => {
    console.log("CLICKED MY FORM NOW");
    selectedOrderOrQuoteData.current = props.data;
    selectedOrderOrQuoteData.current.headers = props.headerDataRef;
    selectedOrderOrQuoteData.current.customers = props.allCustomers;
    selectedOrderOrQuoteData.current.dataSourceRef = props.dataSourceRef;
    selectedOrderOrQuoteData.current.dataSource = props.dataSource;
    selectedOrderOrQuoteData.current.setDataSource = props.setDataSource;
    setVisibleFormModal(true);
  };
  return (
    <>
      <div
        onClick={onDataCellClick}
        style={{
          backgroundColor:
            props.freeOrBusyEquip.length > 0
              ? flag
                ? "#F76F72"
                : "#ffffff"
              : "#ffffff",
          borderLeft:
            props.freeOrBusyEquip.length > 0
              ? new Date(props.selectedQuipDate[0]).toDateString() ===
                new Date(props.data.startDate).toDateString()
                ? "2px solid red"
                : "0 solid transparent"
              : "0 solid transparent",
          borderRight:
            props.freeOrBusyEquip.length > 0
              ? new Date(props.selectedQuipDate[1]).toDateString() ===
                new Date(props.data.startDate).toDateString()
                ? "2px solid red"
                : "0 solid transparent"
              : "0 solid transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      {visibleFormModal && (
        <MyFormModal
          setDataSource={props.setDataSource}
          detail={selectedOrderOrQuoteData.current}
          visible={visibleFormModal}
          setVisible={setVisibleFormModal}
        />
      )}
    </>
  );
};
export default DataCellComponent;
