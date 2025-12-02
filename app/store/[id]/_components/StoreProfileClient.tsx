"use client";
import { useState, useEffect } from "react";

import StoreHeader from "./StoreHeader";
import StoreDetails from "./StoreDetails";
import StoreOffers from "./StoreOffers";
import StoreAbout from "./StoreAbout";
import StoreBranches from "./StoreBranches";
import VideoModal from "@/components/common/videomodal/VideoModal";

type StoreProfileClientProps = {
  store: any;
  loading: boolean;
  error: string | null;
};

const StoreProfileClient = ({
  store,
  loading,
  error,
}: StoreProfileClientProps) => {
  const [activeTab, setActiveTab] = useState<"offers" | "about" | "branches">(
    "offers"
  );

  // VideoModal states
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // Infinite scroll states
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Update items when store data loads
  useEffect(() => {
    if (!store?.coupon) return;

    setPage(1);
    setCurrentItems([]);
    setHasMore(true);

    const initialItems = store.coupon.slice(0, itemsPerPage);
    setCurrentItems(initialItems);
    setHasMore(store.coupon.length > itemsPerPage);
  }, [store]);

  const loadMoreItems = async () => {
    if (!store?.coupon || loadingMore) return;

    setLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newItems = store.coupon.slice(startIndex, endIndex);

    setCurrentItems((prev) => [...prev, ...newItems]);
    setPage(nextPage);
    setHasMore(endIndex < store.coupon.length);
    setLoadingMore(false);
  };

  const handleFollow = () => {
    // TODO: Implement follow functionality
  };

  // Handle opening video modal
  const openVideoModal = (coupon: any) => {
    const videoIndex = store.coupon.findIndex(
      (video: any) => video.id === coupon.id
    );
    setSelectedVideoIndex(videoIndex >= 0 ? videoIndex : 0);
    setIsVideoModalOpen(true);
  };

  // Handle closing video modal
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideoIndex(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-theme-accent-primary"></div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-theme-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-theme-text-primary mb-4">
            {error || "المتجر غير موجود"}
          </h1>
          <p className="text-theme-text-secondary">
            عذراً، المتجر الذي تبحث عنه غير موجود
          </p>
        </div>
      </div>
    );
  }

  // Calculate total views and likes from coupons
  const totalViews =
    store.coupon?.reduce(
      (sum: number, coupon: any) => sum + (coupon.views_count || 0),
      0
    ) || 0;
  const totalLikes =
    store.coupon?.reduce((sum: number, coupon: any) => {
      const positiveLikes =
        coupon.likes?.filter((like: any) => like.value === 1).length || 0;
      return sum + positiveLikes;
    }, 0) || 0;

  // Additional stats
  const totalFollowers = store?.followers?.length || 0;
  const totalBranches = store?.branches?.length || 0;
  const totalOffers = store?.coupon?.length || 0;

  return (
    <div className="min-h-screen bg-theme-bg-primary">
      {/* Header */}
      <StoreHeader
        store={store}
        totalViews={totalViews}
        totalLikes={totalLikes}
        totalFollowers={totalFollowers}
        totalBranches={totalBranches}
        totalOffers={totalOffers}
        onFollow={handleFollow}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 mt-4 md:mt-6">
        {/* Store Details */}
        <div className="mb-6 md:mb-8">
          <StoreDetails store={store} />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-theme-border-primary mb-6 md:mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("offers")}
            className={`py-2 sm:py-3 px-3 sm:px-6 text-sm sm:text-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "offers"
                ? "text-theme-accent-primary border-b-2 border-theme-accent-primary"
                : "text-theme-text-secondary hover:text-theme-text-primary"
            }`}
          >
            العروض ({store.coupon?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`py-2 sm:py-3 px-3 sm:px-6 text-sm sm:text-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "about"
                ? "text-theme-accent-primary border-b-2 border-theme-accent-primary"
                : "text-theme-text-secondary hover:text-theme-text-primary"
            }`}
          >
            عن المتجر
          </button>
          <button
            onClick={() => setActiveTab("branches")}
            className={`py-2 sm:py-3 px-3 sm:px-6 text-sm sm:text-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "branches"
                ? "text-theme-accent-primary border-b-2 border-theme-accent-primary"
                : "text-theme-text-secondary hover:text-theme-text-primary"
            }`}
          >
            الفروع ({store.branches?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "offers" && (
          <StoreOffers
            store={store}
            currentItems={currentItems}
            hasMore={hasMore}
            loadingMore={loadingMore}
            loadMoreItems={loadMoreItems}
            openVideoModal={openVideoModal}
          />
        )}

        {activeTab === "about" && <StoreAbout store={store} />}

        {activeTab === "branches" && <StoreBranches store={store} />}
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={closeVideoModal}
          currentIndex={selectedVideoIndex}
          onVideoChange={setSelectedVideoIndex}
          videos={store.coupon}
        />
      )}
    </div>
  );
};

export default StoreProfileClient;
