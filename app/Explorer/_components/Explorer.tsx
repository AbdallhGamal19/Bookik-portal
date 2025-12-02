"use client";

import Button from "@/components/ui/Button";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaCommentDots,
  FaHeart,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import EmptyStateWrapper from "../../../components/ui/EmptyStateWrapper";
import { ExploreVideoData } from "../../../interface/index";
import Slider from "./Slider";
import Comments from "./Comments";
import VideoCard from "@/components/ui/VideoCard";
import { getTrendList, getExplorerVideos } from "@/server-actions";
import { MdVideoLibrary } from "react-icons/md";
import LoadingWrapper from "../../../components/ui/LoadingWrapper";
const MySwal = withReactContent(Swal);

export default function Explorer({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const videoRefs = useRef<React.RefObject<HTMLVideoElement>[]>([]);
  const [visibleVideos, setVisibleVideos] = useState<ExploreVideoData[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [commentsModalVideoId, setCommentsModalVideoId] = useState<
    number | null
  >(null);
  const [trendList, setTrendList] = useState<any[]>([]);
  const [mutedVideos, setMutedVideos] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const initialVideos = await getExplorerVideos(searchParams.id);
        let selectedVideos;

        if (searchParams.id) {
          const index = initialVideos.findIndex(
            (video: ExploreVideoData) => video.id.toString() === searchParams.id
          );
          selectedVideos =
            index !== -1
              ? initialVideos.slice(index, index + 3)
              : initialVideos.slice(0, 4);
        } else {
          selectedVideos = initialVideos.slice(0, 4);
        }

        setVisibleVideos(selectedVideos.slice(0, 3));

        // Set first video as active initially
        if (initialVideos.length > 0) setActiveVideoId(initialVideos[0].id);
      } catch (err) {
        throw new Error(`Error fetching videos:${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchTrendList = async () => {
      const data = await getTrendList();

      setTrendList(data);
    };
    fetchVideos();
    fetchTrendList();
  }, [searchParams.id]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.55,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = videoRefs.current.findIndex(
          (ref) => ref.current === entry.target
        );

        if (index !== -1) {
          const videoElement = videoRefs.current[index]?.current;
          const videoData = visibleVideos[index];

          if (entry.isIntersecting && videoData) {
            const newVideoId = videoData.id;

            if (newVideoId !== activeVideoId) {
              setCommentsModalVideoId(null);
              setActiveVideoId(newVideoId);
            }

            videoElement?.play?.();
          } else {
            videoElement?.pause?.();
          }
        }
      });
    }, options);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef?.current) {
        observer.observe(videoRef.current);
      }
    });

    const tryAutoPlayFirstVisible = () => {
      for (let i = 0; i < videoRefs.current.length; i++) {
        const video = videoRefs.current[i]?.current;
        if (!video) continue;

        // Check if visibleVideos[i] exists and has an id
        if (!visibleVideos[i] || !visibleVideos[i].id) continue;

        const rect = video.getBoundingClientRect();
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const percentVisible = visibleHeight / rect.height;

        if (percentVisible >= 0.55) {
          video.play?.();
          setActiveVideoId(visibleVideos[i].id);
          break;
        }
      }
    };

    // ✅ ننتظر شوية بعد ما الصفحة تتحمل
    setTimeout(() => {
      tryAutoPlayFirstVisible();
    }, 300); // ممكن تزود الرقم لو لسه مش شغال

    return () => {
      observer.disconnect();
    };
  }, [visibleVideos, activeVideoId]);

  useEffect(() => {
    if (showAlert) {
      MySwal.fire({
        title: "اكتشف المزيد",
        text: "قم بتحميل التطبيق لمشاهدة المزيد من الفيديوهات.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "تحميل التطبيق",
        cancelButtonText: "إلغاء",
        confirmButtonColor: "var(--theme-accent-primary)",
        cancelButtonColor: "#6b7280",
        background: "var(--theme-bg-card)",
        color: "var(--theme-text-primary)",
        customClass: {
          popup: "rounded-bookik-rounded-2xl",
          title: "text-theme-text-primary",
          confirmButton:
            "bg-theme-accent-primary hover:bg-theme-accent-secondary text-theme-text-inverse font-semibold rounded-bookik-rounded-lg px-4 py-2",
          cancelButton:
            "bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-bookik-rounded-lg px-4 py-2 border border-gray-400 hover:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handleDiscoverMoreClick();
        }
      });
    }
  }, [showAlert]);

  const toggleMute = () => {
    setMutedVideos((prev) => !prev);
  };

  const handleDiscoverMoreClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    let scheme;
    let storeUrl;

    if (/android/i.test(userAgent)) {
      scheme = "bookik://";
      storeUrl = "https://play.google.com/store/apps/details?id=com.yourapp";
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      scheme = "bookik://";
      storeUrl =
        "https://apps.apple.com/in/app/bookik-%D8%A8%D9%88%D9%83%D9%83/id6736427831";
    } else {
      alert("This feature is not supported on your device.");
      return;
    }

    const now = new Date().getTime();
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = scheme;
    document.body.appendChild(iframe);

    setTimeout(() => {
      const elapsedTime = new Date().getTime() - now;
      if (elapsedTime < 2000) {
        window.location.href = storeUrl;
      }
      document.body.removeChild(iframe);
    }, 1500);
  };
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    setIsAtTop(container.scrollTop === 0);

    const hieghtScreen =
      container.scrollHeight - container.scrollTop <= container.clientHeight;
    setIsAtBottom(hieghtScreen);
    setShowAlert(hieghtScreen);
  };

  if (isLoading) {
    return <LoadingWrapper message="جاري تحميل الفيديوهات..." />;
  }
  console.log(visibleVideos, "visibleVideos");
  return (
    <>
      <div
        onScroll={handleScroll}
        ref={containerRef}
        className="full-height-minus-header overflow-y-auto mx-2 lg:mx-8 flex flex-col gap-bookik-gap-lg flex-1 hide-scrollbar pt-bookik-margin-lg"
      >
        <div className="rounded-bookik-rounded-2xl ">
          <Slider data={trendList} sliderTitle="الرائج" type="trending" />
        </div>
        <div className=" border border-theme-border-primary"></div>

        {visibleVideos.length === 0 ? (
          <EmptyStateWrapper
            icon={MdVideoLibrary}
            title="لا توجد فيديوهات رائجة متاحة"
            description="عذراً، لا توجد فيديوهات رائجة متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً أو تصفح العروض المميزة."
            actionText="تصفح فيديوهات أخرى"
            onAction={() => (window.location.href = "/Discover/FeaturedDeals")}
            className="py-8"
          />
        ) : (
          visibleVideos.map(
            (
              {
                id,
                likes,
                image,
                video_url,
                detail,
                advertiser_name,
                offer_title,
                avatar,
                comments,
              }: ExploreVideoData,
              index: number
            ) => {
              // Ensure a ref exists for each video
              if (!videoRefs.current[index]) {
                videoRefs.current[index] = React.createRef<HTMLVideoElement>();
              }

              return (
                <VideoCard
                  key={id}
                  id={id}
                  likes={likes}
                  comments={comments}
                  image={image}
                  video_url={video_url}
                  detail={detail}
                  advertiser_name={advertiser_name}
                  offer_title={offer_title}
                  muted={mutedVideos}
                  videoRef={videoRefs.current[index]}
                  onToggleMute={toggleMute}
                  onLike={() => {}}
                  onComment={() => {
                    setCommentsModalVideoId(id);
                  }}
                  onDiscoverMore={handleDiscoverMoreClick}
                />
              );
            }
          )
        )}
      </div>

      {/* Comments Modal */}
      {commentsModalVideoId &&
        (() => {
          const video = visibleVideos.find(
            (v) => v.id === commentsModalVideoId
          );
          return video ? (
            <Comments
              videoId={commentsModalVideoId}
              initialComments={video.comments || []}
              isOpen={!!commentsModalVideoId}
              onClose={() => setCommentsModalVideoId(null)}
            />
          ) : null;
        })()}
    </>
  );
}
