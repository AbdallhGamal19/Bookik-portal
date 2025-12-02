"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { VideoItem, CategoryData } from "@/interface";
import VideoModal from "@/components/common/videomodal/VideoModal";
import Spinner from "@/components/ui/Spinner";
import { ImSpinner9 } from "react-icons/im";

interface SliderProps {
  data: VideoItem[] | CategoryData[];
  sliderTitle: string;
  type?: string;
  isLoading?: boolean;
}
export default function Slider({
  data,
  type,
  sliderTitle,
  isLoading = false,
}: SliderProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const router = useRouter();

  // Helper functions
  const isCategory = type === "categories";
  const hasData = data && data.length > 0;

  const handleItemClick = (item: VideoItem | CategoryData) => {
    if (isCategory) {
      router.push(`/Discover/Categories/${item.id}`);
      return;
    }

    // For trending videos or any video items, open the modal (even without video_url)
    if (type === "trending" || "video_url" in item) {
      const itemIndex = data.findIndex((video: any) => video.id === item.id);
      setCurrentVideoIndex(itemIndex);
      setIsVideoModalOpen(true);
    }
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const handleVideoChange = (newIndex: number) => {
    setCurrentVideoIndex(newIndex);
  };
  const getImageSrc = (item: VideoItem | CategoryData) => {
    if (isCategory) {
      return `${process.env.NEXT_PUBLIC_WEB_URL}${
        (item as CategoryData).second_image
      }`;
    }
    return `${process.env.NEXT_PUBLIC_WEB_URL}/images/coupon/${item.image}`;
  };

  const getUserImageSrc = (item: VideoItem | CategoryData) => {
    if (isCategory) {
      return `${process.env.NEXT_PUBLIC_WEB_URL}${
        (item as CategoryData).second_image
      }`;
    }
    const videoItem = item as VideoItem;
    return videoItem.user.avatar || videoItem.user.image
      ? `${process.env.NEXT_PUBLIC_WEB_URL}/images/user/${
          videoItem.user.avatar || videoItem.user.image
        }`
      : "testImages/test.jpeg";
  };

  const getDisplayName = (item: VideoItem | CategoryData) => {
    return isCategory ? item.title : (item as VideoItem).user.name;
  };

  const getProfileLink = (item: VideoItem | CategoryData) => {
    return !isCategory ? `/profile/${(item as VideoItem).user.id}` : "#";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="px-4 py-8">
        <h2 className="text-text4 font-semibold leading-9 text-theme-text-primary mb-4">
          {sliderTitle}
        </h2>
        <div className="flex justify-center items-center">
          <span className="animate-spin text-theme-accent-primary text-xl">
            <ImSpinner9 />
          </span>
        </div>
      </div>
    );
  }

  // Empty state
  if (!hasData) {
    return (
      <div className="px-4 py-8">
        <h2 className="text-text4 font-semibold leading-9 text-theme-text-primary mb-4">
          {sliderTitle}
        </h2>
        <div className="text-center py-8">
          <p className="text-theme-text-secondary">لا توجد بيانات متاحة</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-text4 font-semibold leading-9  text-theme-text-primary mb-2">
        {data && sliderTitle}
      </h2>

      <Swiper
        className="px-4 py-2"
        modules={[FreeMode]}
        spaceBetween={12}
        grabCursor
        freeMode={{ enabled: true, momentum: false }}
        resistance
        resistanceRatio={0.85}
        slidesPerView="auto"
      >
        {data.map((item, index) => (
          <SwiperSlide key={item.id} className="!w-bookik-w-xl">
            <div className="relative w-full cursor-pointer">
              <div
                onClick={() => handleItemClick(item)}
                className="aspect-[2/3] h-[163px] w-full relative"
              >
                <Image
                  src={getImageSrc(item)}
                  alt={item.title}
                  fill
                  className="rounded-bookik-rounded-2xl object-cover"
                  loading="lazy"
                />
              </div>
              {/* Discount badge - Only for video items */}
              {!isCategory && "discount" in item && item.discount && (
                <div className="absolute top-2 left-2 bg-theme-accent-primary text-theme-text-inverse px-2 py-1 rounded-full text-xs font-bold shadow-theme-shadow-md z-10">
                  {item.discount?.includes("%") || isNaN(Number(item.discount))
                    ? item.discount
                    : `${item.discount}%`}
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-1 z-10">
                <div className="bg-theme-bg-card w-full p-0.5 rounded-full flex items-center shadow-lg border border-theme-border-primary">
                  <Link
                    href={getProfileLink(item)}
                    className="flex items-center gap-bookik-gap-sm w-full"
                  >
                    <div className="w-6 h-6 rounded-full relative">
                      <Image
                        src={getUserImageSrc(item)}
                        alt={getDisplayName(item)}
                        fill
                        className="rounded-full object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-text8 font-bold text-theme-text-primary truncate max-w-bookik-w-xs">
                      {getDisplayName(item)}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* VideoModal - Only for video items */}
      {isVideoModalOpen && hasData && !isCategory && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={closeVideoModal}
          currentIndex={currentVideoIndex}
          onVideoChange={handleVideoChange}
          videos={data as VideoItem[]}
        />
      )}
    </div>
  );
}
