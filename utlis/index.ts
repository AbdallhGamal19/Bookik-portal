export const currentlyPlayingRef = {
  video: null as HTMLVideoElement | null,
};
export const replaceHTMLTagsToText = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
};

// Utility function to normalize different API response structures
import { INormalizedVideoData } from "@/interface";

export const normalizeVideoData = (data: any): INormalizedVideoData[] => {
  // Handle followers_ads structure (array of users with 'coupon' array)
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    data[0].coupon &&
    Array.isArray(data[0].coupon)
  ) {
    const normalized: INormalizedVideoData[] = [];
    data.forEach((user: any) => {
      if (user.coupon && Array.isArray(user.coupon)) {
        user.coupon.forEach((coupon: any) => {
          normalized.push({
            id: coupon.id,
            title: coupon.title,
            detail: coupon.detail,
            video_url: coupon.video_url || "",
            image: coupon.image || "",
            advertiser_name: user.name,
            advertiser_avatar: user.avatar,
            advertiser_brief: user.brief,
            store_name: coupon.store?.title || "",
            discount: coupon.discount || "0",
            code: coupon.code,
            link: coupon.link,
            views_count: coupon.views_count || 0,
            likes: coupon.likes || [],
            comments: coupon.comments || [],
            have_video: coupon.have_video || false,
            created_at: coupon.created_at,
            is_featured_advertiser: user.is_featured_advertiser === 1,
          });
        });
      }
    });
    return normalized;
  }

  // Handle ai-ad-list structure
  if (Array.isArray(data) && data.length > 0 && data[0].offer_title) {
    return data.map((item: any) => ({
      id: item.id,
      title: item.offer_title,
      detail: item.detail,
      video_url: item.video_url || "",
      image: item.image || "",
      advertiser_name: item.advertiser_name,
      advertiser_avatar: item.image, // Using image as avatar for ai-ad-list
      advertiser_brief: "",
      store_name: item.store_name || "",
      discount: item.discount?.toString() || "0",
      code: item.discount_code,
      link: "",
      views_count: parseInt(item.views) || 0,
      likes: item.likes || [],
      comments: [],
      have_video: !!item.video_url,
      created_at: new Date().toISOString(), // ai-ad-list doesn't have created_at
      is_featured_advertiser: false,
    }));
  }

  // Handle single advertiserProfile structure (with 'coupons' array)
  if (data && data.user && data.coupons && Array.isArray(data.coupons)) {
    return data.coupons.map((coupon: any) => ({
      id: coupon.id,
      title: coupon.title,
      detail: coupon.detail,
      video_url: coupon.video_url || "",
      image: coupon.image || "",
      advertiser_name: data.user.name,
      advertiser_avatar: data.user.avatar,
      advertiser_brief: data.user.brief,
      store_name: coupon.store?.title || "",
      discount: coupon.discount || "0",
      code: coupon.code,
      link: coupon.link,
      views_count: coupon.views_count || 0,
      likes: coupon.likes || [],
      comments: coupon.comments || [],
      have_video: coupon.have_video || false,
      created_at: coupon.created_at,
      is_featured_advertiser: data.user.is_featured_advertiser === 1,
    }));
  }

  // Return empty array if structure is unknown
  return [];
};

// Helper function to check if data is from followers_ads
export const isFollowersAdsData = (data: any): boolean => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data[0].coupon &&
    Array.isArray(data[0].coupon)
  );
};

// Helper function to check if data is from ai-ad-list
export const isAiAdListData = (data: any): boolean => {
  return Array.isArray(data) && data.length > 0 && data[0].offer_title;
};

// Helper function to check if data is from advertiserProfile
export const isAdvertiserProfileData = (data: any): boolean => {
  return data && data.user && data.coupons && Array.isArray(data.coupons);
};

// Utility function to transform API user data to User interface
export const transformApiUserToUser = (apiUser: any): any => {
  return {
    id: apiUser.id.toString(),
    name: apiUser.name,
    username: apiUser.nickname,
    avatar: apiUser.avatar,
    bio: apiUser.brief || "No bio available",
    followers: apiUser.followers?.length || 0,
    following: apiUser.followings?.length || 0,
    rating: 4.5, // Default rating - you might want to get this from the API
    totalRatings: 0, // Default - you might want to get this from the API
    clientCount: 0, // Default - you might want to get this from the API
    responseTime: "2-4 hours", // Default - you might want to get this from the API
    lastSeen: "2 hours ago", // Default - you might want to get this from the API
    completionRate: 95, // Default - you might want to get this from the API
    averageDelivery: "3-5 days", // Default - you might want to get this from the API
    skills: "Design, Development, Marketing", // Default - you might want to get this from the API
    location: apiUser.address || "Location not specified",
    distance: "2.5 km", // Default - you might want to get this from the API
    joinDate: new Date(apiUser.created_at).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
};

// Utility function to get user data from storage
export const getUserFromStorage = (): any | null => {
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const apiUser: any = JSON.parse(userData);
      return transformApiUserToUser(apiUser);
    }
    return null;
  } catch (error) {
    console.error("Error parsing user data from storage:", error);
    return null;
  }
};

// Utility function to get token from storage
export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem("token");
};

// Utility function to check if user is logged in
export const isUserLoggedIn = (): boolean => {
  return !!(getTokenFromStorage() && getUserFromStorage());
};

// Utility function to logout user
export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  // You might want to redirect to login page here
  window.location.href = "/login";
};

/**
 * Authentication utilities
 */
export const authUtils = {
  /**
   * Dispatch authentication state change event
   */
  notifyAuthStateChange: () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("authStateChanged"));
    }
  },

  /**
   * Check if running in browser environment
   */
  isBrowser: () => typeof window !== "undefined",

  /**
   * Safely get item from localStorage
   */
  getStorageItem: (key: string): string | null => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return null;
  },

  /**
   * Safely set item in localStorage
   */
  setStorageItem: (key: string, value: string): boolean => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  },

  /**
   * Safely remove item from localStorage
   */
  removeStorageItem: (key: string): boolean => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  },
};
