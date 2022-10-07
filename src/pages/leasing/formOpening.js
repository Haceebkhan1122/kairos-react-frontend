import { LeasingModuleApi } from "../../api";

export const FormOpening = (e, headersData, customerData) => {
  const { form } = e;
  let formItems = form.option("items");
  console.log("BUILT-IN-FORM", formItems, form);
  let { startDate, endDate } = e.appointmentData;
  let addCusOtsField = (cBox) => {
    console.log("FORM ITEM-->", formItems);
    // e.form.itemOption("otsName", { visible: cBox });
    // e.form.itemOption("otsAddress1", { visible: cBox });
    // e.form.itemOption("otsAddress2", { visible: cBox });
    // e.form.itemOption("otsCity", { visible: cBox });
    // e.form.itemOption("otsZip", { visible: cBox });
    const otsName = form?.getEditor("otsName");
    otsName?.option("disabled", !cBox);
    const otsAddress1 = form?.getEditor("otsAddress1");
    otsAddress1?.option("disabled", !cBox);
    const otsAddress2 = form?.getEditor("otsAddress2");
    otsAddress2?.option("disabled", !cBox);
    const otsCity = form?.getEditor("otsCity");
    otsCity?.option("disabled", !cBox);
    const otsZip = form?.getEditor("otsZip");
    otsZip?.option("disabled", !cBox);
  };
  form.updateData("startDate", new Date(startDate));
  if (!e.appointmentData.orderId) {
    form.updateData("endDate", new Date(startDate));
    endDate = startDate;
    const desc = headersData.find((h) => {
      return h.id === e.appointmentData.type;
    });
    form.updateData("description", desc.text.split("-")[1]);
  } else {
    console.log("NOT ORDER ID-->", e.appointmentData);
    form.updateData("description", e.appointmentData.description);
    form.updateData("endDate", new Date(endDate));
  }
  if (e.appointmentData.UseOTS === "true") {
    form.updateData("d", true);
  } else if (e.appointmentData.UseOTS === "false") {
    console.log("FALSE-->", e.appointmentData);
    LeasingModuleApi.getCustomerAddresses({
      custNum: e.appointmentData.customerId,
    })
      .then((res) => {
        const addresses = form.getEditor("address");
        let array = res.part.filter((item) => {
          return item.ShipToNum !== "";
        });
        addresses.option("items", array);
        if (e.appointmentData.address !== "") {
          let currentAd = res.part.find((item) => {
            return item.ShipToNum === e.appointmentData.address;
          });
          addresses.option("value", currentAd.ShipToNum);
        } else {
          addresses.option("value", null);
        }
        addresses.option("disabled", false);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
  }

  // if (text) {
  //   form.updateData("description", text.split("-")[1]);
  // }

  form.option("items", [
    {
      itemType: "group",
      colCountByScreen: {
        lg: 2,
        xs: 1,
      },
      name: "mainGroup",
      colSpan: 2,
      items: [
        {
          itemType: "group",
          colCountByScreen: {
            lg: 2,
            xs: 2,
          },
          colSpan: 2,
          items: [
            {
              colSpan: 2,
              label: {
                text: "Quote?",
              },
              editorType: "dxCheckBox",
              dataField: "orderOrQuote",
              editorOptions: {
                displayExpr: "d",
                onValueChanged(args) {
                  const cBox = args.value;
                  // e.form.itemOption("mainGroup", { colSpan: cBox ? 1 : 2 });
                  // e.form.itemOption("otsGroup", { colSpan: cBox ? 1 : 2 });
                  form.updateData("orderOrQuote", args.value);
                  const dueDate = form?.getEditor("dueDate");
                  dueDate?.option("disabled", !cBox);
                  if (cBox) {
                    const otsName = form?.getEditor("otsName");
                    otsName?.option("disabled", cBox);
                    const otsAddress1 = form?.getEditor("otsAddress1");
                    otsAddress1?.option("disabled", cBox);
                    const otsAddress2 = form?.getEditor("otsAddress2");
                    otsAddress2?.option("disabled", cBox);
                    const otsCity = form?.getEditor("otsCity");
                    otsCity?.option("disabled", cBox);
                    const otsZip = form?.getEditor("otsZip");
                    otsZip?.option("disabled", cBox);
                    const d = form.getEditor("d");
                    d.option("disabled", args.value);
                  } else {
                    const d = form.getEditor("d");
                    d.option("disabled", args.value);
                  }
                },
              },
            },
            {
              colSpan: 1,
              label: {
                text: "Equipment Type",
              },
              editorType: "dxSelectBox",
              dataField: "type",
              editorOptions: {
                value: e.appointmentData?.type,
                items: headersData,
                searchEnabled: true,
                displayExpr: "text",
                valueExpr: "id",
                onValueChanged(args) {
                  let type = args.value;
                  const desc = headersData.find((item) => {
                    return item.id === type;
                  });
                  form.updateData("type", type);
                  form.updateData("description", desc.text.split("-")[1]);
                  // form.updateData("endDate", new Date(endDate));
                  // form.updateData("startDate", new Date(startDate));
                },
              },
            },
          ],
        },
        {
          colSpan: 1,
          label: {
            text: "Customer Name",
          },
          editorType: "dxSelectBox",
          dataField: "customerName",
          isRequired: true,
          editorOptions: {
            value: e.appointmentData?.customerId,
            items: customerData,
            searchEnabled: true,
            displayExpr: "Name",
            // valueExpr: ["Name", "CustNum"],
            valueExpr: "CustNum",
            onValueChanged(args) {
              let cust = args.value;
              console.log("cust on Change", cust);
              form.updateData("customerName", cust);
              // form.updateData("endDate", new Date(endDate));
              // form.updateData("startDate", new Date(startDate));
              const regExp = /[a-zA-Z]/g;
              console.log(typeof cust);
              if (!regExp.test(cust)) {
                LeasingModuleApi.getCustomerAddresses({ custNum: cust })
                  .then((res) => {
                    const addresses = form.getEditor("address");
                    let array = res.part.filter((item) => {
                      return item.ShipToNum !== "";
                    });
                    addresses.option("items", array);
                    addresses.option("disabled", false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            },
          },
        },
        {
          colSpan: 1,
          label: {
            text: "Description",
          },
          editorType: "dxTextBox",
          dataField: "description",
          isRequired: true,
          editorOptions: {
            disabled: true,
            displayExpr: "description",
            // valueExpr: "description",
            onValueChanged(args) {
              let customerId = args.value;
              form.updateData("description", customerId);
              form.updateData("text", customerId);
              // form.updateData("endDate", new Date(endDate));
              // form.updateData("startDate", new Date(startDate));
            },
          },
        },
        {
          colSpan: 1,
          label: {
            text: "Address",
          },
          editorType: "dxSelectBox",
          dataField: "address",
          // isRequired: true,
          editorOptions: {
            disabled: true,
            items: [],
            displayExpr: "Address1",
            // valueExpr: ["Address1", "ShipToNum"],
            valueExpr: "ShipToNum",
            onValueChanged(args) {
              console.log("address on Change", args.value);
              form.updateData("address", args.value);
              // form.updateData("endDate", new Date(endDate));
              // form.updateData("startDate", new Date(startDate));
            },
          },
        },
        {
          colSpan: 1,
          label: {
            text: "One Time Ship",
          },
          editorType: "dxCheckBox",
          dataField: "d",
          editorOptions: {
            displayExpr: "d",
            onValueChanged(args) {
              e.form.itemOption("mainGroup", { colSpan: 3 });
              e.form.itemOption("mainGroup", { colSpan: 2 });
              e.form.itemOption("otsGroup", { visible: args.value });
              const address = form.getEditor("address");
              address.option("disabled", args.value);
              form.updateData("checkBox", args.value);
              addCusOtsField(args.value);
            },
          },
        },
        {
          colSpan: 1,
          name: "DueDate",
          dataField: "dueDate",
          editorType: "dxDateBox",
          editorOptions: {
            disabled: true,
            displayFormat: "yyyy-MM-dd",
            width: "100%",
            type: "date",
            onValueChanged(args) {
              const v = args.value;
              form.updateData("dueDate", new Date(v));
            },
          },
        },
        {
          colSpan: 1,
          name: "startDate",
          dataField: "startDate",
          editorType: "dxDateBox",
          editorOptions: {
            displayFormat: "yyyy-MM-dd",
            width: "100%",
            type: "date",
            onValueChanged(args) {
              // console.log("ON DATE CHANGE-->", args);
              startDate = args.value;
              form.updateData("startDate", new Date(startDate));
            },
          },
        },
        {
          colSpan: 1,
          name: "endDate",
          dataField: "endDate",
          editorType: "dxDateBox",
          editorOptions: {
            displayFormat: "yyyy-MM-dd",
            width: "100%",
            type: "date",
            onValueChanged(args) {
              // console.log("ON DATE CHANGE-->", args);
              let endDate = args.value;
              form.updateData("endDate", new Date(endDate));
            },
          },
        },
      ],
    },
    {
      itemType: "group",
      colCountByScreen: {
        lg: 2,
        xs: 1,
      },
      name: "otsGroup",
      colSpan: 2,
      visible: false,
      items: [
        {
          colSpan: 1,
          label: {
            text: "Name",
          },
          editorType: "dxTextBox",
          dataField: "otsName",
          editorOptions: {
            disabled: true,
            onValueChanged(args) {
              form.updateData("otsName", args.value);
            },
          },
        },
        {
          colSpan: 1,
          label: {
            text: "Address1",
          },
          editorType: "dxTextBox",
          dataField: "otsAddress1",
          editorOptions: {
            disabled: true,
            displayExpr: "otsAddress1",
            onValueChanged(args) {
              form.updateData("otsAddress1", args.value);
              // form.updateData("endDate", new Date(endDate));
              // form.updateData("startDate", new Date(startDate));
            },
          },
        },
        {
          colSpan: 1,
          label: {
            text: "Address2",
          },
          editorType: "dxTextBox",
          dataField: "otsAddress2",
          editorOptions: {
            disabled: true,
            onValueChanged(args) {
              form.updateData("otsAddress2", args.value);
            },
          },
        },
        {
          colSpan: 1,
          label: {
            text: "City",
          },
          editorType: "dxTextBox",
          dataField: "otsCity",
          editorOptions: {
            disabled: true,
            onValueChanged(args) {
              form.updateData("otsCity", args.value);
            },
          },
        },
        {
          colSpan: 1,
          label: {
            text: "Zip",
          },
          editorType: "dxTextBox",
          dataField: "otsZip",
          editorOptions: {
            disabled: true,
            onValueChanged(args) {
              form.updateData("otsZip", args.value);
            },
          },
        },
      ],
    },
  ]);
  if (e.appointmentData.UseOTS === "true") {
    const d = e.appointmentData;
    form.updateData("otsName", d.otsName);
    form.updateData("otsAddress1", d.otsAddress1);
    form.updateData("otsAddress2", d.otsAddress2);
    form.updateData("otsCity", d.otsCity);
    form.updateData("otsZip", d.otsZip);
    e.form.itemOption("otsGroup", { visible: true });
    addCusOtsField(true);
  }
  if (
    e.appointmentData.orderId !== "" ||
    e.appointmentData.orderId !== null ||
    e.appointmentData.orderId !== undefined
  ) {
  }
  return <></>;
};

// {
//   colSpan: 1,
//       label: {
//   text: "Quote?",
// },
//   editorType: "dxCheckBox",
//       dataField: "orderOrQuote",
//     editorOptions: {
//   displayExpr: "d",
//       onValueChanged(args) {
//     const cBox = args.value;
//     e.form.itemOption("otsGroup", { visible: cBox });
//     form.updateData("orderOrQuote", args.value);
//     const dueDate = form?.getEditor("dueDate");
//     dueDate?.option("disabled", !cBox);
//     if (cBox) {
//       const otsName = form?.getEditor("otsName");
//       otsName?.option("disabled", cBox);
//       const otsAddress1 = form?.getEditor("otsAddress1");
//       otsAddress1?.option("disabled", cBox);
//       const otsAddress2 = form?.getEditor("otsAddress2");
//       otsAddress2?.option("disabled", cBox);
//       const otsCity = form?.getEditor("otsCity");
//       otsCity?.option("disabled", cBox);
//       const otsZip = form?.getEditor("otsZip");
//       otsZip?.option("disabled", cBox);
//       const d = form.getEditor("d");
//       d.option("disabled", args.value);
//     } else {
//       const d = form.getEditor("d");
//       d.option("disabled", args.value);
//     }
//   },
// },
// },
// {
//   colSpan: 1,
//       label: {
//   text: "Equipment Type",
// },
//   editorType: "dxSelectBox",
//       editorOptions: {
//   value: e.appointmentData?.type,
//       items: headersData,
//       searchEnabled: true,
//       displayExpr: "text",
//       valueExpr: "id",
//       onValueChanged(args) {
//     let type = args.value;
//     const desc = headersData.find((item) => {
//       return item.id === type;
//     });
//     form.updateData("type", type);
//     form.updateData("description", desc.text.split("-")[1]);
//     // form.updateData("endDate", new Date(endDate));
//     // form.updateData("startDate", new Date(startDate));
//   },
// },
// },
// {
//   colSpan: 1,
//       label: {
//   text: "Customer Name",
// },
//   editorType: "dxSelectBox",
//       dataField: "customerName",
//     isRequired: true,
//     editorOptions: {
//   value: e.appointmentData?.customerId,
//       items: customerData,
//       searchEnabled: true,
//       displayExpr: "Name",
//       // valueExpr: ["Name", "CustNum"],
//       valueExpr: "CustNum",
//       onValueChanged(args) {
//     let cust = args.value;
//     console.log("cust on Change", cust);
//     form.updateData("customerName", cust);
//     // form.updateData("endDate", new Date(endDate));
//     // form.updateData("startDate", new Date(startDate));
//     const regExp = /[a-zA-Z]/g;
//     console.log(typeof cust);
//     if (!regExp.test(cust)) {
//       LeasingModuleApi.getCustomerAddresses({ custNum: cust })
//           .then((res) => {
//             const addresses = form.getEditor("address");
//             let array = res.part.filter((item) => {
//               return item.ShipToNum !== "";
//             });
//             addresses.option("items", array);
//             addresses.option("disabled", false);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//     }
//   },
// },
// },
// {
//   colSpan: 2,
//       label: {
//   text: "Description",
// },
//   editorType: "dxTextBox",
//       dataField: "description",
//     isRequired: true,
//     editorOptions: {
//   disabled: true,
//       displayExpr: "description",
//       // valueExpr: "description",
//       onValueChanged(args) {
//     let customerId = args.value;
//     form.updateData("description", customerId);
//     form.updateData("text", customerId);
//     // form.updateData("endDate", new Date(endDate));
//     // form.updateData("startDate", new Date(startDate));
//   },
// },
// },
// {
//   colSpan: 1,
//       label: {
//   text: "Address",
// },
//   editorType: "dxSelectBox",
//       dataField: "address",
//     // isRequired: true,
//     editorOptions: {
//   disabled: true,
//       items: [],
//       displayExpr: "Address1",
//       // valueExpr: ["Address1", "ShipToNum"],
//       valueExpr: "ShipToNum",
//       onValueChanged(args) {
//     console.log("address on Change", args.value);
//     form.updateData("address", args.value);
//     // form.updateData("endDate", new Date(endDate));
//     // form.updateData("startDate", new Date(startDate));
//   },
// },
// },
// {
//   colSpan: 1,
//       label: {
//   text: "One Time Ship",
// },
//   editorType: "dxCheckBox",
//       dataField: "d",
//     editorOptions: {
//   displayExpr: "d",
//       onValueChanged(args) {
//     const address = form.getEditor("address");
//     address.option("disabled", args.value);
//     form.updateData("checkBox", args.value);
//     addCusOtsField(args.value);
//   },
// },
// },
// {
//   colSpan: 1,
//       label: {
//   text: "Name",
// },
//   editorType: "dxTextBox",
//       dataField: "otsName",
//     editorOptions: {
//   disabled: true,
//       onValueChanged(args) {
//     form.updateData("otsName", args.value);
//   },
// },
// },
// {
//   colSpan: 1,
//       label: {
//   text: "Address1",
// },
//   editorType: "dxTextBox",
//       dataField: "otsAddress1",
//     editorOptions: {
//   disabled: true,
//       displayExpr: "otsAddress1",
//       onValueChanged(args) {
//     form.updateData("otsAddress1", args.value);
//     // form.updateData("endDate", new Date(endDate));
//     // form.updateData("startDate", new Date(startDate));
//   },
// },
// },
// {
//   colSpan: 1,
//       label: {
//   text: "Address2",
// },
//   editorType: "dxTextBox",
//       dataField: "otsAddress2",
//     editorOptions: {
//   disabled: true,
//       onValueChanged(args) {
//     form.updateData("otsAddress2", args.value);
//   },
// },
// },
// {
//   colSpan: 1,
//       label: {
//   text: "City",
// },
//   editorType: "dxTextBox",
//       dataField: "otsCity",
//     editorOptions: {
//   disabled: true,
//       onValueChanged(args) {
//     form.updateData("otsCity", args.value);
//   },
// },
// },
// {
//   colSpan: 1,
//       label: {
//   text: "Zip",
// },
//   editorType: "dxTextBox",
//       dataField: "otsZip",
//     editorOptions: {
//   disabled: true,
//       onValueChanged(args) {
//     form.updateData("otsZip", args.value);
//   },
// },
// },
// {
//   colSpan: 1,
//       name: "DueDate",
//     dataField: "dueDate",
//     editorType: "dxDateBox",
//     editorOptions: {
//   disabled: true,
//       displayFormat: "yyyy-MM-dd",
//       width: "100%",
//       type: "date",
//       onValueChanged(args) {
//     const v = args.value;
//     form.updateData("dueDate", new Date(v));
//   },
// },
// },
// {
//   colSpan: 1,
//       name: "startDate",
//     dataField: "startDate",
//     editorType: "dxDateBox",
//     editorOptions: {
//   displayFormat: "yyyy-MM-dd",
//       width: "100%",
//       type: "date",
//       onValueChanged(args) {
//     // console.log("ON DATE CHANGE-->", args);
//     startDate = args.value;
//     form.updateData("startDate", new Date(startDate));
//   },
// },
// },
// {
//   colSpan: 1,
//       name: "endDate",
//     dataField: "endDate",
//     editorType: "dxDateBox",
//     editorOptions: {
//   displayFormat: "yyyy-MM-dd",
//       width: "100%",
//       type: "date",
//       onValueChanged(args) {
//     // console.log("ON DATE CHANGE-->", args);
//     let endDate = args.value;
//     form.updateData("endDate", new Date(endDate));
//   },
// },
// },
