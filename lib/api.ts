import axios from "axios";

export const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_local,
});
// export const API = axios.create({
//   baseURL: "https://task-manager-backend-yea2.onrender.com/api/",
// });

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
