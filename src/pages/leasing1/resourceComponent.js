import React, { memo } from "react";
import { getFreeOrBusyEquipInRedux } from "../../redux/leasing";
import { useSelector } from "react-redux";

const ResourceComponent = (props) => {
  let freeOrBusyFromRedux = useSelector(getFreeOrBusyEquipInRedux);
  // let freeOrBusy = props.freeOrBusyEquip.filter((equip) => {
  //   return equip.id === props.e.data.id;
  // });
  let freeOrBusy = freeOrBusyFromRedux.filter((equip) => {
    return equip.id === props.e.data.id;
  });
  let componentStyle = React.useMemo(() => {
    return {
      // backgroundColor: props.data.color,
      color: "black",
      fontSize: "12px",
      fontWeight: "bold",
      padding: "5px",
      borderRadius: "5px",
      border:
        // props.dateStatus === true
        //   ? freeOrBusy[0]?.busy === true
        //     ? "2px solid red"
        //     : freeOrBusy[0]?.busy === false
        //     ? "2px solid green"
        //     : "1px solid white"
        //   :
        "1px solid white",
      textAlign: "center",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      textDecoration:
        // props.dateStatus === true
        freeOrBusyFromRedux.length > 0
          ? freeOrBusy[0]?.busy === true
            ? "underline"
            : freeOrBusy[0]?.busy === false
            ? "underline"
            : "none"
          : "none",
      textDecorationColor:
        // props.dateStatus === true
        freeOrBusyFromRedux.length > 0
          ? freeOrBusy[0]?.busy === true
            ? "red"
            : freeOrBusy[0]?.busy === false
            ? "green"
            : "white"
          : "white",
      textDecorationThickness:
        // props.dateStatus === true
        freeOrBusyFromRedux.length > 0
          ? freeOrBusy[0]?.busy === true
            ? "3px"
            : freeOrBusy[0]?.busy === false
            ? "3px"
            : "0"
          : "0",
    };
  }, []);
  return (
    <>
      <div className="flex" style={componentStyle}>
        {props.e.data.text}
        {/*{freeOrBusy.busy === true*/}
        {/*  ? "Busy"*/}
        {/*  : freeOrBusy.busy === false*/}
        {/*  ? "Free"*/}
        {/*  : "Unknown"}*/}
      </div>
    </>
  );
};
export default memo(ResourceComponent);
