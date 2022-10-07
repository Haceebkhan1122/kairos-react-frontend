import React, { memo } from "react";
import MyFormModal from "../../components/shared/myFormModal";
import {
  CLOSE_ORDER_CLR,
  NON_QUOTED_CLR,
  OPEN_ORDER_CLR,
  QUOTED_CLR,
} from "./color";

const CellComponent = (props) => {
  const [visibleFormModal, setVisibleFormModal] = React.useState(false);
  const selectedOrderOrQuoteData = React.useRef({});
  const { targetedAppointmentData } = props.e.data;
  const t = targetedAppointmentData.text.split("~")[0].split(" ");
  const n = targetedAppointmentData.text.split("~");
  const [d, setD] = React.useState(targetedAppointmentData);
  React.useEffect(() => {
    setD(targetedAppointmentData);
    if (d.orderId !== "")
      if (d.status) {
        setColor(OPEN_ORDER_CLR);
      } else {
        setColor(CLOSE_ORDER_CLR);
      }
    else {
      if (d.status) {
        setColor(QUOTED_CLR);
      } else {
        setColor(NON_QUOTED_CLR);
      }
    }
    // console.log(targetedAppointmentData);
  }, [targetedAppointmentData, props.e.data, d.orderId, d.status]);
  const [length, setLength] = React.useState(0);
  const [toolTip, setToolTip] = React.useState(false);
  const [color, setColor] = React.useState("");
  let count = 0;
  let onAppointmentClick = () => {
    console.log(props);
    selectedOrderOrQuoteData.current = props.e.data.appointmentData;
    selectedOrderOrQuoteData.current.headers = props.headerDataRef;
    selectedOrderOrQuoteData.current.customers = props.allCustomerRef.current;
    selectedOrderOrQuoteData.current.dataSourceRef = props.dataSourceRef;
    selectedOrderOrQuoteData.current.dataSource = props.dataSourceRef.current;
    selectedOrderOrQuoteData.current.setDataSource = props.setDataSource;
    count++;
    if (count === 2) {
      setVisibleFormModal(true);
    }
  };
  // console.log(color);
  return (
    <>
      <div
        style={{
          backgroundColor: color,
          // d.orderId !== ""
          //   ? d.status
          //     ? OPEN_ORDER_CLR
          //     : CLOSE_ORDER_CLR
          //   : d.status
          //   ? QUOTED_CLR
          //   : NON_QUOTED_CLR,
          height: "45px",
          position: "absolute",
          bottom: "-20px",
          width: "100%",
          wordBreak: "break-all",
        }}
      >
        <div
          // onClick={onAppointmentClick}
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
};
export default memo(CellComponent);
