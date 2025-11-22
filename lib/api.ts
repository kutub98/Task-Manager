import axios from "axios";

const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_API_BASE; // Production URL
  }
  return process.env.NEXT_PUBLIC_API_BASE_LOCAL; // Development URL
};

export const API = axios.create({
  baseURL: getBaseURL(),
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      // Use AxiosHeaders set method
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

export const api = "http://localhost:5000/api";
