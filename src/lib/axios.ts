import axios from "axios";
import { accessCookie } from "./handle-cookie";

export const axiosInstance = axios.create({
  baseURL: "https://secondarydev.goldengroup-bd.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = accessCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
