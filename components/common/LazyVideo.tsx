"use client";
import { useRef } from "react";
import { IVideo } from "../../interface";
import VideoPlayer from "./VideoPlayer";
import { useLazyLoad } from "../../hooks/useLazyLoad";
import { useAutoPlay } from "../../hooks/useAutoPlay";
import Spinner from "../ui/Spinner";

const LazyVideo = ({
  video_url,
  likes,
  id,
  showIcons = true,
  isMuted,
}: IVideo) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { wrapperRef, isVisible } = useLazyLoad();
  useAutoPlay(videoRef, isVisible);

  return (
    <div ref={wrapperRef} className="h-full ">
      {isVisible ? (
        <VideoPlayer
          id={id}
          likes={likes.length}
          video_url={video_url}
          videoRef={videoRef}
          showIcons={showIcons}
          isMute={isMuted}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default LazyVideo;
