import axios, { AxiosHeaders } from "axios";

// Determine base URL dynamically
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BASE
    : process.env.NEXT_PUBLIC_API_BASE_LOCAL || "http://localhost:5000/api";

// Create Axios instance
export const API = axios.create({
  baseURL: "https://task-manager-backend-yea2.onrender.com/api/",
});

// Request interceptor to attach token
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      // Ensure headers is an AxiosHeaders instance
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

// Export base URL as string if needed elsewhere
export const api = BASE_URL;
