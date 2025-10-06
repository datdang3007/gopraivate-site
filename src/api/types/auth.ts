
export interface LoginRequest {
  email: string;
  password: string;
  ip?: string;
}

export interface LoginResponse {
  status: number;
  data: string;
  token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  recaptchaToken: string;
  ip?: string;
}

export interface RegisterResponse {
  status: number;
  data: string;
  token?: string;
}

export interface User {
  email: string;
  id?: string;
}
