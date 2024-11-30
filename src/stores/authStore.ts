import { makeAutoObservable } from 'mobx';
import { RootStore } from './rootStore';
import { User, LoginCredentials, AuthResponse } from '../types/auth';
import { apiClient } from '../services/api/client';
import jwt_decode from 'jwt-decode';

export class AuthStore {
  user: User | null = null;
  accessToken: string | null = null;
  refreshToken: string | null = null;
  isLoading: boolean = true;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.initializeFromStorage();
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken && !!this.user;
  }

  hasRole(role: string): boolean {
    return this.user?.roles.includes(role) ?? false;
  }

  private initializeFromStorage() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (accessToken && refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      try {
        const decoded = jwt_decode<{ user: User }>(accessToken);
        this.user = decoded.user;
      } catch {
        this.logout();
      }
    }
    
    this.isLoading = false;
  }

  async login(credentials: LoginCredentials) {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      this.setAuthData(response);
      return response;
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  async refreshTokens() {
    if (!this.refreshToken) {
      this.logout();
      return;
    }

    try {
      const response = await apiClient.post<AuthResponse>('/auth/refresh', {
        refreshToken: this.refreshToken,
      });
      this.setAuthData(response);
      return response;
    } catch {
      this.logout();
    }
  }

  logout() {
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private setAuthData(response: AuthResponse) {
    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;
    this.user = response.user;
    
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }
} 