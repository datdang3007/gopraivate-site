import axios from "axios";

// Common headers configuration
export const commonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  host: import.meta.env.VITE_API_HOST,
};

// Create axios instance with default config using common headers
const api = axios.create({
  baseURL: import.meta.env.VITE_CONTACT_API_ENDPOINT,
  headers: commonHeaders,
});

// API call function with your structure
export const sendMessage = async (formData: any, recaptchaValue: string) => {
  try {
    const endPoint = `/api/v0/msg_id4040`;
    const response = await api.post(
      endPoint,
      JSON.stringify({
        ...formData,
        recaptchaToken: recaptchaValue,
      }),
    );

    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Alternative function using axios directly with common headers
export const sendMessageDirect = async (
  formData: any,
  recaptchaValue: string,
) => {
  try {
    const endPoint = `${import.meta.env.VITE_CONTACT_API_ENDPOINT}/api/v0/msg_id4040`;
    const response = await axios.post(
      endPoint,
      JSON.stringify({
        ...formData,
        recaptchaToken: recaptchaValue,
      }),
      {
        headers: commonHeaders,
      },
    );

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
  ip: string = "192.168.1.100",
) => {
  try {
    const endPoint = `/api/v1/auth/login_id1020`;
    const loginPayload = {
      email,
      password,
      ip,
      project_id: "AIC",
    };

    const response = await axios.post(
      `${import.meta.env.VITE_CONTACT_API_ENDPOINT}${endPoint}`,
      JSON.stringify(loginPayload),
      {
        headers: {
          ...commonHeaders,
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Login API failed:", error);
    throw error;
  }
};

// User Registration API function
export const registerAPI = async (
  email: string,
  password: string,
  recaptchaToken: string,
  ip: string = "192.168.1.100",
) => {
  try {
    const endPoint = `/api/v1/auth/register_id1000`;
    const registrationPayload = {
      email,
      password,
      is_human: true,
      ip,
      project_id: "AIC",
      recaptchaToken,
    };

    const response = await axios.get(
      `${import.meta.env.VITE_CONTACT_API_ENDPOINT}${endPoint}`,
    );

    return response;
  } catch (error) {
    console.error("Registration API failed:", error);
    throw error;
  }
};

// Generic API call function using common headers
// export const apiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: any) => {
//   try {
//     const fullUrl = `${import.meta.env.VITE_CONTACT_API_ENDPOINT}${endpoint}`;
//     const config = {
//       method,
//       url: fullUrl,
//       headers: commonHeaders,
//       data: data ? JSON.stringify(data) : undefined,
//     };

//     const response = await axios(config);
//     return response.data;
//   } catch (error) {
//     console.error('API call failed:', error);
//     throw error;
//   }
// };
export default api;
