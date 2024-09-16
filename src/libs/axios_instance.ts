import axios from "axios";
import { BASE_URL } from "./constants";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Base URL for all requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from sessionStorage
    const token = sessionStorage.getItem("authToken");

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
