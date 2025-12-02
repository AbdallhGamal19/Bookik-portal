import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [callback, hasMore]);

  return lastElementRef;
}
