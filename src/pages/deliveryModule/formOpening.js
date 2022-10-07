export const FormOpening = (e, headersData) => {
  const { form } = e;
  let { startDate, endDate } = e.appointmentData;
  // const header = getHeaderById(e.appointmentData?.type) || {};
  form.option("items", [
    {
      label: {
        text: "Equipment Type",
      },
      editorType: "dxSelectBox",
      // dataField: "type",
      editorOptions: {
        value: e.appointmentData?.type,
        items: headersData,
        displayExpr: "text",
        valueExpr: "id",
        onValueChanged(args) {
          let type = args.value;
          form.updateData("type", type);
          form.updateData("endDate", new Date(endDate));
          form.updateData("startDate", new Date(startDate));
        },
      },
    },
    {
      label: {
        text: "Description",
      },
      editorType: "dxTextBox",
      dataField: "description",
      isRequired: true,
      editorOptions: {
        displayExpr: "description",
        valueExpr: "description",
        onValueChanged(args) {
          let customerId = args.value;
          form.updateData("description", customerId);
          form.updateData("endDate", new Date(endDate));
          form.updateData("startDate", new Date(startDate));
        },
      },
    },
    {
      label: {
        text: "Customer Name",
      },
      editorType: "dxTextBox",
      dataField: "customerName",
      editorOptions: {
        displayExpr: "text",
        onValueChanged(args) {
          console.log(args.value, args);
          let customerId = args.value;
          form.updateData("customerName", customerId);
          form.updateData("endDate", new Date(endDate));
          form.updateData("startDate", new Date(startDate));
        },
      },
    },
    {
      label: {
        text: "Location",
      },
      editorType: "dxTextBox",
      dataField: "location",
      editorOptions: {
        displayExpr: "location",
        onValueChanged(args) {
          console.log(args.value, args);
          let customerId = args.value;
          form.updateData("location", customerId);
          form.updateData("endDate", new Date(endDate));
          form.updateData("startDate", new Date(startDate));
        },
      },
    },
    {
      name: "startDate",
      dataField: "startDate",
      editorType: "dxDateBox",
      editorOptions: {
        width: "100%",
        type: "date",
        onValueChanged(args) {
          console.log("ON DATE CHANGE-->", args);
          startDate = args.value;
          form.updateData("startDate", new Date(startDate));
        },
      },
    },
    {
      name: "endDate",
      dataField: "endDate",
      editorType: "dxDateBox",
      editorOptions: {
        width: "100%",
        type: "date",
        onValueChanged(args) {
          console.log("ON DATE CHANGE-->", args);
          let endDate = args.value;
          form.updateData("endDate", new Date(endDate));
        },
      },
    },
  ]);
};
