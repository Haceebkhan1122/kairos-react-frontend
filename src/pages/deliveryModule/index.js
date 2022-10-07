import React, { useEffect } from "react";
import Scheduler, { Resource } from "devextreme-react/scheduler";
import { DeliveryDashboardApi } from "../../api";
import MyAppointmentComponent from "./appointmentComponent";
import moment from "moment";
import { Spin } from "antd";
import {
  ArInvoiceModal,
  AttachmentModal,
  OrderDetail,
  OrderSummary,
  PackSlipModal,
  TruckDetail,
} from "../../components/shared";
import "./deliveryStyle.css";
// import "../mainStyle.css";

const DeliveryModule = () => {
  let INTERVAL_MS = 12500;
  let currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [currentOffset, setCurrentOffset] = React.useState("-3");
  const [busy, setBusy] = React.useState(false);
  const views = ["day"];
  const groups = ["type", "status"];
  const [visibleOrderSummary, setVisibleOrderSummary] = React.useState(false);
  const [visibleOrderDetail, setVisibleOrderDetail] = React.useState(false);
  const [visibleTruckDetail, setVisibleTruckDetail] = React.useState(false);
  const [visibleArInvoice, setVisibleArInvoice] = React.useState(false);
  const [visibleAttachment, setVisibleAttachment] = React.useState(false);
  const [visiblePackSlip, setVisiblePackSlip] = React.useState(false);
  const [dataArrived, setDataArrived] = React.useState(false);
  const selectedOrderSummaryId = React.useRef("");
  let orderSummaryStatus = React.useRef({});
  let selectedOrderId = React.useRef({});
  let selectedTruckDetail = React.useRef({});
  let allDaysData = [];
  const dataSourceRef = React.useRef([]);
  const intervalRef = React.useRef(null);
  const [radioButtonValues, setRadioButtonValues] = React.useState({
    time: true,
    timeDistance: false,
    distance: false,
  });
  const [headersData, setHeaderData] = React.useState([
    {
      text: "1-East",
      id: "",
    },
    {
      text: "2-West Point",
      id: "",
    },
    {
      text: "3-East West",
      id: "",
    },
    {
      text: "4-NorthEast",
      id: "",
    },
    {
      text: "5-East West1",
      id: "",
    },
    {
      text: "6-East West",
      id: "",
    },
    {
      text: "7-South West",
      id: "",
    },
    {
      text: "8-North West",
      id: "",
    },
    {
      text: "9-North East",
      id: "",
    },
    {
      text: "10-Y West",
      id: "",
    },
  ]);
  const [dataSource, setDataSource] = React.useState([]);
  useEffect(() => {
    dataSourceRef.current = dataSource;
  }, [dataSource]);
  const getUd33 = () => {
    DeliveryDashboardApi.getUd33()
      .then((res) => {
        if (dataSourceRef.current.length > 0) {
          let data;
          if (res.length > 0) {
            res.forEach((item) => {
              data = dataSourceRef.current.map((data) => {
                if (
                  data.orderId === parseInt(item.Character06) &&
                  !data.allDay
                ) {
                  data.status =
                    item.Character03 === "arrived"
                      ? "Arrived"
                      : item.Character03 === "delivered"
                      ? "Delivered"
                      : item.Character03 === "started"
                      ? "Started"
                      : item.Character03 === "Rej"
                      ? "Rej"
                      : item.Character03 === "Ack"
                      ? "Ack"
                      : "UnAck";
                }
                return data;
              });
            });
            setDataSource(data);
          }
        }
      })
      .catch((err) => {
        console.log("DeliveryModule getUd33--->", err);
      });
  };

  function setAllDay(routes) {
    let array = [];
    routes.forEach((route, i) => {
      array.push({
        text: i + 1 + "-" + route.Character06,
        id: i + 1 + "~" + route.columnDate,
      });
      allDaysData.push({
        text: i + 1 + "-" + route.Character06,
        id: i + 1 + "~" + route.columnDate,
      });
    });
    setHeaderData(array);
    return array;
  }

  function setAllOrders(data, date, optimizedRoutes, headerArray) {
    console.log("setAllOrders", optimizedRoutes);
    let myDate = new Date(date.split("T")[0] + "T00:00:00");
    let array = [];
    let drivers = data.filter((order) => {
      if (typeof order.id !== "number") {
        return order.id.toLowerCase().includes("driver");
      }
    });
    let trucks = data.filter((order) => {
      if (typeof order.id !== "number") {
        return order.id.toLowerCase().includes("truck");
      }
    });
    let orders = data.filter((order) => {
      if (typeof order.id === "number") {
        return order;
      }
    });
    let routes = data.filter((order) => {
      if (typeof order.id !== "number") {
        return order.id.toLowerCase().includes("route");
      }
    });
    // drivers
    drivers.forEach((order, i) => {
      const allDayFiltered = allDaysData.filter((header) => {
        if (header.id.split("~")[1] === order.start.split("T")[0]) {
          return header;
        }
      });
      array.push({
        text: order.title,
        startDate: myDate,
        endDate: myDate,
        type: allDayFiltered.length > 0 ? allDayFiltered[0].id : "",
        allDay: true,
        status: "allDay",
      });
    });
    // R O T D
    routes.forEach((route, i) => {
      const allDayFiltered = allDaysData.filter((header) => {
        if (header.id.split("~")[1] === route.start.split("T")[0]) {
          return header;
        }
      });
      array.push({
        text: route.title,
        startDate: myDate,
        endDate: myDate,
        type: allDayFiltered.length > 0 ? allDayFiltered[0].id : "",
        allDay: true,
        status: "allDay",
      });
    });
    // Truck
    trucks.forEach((truck, i) => {
      const allDayFiltered = allDaysData.filter((header) => {
        if (header.id.split("~")[1] === truck.start.split("T")[0]) {
          return header;
        }
      });
      array.push({
        id: truck.id,
        text: truck.title,
        startDate: myDate,
        endDate: myDate,
        type: allDayFiltered.length > 0 ? allDayFiltered[0].id : "",
        allDay: true,
        status: "allDay",
      });
    });
    // Order
    orders.forEach((order, i) => {
      const allDayFiltered = allDaysData.filter((header) => {
        if (header.id.split("~")[1] === order.end.split("T")[0]) {
          return header;
        }
      });
      let startDate = date.split("T")[0] + "T" + order.start.split("T")[1];
      let endDate = date.split("T")[0] + "T" + order.end.split("T")[1];
      array.push({
        orderId: order.id,
        text: order.description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        hasAttachments: order.Calculated_AttchAvail,
        hasPackSlips: order.Calculated_PackAvail,
        hasArInvoices: order.Calculated_InvcAvail,
        type: allDayFiltered.length > 0 ? allDayFiltered[0].id : "",
        allDay: false,
        status:
          order.className === "fc-event-solid-info"
            ? "UnAck"
            : order.className === "fc-event-solid-success"
            ? "Started"
            : order.className === "fc-event-solid-danger"
            ? "Rej"
            : order.className === "bg-light-warning"
            ? "Arrived"
            : order.className === "fc-event-solid-primary"
            ? "Delivered"
            : "Ack",
        eTa: "",
      });
    });

    // Optimized Order
    // allDaysData.forEach((header, index) => {
    //   const routeOrder = orders.filter((order) => {
    //     return header.id.split("~")[1] === order.end.split("T")[0];
    //   });
    //   const optimizedRoute = optimizedRoutes[`Route ${index + 1}`];
    //
    //   const notIncludedInOptimizedRoute = [];
    //   routeOrder.forEach((order) => {
    //     let found = false;
    //     optimizedRoute.forEach((opRoute) => {
    //       if (
    //         parseInt(opRoute.OrderNum) ===
    //         parseInt(order.description.split("~")[0].split(":")[1])
    //       ) {
    //         found = true;
    //       }
    //     });
    //     if (!found) {
    //       notIncludedInOptimizedRoute.push(order);
    //     }
    //   });
    //   // console.log(optimizedRoute);
    //   // console.log(notIncludedInOptimizedRoute);
    //   let currentDate = moment(
    //     `${moment(date.split("T")[0]).format("YYYY-MM-DD")} 07:00`
    //   );
    //   optimizedRoute.forEach((opRoute) => {
    //     const order = routeOrder.find((order) => {
    //       return (
    //         opRoute.OrderNum === order.description.split("~")[0].split(":")[1]
    //       );
    //     });
    //     if (order) {
    //       const minutesToBeAdded = moment(opRoute.Time, "HH:mm").minutes();
    //       const hoursTobeAdded = moment(opRoute.Time, "HH:mm").hours();
    //       let startDate = new Date(
    //         moment(currentDate).format("YYYY-MM-DD HH:mm")
    //       );
    //       if (hoursTobeAdded > 0) {
    //         currentDate = moment(currentDate).add(hoursTobeAdded, "h");
    //       }
    //       if (minutesToBeAdded > 5) {
    //         currentDate = moment(currentDate).add(minutesToBeAdded, "m");
    //       } else {
    //         currentDate = moment(currentDate).add(5, "m");
    //       }
    //       let endDate = new Date(
    //         moment(currentDate).format("YYYY-MM-DD HH:mm")
    //       );
    //       array.push({
    //         orderId: order.id,
    //         text: order.description,
    //         startDate: startDate,
    //         endDate: endDate,
    //         hasAttachments: order.Calculated_AttchAvail,
    //         hasPackSlips: order.Calculated_PackAvail,
    //         hasArInvoices: order.Calculated_InvcAvail,
    //         type: header.id,
    //         allDay: false,
    //         status:
    //           order.className === "fc-event-solid-info"
    //             ? "UnAck"
    //             : order.className === "fc-event-solid-success"
    //             ? "Started"
    //             : order.className === "fc-event-solid-danger"
    //             ? "Rej"
    //             : order.className === "bg-light-warning"
    //             ? "Arrived"
    //             : order.className === "fc-event-solid-primary"
    //             ? "Delivered"
    //             : "Ack",
    //         eTa:
    //           hoursTobeAdded > 0 || minutesToBeAdded > 5
    //             ? opRoute.Time
    //             : moment("00:05:00", "H:mm").format("H:mm"),
    //       });
    //     }
    //   });

    // notIncludedInOptimizedRoute.forEach((order) => {
    //   let startDate = new Date(
    //     moment(currentDate).format("YYYY-MM-DD HH:mm")
    //   );
    //   currentDate = moment(currentDate).add(45, "m");
    //   let endDate = new Date(moment(currentDate).format("YYYY-MM-DD HH:mm"));
    //   array.push({
    //     orderId: order.id,
    //     text: order.description,
    //     startDate: startDate,
    //     endDate: endDate,
    //     hasAttachments: order.Calculated_AttchAvail,
    //     hasPackSlips: order.Calculated_PackAvail,
    //     hasArInvoices: order.Calculated_InvcAvail,
    //     type: header.id,
    //     allDay: false,
    //     status:
    //       order.className === "fc-event-solid-info"
    //         ? "UnAck"
    //         : order.className === "fc-event-solid-success"
    //         ? "Started"
    //         : order.className === "fc-event-solid-danger"
    //         ? "Rej"
    //         : order.className === "bg-light-warning"
    //         ? "Arrived"
    //         : order.className === "fc-event-solid-primary"
    //         ? "Delivered"
    //         : "Ack",
    //     eTa: "",
    //   });
    // });
    // });
    const a = array.filter((a) => {
      return !a.allDay;
    });
    // console.log(a);
    setDataSource((prevData) => [...prevData, ...array]);
  }

  function onDateChange(e) {
    setBusy(true);
    let offSet = new Date(e).getTimezoneOffset() / 60;
    if (offSet < 0) {
      let positiveOffSet = offSet * -1;
      let cOffSet = "-" + positiveOffSet;
      setCurrentOffset(cOffSet);
    } else {
      let negativeOffSet = offSet * -1;
      let cOffSet = "+" + negativeOffSet;
      setCurrentOffset(cOffSet);
    }
    let date = new Date(e.toISOString());
    date.setDate(date.getDate() + 1);
    date = date.toISOString();
    setSelectedDate(date);
    setDataSource([]);
    DeliveryDashboardApi.getTrucksAndRoutes(date.split("T")[0])
      .then((res) => {
        const headersArray = setAllDay(res.routes);
        setAllOrders(res.orders, date, res.final, headersArray);
        if (res.orders.length > 0) {
          intervalRef.current = setInterval(() => {
            getUd33();
          }, INTERVAL_MS);
        } else {
          clearInterval(intervalRef.current);
        }
        setBusy(false);
      })
      .catch((err) => {
        console.log(err);
        setBusy(false);
      });
  }

  function onBeforeAppointmentUpdate(e) {
    if (e.oldData.allDay && !e.newData.allDay) {
      e.cancel = true;
    } else if (!e.oldData.allDay && e.newData.allDay) {
      e.cancel = true;
    } else if (!e.oldData.allDay && e.oldData.status !== "UnAck") {
      e.cancel = true;
    } else if (e.oldData.allDay) {
      e.cancel = true;
    } else {
      setBusy(true);
      console.log(e);
      let updatedStartTime = moment(e.newData.startDate).format("HH:mm:ss");
      let updatedEndTime = moment(e.newData.endDate).format("HH:mm:ss");
      let updatedColumn = e.newData.type.split("~")[0];
      DeliveryDashboardApi.updateOrder({
        column: updatedColumn,
        orderId: e.newData.orderId,
        updatedStartTime: updatedStartTime,
        updatedEndTime: updatedEndTime,
      })
        .then((res) => {
          console.log(res);
          const d = dataSourceRef.current.map((i) => {
            if (i.orderId === e.oldData.orderId) {
              i.orderId = res.data.Key1;
            }
            return i;
          });
          setDataSource(d);
          setBusy(false);
        })
        .catch((err) => {
          console.log(err);
          setBusy(false);
        });
    }
  }

  let arrangeRoutePlan = (data) => {
    setBusy(true);
    DeliveryDashboardApi.arrangeRoutePlan({
      routeId: data.routeId,
      date: moment(data.startDate).format("YYYY-MM-DD"),
    })
      .then((res) => {
        console.log(res);
        let currentDate = moment(
          moment(data.startDate).format("YYYY-MM-DD") + " " + "07:00"
        );
        let founded = [];
        let newData = [];
        res.forEach((apiRes) => {
          newData = dataSourceRef.current.map((order) => {
            if (order.allDay === false) {
              if (apiRes.OrderNum === order.text.split("~")[0].split(":")[1]) {
                let alreadyFound = founded.filter((item) => {
                  return item === order.text.split("~")[0].split(":")[1];
                });
                if (
                  apiRes.OrderNum === order.text.split("~")[0].split(":")[1] &&
                  !(alreadyFound.length > 0)
                ) {
                  order.startDate = new Date(
                    moment(currentDate).format("YYYY-MM-DD HH:mm")
                  );
                  currentDate = moment(currentDate).add(45, "m");
                  order.endDate = new Date(
                    moment(currentDate).format("YYYY-MM-DD HH:mm")
                  );
                  founded.push(order.text.split("~")[0].split(":")[1]);
                }
              }
            }
            return order;
          });
        });
        let c = dataSourceRef.current.filter((order) => {
          return order.type === data.type && order.allDay === false;
        });
        console.log(c.reverse());
        setDataSource(newData);
        setBusy(false);
      })
      .catch((err) => {
        console.log(err);
        setBusy(false);
      });
  };

  function onAppointmentClick(e) {
    const data = e.appointmentData;
    if (data.allDay) {
      const text = data.text.split(":")[0];
      if (text === "Truck") {
        selectedTruckDetail.current = {
          id: data.id.split(".")[1],
          date: selectedDate.split("T")[0],
        };
        setVisibleTruckDetail(true);
      } else if (text === "T") {
        const startedOrder = dataSource.filter((order) => {
          return data.type === order.type && order.status === "Started";
        });
        selectedOrderSummaryId.current = data.type.split("~")[0];
        let summaryData = data.text.split(",");
        orderSummaryStatus.current = {
          open: parseInt(summaryData[1].split(":")[1]),
          arrived: parseInt(summaryData[2].split(":")[1]),
          delivered: parseInt(summaryData[3].split(":")[1]),
          started: startedOrder.length,
        };
        setVisibleOrderSummary(true);
      }
    } else {
      // selectedOrderId.current = data.orderId;
      // setVisibleOrderDetail(true);
    }
  }

  const onArInvoiceClick = (e) => {
    console.log("ar invoice click", e);
    selectedOrderId.current = e.text.split("~")[0].split(":")[1];
    setVisibleArInvoice(true);
  };
  const onAttachmentClick = (e) => {
    // console.log("ar invoice click", e);
    selectedOrderId.current = e.text.split("~")[0].split(":")[1];
    setVisibleAttachment(true);
  };
  const onOrderDetailClick = (e) => {
    // console.log("Order Detail click", e);
    selectedOrderId.current = e;
    setVisibleOrderDetail(true);
  };
  const onPackSlipClick = (e) => {
    // console.log("Order Detail click", e);
    selectedOrderId.current = e.text.split("~")[0].split(":")[1];
    console.log(e.text.split("-")[0].split(":")[1]);
    setVisiblePackSlip(true);
  };

  return (
    <Spin spinning={busy}>
      <div
        className="routePlanner"
        style={{
          backgroundColor: "white",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Planner Dashboard
            </span>
            <>
              {/*<span style={{ marginLeft: "10px" }}>*/}
              {/*  <RadioGroup*/}
              {/*    row*/}
              {/*    aria-labelledby="demo-row-radio-buttons-group-label"*/}
              {/*    name="row-radio-buttons-group"*/}
              {/*  >*/}
              {/*    <FormControlLabel*/}
              {/*      value="time"*/}
              {/*      control={<Radio size={"small"} />}*/}
              {/*      label="Time"*/}
              {/*    />*/}
              {/*    <FormControlLabel*/}
              {/*      value="timeDistance"*/}
              {/*      control={<Radio size={"small"} />}*/}
              {/*      label="Time/Distance"*/}
              {/*    />*/}
              {/*  </RadioGroup>*/}
              {/*  /!*<TimePicker*!/*/}
              {/*  /!*  label="Time"*!/*/}
              {/*  /!*  // value={value}*!/*/}
              {/*  /!*  // onChange={handleChange}*!/*/}
              {/*  /!*  renderInput={(params) => <TextField {...params} />}*!/*/}
              {/*  /!*  onChange={(e) => {}}*!/*/}
              {/*  /!* value={}/>*!/*/}
              {/*</span>*/}
            </>
          </div>
          <div>
            <span
              className="text-center"
              style={{
                backgroundColor: "#6993FF",
                fontSize: "13px",
                color: "#ffffff",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
              }}
            >
              UnAck
            </span>
            <span
              className="text-center"
              style={{
                backgroundColor: "#EBEDF3",
                fontSize: "13px",
                color: "black",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
              }}
            >
              Ack
            </span>
            <span
              className="text-center"
              style={{
                backgroundColor: "#1BC5BD",
                fontSize: "13px",
                color: "#ffffff",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
              }}
            >
              Started
            </span>
            <span
              className="text-center"
              style={{
                backgroundColor: "#FFF4DE",
                fontSize: "13px",
                color: "black",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
              }}
            >
              Arrived
            </span>
            <span
              className="text-center"
              style={{
                backgroundColor: "#F64E60",
                fontSize: "13px",
                color: "white",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
              }}
            >
              Rej
            </span>
            <span
              className="text-center"
              style={{
                backgroundColor: "#00008B",
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
        <Scheduler
          timeZone={"Etc/GMT" + currentOffset}
          onCurrentViewChange={(e) => {
            // if (e === "month") {
            //   const data = dataSourceRef.current.filter((order) => {
            //     return order.allDay === false;
            //   });
            //   setDataSource(data);
            // } else {
            //   setDataSource(dataSourceRef.current);
            // }
          }}
          dataSource={dataSource}
          views={views}
          groups={groups}
          showAllDayPanel={true}
          defaultCurrentDate={currentDate}
          // cellDuration={22.5}
          cellDuration={30}
          crossScrollingEnabled={true}
          appointmentComponent={(props) => {
            return (
              <MyAppointmentComponent
                e={props}
                onClick={onAppointmentClick}
                onArInvoiceClick={onArInvoiceClick}
                onAttachmentClick={onAttachmentClick}
                onOrderDetailClick={onOrderDetailClick}
                onPackSlipClick={onPackSlipClick}
              />
            );
          }}
          // height={600}
          startDayHour={7}
          resources={[
            {
              fieldExpr: "type",
              dataSource: headersData,
            },
          ]}
          onAppointmentFormOpening={(e) => {
            e.cancel = true;
          }}
          onCellClick={(e) => {
            console.log("CELL CLICK-->", e);
          }}
          onCurrentDateChange={onDateChange}
          onAppointmentClick={onAppointmentClick}
          onAppointmentAdded={(e) => {
            console.log("ADDED-->", e);
          }}
          onAppointmentUpdating={onBeforeAppointmentUpdate}
          onAppointmentDblClick={(e) => {
            console.log("DOUBLE CLICK-->", e);
          }}
        >
          <Resource
            colorExpr={"type"}
            dataSource={dataSource}
            textExpr={"text"}
            valueExpr={"id"}
          />
          {/*<Scrolling mode="virtual" />*/}
        </Scheduler>
        {visibleOrderSummary && (
          <OrderSummary
            id={selectedOrderSummaryId.current}
            date={selectedDate}
            detail={orderSummaryStatus.current}
            visible={visibleOrderSummary}
            setVisible={setVisibleOrderSummary}
          />
        )}
        {visibleOrderDetail && (
          <OrderDetail
            orderId={selectedOrderId.current}
            visible={visibleOrderDetail}
            setVisible={setVisibleOrderDetail}
          />
        )}
        {visibleTruckDetail && (
          <TruckDetail
            detail={selectedTruckDetail.current}
            visible={visibleTruckDetail}
            setVisible={setVisibleTruckDetail}
          />
        )}{" "}
        {visibleArInvoice && (
          <ArInvoiceModal
            orderId={selectedOrderId.current}
            visible={visibleArInvoice}
            setVisible={setVisibleArInvoice}
          />
        )}
        {visibleAttachment && (
          <AttachmentModal
            orderId={selectedOrderId.current}
            visible={visibleAttachment}
            setVisible={setVisibleAttachment}
          />
        )}
        {visiblePackSlip && (
          <PackSlipModal
            orderId={selectedOrderId.current}
            visible={visiblePackSlip}
            setVisible={setVisiblePackSlip}
          />
        )}
      </div>
    </Spin>
  );
};
export default DeliveryModule;
