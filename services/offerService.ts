import axiosInstance from "@/app/Constatns/axiosInstance";
import { ICategoryItem, ICoupon } from "@/interface";

import { OfferCreateData } from "@/interface";

export type { OfferCreateData };
export type OfferResponse = any;
export type OfferListResponse = any;
export type CategoryResponse = any;

export class OfferService {
  /**
   * Create a new offer
   */
  static async createOffer(data: OfferCreateData): Promise<OfferResponse> {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("discount", data.discount);
      if (data.discount_code)
        formData.append("discount_code", data.discount_code);
      formData.append("start_date", data.start_date);
      formData.append("expiry_date", data.expiry_date);
      formData.append("category_id", data.category_id.toString());
      if (data.store_id) formData.append("store_id", data.store_id.toString());
      if (data.image) formData.append("image", data.image);
      if (data.video_url) formData.append("video_url", data.video_url);
      if (data.is_featured !== undefined)
        formData.append("is_featured", data.is_featured.toString());
      if (data.is_exclusive !== undefined)
        formData.append("is_exclusive", data.is_exclusive.toString());
      if (data.tags) formData.append("tags", JSON.stringify(data.tags));

      const response = await axiosInstance.post("/offers", formData, {
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
        message: response.data.message || "Failed to create offer",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to create offer. Please try again.",
      };
    }
  }

  /**
   * Get offer by ID
   */
  static async getOffer(offerId: number): Promise<ICoupon | null> {
    try {
      const response = await axiosInstance.get(`/offers/${offerId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to get offer:", error);
      return null;
    }
  }

  /**
   * Get all offers with pagination and filters
   */
  static async getOffers(
    page: number = 1,
    limit: number = 20,
    filters?: {
      category_id?: number;
      store_id?: number;
      price_min?: number;
      price_max?: number;
      is_featured?: boolean;
      is_exclusive?: boolean;
      location?: string;
      search?: string;
    }
  ): Promise<OfferListResponse> {
    try {
      const params: any = { page, limit };
      if (filters) {
        Object.assign(params, filters);
      }

      const response = await axiosInstance.get("/offers", { params });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to get offers",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get offers. Please try again.",
      };
    }
  }

  /**
   * Get featured offers
   */
  static async getFeaturedOffers(
    page: number = 1,
    limit: number = 20
  ): Promise<OfferListResponse> {
    try {
      const response = await axiosInstance.get("/offers/featured", {
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
        message: response.data.message || "Failed to get featured offers",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get featured offers. Please try again.",
      };
    }
  }

  /**
   * Get exclusive offers
   */
  static async getExclusiveOffers(
    page: number = 1,
    limit: number = 20
  ): Promise<OfferListResponse> {
    try {
      const response = await axiosInstance.get("/offers/exclusive", {
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
        message: response.data.message || "Failed to get exclusive offers",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get exclusive offers. Please try again.",
      };
    }
  }

  /**
   * Get offers by category
   */
  static async getOffersByCategory(
    categoryId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<OfferListResponse> {
    try {
      const response = await axiosInstance.get(
        `/offers/category/${categoryId}`,
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
        message: response.data.message || "Failed to get category offers",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get category offers. Please try again.",
      };
    }
  }

  /**
   * Get offers by store
   */
  static async getOffersByStore(
    storeId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<OfferListResponse> {
    try {
      const response = await axiosInstance.get(`/offers/store/${storeId}`, {
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
        message: response.data.message || "Failed to get store offers",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get store offers. Please try again.",
      };
    }
  }

  /**
   * Get all categories
   */
  static async getCategories(): Promise<CategoryResponse> {
    try {
      const response = await axiosInstance.get("/categories");

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to get categories",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to get categories. Please try again.",
      };
    }
  }

  /**
   * Like/unlike an offer
   */
  static async toggleOfferLike(offerId: number) {
    try {
      const response = await axiosInstance.post(`/offers/${offerId}/like`);
      return response.data;
    } catch (error) {
      console.error("Failed to toggle offer like:", error);
      return null;
    }
  }

  /**
   * Update offer
   */
  static async updateOffer(
    offerId: number,
    data: Partial<OfferCreateData>
  ): Promise<OfferResponse> {
    try {
      const response = await axiosInstance.put(`/offers/${offerId}`, data);

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to update offer",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to update offer. Please try again.",
      };
    }
  }

  /**
   * Delete offer
   */
  static async deleteOffer(offerId: number): Promise<OfferResponse> {
    try {
      const response = await axiosInstance.delete(`/offers/${offerId}`);

      if (response.data.success) {
        return {
          success: true,
          message: "Offer deleted successfully",
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to delete offer",
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to delete offer. Please try again.",
      };
    }
  }

  /**
   * Get offer analytics
   */
  static async getOfferAnalytics(offerId: number) {
    try {
      const response = await axiosInstance.get(`/offers/${offerId}/analytics`);
      return response.data;
    } catch (error) {
      console.error("Failed to get offer analytics:", error);
      return null;
    }
  }
}
