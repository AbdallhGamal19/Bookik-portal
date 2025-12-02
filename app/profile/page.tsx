"use client";
import AuthGuard from "@/components/common/AuthGuard";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileBioSection from "./_components/ProfileBioSection";
import ProfileWorkGallery from "./_components/ProfileWorkGallery";
import ProfileStatistics from "./_components/ProfileStatistics";
import ProfileAbout from "./_components/ProfileAbout";
import ProfileTabsSection from "./_components/ProfileTabsSection";
import { useAppContext } from "@/context/appContext";
import { useRef, useState } from "react";

function ProfileData() {
  const { currentUser } = useAppContext();

  const [activeTab, setActiveTab] = useState<
    "followers" | "followings" | "stores"
  >("followers");
  const [followers, setFollowers] = useState<any[]>([]);
  const [followings, setFollowings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const user: any = {
    id: currentUser?.id.toString() || "",
    name: currentUser?.name || "",
    username: currentUser?.nickname || "",
    avatar: currentUser?.avatar || "",
    bio: currentUser?.brief || "",
    followers: currentUser.followers.length || 0,
    following: currentUser.followings.length || 0,
    storesCount: currentUser.following_store.length || 0,
    rating: currentUser?.rating || 0,
    totalRatings: currentUser?.total_ratings || 0,
    clientCount: currentUser?.client_count || 0,
    responseTime: currentUser?.response_time || "غير محدد",
    lastSeen: currentUser?.last_seen || "غير محدد",
    completionRate: currentUser?.completion_rate || 0,
    averageDelivery: currentUser?.average_delivery || "غير محدد",
    skills: currentUser?.skills || "غير محدد",
    location: currentUser?.address || "غير محدد",
    distance: currentUser?.distance || "غير محدد",
    joinDate: currentUser
      ? new Date(currentUser.created_at).toLocaleDateString("ar-SA")
      : "غير محدد",
    views_count: currentUser?.views_count || 0,
    brief: currentUser?.brief || "مبدع محترف في منصة Bookik",
    email: currentUser?.email || "غير محدد",
    created_at: currentUser?.created_at || "",
    videos: currentUser?.videos || [],
    user_videos: currentUser?.user_videos || [],
  };

  // Get user's videos from currentUser data if available
  const videoData: any[] =
    currentUser?.videos || currentUser?.user_videos || [];

  console.log("الحالة الحالية للتاب:", activeTab);

  return (
    <AuthGuard>
      <div
        dir="rtl"
        className="min-h-screen px-4 md:px-6 mt-24 relative z-[60]"
      >
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row-reverse gap-4">
          {/* Left Content - Bio and Gallery */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Bio Section */}
            <ProfileBioSection bio={user.bio} />

            {/* Work Gallery Section */}
            <ProfileWorkGallery videoData={videoData} />
          </div>

          {/* Right Sidebar - Statistics and About */}
          <div className="w-full lg:w-[350px] flex flex-col gap-4">
            {/* Statistics Section */}
            <ProfileStatistics user={user} />

            {/* About Section */}
            <ProfileAbout user={user} />

            {/* Tabs Section */}
            <ProfileTabsSection
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              followers={currentUser?.followers || []}
              followings={currentUser?.followings || []}
              followingStore={currentUser?.following_store || []}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

export default ProfileData;
