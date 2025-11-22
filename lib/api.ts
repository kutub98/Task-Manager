import axios, { AxiosHeaders } from "axios";

// Dynamically determine base URL
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://task-manager-backend-yea2.onrender.com/api"
    : "http://localhost:5000/api";

export const API = axios.create({
  baseURL: BASE_URL,
});

// Attach token for authenticated requests
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      // Ensure headers exist
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

// Export base URL for non-Axios usage if needed
export const api = BASE_URL;
