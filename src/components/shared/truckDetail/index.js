import React, { useState } from "react";
import "./style.scss";
import { Checkbox, Modal, Radio, Select, Spin, Table } from "antd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DatePicker from "react-datepicker";
import { DeliveryDashboardApi } from "../../../api";
import moment from "moment";

const TruckDetail = (props) => {
  const [radiosValue, setRadiosValue] = useState(1);
  const [user, setUser] = useState("");
  const [route, setRoute] = useState("");
  const [busy, setBusy] = useState(false);
  const [date, setDate] = useState([]);
  const [allTrucks, setAllTrucks] = useState([]);
  const [checkListDataSource, setCheckListDataSource] = React.useState([]);
  const [truckTrackingDataSource, setTruckTrackingDataSource] = React.useState(
    []
  );
  const [filterTruckTrackingDataSource, setFilterTruckTrackingDataSource] =
    React.useState([]);
  const [filter, setFilter] = useState(false);
  const { Option } = Select;
  const selectedTruckId = React.useRef("");
  const setAllTheData = ({ id, date, shift }) => {
    setBusy(true);
    DeliveryDashboardApi.getTruckDetail({
      truckId: id,
      date: date,
      shift: shift,
    })
      .then((res) => {
        if (res.truckDetail.data.length > 0) {
          setUser(res.truckDetail.data[0].User);
          setRoute(res.truckDetail.data[0].Route);
        } else {
          setUser("");
          setRoute("");
        }
        setCheckListDataSource(res.truckDetail.data);
        setTruckTrackingDataSource(res.truckDriverDetail.data);
        setBusy(false);
      })
      .catch((err) => {
        console.log(err);
        setBusy(false);
      });
  };
  React.useEffect(() => {
    setBusy(true);
    setDate(props.detail.date);
    DeliveryDashboardApi.getAllTrucks()
      .then((res) => {
        if (res.trucks.length > 0) {
          selectedTruckId.current = res.trucks[0].Key1;
        }
        setAllTrucks(res.trucks);
        setAllTheData({
          id: props.detail.id,
          date: props.detail.date,
          shift: "beforeshift",
        });
      })
      .catch((err) => {
        console.log(err);
        setBusy(false);
      });
  }, []);
  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setRadiosValue(e.target.value);
  };
  const onFilterClick = () => {
    const d = moment(date).format("yyyy-MM-DD");
    setAllTheData({
      id: selectedTruckId.current,
      date: d,
      shift: radiosValue === 1 ? "beforeshift" : "aftershift",
    });
  };
  const truckTrackingColumn = [
    {
      title: "Order#",
      dataIndex: "ordernum",
      key: "ordernum",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "PlannerDate",
      dataIndex: "plannerdate",
      key: "plannerdate",
    },
    {
      title: "Time",
      dataIndex: "tim",
      key: "tim",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "EntryDate",
      dataIndex: "date",
      key: "date",
    },
  ];
  const checkListColumns = [
    {
      title: "Label",
      dataIndex: "Label",
      key: "label",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      render: (_, data) => {
        if (!(data.Type === "checkbox")) {
          return (
            <span>
              <input
                disabled={true}
                value={data.UserValue}
                className="answerInput"
              />
            </span>
          );
        } else {
          return (
            <span>
              <Checkbox disabled={true} defaultChecked={true} />
            </span>
          );
        }
      },
    },
  ];

  function onSearchChange(e) {
    let value = e.target.value.toLowerCase();
    console.log(value);
    if (value.length > 0) {
      const filterData = truckTrackingDataSource.filter((item) => {
        return (
          item.ordernum.includes(value) ||
          item.address.toLowerCase().includes(value) ||
          item.plannerdate.toLowerCase().includes(value) ||
          item.tim.includes(value) ||
          item.status.toLowerCase().includes(value) ||
          item.date.includes(value)
        );
      });
      setFilterTruckTrackingDataSource(filterData);
      setFilter(true);
    } else {
      setFilter(false);
    }
  }

  return (
    <>
      <Modal
        wrapClassName="truckDetailMdl"
        width={"100%"}
        title={
          <div className="d-flex align-items-center">
            <span className="me-2">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="unordered-list"
                width="20px"
                height="20px"
                fill="#00008B"
                aria-hidden="true"
              >
                <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
              </svg>
            </span>
            <span style={{ fontSize: "13px" }}>Truck Detail</span>
          </div>
        }
        visible={props.visible}
        onCancel={() => {
          props.setVisible(false);
        }}
        className="orderSummaryMdl"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonText="Close"
        cancelButtonProps={{
          style: {
            marginLeft: "auto",
            // fontWeight: "500",
            fontSize: "13px",
            background: "#E4E6EF",
            color: "black",
            borderRadius: "10px",
            borderColor: "transparent",
          },
        }}
        cancelText="Close"
      >
        <Spin spinning={busy}>
          <div>
            <div>
              <div className="d-flex tdInputsRow">
                <div className="topInputsMain">
                  <span className="me-2 tdInputTxt">Date:</span>
                  <span>
                    <DatePicker
                      selected={new Date(moment(date).format("YYYY-MM-DD"))}
                      dateFormat={"yyyy-MM-dd"}
                      className="tdInput1"
                      placeholder="Select date"
                      onChange={(date) => {
                        setDate(date);
                      }}
                    />
                  </span>
                </div>
                <div className="topInputsMain">
                  <span className="me-2 tdInputTxt">Truck:</span>
                  <span>
                    <select
                      // name=""
                      // id=""
                      onChange={(e) => {
                        console.log(e.target.value);
                        selectedTruckId.current = e.target.value;
                      }}
                      className="p-0 tdInput1"
                      style={{ padding: "0!important" }}
                    >
                      {allTrucks.map((t) => {
                        return <option value={t.Key1}>{t.Character01}</option>;
                      })}
                    </select>

                    {/*<input className="tdInput1" />*/}
                    {/*<Select*/}
                    {/*  defaultValue="lucy"*/}
                    {/*  // className="tdInput1"*/}
                    {/*  style={{*/}
                    {/*    width: "280px",*/}
                    {/*  }}*/}
                    {/*  // onChange={handleChange}*/}
                    {/*>*/}
                    {/*  <Option radiosValue="jack">Jack</Option>*/}
                    {/*  <Option radiosValue="lucy">Lucy</Option>*/}
                    {/*  <Option radiosValue="Yiminghe">yiminghe</Option>*/}
                    {/*</Select>*/}
                  </span>
                </div>
                <div className="topInputsMain">
                  <span className="me-2 tdInputTxt">User:</span>
                  <span>
                    <input value={user} className="tdInput2" disabled={true} />
                  </span>
                </div>
              </div>
              <div className="d-flex tdInputsRow">
                <div className="topInputsMain">
                  <span className="me-2 tdInputTxt">Route:</span>
                  <span>
                    <input value={route} className="tdInput2" disabled />
                  </span>
                </div>
                <div className="topInputsMain">
                  <Radio.Group onChange={onRadioChange} value={radiosValue}>
                    <Radio value={1}>
                      <span className="tdInputTxt">Before Shift</span>
                    </Radio>
                    <Radio value={2}>
                      <span className="tdInputTxt">After Shift</span>
                    </Radio>
                  </Radio.Group>
                  <button onClick={onFilterClick} className="tdBtnPrimary">
                    Filter
                  </button>
                </div>
                <div className="topInputsMain"></div>
              </div>
            </div>
            <div className="d-flex mt-2">
              {/*First Table*/}
              <div className="w-50 me-2 tdTblParent pt-1 ">
                <div
                  className="d-flex align-items-center"
                  style={{ borderBottom: "1px solid white" }}
                >
                  <span className="me-2">
                    {/*<TableOutlined />*/}
                    <AssignmentIcon style={{ color: "#00008B" }} />
                  </span>
                  <span className="tblHeadTxt">CheckList Results</span>
                </div>
                <Table
                  columns={checkListColumns}
                  dataSource={checkListDataSource}
                  bordered={false}
                  className="mt-2 rounded-bottom mx-4"
                />
              </div>
              {/*Second Table*/}
              <div className="w-50 me-2 tdTblParent pt-1">
                <div
                  className="d-flex align-items-start"
                  style={{ borderBottom: "1px solid white" }}
                >
                  <div className="d-flex align-items-center w-50">
                    <span className="me-2">
                      {/*<TableOutlined className="align-baseline" />*/}
                      <LocalShippingIcon style={{ color: "#00008B" }} />
                    </span>
                    <span className="tblHeadTxt">Truck Tracking Details</span>
                  </div>
                  <div className="w-50 d-flex align-items-center">
                    <span className="me-2">View in Google Map:</span>
                    <button className="tdBtnPrimary">View</button>
                  </div>
                </div>
                <div className="mx-4 mt-1">
                  <div className="d-flex justify-content-end">
                    <span className="tdInputTxt me-2">Search:</span>
                    <span>
                      <input
                        onChange={onSearchChange}
                        className="searchBarInput"
                      />
                    </span>
                  </div>
                  <Table
                    rowKey={(record) => record.key1}
                    expandable={{
                      columnWidth: "1%",
                      expandedRowRender: (record) => (
                        <p
                          style={{
                            margin: 0,
                            fontSize: "13px",
                            background: "transparent!important",
                          }}
                        >
                          Driver: {record.driver}
                        </p>
                      ),
                      rowExpandable: (record) => record.key1 === record.key1,
                    }}
                    columns={truckTrackingColumn}
                    dataSource={
                      filter
                        ? filterTruckTrackingDataSource
                        : truckTrackingDataSource
                    }
                    bordered={false}
                    className=" mt-2 rounded-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </Modal>
    </>
  );
};
export default TruckDetail;
