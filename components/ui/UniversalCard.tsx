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

interface UniversalCardProps {
  id: string | number;
  title: string;
  detail?: string;
  code?: string;
  link?: string;
  discount?: string;
  start?: string;
  expiry?: string;
  image?: string;
  address?: string;
  is_active?: boolean;
  views_count?: number;
  likes?: any[];
  store?: {
    id: string | number;
    title: string;
    image?: string;
  };
  store_id?: string | number;
  user?: {
    id: string | number;
    name: string;
    image?: string;
  };
  have_video?: boolean;
  video_url?: string;
  showShareButton?: boolean;
  showStoreImage?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function UniversalCard({
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
  store_id,
  user,
  have_video,
  video_url,
  showShareButton,
  showStoreImage = true,
  onClick,
  className = "",
}: UniversalCardProps) {
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    let shareUrl = window.location.href;

    // إذا كان فيه فيديو، استخدم رابط Explorer
    if (have_video) {
      shareUrl = `${window.location.origin}/Explorer?id=${id}`;
    } else if (link) {
      // إذا مفيش فيديو ولكن فيه رابط، استخدم الرابط
      shareUrl = link;
    }

    if (navigator.share) {
      navigator.share({
        title: `عرض ${title} من Bookik`,
        text: `اكتشف هذا العرض الرائع! خصم ${discount}`,
        url: shareUrl,
      });
    } else {
      // Fallback: نسخ الرابط للحافظة
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("تم نسخ الرابط للحافظة!");
      });
    }
  };

  const getImageUrl = () => {
    if (!image) return "/testImages/test.jpeg";

    if (image.startsWith("http")) {
      return image;
    }

    // Check if it's a media path (for store coupons)
    if (image.includes("media/")) {
      return `${process.env.NEXT_PUBLIC_WEB_URL}/${image}`;
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

  const getStoreImageUrl = () => {
    // إذا كان فيه بيانات الاستور الكاملة
    if (store?.image) {
      if (store.image.startsWith("http")) {
        return store.image;
      }
      return `${process.env.NEXT_PUBLIC_WEB_URL}/images/store/${store.image}`;
    }

    // إذا كان فيه store_id فقط، استخدم صورة افتراضية أو جلب من API
    if (store_id) {
      // يمكن إضافة API call هنا لجلب صورة الاستور
      return "/testImages/store.png";
    }

    return "/testImages/store.png";
  };

  return (
    <div
      onClick={onClick}
      className={`bg-theme-bg-card rounded-xl border border-theme-border-primary overflow-hidden hover:shadow-theme-shadow-lg transition-shadow duration-300 group cursor-pointer ${className}`}
    >
      {/* Image Container */}
      <div className="relative">
        <div className="aspect-[4/3] w-full relative overflow-hidden">
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

          {/* Video Play Icon */}
          {(have_video || video_url) && (
            <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-bold">
              <FaPlay size={10} />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-theme-text-primary text-base mb-1 truncate">
              {title}
            </h3>
          </div>

          {/* Store Avatar */}
          {showStoreImage && (store?.title || store_id) && (
            <Link
              href={`/store/${store?.id || store_id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center space-x-2 space-x-reverse ml-3 flex-shrink-0"
            >
              <Image
                src={getStoreImageUrl()}
                alt={store?.title || "متجر"}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border-2 border-theme-border-primary shadow-theme-shadow-md"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/testImages/store.png";
                }}
              />
            </Link>
          )}
        </div>

        {/* Description */}
        {detail && (
          <p className="text-theme-text-secondary text-xs mb-4 truncate">
            {detail}
          </p>
        )}

        {/* Code and Discount */}
        <div className="flex items-center justify-between mb-4">
          {code && (
            <div className="bg-theme-accent-primary text-theme-text-inverse p-1 rounded-lg border border-theme-accent-primary/20">
              <FaTags size={12} />
            </div>
          )}
        </div>

        {/* Dates */}
        {(start || expiry) && (
          <div className="flex items-center justify-between text-xs text-theme-text-muted mb-4">
            {start && (
              <div className="flex items-center space-x-1 space-x-reverse">
                <FaClock />
                <span>من: {start}</span>
              </div>
            )}
            {expiry && (
              <div className="flex items-center space-x-1 space-x-reverse">
                <FaClock />
                <span>إلى: {expiry}</span>
              </div>
            )}
          </div>
        )}

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
              onClick={(e) => e.stopPropagation()}
              className="underline text-theme-text-link hover:text-theme-accent-primary transition-colors"
            >
              زيارة الموقع
            </Link>
          ) : (
            <span className="text-theme-text-muted"> لا يوجد موقع</span>
          )}
          <div className="flex items-center gap-bookik-gap-sm">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            >
              <FaHeart
                className={
                  isLiked ? "text-theme-accent-error" : "text-theme-text-muted"
                }
              />
            </button>

            {showShareButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="p-2 text-theme-text-muted hover:text-theme-accent-primary transition-colors"
              >
                <FaShare />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
