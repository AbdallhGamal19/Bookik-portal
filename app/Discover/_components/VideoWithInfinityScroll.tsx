"use client";

import { useState } from "react";
import { IVideo } from "../../../interface";
import LazyVideo from "../../../components/common/LazyVideo";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

const ITEMS_PER_LOAD = 8;

const VideoWithInfinityScroll = ({
  data,
  className,
}: {
  data: IVideo[];
  className?: string;
}) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const hasMore = visibleCount < data.length;

  const loadMore = (): void => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, data.length));
  };

  const lastItemRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-bookik-gap-md md:gap-bookik-gap-lg  md:mx-6 h-[calc(100vh-107px)] md:min-h-[calc(100vh-72px)] overflow-y-scroll  snap-y snap-mandatory hide-scrollbar ">
      {data
        ?.filter((_, index) => index < visibleCount)
        .map(({ video_url, id, likes, streem_video_url }: IVideo, index) => {
          const isLast = index === visibleCount - 1;
          return (
            <div
              key={id}
              ref={isLast ? lastItemRef : null}
              className={`${
                className ||
                "md:rounded-lg overflow-hidden h-[calc(100vh-107px)] md:h-[calc((100vh-128px)/2)]  snap-start relative shadow-theme-shadow-md scrollbar:none"
              } `}
            >
              <LazyVideo
                likes={likes}
                video_url={video_url || streem_video_url}
                id={id}
              />
            </div>
          );
        })}
    </div>
  );
};

export default VideoWithInfinityScroll;
