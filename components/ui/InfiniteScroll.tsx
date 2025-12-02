"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  hasMore: boolean;
  loadMore: () => void;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  loadingComponent?: React.ReactNode;
  endMessage?: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  hasMore,
  loadMore,
  threshold = 0.1,
  rootMargin = "100px",
  className = "",
  loadingComponent,
  endMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      await loadMore();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, loadMore]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          handleLoadMore();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, handleLoadMore, threshold, rootMargin]);

  const defaultLoadingComponent = (
    <div className="flex justify-center items-center py-8">
      <div className="w-8 h-8 border-2 border-theme-border-primary border-t-theme-accent-primary rounded-full animate-spin" />
    </div>
  );

  const defaultEndMessage = (
    <div className="text-center py-8 text-theme-text-secondary">
      <p>تم عرض جميع العناصر</p>
    </div>
  );

  return (
    <div className={className}>
      {children}

      {/* Loading Sentinel */}
      <div ref={sentinelRef} className="h-1" />

      {/* Loading State */}
      {isLoading && (loadingComponent || defaultLoadingComponent)}

      {/* End Message */}
      {!hasMore && !isLoading && (endMessage || defaultEndMessage)}
    </div>
  );
};

export default InfiniteScroll;
