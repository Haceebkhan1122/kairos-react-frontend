import React from "react";
import moment from "moment";

export default function Appointment(model) {
  const { targetedAppointmentData } = model.e.data;
  // console.log(targetedAppointmentData);
  const data = targetedAppointmentData;
  const [arInvoice, setArInvoice] = React.useState(false);
  const [attachments, setAttachments] = React.useState(false);
  const [packSlip, setPackSlip] = React.useState(false);
  React.useEffect(() => {
    // console.log("data", data);
    if (data.orderId !== undefined) {
      // getAllBooleans()
      //   .then((res) => {
      //     setArInvoice(res.arRes);
      //     setAttachments(res.attachments);
      //     setPackSlip(res.packSlips);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, []);

  let onArInvoiceClick = () => {
    // model.onArInvoiceClick(data);
  };
  let onAttachmentClick = () => {
    // model.onAttachmentClick(data);
  };
  let onPackSlipClick = () => {
    // model.onPackSlipClick(data);
  };
  let onOrderDetailClick = () => {
    if (data.orderId !== undefined) {
      model.onOrderDetailClick(data);
    }
  };
  return (
    <div
      style={{ position: data.allDay ? "relative" : "absolute" }}
      className={
        data.allDay
          ? "allDay"
          : data.status === "UnAck"
          ? "UnAck"
          : data.status === "Delivered"
          ? "Delivered"
          : data.status === "Rej"
          ? "Rej"
          : data.status === "Arrived"
          ? "Arrived"
          : data.status === "Started"
          ? "Started"
          : "Ack"
      }
    >
      <div className="iconMain">
        {data.hasPackSlips && (
          <span
            className="mx-1"
            onClick={onPackSlipClick}
            style={{
              display: "flex",
              alignItem: "center",
              height: "10px",
            }}
          >
            <svg
              width="10px"
              height="10px"
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="LocalShippingIcon"
              tabIndex="-1"
              title="LocalShipping"
              fill="blue"
            >
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
            </svg>
          </span>
        )}

        {data.hasAttachments && (
          <span
            className="mx-1"
            onClick={onAttachmentClick}
            style={{
              display: "flex",
              alignItem: "center",
              height: "10px",
            }}
          >
            <svg
              width="10px"
              height="10px"
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="AttachFileIcon"
              tabIndex="-1"
              title="AttachFile"
              fill="red"
            >
              <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path>
            </svg>
          </span>
        )}
        {data.hasArInvoices && (
          <span
            class="mx-1"
            onClick={onArInvoiceClick}
            style={{
              display: "flex",
              alignItem: "center",
              height: "10px",
            }}
          >
            <svg
              width="10px"
              height="10px"
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="DescriptionIcon"
              tabIndex="-1"
              title="Description"
              fill="green"
            >
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>
            </svg>
          </span>
        )}
      </div>
      {targetedAppointmentData.allDay || (
        <div onClick={onOrderDetailClick}>
          {moment(targetedAppointmentData.displayStartDate).format("h:mm")}
          {" - "}
          {moment(targetedAppointmentData.displayEndDate).format("LT")}
          {targetedAppointmentData.eTa !== "" &&
            ` -ETA- ${targetedAppointmentData.eTa}`}
        </div>
      )}
      {targetedAppointmentData.allDay || (
        <div className="orderText" onClick={onOrderDetailClick}>
          {"Ord:"}
          {targetedAppointmentData.text.split("~")[0].split(":")[1]}
          {"-CustId:"}
          {targetedAppointmentData.text.split("~")[5].split(":")[1]}
          <br />
          {"Cust:"}
          {targetedAppointmentData.text.split("~")[1].split(":")[1]}
          <br />
          {"Total:"}
          {targetedAppointmentData.text.split("~")[2].split(":")[1]}
          {"-Zip:"}
          {targetedAppointmentData.text.split("~")[6].split(":")[1]}
          <br />
        </div>
      )}
      {targetedAppointmentData.allDay && (
        <div className="orderText" onClick={onOrderDetailClick}>
          {targetedAppointmentData.text}
        </div>
      )}
    </div>
  );
}
