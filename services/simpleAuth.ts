import axiosInstance from "@/app/Constatns/axiosInstance";
import { ApiUserResponse } from "@/interface";

import { LoginCredentials } from "@/interface";

export type { LoginCredentials };
export type AuthResponse = any;

export class SimpleAuthService {
  private static readonly TOKEN_KEY = "auth_token";
  private static readonly USER_KEY = "auth_user";

  /**
   * Real login - make API request using axios instance
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post("/login", credentials);

      const data = response.data;

      // Handle different response formats
      let user: ApiUserResponse | undefined;
      let token: string | undefined;

      if (data.success && data.success.token) {
        // Format: { success: { token: "..." }, user: {...} }
        token = data.success.token;
        user = data.user;
      } else if (data.token) {
        // Format: { token: "...", user: {...} }
        token = data.token;
        user = data.user;
      } else if (data.access_token) {
        // Format: { access_token: "...", user: {...} }
        token = data.access_token;
        user = data.user;
      } else {
        return {
          success: false,
          message: "Invalid response format from server",
        };
      }

      if (!token || !user) {
        return {
          success: false,
          message: "Missing authentication data from server",
        };
      }

      // Store auth data in cookies (accessible by middleware)
      this.setCookie(this.TOKEN_KEY, token, 7); // 7 days
      this.setCookie(this.USER_KEY, JSON.stringify(user), 7); // 7 days

      // Also store in localStorage for backward compatibility
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));

      return {
        success: true,
        user,
        token,
      };
    } catch (error: any) {
      // Handle axios error response
      if (error.response) {
        const errorData = error.response.data;
        return {
          success: false,
          message:
            errorData.message || `Server error: ${error.response.status}`,
        };
      } else if (error.request) {
        return {
          success: false,
          message: "Network error. Please check your connection.",
        };
      } else {
        return {
          success: false,
          message: "Request failed. Please try again.",
        };
      }
    }
  }

  /**
   * Simple logout - clear stored data and cookies
   */
  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.clearCookies();
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    // Check localStorage first
    let token = localStorage.getItem(this.TOKEN_KEY);
    let user = localStorage.getItem(this.USER_KEY);

    // If not in localStorage, check sessionStorage
    if (!token || !user) {
      token = sessionStorage.getItem(this.TOKEN_KEY);
      user = sessionStorage.getItem(this.USER_KEY);
    }

    return !!(token && user);
  }

  /**
   * Get current user from storage
   */
  static getCurrentUser(): ApiUserResponse | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        this.logout();
        return null;
      }
    }
    return null;
  }

  /**
   * Get current token
   */
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Validate token with server (optional)
   */
  static async validateToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await axiosInstance.get("/user/profile");
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  /**
   * Set cookie (for middleware access)
   */
  private static setCookie(name: string, value: string, days: number): void {
    if (typeof document !== "undefined") {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }
  }

  /**
   * Clear cookies (for logout)
   */
  private static clearCookies(): void {
    if (typeof document !== "undefined") {
      document.cookie = `${this.TOKEN_KEY}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${this.USER_KEY}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
}
