import axiosInstance from "@/app/Constatns/axiosInstance";

import { StoreProfile } from "@/interface";

export type { StoreProfile };
export type StoreOffer = any;

export const storeService = {
  // Get store profile by slug
  async getStoreProfile(slug: any): Promise<any> {
    try {
      const response = await axiosInstance.get(`/stores/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching store profile:", error);
      throw error;
    }
  },

  // Get store offers by slug
  async getStoreOffers(slug: any): Promise<any> {
    try {
      const response = await axiosInstance.get(`/stores/${slug}/offers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching store offers:", error);
      throw error;
    }
  },

  // Follow/Unfollow store
  async toggleFollowStore(storeId: any): Promise<any> {
    try {
      const response = await axiosInstance.post(`/stores/${storeId}/follow`);
      return response.data;
    } catch (error) {
      console.error("Error toggling store follow:", error);
      throw error;
    }
  },

  // Get store reviews
  async getStoreReviews(storeId: any): Promise<any> {
    try {
      const response = await axiosInstance.get(`/stores/${storeId}/reviews`);
      return response.data;
    } catch (error) {
      console.error("Error fetching store reviews:", error);
      throw error;
    }
  },
};
