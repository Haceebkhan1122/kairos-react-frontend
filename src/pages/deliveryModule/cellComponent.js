import React from "react";

export default function CellComponent(props) {
  const { targetedAppointmentData } = props.data;
  const data = targetedAppointmentData;
  return (
    <>
      <div>
        <div style={{ fontSize: "13px" }}>{data.text}</div>
      </div>
    </>
  );
}
