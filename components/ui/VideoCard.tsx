"use client";
import React from "react";
import Image from "next/image";
import { replaceHTMLTagsToText } from "@/utlis";
import Button from "./Button";
import VideoPlayer from "@/components/common/VideoPlayer";
import { FaComment, FaHeart, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import NoVideoAlert from "../common/videomodal/NoVideoAlert";

export default function VideoCard({
  id,
  likes_count,
  image,
  video_url,
  detail,
  advertiser_name,
  offer_title,
  muted,
  videoRef,
  onToggleMute,
  onLike,
  onComment,
  onDiscoverMore,
  comments,
}: any) {
  console.log(video_url, "video_url");

  return (
    <div className="bg-theme-bg-card rounded-bookik-rounded-2xl p-bookik-padding-md lg:p-bookik-padding-xl border border-theme-border-primary shadow-theme-shadow-sm">
      {/* Header Info */}
      <div className="flex flex-col justify-start gap-bookik-gap-xs mb-bookik-margin-xs">
        <div className="flex items-center gap-bookik-gap-md mb-bookik-margin-sm">
          <Image
            src={image}
            alt={advertiser_name}
            className="w-14 h-14 rounded-bookik-rounded-full border-2 border-theme-border-primary"
            width={56}
            height={56}
          />
          <div className="flex flex-col gap-bookik-gap-xs">
            <h3 className="text-text8 font-normal text-theme-text-primary">
              {offer_title}
            </h3>
          </div>
        </div>
        <p className="ms-5 mb-bookik-margin-lg text-theme-text-tertiary">
          {replaceHTMLTagsToText(detail)}
        </p>
      </div>

      {/* Video Container */}
      <div className="w-full h-[calc(100vh-300px)] overflow-hidden">
        <div className="relative mx-auto h-full w-full aspect-video rounded-bookik-rounded-2xl overflow-hidden">
          {video_url ? (
            <VideoPlayer
              id={id}
              likes={likes_count}
              video_url={video_url}
              isMute={muted}
              videoRef={videoRef}
              showIcons={false}
              className="w-full h-full aspect-video object-cover cursor-pointer"
            />
          ) : image ? (
            <Image
              src={image}
              alt={advertiser_name}
              fill
              className="w-full h-full  object-cover"
            />
          ) : (
            <NoVideoAlert />
          )}
          {/* Overlay Controls */}
          <>
            {/* Mute Button */}
            {video_url && (
              <div className="absolute right-4 top-4 flex items-center space-x-2">
                <div
                  className="text-white cursor-pointer bg-black/50 rounded-full p-2"
                  onClick={onToggleMute}
                >
                  {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                </div>
              </div>
            )}

            {/* Social Actions */}
            <div className="absolute right-4 top-1/3 transform translate-y-1/2 flex flex-col items-center space-y-bookik-gap-md">
              <div className="relative">
                <Image
                  src={image}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="w-10 h-10 rounded-bookik-rounded-full border-2 object-contain"
                />
              </div>

              <div
                className="text-white cursor-pointer flex flex-col items-center"
                onClick={onLike}
              >
                <FaHeart />
                <span className="text-textsm text-center mt-bookik-margin-xs">
                  {likes_count || 0}
                </span>
              </div>

              <div
                className="text-white cursor-pointer flex flex-col items-center"
                onClick={onComment}
              >
                <span className="text-textsm text-center ">
                  <FaComment />
                  {comments?.length || 0}
                </span>
              </div>
            </div>

            {/* Discover More Button */}
            <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
              <Button
                type="button"
                variant="linerBg"
                size="md"
                onClick={onDiscoverMore}
                className="font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-black/20 border border-white/20 hover:scale-105 active:scale-95"
              >
                اكتشف المزيد
              </Button>
            </div>

            {/* Video Info */}
            <div className="absolute text-text6 bottom-0 left-0 w-full text-right text-white px-bookik-padding-md py-bookik-padding-sm bg-gradient-to-t from-black/90 via-black/70 to-black/10 rounded-b-bookik-rounded-2xl">
              <p className="mb-bookik-margin-xs">{offer_title}</p>
              <p className="mb-bookik-margin-xs">{advertiser_name}</p>
              <p className="font-medium mb-bookik-margin-md text-right">
                {replaceHTMLTagsToText(detail)}
              </p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
