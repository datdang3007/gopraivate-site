import axios, { AxiosInstance } from "axios";

// Debug environment variables
console.log(
  "🛰️ [ENV Debug] VITE_CONTACT_API_ENDPOINT:",
  import.meta.env.VITE_CONTACT_API_ENDPOINT,
);
console.log("🛰️ [ENV Debug] VITE_API_HOST:", import.meta.env.VITE_API_HOST);

/**
 * Create axios instance with base configuration
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_CONTACT_API_ENDPOINT,
    timeout: 30000,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Debug log for axios creation
  console.log(
    "🛰️ [Axios Init] Base URL:",
    import.meta.env.VITE_CONTACT_API_ENDPOINT,
  );
  console.log("🛰️ [Axios Init] Host Header:", import.meta.env.VITE_API_HOST);

  return instance;
};

// Create the main axios instance
export const api: AxiosInstance = createAxiosInstance();

// Function to get client IP address
export const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to get client IP:", error);
    return "0.0.0.0"; // fallback IP
  }
};

// API call function with your structure
export const sendMessage = async (formData: any, recaptchaValue: string) => {
  try {
    const endPoint = `/api/v0/msg_id4040`;
    const response = await api.post(endPoint, {
      ...formData,
      recaptchaToken: recaptchaValue,
    });

    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Login API function
export const loginAPI = async (
  email: string,
  password: string,
  ip?: string,
) => {
  try {
    // Get real client IP if not provided
    const clientIP = ip || (await getClientIP());

    const endPoint = `/api/v1/auth/login_id1020`;
    const loginPayload = {
      email,
      password,
      ip: clientIP,
      project_id: "AIC",
    };

    console.log(
      "🚀 [Login API] Full URL:",
      `${import.meta.env.VITE_CONTACT_API_ENDPOINT}${endPoint}`,
    );
    console.log("🚀 [Login API] Payload:", loginPayload);

    const response = await api.post(endPoint, loginPayload);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// User Registration API function
export const registerAPI = async (
  email: string,
  password: string,
  recaptchaToken: string,
  ip?: string,
) => {
  try {
    // Get real client IP if not provided
    const clientIP = ip || (await getClientIP());

    const endPoint = `/api/v1/auth/register_id1000`;
    const registrationPayload = {
      email,
      password,
      is_human: true,
      ip: clientIP,
      project_id: "AIC",
      recaptchaToken,
    };

    console.log(
      "🚀 [Register API] Full URL:",
      `${import.meta.env.VITE_CONTACT_API_ENDPOINT}${endPoint}`,
    );
    console.log("🚀 [Register API] Payload:", registrationPayload);

    const response = await api.post(endPoint, registrationPayload);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};
