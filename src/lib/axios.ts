import axios from "axios";
import { cookieManager } from "./handle-cookie";

export const axiosInstance = axios.create({
  baseURL: "https://secondary.goldengroup-bd.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookieManager.getCookie("authToken")?.toString();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
