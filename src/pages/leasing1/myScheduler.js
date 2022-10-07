import moment from "moment";
import ResourceComponent from "./resourceComponent";
import Scheduler, { Resource, Scrolling } from "devextreme-react/scheduler";
import React, { memo } from "react";
import { getDataSourceRedux } from "../../redux/leasing";
import { useSelector } from "react-redux";

const groups = ["type", "status"];

const MyScheduler = (props) => {
  const dataFromRedux = useSelector(getDataSourceRedux);
  const data = React.useMemo(() => props.dataSource, [props.dataSource]);
  // const data = React.useMemo(() => dataFromRedux, [dataFromRedux]);
  const headers = React.useMemo(() => props.headersData, [props.headersData]);

  const views = React.useMemo(
    () => [
      {
        name: "Week",
        type: "timelineWeek",
        intervalCount: 2,
        cellDuration: 1440,
        maxAppointmentsPerCell: "5",
        startDate: props.currentDate,
      },
      {
        name: "Month",
        type: "timelineMonth",
        maxAppointmentsPerCell: "5",
        startDate: props.currentDate,
      },
      {
        name: "Quarter",
        type: "timelineMonth",
        intervalCount: 3,
        maxAppointmentsPerCell: "5",
        startDate: props.currentDate,
      },
      {
        name: "Year",
        type: "timelineMonth",
        intervalCount: 12,
        maxAppointmentsPerCell: "5",
        startDate: props.currentDate,
      },
    ],
    []
  );
  const resourceCellComponent = React.useCallback((e) => {
    console.log("RCC");
    return (
      <ResourceComponent
        e={e}
        freeOrBusyEquip={props.freeOrBusyEquip}
        date={props.selectedQuipDate}
        dateStatus={props.selectEquipDateStatus}
      />
    );
  }, []);

  const appointmentTooltipRender = React.useCallback((e) => {
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

  const dateCellRender = React.useCallback((e) => {
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

  const onCurrentViewChange = React.useCallback((e) => {
    props.leasingCurrentView.current = e.toLowerCase();
    props.onDateChange();
  }, []);

  const onContentReady = React.useCallback((e) => {
    if (props.leasingCurrentView.current === "quarter") {
      const container = e.element;
      if (container.querySelector(".my-custom-row")) return;
      let tableHeader = container.querySelector(
        ".dx-scheduler-header-panel > thead"
      );
      let r = "";
      const date = moment([
        props.currentDate.getFullYear(),
        props.currentDate.getMonth(),
        1,
      ]);
      const endDate = moment([
        props.currentDate.getFullYear(),
        props.currentDate.getMonth() + 3,
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
  }, []);
  return (
    <>
      <Scheduler
        //timeZone={"Etc/GMT" + props.currentOffset}
        dataSource={data}
        showCurrentTimeIndicator={false}
        shadeUntilCurrentTime={true}
        defaultCurrentView="timelineMonth"
        groups={groups}
        views={views}
        editing={true}
        currentDate={props.currentDate}
        defaultCurrentDate={props.currentDate}
        onCurrentDateChange={props.onDateChange}
        onCurrentViewChange={onCurrentViewChange}
        crossScrollingEnabled={true}
        dataCellComponent={props.dataCellComponent}
        resourceCellComponent={resourceCellComponent}
        onContentReady={onContentReady}
        // onContentReady={(e) => {
        //   if (props.leasingCurrentView.current === "quarter") {
        //     const container = e.element;
        //     if (container.querySelector(".my-custom-row")) return;
        //     let tableHeader = container.querySelector(
        //       ".dx-scheduler-header-panel > thead"
        //     );
        //     let r = "";
        //
        //     const date = moment([
        //       props.currentDate.getFullYear(),
        //       props.currentDate.getMonth(),
        //       1,
        //     ]);
        //     const endDate = moment([
        //       props.currentDate.getFullYear(),
        //       props.currentDate.getMonth() + 3,
        //       0,
        //     ]);
        //
        //     // console.log("DIFF-->", date.diff(endDate, "weeks"));
        //     for (let i = 0; i < 13; i++) {
        //       r += `<th style="width:350px !important; text-align:center; border-left:solid red 2px; border-right:solid red 2px" colSpan="7" >Week ${
        //         i + 1
        //       } </th>`;
        //     }
        //     let string = `<tr class="my-custom-row dx-scheduler-header-row">${r}</tr>`;
        //     tableHeader.insertAdjacentHTML("afterbegin", string);
        //   }
        // }}
        appointmentComponent={props.appointmentComponent}
        onAppointmentFormOpening={props.onAppointmentFormOpening}
        appointmentTooltipRender={appointmentTooltipRender}
        dateCellRender={dateCellRender}
        onAppointmentDblClick={props.onAppointmentDoubleClick}
      >
        <Resource
          fieldExpr="type"
          allowMultiple={false}
          dataSource={headers}
          label="Header"
        />
        <Scrolling mode="virtual" />
      </Scheduler>
    </>
  );
};
export default memo(MyScheduler);
