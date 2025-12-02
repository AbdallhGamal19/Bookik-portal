"use client";

import Image from "next/image";
import UserProfileBasicStats from "./UserProfileBasicStats";
import FollowButton from "./FollowButton";

interface UserProfileHeaderProps {
  userProfile: any;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  userProfile,
}) => {
  // Get user data from profile or fallback
  const user = userProfile.user || userProfile;

  const isVerified = user.confirmed === 1;
  const isFeaturedAdvertiser = user.is_featured_advertiser === 1;
  const isAdvertiser = user.is_advertiser === 1;

  return (
    <div className="bg-theme-bg-card rounded-bookik-rounded-2xl p-4 lg:p-8 mb-6 shadow-theme-shadow-lg border border-theme-border-primary">
      <div className="flex flex-col items-start gap-bookik-gap-lg">
        {/* Profile Picture */}
        <div className="flex items-center flex-row gap-bookik-gap-lg">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 relative rounded-full overflow-hidden bg-gradient-to-br from-theme-accent-primary to-purple-600 flex items-center justify-center border-4 border-theme-accent-primary shadow-theme-shadow-lg flex-shrink-0">
            {user.avatar && user.avatar !== "user.png" ? (
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_WEB_URL}/images/user/${user.avatar}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-3xl lg:text-4xl font-bold">
                {user.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="leading-none">
            <div className="flex items-center justify-start gap-bookik-gap-sm mb-1">
              <h1 className="text-theme-text-primary text-lg lg:text-xl font-bold">
                {user?.name || user?.nickname || "مبدع Bookik"}
              </h1>
              {isVerified && (
                <Image
                  src="/profile/vector.svg"
                  alt="Verified"
                  width={16}
                  height={16}
                />
              )}
            </div>

            {user.nickname && (
              <p className="text-theme-text-secondary text-sm mb-2">
                @{user.nickname}
              </p>
            )}

            {/* Status Badges */}
            <div className="flex justify-start gap-bookik-gap-sm mb-3">
              {isFeaturedAdvertiser && (
                <span className="text-xs text-theme-text-secondary bg-theme-accent-primary font-bold  px-2 py-1 rounded">
                  معلن مميز
                </span>
              )}
              {isAdvertiser && (
                <span className="text-xs text-theme-text-secondary font-bold bg-theme-bg-secondary px-2 py-1 rounded">
                  معلن
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-left w-full">
          {/* Stats */}
          <UserProfileBasicStats userProfile={userProfile} />

          {/* Action Buttons */}
          <div className="flex flex-row justify-start gap-bookik-gap-sm mb-4">
            <FollowButton userProfile={userProfile} />
            <button className="bg-theme-bg-secondary text-theme-text-primary px-6 py-3 rounded-full font-semibold hover:bg-theme-bg-hover transition-all duration-200 border border-theme-border-primary shadow-theme-shadow-md hover:scale-105">
              مراسلة
            </button>
          </div>

          {/* Bio */}
          {user.brief && (
            <div className="bg-theme-bg-secondary rounded-bookik-rounded-lg py-4 mb-4">
              <p className="text-sm text-theme-text-primary leading-relaxed text-right">
                {user.brief}
              </p>
            </div>
          )}

          {/* Address */}
          {user.address && (
            <div className="flex items-center justify-start gap-bookik-gap-sm text-sm text-theme-text-secondary mb-2">
              <span className="text-theme-accent-primary">📍</span>
              <span>{user.address}</span>
            </div>
          )}

          {/* Join Date */}
          <div className="flex items-center justify-start gap-bookik-gap-sm text-sm text-theme-text-secondary mb-2">
            <span className="text-theme-accent-primary">📅</span>
            <span>
              انضم في {new Date(user.created_at).toLocaleDateString("eg-EG")}
            </span>
          </div>

          {/* Gender */}
          {user.gender && (
            <div className="flex items-center justify-start gap-bookik-gap-sm text-sm text-theme-text-secondary mb-2">
              <span className="text-theme-accent-primary">
                {user.gender === "m" ? "👨" : "👩"}
              </span>
              <span>{user.gender === "m" ? "ذكر" : "أنثى"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
