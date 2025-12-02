"use client";
import React, { useState } from "react";
import UniversalCard from "./UniversalCard";
import { useInView } from "react-intersection-observer";

interface CardLazyLoadProps {
  id: string | number;
  title: string;
  detail?: string;
  code?: string;
  link?: string;
  discount?: string;
  start?: string;
  expiry?: string;
  image?: string;
  address?: string;
  is_active?: boolean;
  views_count?: number;
  likes?: any[];
  store?: {
    id: string | number;
    title: string;
    image?: string;
  };
  store_id?: string | number;
  user?: {
    id: string | number;
    name: string;
    image?: string;
  };
  have_video?: boolean;
  video_url?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  priority?: boolean;
  threshold?: number;
  rootMargin?: string;
}

const CardLazyLoad: React.FC<CardLazyLoadProps> = ({
  priority = false,
  threshold = 0.1,
  rootMargin = "50px",
  store,
  ...cardProps
}) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
    skip: priority,
  });

  const shouldLoad = priority || inView;

  return (
    <div ref={ref} className="w-full">
      {shouldLoad ? (
        <UniversalCard {...cardProps} store={store} />
      ) : (
        <div className="bg-theme-bg-card rounded-xl border border-theme-border-primary overflow-hidden animate-pulse">
          {/* Image Placeholder */}
          <div className="aspect-[4/3] w-full bg-theme-bg-secondary animate-pulse" />

          {/* Content Placeholder */}
          <div className="p-4 space-y-3">
            {/* Title Placeholder */}
            <div className="h-6 bg-theme-bg-secondary rounded animate-pulse" />

            {/* Description Placeholder */}
            <div className="h-4 bg-theme-bg-secondary rounded animate-pulse w-3/4" />

            {/* Stats Placeholder */}
            <div className="flex justify-between">
              <div className="h-4 bg-theme-bg-secondary rounded animate-pulse w-20" />
              <div className="h-4 bg-theme-bg-secondary rounded animate-pulse w-16" />
            </div>

            {/* Actions Placeholder */}
            <div className="flex justify-between items-center">
              <div className="h-4 bg-theme-bg-secondary rounded animate-pulse w-24" />
              <div className="flex gap-2">
                <div className="h-6 w-6 bg-theme-bg-secondary rounded animate-pulse" />
                <div className="h-6 w-6 bg-theme-bg-secondary rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardLazyLoad;
