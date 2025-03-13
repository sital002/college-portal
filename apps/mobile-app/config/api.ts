import axios from "axios";
import { getToken } from "./token";

export const apiClient = axios.create({
  baseURL: `http://192.168.1.14:8080/api/v1`,
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
