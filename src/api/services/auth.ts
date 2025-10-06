
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
    const clientIP = request.ip || await getClientIP();
    
    const payload = {
      email: request.email,
      password: request.password,
      is_human: true,
      ip: clientIP,
      project_id: 'AIC',
      recaptchaToken: request.recaptchaToken,
    };

    const response = await apiClient.post<RegisterResponse>(
      '/api/v1/auth/register_id1000',
      payload
    );

    return response.data;
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    // Additional logout logic if needed
  }
}
