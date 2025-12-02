import { SimpleAuthService } from "@/services/simpleAuth";
import axios, { AxiosInstance } from "axios";

// Custom event to trigger login modal
const triggerLoginModal = (failedRequest?: any) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("showLoginModal", {
        detail: { request: failedRequest },
      })
    );
  }
};

// Extend AxiosInstance to include basic methods
import { CustomAxiosInstance } from "@/interface";

const axiosInstance: CustomAxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}) as CustomAxiosInstance;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = SimpleAuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn(
        "Unauthorized! Clearing auth state and showing login modal..."
      );

      // Clear auth data
      SimpleAuthService.logout();

      // Trigger login modal
      triggerLoginModal({
        config: error.config,
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
        timestamp: new Date().toISOString(),
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
