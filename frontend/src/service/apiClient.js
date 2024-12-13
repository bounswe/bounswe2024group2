import axios from "axios";
import { log } from "../utils/logger";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, 
});

console.log(process.env);
console.log(process.env.REACT_APP_API_BASE_URL);
console.log(apiClient);

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export {
  apiClient,
  API_BASE_URL,
}
