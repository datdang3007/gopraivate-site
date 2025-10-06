
export interface LoginRequest {
  email: string;
  password: string;
  ip?: string;
}

export interface LoginResponse {
  statuscode: number;
  success: boolean;
  message: string;
  variables?: {
    token: string;
  };
  // Keep legacy fields for compatibility
  status?: number;
  data?: string;
  token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  recaptchaToken: string;
  ip?: string;
}

export interface RegisterResponse {
  statuscode: number;
  success: boolean;
  message: string;
  variables?: {
    email: string;
    token: string;
  };
  // Keep legacy fields for compatibility
  status?: number;
  data?: string;
  token?: string;
}

export interface User {
  email: string;
  id?: string;
}
