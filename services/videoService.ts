import axiosInstance from "@/app/Constatns/axiosInstance";
import { IVideo } from "@/interface";

import { VideoUploadData } from "@/interface";

export type { VideoUploadData };
export type VideoResponse = any;
export type VideoListResponse = any;
export type VideoLikeResponse = any;

export class VideoService {
  /**
   * Upload a new video
   */
  static async uploadVideo(data: VideoUploadData): Promise<VideoResponse> {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      formData.append("video_file", data.video_file);
      if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
      if (data.category_id)
        formData.append("category_id", data.category_id.toString());
      if (data.tags) formData.append("tags", JSON.stringify(data.tags));
      if (data.is_public !== undefined)
        formData.append("is_public", data.is_public.toString());

      const response = await axiosInstance.post("/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: response.data.message || "Video upload failed",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Video upload failed. Please try again.",
      };
    }
  }

  /**
   * Get video by ID
   */
  static async getVideo(videoId: number): Promise<IVideo | null> {
    try {
      const response = await axiosInstance.get(`/video/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to get video:", error);
      return null;
    }
  }

  /**
   * Get user's videos
   */
  static async getUserVideos(
    userId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<VideoListResponse> {
    try {
      const response = await axiosInstance.get(`/user/${userId}/videos`, {
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
        message: response.data.message || "Failed to get user videos",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get user videos. Please try again.",
      };
    }
  }

  /**
   * Get trending videos
   */
  static async getTrendingVideos(
    page: number = 1,
    limit: number = 20
  ): Promise<VideoListResponse> {
    try {
      const response = await axiosInstance.get("/video/trending", {
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
        message: response.data.message || "Failed to get trending videos",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get trending videos. Please try again.",
      };
    }
  }

  /**
   * Get videos by category
   */
  static async getVideosByCategory(
    categoryId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<VideoListResponse> {
    try {
      const response = await axiosInstance.get(
        `/video/category/${categoryId}`,
        {
          params: { page, limit },
        }
      );

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to get category videos",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get category videos. Please try again.",
      };
    }
  }

  /**
   * Like/unlike a video
   */
  static async toggleVideoLike(videoId: number): Promise<VideoLikeResponse> {
    try {
      const response = await axiosInstance.post(`/video/${videoId}/like`);

      if (response.data.success) {
        return {
          success: true,
          isLiked: response.data.isLiked,
          likesCount: response.data.likesCount,
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to toggle video like",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to toggle video like. Please try again.",
      };
    }
  }

  /**
   * Get video comments
   */
  static async getVideoComments(
    videoId: number,
    page: number = 1,
    limit: number = 20
  ) {
    try {
      const response = await axiosInstance.get(`/video/${videoId}/comments`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get video comments:", error);
      return null;
    }
  }

  /**
   * Add comment to video
   */
  static async addVideoComment(videoId: number, comment: string) {
    try {
      const response = await axiosInstance.post(`/video/${videoId}/comments`, {
        comment,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to add video comment:", error);
      return null;
    }
  }

  /**
   * Delete video
   */
  static async deleteVideo(videoId: number) {
    try {
      const response = await axiosInstance.delete(`/video/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to delete video:", error);
      return null;
    }
  }

  /**
   * Update video details
   */
  static async updateVideo(videoId: number, data: Partial<VideoUploadData>) {
    try {
      const response = await axiosInstance.put(`/video/${videoId}`, data);
      return response.data;
    } catch (error) {
      console.error("Failed to update video:", error);
      return null;
    }
  }

  /**
   * Get video analytics
   */
  static async getVideoAnalytics(videoId: number) {
    try {
      const response = await axiosInstance.get(`/video/${videoId}/analytics`);
      return response.data;
    } catch (error) {
      console.error("Failed to get video analytics:", error);
      return null;
    }
  }
}
