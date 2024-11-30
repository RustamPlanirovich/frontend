export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
} 