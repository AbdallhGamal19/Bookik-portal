"use client";
import React from "react";
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import Image from "next/image";

type VideoControlsProps = {
  videos: any[];
  localIndex: number;
  onPrevVideo: () => void;
  onNextVideo: () => void;
  onClose: () => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  hasVideo?: boolean;
};

const VideoControls: React.FC<VideoControlsProps> = ({
  videos,
  localIndex,
  onPrevVideo,
  onNextVideo,
  onClose,
  showSidebar,
  setShowSidebar,
  isMuted,
  onToggleMute,
  hasVideo = true,
}) => {
  return (
    <>
      {/* Desktop Close Button */}
      <button
        onClick={onClose}
        className="block p-2 rounded-full absolute top-4 right-4 z-10 transition-all duration-300 hover:scale-110 bg-black/50 text-white"
      >
        <FaTimes size={16} />
      </button>

      {/* BOOKIK Logo */}
      <div className="absolute top-4 left-4 z-10 w-auto h-6 lg:h-8">
        <Image src="/Bookik.svg" alt="BOOKIK" fill />
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden absolute top-0 left-2 z-[9999] transition-all duration-300 p-2 rounded-full hover:scale-110 bg-black/50 text-white"
      >
        <div className="flex items-center space-x-3 space-x-reverse transition-all duration-300 ease-in-out ">
          {showSidebar ? (
            <>
              <FaChevronRight size={16} />
              <p>تفاصيل الفيديو</p>
            </>
          ) : (
            <>
              <FaChevronLeft size={16} />
              <p>تفاصيل الفيديو</p>
            </>
          )}
        </div>
      </button>

      {/* Navigation Arrows */}
      {videos.length > 1 && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-20">
          <button
            onClick={onPrevVideo}
            className="p-2 lg:p-3 rounded-full transition-all duration-300 hover:scale-110 bg-black/50 text-white"
          >
            <FaChevronUp size={16} />
          </button>
          <button
            onClick={onNextVideo}
            className="p-2 lg:p-3 rounded-full transition-all duration-300 hover:scale-110 bg-black/50 text-white"
          >
            <FaChevronDown size={16} />
          </button>
        </div>
      )}

      {/* Mute/Unmute Button - Only show if video exists */}
      {hasVideo && (
        <button
          onClick={onToggleMute}
          className="absolute bottom-4 right-4 z-10 p-2 lg:p-3 rounded-full transition-all duration-300 hover:scale-110 bg-black/50 text-white"
        >
          {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
      )}

      {/* Play/Pause Button - Center of Video */}
    </>
  );
};

export default VideoControls;
