import { useState, useCallback, useEffect } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";
import axiosInstance from "@/app/Constatns/axiosInstance";

import { UseSliderInfiniteScrollOptions } from "@/interface";

export const useSliderInfiniteScroll = ({
  endpoint,
  pageSize = 20,
  initialData = [],
  onDataUpdate,
}: UseSliderInfiniteScrollOptions) => {
  const [dataList, setDataList] = useState<any[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data function for infinite scroll
  const fetchData = useCallback(
    async (page: number = 1, append: boolean = false) => {
      if (!endpoint) return;

      try {
        setIsLoadingMore(true);
        setError(null);

        const response = await axiosInstance.get(endpoint, {
          params: {
            page,
            limit: pageSize,
          },
        });

        const newData = response.data?.data || response.data || [];

        if (append) {
          setDataList((prev) => [...prev, ...newData]);
        } else {
          setDataList(newData);
        }

        setHasMore(newData.length === pageSize);
        setCurrentPage(page);

        // Call callback if provided
        if (onDataUpdate) {
          onDataUpdate(append ? [...dataList, ...newData] : newData);
        }
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to fetch data");
        setHasMore(false);
      } finally {
        setIsLoadingMore(false);
        setLoading(false);
      }
    },
    [endpoint, pageSize, onDataUpdate, dataList]
  );

  // Load more data function
  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && endpoint) {
      fetchData(currentPage + 1, true);
    }
  }, [currentPage, hasMore, isLoadingMore, endpoint, fetchData]);

  // Use infinite scroll hook
  const lastElementRef = useInfiniteScroll(loadMore, hasMore);

  // Initialize data
  useEffect(() => {
    if (initialData.length > 0) {
      setDataList(initialData);
      setHasMore(false); // No more data to load from external source
      setLoading(false);
    } else if (endpoint) {
      fetchData(1, false);
    } else {
      setLoading(false);
    }
  }, [initialData, endpoint, fetchData]);

  // Reset function
  const reset = useCallback(() => {
    setDataList([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
    if (endpoint) {
      fetchData(1, false);
    }
  }, [endpoint, fetchData]);

  // Refresh function
  const refresh = useCallback(() => {
    if (endpoint) {
      fetchData(1, false);
    } else if (initialData.length > 0) {
      // If using external data, just reset the state
      setDataList([...initialData]);
      setError(null);
      setLoading(false);
    }
  }, [endpoint, fetchData, initialData]);

  return {
    dataList,
    loading,
    hasMore,
    currentPage,
    isLoadingMore,
    error,
    lastElementRef,
    loadMore,
    reset,
    refresh,
    setDataList,
  };
};
