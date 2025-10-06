
import { apiClient } from '../config/axios';
import { getClientIP } from '../utils/ip';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/auth';

export class AuthService {
  /**
   * Login user
   */
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const clientIP = request.ip || await getClientIP();
    
    const payload = {
      email: request.email,
      password: request.password,
      ip: clientIP,
      project_id: 'AIC',
    };

    const response = await apiClient.post<LoginResponse>(
      '/api/v1/auth/login_id1020',
      payload
    );

    return response.data;
  }

  /**
   * Register new user
   */
  static async register(request: RegisterRequest): Promise<RegisterResponse> {
    console.log("📧 [AuthService.register] Request received:", request);
    
    const clientIP = request.ip || await getClientIP();
    console.log("🌐 [AuthService.register] Client IP:", clientIP);
    
    const payload = {
      email: request.email,
      password: request.password,
      is_human: true,
      ip: clientIP,
      project_id: 'AIC',
      recaptchaToken: request.recaptchaToken,
    };
    
    console.log("📦 [AuthService.register] Final payload:", payload);
    console.log("🔗 [AuthService.register] API endpoint:", '/api/v1/auth/register_id1000');
    console.log("🌍 [AuthService.register] Base URL:", import.meta.env.VITE_CONTACT_API_ENDPOINT);
    
    try {
      const response = await apiClient.post<RegisterResponse>(
        '/api/v1/auth/register_id1000',
        payload
      );
      
      console.log("✅ [AuthService.register] Success response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ [AuthService.register] Error occurred:", error);
      console.error("❌ [AuthService.register] Error response:", error.response?.data);
      console.error("❌ [AuthService.register] Error status:", error.response?.status);
      console.error("❌ [AuthService.register] Error headers:", error.response?.headers);
      throw error;
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    // Additional logout logic if needed
  }
}
