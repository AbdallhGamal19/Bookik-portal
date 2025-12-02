"use client";
import Image from "next/image";
import {
  FaHeart,
  FaEye,
  FaMapMarkerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";

interface StoreHeaderProps {
  store: any;
  totalViews: number;
  totalLikes: number;
  totalFollowers: number;
  totalBranches: number;
  totalOffers: number;
  onFollow: () => void;
}

const StoreHeader = ({
  store,
  totalViews,
  totalLikes,
  totalFollowers,
  totalBranches,
  totalOffers,
  onFollow,
}: StoreHeaderProps) => {
  return (
    <div className="relative md:h-80 bg-gradient-to-r from-theme-accent-primary to-theme-accent-secondary rounded-bookik-rounded-2xl overflow-hidden shadow-theme-shadow-md mt-6 mx-4">
      {/* Cover Image */}
      <div className="absolute inset-0 ">
        <Image
          src={`${process.env.NEXT_PUBLIC_WEB_URL}/images/store/${store.image}`}
          alt={store.title}
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Store Info Overlay */}
      <div className="relative z-10 h-full flex items-end p-6">
        <div className="flex flex-col gap-bookik-gap-lg justify-center w-full">
          {/* Store Logo */}
          <div className="flex items-center gap-bookik-gap-lg">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-theme-bg-card shadow-theme-shadow-lg relative">
              <Image
                src={
                  store?.image || store?.avatar
                    ? `${process.env.NEXT_PUBLIC_WEB_URL}/images/store/${
                        store.image || store.avatar
                      }`
                    : "/testImages/test.jpeg"
                }
                alt={store?.title || "Store"}
                fill
                className="object-cover"
              />
            </div>
            {/* Store Details */}
            <div className="flex-1 text-white mb-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {store.title}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-2">
                {store.title_en}
              </p>
            </div>
          </div>
          <div className="flex items-center text-white space-x-4 space-x-reverse text-sm flex-wrap gap-2">
            <div className="flex items-center space-x-1 space-x-reverse">
              <FaEye />
              <span>{totalViews} مشاهدة</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <FaHeart />
              <span>{totalLikes} إعجاب</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <FaUsers />
              <span>{totalFollowers} متابع</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <FaBuilding />
              <span>{totalBranches} فرع</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <div className="text-sm">📋</div>
              <span>{totalOffers} عرض متاح</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <FaCalendarAlt />
              <span>
                {new Date(store.created_at).getFullYear()} سنة التأسيس
              </span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <FaMapMarkerAlt />
              <span>{store.address}</span>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-bookik-gap-sm">
            <button
              onClick={onFollow}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-200 bg-theme-accent-primary text-theme-text-inverse hover:scale-105"
            >
              متابعة
            </button>
            <button className="px-6 py-3 rounded-full font-semibold transition-all duration-200 bg-theme-bg-secondary text-theme-text-primary hover:bg-theme-bg-hover border border-theme-border-primary shadow-theme-shadow-md hover:scale-105">
              مراسلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
