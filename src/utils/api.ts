
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_CONTACT_API_ENDPOINT,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'host': import.meta.env.VITE_API_HOST,
  },
});

// API call function with your structure
export const sendMessage = async (formData: any, recaptchaValue: string) => {
  try {
    const endPoint = `/api/v0/msg_id4040`;
    const response = await api.post(endPoint, JSON.stringify({
      ...formData,
      recaptchaToken: recaptchaValue,
    }));
    
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Alternative function using axios directly (similar to your fetch structure)
export const sendMessageDirect = async (formData: any, recaptchaValue: string) => {
  try {
    const endPoint = `${import.meta.env.VITE_CONTACT_API_ENDPOINT}/api/v0/msg_id4040`;
    const response = await axios.post(endPoint, JSON.stringify({
      ...formData,
      recaptchaToken: recaptchaValue,
    }), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'host': import.meta.env.VITE_API_HOST,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default api;
