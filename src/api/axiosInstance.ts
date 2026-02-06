import axios from "axios";

/**
 * Axios instance configured for API calls
 * Base URL points to Next.js API routes
 */
export const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

import { supabase } from "@/lib/supabase";

/**
 * Request interceptor to add Authorization header
 * Gets accessToken from Supabase session
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get token from Supabase SDK
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const token = session?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for global error handling
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - clear token and redirect to login
    if (error.response?.status === 401 && typeof window !== "undefined") {
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    return Promise.reject(error);
  }
);
