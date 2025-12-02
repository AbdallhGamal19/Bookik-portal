"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaBullhorn } from "react-icons/fa";

interface SimpleItemCardProps {
  id: number;
  name: string;
  nickname: string;
  avatar?: string;
  image?: string;
  type: "user" | "store";
  extraInfo?: {
    is_company?: number;
    is_advertiser?: number;
    is_featured_advertiser?: number;
    is_featured?: number;
    title_en?: string;
  };
  buttonText: string;
  buttonAction: () => void;
  isFollowing?: boolean;
  showMessageButton?: boolean;
}

export default function SimpleItemCard({
  id,
  name,
  nickname,
  avatar,
  image,
  type,
  extraInfo,
  buttonText,
  buttonAction,
  isFollowing = false,
  showMessageButton = false,
}: SimpleItemCardProps) {
  const router = useRouter();

  const displayImage = type === "store" ? image : avatar;
  const profileLink = type === "user" ? `/profile/${id}` : `/store/${id}`;

  return (
    <div className="bg-theme-bg-secondary rounded-bookik-rounded-lg p-4 border border-theme-border-primary hover:shadow-theme-shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* صورة واسم - قابل للنقر */}
        <Link
          href={profileLink}
          className="flex items-center gap-bookik-gap-md flex-1 hover:opacity-80 transition-opacity duration-200"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-theme-accent-primary/20 to-theme-accent-secondary/20 rounded-bookik-rounded-xl flex items-center justify-center overflow-hidden border-2 border-theme-accent-primary/30 shadow-theme-shadow-sm">
              <Image
                src={
                  type === "store"
                    ? `${process.env.NEXT_PUBLIC_WEB_URL}/images/store/${image}`
                    : `${process.env.NEXT_PUBLIC_WEB_URL}/images/user/${image}`
                }
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>

            {/* أيقونة المميز */}
            {(type === "store" && extraInfo?.is_featured === 1) ||
            (type === "user" && extraInfo?.is_featured_advertiser === 1) ? (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-theme-accent-warning to-theme-accent-warning/80 rounded-full flex items-center justify-center shadow-theme-shadow-sm">
                <span className="text-white text-xs">⭐</span>
              </div>
            ) : null}

            {/* أيقونة الشركة/المعلن للمستخدمين */}
            {type === "user" && extraInfo?.is_company === 1 ? (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-theme-accent-primary/80 rounded-full flex items-center justify-center shadow-theme-shadow-sm">
                <span className="text-white text-xs">🏢</span>
              </div>
            ) : type === "user" && extraInfo?.is_advertiser === 1 ? (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-theme-accent-secondary/80 rounded-full flex items-center justify-center shadow-theme-shadow-sm">
                <span className="text-white text-xs">📢</span>
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-text8 font-bold text-theme-text-primary mb-1">
              {name}
            </h3>
            {type === "user" ? (
              <p className="text-text9 text-theme-text-secondary">
                @{nickname}
              </p>
            ) : extraInfo?.title_en ? (
              <p className="text-text9 text-theme-text-secondary">
                {extraInfo.title_en}
              </p>
            ) : null}

            {/* العلامات الإضافية للمتاجر */}
            {type === "store" && (
              <div className="flex items-center gap-bookik-gap-sm mt-1">
                <FaBullhorn className="text-text9 text-theme-text-secondary" />
                <span className="text-text9 text-theme-text-secondary">
                  متجر
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* أزرار الإجراءات */}
        <div className="flex gap-bookik-gap-sm">
          {type === "user" && showMessageButton && (
            <button
              className="border border-theme-bg-secondary text-theme-text-primary hover:bg-theme-bg-hover px-3 py-2 rounded-bookik-rounded-lg text-sm transition-all duration-300"
              onClick={() => {
                /* TODO: إضافة مراسلة */
              }}
            >
              مراسلة
            </button>
          )}
          <button
            onClick={buttonAction}
            className={
              isFollowing
                ? "bg-gradient-to-r from-theme-accent-primary to-theme-accent-primary/90 hover:from-theme-accent-primary/90 hover:to-theme-accent-primary text-white px-4 py-2 rounded-bookik-rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-theme-shadow-md"
                : "bg-gradient-to-r from-theme-accent-primary to-theme-accent-primary/90 hover:from-theme-accent-primary/90 hover:to-theme-accent-primary text-white px-4 py-2 rounded-bookik-rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-theme-shadow-md"
            }
          >
            {type === "store" ? "🔍 زيارة المتجر" : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
