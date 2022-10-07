import React, { useEffect } from "react";
import { Button, Checkbox, DatePicker, Input, Spin } from "antd";
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { LeasingModuleApi } from "../../api";
// import Query from "devextreme/data/query";
import moment from "moment";
import MyFormModal from "../../components/shared/myFormModal";
import { ResourceData } from "./data";
import "./leasingStyle.scss";
// import "../lightMain.css";
import {
  CLOSE_ORDER_CLR,
  NON_QUOTED_CLR,
  OPEN_ORDER_CLR,
  QUOTED_CLR,
} from "./color";
import { useDispatch, useSelector } from "react-redux";
// import "devextreme/dist/css/dx.light.css";
// import DatePicker from "react-datepicker";
import MyScheduler from "./myScheduler";
import DataCellComponent from "./dataCellComponent";
import CellComponent from "./cellComponent";
import {
  getDataSourceRedux,
  setDataSourceRedux,
  setDateInRedux,
  setFreeOrBusyEquipInRedux,
} from "../../redux/leasing";

const DeliveryModule = () => {
  const reduxData = useSelector(getDataSourceRedux);
  const HEADER_COLOR = "#00000000";
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedQuipDate, setSelectedQuipDate] = React.useState([]);
  const [currentOffset, setCurrentOffset] = React.useState("-3");
  const [busy, setBusy] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const dispatch = useDispatch();

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
  const allCustomersRef = React.useRef([]);
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
              dispatch(setDataSourceRedux(dataArray));
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
        allCustomersRef.current = custArray;
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

  /* Function released from inline:*/

  const onAppointmentFormOpening = React.useCallback((e) => {
    e.cancel = true;
    selectedOrderOrQuoteData.current = e.appointmentData;
    selectedOrderOrQuoteData.current.headers = headerDataRef.current;
    selectedOrderOrQuoteData.current.customers = allCustomersRef.current;
    selectedOrderOrQuoteData.current.dataSourceRef = dataSourceRef;
    selectedOrderOrQuoteData.current.dataSource = dataSourceRef.current;
    selectedOrderOrQuoteData.current.setDataSource = setDataSource;
    if (
      e.appointmentData.orderId === undefined &&
      e.appointmentData.orderId !== "" &&
      e.appointmentData.type !== " "
    ) {
      setVisibleFormModal(true);
    }
  }, []);

  const dataCellComponent = React.useCallback((p) => {
    return (
      <>
        <DataCellComponent
          data={p.data}
          selectedQuipDate={selectedQuipDate}
          date={selectedQuipDate}
          freeOrBusyEquip={freeOrBusyEquip}
          headerDataRef={headerDataRef.current}
          allCustomers={allCustomers}
          dataSourceRef={dataSourceRef}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      </>
    );
  }, []);
  const appointmentComponent = React.useCallback((e) => {
    return (
      <CellComponent
        e={e}
        headerDataRef={headerDataRef.current}
        allCustomers={allCustomers}
        allCustomerRef={allCustomersRef}
        dataSourceRef={dataSourceRef}
        dataSource={dataSource}
        setDataSource={setDataSource}
        currentView={leasingCurrentView.current}
      />
    );
  }, []);
  React.useEffect(() => {
    setDataSource(reduxData);
    dataSourceRef.current = reduxData;
  }, [reduxData]);
  React.useEffect(() => {
    dispatch(setFreeOrBusyEquipInRedux(freeOrBusyEquip));
  }, [freeOrBusyEquip]);
  React.useEffect(() => {
    dispatch(setDateInRedux(selectedQuipDate));
  }, [selectedQuipDate]);

  let onAppointmentDoubleClick = React.useCallback((e) => {
    console.log("DOUBLE CLICK", e);
    e.cancel = true;
    const d = JSON.parse(JSON.stringify(e.appointmentData));
    selectedOrderOrQuoteData.current = d;
    selectedOrderOrQuoteData.current.headers = headerDataRef.current;
    selectedOrderOrQuoteData.current.customers = allCustomersRef.current;
    selectedOrderOrQuoteData.current.dataSourceRef = dataSourceRef;
    selectedOrderOrQuoteData.current.dataSource = dataSourceRef.current;
    selectedOrderOrQuoteData.current.setDataSource = setDataSource;
    Object.preventExtensions(selectedOrderOrQuoteData.current);
    setVisibleFormModal(true);
  }, []);
  let createQuote = React.useCallback(() => {
    console.log("CREATE QUOTE");
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
          <MyScheduler
            currentDate={currentDate}
            currentOffset={currentOffset}
            // dataSource={dataSource}
            dataSource={freeOrBusyEquip.length > 0 ? dataSource : reduxData}
            dataSourceRef={dataSourceRef}
            onDateChange={onDateChange}
            freeOrBusyEquip={freeOrBusyEquip}
            selectedQuipDate={selectedQuipDate}
            selectEquipDateStatus={selectEquipDateStatus}
            leasingCurrentView={leasingCurrentView}
            headerDataRef={headerDataRef}
            allCustomers={allCustomers}
            setDataSource={setDataSource}
            selectedOrderOrQuoteData={selectedOrderOrQuoteData}
            visibleFormModal={visibleFormModal}
            setVisibleFormModal={setVisibleFormModal}
            headersData={headersData}
            onAppointmentFormOpening={onAppointmentFormOpening}
            dataCellComponent={dataCellComponent}
            allCustomerRef={allCustomersRef}
            appointmentComponent={appointmentComponent}
            onAppointmentDoubleClick={onAppointmentDoubleClick}
          />
        </div>

        {visibleFormModal && (
          <MyFormModal
            setDataSource={setDataSource}
            createQuoate={createQuote}
            detail={selectedOrderOrQuoteData.current}
            visible={visibleFormModal}
            setVisible={setVisibleFormModal}
          />
        )}
      </div>
    </Spin>
  );
};
export default DeliveryModule;
