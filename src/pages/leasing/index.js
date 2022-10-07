import React, { memo, useEffect } from "react";
import Scheduler, { Resource, Scrolling } from "devextreme-react/scheduler";
import { Button, Checkbox, DatePicker, Input, Spin } from "antd";
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { LeasingModuleApi } from "../../api";
// import Query from "devextreme/data/query";
import moment from "moment";
import MyFormModal from "../../components/shared/myFormModal";
import ResourceComponent from "./resourceComponent";
import { ResourceData } from "./data";
import CellComponent from "./cellComponent";
import "./leasingStyle.scss";
import "../lightMain.css";
import DataCellComponent from "./dataCellComponent";
import {
  CLOSE_ORDER_CLR,
  NON_QUOTED_CLR,
  OPEN_ORDER_CLR,
  QUOTED_CLR,
} from "./color";
import { useDispatch, useSelector } from "react-redux";
import { getVisibleFormModal } from "../../redux/hooks";
// import "devextreme/dist/css/dx.light.css";
// import DatePicker from "react-datepicker";

const DeliveryModule = () => {
  const HEADER_COLOR = "#00000000";
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedQuipDate, setSelectedQuipDate] = React.useState([]);
  const [currentOffset, setCurrentOffset] = React.useState("-3");
  const [busy, setBusy] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  let reduxMyFormVisible = useSelector(getVisibleFormModal);
  const dispatch = useDispatch();
  const views = React.useMemo(
    () => [
      {
        name: "Week",
        type: "timelineWeek",
        intervalCount: 2,
        cellDuration: 1440,
        maxAppointmentsPerCell: "5",
        startDate: currentDate,
      },
      {
        name: "Month",
        type: "timelineMonth",
        maxAppointmentsPerCell: "5",
        startDate: currentDate,
      },
      {
        name: "Quarter",
        type: "timelineMonth",
        intervalCount: 3,
        maxAppointmentsPerCell: "5",
        startDate: currentDate,
      },
      {
        name: "Year",
        type: "timelineMonth",
        intervalCount: 12,
        maxAppointmentsPerCell: "5",
        startDate: currentDate,
      },
    ],
    []
  );
  const groups = ["type", "status"];
  const [visibleFormModal, setVisibleFormModal] = React.useState(false);
  const [checkBox, setCheckBox] = React.useState(true);
  const [freeOrBusyEquip, setFreeOrBusyEquip] = React.useState([]);
  let [selectEquipDateStatus, setSelectEquipDateStatus] = React.useState(false);
  const dataSourceRef = React.useRef([]);
  const headerDataRef = React.useRef([]);
  const searchDataSourceRef = React.useRef([]);
  const searchHeaderRef = React.useRef([]);
  const selectedOrderOrQuoteData = React.useRef({});
  const searchTimeHeaderRef = React.useRef([]);
  const [headersData, setHeaderData] = React.useState(ResourceData);
  const [dataSource, setDataSource] = React.useState([]);
  const [allCustomers, setAllCustomers] = React.useState([]);
  const leasingCurrentView = React.useRef("month");
  const setOriginOffset = () => {
    let offSet = new Date().getTimezoneOffset() / 60;
    if (offSet < 0) {
      let positiveOffSet = offSet * -1;
      let cOffSet = "-" + positiveOffSet;
      setCurrentOffset(cOffSet);
    } else {
      let negativeOffSet = offSet * -1;
      let cOffSet = "+" + negativeOffSet;
      setCurrentOffset(cOffSet);
    }
  };
  const getAllHeadersAndData = React.useCallback((fromDate, toDate) => {
    setBusy(true);
    LeasingModuleApi.getAllHeaderOfEquipment()
      .then((res) => {
        let array = [];
        if (res.length > 0) {
          res.forEach((item) => {
            array.push({
              text: item.Part_PartNum + "-" + item.Part_PartDescription,
              id: item.Part_PartNum,
              color: HEADER_COLOR,
            });
          });
          array.sort((a, b) => {
            return a.text.split("-")[0].localeCompare(b.text.split("-")[0]);
          });
          array.push({
            text: " ",
            id: " ",
            color: HEADER_COLOR,
          });
          headerDataRef.current = array;
          setHeaderData(array);
        }
        LeasingModuleApi.getAllEquipmentData({
          top: array.length * 30,
          skip: 0,
          fromDate: moment(fromDate).format("YYYY-MM-DD"),
          toDate: moment(toDate).format("YYYY-MM-DD"),
        })
          .then((res) => {
            // console.log(res);
            let dataArray = [];
            if (res.Data.length > 0) {
              res.Data.forEach((item) => {
                let equip = headerDataRef.current.find((h) => {
                  return h.id === item.UD12_Key1;
                });
                if (equip) {
                  if (
                    ((item.UD12_ShortChar01 === "Order" &&
                      item.OrderHed_OrderDate !== null) ||
                      (item.UD12_ShortChar01 === "Quote" &&
                        item.OrderHed_OrderDate === null)) &&
                    item.UD12_Date02 !== null
                  ) {
                    dataArray.push({
                      text:
                        parseInt(item.UD12_Number01).toFixed(0).toString() +
                        " " +
                        parseInt(item.UD12_Number02).toFixed(0).toString() +
                        " " +
                        item.Customer_CustID +
                        "~" +
                        item.Customer_Name,
                      type: item.UD12_Key1,
                      orderId:
                        item.UD12_ShortChar01 === "Order"
                          ? parseInt(item.UD12_Number01).toFixed(0)
                          : "",
                      quoteId:
                        item.UD12_ShortChar01 === "Quote"
                          ? parseInt(item.UD12_Number01).toFixed(0)
                          : "",
                      cost: item.OrderHed_InTotalCharges,
                      status: item.OrderHed_OpenOrder,
                      startDate: new Date(item.UD12_Date01),
                      endDate: new Date(
                        item.UD12_Date02.split("T")[0] + "T" + 23 + ":30:00"
                      ),
                      otsAddress1: item.OrderHed_OTSAddress1,
                      otsAddress2: item.OrderHed_OTSAddress2,
                      otsName: item.OrderHed_OTSName,
                      otsCity: item.OrderHed_OTSCity,
                      otsZip: item.OrderHed_OTSZIP,
                      shipToNum: item.OrderHed_ShipToNum,
                      UseOTS: item.OrderHed_UseOTS,
                      description: equip.text.split("-")[1],
                      customerName: item.Customer_Name,
                      customerId: item.Customer_CustID,
                      partDescription: equip.text,
                      key4: item.UD12_Key4,
                      allDay: false,
                    });
                  }
                }
              });
              // console.log(dataArray);
              dataSourceRef.current = dataArray;
              setDataSource(dataArray);
            }
            setBusy(false);
          })
          .catch((err) => {
            console.log(err);
            setBusy(false);
          });
      })
      .catch((e) => {
        console.log(e);
        setBusy(false);
      });
  }, []);

  const [freeOrBusyEquipCheckBox, setFreeOrBusyEquipCheckBox] =
    React.useState(true);
  useEffect(() => {
    setBusy(true);
    setOriginOffset();
    LeasingModuleApi.getCustomers()
      .then((res) => {
        let custArray = [];
        res.Cust.forEach((c) => {
          custArray.push({
            CurrencyCode: c.CurrencyCode,
            TermsCode: c.TermsCode,
            ShipToNum: c.ShipToNum,
            CustID: c.CustID,
            CustNum: c.CustNum.toString(),
            Name: c.Name,
          });
        });
        setAllCustomers(custArray);
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        getAllHeadersAndData(firstDay, lastDay);
        setBusy(false);
      })
      .catch((e) => {
        console.log(e);
        setBusy(false);
      });
    // LeasingModuleApi.getAllHeaderOfEquipment()
    //   .then((res) => {
    //     let array = [];
    //     if (res.length > 0) {
    //       res.forEach((item) => {
    //         array.push({
    //           text: item.Part_PartNum + "-" + item.Part_PartDescription,
    //           id: item.Part_PartNum,
    //           color: HEADER_COLOR,
    //         });
    //       });
    //       array.sort((a, b) => {
    //         return a.text.split("-")[0].localeCompare(b.text.split("-")[0]);
    //       });
    //       headerDataRef.current = array;
    //       setHeaderData(array);
    //     }
    //     // LeasingModuleApi.getCustomers().then((res) => {
    //     //   let custArray = [];
    //     //   res.Cust.forEach((c) => {
    //     //     custArray.push({
    //     //       CurrencyCode: c.CurrencyCode,
    //     //       TermsCode: c.TermsCode,
    //     //       ShipToNum: c.ShipToNum,
    //     //       CustID: c.CustID,
    //     //       CustNum: c.CustNum.toString(),
    //     //       Name: c.Name,
    //     //     });
    //     //   });
    //     //   setAllCustomers(custArray);
    //       const date = new Date();
    //       const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //       const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //       LeasingModuleApi.getAllEquipmentData({
    //         top: 200,
    //         skip: 0,
    //         fromDate: moment(firstDay).format("YYYY-MM-DD"),
    //         toDate: moment(lastDay).format("YYYY-MM-DD"),
    //       })
    //         .then((res) => {
    //           console.log(res);
    //           let dataArray = [];
    //           if (res.Data.length > 0) {
    //             res.Data.forEach((item) => {
    //               let equip = headerDataRef.current.find((h) => {
    //                 return h.id === item.UD12_Key1;
    //               });
    //               if (equip) {
    //                 if (
    //                   ((item.UD12_ShortChar01 === "Order" &&
    //                     item.OrderHed_OrderDate !== null) ||
    //                     (item.UD12_ShortChar01 === "Quote" &&
    //                       item.OrderHed_OrderDate === null)) &&
    //                   item.UD12_Date02 !== null
    //                 ) {
    //                   dataArray.push({
    //                     text:
    //                       parseInt(item.UD12_Number01).toFixed(0).toString() +
    //                       " " +
    //                       parseInt(item.UD12_Number02).toFixed(0).toString() +
    //                       " " +
    //                       item.Customer_CustID +
    //                       "~" +
    //                       item.Customer_Name,
    //                     type: item.UD12_Key1,
    //                     orderId:
    //                       item.UD12_ShortChar01 === "Order"
    //                         ? parseInt(item.UD12_Number01).toFixed(0)
    //                         : "",
    //                     quoteId:
    //                       item.UD12_ShortChar01 === "Quote"
    //                         ? parseInt(item.UD12_Number01).toFixed(0)
    //                         : "",
    //                     cost: item.OrderHed_InTotalCharges,
    //                     status: item.OrderHed_OpenOrder,
    //                     startDate: new Date(item.UD12_Date01),
    //                     endDate: new Date(
    //                       item.UD12_Date02.split("T")[0] + "T" + 23 + ":30:00"
    //                     ),
    //                     otsAddress1: item.OrderHed_OTSAddress1,
    //                     otsAddress2: item.OrderHed_OTSAddress2,
    //                     otsName: item.OrderHed_OTSName,
    //                     otsCity: item.OrderHed_OTSCity,
    //                     otsZip: item.OrderHed_OTSZIP,
    //                     shipToNum: item.OrderHed_ShipToNum,
    //                     UseOTS: item.OrderHed_UseOTS,
    //                     description: equip.text.split("-")[1],
    //                     customerName: item.Customer_Name,
    //                     customerId: item.Customer_CustID,
    //                     partDescription: equip.text,
    //                     key4: item.UD12_Key4,
    //                     allDay: false,
    //                   });
    //                 }
    //               }
    //             });
    //             // console.log(dataArray);
    //             dataSourceRef.current = dataArray;
    //             setDataSource(dataArray);
    //           }
    //
    //           setBusy(false);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //           setBusy(false);
    //         });
    //     // });
    //     setBusy(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setBusy(false);
    //   });
  }, []);
  useEffect(() => {
    if (freeOrBusyEquip.length > 0) {
      freeOrBusyEquipClickHandler();
    }
  }, [freeOrBusyEquip, freeOrBusyEquipCheckBox]);
  const onEquipSearch = () => {
    let array = [],
      dataSourceArray = [];
    let yesbusy = false;
    if (selectedQuipDate.length > 0) {
      setSelectEquipDateStatus(true);
      const searchFromDate = new Date(selectedQuipDate[0]);
      const searchToDate = new Date(selectedQuipDate[1]);
      headersData.forEach((header) => {
        yesbusy = false;
        dataSourceRef.current.forEach((order) => {
          const fromData = new Date(order.startDate);
          const toData = new Date(order.endDate);
          if (order.type === header.id) {
            // console.log(
            //   "yes",
            //   searchFromDate.toDateString(),
            //   searchToDate.toDateString(),
            //   fromData.toDateString(),
            //   toData.toDateString()
            // );
            if (
              searchFromDate.getTime() >= fromData.getTime() &&
              searchToDate.getTime() <= toData.getTime()
            ) {
              yesbusy = true;
            }
          }
        });
        array.push({
          busy: yesbusy,
          id: header.id,
          text: header.text,
          color: header.color,
        });
      });
      setFreeOrBusyEquip(array);
    }
  };
  const freeOrBusyEquipClickHandler = () => {
    setDataSource(dataSourceRef.current);
    let prevHeader = [],
      array = [];
    if (freeOrBusyEquipCheckBox) {
      freeOrBusyEquip.forEach((equip) => {
        if (!equip.busy) {
          const prev = prevHeader.filter((pH) => {
            return pH === equip.id;
          });
          if (prev.length === 0) {
            const header = headerDataRef.current.filter((header) => {
              return header.id === equip.id;
            });
            array.push(header[0]);
          }
          prevHeader.push(equip.id);
        }
      });
    } else {
      freeOrBusyEquip.forEach((equip) => {
        if (equip.busy) {
          const prev = prevHeader.filter((pH) => {
            return pH === equip.id;
          });
          if (prev.length === 0) {
            const header = headerDataRef.current.filter((header) => {
              return header.id === equip.id;
            });
            array.push(header[0]);
          }
          prevHeader.push(equip.id);
        }
      });
    }
    if (array.length > 0) {
      setHeaderData(array);

      searchTimeHeaderRef.current = array;
    } else {
      setHeaderData([]);
      setDataSource([]);
    }
  };
  const onDateChange = React.useCallback((e) => {
    console.log("Date-->", e);
    let date, lastDay, firstDay;
    if (e) {
      date = new Date(moment(e).format("YYYY-MM-DD"));
      setCurrentDate(date);
    } else {
      date = new Date(moment(currentDate).format("YYYY-MM-DD"));
    }
    firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    if (leasingCurrentView.current === "month") {
      lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    } else if (leasingCurrentView.current === "quarter") {
      lastDay = new Date(date.getFullYear(), date.getMonth() + 3, 0);
    } else if (leasingCurrentView.current === "year") {
      lastDay = new Date(date.getFullYear(), date.getMonth() + 12, 0);
    } else if (leasingCurrentView.current === "week") {
      if (e) {
        date = new Date(moment(e).format("YYYY-MM-DD"));
        firstDay = new Date(
          `${date.getFullYear()}-${date.getMonth() + 1}- ${date.getDate()}`
        );
        date.setDate(date.getDate() + 14);
        lastDay = new Date(
          `${date.getFullYear()}-${date.getMonth() + 1}- ${date.getDate()}`
        );
      } else {
        date = new Date(moment(currentDate).format("YYYY-MM-DD"));
        firstDay = new Date(
          `${date.getFullYear()}-${date.getMonth()}- ${date.getDate()}`
        );
        lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      }
    }

    getAllHeadersAndData(firstDay, lastDay);
  }, []);
  let dataCellComponent = React.useCallback((props) => {
    let flag = false;
    let cellStartDate = new Date(
      moment(new Date(props.data.startDate)).format("YYYY:MM:DD")
    );
    let searchFromDate = new Date(
      moment(new Date(selectedQuipDate[0]).getTime()).format("YYYY:MM:DD")
    );
    let searchToDate = new Date(
      moment(new Date(selectedQuipDate[1]).getTime()).format("YYYY:MM:DD")
    );
    if (
      cellStartDate.getTime() >= searchFromDate.getTime() &&
      cellStartDate.getTime() <= searchToDate.getTime()
    ) {
      flag = true;
    }
    if (freeOrBusyEquip.length > 0) {
      return (
        <>
          <DataCellComponent
            data={props.data}
            selectedQuipDate={selectedQuipDate}
            freeOrBusyEquip={freeOrBusyEquip}
            headerDataRef={headerDataRef.current}
            allCustomers={allCustomers}
            dataSourceRef={dataSourceRef}
            dataSource={dataSource}
            setDataSource={setDataSource}
          />
        </>
      );
    }
  }, []);
  let resourceCellComponent = React.useCallback((e) => {
    return (
      <ResourceComponent
        e={e}
        freeOrBusyEquip={freeOrBusyEquip}
        date={selectedQuipDate}
        dateStatus={selectEquipDateStatus}
      />
    );
  }, []);
  let appointmentComponent = React.useCallback((e) => {
    return (
      <CellComponent
        e={e}
        headerDataRef={headerDataRef.current}
        allCustomers={allCustomers}
        dataSourceRef={dataSourceRef}
        dataSource={dataSource}
        setDataSource={setDataSource}
        currentView={leasingCurrentView.current}
      />
    );
  }, []);
  let onAppointmentFormOpening = React.useCallback((e) => {
    setBusy(true);
    e.cancel = true;
    selectedOrderOrQuoteData.current = e.appointmentData;
    selectedOrderOrQuoteData.current.headers = headerDataRef.current;
    selectedOrderOrQuoteData.current.customers = allCustomers;
    selectedOrderOrQuoteData.current.dataSourceRef = dataSourceRef;
    selectedOrderOrQuoteData.current.dataSource = dataSource;
    selectedOrderOrQuoteData.current.setDataSource = setDataSource;
    if (
      e.appointmentData.orderId === undefined &&
      e.appointmentData.orderId !== "" &&
      e.appointmentData.type !== " "
    ) {
      setVisibleFormModal(true);
    }
    setBusy(false);
  }, []);

  let toolTipRender = React.useCallback((e) => {
    const { appointmentData } = e;
    const d = appointmentData;
    return (
      <>
        <div className="d-flex flex-row justify-content-between">
          <span>
            {"Start Date: "}
            {moment(d.startDate).format("YYYY-MM-DD")}
            {"-End Date: "}
            {moment(d.endDate).format("YYYY-MM-DD")}
          </span>
          <span className="mx-1">Total:{parseInt(d.cost).toFixed(2)}$</span>
        </div>
      </>
    );
  }, []);
  let dataCellRender = React.useCallback((e) => {
    return (
      <>
        <div className={"text-center"}>
          <div>{e.text.split(" ")[0]}</div>
          {moment(e.date).format("D")}
          {"/"}
          {moment(e.date).format("M")}
        </div>
      </>
    );
  }, []);
  return (
    <Spin spinning={busy}>
      <div
        style={{
          backgroundColor: "white",
          minHeight: "80vh",
        }}
        className={"weekLeasing"}
      >
        <div
          className="mx-1"
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span className="mx-1" style={{ fontSize: "13px" }}>
              Search Equipment free/busy?
            </span>
            <Checkbox
              className={"mx-1"}
              checked={freeOrBusyEquipCheckBox}
              // value={freeOrBusyEquipCheckBox}
              defaultChecked={freeOrBusyEquipCheckBox}
              onChange={(e) => {
                setFreeOrBusyEquipCheckBox(e.target.checked);
              }}
            />
            <DatePicker.RangePicker
              className="datePickerClass"
              onChange={(e, d) => {
                // console.log("DATE CHANGE", e, d);
                if (d[0] !== "") {
                  setSelectedQuipDate(d);
                  setFreeOrBusyEquip([]);
                } else {
                  setHeaderData(headerDataRef.current);
                  setSelectEquipDateStatus(false);
                  setSelectedQuipDate([]);
                }
              }}
            />
            <Button
              className="mx-2"
              type="primary"
              shape="circle"
              icon={<SearchOutlined onClick={onEquipSearch} />}
            />

            <Input.Search
              allowClear
              style={{
                width: "20%",
                border: 0,
                fontSize: "13px",
                borderColor: "transparent",
              }}
              placeholder="Search Equipment"
              onSearch={(value) => {
                if (value.length > 0) {
                  setIsFilter(true);
                  let filterData;
                  if (freeOrBusyEquip.length > 0) {
                    if (freeOrBusyEquipCheckBox) {
                      let freeHeaders = freeOrBusyEquip.filter((equip) => {
                        return !equip.busy;
                      });
                      if (freeHeaders.length > 0) {
                        let data = [];
                        freeHeaders.forEach((freeHeader) => {
                          dataSourceRef.current.forEach((order) => {
                            if (
                              order.type === freeHeader.id &&
                              (order.text
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                                order.customerId
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                order.partDescription
                                  .toLowerCase()
                                  .includes(value.toLowerCase()))
                            ) {
                              data.push(order);
                            }
                          });
                        });
                        filterData = data;
                        // console.log("filterData IN FREE", filterData);
                      } else {
                        filterData = [];
                        setDataSource([]);
                        setHeaderData([]);
                      }
                    } else {
                      let busyHeaders = freeOrBusyEquip.filter((equip) => {
                        return equip.busy;
                      });
                      if (busyHeaders.length > 0) {
                        let data = [];
                        busyHeaders.forEach((busyHeader) => {
                          dataSourceRef.current.forEach((order) => {
                            if (
                              order.type === busyHeader.id &&
                              (order.text
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                                order.customerId
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                order.partDescription
                                  .toLowerCase()
                                  .includes(value.toLowerCase()))
                            ) {
                              data.push(order);
                            }
                          });
                        });
                        filterData = data;
                      } else {
                        filterData = [];
                        setDataSource([]);
                        setHeaderData([]);
                      }
                    }
                  } else {
                    filterData = dataSourceRef.current.filter((order) => {
                      return (
                        order.text
                          .toLowerCase()
                          .includes(value.toLowerCase()) ||
                        order.customerId
                          .toLowerCase()
                          .includes(value.toLowerCase()) ||
                        order.partDescription
                          .toLowerCase()
                          .includes(value.toLowerCase())
                      );
                    });
                  }
                  let headerArray = [],
                    prevHeader = [];
                  filterData.forEach((fD) => {
                    const prev = prevHeader.filter((pH) => {
                      return pH === fD.type;
                    });
                    if (prev.length === 0) {
                      const header = headerDataRef.current.filter((header) => {
                        return header.id === fD.type;
                      });
                      headerArray.push(header[0]);
                    }
                    prevHeader.push(fD.type);
                  });
                  headerArray.sort((a, b) => {
                    return a.text
                      .split("-")[0]
                      .localeCompare(b.text.split("-")[0]);
                  });
                  setHeaderData(headerArray);
                  setDataSource(filterData);
                  searchHeaderRef.current = headerArray;
                  searchDataSourceRef.current = filterData;
                } else {
                  // setIsFilter(false);
                  if (freeOrBusyEquip.length > 0) {
                    let filterData;
                    if (freeOrBusyEquipCheckBox) {
                      let freeHeaders = freeOrBusyEquip.filter((equip) => {
                        return !equip.busy;
                      });
                      if (freeHeaders.length > 0) {
                        freeHeaders.sort((a, b) => {
                          return a.text
                            .split("-")[0]
                            .localeCompare(b.text.split("-")[0]);
                        });
                        setHeaderData(freeHeaders);
                        let data = [];
                        freeHeaders.forEach((freeHeader) => {
                          dataSourceRef.current.forEach((order) => {
                            if (order.type === freeHeader.id) {
                              data.push(order);
                            }
                          });
                        });
                        filterData = data;
                        setDataSource(dataSourceRef.current);
                      } else {
                        filterData = [];
                        setDataSource([]);
                        setHeaderData([]);
                      }
                    } else {
                      let busyHeaders = freeOrBusyEquip.filter((equip) => {
                        return equip.busy;
                      });
                      if (busyHeaders.length > 0) {
                        busyHeaders.sort((a, b) => {
                          return a.text
                            .split("-")[0]
                            .localeCompare(b.text.split("-")[0]);
                        });
                        setHeaderData(busyHeaders);
                        let data = [];
                        busyHeaders.forEach((busyHeader) => {
                          dataSourceRef.current.forEach((order) => {
                            if (order.type === busyHeader.id) {
                              data.push(order);
                            }
                          });
                        });
                        filterData = data;
                        setDataSource(dataSourceRef.current);
                      } else {
                        filterData = [];
                        setDataSource([]);
                        setHeaderData([]);
                      }
                    }
                    setDataSource(dataSourceRef.current);
                  } else {
                    setDataSource(dataSourceRef.current);
                    setHeaderData(headerDataRef.current);
                  }
                }
              }}
            />
            <Button
              className="mx-2"
              type="primary"
              shape="circle"
              icon={
                <ClearOutlined
                  onClick={() => {
                    setIsFilter(false);
                    setHeaderData(headerDataRef.current);
                    setDataSource(dataSourceRef.current);
                    setFreeOrBusyEquip([]);
                  }}
                />
              }
            />
          </div>
          <div>
            <span
              className="text-center"
              style={{
                backgroundColor: NON_QUOTED_CLR,
                fontSize: "13px",
                color: "white",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
              }}
            >
              New Quoted
            </span>
            <span
              className="text-center"
              style={{
                backgroundColor: QUOTED_CLR,
                fontSize: "13px",
                color: "#ffffff",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
              }}
            >
              Quoted
            </span>
            <span
              className="text-center"
              style={{
                backgroundColor: OPEN_ORDER_CLR,
                fontSize: "13px",
                color: "#ffffff",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
              }}
            >
              Ordered
            </span>
            <span
              className="text-center"
              style={{
                backgroundColor: CLOSE_ORDER_CLR,
                fontSize: "13px",
                color: "white",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
              }}
            >
              Delivered
            </span>
          </div>
        </div>
        <div>
          <Scheduler
            timeZone={"Etc/GMT" + currentOffset}
            dataSource={dataSource}
            showCurrentTimeIndicator={false}
            shadeUntilCurrentTime={true}
            defaultCurrentView="timelineMonth"
            groups={groups}
            views={views}
            editing={true}
            currentDate={currentDate}
            defaultCurrentDate={currentDate}
            onCurrentDateChange={onDateChange}
            onCurrentViewChange={(e) => {
              leasingCurrentView.current = e.toLowerCase();
              onDateChange();
            }}
            // className={
            //   leasingCurrentView.current !== "week"
            //     ? "allTimeLineView"
            //     : "weeklyTimeLineView"
            // }
            crossScrollingEnabled={true}
            dataCellComponent={dataCellComponent}
            resourceCellComponent={resourceCellComponent}
            onContentReady={(e) => {
              if (leasingCurrentView.current === "quarter") {
                const container = e.element;
                if (container.querySelector(".my-custom-row")) return;
                let tableHeader = container.querySelector(
                  ".dx-scheduler-header-panel > thead"
                );
                let r = "";
                const date = moment([
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  1,
                ]);
                const endDate = moment([
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 3,
                  0,
                ]);
                console.log("DIFF-->", date.diff(endDate, "weeks"));
                for (let i = 0; i < 13; i++) {
                  r += `<th style="width:350px !important; text-align:center; border-left:solid red 2px; border-right:solid red 2px" colSpan="7" >Week ${
                    i + 1
                  } </th>`;
                }
                let string = `<tr class="my-custom-row dx-scheduler-header-row">${r}</tr>`;
                // tableHeader.innerHTML = string;
                tableHeader.insertAdjacentHTML("afterbegin", string);
              }
              // else if (leasingCurrentView.current === "year") {
              //   const container = e.element;
              //   let tableHeader = container.querySelector(
              //     ".dx-scheduler-header-panel > thead"
              //   );
              //   if (container.querySelector(".my-custom-row")) {
              //     tableHeader.remove(".my-custom-row");
              //   }
              //   if (container.querySelector(".my-custom-month")) {
              //     return;
              //   }
              //   // let tableHeader = container.querySelector(
              //   //   ".dx-scheduler-header-panel > thead"
              //   // );
              //   let r = "";
              //   for (let i = 0; i < 12; i++) {
              //     r += `<th style="width:23% !important; text-align:center; border-left:solid red 2px; border-right:solid red 2px" colSpan="7" >Month ${
              //       i + 1
              //     } </th>`;
              //   }
              //   let string = `<tr class="my-custom-month dx-scheduler-header-row">${r}</tr>`;
              //   // tableHeader.innerHTML = string;
              //   tableHeader.insertAdjacentHTML("afterbegin", string);
              // }
            }}
            appointmentComponent={appointmentComponent}
            onAppointmentFormOpening={onAppointmentFormOpening}
            appointmentTooltipRender={toolTipRender}
            onAppointmentUpdating={(e) => {
              e.cancel = true;
            }}
            dateCellRender={dataCellRender}
            // dateCellTemplate={(e) => {
            //   return (
            //     <>
            //       <div className={"text-center"}>
            //         <div>{e.text.split(" ")[0]}</div>
            //         {moment(e.date).format("D")}
            //         {"/"}
            //         {moment(e.date).format("M")}
            //       </div>
            //     </>
            //   );
            // }}
            // dateCellComponent={(e) => {
            // console.log(moment(currentDate).format("YYYY-MM"));
            // console.log(moment(e.data.date).format("YYYY-MM"));
            // if (
            //   moment(currentDate).format("YYYY-MM") ===
            //   moment(e.data.date).format("YYYY-MM")
            // ) {
            // return (
            //     <>
            //       <div className={"text-center"}>
            //         <div>{e.data.text.split(" ")[0]}</div>
            //         {moment(e.data.date).format("D")}
            //         {"/"}
            //         {moment(e.data.date).format("M")}
            //       </div>
            //     </>
            // );
            // onAppointmentAdded={(e) => {
            //   const data = e.appointmentData;
            //   // console.log("on added-->", data);
            //   let { startDate, endDate, type, description } = data;
            //   data.type = type[0];
            //   let cName = allCustomers.find((c) => {
            //     return c.CustNum === data.customerName;
            //   });
            //   setBusy(true);
            //   if (
            //     data.orderOrQuote === false ||
            //     data.orderOrQuote === undefined
            //   ) {
            //     LeasingModuleApi.addAppointmentData({
            //       custNum: data.customerName,
            //       description: description,
            //       fromData: moment(startDate).format("YYYY-MM-DD"),
            //       toDate: moment(endDate).format("YYYY-MM-DD"),
            //       customerName: cName.Name,
            //       partNum: type[0],
            //       shipToNum: data.checkBox ? "" : data.address,
            //       UseOTS: data.checkBox ? true : false,
            //       otsName: data.checkBox ? data.otsName : "",
            //       otsAddress1: data.checkBox ? data.otsAddress1 : "",
            //       otsAddress2: data.checkBox ? data.otsAddress2 : "",
            //       otsCity: data.checkBox ? data.otsCity : "",
            //       otsZip: data.checkBox ? data.otsZip : "",
            //     })
            //       .then((res) => {
            //         // const res = apiRes[0];
            //         // console.log("After Added Response-->", res);
            //         data.text =
            //           parseInt(res.UD12_Number01).toFixed(0).toString() +
            //           " " +
            //           parseInt(res.UD12_Number02).toFixed(0).toString();
            //         // "-" +
            //         // res.UD12_Character01.split("From")[0];
            //         data.orderId = parseInt(res.UD12_Number01).toFixed(0);
            //         data.customerName = cName.Name;
            //         if (startDate !== endDate) {
            //           data.endDate = new Date(
            //             moment(endDate).format("YYYY-MM-DD") + "T" + "23:30:00"
            //           );
            //         }
            //         data.UseOTS = data.checkBox ? "true" : "false";
            //         data.customerId = parseInt(res.Customer_CustID).toFixed(0);
            //         data.otsAddress1 = res.OTSAddress1;
            //         data.otsAddress2 = res.OTSAddress2;
            //         data.otsName = res.OTSName;
            //         data.otsCity = res.OTSCity;
            //         data.otsZip = res.OTSZIP;
            //         data.address = res.ShipToNum;
            //         data.customerName = res.Customer_Name;
            //         setBusy(false);
            //       })
            //       .catch((err) => {
            //         console.log(err);
            //         setBusy(false);
            //       });
            //   } else {
            //     data.startDate = new Date(1999, 0, 1);
            //     data.endDate = new Date(1999, 0, 1);
            //     LeasingModuleApi.addQuote({
            //       custNum: data.customerName,
            //       fromDate: moment(data.startDate).format("YYYY-MM-DD"),
            //       toDate: moment(data.endDate).format("YYYY-MM-DD"),
            //       dueDate: moment(data.dueDate).format("YYYY-MM-DD"),
            //       partNum: type[0],
            //       lineDesc: data.description,
            //       customerName: cName.Name,
            //       shipToNum: data.checkBox ? "" : data.address,
            //       customerCustId: cName.CustID,
            //     })
            //       .then((res) => {
            //         // console.log("AFter added quotes");
            //         setBusy(false);
            //       })
            //       .catch((err) => {
            //         console.log(err);
            //         setBusy(false);
            //       });
            //   }
            // }}
            // onAppointmentDblClick={(e) => {
            //   console.log("DBL CLICK-->", e);
            // }}
          >
            <Resource
              fieldExpr="type"
              allowMultiple={false}
              dataSource={headersData}
              label="Header"
            />
            <Scrolling mode="virtual" />
          </Scheduler>
        </div>

        {visibleFormModal && (
          <MyFormModal
            setDataSource={setDataSource}
            detail={selectedOrderOrQuoteData.current}
            visible={visibleFormModal}
            setVisible={setVisibleFormModal}
          />
        )}
      </div>
    </Spin>
  );
};
export default memo(DeliveryModule);
