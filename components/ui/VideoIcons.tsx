import { FaHeart, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import { VideoIconsProps } from "@/interface";

export default function VideoIcons({
  showPlayIcon,
  pathname,
  showbottomIcons,
  onClickHandeler,
  isMute,
  likes,
  onToggleMute,
}: VideoIconsProps) {
  return (
    <>
      {pathname === "/profile" && showPlayIcon && (
        <div
          onClick={onClickHandeler}
          className="absolute inset-0 flex items-center justify-center before:content-[''] before:absolute before:inset-0 before:bg-theme-bg-overlay before:backdrop-blur-sm "
        >
          <span
            className=" z-10 w-bookik-w-xs sm:w-bookik-w-sm lg:w-bookik-w-md h-bookik-w-xs sm:h-bookik-w-sm lg:h-bookik-w-md rounded-bookik-rounded-full bg-theme-bg-card/10 border border-theme-border-primary/40 shadow-theme-shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Play video"
          >
            <FaPlay className="text-theme-text-inverse" size={"40px"} />
          </span>
        </div>
      )}
      {showbottomIcons && (
        <div className="absolute z-50  bottom-4 text-theme-text-inverse flex items-center justify-around font-bold w-full">
          <div
            onClick={onToggleMute}
            className="cursor-pointer text-theme-text-inverse hover:text-theme-accent-primary transition-colors"
          >
            {isMute ? <FaVolumeMute /> : <FaVolumeUp />}
          </div>
          <div className="flex items-center text-theme-text-inverse gap-2">
            <FaHeart className="ms-1  text-theme-text-inverse hover:text-theme-accent-primary transition-colors" />
            {likes}
          </div>
        </div>
      )}
    </>
  );
}
