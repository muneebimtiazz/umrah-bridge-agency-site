// src/lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true, // IMPORTANT: sends AccessToken + RefreshToken cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== REQUEST INTERCEPTOR (optional) =====
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== RESPONSE INTERCEPTOR (auto refresh token flow) =====
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // call refresh endpoint (uses HttpOnly refresh cookie)
        await api.post("/auth/refresh");

        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;