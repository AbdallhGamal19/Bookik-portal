"use client";

import CardInfiniteScroll from "@/components/ui/CardInfiniteScroll";
import VideoModal from "@/components/common/videomodal/VideoModal";
import React, { useEffect, useState } from "react";
import { FaVideo, FaGift, FaHeart as FaHeartSolid } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/server-actions";

type UserProfileClientProps = {
  userProfile: any;
  userId: string;
};

const UserProfileClient: React.FC<UserProfileClientProps> = ({
  userProfile: initialUserProfile,
  userId,
}) => {
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [activeTab, setActiveTab] = useState<"posts" | "offers" | "likes">(
    "posts"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const router = useRouter();

  // Tab configuration
  const tabs = [
    {
      id: "posts",
      label: "المنشورات",
      icon: FaVideo,
      count: Object.keys(userProfile?.posts || {}).length,
    },
    {
      id: "offers",
      label: "العروض",
      icon: FaGift,
      count: userProfile?.coupons?.length || 0,
    },
    {
      id: "likes",
      label: "الإعجابات",
      icon: FaHeartSolid,
      count:
        userProfile?.likes?.filter(
          (like: any) => like.likeable && like.value === 1
        ).length || 0,
    },
  ];

  // Infinite scroll state management
  const [postsItems, setPostsItems] = useState<any[]>([]);
  const [offersItems, setOffersItems] = useState<any[]>([]);
  const [likesItems, setLikesItems] = useState<any[]>([]);

  const [postsHasMore, setPostsHasMore] = useState(true);
  const [offersHasMore, setOffersHasMore] = useState(true);
  const [likesHasMore, setLikesHasMore] = useState(true);

  const [postsLoadingMore, setPostsLoadingMore] = useState(false);
  const [offersLoadingMore, setOffersLoadingMore] = useState(false);
  const [likesLoadingMore, setLikesLoadingMore] = useState(false);

  const [postsPage, setPostsPage] = useState(1);
  const [offersPage, setOffersPage] = useState(1);
  const [likesPage, setLikesPage] = useState(1);

  const itemsPerPage = 12;

  // Initialize tab data when userProfile loads
  useEffect(() => {
    if (!userProfile) return;

    // Initialize Posts
    const postsData = getItemsForTab("posts", userProfile);
    const initialPosts = postsData.slice(0, itemsPerPage);
    setPostsItems(initialPosts);
    setPostsHasMore(postsData.length > itemsPerPage);
    setPostsPage(1);

    // Initialize Offers
    const offersData = getItemsForTab("offers", userProfile);
    const initialOffers = offersData.slice(0, itemsPerPage);
    setOffersItems(initialOffers);
    setOffersHasMore(offersData.length > itemsPerPage);
    setOffersPage(1);

    // Initialize Likes
    const likesData = getItemsForTab("likes", userProfile);
    const initialLikes = likesData.slice(0, itemsPerPage);
    setLikesItems(initialLikes);
    setLikesHasMore(likesData.length > itemsPerPage);
    setLikesPage(1);
  }, [userProfile]);

  const getItemsForTab = (tab: string, profile: any) => {
    switch (tab) {
      case "posts":
        // Convert posts object to array
        const postsObject = profile.posts || {};
        return Object.values(postsObject);
      case "offers":
        return profile.coupons.reverse() || [];
      case "likes":
        return (
          profile.likes
            ?.filter((like: any) => like.likeable && like.value === 1)
            .map((like: any) => like.likeable) || []
        );
      default:
        return [];
    }
  };

  const loadMorePosts = async () => {
    if (!userProfile || postsLoadingMore) return;

    setPostsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const postsData = getItemsForTab("posts", userProfile);
    const nextPage = postsPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newItems = postsData.slice(startIndex, endIndex);

    if (newItems.length === 0 && postsPage === 1) {
      await loadMoreDataFromServer();
      const updatedPostsData = getItemsForTab("posts", userProfile);
      const updatedNewItems = updatedPostsData.slice(startIndex, endIndex);
      setPostsItems((prev) => [...prev, ...updatedNewItems]);
      setPostsHasMore(endIndex < updatedPostsData.length);
    } else {
      setPostsItems((prev) => [...prev, ...newItems]);
      setPostsHasMore(endIndex < postsData.length);
    }

    setPostsPage(nextPage);
    setPostsLoadingMore(false);
  };

  const loadMoreOffers = async () => {
    if (!userProfile || offersLoadingMore) return;

    setOffersLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const offersData = getItemsForTab("offers", userProfile);
    const nextPage = offersPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newItems = offersData.slice(startIndex, endIndex);

    setOffersItems((prev) => [...prev, ...newItems]);
    setOffersPage(nextPage);
    setOffersHasMore(endIndex < offersData.length);
    setOffersLoadingMore(false);
  };

  const loadMoreLikes = async () => {
    if (!userProfile || likesLoadingMore) return;

    setLikesLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const likesData = getItemsForTab("likes", userProfile);
    const nextPage = likesPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newItems = likesData.slice(startIndex, endIndex);

    setLikesItems((prev) => [...prev, ...newItems]);
    setLikesPage(nextPage);
    setLikesHasMore(endIndex < likesData.length);
    setLikesLoadingMore(false);
  };

  const loadMoreDataFromServer = async () => {
    try {
      const fullProfile = await getUserProfile(userId);
      if (fullProfile && fullProfile.posts) {
        setUserProfile((prev: any) => ({
          ...prev,
          posts: { ...prev.posts, ...fullProfile.posts },
        }));
      }
    } catch (error) {
      console.error("Error loading more data:", error);
    }
  };

  const openVideoModal = (index: number) => {
    setCurrentVideoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoIndex(0);
  };

  const getVideoList = () => {
    let videos: any[] = [];

    if (activeTab === "posts") {
      videos = Object.values(userProfile.posts || {}).filter(
        (p: any) => p.have_video
      );
    } else if (activeTab === "offers") {
      videos = (userProfile.coupons || []).filter((c: any) => c.have_video);
    } else if (activeTab === "likes") {
      videos = (userProfile.likes || [])
        .filter((like: any) => like.likeable && like.value === 1)
        .map((like: any) => like.likeable)
        .filter((item: any) => item.have_video);
    }
    return videos;
  };

  const handleVideoChange = (index: number) => {
    setCurrentVideoIndex(index);
  };

  // Get user data from profile or fallback
  const user = userProfile.user || userProfile;

  return (
    <>
      {/* Tabs */}
      <div className="bg-theme-bg-card rounded-bookik-rounded-2xl p-4 lg:p-8 mb-6 shadow-theme-shadow-lg border border-theme-border-primary">
        <div className="border-b border-theme-border-primary mb-6">
          <div className="flex justify-center lg:justify-start gap-bookik-gap-lg">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 border-b-2 transition-all duration-200 text-text5 font-semibold flex items-center gap-bookik-gap-sm ${
                    activeTab === tab.id
                      ? "border-theme-accent-primary text-theme-accent-primary"
                      : "border-transparent text-theme-text-secondary hover:text-theme-text-primary"
                  }`}
                >
                  <IconComponent className="text-sm hidden sm:block" />
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
        </div>
        {/* Content Grid */}
        {activeTab === "posts" && (
          <CardInfiniteScroll
            items={postsItems.map((post: any) => ({
              ...post,
              onClick: post.have_video
                ? () => {
                    const videoList = getVideoList();
                    const index = videoList.findIndex(
                      (v: any) => v.id === post.id
                    );
                    if (index !== -1) openVideoModal(index);
                  }
                : () => {
                    router.push(post?.store_id && `/store/${post.store_id}`);
                  },
              showShare: false,
            }))}
            hasMore={postsHasMore}
            loadMore={loadMorePosts}
            loading={postsLoadingMore}
            showStoreImage={false}
          />
        )}
        {activeTab === "offers" && (
          <CardInfiniteScroll
            items={offersItems.map((coupon: any) => ({
              ...coupon,
              onClick: coupon.have_video
                ? () => {
                    const videoList = getVideoList();
                    const index = videoList.findIndex(
                      (v: any) => v.id === coupon.id
                    );
                    if (index !== -1) openVideoModal(index);
                  }
                : undefined,
              showShare: false,
            }))}
            hasMore={offersHasMore}
            loadMore={loadMoreOffers}
            loading={offersLoadingMore}
          />
        )}

        {activeTab === "likes" && (
          <CardInfiniteScroll
            items={likesItems.map((item: any) => ({
              ...item,
              onClick: item.have_video
                ? () => {
                    const videoList = getVideoList();
                    const index = videoList.findIndex(
                      (v: any) => v.id === item.id
                    );
                    if (index !== -1) openVideoModal(index);
                  }
                : () => {
                    router.push(item?.store_id && `/store/${item.store_id}`);
                  },
              showShare: true,
            }))}
            hasMore={likesHasMore}
            loadMore={loadMoreLikes}
            loading={likesLoadingMore}
          />
        )}
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentIndex={currentVideoIndex}
          onVideoChange={handleVideoChange}
          videos={getVideoList()}
        />
      )}
    </>
  );
};
export default UserProfileClient;
