
export interface LoginRequest {
  email: string;
  password: string;
  ip?: string;
  project_id?: string;
  source?: 'google' | 'email';
  source_token?: {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    user_info: {
      id: string;
      email: string;
      verified_email: boolean;
      name: string;
      given_name: string;
      family_name: string;
      picture: string;
    };
  };
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
