import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api",
});

API.interceptors.request.use((cfg) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      // Use the set method of AxiosRequestHeaders
      cfg.headers!.Authorization = `Bearer ${token}`;
    }
  }
  return cfg;
});

export const api = "http://localhost:5000/api";
