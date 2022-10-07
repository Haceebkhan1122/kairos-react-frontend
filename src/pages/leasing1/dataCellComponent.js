import React, { memo } from "react";
import moment from "moment";
import MyFormModal from "../../components/shared/myFormModal";
import { useSelector } from "react-redux";
import { getDateInRedux, getFreeOrBusyEquipInRedux } from "../../redux/leasing";

const DataCellComponent = ({
  data,
  date,
  freeOrBusyEquip,
  headerDataRef,
  allCustomers,
  dataSourceRef,
  dataSource,
  setDataSource,
  selectedQuipDate,
}) => {
  let dateFromRedux = useSelector(getDateInRedux);
  let freeOrBusyFromRedux = useSelector(getFreeOrBusyEquipInRedux);
  const [visibleFormModal, setVisibleFormModal] = React.useState(false);
  const selectedOrderOrQuoteData = React.useRef({});
  const cData = React.useMemo(() => {
    return {
      data: data,
      // length: freeOrBusyEquip.length,
      length: freeOrBusyFromRedux.length,
      // date1: date[0],
      date1: dateFromRedux.length > 0 ? dateFromRedux[0] : new Date(),
      // date2: date[1],
      date2: dateFromRedux.length > 0 ? dateFromRedux[1] : new Date(),
      dataSource: dataSource,
    };
  }, [data, freeOrBusyEquip.length, date, dataSource]);

  let flag = false;
  let cellStartDate = new Date(
    moment(new Date(cData.data.startDate)).format("YYYY:MM:DD")
  );
  let searchFromDate = new Date(
    moment(new Date(cData.date1).getTime()).format("YYYY:MM:DD")
  );

  let searchToDate = new Date(
    moment(new Date(cData.date2).getTime()).format("YYYY:MM:DD")
  );

  if (
    cellStartDate.getTime() >= searchFromDate.getTime() &&
    cellStartDate.getTime() <= searchToDate.getTime()
  ) {
    flag = true;
  }
  let onDataCellClick = React.useCallback(() => {
    console.log("CLICKED MY FORM NOW");
    selectedOrderOrQuoteData.current = data;
    selectedOrderOrQuoteData.current.headers = headerDataRef;
    selectedOrderOrQuoteData.current.customers = allCustomers;
    selectedOrderOrQuoteData.current.dataSourceRef = dataSourceRef;
    selectedOrderOrQuoteData.current.dataSource = dataSource;
    selectedOrderOrQuoteData.current.setDataSource = setDataSource;
    setVisibleFormModal(true);
  }, []);
  let componentStyle = React.useMemo(() => {
    return {
      backgroundColor:
        // freeOrBusyEquip.length > 0 ? (flag ? "#F76F72" : "#ffffff") : "#ffffff",
        freeOrBusyFromRedux.length > 0
          ? flag
            ? "#F76F72"
            : "#ffffff"
          : "#ffffff",
      borderLeft:
        // freeOrBusyEquip.length > 0
        //   ? new Date(selectedQuipDate[0]).toDateString() ===
        //     new Date(data.startDate).toDateString()
        //     ? "2px solid red"
        //     : "0 solid transparent"
        //   : "0 solid transparent",
        cData.length > 0
          ? new Date(cData.date1).toDateString() ===
            new Date(cData.data.startDate).toDateString()
            ? "2px solid red"
            : "0 solid transparent"
          : "0 solid transparent",

      borderRight:
        // freeOrBusyEquip.length > 0
        //   ? new Date(selectedQuipDate[1]).toDateString() ===
        //     new Date(data.startDate).toDateString()
        //     ? "2px solid red"
        //     : "0 solid transparent"
        //   : "0 solid transparent",
        cData.length > 0
          ? new Date(cData.date2).toDateString() ===
            new Date(cData.data.startDate).toDateString()
            ? "2px solid red"
            : "0 solid transparent"
          : "0 solid transparent",
      width: "100%",
      height: "100%",
    };
  }, []);
  return (
    <>
      <div onClick={onDataCellClick} style={componentStyle} />
      {visibleFormModal && (
        <MyFormModal
          setDataSource={setDataSource}
          detail={selectedOrderOrQuoteData.current}
          visible={visibleFormModal}
          setVisible={setVisibleFormModal}
        />
      )}
    </>
  );
};
export default memo(DataCellComponent);
