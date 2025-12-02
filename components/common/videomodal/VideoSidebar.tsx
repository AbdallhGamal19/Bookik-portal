"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaHeart,
  FaCheck,
  FaCopy,
} from "react-icons/fa";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaSnapchat,
} from "react-icons/fa";
import { skipHtmlTags } from "@/utlis/tools";
import CommentInput from "@/components/ui/CommentInput";

type VideoSidebarProps = {
  currentVideo: any;
  userData: any;
  videos: any[];
  localIndex: number;
  activeTab: "videos" | "comments";
  setActiveTab: (tab: "videos" | "comments") => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  onVideoClick: (video: any, index: number) => void;
  onClose: () => void;
};

const VideoSidebar: React.FC<VideoSidebarProps> = ({
  currentVideo,
  userData,
  videos,
  localIndex,
  activeTab,
  setActiveTab,
  showSidebar,
  setShowSidebar,
  onVideoClick,
  onClose,
}) => {
  const socialLinks = [
    {
      href: "https://twitter.com/BookikApp",
      icon: FaTwitter,
      label: "X (Twitter)",
    },
    {
      href: "https://www.tiktok.com/@bookikapp",
      icon: FaTiktok,
      label: "TikTok",
    },
    {
      href: "https://gate.bookik.net/ar/website/social/instagram",
      icon: FaInstagram,
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/company/bookik/",
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      href: "https://www.snapchat.com/add/bookiksa",
      icon: FaSnapchat,
      label: "Snapchat",
    },
  ];

  const [isCopied, setIsCopied] = useState(false);

  const copyLink = async () => {
    if (!currentVideo?.id) return;

    const videoUrl = `http://localhost:3000/Explorer?id=${currentVideo.id}`;

    try {
      await navigator.clipboard.writeText(videoUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div
      className={`overflow-y-auto order-1 transition-all duration-500 ease-in-out my-4 md:my-0 p-4 fixed md:relative inset-0 z-[100] rounded-lg ${
        showSidebar
          ? "w-[75%] sm:w-80 xl:w-96 opacity-100"
          : "opacity-0 w-0 p-0"
      } hide-scrollbar`}
      style={{ backgroundColor: "var(--theme-bg-card)" }}
    >
      {/* User Info */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 space-x-reverse mb-3">
          <Link
            href={`/profile/${userData?.id || currentVideo?.user?.id || ""}`}
            onClick={onClose}
          >
            <div
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden relative cursor-pointer hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: "var(--theme-bg-tertiary)" }}
            >
              <Image
                src={
                  userData?.avatar && userData.avatar.startsWith("http")
                    ? userData.avatar
                    : userData?.avatar && userData.avatar.length > 0
                    ? `${
                        process.env.NEXT_PUBLIC_WEB_URL || "https://7gapp.me"
                      }/images/user/${userData.avatar}`
                    : "/testImages/user.png"
                }
                alt={userData?.name || "User"}
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <div className="flex-1">
            <Link
              href={`/profile/${userData?.id || currentVideo?.user?.id || ""}`}
              onClick={onClose}
            >
              <h3
                className="font-semibold text-sm lg:text-base cursor-pointer transition-colors duration-200"
                style={{ color: "var(--theme-text-primary)" }}
              >
                {userData?.name || userData?.nickname || "User"}
              </h3>
            </Link>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              {userData?.nickname}
            </p>
          </div>
        </div>
      </div>

      {/* Video Title and Description */}
      <div className="mb-6">
        <h2
          className="font-semibold text-sm lg:text-base mb-2"
          style={{ color: "var(--theme-text-primary)" }}
        >
          <Link
            href={`/store/${
              currentVideo?.store_id || currentVideo?.store?.id || ""
            }`}
            className="transition-colors duration-200"
            style={{ color: "var(--theme-text-primary)" }}
          >
            {currentVideo?.title || "Untitled"}
          </Link>
        </h2>
        {currentVideo?.detail && (
          <p
            className="text-xs lg:text-sm leading-relaxed"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {skipHtmlTags(currentVideo.detail)}
          </p>
        )}

        {/* Video Stats */}
        <div
          className="flex items-center space-x-4 space-x-reverse text-xs mt-3"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          <div className="flex items-center space-x-1 space-x-reverse">
            <FaEye size={12} style={{ color: "var(--theme-accent-primary)" }} />
            <span>{currentVideo?.views_count || 0} مشاهدة</span>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse">
            <FaHeart
              size={12}
              style={{ color: "var(--theme-accent-primary)" }}
            />
            <span>
              {Array.isArray(currentVideo?.likes)
                ? currentVideo.likes.length
                : currentVideo?.likes || 0}{" "}
              إعجاب
            </span>
          </div>
          {currentVideo?.created_at && (
            <div className="flex items-center space-x-1 space-x-reverse">
              <span>
                {formatDistanceToNow(new Date(currentVideo.created_at), {
                  addSuffix: true,
                  locale: ar,
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mb-6">
        <h4
          className="font-medium text-sm mb-3"
          style={{ color: "var(--theme-text-primary)" }}
        >
          تابعنا على
        </h4>
        <div className="flex items-center space-x-3 space-x-reverse">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "var(--theme-bg-tertiary)",
                color: "var(--theme-text-primary)",
              }}
              title={social.label}
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* Copy Link Button */}
      <button
        onClick={copyLink}
        className="w-full py-2 px-4 rounded-lg mb-6 transition-all duration-300 text-sm lg:text-base font-medium flex items-center justify-center space-x-2 space-x-reverse"
        style={{
          backgroundColor: isCopied ? "#10B981" : "var(--theme-accent-primary)",
          color: "var(--theme-text-inverse)",
        }}
      >
        {isCopied ? (
          <>
            <FaCheck size={14} />
            <span>تم النسخ!</span>
          </>
        ) : (
          <>
            <FaCopy size={14} />
            <span>نسخ الرابط</span>
          </>
        )}
      </button>

      {/* Navigation Tabs */}
      <div
        className="flex mb-4"
        style={{ borderBottomColor: "var(--theme-border-primary)" }}
      >
        <button
          onClick={() => setActiveTab("videos")}
          className={`py-2 px-3 lg:px-4 text-xs lg:text-sm transition-colors flex-1 ${
            activeTab === "videos" ? "border-b-2" : ""
          }`}
          style={{
            color:
              activeTab === "videos"
                ? "var(--theme-text-primary)"
                : "var(--theme-text-secondary)",
            borderBottomColor:
              activeTab === "videos"
                ? "var(--theme-accent-primary)"
                : "transparent",
          }}
        >
          فيديوهات المبدع ({videos?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`py-2 px-3 lg:px-4 text-xs lg:text-sm transition-colors flex-1 ${
            activeTab === "comments" ? "border-b-2" : ""
          }`}
          style={{
            color:
              activeTab === "comments"
                ? "var(--theme-text-primary)"
                : "var(--theme-text-secondary)",
            borderBottomColor:
              activeTab === "comments"
                ? "var(--theme-accent-primary)"
                : "transparent",
          }}
        >
          ({currentVideo?.comments?.length || 0}) تعليقات
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "videos" ? (
        <div className="max-h-[400px] overflow-y-auto scroll-smooth hide-scrollbar">
          <div className="space-y-3">
            {videos && videos.length > 0 ? (
              videos.map((video: any, index: number) => (
                <div
                  key={video.id}
                  onClick={() => onVideoClick(video, index)}
                  className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 border ${
                    index === localIndex
                      ? "border-theme-accent-primary"
                      : "border-theme-border-primary hover:border-theme-accent-primary"
                  }`}
                  style={{
                    backgroundColor:
                      index === localIndex
                        ? "var(--theme-accent-primary)" + "20"
                        : "var(--theme-bg-tertiary)",
                  }}
                >
                  <div className="w-12 h-12 rounded overflow-hidden relative flex-shrink-0">
                    <Image
                      src={
                        video.image && video.image.startsWith("http")
                          ? video.image
                          : video.image && video.image.length > 0
                          ? `${
                              process.env.NEXT_PUBLIC_WEB_URL ||
                              "https://7gapp.me"
                            }/images/coupon/${video.image}`
                          : "/testImages/test.jpeg"
                      }
                      alt={video.title}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: "var(--theme-text-primary)" }}
                    >
                      {video.title}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      {video.views_count || 0} مشاهدة
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p
                  className="text-sm"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  لا توجد فيديوهات متاحة
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <CommentInput
            postId={currentVideo?.id || 0}
            postType="c"
            replyId="main"
            onCommentAdded={() => console.log("Comment added")}
            placeholder="اكتب تعليقك..."
          />
          {currentVideo?.comments && currentVideo.comments.length > 0 ? (
            currentVideo.comments.map((comment: any) => (
              <div
                key={comment.id}
                className="p-3 rounded-lg"
                style={{ backgroundColor: "var(--theme-bg-tertiary)" }}
              >
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        comment.users?.avatar &&
                        comment.users.avatar.startsWith("http")
                          ? comment.users.avatar
                          : comment.users?.avatar &&
                            comment.users.avatar.length > 0
                          ? `${
                              process.env.NEXT_PUBLIC_WEB_URL ||
                              "https://7gapp.me"
                            }/images/user/${comment.users.avatar}`
                          : "/testImages/user.png"
                      }
                      alt={comment.users?.name || "User"}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 space-x-reverse mb-1">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--theme-text-primary)" }}
                      >
                        {comment.users?.nickname ||
                          comment.users?.name ||
                          "User"}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--theme-text-secondary)" }}
                      >
                        {formatDistanceToNow(new Date(comment.created_at), {
                          addSuffix: true,
                          locale: ar,
                        })}
                      </span>
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--theme-text-primary)" }}
                    >
                      {comment.body}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p
              className="text-center py-8"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              لا توجد تعليقات بعد
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoSidebar;
