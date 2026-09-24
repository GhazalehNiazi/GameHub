import axios, { type AxiosInstance } from "axios";
import type { ApiResponse } from "./types";

/** Known mock / local placeholder URLs */
const MOCK_PLACEHOLDERS = ["/api/v1", "https://api.example.com", "http://localhost:3000/mock", ""];

/** Default API Base URL - set VITE_API_BASE_URL in .env or replace here when backend arrives */
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

/**
 * Toggle flag for Mock vs Real Backend APIs.
 * Automatically switches to false (real backend) as soon as BASE_URL is replaced
 * with a real backend URL, or can be explicitly overridden via VITE_USE_MOCK_API ("true" / "false").
 */
export const USE_MOCK_API: boolean = (() => {
  if (import.meta.env.VITE_USE_MOCK_API === "false") return false;
  if (import.meta.env.VITE_USE_MOCK_API === "true") return true;
  return MOCK_PLACEHOLDERS.includes(BASE_URL.trim());
})();

/** Configured Axios Client Instance */
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/** Request Interceptor: Attach Auth Token */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/** Response Interceptor: Global Error Handling */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected network error occurred.";
    console.error("[API Error]:", message, error);
    return Promise.reject(new Error(message));
  },
);

/**
 * Utility helper for mock API services.
 * Simulates real network latency and returns structured ApiResponse<T>.
 */
export async function mockApiResponse<T>(
  data: T,
  delayMs: number = 350,
  shouldFail: boolean = false,
  errorMessage: string = "Mock API Error",
): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(errorMessage));
      } else {
        resolve({
          success: true,
          data,
          timestamp: new Date().toISOString(),
        });
      }
    }, delayMs);
  });
}
