import React from "react";
import {
  CLOSE_ORDER_CLR,
  NON_QUOTED_CLR,
  OPEN_ORDER_CLR,
  QUOTED_CLR,
} from "./color";

export default function CellComponent(props) {
  const d = props.e.original;
  // console.log(d);
  const t = d?.text?.split("~")[0];
  const n = d?.text?.split("~")[1];
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
          height: "48px",
          width: "100%",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            width: "100%",
            fontSize: "10px",
            color:
              d.orderId !== ""
                ? d.status
                  ? "white"
                  : "black"
                : d.status
                ? "black"
                : "black",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            wordBreak: "break-all",
            overflow: "hidden",
            display: "-webkit-box",
          }}
        >
          {t ? t : ""}
          <br />
          {n ? n : ""}
          {/*{d.orderId === "" ? "Quote Id: " : "Order Id: "}*/}
          {/*{t[0]}*/}
          {/*{" Line: "}*/}
          {/*{t[1]}*/}
          {/*<br />*/}
          {/*{"Customer Id: "}*/}
          {/*{t[2]}*/}
          {/*<br />*/}
          {/*{"Customer Name: "}*/}
          {/*{n[1]}*/}
        </div>
      </div>
    </>
  );
}
