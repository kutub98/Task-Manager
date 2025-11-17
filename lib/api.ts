import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api",
});
API.interceptors.request.use((cfg) => {
  if (typeof window !== "undefined") {
    const t = localStorage.getItem("token");
    if (t && cfg.headers) cfg.headers.Authorization = `Bearer ${t}`;
  }
  return cfg;
});
