const MyEmptyComponent = (e) => {
  // console.log(e);
  const onclick = () => {
    console.log(e);
  };
  return (
    <>
      <div
        onClick={onclick}
        style={{
          height: "100%",
          width: "100px",
          display: "flex",
          "align-content": "center",
        }}
      >
        T
      </div>
    </>
  );
};

export default MyEmptyComponent;
