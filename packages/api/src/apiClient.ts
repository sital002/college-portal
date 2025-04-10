import axios from "axios";

// http://192.168.18.7:8080/api/v1

export const apiClient = axios.create({
  baseURL: `http://localhost:8080/api/v1`,

  withCredentials: true,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
