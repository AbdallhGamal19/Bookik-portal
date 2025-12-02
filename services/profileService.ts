import axiosInstance from "@/app/Constatns/axiosInstance";
import { ApiUserResponse, ProfileStats } from "@/interface";

import { ProfileUpdateData } from "@/interface";

export type { ProfileUpdateData };
export type ProfileResponse = any;

export class ProfileService {
  /**
   * Get user profile by ID or username
   */
  static async getProfile(
    identifier: string | number
  ): Promise<ApiUserResponse | null> {
    try {
      const response = await axiosInstance.get(`/user/profile/${identifier}`);
      return response.data;
    } catch (error) {
      console.error("Failed to get profile:", error);
      return null;
    }
  }

  /**
   * Get current user's profile
   */
  static async getCurrentProfile(): Promise<ApiUserResponse | null> {
    try {
      const response = await axiosInstance.get("/user/profile");
      return response.data;
    } catch (error) {
      console.error("Failed to get current profile:", error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    data: ProfileUpdateData
  ): Promise<ProfileResponse> {
    try {
      const response = await axiosInstance.put("/user/profile", data);

      if (response.data.success) {
        // Update stored user data
        const updatedUser = response.data.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        return {
          success: true,
          data: updatedUser,
        };
      }

      return {
        success: false,
        message: response.data.message || "Profile update failed",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Profile update failed. Please try again.",
      };
    }
  }

  /**
   * Upload profile avatar
   */
  static async uploadAvatar(file: File): Promise<ProfileResponse> {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axiosInstance.post("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const updatedUser = response.data.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        return {
          success: true,
          data: updatedUser,
        };
      }

      return {
        success: false,
        message: response.data.message || "Avatar upload failed",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Avatar upload failed. Please try again.",
      };
    }
  }

  /**
   * Get profile statistics
   */
  static async getProfileStats(userId: number): Promise<ProfileStats | null> {
    try {
      const response = await axiosInstance.get(`/user/${userId}/stats`);
      return response.data;
    } catch (error) {
      console.error("Failed to get profile stats:", error);
      return null;
    }
  }

  /**
   * Get user's work gallery (videos/images)
   */
  static async getWorkGallery(
    userId: number,
    page: number = 1,
    limit: number = 12
  ) {
    try {
      const response = await axiosInstance.get(`/user/${userId}/gallery`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get work gallery:", error);
      return null;
    }
  }

  /**
   * Get user's recent activities
   */
  static async getRecentActivities(
    userId: number,
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const response = await axiosInstance.get(`/user/${userId}/activities`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get recent activities:", error);
      return null;
    }
  }
}
