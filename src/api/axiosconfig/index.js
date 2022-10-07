import axios from "axios";

const instance = axios.create({
    baseURL: "https://m.kairossolutions.co",
    // baseURL: "http://localhost:3321",
    // baseURL: "http://192.168.100.57:3321",
});

export default instance;