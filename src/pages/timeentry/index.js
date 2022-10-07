import React, {useRef, useState} from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "./style.scss";
import "./datePicker.css";
import NumberFormat from "react-number-format";
import {ArrowLeftSvg, ArrowRightSvg, ArrowUpSvg, CopyFileSvg, FileSvg, PlusSvg, SubmitSvg,} from "../../assets/icons";
import {Button, Form, Space, Table, TimePicker,} from "antd";
import {BellOutlined, DownOutlined,} from "@ant-design/icons";
import {EmplooyeInput} from "../../components/layout";
import {TimeEntryApi} from "../../api";
import {MyDropDown} from "../../components/shared";
// const { RangePicker } = DatePicker;
const TimeEntry = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);

  const [duplicateRowKeys, setDuplicateRowKeys] = useState([]);
  const [editRowKeys, setEditRowKeys] = useState([]);
  const [editingRow, setEditingRow] = useState();
  const currentDate = useRef(moment());

  const [dateRange, setDateRange] = useState({
    startDate: new Date(currentDate.current.startOf("isoweek").utc()),
    endDate: new Date(currentDate.current.endOf("week").utc()),
  });
  const currentDay = useRef(dateRange.startDate.getDay());
  const selectedEmpNum = useRef("");
  const selectedDate = useRef(moment(dateRange.startDate).format("YYYY-MM-DD"));

  const [employeeWeeklyData, setEmployeeWeeklyData] = useState([]);
  const weeklyData = [
    {
      key: 1,
      weeklyHours: "Production Hours",
      Mon: 0.0,
    },
    {
      key: 2,
      weeklyHours: "Indirect Hours",
      Mon: 0.0,
    },
    {
      key: 3,
      weeklyHours: "Total Hours",
      Mon: 0.0,
    },
  ];
  const weeklyReportColumn = [
    {
      title: "Weekly Hours",
      dataIndex: "weeklyHours",
      className: "weeklyTblCells p-0",
      width: "11%",
    },
    {
      title: "Mon 11-APR",
      dataIndex: "monday",
      width: "11%",
      className: "p-0",
      render: (_, record) => (
        <div>
          <NumberFormat
            className="weeklyTblInput"
            value={parseFloat(record?.monday).toFixed(2)}
            displayType="input"
          />
        </div>
      ),
    },
    {
      title: "TUE 12-APR",
      dataIndex: "tuesday",
      width: "11%",
      className: "p-0",
      render: (_, record) => (
        <div>
          <NumberFormat
            className="weeklyTblInput"
            value={parseFloat(record?.tuesday).toFixed(2)}
            displayType="input"
          />
        </div>
      ),
    },
    {
      title: "WED 13-APR",
      dataIndex: "wednesday",
      width: "11%",
      className: "p-0",
      render: (_, record) => (
        <div>
          <NumberFormat
            className="weeklyTblInput"
            value={parseFloat(record?.wednesday).toFixed(2)}
            displayType="input"
          />
        </div>
      ),
    },
    {
      title: "THU 14-APR",
      dataIndex: "thursday",
      width: "11%",
      className: "p-0",
      render: (_, record) => (
        <div>
          <NumberFormat
            className="weeklyTblInput"
            value={parseFloat(record?.thursday).toFixed(2)}
            displayType="input"
          />
        </div>
      ),
    },
    {
      title: "FRI 15-APR",
      dataIndex: "friday",
      width: "11%",
      className: "p-0",
      render: (_, record) => (
        <div>
          <NumberFormat
            className="weeklyTblInput"
            value={parseFloat(record?.friday).toFixed(2)}
            displayType="input"
          />
        </div>
      ),
    },
    {
      title: "SAT 16-APR",
      dataIndex: "saturday",
      width: "11%",
      className: "p-0",
      render: (_, record) => (
        <div>
          <NumberFormat
            className="weeklyTblInput"
            value={parseFloat(record?.saturday).toFixed(2)}
            displayType="input"
          />
        </div>
      ),
    },
    {
      title: "SUN 17-APR",
      dataIndex: "sunday",
      width: "11%",
      className: "p-0",
      render: (_, record) => (
        <div>
          <NumberFormat
            className="weeklyTblInput"
            value={parseFloat(record?.sunday).toFixed(2)}
            displayType="input"
          />
        </div>
      ),
    },
    {
      title: "TOTALS",
      dataIndex: "total",
      width: "11%",
      className: "p-0",
      render: (_, record) => (
        <div>
          <NumberFormat
            className="weeklyTblInput"
            value={parseFloat(record?.total).toFixed(2)}
            displayType="input"
          />
        </div>
      ),
    },
  ];
  const timeEntryColumn = [
    {
      title: "DATE",
      dataIndex: "PayrollDate",
      width: "8%",
      className: "text-center",
      key: "PayrollDate",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              <DatePicker
                value={
                  record?.PayrollDate
                    ? moment(record?.PayrollDate).format("YYYY-MM-DD")
                    : ""
                }
              />
            </Form.Item>
          );
        } else {
          return (
            <span>
              {record?.PayrollDate
                ? moment(record?.PayrollDate).format("YYYY-MM-DD")
                : ""}
            </span>
          );
        }
      },
      editable: true,
    },
    {
      title: "START TIME",
      // width:"8%",
      className: "text-center",
      dataIndex: "DspClockInTime",
      key: "DspClockInTime",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              <TimePicker
                defaultValue={moment(record?.DspClockInTime + ":00", "HH:mm")}
                size="small"
              />
            </Form.Item>
          );
        } else {
          return (
            <span>
              {record?.DspClockInTime
                ? moment
                    .duration(
                      moment(record?.DspClockInTime + ":00", "HH:mm:ss").format(
                        "HH:mm"
                      )
                    )
                    .asHours() + ":00"
                : ""}
            </span>
          );
        }
      },
      editable: true,
    },
    {
      title: "END TIME",
      className: "text-center",
      dataIndex: "DspClockOutTime",
      key: "DspClockOutTime",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              <TimePicker
                defaultValue={moment(
                  record?.DspClockOutTime + ":00",
                  "HH:mm:ss"
                )}
                size="small"
              />
            </Form.Item>
          );
        } else {
          return (
            <span>
              {record?.DspClockOutTime
                ? moment
                    .duration(
                      moment(
                        record?.DspClockOutTime + ":00",
                        "HH:mm:ss"
                      ).format("HH:mm")
                    )
                    .asHours() + ":00"
                : ""}
            </span>
          );
        }
      },
      editable: true,
    },
    {
      title: "HRS",
      className: "text-center",
      dataIndex: "LaborHrs",
      key: "LaborHrs",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              <TimePicker
                defaultValue={moment(record?.LaborHrs + ":00", "HH")}
                size="small"
              />
            </Form.Item>
          );
        } else {
          return (
            <span>
              {record?.DspClockInTime
                ? moment
                    .duration(
                      moment(record?.LaborHrs + ":00", "HH:mm:ss").format(
                        "HH:mm"
                      )
                    )
                    .asHours()
                : ""}
            </span>
          );
        }
      },
      editable: true,
    },
    {
      title: "LABOUR TYPE",
      className: "text-center",
      dataIndex: "LaborType",
      key: "LaborType",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              {/*<Button>*/}
              {/*    <Space className="d-flex justify-content-between">*/}
              {/*        <span>{record?.LaborType === 'P' ?  'Project': 'Indirect'}</span>*/}
              {/*        <DownOutlined />*/}
              {/*    </Space>*/}
              {/*</Button>*/}
              <MyDropDown
                defaultValue={
                  record?.LaborType === "P"
                    ? "Project"
                    : record?.LaborType === "I"
                    ? "Indirect"
                    : "Production"
                }
                component={"labourType"}
              />
            </Form.Item>
          );
        } else {
          return (
            <span>
              {record?.LaborType === "P"
                ? "Project"
                : record?.LaborType === "I"
                ? "Indirect"
                : "Production"}
            </span>
          );
        }
      },
      editable: true,
    },
    {
      title: "PROJECT",
      className: "text-center",
      dataIndex: "ProjectID",
      key: "ProjectID",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              {/*<Button>*/}
              {/*    <Space className="d-flex justify-content-between">*/}
              {/*        <span>{record.ProjectID}</span>*/}
              {/*        <DownOutlined />*/}
              {/*    </Space>*/}
              {/*</Button>*/}
              <MyDropDown
                defaultValue={record.ProjectID}
                component={"getProjects"}
              />
            </Form.Item>
          );
        } else {
          return <span>{record.ProjectID}</span>;
        }
      },
      editable: true,
    },
    {
      title: "PHASE",
      className: "text-center",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              {/*<Button>*/}
              {/*    <Space className="d-flex justify-content-between">*/}
              {/*        <span>{record?.PhaseID +'-'+ record.assembldescrp}</span>*/}
              {/*        <DownOutlined />*/}
              {/*    </Space>*/}
              {/*</Button>*/}
              <MyDropDown
                defaultValue={record?.PhaseID + "-" + record.assembldescrp}
                component={"getPhase"}
                projectId={record.ProjectID}
              />
            </Form.Item>
          );
        } else {
          return <span>{record?.PhaseID + "-" + record.assembldescrp}</span>;
        }
      },
      editable: true,
    },
    {
      title: "INDIRECT CODE",
      className: "text-center",
      dataIndex: "IndirectCode",
      key: "IndirectCode",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              <Button>
                <Space className="d-flex justify-content-between">
                  <span>{record?.IndirectCode}</span>
                  <DownOutlined />
                </Space>
              </Button>
            </Form.Item>
          );
        } else {
          return <span>{record?.IndirectCode}</span>;
        }
      },
      editable: true,
    },
    {
      title: "COMMENTS",
      className: "text-center",
      dataIndex: "LaborNote",
      key: "LaborNote",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              <textarea style={{ width: "100px", height: "40px" }}>
                {record?.LaborNote}
              </textarea>
            </Form.Item>
          );
        } else {
          return <span>{record?.LaborNote}</span>;
        }
      },
      editable: true,
    },
    {
      title: "OVERTIME",
      className: "text-center forCheckbox",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              <input type="checkbox" checked={!!record.Overtime_c} />
            </Form.Item>
          );
        } else {
          return (
            <span className="forDatePicker">
              {" "}
              <input
                disabled={true}
                checked={!!record.Overtime_c}
                type="checkbox"
              />
            </span>
          );
        }
      },
      editable: true,
    },
    {
      title: "LUNCH TAKEN",
      className: "text-center forCheckbox",
      dataIndex: "LunchTaken_c",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              <input type="checkbox" checked={!!record.LunchTaken_c} />
            </Form.Item>
          );
        } else {
          return (
            <span className="forDatePicker">
              {" "}
              <input
                disabled={true}
                checked={!!record.LunchTaken_c}
                type="checkbox"
              />
            </span>
          );
        }
      },
      editable: true,
    },
    {
      title: "OPERATION",
      className: "text-center",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item className="forDatePicker">
              <Button>
                <Space className="d-flex justify-content-between">
                  <span>
                    {record.OpCode ? record?.OprSeq + "-" + record.OpCode : ""}
                  </span>
                  <DownOutlined />
                </Space>
              </Button>
            </Form.Item>
          );
        } else {
          return (
            <span>
              {record.OpCode ? record?.OprSeq + "-" + record.OpCode : ""}
            </span>
          );
        }
      },
      editable: true,
    },
  ];
  let abc = true;

  function rightArrowClickHandler() {
    const date = {
      startDate: new Date(
        moment(dateRange.startDate).add(7, "days").startOf("isoweek").utc()
      ),
      endDate: new Date(
        moment(dateRange.startDate).add(7, "days").startOf("isoweek").utc()
      ),
    };
    setDateRange(date);
    selectedDate.current = moment(date.startDate).format("YYYY-MM-DD");
    if (selectedEmpNum.current.length > 0) {
      onEmployeeChange(selectedEmpNum.current);
    }
    // currentDay.current = date.startDate.getDay();
  }

  function leftArrowClickHandler() {
    const date = {
      startDate: new Date(
        moment(dateRange.startDate).add(-7, "days").startOf("isoweek").utc()
      ),
      endDate: new Date(
        moment(dateRange.startDate).add(-7, "days").startOf("isoweek").utc()
      ),
    };
    setDateRange(date);
    selectedDate.current = moment(date.startDate).format("YYYY-MM-DD");
    // currentDay.current = date.startDate.getDay();
    if (selectedEmpNum.current.length > 0) {
      onEmployeeChange(selectedEmpNum.current);
    }
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  let onEmployeeChange = (value) => {
    selectedEmpNum.current = value;
    // console.log(selectedDate,value);
    setDataLoading(true);
    TimeEntryApi.getEmployeesData(selectedDate.current, value)
      .then((res) => {
        console.log(JSON.stringify(res));
        console.log("data-1");
        const tempData = res.data.response1.map((eD, index) => {
          eD.key = index;
          return eD;
        });
        console.log(tempData);
        console.log("data-2");
        setEmployeesData(tempData);
        console.log(res.data.response1);
        // console.log(JSON.stringify(res));
        let weeklyTempData = [];
        weeklyTempData.push({
          weeklyHours: "Production Hours",
          monday: res.data.hoursarr.prohrs[0],
          tuesday: res.data.hoursarr.prohrs[1],
          wednesday: res.data.hoursarr.prohrs[2],
          thursday: res.data.hoursarr.prohrs[3],
          friday: res.data.hoursarr.prohrs[4],
          saturday: res.data.hoursarr.prohrs[5],
          sunday: res.data.hoursarr.prohrs[6],
          total:
            parseFloat(res.data.hoursarr.prohrs[0]) +
            parseFloat(res.data.hoursarr.prohrs[1]) +
            parseFloat(res.data.hoursarr.prohrs[2]) +
            parseFloat(res.data.hoursarr.prohrs[3]) +
            parseFloat(res.data.hoursarr.prohrs[4]) +
            parseFloat(res.data.hoursarr.prohrs[5]) +
            parseFloat(res.data.hoursarr.prohrs[6]),
        });
        weeklyTempData.push({
          weeklyHours: "Indirect Hours",
          monday: res.data.hoursarr.inhrs[0],
          tuesday: res.data.hoursarr.inhrs[1],
          wednesday: res.data.hoursarr.inhrs[2],
          thursday: res.data.hoursarr.inhrs[3],
          friday: res.data.hoursarr.inhrs[4],
          saturday: res.data.hoursarr.inhrs[5],
          sunday: res.data.hoursarr.inhrs[6],
          total:
            parseFloat(res.data.hoursarr.inhrs[0]) +
            parseFloat(res.data.hoursarr.inhrs[1]) +
            parseFloat(res.data.hoursarr.inhrs[2]) +
            parseFloat(res.data.hoursarr.inhrs[3]) +
            parseFloat(res.data.hoursarr.inhrs[4]) +
            parseFloat(res.data.hoursarr.inhrs[5]) +
            parseFloat(res.data.hoursarr.inhrs[6]),
        });
        weeklyTempData.push({
          weeklyHours: "Total",
          monday:
            parseFloat(res.data.hoursarr.prohrs[0]) +
            parseFloat(res.data.hoursarr.inhrs[0]),
          tuesday:
            parseFloat(res.data.hoursarr.prohrs[1]) +
            parseFloat(res.data.hoursarr.inhrs[1]),
          wednesday:
            parseFloat(res.data.hoursarr.prohrs[2]) +
            parseFloat(res.data.hoursarr.inhrs[2]),
          thursday:
            parseFloat(res.data.hoursarr.prohrs[3]) +
            parseFloat(res.data.hoursarr.inhrs[3]),
          friday:
            parseFloat(res.data.hoursarr.prohrs[4]) +
            parseFloat(res.data.hoursarr.inhrs[4]),
          saturday:
            parseFloat(res.data.hoursarr.prohrs[5]) +
            parseFloat(res.data.hoursarr.inhrs[5]),
          sunday:
            parseFloat(res.data.hoursarr.prohrs[6]) +
            parseFloat(res.data.hoursarr.inhrs[6]),
          total:
            parseFloat(res.data.hoursarr.prohrs[0]) +
            parseFloat(res.data.hoursarr.inhrs[0]) +
            (parseFloat(res.data.hoursarr.prohrs[1]) +
              parseFloat(res.data.hoursarr.inhrs[2])) +
            (parseFloat(res.data.hoursarr.prohrs[3]) +
              parseFloat(res.data.hoursarr.inhrs[3])) +
            (parseFloat(res.data.hoursarr.prohrs[4]) +
              parseFloat(res.data.hoursarr.inhrs[4])) +
            (parseFloat(res.data.hoursarr.prohrs[5]) +
              parseFloat(res.data.hoursarr.inhrs[5])) +
            (parseFloat(res.data.hoursarr.prohrs[6]) +
              parseFloat(res.data.hoursarr.inhrs[6])),
        });
        // console.log(weeklyTempData);
        setEmployeeWeeklyData(weeklyTempData);
        setEmployeesData(res.data.response1);
        // console.log(res.data.response1);
        setDataLoading(false);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log(JSON.stringify(err));
      });
  };
  return (
    <>
      <div class="timeEntryMain p-2">
        <div className="row mx-auto timeEntrySection py-2">
          <div className="col-12 p-0">
            <div>
              <div className="row mx-auto border-bottom px-2">
                <div className="col-xl-6 col-md-2 p-0 d-flex justify-content-md-start">
                  <span>
                    <BellOutlined className="align-baseline" />
                  </span>
                  <span className="headingText">Time Entry</span>
                </div>
                <div className="col-xl-6 col-md-10 p-0 d-flex justify-content-end">
                  <a className="timeEntryBtn">
                    <span className="me-2 align-top">
                      <FileSvg />
                    </span>
                    <span>Monthly Summary</span>
                  </a>
                  <a className="timeEntryBtn">
                    <span className="me-2 align-top">
                      <PlusSvg />
                    </span>
                    <span>New Record</span>
                  </a>
                  <a className="timeEntryBtn">
                    <span className="me-2 align-top">
                      <SubmitSvg />
                    </span>
                    <span>Submit Week</span>
                  </a>
                  <a className="timeEntryBtn">
                    <span className="me-2 align-top">
                      <CopyFileSvg />
                    </span>
                    <span>Copy Previous Week</span>
                  </a>
                </div>
              </div>
              <div className="row d-flex mx-auto align-items-center mt-2 px-2">
                <div className="col-lg-3 col-sm-6">
                  <div className="row d-flex align-items-center">
                    <span className="col-sm-3 col-6 statusTxt">Employees:</span>
                    <span className="col-sm-7 col-6">
                      <EmplooyeInput
                        className="timeEntryClass"
                        onChange={onEmployeeChange}
                      />
                    </span>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 mt-sm-0 mt-2">
                  <div className="row d-flex align-items-center">
                    <span className="col-6 statusTxt text-sm-end text-start pe-0">
                      Week Data:
                    </span>
                    <span
                      className="col-6 text-start align-bottom"
                      style={{ width: "20px" }}
                    >
                      {/*<DatePicker*/}
                      {/*    allowClear={false}*/}
                      {/*    // bordered={false}*/}
                      {/*    suffixIcon={null}*/}
                      {/*    size='small'*/}
                      {/*    style={{width:120,height:24,borderRadius:'5px !important',boxShadow:'none !important',overflow:'hidden !important'}}*/}
                      {/*    className="inputRounded border border-dark timeEntryInputs timeEntryClass bg-white text-start"*/}
                      {/*    // picker="week"*/}
                      {/*    // format={'DD-MM-YYYY'}*/}
                      {/*    defaultValue={moment('2015/01/01', dateFormat)}*/}
                      {/*    format={dateFormat}*/}
                      {/*    // defaultValue={moment(moment(record?.Calculated_DueDate).format("YYYY-MM-D"), 'YYYY-MM-DD')}*/}
                      {/*/>*/}
                      <DatePicker
                        className="inputRounded border border-dark timeEntryInputs timeEntryClass bg-white text-start"
                        selected={
                          new Date(
                            moment(dateRange.startDate).format("YYYY-MM-DD")
                          )
                        }
                        onChange={(date) => {
                          // console.log(moment(date).format("YYYY-MM-DD"));
                          selectedDate.current =
                            moment(date).format("YYYY-MM-DD");
                          setDateRange({ ...dateRange, startDate: date });
                          selectedDate.current =
                            moment(date).format("YYYY-MM-DD");
                          console.log(selectedDate.current);
                          if (selectedEmpNum.current.length > 0) {
                            onEmployeeChange(selectedEmpNum.current);
                          }
                        }}
                        dateFormat={"yyyy-MM-dd"}
                        name="startDate"
                        filterDate={(date) =>
                          date.getDay() === currentDay.current
                        }
                        // placeholderText="Select a Monday"
                      />
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="row">
                    <div className="col-sm-2 col-3 d-flex justify-content-lg-end justify-content-md-start justify-content-start pe-0">
                      <div className="d-flex flex-wrap justify-content-end mt-2">
                        <a className="iconLinks d-flex align-items-start ms-1">
                          <ArrowUpSvg />
                        </a>
                        <a
                          onClick={leftArrowClickHandler}
                          className="iconLinks d-flex align-items-center ms-1"
                        >
                          <ArrowLeftSvg />
                        </a>
                        <a
                          onClick={rightArrowClickHandler}
                          className="iconLinks d-flex align-items-center ms-1"
                        >
                          <ArrowRightSvg />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-10 col-sm-6 col-9 ps-0 ps-1">
                      <div>
                        <span className="statusTxt">
                          Colors for different Status
                        </span>
                      </div>
                      <div className="d-flex flex-wrap justigy-content-start">
                        <button
                          className="statusBtn border border-dark bg-white mt-md-0 mt-sm-1 mt-1"
                          style={{ color: "#3F4254" }}
                        >
                          Entered
                        </button>
                        <button
                          className="statusBtn  mt-md-0 mt-sm-1 mt-1"
                          style={{
                            color: "#FFA800",
                            backgroundColor: "#FFF4DE",
                          }}
                        >
                          Submitted
                        </button>
                        <button
                          className="statusBtn  mt-md-0 mt-sm-1 mt-1"
                          style={{
                            color: "#ffffff",
                            backgroundColor: "#FFA800",
                          }}
                        >
                          Overtime
                        </button>
                        <button
                          className="statusBtn  mt-md-0 mt-sm-1 mt-1"
                          style={{
                            color: "#1BC5BD",
                            backgroundColor: "#C9F7F5",
                          }}
                        >
                          Approved
                        </button>
                        <button
                          className="statusBtn  mt-md-0 mt-sm-1 mt-1"
                          style={{
                            color: "#ffffff",
                            backgroundColor: "#F64E60",
                          }}
                        >
                          Rejected
                        </button>
                        <button
                          className="statusBtn responsiveStatusBtn  mt-md-0 mt-sm-1 mt-1"
                          style={{
                            color: "#F64E60",
                            backgroundColor: "#FFE2E5",
                          }}
                        >
                          Entry from an other plant
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 p-0 px-2 timeEntryTableSection">
            <Form>
              <Table
                rowKey={(record) => record.key}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      {editingRow !== record.key &&
                        !duplicateRowKeys.includes(record.key) && (
                          <div>
                            <div className="row my-1">
                              <span className="col-2 timeEntryExpandTxt">
                                Qty:
                              </span>
                              <span className="col-10 timeEntryExpandTxtSec">
                                0
                              </span>
                            </div>
                            <div className="row my-1">
                              <span className="col-2 timeEntryExpandTxt">
                                Resource:
                              </span>
                              <span className="col-10 timeEntryExpandTxtSec">
                                {record.ResourceID}
                              </span>
                            </div>
                            <div className="row my-1">
                              <span className="col-2 timeEntryExpandTxt">
                                Expense Code:
                              </span>
                              <span className="col-10 timeEntryExpandTxtSec">
                                {record.ExpenseCode}- {record.expdescrp}
                              </span>
                            </div>
                            <div className="row my-1">
                              <span className="col-2 timeEntryExpandTxt">
                                JCDept:
                              </span>
                              <span className="col-10 timeEntryExpandTxtSec">
                                {record.JCDept}- {record.jcdescrp}
                              </span>
                            </div>
                            <div className="row my-1">
                              <span className="col-2 timeEntryExpandTxt">
                                Actions:
                              </span>
                              <span className="col-10 d-flex">
                                <button
                                  onClick={() => {
                                    setEditRowKeys((prev) => [
                                      ...prev,
                                      record.key,
                                    ]);
                                    setEditingRow(record.key);
                                  }}
                                  className=""
                                  style={{
                                    border: "1px solid #FFA800",
                                    backgroundColor: "#FFA800",
                                    color: "#ffffff",
                                    borderRadius: "5px",
                                    padding: "3px",
                                    fontSize: "12px!important",
                                    fontWeight: "400",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="p-1 ms-2"
                                  style={{
                                    border: "1px solid #F64E60",
                                    backgroundColor: "#F64E60",
                                    color: "#ffffff",
                                    borderRadius: "5px",
                                    padding: "3px",
                                    fontSize: "12px!important",
                                    fontWeight: "400",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => {
                                    setDuplicateRowKeys((prev) => [
                                      ...prev,
                                      record.key,
                                    ]);
                                  }}
                                  className="p-1 ms-2"
                                  style={{
                                    border: "1px solid #6993FF",
                                    backgroundColor: "#6993FF",
                                    color: "#ffffff",
                                    borderRadius: "5px",
                                    padding: "3px",
                                    fontSize: "12px!important",
                                    fontWeight: "400",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  Duplicate
                                </button>
                                <button
                                  className="p-1 ms-2"
                                  style={{
                                    border: "1px solid #E4E6EF",
                                    backgroundColor: "#E4E6EF",
                                    color: "#3F4254",
                                    borderRadius: "5px",
                                    padding: "3px",
                                    fontSize: "12px!important",
                                    fontWeight: "400",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  Submit
                                </button>
                              </span>
                            </div>
                          </div>
                        )}
                      {editingRow === record.key && (
                        <div className="">
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              Qty:
                            </span>
                            <span className="col-10 timeEntryExpandTxtSec timeEntryEditBtns">
                              <input
                                className="d-flex justify-content-start qtyInput"
                                defaultValue={0}
                              ></input>
                            </span>
                          </div>
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              Resource:
                            </span>
                            <span className="col-10 timeEntryExpandTxtSec timeEntryEditBtns">
                              <Button>
                                <Space className="d-flex justify-content-between">
                                  {record.ResourceID}
                                  <DownOutlined />
                                </Space>
                              </Button>
                            </span>
                          </div>
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              Expense Code:
                            </span>
                            <span className="col-10 timeEntryExpandTxtSec timeEntryEditBtns">
                              <Button>
                                <Space className="d-flex justify-content-between">
                                  <span>
                                    {record.ExpenseCode}- {record.expdescrp}
                                  </span>
                                  <DownOutlined />
                                </Space>
                              </Button>
                            </span>
                          </div>
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              JCDept:
                            </span>
                            <span className="col-10 timeEntryExpandTxtSec timeEntryEditBtns">
                              <Button>
                                <Space className="d-flex justify-content-between w-100">
                                  <span>
                                    {record.JCDept}- {record.jcdescrp}
                                  </span>
                                  <DownOutlined
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: "700",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                </Space>
                              </Button>
                            </span>
                          </div>
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              Actions:
                            </span>
                            <span className="col-10 d-flex align-items-center">
                              <button
                                className="d-flex align-items-center"
                                style={{
                                  border: "1px solid #1BC5BD",
                                  backgroundColor: "#1BC5BD",
                                  color: "#ffffff",
                                  borderRadius: "5px",
                                  padding: "3px",
                                  fontSize: "12px!important",
                                  fontWeight: "400",
                                }}
                              >
                                Update
                              </button>
                              <button
                                onClick={() => {
                                  setEditingRow(null);
                                }}
                                className="p-1 ms-2 d-flex align-items-center"
                                style={{
                                  border: "1px solid #6993FF",
                                  backgroundColor: "#6993FF",
                                  color: "#ffffff",
                                  borderRadius: "5px",
                                  padding: "3px",
                                  fontSize: "12px!important",
                                  fontWeight: "400",
                                }}
                              >
                                Cancel
                              </button>
                            </span>
                          </div>
                        </div>
                      )}
                      {duplicateRowKeys.includes(record.key) && (
                        <div className="">
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              Qty:
                            </span>
                            <span className="col-10 timeEntryExpandTxtSec timeEntryEditBtns">
                              <Button className="d-flex justify-content-start">
                                <Space>0</Space>
                              </Button>
                            </span>
                          </div>
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              Resource:
                            </span>
                            <span className="col-10 timeEntryExpandTxtSec timeEntryEditBtns">
                              <Button>
                                <Space className="d-flex justify-content-between">
                                  {record.ResourceID}
                                  <DownOutlined />
                                </Space>
                              </Button>
                            </span>
                          </div>
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              Expense Code:
                            </span>
                            <span className="col-10 timeEntryExpandTxtSec timeEntryEditBtns">
                              <Button>
                                <Space className="d-flex justify-content-between">
                                  <span>
                                    {record.ExpenseCode}- {record.expdescrp}
                                  </span>
                                  <DownOutlined />
                                </Space>
                              </Button>
                            </span>
                          </div>
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              JCDept:
                            </span>
                            <span className="col-10 timeEntryExpandTxtSec timeEntryEditBtns">
                              <Button>
                                <Space className="d-flex justify-content-between w-100">
                                  <span>
                                    {record.JCDept}- {record.jcdescrp}
                                  </span>
                                  <DownOutlined
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: "700",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                </Space>
                              </Button>
                            </span>
                          </div>
                          <div className="row my-1">
                            <span className="col-2 timeEntryExpandTxt">
                              Actions:
                            </span>
                            <span className="col-10 d-flex align-items-center">
                              <button
                                className="d-flex align-items-center"
                                style={{
                                  border: "1px solid #1BC5BD",
                                  backgroundColor: "#1BC5BD",
                                  color: "#ffffff",
                                  borderRadius: "5px",
                                  padding: "3px",
                                  fontSize: "12px!important",
                                  fontWeight: "400",
                                }}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  const newArray = duplicateRowKeys.filter(
                                    (item) => item.id == record.key
                                  );
                                  setDuplicateRowKeys(newArray);
                                }}
                                className="p-1 ms-2 d-flex align-items-center"
                                style={{
                                  border: "1px solid #6993FF",
                                  backgroundColor: "#6993FF",
                                  color: "#ffffff",
                                  borderRadius: "5px",
                                  padding: "3px",
                                  fontSize: "12px!important",
                                  fontWeight: "400",
                                }}
                              >
                                Cancel
                              </button>
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  ),
                  rowExpandable: (record) => record.key == record.key,
                }}
                columns={timeEntryColumn}
                rowClassName={(record, index) =>
                  record.TimeStatus === "A"
                    ? "mySuccessColor"
                    : record.TimeStatus === "R"
                    ? "myDangerColor"
                    : record.TimeStatus === "S"
                    ? "myWarningLightColor"
                    : record.TimeStatus === "E" && record.Overtime_c
                    ? "myWarningColor"
                    : ""
                }
                bordered={false}
                loading={dataLoading}
                className={"timeEntryTable"}
                dataSource={employeesData}
                pagination={{
                  showTotal: (total) => `Total ${total} items`,
                  total: 10,
                  pageSizeOptions: ["10", "20", "25", "30"],
                  showSizeChanger: true,
                  locale: { items_per_page: "" },
                }}
              />
            </Form>
          </div>
        </div>
        <div className="row mx-auto timeEntrySection py-2 mt-2 px-2">
          <div className="col-12 p-0">
            <div className="mx-auto d-flex">
              <span>
                <BellOutlined className="align-baseline" />
              </span>
              <span className="headingText">Weekly Report</span>
            </div>
          </div>
          <div className="col-12 p-0 weeklyTableSection">
            <Table
              rowKey={(record) => record.key}
              // expandable={{
              //     expandedRowRender:(record)=>(<h1>ABc</h1>),
              //     rowExpandable:record=>record.key==record.key,
              // }}
              className="weeklyTbl"
              columns={weeklyReportColumn}
              dataSource={employeeWeeklyData}
              size={"small"}
              bordered={false}
              pagination={{
                showTotal: (total) => `Total ${total} items`,
                total: 10,
                pageSizeOptions: ["10", "20", "25", "30"],
                showSizeChanger: true,
                locale: { items_per_page: "" },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeEntry;