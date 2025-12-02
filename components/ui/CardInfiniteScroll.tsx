"use client";
import React, { useCallback, useRef, useEffect, useState } from "react";
import UniversalCard from "./UniversalCard";

interface CardInfiniteScrollProps {
  items: any[];
  hasMore: boolean;
  loadMore: () => Promise<void>;
  loading: boolean;
  className?: string;
  showStoreImage?: boolean;
}

const CardInfiniteScroll: React.FC<CardInfiniteScrollProps> = ({
  items,
  hasMore,
  loadMore,
  loading,
  className = "",
  showStoreImage = true,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (loading || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      await loadMore();
    } finally {
      setIsLoadingMore(false);
    }
  }, [loading, isLoadingMore, hasMore, loadMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          !isLoadingMore
        ) {
          handleLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, isLoadingMore, handleLoadMore]);

  return (
    <div
      className={`${className} full-height-minus-header overflow-y-auto hide-scrollbar `}
    >
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {items.map((item) => (
          <UniversalCard
            key={item.id}
            id={item.id}
            title={item.title}
            detail={item.detail}
            discount={item.discount}
            link={item.link}
            views_count={item.views_count}
            likes={item.likes || []}
            store={item.store}
            store_id={item.store_id}
            user={item.user}
            have_video={item.have_video}
            video_url={item.video_url}
            image={item.image}
            onClick={item.onClick}
            showShareButton={item.showShareButton}
            showStoreImage={showStoreImage}
            className="h-full"
          />
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex justify-center items-center py-4"
        >
          {isLoadingMore && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
              <span className="text-sm">جاري التحميل...</span>
            </div>
          )}
        </div>
      )}

      {/* End of content */}
      {!hasMore && items.length > 0 && (
        <div className="flex justify-center items-center py-4">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm">تم عرض جميع العناصر</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardInfiniteScroll;
