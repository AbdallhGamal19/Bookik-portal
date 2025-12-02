"use client";

interface UserProfileBasicStatsProps {
  userProfile: any;
}

const UserProfileBasicStats: React.FC<UserProfileBasicStatsProps> = ({
  userProfile,
}) => {
  return (
    <div className="flex gap-2 sm:gap-3 lg:gap-4 mb-4 text-sm">
      {/* Posts */}
      <div className="text-center bg-theme-bg-secondary rounded-bookik-rounded-lg p-2 sm:p-3">
        <div className="font-bold text-theme-accent-primary text-sm sm:text-lg">
          {Object.keys(userProfile.posts || {}).length}
        </div>
        <div className="text-theme-text-secondary text-xs">المنشورات</div>
      </div>

      {/* Coupons */}
      <div className="text-center bg-theme-bg-secondary rounded-bookik-rounded-lg p-2 sm:p-3">
        <div className="font-bold text-theme-accent-primary text-sm sm:text-lg">
          {userProfile.coupons?.length || 0}
        </div>
        <div className="text-theme-text-secondary text-xs">العروض</div>
      </div>

      {/* Likes */}
      <div className="text-center bg-theme-bg-secondary rounded-bookik-rounded-lg p-2 sm:p-3">
        <div className="font-bold text-theme-accent-primary text-sm sm:text-lg">
          {userProfile.likes?.filter(
            (like: any) => like.likeable && like.value === 1
          ).length || 0}
        </div>
        <div className="text-theme-text-secondary text-xs">الإعجابات</div>
      </div>

      {/* Followers */}
      <div className="text-center bg-theme-bg-secondary rounded-bookik-rounded-lg p-2 sm:p-3">
        <div className="font-bold text-theme-accent-primary text-sm sm:text-lg">
          {userProfile.followers?.length || 0}
        </div>
        <div className="text-theme-text-secondary text-xs">المتابعين</div>
      </div>

      {/* Followings */}
      <div className="text-center bg-theme-bg-secondary rounded-bookik-rounded-lg p-2 sm:p-3">
        <div className="font-bold text-theme-accent-primary text-sm sm:text-lg">
          {userProfile.followings?.length || 0}
        </div>
        <div className="text-theme-text-secondary text-xs">يتابع</div>
      </div>
    </div>
  );
};

export default UserProfileBasicStats;
