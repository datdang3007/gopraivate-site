import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_CONTACT_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br, zstd",
  },
  timeout: 30000,
});

export const sendMessage = async (formData: any, recaptchaValue: string) => {
  try {
    const response = await api.post("/api/v0/msg_id4040", {
      ...formData,
      recaptchaToken: recaptchaValue,
    });
    return response.data;
  } catch (error) {
    console.error("❌ API call failed:", error);
    throw error;
  }
};

export const loginAPI = async (
  email: string,
  password: string,
  ip = "192.168.1.100",
) => {
  try {
    const response = await api.post("/api/v1/auth/login_id1020", {
      email,
      password,
      ip,
      project_id: "AIC",
    });
    return response.data;
  } catch (error) {
    console.error("❌ Login API failed:", error);
    throw error;
  }
};

export const registerAPI = async (
  email: string,
  password: string,
  ip = "123.456.7.89",
) => {
  try {
    const response = await api.post("/api/v1/auth/register_id1000", {
      email,
      password,
      is_human: true,
      ip,
      project_id: "AIC",
    });
    return response.data;
  } catch (error) {
    console.error("❌ Registration API failed:", error);
    throw error;
  }
};

export default api;
