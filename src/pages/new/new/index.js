import React, { useEffect } from "react";
import moment from "moment";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson } from "@mobiscroll/react";
import { Button, Spin } from "antd";
import { LeasingModuleApi } from "../../api";
import { ResourceData } from "../leasing/data";
import "./style.scss";
import {
  CLOSE_ORDER_CLR,
  NON_QUOTED_CLR,
  OPEN_ORDER_CLR,
  QUOTED_CLR,
} from "../leasing/color";
import MyFormModal from "../../components/shared/myFormModal";

function App() {
  const HEADER_COLOR = "#00000000";
  const [dataSource, setDataSource] = React.useState([]);
  const dataSourceRef = React.useRef([]);
  const [headersData, setHeaderData] = React.useState(ResourceData);
  const headerDataRef = React.useRef([]);
  const [busy, setBusy] = React.useState(false);
  const [selectedDevice, setSelectedDevice] = React.useState("material");
  const [allCustomers, setAllCustomers] = React.useState([]);
  const [currentOffset, setCurrentOffset] = React.useState("-3");
  const [view, setView] = React.useState("month");
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [visibleFormModal, setVisibleFormModal] = React.useState(false);
  const selectedOrderOrQuoteData = React.useRef({});

  const [calView, setCalView] = React.useState({
    timeline: {
      type: "month",
      eventList: true,
    },
  });

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
  const getAllHeadersAndData = (fromDate, toDate) => {
    setBusy(true);
    LeasingModuleApi.getAllHeaderOfEquipment()
      .then((res) => {
        let array = [];
        if (res.length > 0) {
          res.forEach((item) => {
            array.push({
              name: item.Part_PartNum + "-" + item.Part_PartDescription,
              text: item.Part_PartNum + "-" + item.Part_PartDescription,
              id: item.Part_PartNum,
              color: "black",
            });
          });
          array.sort((a, b) => {
            return a.name.split("-")[0].localeCompare(b.name.split("-")[0]);
          });
          // array.push({
          //   name: " ",
          //   id: " ",
          //   color: HEADER_COLOR,
          // });
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
                    const orderOrQuote =
                      item.UD12_ShortChar01 === "Order"
                        ? "Order Id: "
                        : "Quoate Id: ";
                    dataArray.push({
                      title: `${orderOrQuote}${parseInt(item.UD12_Number01)
                        .toFixed(0)
                        .toString()} Line: ${parseInt(item.UD12_Number02)
                        .toFixed(0)
                        .toString()} Cust Id: ${item.Customer_CustID}
                        Customer Name: ${item.Customer_Name}`,
                      text: `${orderOrQuote}${parseInt(item.UD12_Number01)
                        .toFixed(0)
                        .toString()} Line: ${parseInt(item.UD12_Number02)
                        .toFixed(0)
                        .toString()} Cust Id: ${
                        item.Customer_CustID
                      }~Customer Name: ${item.Customer_Name}`,
                      type: item.UD12_Key1,
                      resource: item.UD12_Key1,
                      orderId:
                        item.UD12_ShortChar01 === "Order"
                          ? parseInt(item.UD12_Number01).toFixed(0)
                          : "",
                      quoteId:
                        item.UD12_ShortChar01 === "Quote"
                          ? parseInt(item.UD12_Number01).toFixed(0)
                          : "",
                      color:
                        item.UD12_ShortChar01 !== "Quote"
                          ? item.OrderHed_OpenOrder
                            ? OPEN_ORDER_CLR
                            : CLOSE_ORDER_CLR
                          : item.OrderHed_OpenOrder
                          ? QUOTED_CLR
                          : NON_QUOTED_CLR,
                      cost: item.OrderHed_InTotalCharges,
                      status: item.OrderHed_OpenOrder,
                      start: item.UD12_Date01,
                      startDate: item.UD12_Date01,
                      end: `${item.UD12_Date02.split("T")[0]}T23:30`,
                      endDate: `${item.UD12_Date02.split("T")[0]}T23:30`,
                      otsAddress1: item.OrderHed_OTSAddress1,
                      otsAddress2: item.OrderHed_OTSAddress2,
                      otsName: item.OrderHed_OTSName,
                      otsCity: item.OrderHed_OTSCity,
                      otsZip: item.OrderHed_OTSZIP,
                      shipToNum: item.OrderHed_ShipToNum,
                      UseOTS: item.OrderHed_UseOTS,
                      description: equip.name.split("-")[1],
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
              console.log(dataArray);
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
  };
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
  }, []);
  const [myEvents, setEvents] = React.useState([]);
  const [selectedView, setSelectedView] = React.useState(1);
  const selectedViewRef = React.useRef(0);
  const [myTimeLineView, setMyTimeLineView] = React.useState([
    {
      type: "week",
      timeCellStep: 1440,
      timeLabelStep: 1440,
      size: 2,
      eventList: true,
      rowHeight: "equal",
    },
    {
      type: "month",
      size: 1,
      eventList: true,
      rowHeight: "equal",
    },
    {
      type: "month",
      size: 3,
      startDay: 1,
      endDay: 7,
      eventList: true,
      weekNumbers: true,
      rowHeight: "equal",
    },
    {
      type: "year",
      eventList: true,
      rowHeight: "equal",
    },
  ]);

  const view1 = React.useMemo(() => {
    return {
      timeline: myTimeLineView[selectedView],
    };
  }, [myTimeLineView, selectedView]);

  const myResources = React.useMemo(() => {
    return [
      {
        id: 1,
        name: "Flatiron Room",
        color: "#fdf500",
      },
      {
        id: 2,
        name: "The Capital City",
        color: "#ff0101",
      },
      {
        id: 3,
        name: "Heroes Square",
        color: "#01adff",
      },
      {
        id: 4,
        name: "Thunderdome",
        color: "#ff4600",
      },
      {
        id: 5,
        name: "King’s Landing",
        color: "#239a21",
      },
      {
        id: 6,
        name: "Gathering Field",
        color: "#8f1ed6",
      },
    ];
  }, []);

  React.useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/daily-weekly-events/",
      (events) => {
        console.log(events);
        setEvents(events);
      },
      "jsonp"
    );
  }, []);
  const changeView = (event) => {
    let calView;

    switch (event.target.value) {
      case "workweek":
        calView = {
          timeline: {
            type: "week",
            eventList: true,
            startDay: 1,
            endDay: 6,
          },
        };
        break;
      case "week":
        calView = {
          timeline: {
            type: "week",
            eventList: true,
          },
        };
        break;
      case "month":
      default:
        calView = {
          timeline: {
            type: "month",
            eventList: true,
          },
        };
        break;
    }

    setView(event.target.value);
    setCalView(calView);
  };
  const onEventUpdate = React.useCallback((args) => {
    MyFormModal();
  }, []);

  let onDateChange = (e) => {
    let date, lastDay, firstDay;
    if (e) {
      date = new Date(moment(e.date).format("YYYY-MM-DD"));
      setCurrentDate(date);
    } else {
      date = new Date(moment(currentDate).format("YYYY-MM-DD"));
    }
    firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    if (selectedViewRef.current === 1) {
      lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    } else if (selectedViewRef.current === 2) {
      lastDay = new Date(date.getFullYear(), date.getMonth() + 3, 0);
    } else if (selectedViewRef.current === 3) {
      lastDay = new Date(date.getFullYear(), date.getMonth() + 12, 0);
    } else if (selectedViewRef.current === 0) {
      if (e) {
        date = new Date(moment(e.date).format("YYYY-MM-DD"));
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
  };
  let getMyObject = (body) => {
    return {
      text: "title" in body ? body.title : "",
      type: "type" in body ? body.resource : "",
      resource: "resource" in body ? body.resource : "",
      orderId: "orderId" in body ? body.orderId : "",
      quoteId: "quoteId" in body ? body.quoteId : "",
      color: "color" in body ? body.color : "",
      cost: "cost" in body ? body.cost : "",
      status: "status" in body ? body.status : "",
      startDate:
        "date" in body ? body.date : "startDate" in body ? body.startDate : "",
      endDate:
        "date" in body ? body.date : "endDate" in body ? body.endDate : "",
      otsAddress1: "otsAddress1" in body ? body.otsAddress1 : "",
      otsAddress2: "otsAddress2" in body ? body.otsAddress2 : "",
      otsName: "otsName" in body ? body.otsName : "",
      otsCity: "otsCity" in body ? body.otsCity : "",
      otsZip: "otsZip" in body ? body.otsZip : "",
      shipToNum: "shipToNum" in body ? body.shipToNum : "",
      UseOTS: "UseOTS" in body ? body.UseOTS : "",
      description: "description" in body ? body.description : "",
      customerName: "customerName" in body ? body.customerName : "",
      customerId: "customerId" in body ? body.customerId : "",
      partDescription: "partDescription" in body ? body.partDescription : "",
      key4: "key4" in body ? body.key4 : "",
      allDay: false,
    };
  };
  React.useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);
  const eventContent = React.useCallback((args) => {
    const event = args.original;
    console.log(event);
    return (
      <div className="md-meal-planner-event">
        <div
          className="md-meal-planner-event-title"
          style={{ fontSize: "10px" }}
        >
          {event?.text?.split("~")[0]}
        </div>
        <div
          className="md-meal-planner-event-desc"
          style={{ fontSize: "10px" }}
        >
          {event?.text?.split("~")[1]}
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setSelectedView(0);
            selectedViewRef.current = 0;
            onDateChange();
          }}
        >
          Week
        </Button>
        <Button
          onClick={() => {
            setSelectedView(1);
            selectedViewRef.current = 1;
            onDateChange();
          }}
        >
          Month
        </Button>
        <Button
          onClick={() => {
            setSelectedView(2);
            selectedViewRef.current = 2;
            onDateChange();
          }}
        >
          Quarter
        </Button>
        <Button
          onClick={() => {
            setSelectedView(3);
            selectedViewRef.current = 3;
            onDateChange();
          }}
        >
          Year
        </Button>
        <Button
          onClick={() => {
            setSelectedDevice("ios");
          }}
        >
          IOS
        </Button>
        <Button
          onClick={() => {
            setSelectedDevice("material");
          }}
        >
          Windows
        </Button>
      </div>
      <Spin spinning={busy}>
        <Eventcalendar
          dataTimezone={"Etc/GMT" + currentOffset}
          theme={selectedDevice}
          refDate={currentDate}
          themeVariant="light"
          dragToResize={true}
          view={view1}
          data={dataSource}
          clickToCreate={true}
          onEventDoubleClick={(e) => {
            // console.log(e);
            // console.log(getMyObject(e.event));
            selectedOrderOrQuoteData.current = getMyObject(e.event);
            selectedOrderOrQuoteData.current.headers = headerDataRef.current;
            selectedOrderOrQuoteData.current.customers = allCustomers;
            selectedOrderOrQuoteData.current.dataSourceRef = dataSourceRef;
            selectedOrderOrQuoteData.current.dataSource = dataSource;
            selectedOrderOrQuoteData.current.setDataSource = setDataSource;
            setVisibleFormModal(true);
          }}
          renderScheduleEventContent={eventContent}
          // renderScheduleEvent={(e) => {
          //   // console.log(e);
          //   return <CellComponent e={e} />;
          // }}
          onEventCreated={(e) => {
            console.log(e);
            const dataCopy = [...dataSource];
            e.event.text = `Quote: 876 Line: 1 Cust Id: 8769~Customer Name: Name`;
            dataCopy.push({
              id: e.event.id,
              title: `Titles Here`,
              text: `Title here ~Customer Name: Name here`,
              type: e.event.resource,
              resource: e.event.resource,
              color: NON_QUOTED_CLR,
              start: moment(e.event.start).format("YYYY-MM-DD") + "T00:00:00",
              end: moment(e.event.start).format("YYYY-MM-DD") + "T23:30",
              allDay: false,
            });
            console.log(dataCopy);
            setDataSource(dataCopy);
          }}
          onCellDoubleClick={(e) => {
            console.log(e);
            selectedOrderOrQuoteData.current = getMyObject(e);
            selectedOrderOrQuoteData.current.headers = headerDataRef.current;
            selectedOrderOrQuoteData.current.customers = allCustomers;
            selectedOrderOrQuoteData.current.dataSourceRef = dataSourceRef;
            selectedOrderOrQuoteData.current.dataSource = dataSource;
            selectedOrderOrQuoteData.current.setDataSource = setDataSource;
            setVisibleFormModal(true);
          }}
          onEventClick={(e) => {
            const datea = e.event;
          }}
          resources={headersData}
          onSelectedDateChange={onDateChange}
          cssClass="md-meal-planner-calendar"
        />
      </Spin>
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
}

export default App;
