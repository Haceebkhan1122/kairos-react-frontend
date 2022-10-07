import axios from "../axiosconfig/index";

const DeliverDashboard = {
  getAllHeaderOfEquipment: () => {
    return new Promise((resolve, reject) => {
      const config = {
        method: "get",
        url: "/api/equipment/getequip?top=0&skip=0",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
        },
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
  getAllEquipmentData: ({ top, skip, fromDate, toDate }) => {
    return new Promise((resolve, reject) => {
      // const config = {
      //   method: "get",
      //   url: "/api/equipment/getequipdata?top=0&skip=0",
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
      //   },
      // };
      console.log("IN API-->", top, skip, fromDate, toDate);
      var config = {
        method: "get",
        url: `/api/equipment/getequipdata?top=${top}&skip=${skip}&date1=${fromDate}&date2=${toDate}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
        },
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
  getAllNewEquipData: () => {
    return new Promise((resolve, reject) => {
      const config = {
        method: "get",
        url: "/api/equipment/getequipdatanew",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
        },
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
  getCustomers: () => {
    return new Promise((resolve, reject) => {
      const config = {
        method: "get",
        url: "/api/equipment/customer",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
        },
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR in getting customers-->", error);
          reject(error);
        });
    });
  },
  addAppointmentData: ({
    custNum,
    description,
    fromData,
    toDate,
    customerName,
    partNum,
    shipToNum,
    UseOTS,
    otsName,
    otsAddress1,
    otsAddress2,
    otsCity,
    otsZip,
  }) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        CustNum: custNum,
        OrderComment: "",
        ChrgAmount: "89",
        TotalNet: "15.4",
        RequestDate: fromData,
        NeedByDate: toDate,
        PartNum: partNum,
        LineDesc: description,
        UnitPrice: "14.00",
        OrderQty: "1.00",
        SellingQuantity: "1.00",
        Discount: "0.00",
        CustomerName: customerName,
        ShipToCustNum: custNum.toString(),
        ShipToNum: shipToNum.toString(),
        OTSName: UseOTS ? otsName : "",
        OTSAddress1: UseOTS ? otsAddress1 : "",
        UseOTS: UseOTS.toString(),
        OTSAddress2: UseOTS ? otsAddress2 : "",
        OTSCity: UseOTS ? otsCity : "",
        OTSZIP: UseOTS ? otsZip : "",
      });
      const config = {
        method: "post",
        url: "/api/equipment/createsaleweb",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
  getCustomerAddresses: ({ custNum }) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        CustNum: custNum,
      });

      const config = {
        method: "post",
        url: "/api/equipment/shiptonum",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
  addQuote: ({
    custNum,
    fromDate,
    toDate,
    dueDate,
    partNum,
    lineDesc,
    customerName,
    shipToNum,
    customerCustId,
  }) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        CustNum: custNum,
        OrderComment: "test",
        RequestDate: fromDate,
        NeedByDate: toDate,
        duedate: dueDate,
        PartNum: partNum.toString(),
        LineDesc: lineDesc,
        OrderQty: "1.00",
        CustomerName: customerName,
        ShipToCustNum: custNum.toString(),
        ShipToNum: shipToNum.toString(),
        CustomerCustID: customerCustId.toString(),
      });

      const config = {
        method: "post",
        url: "/api/equipment/createQuote",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
  createSaleOrder: (body) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        CustNum: body.custNum,
        OrderComment: "",
        ChrgAmount: "89",
        TotalNet: "15.4",
        RequestDate: body.startDate,
        NeedByDate: body.endDate,
        PartNum: body.equipType,
        LineDesc: body.equipDescription,
        OrderQty: "1.00",
        CustomerName: body.customerName,
        ShipToCustNum: body.custNum.toString(),
        ShipToNum: body.shipToNum.toString(),
        OTSName: body.otsName,
        OTSAddress1: body.otsAddress1,
        UseOTS: body.ots.toString(),
        OTSAddress2: body.otsAddress2,
        OTSCity: body.otsCity,
        OTSZIP: body.otsZip,
      });

      const config = {
        method: "post",
        url: "/api/equipment/sale",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
  createQuote: (body) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        CustNum: body.custNum,
        OrderComment: "test",
        RequestDate: body.startDate,
        NeedByDate: body.endDate,
        duedate: body.endDate,
        PartNum: body.equipType,
        LineDesc: body.description,
        OrderQty: "1.00",
        CustomerName: body.customerName,
        ShipToCustNum: body.custNum.toString(),
        ShipToNum: body.shipToNum.toString(),
        CustomerCustID: body.custId,
      });
      const config = {
        method: "post",
        url: "/api/equipment/Quote",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
  confirmQuote: ({ quoteId }) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        QuoteNum: quoteId,
      });

      const config = {
        method: "post",
        url: "/api/equipment/confirmquote",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
  createOrderFromQuote: (body) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        ReasonType: "W",
        ReasonCode: "WON",
        key4: body.key4,
        QuoteNum: body.quoteId,
        UD12_Date01: body.startDate,
        UD12_Date02: body.endDate,
      });

      const config = {
        method: "post",
        url: "/api/equipment/winlosequote",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("ERROR-->", error);
          reject(error);
        });
    });
  },
};
export default DeliverDashboard;
