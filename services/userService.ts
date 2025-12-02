import axiosInstance from "@/app/Constatns/axiosInstance";
import { ApiUserResponse } from "@/interface";

import {
  UserSearchParams,
  UserSearchResponse,
  UserRecommendationsResponse,
} from "@/interface";

export type {
  UserSearchParams,
  UserSearchResponse,
  UserRecommendationsResponse,
};

export class UserService {
  /**
   * Search for users
   */
  static async searchUsers(params: any): Promise<any> {
    try {
      const response = await axiosInstance.get("/user/search", { params });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: response.data.message || "User search failed",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "User search failed. Please try again.",
      };
    }
  }

  /**
   * Get user recommendations based on current user's interests
   */
  static async getUserRecommendations(
    page: any = 1,
    limit: any = 20
  ): Promise<any> {
    try {
      const response = await axiosInstance.get("/user/recommendations", {
        params: { page, limit },
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to get recommendations",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get recommendations. Please try again.",
      };
    }
  }

  /**
   * Get users by category or skill
   */
  static async getUsersByCategory(
    category: string,
    page: number = 1,
    limit: number = 20
  ) {
    try {
      const response = await axiosInstance.get(`/user/category/${category}`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get users by category:", error);
      return null;
    }
  }

  /**
   * Get users by location
   */
  static async getUsersByLocation(
    location: string,
    page: number = 1,
    limit: number = 20
  ) {
    try {
      const response = await axiosInstance.get(`/user/location/${location}`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get users by location:", error);
      return null;
    }
  }

  /**
   * Get featured advertisers
   */
  static async getFeaturedAdvertisers(page: number = 1, limit: number = 20) {
    try {
      const response = await axiosInstance.get("/user/featured-advertisers", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get featured advertisers:", error);
      return null;
    }
  }

  /**
   * Get top creators
   */
  static async getTopCreators(page: number = 1, limit: number = 20) {
    try {
      const response = await axiosInstance.get("/user/top-creators", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get top creators:", error);
      return null;
    }
  }

  /**
   * Block a user
   */
  static async blockUser(userId: number) {
    try {
      const response = await axiosInstance.post(`/user/${userId}/block`);
      return response.data;
    } catch (error) {
      console.error("Failed to block user:", error);
      return null;
    }
  }

  /**
   * Unblock a user
   */
  static async unblockUser(userId: number) {
    try {
      const response = await axiosInstance.delete(`/user/${userId}/block`);
      return response.data;
    } catch (error) {
      console.error("Failed to unblock user:", error);
      return null;
    }
  }

  /**
   * Report a user
   */
  static async reportUser(
    userId: number,
    reason: string,
    description?: string
  ) {
    try {
      const response = await axiosInstance.post(`/user/${userId}/report`, {
        reason,
        description,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to report user:", error);
      return null;
    }
  }
}
