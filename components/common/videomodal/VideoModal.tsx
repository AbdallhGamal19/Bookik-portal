"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { VideoItem } from "@/interface";

import LazyVideo from "../LazyVideo";
import VideoControls from "./VideoControls";
import VideoSidebar from "./VideoSidebar";
import NoVideoAlert from "./NoVideoAlert";
import Image from "next/image";

type VideoModalClientProps = {
  videos: any[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onVideoChange: (index: number) => void;
  isMuted?: boolean;
  onMuteToggle?: (muted: boolean) => void;
};

const VideoModal: React.FC<VideoModalClientProps> = ({
  isOpen,
  onClose,
  currentIndex = 0,
  onVideoChange,
  isMuted: externalIsMuted,
  onMuteToggle,
  videos,
}) => {
  // State management
  const [isMuted, setIsMuted] = useState(externalIsMuted ?? true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"videos" | "comments">("comments");
  const [showSidebar, setShowSidebar] = useState(true);
  const [localIndex, setLocalIndex] = useState(currentIndex);

  const videoListRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Current video and user data
  const currentVideo = videos?.[localIndex] || null;
  const userData = currentVideo?.user || null;

  // Helper function to get video element
  const getVideoElement = useCallback((videoIndex: number) => {
    return document.querySelector(
      `[data-video-index="${videoIndex}"] video`
    ) as HTMLVideoElement;
  }, []);

  // Auto play function
  const autoPlayVideo = useCallback(
    (videoIndex: number, delay: number = 100) => {
      setTimeout(() => {
        setIsPlaying(true);
        const videoElement = getVideoElement(videoIndex);
        if (videoElement) {
          videoElement.play().catch(() => {
            console.log("Autoplay blocked by browser");
          });
        }
      }, delay);
    },
    [getVideoElement]
  );

  // Sync with external currentIndex
  useEffect(() => {
    setLocalIndex(currentIndex);
  }, [currentIndex]);

  // Video navigation functions
  const nextVideo = useCallback(() => {
    if (localIndex < videos.length - 1) {
      const newIndex = localIndex + 1;
      setLocalIndex(newIndex);
      onVideoChange(newIndex);
      autoPlayVideo(newIndex);
    }
  }, [localIndex, videos.length, onVideoChange, autoPlayVideo]);

  const prevVideo = useCallback(() => {
    if (localIndex > 0) {
      const newIndex = localIndex - 1;
      setLocalIndex(newIndex);
      onVideoChange(newIndex);
      autoPlayVideo(newIndex);
    }
  }, [localIndex, onVideoChange, autoPlayVideo]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (onMuteToggle) onMuteToggle(newMuted);
  }, [isMuted, onMuteToggle]);

  const handleVideoClickInSidebar = (video: any, index: number) => {
    setLocalIndex(index);
    onVideoChange(index);
    setActiveTab("videos");
  };

  const closeVideoModal = useCallback(() => {
    onClose();
  }, [onClose]);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case " ":
          e.preventDefault();
          break;
        case "ArrowUp":
          e.preventDefault();
          prevVideo();
          break;
        case "ArrowDown":
          e.preventDefault();
          nextVideo();
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose, prevVideo, nextVideo, toggleMute]);

  // Scroll to current video when modal opens - immediate positioning
  useEffect(() => {
    if (isOpen && videoListRef.current && videos.length > 0) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const container = videoListRef.current;
        if (container) {
          const itemHeight = container.clientHeight;
          const targetScroll = localIndex * itemHeight;

          // Set scroll position directly without animation
          container.scrollTop = targetScroll;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, videos.length]);

  // Auto scroll to current video during navigation - only for arrow keys
  useEffect(() => {
    if (videoListRef.current && videos.length > 0 && !isScrollingRef.current) {
      const container = videoListRef.current;
      if (container) {
        const itemHeight = container.clientHeight;
        const targetScroll = localIndex * itemHeight;
        const currentScroll = container.scrollTop;
        const scrollDifference = Math.abs(currentScroll - targetScroll);

        if (scrollDifference > 50) {
          isScrollingRef.current = true;
          // Use smooth scroll like the mouse scroll
          container.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 500);
        }
      }
    }
  }, [localIndex, videos.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  // Don't render if modal is closed or no video
  if (!isOpen || !currentVideo) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeVideoModal();
        }
      }}
    >
      <div
        className="relative w-full h-full rounded-lg overflow-hidden flex flex-row"
        style={{ backgroundColor: "var(--theme-bg-primary)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar */}
        <VideoSidebar
          currentVideo={currentVideo}
          userData={userData}
          videos={videos}
          localIndex={localIndex}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          onVideoClick={handleVideoClickInSidebar}
          onClose={onClose}
        />

        {/* Right Side - Video Player */}
        <div
          className="flex-1 relative order-1 lg:order-2 overflow-hidden"
          style={{ backgroundColor: "#000000" }}
        >
          {/* Controls */}
          <VideoControls
            videos={videos}
            localIndex={localIndex}
            onPrevVideo={prevVideo}
            onNextVideo={nextVideo}
            onClose={closeVideoModal}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            hasVideo={!!currentVideo?.video_url}
          />

          {/* Video Container with TikTok-like Scroll */}
          <div
            ref={videoListRef}
            className="h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar"
            style={{
              scrollSnapType: "y mandatory",
            }}
            onScroll={(e) => {
              if (isScrollingRef.current) return;

              const container = e.target as HTMLDivElement;
              const scrollTop = container.scrollTop;
              const itemHeight = container.clientHeight;
              const currentIndex = Math.round(scrollTop / itemHeight);

              // Only update if there's a significant change and valid index
              if (
                currentIndex !== localIndex &&
                currentIndex >= 0 &&
                currentIndex < videos.length &&
                Math.abs(currentIndex - localIndex) === 1
              ) {
                isScrollingRef.current = true;

                if (currentIndex > localIndex) {
                  nextVideo();
                } else if (currentIndex < localIndex) {
                  prevVideo();
                }

                setTimeout(() => {
                  isScrollingRef.current = false;
                }, 300);
              }
            }}
          >
            {videos &&
              videos.length > 0 &&
              videos.map((video: VideoItem, index: number) => (
                <div
                  key={video.id}
                  data-video-index={index}
                  className="w-full h-full flex items-center justify-center snap-start snap-always relative mb-2"
                >
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="w-full md:max-w-[600px] h-full rounded-lg overflow-hidden relative">
                      {/* Check if video has video_url */}
                      {video.video_url ? (
                        <LazyVideo
                          id={video.id}
                          video_url={video.video_url}
                          likes={video.likes}
                          showIcons={false}
                          isMuted={isMuted}
                        />
                      ) : video.image ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_WEB_URL}/images/coupon/${video.image}`}
                          alt={video.title}
                          fill
                          loading="lazy"
                          className=" object-cover"
                        />
                      ) : (
                        // <NoVideoAlert />
                        <NoVideoAlert />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
