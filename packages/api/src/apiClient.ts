import axios from "axios";

export const apiClient = axios.create({
  baseURL: `http://192.168.1.14:8080/api/v1`,
  withCredentials: true,
});
