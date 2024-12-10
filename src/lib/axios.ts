import axios from "axios";
import { cookieManager } from "./handle-cookie";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL as string ,
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
