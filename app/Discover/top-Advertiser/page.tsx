import Image from "next/image";
import { getTopAdvertisers } from "../../../server-actions/index";
import "../../globals.css";
import { ImSpinner9 } from "react-icons/im";
import Loading from "../../loading";
import {
  FaCrown,
  FaStar,
  FaUsers,
  FaEye,
  FaHeart,
  FaVideo,
  FaGift,
  FaCheckCircle,
} from "react-icons/fa";
import Link from "next/link";

import { TopAdvertiserUser } from "@/interface";
import Button from "../../../components/ui/button";

const TopAdvertiser = async () => {
  let data: TopAdvertiserUser[] = [];
  let loading = false;

  try {
    const result = await getTopAdvertisers();
    data = result || [];
  } catch (error) {
    console.error("Error fetching top advertisers:", error);
    data = [];
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-theme-bg-primary p-bookik-padding-lg">
      {/* Header Section */}
      <div className="text-center mb-bookik-margin-xl">
        <div className="flex items-center justify-center gap-bookik-gap-md mb-bookik-margin-md">
          <FaCrown className="text-theme-accent-warning text-text5xl" />
          <h1 className="text-text5xl font-bold text-theme-text-primary">
            أفضل المبدعين
          </h1>
          <FaCrown className="text-theme-accent-warning text-text5xl" />
        </div>
        <p className="text-theme-text-secondary text-textlg max-w-2xl mx-auto">
          اكتشف أفضل المبدعين والمعلنين في منصة بوكك. تعرف على المواهب المتميزة
          والعروض الرائعة
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-bookik-gap-lg mb-bookik-margin-xl max-w-5xl mx-auto">
        <div className="bg-theme-bg-card rounded-bookik-rounded-2xl p-bookik-padding-lg shadow-theme-shadow-md border border-theme-border-primary text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-theme-accent-info/20 rounded-bookik-rounded-full mx-auto mb-bookik-margin-md">
            <FaUsers className="text-theme-accent-info text-text2xl" />
          </div>
          <h3 className="text-text2xl font-bold text-theme-text-primary mb-bookik-margin-xs">
            {data.length}
          </h3>
          <p className="text-theme-text-secondary">مبدع مميز</p>
        </div>

        <div className="bg-theme-bg-card rounded-bookik-rounded-2xl p-bookik-padding-lg shadow-theme-shadow-md border border-theme-border-primary text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-theme-accent-success/20 rounded-bookik-rounded-full mx-auto mb-bookik-margin-md">
            <FaCheckCircle className="text-theme-accent-success text-text2xl" />
          </div>
          <h3 className="text-text2xl font-bold text-theme-text-primary mb-bookik-margin-xs">
            {data.filter((advertiser) => advertiser.confirmed === 1).length}
          </h3>
          <p className="text-theme-text-secondary">حساب موثق</p>
        </div>

        <div className="bg-theme-bg-card rounded-bookik-rounded-2xl p-bookik-padding-lg shadow-theme-shadow-md border border-theme-border-primary text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-theme-accent-warning/20 rounded-bookik-rounded-full mx-auto mb-bookik-margin-md">
            <FaStar className="text-theme-accent-warning text-text2xl" />
          </div>
          <h3 className="text-text2xl font-bold text-theme-text-primary mb-bookik-margin-xs">
            {
              data.filter(
                (advertiser) => advertiser.is_featured_advertiser === 1
              ).length
            }
          </h3>
          <p className="text-theme-text-secondary">معلن مميز</p>
        </div>

        <div className="bg-theme-bg-card rounded-bookik-rounded-2xl p-bookik-padding-lg shadow-theme-shadow-md border border-theme-border-primary text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-theme-accent-purple/20 rounded-bookik-rounded-full mx-auto mb-bookik-margin-md">
            <FaEye className="text-theme-accent-purple text-text2xl" />
          </div>
          <h3 className="text-text2xl font-bold text-theme-text-primary mb-bookik-margin-xs">
            {data.reduce(
              (sum, advertiser) => sum + (advertiser.likes_count || 0),
              0
            )}
          </h3>
          <p className="text-theme-text-secondary">إجمالي الإعجابات</p>
        </div>
      </div>

      {/* Top Advertisers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-bookik-gap-lg max-w-6xl mx-auto">
        {data.map((advertiser, index) => (
          <div
            key={advertiser.id}
            className="bg-theme-bg-card rounded-bookik-rounded-2xl p-bookik-padding-lg shadow-theme-shadow-md border border-theme-border-primary hover:shadow-theme-shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {/* Rank Badge */}
            <div className="flex justify-between items-start mb-bookik-margin-md">
              <div className="flex items-center gap-bookik-gap-sm">
                <span className="text-text2xl font-bold text-theme-accent-warning">
                  #{index + 1}
                </span>
                {index < 3 && (
                  <FaCrown className="text-theme-accent-warning text-textlg" />
                )}
              </div>
              <div className="flex items-center gap-bookik-gap-xs">
                <FaStar className="text-theme-accent-warning text-textsm" />
                <span className="text-textsm font-semibold text-theme-text-primary">
                  {advertiser.rating || "4.5"}
                </span>
              </div>
            </div>

            {/* Profile Image and Info */}
            <div className="mb-bookik-margin-lg">
              <div className="flex items-center gap-bookik-gap-md mb-bookik-margin-md">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={
                      advertiser.avatar || advertiser.image
                        ? `${process.env.NEXT_PUBLIC_WEB_URL}/images/user/${
                            advertiser.avatar || advertiser.image
                          }`
                        : "/testImages/user.png"
                    }
                    alt={advertiser.name}
                    loading="lazy"
                    fill
                    className="rounded-full object-cover border-2 border-theme-accent-primary"
                  />
                  {/* Verification Badge */}
                  {advertiser.confirmed === 1 && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-theme-accent-success rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-white text-xs" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-textlg font-bold text-theme-text-primary mb-bookik-margin-xs truncate">
                    {advertiser.name}
                  </h3>
                  <p className="text-theme-text-secondary text-textsm truncate">
                    @
                    {advertiser.nickname ||
                      advertiser.name.toLowerCase().replace(/\s+/g, "")}
                  </p>
                </div>
              </div>

              {/* Brief Description */}
              <p className="text-theme-text-secondary text-textxs mb-bookik-margin-sm line-clamp-2">
                {advertiser.brief || "لا يوجد نبذة عن المبدع"}
              </p>

              {/* Status Badges and Stats in one row */}
              <div className="flex justify-between items-center gap-bookik-gap-xs mb-bookik-margin-sm">
                <div className="flex gap-bookik-gap-xs">
                  {/* مميز أو عادي */}
                  <span
                    className={`px-2 py-1 text-textxs rounded-full ${
                      advertiser.is_featured_advertiser === 1
                        ? "bg-theme-accent-warning/20 text-theme-accent-warning"
                        : "bg-theme-text-secondary/20 text-theme-text-secondary"
                    }`}
                  >
                    {advertiser.is_featured_advertiser === 1 ? "مميز" : "عادي"}
                  </span>

                  {/* شركة أو فرد */}
                  <span
                    className={`px-2 py-1 text-textxs rounded-full ${
                      advertiser.is_company === 1
                        ? "bg-theme-accent-info/20 text-theme-accent-info"
                        : "bg-theme-text-secondary/20 text-theme-text-secondary"
                    }`}
                  >
                    {advertiser.is_company === 1 ? "شركة" : "فرد"}
                  </span>

                  {/* نشط أو غير نشط */}
                  <span
                    className={`px-2 py-1 text-textxs rounded-full ${
                      advertiser.active_status === 1
                        ? "bg-theme-accent-success/20 text-theme-accent-success"
                        : "bg-theme-text-secondary/20 text-theme-text-secondary"
                    }`}
                  >
                    {advertiser.active_status === 1 ? "نشط الآن" : "غير نشط"}
                  </span>
                </div>
                <div className="flex gap-bookik-gap-sm text-textxs">
                  <span className="text-theme-text-secondary">
                    {advertiser.likes_count || "0"} إعجاب
                  </span>
                  <span className="text-theme-text-secondary">
                    {advertiser.coupon?.length || "0"} عرض
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mb-bookik-margin-md">
              <div className="flex justify-between items-center text-textxs text-theme-text-secondary mb-bookik-margin-xs">
                <span>تاريخ الانضمام:</span>
                <span>
                  {new Date(advertiser.created_at).toLocaleDateString("ar-SA")}
                </span>
              </div>
              {advertiser.website && (
                <div className="flex justify-between items-center text-textxs text-theme-text-secondary">
                  <span>الموقع:</span>
                  <a
                    href={advertiser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-theme-accent-primary hover:underline truncate max-w-20"
                  >
                    {advertiser.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>

            {/* Action Button */}
            <Link href={`/profile/${advertiser.id}`}>
              <Button className="w-full bg-theme-accent-primary text-theme-text-inverse hover:bg-theme-accent-primary/90 transition-colors">
                عرض الملف الشخصي
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-bookik-padding-2xl">
          <div className="text-theme-text-secondary text-textlg">
            لا يوجد مبدعين مميزين حالياً
          </div>
        </div>
      )}
    </div>
  );
};

export default TopAdvertiser;
