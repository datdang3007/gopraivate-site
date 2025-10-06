import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Create axios instance with base configuration
const createAxiosInstance = (): AxiosInstance => {
  // Use proxy in development, direct URL in production
  const baseURL = import.meta.env.DEV 
    ? '/api'  // Use proxy in development
    : import.meta.env.VITE_CONTACT_API_ENDPOINT; // Direct URL in production
  
  const instance = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token if available
      const token = localStorage.getItem("authToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("🚀 [API Request]", config.method?.toUpperCase(), config.url);
      return config;
    },
    (error: AxiosError) => {
      console.error("❌ [API Request Error]", error);
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log("✅ [API Response]", response.status, response.config.url);
      return response;
    },
    (error: AxiosError) => {
      console.error(
        "❌ [API Response Error]",
        error.response?.status,
        error.config?.url,
      );

      // Handle 401 unauthorized
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const apiClient = createAxiosInstance();
export default apiClient;
