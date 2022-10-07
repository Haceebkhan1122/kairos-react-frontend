import React from "react";
import MyFormModal from "../../components/shared/myFormModal";
import {
  CLOSE_ORDER_CLR,
  NON_QUOTED_CLR,
  OPEN_ORDER_CLR,
  QUOTED_CLR,
} from "./color";

export default function CellComponent(props) {
  const [visibleFormModal, setVisibleFormModal] = React.useState(false);
  const selectedOrderOrQuoteData = React.useRef({});

  const { targetedAppointmentData } = props.e.data;
  const t = targetedAppointmentData.text.split("~")[0].split(" ");
  const n = targetedAppointmentData.text.split("~");
  const d = targetedAppointmentData;
  const [length, setLength] = React.useState(0);
  const [toolTip, setToolTip] = React.useState(false);
  // const typeData = props.dataSource.filter((i) => {
  //   return i.type === targetedAppointmentData.type;
  // });
  // typeData.forEach((i, index) => {
  //   const start = new Date(targetedAppointmentData.startDate).getTime();
  //   const end = new Date(targetedAppointmentData.endDate).getTime();
  //   if (targetedAppointmentData.type === i.type) {
  //     const iStart = new Date(i.startDate).getTime();
  //     const iEnd = new Date(i.endDate).getTime();
  //     if (iStart >= start && iEnd <= end) {
  //       l++;
  //     }
  //   }
  // });
  // setLength(l);
  let count = 0;
  let onAppointmentClick = () => {
    selectedOrderOrQuoteData.current = props.e.data.appointmentData;
    selectedOrderOrQuoteData.current.headers = props.headerDataRef;
    selectedOrderOrQuoteData.current.customers = props.allCustomers;
    selectedOrderOrQuoteData.current.dataSourceRef = props.dataSourceRef;
    selectedOrderOrQuoteData.current.dataSource = props.dataSource;
    selectedOrderOrQuoteData.current.setDataSource = props.setDataSource;
    count++;
    if (count === 2) {
      setVisibleFormModal(true);
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor:
            d.orderId !== ""
              ? d.status
                ? OPEN_ORDER_CLR
                : CLOSE_ORDER_CLR
              : d.status
              ? QUOTED_CLR
              : NON_QUOTED_CLR,
          height: "45px",
          position: "absolute",
          bottom: "-20px",
          width: "100%",
          wordBreak: "break-all",
        }}
      >
        <div
          onClick={onAppointmentClick}
          onMouseEnter={(e) => {
            setToolTip(true);
          }}
          onMouseLeave={() => {
            setToolTip(false);
          }}
          style={{
            position: "relative",
            width: "100%",
            fontSize: "10px",
            // "-webkit-line-clamp": "3",
            WebkitLineClamp: "3",
            // "-webkit-box-orient": "vertical",
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            wordBreak: "break-all",
            overflow: "hidden",
            display: "-webkit-box",
          }}
        >
          {d.orderId === "" ? "Quote Id: " : "Order Id: "}
          {t[0]}
          {" Line: "}
          {t[1]}
          <br />
          {"Customer Id: "}
          {t[2]}
          <br />
          {"Customer Name: "}
          {n[1]}
          {/*<span*/}
          {/*  style={{*/}
          {/*    visibility: toolTip ? "visible" : "hidden",*/}
          {/*    position: "absolute",*/}
          {/*    zIndex: "1",*/}
          {/*    right: 0,*/}
          {/*    bottom: "-20px",*/}
          {/*    color: "red",*/}
          {/*    background: "yellow",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  some Text Here*/}
          {/*</span>*/}
        </div>
        {visibleFormModal && (
          <MyFormModal
            setDataSource={props.setDataSource}
            detail={selectedOrderOrQuoteData.current}
            visible={visibleFormModal}
            setVisible={setVisibleFormModal}
          />
        )}
      </div>
    </>
  );
}
