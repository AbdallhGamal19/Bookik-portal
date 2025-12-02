import { useEffect } from "react";
import { currentlyPlayingRef } from "../utlis";

export const useAutoPlay = (
  videoRef: React.RefObject<HTMLVideoElement>,
  isVisible: boolean
) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (currentlyPlayingRef.video && currentlyPlayingRef.video !== video) {
        currentlyPlayingRef.video.pause();
      }

      try {
        video.play();
        currentlyPlayingRef.video = video;
      } catch (err) {
        console.error("Autoplay failed", err);
      }
    };

    if (isVisible) {
      const timeout = setTimeout(() => {
        const rect = video.getBoundingClientRect();
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibleRatio = visibleHeight / rect.height;

        if (visibleRatio >= 0.55) {
          handlePlay();
        }
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      if (currentlyPlayingRef.video === video) {
        video.pause();
        currentlyPlayingRef.video = null;
      }
    }
  }, [isVisible, videoRef]);
};
