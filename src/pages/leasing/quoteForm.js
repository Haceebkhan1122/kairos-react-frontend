export const FormModal = (e) => {
  const { form } = e;
  form.updateData("data", "Quote");
  form.option("items", [
    {
      colSpan: 1,
      label: {
        text: "Tap Here to create a new order.",
      },
      editorType: "dxRadioGroup",
      dataField: "otsCity",
      editorOptions: {
        items: ["Quote", "Order"],
        layout: "horizontal",
        onValueChanged(args) {
          console.log("CHANGE", args.value);
          form.updateData("data", args.value);
        },
      },
    },
  ]);

  return <></>;
};
