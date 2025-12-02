"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaHeart,
  FaShare,
  FaEye,
  FaMapMarkerAlt,
  FaClock,
  FaTags,
  FaPlay,
} from "react-icons/fa";

import { CategoryCardProps } from "@/interface";
import { useRouter } from "next/navigation";
export default function CategoryCard({
  id,
  title,
  detail,
  code,
  link,
  discount,
  start,
  expiry,
  image,
  address,
  is_active,
  views_count = 0,
  likes = [],
  store,
  user,
  showStoreImage = true,
}: CategoryCardProps & { showStoreImage?: boolean }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const router = useRouter();
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `عرض ${title} من Bookik`,
        text: `اكتشف هذا العرض الرائع! خصم ${discount}`,
        url: window.location.href,
      });
    }
  };

  const getImageUrl = () => {
    if (!image) return "/testImages/test.jpeg";

    if (image.startsWith("http")) {
      return image;
    }

    return `${process.env.NEXT_PUBLIC_WEB_URL}/images/coupon/${image}`;
  };

  const getUserAvatarUrl = () => {
    if (!user?.image) return "/testImages/user.png";

    if (user.image.startsWith("http")) {
      return user.image;
    }

    return `${process.env.NEXT_PUBLIC_WEB_URL}/images/user/${user.image}`;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleClick = () => {
    router.push(`/store/${store?.id || id}`);
  };

  return (
    <div className="bg-theme-bg-card rounded-xl border border-theme-border-primary overflow-hidden hover:shadow-theme-shadow-lg transition-shadow duration-300 group ">
      {/* Image Container */}
      <div className="relative ">
        <div
          onClick={handleClick}
          className="aspect-[4/3] w-full relative overflow-hidden cursor-pointer"
        >
          <Image
            src={getImageUrl()}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/testImages/test.jpeg";
            }}
          />

          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-3 right-3 bg-theme-accent-primary text-theme-text-inverse px-3 py-1 rounded-full text-sm font-bold shadow-theme-shadow-lg">
              {discount.includes("%") || isNaN(Number(discount))
                ? discount
                : `${discount}%`}
            </div>
          )}

          {/* Status Badge */}
          {is_active !== undefined && (
            <div
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
                is_active
                  ? "bg-theme-accent-success text-theme-text-inverse"
                  : "bg-theme-text-error text-theme-text-inverse"
              }`}
            >
              {is_active ? "نشط" : "غير نشط"}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div
          onClick={handleClick}
          className="flex items-start justify-between mb-3 cursor-pointer"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-theme-text-primary text-lg mb-1 line-clamp-2">
              {store?.title}
            </h3>
          </div>

          {/* User Avatar */}
          {showStoreImage && user?.name && (
            <div className="flex items-center space-x-2 space-x-reverse ml-3">
              <Image
                src={getUserAvatarUrl()}
                alt={user.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border-2 border-theme-border-primary shadow-theme-shadow-md"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/testImages/user.png";
                }}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-theme-text-secondary text-sm mb-4 line-clamp-1">
          {detail}
        </p>

        {/* Dates */}
        <div className="flex items-center justify-between text-xs text-theme-text-muted mb-4">
          <div className="flex items-center space-x-1 space-x-reverse">
            <FaClock />
            <span>من: {start}</span>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse">
            <FaClock />
            <span>إلى: {expiry}</span>
          </div>
        </div>

        {/* Location */}
        {address && (
          <div className="flex items-center space-x-1 space-x-reverse text-xs text-theme-text-muted mb-4">
            <FaMapMarkerAlt />
            <span>{address}</span>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-theme-text-muted mb-4">
          <div className="flex items-center space-x-1 space-x-reverse">
            <FaEye />
            <span>{views_count} مشاهدة</span>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse">
            <FaHeart />
            <span>{likes.length} إعجاب</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          {link ? (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-theme-text-link hover:text-theme-accent-primary transition-colors"
            >
              زيارة الموقع
            </Link>
          ) : (
            <span className="text-theme-text-muted"> لا يوجد موقع</span>
          )}
          <div className="flex items-center gap-bookik-gap-sm">
            <button onClick={handleLike}>
              <FaHeart
                className={
                  isLiked ? "text-theme-accent-error" : "text-theme-text-muted"
                }
              />
            </button>

            <button
              onClick={handleShare}
              className="p-2  text-theme-text-muted hover:text-theme-accent-primary transition-colors"
            >
              <FaShare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
