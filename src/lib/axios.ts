import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // use env var or fallback
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     // e.g., add auth token
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling (e.g. toast)
    console.error("API error: ", error.response);
    return Promise.reject(error);
  }
);

export default api;
