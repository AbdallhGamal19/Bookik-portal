"use client";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useCallback, useState } from "react";
import { currentlyPlayingRef } from "@/utlis";
import VideoIcons from "../ui/VideoIcons";
import { VideoPlayerProps } from "@/interface";
import Spinner from "../ui/Spinner";
import NoVideoAlert from "./videomodal/NoVideoAlert";

const VideoPlayer = ({
  id,
  likes,
  video_url,
  isMute,
  videoRef,
  showIcons = true,
  className = "",
}: VideoPlayerProps) => {
  const pathname = usePathname();
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [isMuted, setIsMuted] = useState(isMute || false);
  const [isLoading, setIsLoading] = useState(true);

  // Update isMuted when isMute prop changes
  useEffect(() => {
    setIsMuted(isMute || false);
  }, [isMute]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    const handlePause = () => {
      setShowPlayIcon(true);
    };

    const handlePlay = () => {
      setShowPlayIcon(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [videoRef, isMuted]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // أوقف الفيديو التاني
    if (currentlyPlayingRef.video && currentlyPlayingRef.video !== video) {
      currentlyPlayingRef.video.pause();
    }

    if (video.paused) {
      video.play();
      currentlyPlayingRef.video = video;
      setShowPlayIcon(false);
    } else {
      video.pause();
      currentlyPlayingRef.video = null;
    }
  }, [videoRef]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const onClickHandeler = () => {
    setShowPlayIcon((prev) => !prev);
    togglePlay();
  };

  // إذا لم يكن هناك فيديو، اعرض رسالة "مفيش فيديو"
  if (!video_url) {
    return <NoVideoAlert className="w-full h-full relative" />;
  }

  return (
    <div className="w-full h-full relative">
      <video
        ref={videoRef}
        src={video_url}
        className={className || `w-full h-full object-cover  cursor-pointer`}
        loop
        playsInline
        onClick={onClickHandeler}
        controls={false}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <Spinner className="bg-transparent" />
        </div>
      )}

      <VideoIcons
        isMute={isMuted}
        likes={likes}
        onToggleMute={toggleMute}
        pathname={pathname}
        showPlayIcon={showPlayIcon}
        showbottomIcons={showIcons}
        onClickHandeler={onClickHandeler}
      />
    </div>
  );
};

export default VideoPlayer;
