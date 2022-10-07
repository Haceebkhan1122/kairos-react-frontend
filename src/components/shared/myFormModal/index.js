import React from "react";
import { message, Modal, Select, Spin, Tabs } from "antd";
import "./styless.scss";
import DatePicker from "react-datepicker";
import moment from "moment";
import { LeasingModuleApi } from "../../../api";
import {
  addDataInRedux,
  confirmQuoteRedux,
  createOrderFromQuoteRedux,
  getDataSourceRedux,
} from "../../../redux/leasing";
import { useDispatch, useSelector } from "react-redux";

const { TabPane } = Tabs;

const { Option } = Select;

const MyModal = (props) => {
  const dispatch = useDispatch();
  const rData = useSelector(getDataSourceRedux);
  const [orderEquipType, setOrderEquipType] = React.useState("");
  const [orderCustomerName, setOrderCustomerName] = React.useState("");
  const [orderDescription, setOrderDescription] = React.useState("");
  const [orderId, setorderId] = React.useState("");
  const [orderCustomerAddress, setOrderCustomerAddress] = React.useState("");
  const [orderCustomerShipToNum, setOrderCustomerShipToNum] =
    React.useState("");
  const [orderOtsCheckBox, setOrderOtsCheckBox] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [orderStartDate, setOrderStartDate] = React.useState(new Date());
  const [orderEndDate, setOrderEndDate] = React.useState(new Date());
  const [quoteEquipType, setQuoteEquipType] = React.useState("");
  const [quoteDescription, setQuoteDescription] = React.useState("");
  // const [quoteComment, setQuoteComment] = React.useState("");
  const [quoteCustomerName, setQuoteCustomerName] = React.useState("");
  const [quoteId, setQuoteId] = React.useState("");
  const [quoteOtsCheckBox, setQuoteOtsCheckBox] = React.useState(false);
  const [quoteStartDate, setQuoteStartDate] = React.useState(new Date());
  const [quoteEndDate, setQuoteEndDate] = React.useState(new Date());
  const [quoteDueDate, setQuoteDueDate] = React.useState(new Date());
  const [quoteCustomerId, setQuoteCustomerId] = React.useState("");
  const [quoteCustomerAddress, setQuoteCustomerAddress] = React.useState("");
  const [quoteCustomerShipToNum, setQuoteCustomerShipToNum] =
    React.useState("");
  const [otsName, setOtsName] = React.useState("");
  const [otsAddress1, setOtsAddress1] = React.useState("");
  const [otsAddress2, setOtsAddress2] = React.useState("");
  const [otsCity, setOtsCity] = React.useState("");
  const [otsZip, setOtsZip] = React.useState("");
  const [otsQuoteName, setOtsQuoteName] = React.useState("");
  const [otsQuoteAddress1, setOtsQuoteAddress1] = React.useState("");
  const [otsQuoteAddress2, setOtsQuoteAddress2] = React.useState("");
  const [otsQuoteCity, setOtsQuoteCity] = React.useState("");
  const [otsQuoteZip, setOtsQuoteZip] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("1");
  const [selectedOrderOrQuoteType, setSelectedOrderOrQuoteType] =
    React.useState("");
  const destroyAllFields = () => {
    setOtsQuoteName("");
    setOtsQuoteAddress1("");
    setOtsQuoteAddress2("");
    setOtsQuoteCity("");
    setOtsQuoteZip("");
    setSelectedOrderOrQuoteType("");
    setBusy(false);
    setDisable(false);
    setQuoteId("");
    setOrderEquipType("");
    setOrderCustomerName("");
    setOrderDescription("");
    setorderId("");
    setOrderCustomerAddress("");
    setOrderCustomerShipToNum("");
    setOrderOtsCheckBox(false);
    setOrderStartDate(new Date());
    setOrderEndDate(new Date());
    setQuoteEquipType("");
    setQuoteCustomerName("");
    setQuoteStartDate(new Date());
    setQuoteEndDate(new Date());
    setOtsName("");
    setOtsAddress1("");
    setOtsAddress2("");
    setOtsCity("");
    setOtsZip("");
    setQuoteDescription("");
    setQuoteCustomerId("");
    setSelectedQuoteCustomerAddresses([]);
    setSelectedCustomerAddresses([]);
  };
  const [selectedCustomerAddresses, setSelectedCustomerAddresses] =
    React.useState([]);
  const [selectedQuoteCustomerAddresses, setSelectedQuoteCustomerAddresses] =
    React.useState([]);

  const assignOrdersDetails = (data) => {
    let customer = props.detail.customers.find((customer) => {
      return customer.CustID === data.customerId.toString();
    });
    console.log("CUSTOMER-->", customer);
    setorderId(data.orderId);
    setOrderEquipType(data.type);
    setOrderCustomerName(data.customerName);
    setOrderDescription(data.description);
    setOrderCustomerShipToNum(data.shipToNum);
    LeasingModuleApi.getCustomerAddresses({ custNum: customer.CustNum })
      .then((res) => {
        setSelectedCustomerAddresses(res.part);
        let address = res.part.find((address) => {
          return address.ShipToNum === data.shipToNum;
        });
        console.log("ADDRESS-->", address.Address1);
        setOrderCustomerAddress(address.Address1);
      })
      .catch((err) => {
        console.log(err);
      });
    setOrderOtsCheckBox(data.UseOTS);
    setOrderStartDate(new Date(data.startDate));
    setOrderEndDate(new Date(data.endDate));
    setOtsCity(data.UseOTS === true ? data.otsCity : "");
    setOtsName(data.UseOTS === true ? data.otsName : "");
    setOtsAddress1(data.UseOTS === true ? data.otsAddress1 : "");
    setOtsAddress2(data.UseOTS === true ? data.otsAddress2 : "");
    setOtsZip(data.UseOTS === true ? data.otsZip : "");
    //  Quotes Variables
    setQuoteEquipType("");
    setQuoteCustomerName("");
    setQuoteCustomerId("");
    // setQuoteStartDate(new Date("0000-00-00"));
    // setQuoteEndDate(new Date("0000-00-00"));
    // setQuoteDueDate(new Date("0000-00-00"));
    setQuoteId("");
  };

  const assignQuoteDetails = (data) => {
    let customer = props.detail.customers.find((customer) => {
      return customer.CustID === data.customerId.toString();
    });
    setQuoteCustomerShipToNum(data.shipToNum);
    LeasingModuleApi.getCustomerAddresses({ custNum: customer.CustNum })
      .then((res) => {
        setSelectedQuoteCustomerAddresses(res.part);
        let address = res.part.find((address) => {
          return address.ShipToNum === data.shipToNum;
        });
        console.log("ADDRESS-->", address.Address1);
        setQuoteCustomerAddress(address.Address1);
      })
      .catch((err) => {
        console.log(err);
      });
    setQuoteDescription(data.description);
    setQuoteId(data.quoteId);
    setQuoteEquipType(data.type);
    setQuoteCustomerName(data.customerName);
    setQuoteStartDate(new Date(data.startDate));
    setQuoteEndDate(new Date(data.endDate));
    setQuoteDueDate(new Date(data.endDate));
    setQuoteOtsCheckBox(data.UseOTS);
    setOtsQuoteCity(data.UseOTS === true ? data.otsCity : "");
    setOtsQuoteName(data.UseOTS === true ? data.otsName : "");
    setOtsQuoteAddress1(data.UseOTS === true ? data.otsAddress1 : "");
    setOtsQuoteAddress2(data.UseOTS === true ? data.otsAddress2 : "");
    setOtsQuoteZip(data.UseOTS === true ? data.otsZip : "");
    setOrderEquipType("");
    setOrderCustomerName("");
    setOrderDescription("");
    setOrderCustomerAddress("");
    setOrderCustomerShipToNum("");
    setOrderOtsCheckBox(false);
    // setOrderStartDate(new Date("0000-00-00"));
    // setOrderEndDate(new Date("0000-00-00"));
    setOtsCity("");
    setOtsName("");
    setOtsAddress1("");
    setOtsAddress2("");
    setOtsZip("");
    setorderId("");
    setQuoteCustomerId(data.customerId);
  };

  React.useEffect(() => {
    console.log(props);
    const data = props.detail;
    if (data.orderId !== "" && data.orderId !== undefined) {
      setSelectedOrderOrQuoteType(data.status ? "open" : "close");
      setActiveTab("2");
      setDisable(true);
      console.log("orderId");
      assignOrdersDetails(data);
    } else if (data.quoteId !== "" && data.quoteId !== undefined) {
      setSelectedOrderOrQuoteType(data.status ? "quoted" : "unquoted");
      setActiveTab("1");
      setDisable(true);
      console.log("quoteId");
      assignQuoteDetails(data);
    } else {
      setDisable(false);
      let equip = props.detail.headers.find((equip) => {
        return equip.id === data.type;
      });
      setQuoteDueDate(new Date(data.endDate));
      setOrderEquipType(data.type);
      setQuoteEquipType(data.type);
      setOrderDescription(equip.text.split("-")[1]);
      setQuoteDescription(equip.text.split("-")[1]);
      setOrderStartDate(new Date(data.startDate));
      setOrderEndDate(new Date(data.endDate));
      setQuoteStartDate(new Date(data.startDate));
      setQuoteEndDate(new Date(data.endDate));
    }
  }, []);

  const onOrderFormSubmit = (e) => {
    e?.preventDefault();
    if (orderCustomerName === "") {
      message.info("Please select a customer");
      return;
    }
    if (orderOtsCheckBox) {
      if (
        otsName === "" ||
        otsAddress1 === "" ||
        otsAddress2 === "" ||
        otsCity === "" ||
        otsZip === ""
      ) {
        message.info("Please fill out all OTS fields");
        return;
      }
    }
    // console.log(orderCustomerName);
    // console.log(moment(orderStartDate).format("YYYY-MM-DD"));
    // console.log(moment(orderEndDate).format("YYYY-MM-DD"));
    // console.log(orderEquipType);
    // console.log(orderDescription);
    // console.log(orderCustomerName);
    // console.log(orderCustomerShipToNum);
    // console.log(orderOtsCheckBox ? otsName : "");
    // console.log(orderOtsCheckBox ? otsAddress1 : "");
    // console.log(orderOtsCheckBox);
    // console.log(orderOtsCheckBox ? otsAddress2 : "");
    // console.log(orderOtsCheckBox ? otsCity : "");
    // console.log(orderOtsCheckBox ? otsZip : "");
    setBusy(true);
    LeasingModuleApi.createSaleOrder({
      custNum: orderCustomerName,
      startDate: moment(orderStartDate).format("YYYY-MM-DD"),
      endDate: moment(orderEndDate).format("YYYY-MM-DD"),
      equipType: orderEquipType,
      equipDescription: orderDescription,
      customerName: orderCustomerName,
      shipToNum: orderCustomerShipToNum,
      otsName: orderOtsCheckBox ? otsName : "",
      otsAddress1: orderOtsCheckBox ? otsAddress1 : "",
      ots: orderOtsCheckBox,
      otsAddress2: orderOtsCheckBox ? otsAddress2 : "",
      otsCity: orderOtsCheckBox ? otsCity : "",
      otsZip: orderOtsCheckBox ? otsZip : "",
    })
      .then((res) => {
        console.log("AFTER ORDER-->", res);
        addOrderOrQuote(res[0]);
        destroyAllFields();
        setBusy(false);
        props.setVisible(false);
        message.success("Order Created successfully");
      })
      .catch((err) => {
        message.error("Error in creating order");
        setBusy(false);
      });
  };

  let onQuoteSubmit = () => {
    if (quoteCustomerName === "") {
      message.info("Please select a customer");
      return;
    }
    const quoteStart = new Date(moment(quoteStartDate).format("YYYY-MM-DD"));
    const quoteEnd = new Date(moment(quoteEndDate).format("YYYY-MM-DD"));
    if (quoteStart.getTime() !== quoteEnd.getTime()) {
      if (!(quoteStart.getTime() < quoteEnd.getTime())) {
        message.info("Start date can't be greater than end Date!");
        return;
      } else if (!(quoteEnd.getTime() > quoteStart.getTime())) {
        message.info("End date can't be less than Start Date!");
        return;
      }
    }
    let find = false;
    const rowData = props.detail.dataSourceRef.current.filter((i) => {
      return i.type === quoteEquipType;
    });
    rowData.forEach((i, index) => {
      const iStart = new Date(moment(i.startDate).format("YYYY-MM-DD"));
      const iEnd = new Date(moment(i.endDate).format("YYYY-MM-DD"));
      if (
        (quoteStart.getTime() >= iStart.getTime() &&
          quoteEnd.getTime() <= iEnd.getTime()) ||
        (quoteEnd.getTime() >= iStart.getTime() &&
          quoteStart.getTime() <= iEnd.getTime())
      ) {
        find = true;
      }
    });
    if (find) {
      message.info("Equipment is already booked in selected date.");
      return;
    }
    // console.log("PASSED");
    setBusy(true);
    let customer = props.detail.customers.find((customer) => {
      return customer.CustID === quoteCustomerId.toString();
    });
    console.log(customer);
    LeasingModuleApi.createQuote({
      custNum: customer.CustNum,
      startDate: moment(quoteStartDate).format("YYYY-MM-DD"),
      endDate: moment(quoteEndDate).format("YYYY-MM-DD"),
      dueDate: moment(quoteDueDate).format("YYYY-MM-DD"),
      equipType: quoteEquipType,
      description: quoteDescription,
      customerName: customer.Name,
      shipToNum: customer.ShipToNum,
      custId: customer.CustID,
    })
      .then((res) => {
        addOrderOrQuote(res[0]);
        destroyAllFields();
        setBusy(false);
        props.setVisible(false);
        message.success("Quote Created successfully");
      })
      .catch((err) => {
        console.log(err);
        message.error("Error in creating quote");
        setBusy(false);
      });
  };

  const addOrderOrQuote = (item) => {
    let equip = props.detail.headers.find((h) => {
      return h.id === item.UD12_Key1;
    });
    let d = {
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
      endDate: new Date(item.UD12_Date02.split("T")[0] + "T" + 23 + ":30:00"),
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
    };
    if (orderId === "" && quoteId === "") {
      dispatch(addDataInRedux(d));
    }
  };
  let onConfirmQuoteClick = () => {
    setBusy(true);
    LeasingModuleApi.confirmQuote({
      quoteId: quoteId,
    })
      .then((res) => {
        dispatch(confirmQuoteRedux(quoteId));
        setSelectedOrderOrQuoteType("quoted");
        setBusy(false);
        message.success("Quote Confirmed successfully");
        props.setVisible(false);
      })
      .catch((err) => {
        message.error("Error in confirming quote");
        setBusy(false);
        console.log(err);
      })
      .finally(() => {
        setBusy(false);
      });
  };
  let createOrderFromQuote = () => {
    setBusy(true);
    if (selectedOrderOrQuoteType === "quoted") {
      console.log("if QUOTED");
      LeasingModuleApi.createOrderFromQuote({
        key4: props.detail.key4,
        quoteId: quoteId,
        startDate: moment(quoteStartDate).format("YYYY-MM-DD"),
        endDate: moment(quoteEndDate).format("YYYY-MM-DD"),
      })
        .then((res) => {
          let newData = res[0];
          let equip = props.detail.headers.find((h) => {
            return h.id === newData.UD12_Key1;
          });
          dispatch(createOrderFromQuoteRedux({ equip, quoteId, newData }));
          setSelectedOrderOrQuoteType("");
          setBusy(false);
          message.success("Order Created successfully");
          props.setVisible(false);
        })
        .catch((err) => {
          message.error("Error in creating order");
          setBusy(false);
        })
        .finally(() => {
          setBusy(false);
        });
    } else {
      console.log("UN----QUOTED");
      LeasingModuleApi.confirmQuote({
        quoteId: quoteId,
      })
        .then((r) => {
          dispatch(confirmQuoteRedux(quoteId));
          LeasingModuleApi.createOrderFromQuote({
            key4: props.detail.key4,
            quoteId: quoteId,
            startDate: moment(quoteStartDate).format("YYYY-MM-DD"),
            endDate: moment(quoteEndDate).format("YYYY-MM-DD"),
          }).then((res) => {
            let newData = res[0];
            let equip = props.detail.headers.find((h) => {
              return h.id === newData.UD12_Key1;
            });
            dispatch(createOrderFromQuoteRedux({ equip, quoteId, newData }));
            setSelectedOrderOrQuoteType("");
            setBusy(false);
            message.success("Order Created successfully");
            props.setVisible(false);
          });
          // props.setVisible(false);
        })
        .catch((err) => {
          message.error("Error in confirming quote");
          console.log(err);
          setBusy(false);
        });
    }
  };
  return (
    <>
      <Modal
        width={800}
        destroyOnClose={true}
        title={<div style={{ fontSize: "13px" }}>Epicor Leasing</div>}
        visible={props.visible}
        onCancel={() => {
          destroyAllFields();
          props.setVisible(false);
        }}
        onOk={() => {}}
        okButtonProps={{
          style: {
            display: "none",
            fontSize: "13px",
            background: "#E4E6EF",
            color: "black",
            borderRadius: "5px",
            borderColor: "transparent",
          },
        }}
        cancelButtonText="Close"
        okText={"Save"}
        cancelButtonProps={{
          style: {
            marginLeft: "auto",
            fontSize: "13px",
            background: "#E4E6EF",
            color: "black",
            borderRadius: "5px",
            borderColor: "transparent",
            display: "none",
          },
        }}
      >
        <Spin spinning={busy} key={0}>
          <Tabs
            key={1}
            defaultActiveKey={activeTab}
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
            }}
            type="card"
          >
            {(quoteId !== "" || (quoteId === "" && orderId === "")) && (
              <TabPane tab="Quote" key="1">
                <form className="myFormModalMain">
                  <div className="fieldsMain">
                    {quoteId !== "" && (
                      <div className="fieldMain" style={{ width: "100%" }}>
                        <div className="fieldTxt">
                          <span className="fldtxt">QuoteId</span>
                        </div>
                        <div className="fieldInput">
                          <input
                            disabled={true}
                            defaultValue={quoteId}
                            className="fldinput"
                            type="text"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Equip Type</span>
                      </div>
                      <div className="fieldInput">
                        <select
                          disabled={disable}
                          className="fldinput"
                          onChange={(e) => {
                            const value = e.target.value;
                            setQuoteEquipType(value.split("~")[0]);
                            setQuoteDescription(
                              value.split("~")[1].split("-")[1]
                            );
                          }}
                        >
                          {props.detail.headers.map((header) => {
                            return (
                              <option
                                value={header.id + "~" + header.text}
                                selected={quoteEquipType === header.id}
                              >
                                {header.text}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Description</span>
                      </div>
                      <div className="fieldInput">
                        <input
                          disabled={true}
                          value={quoteDescription}
                          className="fldinput"
                          type="text"
                          required
                        />
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Customer</span>
                      </div>
                      <div className="fieldInput">
                        <Select
                          disabled={disable}
                          value={quoteCustomerName}
                          showSearch
                          optionFilterProp="children"
                          onSearch={(value) => console.log(value)}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          onChange={(value) => {
                            let customer = props.detail.customers.find(
                              (customer) => {
                                return customer.CustNum === value;
                              }
                            );
                            setQuoteCustomerName(customer.Name);
                            setQuoteCustomerId(customer.CustID);
                            LeasingModuleApi.getCustomerAddresses({
                              custNum: value,
                            })
                              .then((res) => {
                                setSelectedQuoteCustomerAddresses(res.part);
                                setQuoteCustomerAddress(
                                  res.part.length > 0 ? res.part[0] : ""
                                );
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          {props.detail.customers.map((customer) => {
                            return (
                              <option value={customer.CustNum}>
                                {customer.Name}
                              </option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Address</span>
                      </div>
                      <div className="fieldInput">
                        <select
                          disabled={disable}
                          className="fldinput"
                          onChange={(e) => {
                            const v = e.target.value;
                            setQuoteCustomerAddress(v.split("~")[0]);
                            setQuoteCustomerShipToNum(v.split("~")[1]);
                          }}
                        >
                          {selectedQuoteCustomerAddresses.map((customer) => {
                            return (
                              <option
                                value={
                                  customer.Address1 + "~" + customer.ShipToNum
                                }
                                selected={
                                  quoteCustomerAddress === customer.Address1
                                }
                              >
                                {customer.Address1}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/*<div className="fieldMain">*/}
                    {/*  <div className="fieldTxt">*/}
                    {/*    <span className="fldtxt">Due Date</span>*/}
                    {/*  </div>*/}
                    {/*  <div className="fieldInput">*/}
                    {/*    <DatePicker*/}
                    {/*      disabled={disable}*/}
                    {/*      className="fldinput"*/}
                    {/*      dateFormat={"yyyy-MM-dd"}*/}
                    {/*      selected={*/}
                    {/*        new Date(moment(quoteDueDate).format("YYYY-MM-DD"))*/}
                    {/*      }*/}
                    {/*      onChange={(e) => {*/}
                    {/*        setQuoteDueDate(new Date(e));*/}
                    {/*      }}*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*</div>*/}

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Start Date</span>
                      </div>
                      <div className="fieldInput">
                        <DatePicker
                          selected={
                            new Date(
                              moment(quoteStartDate).format("YYYY-MM-DD")
                            )
                          }
                          onChange={(e) => {
                            setQuoteStartDate(new Date(e));
                          }}
                          disabled={disable}
                          className="fldinput"
                          dateFormat={"yyyy-MM-dd"}
                        />
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">End Date</span>
                      </div>
                      <div className="fieldInput">
                        <DatePicker
                          selected={
                            new Date(moment(quoteEndDate).format("YYYY-MM-DD"))
                          }
                          onChange={(e) => {
                            setQuoteEndDate(new Date(e));
                          }}
                          disabled={disable}
                          className="fldinput"
                          dateFormat={"yyyy-MM-dd"}
                        />
                      </div>
                    </div>

                    {/*<div className="fieldMain">*/}
                    {/*  <div className="fieldTxt">*/}
                    {/*    <span className="fldtxt">One Time Ship To</span>*/}
                    {/*  </div>*/}
                    {/*  <div className="fieldInput d-flex align-items-center">*/}
                    {/*    <input*/}
                    {/*      disabled={disable}*/}
                    {/*      checked={quoteOtsCheckBox}*/}
                    {/*      className="fledCheck"*/}
                    {/*      type="checkbox"*/}
                    {/*      onChange={(e) => {*/}
                    {/*        console.log(e.target.checked);*/}
                    {/*        setQuoteOtsCheckBox(e.target.checked);*/}
                    {/*      }}*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*</div>*/}

                    {/*  QUOTE ONE TIME SHIP TO START*/}
                    {quoteOtsCheckBox && (
                      <>
                        <div className="fieldMain" style={{ width: "100%" }}>
                          <div className="fieldTxt">
                            <span
                              className="fldtxt"
                              style={{ fontWeight: "bold" }}
                            >
                              One Time Ship To Detail:
                            </span>
                          </div>
                          <div className="fieldInput"></div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">Name</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsQuoteName}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsQuoteName(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">Address 1</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsQuoteAddress1}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsQuoteAddress1(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">Address 2</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsQuoteAddress2}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsQuoteAddress2(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">City</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsQuoteCity}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsQuoteCity(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">Zip</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsQuoteZip}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsQuoteZip(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {/*  QUOTE ONE TIME SHIP TO END*/}
                  </div>

                  <div className="d-flex justify-content-end">
                    {disable === false && (
                      <buton
                        className="saveTabBtn"
                        disabled={disable}
                        onClick={onQuoteSubmit}
                      >
                        Save
                      </buton>
                    )}
                    {disable && selectedOrderOrQuoteType === "unquoted" && (
                      <buton
                        className="saveTabBtn"
                        disabled={disable}
                        onClick={onConfirmQuoteClick}
                      >
                        Confirm Quote
                      </buton>
                    )}
                    {disable && (
                      <buton
                        className="saveTabBtn"
                        disabled={disable}
                        onClick={createOrderFromQuote}
                      >
                        Create Order
                      </buton>
                    )}
                    <button
                      className="cancelTabBtn"
                      onClick={() => {
                        destroyAllFields();
                        props.setVisible(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </TabPane>
            )}
            {orderId !== "" && (
              <TabPane tab="Order" key="2">
                <div
                  // onSubmit={onOrderFormSubmit}
                  className="myFormModalMain"
                >
                  <div className="fieldsMain">
                    {orderId !== "" && (
                      <div className="fieldMain" style={{ width: "100%" }}>
                        <div className="fieldTxt">
                          <span className="fldtxt">OrderId</span>
                        </div>
                        <div className="fieldInput">
                          <input
                            disabled={true}
                            value={orderId}
                            className="fldinput"
                            type="text"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Equip Type</span>
                      </div>
                      <div className="fieldInput">
                        <select
                          disabled={true}
                          className="fldinput"
                          onChange={(e) => {
                            const value = e.target.value;
                            setOrderEquipType(value.split("~")[0]);
                            setOrderDescription(
                              value.split("~")[1].split("-")[1]
                            );
                          }}
                        >
                          {props.detail.headers.map((header) => {
                            return (
                              <option
                                value={header.id + "~" + header.text}
                                selected={orderEquipType === header.id}
                              >
                                {header.text}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Description</span>
                      </div>
                      <div className="fieldInput">
                        <input
                          disabled={true}
                          defaultValue={orderDescription}
                          className="fldinput"
                          type="text"
                          required
                        />
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Customer</span>
                      </div>
                      <div className="fieldInput">
                        <Select
                          disabled={true}
                          value={orderCustomerName}
                          showSearch
                          optionFilterProp="children"
                          onSearch={(value) => console.log(value)}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          onChange={(value) => {
                            setOrderCustomerName(value);
                            LeasingModuleApi.getCustomerAddresses({
                              custNum: value,
                            })
                              .then((res) => {
                                setSelectedCustomerAddresses(res.part);
                                setOrderCustomerAddress(
                                  res.part.length > 0 ? res.part[0] : ""
                                );
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          {props.detail.customers.map((customer) => {
                            return (
                              <option value={customer.CustNum}>
                                {customer.Name}
                              </option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Address</span>
                      </div>
                      <div className="fieldInput">
                        <select
                          disabled={true}
                          className="fldinput"
                          onChange={(e) => {
                            const v = e.target.value;
                            setOrderCustomerAddress(v.split("~")[0]);
                            setOrderCustomerShipToNum(v.split("~")[1]);
                          }}
                        >
                          {selectedCustomerAddresses.map((customer) => {
                            return (
                              <option
                                value={
                                  customer.Address1 + "~" + customer.ShipToNum
                                }
                                selected={
                                  orderCustomerAddress === customer.Address1
                                }
                              >
                                {customer.Address1}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">Start Date</span>
                      </div>
                      <div className="fieldInput">
                        <DatePicker
                          disabled={true}
                          selected={
                            new Date(
                              moment(orderStartDate).format("YYYY-MM-DD")
                            )
                          }
                          className="fldinput"
                          dateFormat={"yyyy-MM-dd"}
                          onChange={(e) => {
                            setOrderStartDate(new Date(e));
                          }}
                        />
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">End Date</span>
                      </div>
                      <div className="fieldInput">
                        <DatePicker
                          disabled={true}
                          selected={
                            new Date(moment(orderEndDate).format("YYYY-MM-DD"))
                          }
                          className="fldinput"
                          dateFormat={"yyyy-MM-dd"}
                          onChange={(e) => {
                            setOrderEndDate(new Date(e));
                          }}
                        />
                      </div>
                    </div>

                    <div className="fieldMain">
                      <div className="fieldTxt">
                        <span className="fldtxt">One Time Ship To</span>
                      </div>
                      <div className="fieldInput d-flex align-items-center">
                        <input
                          disabled={true}
                          checked={orderOtsCheckBox}
                          className="fledCheck"
                          type="checkbox"
                          onChange={(e) => {
                            console.log(e.target.checked);
                            setOrderOtsCheckBox(e.target.checked);
                          }}
                        />
                      </div>
                    </div>

                    {/*  QUOTE ONE TIME SHIP TO START*/}
                    {orderOtsCheckBox && (
                      <>
                        <div className="fieldMain" style={{ width: "100%" }}>
                          <div className="fieldTxt">
                            <span
                              className="fldtxt"
                              style={{ fontWeight: "bold" }}
                            >
                              One Time Ship To Detail:
                            </span>
                          </div>
                          <div className="fieldInput"></div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">Name</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsName}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsName(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">Address 1</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsAddress1}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsAddress1(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">Address 2</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsAddress2}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsAddress2(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">City</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsCity}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsCity(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="fieldMain">
                          <div className="fieldTxt">
                            <span className="fldtxt">Zip</span>
                          </div>
                          <div className="fieldInput">
                            <input
                              disabled={disable}
                              defaultValue={otsZip}
                              className="fldinput"
                              type="text"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setOtsZip(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {/*  QUOTE ONE TIME SHIP TO END*/}
                  </div>
                  <div className="d-flex justify-content-end">
                    {/*{disable === false && (*/}
                    {/*  <button className="saveTabBtn" disabled={disable}>*/}
                    {/*    Save*/}
                    {/*  </button>*/}
                    {/*)}*/}
                    <button
                      className="cancelTabBtn"
                      onClick={() => {
                        destroyAllFields();
                        props.setVisible(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </TabPane>
            )}
          </Tabs>
        </Spin>
      </Modal>
    </>
  );
};
export default MyModal;
