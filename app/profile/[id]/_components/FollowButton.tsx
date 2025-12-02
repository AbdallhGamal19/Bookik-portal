"use client";
import { followUser } from "@/server-actions";
import { useState } from "react";

interface FollowButtonProps {
  userProfile: any;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userProfile: initialUserProfile,
}) => {
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    if (!userProfile || isLoading) return;

    setIsLoading(true);
    try {
      const res = await followUser({
        user_id: userProfile.user?.id || userProfile.id,
        status: "unFollow",
      });

      // Update follow status
      setUserProfile((prev: any) => ({
        ...prev,
        isFollowing: !prev.isFollowing,
      }));
    } catch (err: any) {
      console.error("Follow error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-theme-shadow-md disabled:opacity-50 ${
        userProfile.isFollowing
          ? "bg-theme-bg-secondary text-theme-text-primary hover:bg-theme-bg-hover border border-theme-border-primary"
          : "bg-theme-accent-primary text-theme-text-inverse hover:bg-opacity-90 hover:scale-105"
      }`}
    >
      {isLoading
        ? "جاري..."
        : userProfile.isFollowing
        ? "إلغاء المتابعة"
        : "متابعة"}
    </button>
  );
};

export default FollowButton;
