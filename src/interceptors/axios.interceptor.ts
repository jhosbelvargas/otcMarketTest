import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../helpers/authOtc.service";

const axiosApiInstance = axios.create();
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default axiosApiInstance;
