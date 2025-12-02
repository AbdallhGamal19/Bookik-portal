"use server";
import axios from "axios";
import { cache } from "../utlis/cach";

// export const getExplorerVideo = cache(
//   async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/ai-ad-list`
//       );

//       return response.data?.data || response.data || [];
//     } catch (error) {
//       console.error("Error fetching explorer video:", error);
//       return [];
//     }
//   },
//   ["explorerVideo"],
//   { revalidate: 3600 }
// );

export const getHomeDeals = cache(
  async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/new-deals`
      );

      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  ["homeDeals"],
  { revalidate: 3600 }
);

export const getFeaturedDeals = cache(
  async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/featured-deals`
      );
      console.log(response.data, "response featured deals");
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  ["featuredDeal"],
  { revalidate: 3600 }
);
export const getTrendList = cache(
  async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/TrendList`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  ["TrendList"],
  { revalidate: 3600 }
);
export const getTopAdvertisers = cache(
  async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/top-advertisers`
      );
      console.log(response.data, "response top advertisers");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  ["topAdvertisers"],
  { revalidate: 3600 }
);
export const getCategories = cache(
  async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/coupons-categories`
      );
      // console.log(response.data, "response categories");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  ["categories"],
  { revalidate: 3600 }
);
export const getCategoryDeals = cache(
  async (id: string) => {
    try {
      const response = await axios.get(
        `${`${process.env.NEXT_PUBLIC_API_URL}/deals/${id}`}`
      );

      return response.data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  ["categoryDeals"],
  { revalidate: 3600 }
);

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post("http://dev2025.7gapp.me/api/login", {
      email,
      password,
    });

    return {
      success: true,
      user: response.data.user,
      token: response.data.success.token,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Login failed. Please try again.",
    };
  }
}

// New server actions for components

export const getFollowerProfile = cache(
  async (id: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/advertiserProfile/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching follower profile:", error);
      return null;
    }
  },
  ["followerProfile"],
  { revalidate: 3600 }
);

export const getExplorerVideos = async (id?: any) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/ai-ad-list-with-comments`;
    const url = id ? `${baseUrl}?id=${id}` : `${baseUrl}`;
    const response = await axios.get(url);
    // console.log(response, "ai-ad-lisT with-comments response explorer videos");

    return response.data?.data || response.data || [];
  } catch (error: any) {
    console.error("Error fetching explorer videos:", error);
    return [];
  }
};

export const getComments = cache(
  async (videoId: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/comments?videoId=${videoId}`
      );
      return response.data?.comments || response.data || [];
    } catch (error: any) {
      console.error("Error fetching comments:", error);
      return [];
    }
  },
  ["comments"],
  { revalidate: 300 }
);

export const addComment = async (commentData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/post/add-comment`,
      commentData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding comment:", error);
    return {
      success: false,
      message: error.response?.data?.message || "حدث خطأ في إضافة التعليق",
    };
  }
};

export const getFollowersAds = cache(
  async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/followers_ads`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching followers ads:", error);
      return [];
    }
  },
  ["followersAds"],
  { revalidate: 3600 }
);

export const getStoreProfile = cache(
  async (id: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/companyProfile/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching store profile:", error);
      return null;
    }
  },
  ["storeProfile"],
  { revalidate: 3600 }
);

export const followUser = async (followData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/follow`,
      followData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error following user:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to follow user",
    };
  }
};

export const getUserProfile = async (userId: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/advertiserProfile/${userId}`
    );

    // تحسين البيانات لتقليل الحجم
    const data = response.data;

    // تصفية البيانات غير الضرورية من الفيديوهات
    if (data.posts) {
      Object.keys(data.posts).forEach((key) => {
        const post = data.posts[key];
        // إزالة البيانات الكبيرة غير الضرورية
        if (post.video_url && post.video_url.length > 1000) {
          // تقصير رابط الفيديو إذا كان طويل جداً
          post.video_url = post.video_url.substring(0, 1000) + "...";
        }
      });
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
