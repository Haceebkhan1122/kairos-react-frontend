import axios from "../axiosconfig/index";

let getOrderDetailsHeader = ({ orderId }) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      key: orderId,
    });

    const config = {
      method: "post",
      url: "/api/mordersapi/getsaleorderinfo",
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
};
let getOrderDetailsLines = ({ orderId }) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      order: orderId,
    });
    const config = {
      method: "post",
      url: "/api/mdashbord/getsaleslines",
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
};
let getTruckDetails = ({ truckId, date, shift }) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      dt: date,
      truckid: truckId,
      shift: shift,
    });
    const config = {
      method: "post",
      url: "/api/mtruck/gettruckdetails",
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
};
let getTruckDriverDetail = ({ truckId, date }) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      key: date,
      truckid: truckId,
    });

    const config = {
      method: "post",
      url: "/api/mordersapi/getdriverorderhistory",
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
};

const DeliverDashboard = {
  getTrucksAndRoutes: (date) => {
    return new Promise((resolve, reject) => {
      const config = {
        method: "get",
        url: "/api/mdashbord/planner?date=" + date,
        // url: "http://192.168.100.57:3322/api/mdashbord/planner?date=" + date,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
          "Content-Type": "application/json",
        },
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  getOptimizedTrucksAndRoutes: (date) => {
    return new Promise((resolve, reject) => {
      var config = {
        method: "get",
        url: `/api/mdashbord/plannerwithdistanceMultiple?date=${date}&org=FRASER AVENUE ,WEST PERTH WA 6005,AUSTRALIA&org=WELSHPOOL WA 6107,AUSTRALIA&routes=10&org=PINJARRA WA 6208,AUSTRALIA&org=MOUNT BARKER WA 6324 ,AUSTRALIA&org=NORTHAM WA 6401 ,AUSTRALIA&org=JURIEN BAY WA 6516 ,AUSTRALIA&org=MORAWA WA 6623 ,AUSTRALIA&org=CARNARVON WA 6701 ,AUSTRALIA&org=ACCOUNTS PAYABLE ,WEST PERTH WA 6872,AUSTRALIA&org=WEST LEEDERVILLE WA 6901 ,AUSTRALIA`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
        },
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  updateOrder: ({ column, orderId, updatedStartTime, updatedEndTime }) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        newKey1: column,
        newKey2: "",
        newKey3: "",
        updatedId: orderId.toString(),
        updatedTime: updatedStartTime,
        updatedEnd: updatedEndTime,
      });
      console.log("IN UPDATEITEM API-->", data);
      const config = {
        method: "post",
        // url: "http://192.168.100.9:3322/api/mdashbord/updatekanbanitem",
        url: "/api/mdashbord/updatekanbanitem",
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
  getOrderSummary: ({ id, date }) => {
    return new Promise((resolve, reject) => {
      console.log("OrderSummary-API", id, date);
      const data = JSON.stringify({
        id: id,
        date: date,
      });
      const config = {
        method: "post",
        url: "/api/mdashbord/summary",
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
  getOrderDetails: ({ orderId }) => {
    console.log("OrderDetails-API", orderId);
    return new Promise((resolve, reject) => {
      getOrderDetailsHeader({ orderId: orderId })
        .then((orderHeaderRes) => {
          getOrderDetailsLines({ orderId: orderHeaderRes.OrderHed_OrderNum })
            .then((orderLinesRes) => {
              console.log(orderHeaderRes);
              resolve({
                orderHeader: orderHeaderRes,
                orderLines: orderLinesRes,
              });
            })
            .catch((error) => {
              let errorObj = {
                message: "Error in getting order lines",
                error: error,
              };
              reject(errorObj);
            });
        })
        .catch((error) => {
          let errorObj = {
            message: "Error in getting order Header",
            error: error,
          };
          reject(errorObj);
        });
    });
  },
  getTruckDetail: ({ truckId, date, shift }) => {
    console.log("TruckDetail-API", truckId, date);
    return new Promise((resolve, reject) => {
      getTruckDetails({ truckId: truckId, date: date, shift: shift })
        .then((truckDetailRes) => {
          getTruckDriverDetail({ truckId: truckId, date: date })
            .then((truckDriverDetailRes) => {
              console.log(truckDetailRes);
              resolve({
                truckDetail: truckDetailRes,
                truckDriverDetail: truckDriverDetailRes,
              });
            })
            .catch((error) => {
              let errorObj = {
                message: "Error in getting Truck Driver Detail",
                error: error,
              };
              reject(errorObj);
            });
        })
        .catch((error) => {
          let errorObj = {
            message: "Error in getting Truck Detail",
            error: error,
          };
          reject(errorObj);
        });
    });
  },
  getAllTrucks: () => {
    return new Promise((resolve, reject) => {
      const config = {
        method: "post",
        url: "/api/mtruck/truckdetails",
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
  getUd33: () => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("key", "1");
      const config = {
        method: "post",
        url: "/api/mdashbord/getud33",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenMKairos"),
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

  getArInvoice: ({ id }) => {
    return new Promise((resolve, reject) => {
      const config = {
        method: "get",
        url: "/api/mdashbord/getARInvoice?top=5&skip=0&id=" + id,
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
  getAttachment: ({ id }) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        OrderNum: id,
      });

      const config = {
        method: "post",
        url: "/api/mdashbord/getattachment",
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
          console.log("ERROR in getting customers-->", error);
          reject(error);
        });
    });
  },
  getPackSlip: ({ id }) => {
    return new Promise((resolve, reject) => {
      const config = {
        method: "get",
        url: "/api/mdashbord/getPackSlip?top=100&skip=0&id=" + id,
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
  getAllEquipmentData: () => {
    return new Promise((resolve, reject) => {
      const config = {
        method: "get",
        url: "/api/equipment/",
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
  addAppointmentData: ({ partNum, description, fromData, toDate }) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        CustNum: 119,
        OrderComment: "",
        ChrgAmount: "0",
        TotalNet: "15.4",
        RequestDate: fromData,
        NeedByDate: toDate,
        PartNum: partNum,
        LineDesc: description,
        UnitPrice: "14.00",
        OrderQty: "1.00",
        SellingQuantity: "1.00",
        Discount: "0.00",
      });

      const config = {
        method: "post",
        url: "/api/equipment//createsaleweb",
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
  arrangeRoutePlan: ({ routeId, date }) => {
    return new Promise((resolve, reject) => {
      const config = {
        method: "get",
        url: `/api/mdashbord/plannerwithdistance?date=${date}&routid=${routeId}&org=Vision Plumbing~45 Ewing Street~Welshpool WA 6106~AUSTRALIA`,
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
};
export default DeliverDashboard;
