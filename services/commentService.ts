import axiosInstance from "@/app/Constatns/axiosInstance";
import { IComment } from "@/interface";

import { CommentData } from "@/interface";

export type { CommentData };
export type CommentResponse = any;
export type CommentListResponse = any;
export type CommentUpdateData = any;

export class CommentService {
  /**
   * Create a new comment
   */
  static async createComment(data: CommentData): Promise<CommentResponse> {
    try {
      const response = await axiosInstance.post("/comments", data);

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to create comment",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to create comment. Please try again.",
      };
    }
  }

  /**
   * Get comments for a specific item (video, post, etc.)
   */
  static async getComments(
    commentableId: number,
    commentableType: string,
    page: number = 1,
    limit: number = 20
  ): Promise<CommentListResponse> {
    try {
      const response = await axiosInstance.get("/comments", {
        params: {
          commentable_id: commentableId,
          commentable_type: commentableType,
          page,
          limit,
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
        message: response.data.message || "Failed to get comments",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get comments. Please try again.",
      };
    }
  }

  /**
   * Get comment by ID
   */
  static async getComment(commentId: number): Promise<IComment | null> {
    try {
      const response = await axiosInstance.get(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to get comment:", error);
      return null;
    }
  }

  /**
   * Update a comment
   */
  static async updateComment(
    commentId: number,
    data: CommentUpdateData
  ): Promise<CommentResponse> {
    try {
      const response = await axiosInstance.put(`/comments/${commentId}`, data);

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to update comment",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to update comment. Please try again.",
      };
    }
  }

  /**
   * Delete a comment
   */
  static async deleteComment(commentId: number): Promise<CommentResponse> {
    try {
      const response = await axiosInstance.delete(`/comments/${commentId}`);

      if (response.data.success) {
        return {
          success: true,
          message: "Comment deleted successfully",
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to delete comment",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to delete comment. Please try again.",
      };
    }
  }

  /**
   * Like/unlike a comment
   */
  static async toggleCommentLike(commentId: number) {
    try {
      const response = await axiosInstance.post(`/comments/${commentId}/like`);
      return response.data;
    } catch (error) {
      console.error("Failed to toggle comment like:", error);
      return null;
    }
  }

  /**
   * Get comment replies
   */
  static async getCommentReplies(
    commentId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<CommentListResponse> {
    try {
      const response = await axiosInstance.get(
        `/comments/${commentId}/replies`,
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
        message: response.data.message || "Failed to get comment replies",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get comment replies. Please try again.",
      };
    }
  }

  /**
   * Report a comment
   */
  static async reportComment(
    commentId: number,
    reason: string,
    description?: string
  ) {
    try {
      const response = await axiosInstance.post(
        `/comments/${commentId}/report`,
        {
          reason,
          description,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to report comment:", error);
      return null;
    }
  }

  /**
   * Get user's comments
   */
  static async getUserComments(
    userId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<CommentListResponse> {
    try {
      const response = await axiosInstance.get(`/user/${userId}/comments`, {
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
        message: response.data.message || "Failed to get user comments",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get user comments. Please try again.",
      };
    }
  }
}
