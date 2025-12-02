import axiosInstance from "@/app/Constatns/axiosInstance";

export class FollowService {
  // Follow a user
  static async followUser(followerId: any, leaderId: any): Promise<any> {
    try {
      const response = await axiosInstance.post('/follow', {
        follower_id: followerId,
        leader_id: leaderId
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Unfollow a user
  static async unfollowUser(followerId: any, leaderId: any): Promise<any> {
    try {
      const response = await axiosInstance.delete(`/follow/${followerId}/${leaderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get followers list
  static async getFollowers(userId: any, page: any = 1, perPage: any = 20): Promise<any> {
    try {
      const response = await axiosInstance.get(`/followers/${userId}?page=${page}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get followings list
  static async getFollowings(userId: any, page: any = 1, perPage: any = 20): Promise<any> {
    try {
      const response = await axiosInstance.get(`/followings/${userId}?page=${page}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Check if user is following another user
  static async isFollowing(followerId: any, leaderId: any): Promise<any> {
    try {
      const response = await axiosInstance.get(`/is-following/${followerId}/${leaderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get followers count
  static async getFollowersCount(userId: any): Promise<any> {
    try {
      const response = await axiosInstance.get(`/followers-count/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get followings count
  static async getFollowingsCount(userId: any): Promise<any> {
    try {
      const response = await axiosInstance.get(`/followings-count/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
